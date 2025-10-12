import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Ruta de Vinos por La Mancha",
    excerpt: "Descubre las mejores bodegas de la región y degusta vinos con denominación de origen manchega.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop",
    date: "2024-03-15",
    readTime: "5 min",
    category: "Gastronomía"
  },
  {
    id: 2,
    title: "Molinos de Viento: Tras los Pasos de Don Quijote",
    excerpt: "Visita los emblemáticos molinos de viento de Campo de Criptana y Consuegra al amanecer.",
    image: "https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=800&auto=format&fit=crop",
    date: "2024-03-10",
    readTime: "6 min",
    category: "Cultural"
  },
  {
    id: 3,
    title: "Desayuno Manchego Tradicional",
    excerpt: "Experimenta un auténtico desayuno manchego con productos locales y recetas centenarias.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop",
    date: "2024-03-05",
    readTime: "4 min",
    category: "Gastronomía"
  }
];

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
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
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
