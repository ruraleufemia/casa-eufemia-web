import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-light">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} strokeWidth={1.5} />
                      {new Date(post.date).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} strokeWidth={1.5} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground font-light text-sm mb-4">
                    {post.excerpt}
                  </p>
                  
                  <p className="text-muted-foreground font-light text-sm line-clamp-3">
                    {post.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
