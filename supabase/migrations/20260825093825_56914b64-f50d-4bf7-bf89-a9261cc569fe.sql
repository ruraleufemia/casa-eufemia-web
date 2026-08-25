-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Blog posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title_es text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  excerpt_es text NOT NULL DEFAULT '',
  excerpt_en text NOT NULL DEFAULT '',
  content_es text NOT NULL DEFAULT '',
  content_en text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  images text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts"
ON public.blog_posts FOR SELECT TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can view all posts"
ON public.blog_posts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert posts"
ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
ON public.blog_posts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
ON public.blog_posts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Site content
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value_es text NOT NULL DEFAULT '',
  value_en text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content"
ON public.site_content FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert site content"
ON public.site_content FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site content"
ON public.site_content FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site content"
ON public.site_content FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Gallery
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt_es text NOT NULL DEFAULT '',
  alt_en text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert gallery images"
ON public.gallery_images FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery images"
ON public.gallery_images FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
ON public.gallery_images FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Storage policies for the site-media bucket
CREATE POLICY "Public can read site media"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'site-media');

CREATE POLICY "Admins can upload site media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));