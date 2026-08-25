CREATE POLICY "Anyone can see the site-media bucket"
ON storage.buckets FOR SELECT TO anon, authenticated
USING (id = 'site-media');