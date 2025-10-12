import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Ruta de Vinos por La Mancha",
    excerpt: "Descubre las mejores bodegas de la región y degusta vinos con denominación de origen manchega.",
    content: "La Mancha es conocida por su tradición vinícola centenaria. Comienza tu mañana visitando bodegas familiares donde aprenderás sobre el proceso de elaboración del vino. Disfruta de catas guiadas y maridajes con quesos manchegos artesanales.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop",
    date: "2024-03-15",
    readTime: "5 min",
    category: "Gastronomía"
  },
  {
    id: 2,
    title: "Molinos de Viento: Tras los Pasos de Don Quijote",
    excerpt: "Visita los emblemáticos molinos de viento de Campo de Criptana y Consuegra al amanecer.",
    content: "Experimenta la magia de los molinos de viento al amanecer. Estos gigantes blancos fueron inmortalizados por Cervantes en Don Quijote. La luz matinal crea un ambiente único para fotografías y reflexión.",
    image: "https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=1200&auto=format&fit=crop",
    date: "2024-03-10",
    readTime: "6 min",
    category: "Cultural"
  },
  {
    id: 3,
    title: "Desayuno Manchego Tradicional",
    excerpt: "Experimenta un auténtico desayuno manchego con productos locales y recetas centenarias.",
    content: "Un desayuno manchego tradicional incluye migas, gachas, tortas cenceñas con aceite de oliva virgen extra local. Visita los mercados matinales para descubrir productos frescos y conocer a los productores locales.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&auto=format&fit=crop",
    date: "2024-03-05",
    readTime: "4 min",
    category: "Gastronomía"
  },
  {
    id: 4,
    title: "Artesanía Manchega: Talleres Matutinos",
    excerpt: "Aprende técnicas tradicionales de cerámica y encaje de bolillos con artesanos locales.",
    content: "Participa en talleres de artesanía tradicional manchega. Aprende a trabajar el barro, crear encajes de bolillos o forjar cuchillos artesanales. Una experiencia auténtica con maestros artesanos.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&auto=format&fit=crop",
    date: "2024-03-01",
    readTime: "7 min",
    category: "Cultural"
  },
  {
    id: 5,
    title: "Ruta del Queso Manchego",
    excerpt: "Visita queserías tradicionales y aprende el proceso de elaboración del queso más famoso de España.",
    content: "El queso manchego es uno de los tesoros gastronómicos de la región. Visita queserías familiares, conoce el proceso de curación y disfruta de catas comparativas de distintas maduraciones.",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&auto=format&fit=crop",
    date: "2024-02-25",
    readTime: "5 min",
    category: "Gastronomía"
  },
  {
    id: 6,
    title: "Parque Natural de las Lagunas de Ruidera",
    excerpt: "Descubre un paraíso natural con cascadas y lagunas de aguas cristalinas a primera hora de la mañana.",
    content: "Las Lagunas de Ruidera ofrecen un espectáculo natural único. Recorre los senderos que conectan las 15 lagunas, disfruta de las cascadas y observa la rica fauna local en su momento más activo.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop",
    date: "2024-02-20",
    readTime: "8 min",
    category: "Cultural"
  }
];

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
              <article
                key={post.id}
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
