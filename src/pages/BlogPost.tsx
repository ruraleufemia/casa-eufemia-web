import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "Ruta de Vinos por La Mancha",
    excerpt: "Descubre las mejores bodegas de la región y degusta vinos con denominación de origen manchega.",
    content: `La Mancha es conocida por su tradición vinícola centenaria que se remonta a la época romana. Esta región es la mayor zona vinícola del mundo, produciendo algunos de los vinos más reconocidos de España.

## La Experiencia del Vino Manchego

Comienza tu mañana visitando bodegas familiares donde aprenderás sobre el proceso completo de elaboración del vino, desde la vendimia hasta el embotellado. Los viticultores locales comparten con pasión sus conocimientos transmitidos de generación en generación.

## Catas Guiadas

Disfruta de catas guiadas profesionales donde podrás degustar diferentes variedades:
- **Tempranillo**: El rey de los vinos manchegos
- **Airén**: Vino blanco autóctono de la región
- **Syrah y Cabernet**: Variedades internacionales adaptadas al terruño

## Maridaje con Productos Locales

Las catas incluyen maridajes con quesos manchegos artesanales de distintas curaciones, aceites de oliva virgen extra, y embutidos tradicionales. Una experiencia gastronómica completa que despertará todos tus sentidos.

## Recomendaciones

- Reserva con antelación, especialmente en temporada de vendimia (septiembre-octubre)
- Lleva calzado cómodo para recorrer los viñedos
- La mejor hora es por la mañana temprano, cuando el clima es más fresco
- Pregunta por las bodegas con arquitectura tradicional manchega`,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop",
    date: "2024-03-15",
    readTime: "5 min",
    category: "Gastronomía"
  },
  {
    id: 2,
    title: "Molinos de Viento: Tras los Pasos de Don Quijote",
    excerpt: "Visita los emblemáticos molinos de viento de Campo de Criptana y Consuegra al amanecer.",
    content: `Los molinos de viento son el símbolo más icónico de La Mancha, inmortalizados por Miguel de Cervantes en su obra maestra "Don Quijote de la Mancha".

## La Ruta de los Molinos

Experimenta la magia de los molinos de viento al amanecer, cuando la luz dorada baña estas estructuras centenarias. Los principales puntos de interés son:

### Campo de Criptana
Con 10 molinos restaurados en perfecto estado, este pueblo ofrece la experiencia más auténtica. Algunos molinos mantienen su maquinaria original del siglo XVI y están abiertos al público.

### Consuegra
12 molinos alineados en el Cerro Calderico crean una imagen espectacular. El molino Sancho fue el último en dejar de moler trigo en 1980.

## Historia y Arquitectura

Estos gigantes blancos fueron construidos entre los siglos XVI y XIX para moler el trigo de la llanura manchega. Su arquitectura única está perfectamente adaptada a los vientos constantes de la región.

## Experiencia Fotográfica

La luz matinal crea un ambiente único para fotografías. Los contrastes entre el cielo azul, las estructuras blancas y la tierra ocre son impresionantes.

## Consejos para la Visita

- Llega al amanecer para evitar multitudes y capturar la mejor luz
- Visita el interior de al menos un molino para entender su funcionamiento
- Combina la visita con el castillo de Consuegra
- Pregunta por las rutas guiadas teatralizadas de Don Quijote`,
    image: "https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=1200&auto=format&fit=crop",
    date: "2024-03-10",
    readTime: "6 min",
    category: "Cultural"
  },
  {
    id: 3,
    title: "Desayuno Manchego Tradicional",
    excerpt: "Experimenta un auténtico desayuno manchego con productos locales y recetas centenarias.",
    content: `El desayuno manchego tradicional es una experiencia gastronómica que refleja la cultura rural de La Mancha, con recetas transmitidas por generaciones.

## Platos Tradicionales

### Migas Manchegas
El plato más emblemático del desayuno manchego. Pan duro convertido en un manjar con ajo, aceite de oliva y acompañado de uvas, melón o chocolate caliente.

### Gachas
Harina tostada con aceite, ajo y pimentón. Un desayuno energético que sustentaba a los trabajadores del campo desde el amanecer.

### Tortas Cenceñas
Pan plano tradicional, crujiente y delgado como el papel, ideal con aceite de oliva virgen extra local y tomate fresco.

## La Experiencia del Mercado

Visita los mercados matinales para descubrir productos frescos:
- Quesos manchegos artesanales
- Aceites de oliva premiados
- Miel de azahar y romero
- Embutidos caseros

## Donde Disfrutarlo

Muchos restaurantes locales ofrecen desayunos tradicionales, pero la mejor experiencia es en casas rurales donde se prepara al estilo antiguo, con productos de su propia huerta.

## Productos Locales

- **Aceite de oliva**: Denominación de Origen Protegida Campo de Montiel
- **Queso manchego**: Con D.O.P., elaborado con leche de oveja manchega
- **Miel**: De las flores silvestres de la llanura
- **Pan artesano**: Horneado en hornos de leña tradicionales

## Consejos

- Pide que te expliquen la historia de cada plato
- Prueba diferentes curaciones de queso manchego
- Acompaña con vino blanco joven de la región
- Pregunta por la receta familiar de las migas`,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&auto=format&fit=crop",
    date: "2024-03-05",
    readTime: "4 min",
    category: "Gastronomía"
  },
  {
    id: 4,
    title: "Artesanía Manchega: Talleres Matutinos",
    excerpt: "Aprende técnicas tradicionales de cerámica y encaje de bolillos con artesanos locales.",
    content: `La artesanía manchega es un tesoro cultural que se mantiene vivo gracias a maestros artesanos que preservan técnicas centenarias.

## Cerámica Tradicional

La cerámica manchega tiene características únicas con diseños geométricos en tonos azules, verdes y ocres. En los talleres aprenderás:

### Técnicas Ancestrales
- Modelado en torno manual
- Decoración con óxidos naturales
- Esmaltado tradicional
- Cocción en hornos de leña

## Encaje de Bolillos

El encaje de bolillos es un arte delicado que requiere paciencia y precisión. Las maestras artesanas enseñan:
- Manejo de los bolillos
- Lectura de patrones tradicionales
- Creación de puntillas y mantillas
- Historia del encaje manchego

## Forja Artesanal

Los herreros locales continúan fabricando cuchillos y herramientas tradicionales:
- Navajas de Albacete (las más famosas de España)
- Tijeras de esquilar
- Herramientas agrícolas tradicionales

## Experiencia Práctica

Los talleres matutinos son experiencias prácticas donde:
- Trabajas directamente con el artesano
- Creas tu propia pieza para llevar a casa
- Aprendes sobre la historia y cultura local
- Compartes café y conversación con otros visitantes

## Donde Encontrar Talleres

- **Daimiel**: Famosa por su cerámica azul
- **Almagro**: Centro de encaje de bolillos
- **Albacete**: Tradición cuchillera desde el siglo XVI
- **Villarrobledo**: Alfombras y tejidos tradicionales

## Reservas

Los talleres suelen durar 2-3 horas y requieren reserva previa. Grupos pequeños para atención personalizada.`,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&auto=format&fit=crop",
    date: "2024-03-01",
    readTime: "7 min",
    category: "Cultural"
  },
  {
    id: 5,
    title: "Ruta del Queso Manchego",
    excerpt: "Visita queserías tradicionales y aprende el proceso de elaboración del queso más famoso de España.",
    content: `El queso manchego es uno de los tesoros gastronómicos más preciados de España, con Denominación de Origen Protegida desde 1984.

## El Queso de la Mancha

Elaborado exclusivamente con leche de oveja manchega, este queso tiene una historia de más de 2000 años. Los romanos ya alababan su calidad.

## Proceso de Elaboración

### De la Oveja al Queso

Visita queserías familiares donde aprenderás cada paso:

1. **Ordeño tradicional**: Observa el manejo de las ovejas manchegas
2. **Cuajado**: Proceso de coagulación de la leche
3. **Prensado**: Con las tradicionales pleitas de esparto que dejan su marca característica
4. **Salado**: En salmuera durante varias horas
5. **Maduración**: En cámaras controladas durante meses

## Tipos de Curación

- **Fresco**: 2 semanas de maduración, sabor suave
- **Semicurado**: 3 meses, equilibrado y versátil
- **Curado**: 6 meses, sabor intenso
- **Viejo**: 12+ meses, para paladares experimentados

## Cata Profesional

Las catas incluyen:
- Degustación comparativa de diferentes curaciones
- Maridaje con vinos de la región
- Aceites de oliva virgen extra
- Membrillo artesano
- Pan de pueblo recién horneado

## La Oveja Manchega

Raza autóctona adaptada al clima extremo de La Mancha. Produce una leche rica en grasa que da al queso su sabor característico.

## Reconocimiento D.O.P.

El queso manchego con D.O.P. garantiza:
- Elaboración en La Mancha
- Leche 100% de oveja manchega
- Proceso tradicional
- Maduración mínima de 60 días
- Marca característica de pleita

## Donde Comprar

Las queserías artesanales ofrecen productos imposibles de encontrar en supermercados. Pregunta por quesos premiados en concursos internacionales.`,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&auto=format&fit=crop",
    date: "2024-02-25",
    readTime: "5 min",
    category: "Gastronomía"
  },
  {
    id: 6,
    title: "Parque Natural de las Lagunas de Ruidera",
    excerpt: "Descubre un paraíso natural con cascadas y lagunas de aguas cristalinas a primera hora de la mañana.",
    content: `Las Lagunas de Ruidera son uno de los espacios naturales más espectaculares de Castilla-La Mancha, un paraíso escondido en pleno corazón de La Mancha.

## El Sistema Lagunar

15 lagunas conectadas por cascadas y arroyos forman este ecosistema único:

### Lagunas Altas
- La Blanca
- La Conceja
- La Tomilla
- La Tinaja
- San Pedro

### Lagunas Medias
- La Redondilla
- La Lengua
- Salvadora
- Santos Morcillo

### Lagunas Bajas
- La Batana
- La Colgada
- El Rey
- La Cueva Morenilla

## Flora y Fauna

El parque natural alberga una biodiversidad excepcional:

### Aves
- Águila perdicera
- Garceta común
- Martín pescador
- Andarríos chico

### Vegetación
- Carrizales y juncales
- Bosques de ribera
- Plantas acuáticas endémicas

## Actividades Matutinas

### Senderismo
Rutas señalizadas de diferentes dificultades:
- **Ruta corta**: 2-3 km, fácil
- **Ruta media**: 8-10 km, moderada
- **Ruta completa**: 15-20 km, para experimentados

### Observación de Fauna
La mañana temprano es el mejor momento para avistar:
- Aves acuáticas en su actividad máxima
- Nutrias jugando en las cascadas
- Galápagos tomando el sol

### Fotografía
La luz matinal crea reflejos espectaculares en las aguas cristalinas de color turquesa.

## Las Cascadas

Las cascadas que conectan las lagunas son el elemento más espectacular del parque. La más impresionante es la cascada entre La Lengua y La Batana, con una caída de 20 metros.

## Recomendaciones

- Llega al amanecer para disfrutar de la tranquilidad
- Lleva prismáticos para observación de aves
- Calzado cómodo para senderismo
- Respeta las zonas de protección especial
- No está permitido el baño en todas las lagunas, consulta las normas

## Centro de Interpretación

Visita el centro para entender mejor el ecosistema y obtener mapas de rutas.

## Mejor Época

Primavera (abril-mayo) cuando el agua está en su nivel máximo y la vegetación está en plena floración.`,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop",
    date: "2024-02-20",
    readTime: "8 min",
    category: "Cultural"
  }
];

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] mt-20 md:mt-24">
        <img
          src={post.image}
          alt={post.title}
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
  );
};

export default BlogPost;
