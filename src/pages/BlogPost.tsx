import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";


const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
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
                <span>{item.replace(/^\*\*(.*?)\*\*:/, '<strong>$1</strong>:').split('<strong>').map((part, idx) => {
                  if (idx === 0) return part;
                  const [strong, rest] = part.split('</strong>');
                  return <span key={idx}><strong className="font-medium text-foreground">{strong}</strong>{rest}</span>;
                })}</span>
              </li>
            ))}
          </ul>
        );
      }
      // Regular paragraphs
      return (
        <p key={index} className="text-muted-foreground font-light leading-relaxed mb-6">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.id}`}
        image={post.image}
        type="article"
        keywords={`${post.category}, casa eufemia, turismo Ciudad Real, experiencias rurales, ${post.title}`}
        article={{
          publishedTime: post.date,
          author: "Casa Eufemia",
          section: post.category,
          tags: [post.category, "turismo rural", "Ciudad Real", "La Mancha"]
        }}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] mt-20 md:mt-24">
        <img
          src={post.image}
          alt={post.title}
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
              Volver a experiencias
            </Link>
            
            <div className="max-w-4xl">
              <span className="inline-block bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-light mb-4">
                {post.category}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 drop-shadow-lg">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-white/90 text-sm font-light">
                <span className="flex items-center gap-2">
                  <Calendar size={16} strokeWidth={1.5} />
                  {new Date(post.date).toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} strokeWidth={1.5} />
                  {post.readTime} de lectura
                </span>
              </div>
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
                {post.excerpt}
              </p>
              
              <div className="space-y-6">
                {formatContent(post.content)}
              </div>

              {/* Additional Images */}
              {post.images && post.images.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  {post.images.map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`${post.title} - Imagen ${idx + 2}`}
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
            Más Experiencias
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
                      alt={relatedPost.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground font-light text-sm line-clamp-2">
                      {relatedPost.excerpt}
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
