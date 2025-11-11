import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <>
      <SEO 
        title="Experiencias Locales - Blog de Casa Eufemia"
        description="Descubre las mejores experiencias gastronómicas y culturales cerca de Casa Eufemia. Guía de turismo local, rutas, restaurantes y actividades en Ciudad Real."
        url="/blog"
        keywords="turismo Ciudad Real, experiencias rurales, gastronomía La Mancha, que hacer en Ciudad Real, rutas turísticas, actividades rurales España"
      />
      <div className="min-h-screen bg-background">
        <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-light">
            <ArrowLeft size={20} strokeWidth={1.5} />
            Volver al inicio
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-6">
            Experiencias Locales
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-3xl">
            Descubre las mejores actividades gastronómicas y culturales que puedes disfrutar durante tu estancia en Casa Eufemia
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 block"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground font-light text-sm line-clamp-3">
                    {post.excerpt}
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

export default Blog;
