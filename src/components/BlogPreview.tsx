import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { blogPosts } from "@/data/blogPosts";

const BlogPreview = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
            Experiencias Locales
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Actividades gastronómicas y culturales para disfrutar durante tu estancia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
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
                
                <h3 className="text-xl font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground font-light text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="mt-4 flex items-center text-primary text-sm font-light group-hover:gap-2 transition-all">
                  Leer más
                  <ArrowRight size={16} strokeWidth={1.5} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline" size="lg" className="font-light">
              Ver Todas las Experiencias
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
