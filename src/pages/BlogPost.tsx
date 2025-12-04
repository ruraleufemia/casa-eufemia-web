import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";


const BlogPost = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const title = t(post.titleKey);
  const excerpt = t(post.excerptKey);
  const content = t(post.contentKey);

  const formatContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // Horizontal rule
      if (paragraph.trim() === '---') {
        return <hr key={index} className="my-12 border-border" />;
      }
      
      // Image
      if (paragraph.startsWith('![')) {
        const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <div key={index} className="my-8 flex justify-center">
              <img 
                src={match[2]} 
                alt={match[1]} 
                className="w-40 h-40 object-contain"
              />
            </div>
          );
        }
      }
      
      // Link button
      if (paragraph.startsWith('[') && paragraph.includes('](')) {
        const match = paragraph.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a 
              key={index}
              href={match[2]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {match[1]}
            </a>
          );
        }
      }
      
      // Headers
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-3xl font-light tracking-tight text-foreground mt-12 mb-6">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-2xl font-light tracking-tight text-foreground mt-8 mb-4">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      // Lists
      if (paragraph.includes('\n- ')) {
        const items = paragraph.split('\n- ').filter(item => item.trim());
        return (
          <ul key={index} className="list-none space-y-3 my-6 pl-0">
            {items.map((item, i) => (
              <li key={i} className="text-muted-foreground font-light leading-relaxed flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }
      
      // Bold text handling
      const renderWithBold = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
      };
      
      // Regular paragraphs
      return (
        <p key={index} className="text-muted-foreground font-light leading-relaxed mb-6">
          {renderWithBold(paragraph)}
        </p>
      );
    });
  };

  return (
    <>
      <SEO 
        title={title}
        description={excerpt}
        url={`/blog/${post.id}`}
        image={post.image}
        type="article"
        keywords={`casa eufemia, turismo Ciudad Real, experiencias rurales, ${title}`}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] mt-20 md:mt-24">
        <img
          src={post.image}
          alt={title}
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 font-light"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
              {t('blogPost.backToExperiences')}
            </Link>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 drop-shadow-lg">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12 border-l-2 border-primary pl-6">
                {excerpt}
              </p>
              
              <div className="space-y-6">
                {formatContent(content)}
              </div>

              {/* Additional Images */}
              {post.images && post.images.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  {post.images.map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`${title} - ${t('blogPost.imageAlt')} ${idx + 2}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-12 text-center">
            {t('blogPost.moreExperiences')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={t(relatedPost.titleKey)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                      {t(relatedPost.titleKey)}
                    </h3>
                    <p className="text-muted-foreground font-light text-sm line-clamp-2">
                      {t(relatedPost.excerptKey)}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
