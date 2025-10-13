export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
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
Este conjunto de 12 molinos sobre la Sierra Calderina ofrece vistas panorámicas espectaculares. El Castillo de la Muela completa este paisaje histórico.

## La Historia

Estos molinos harineros fueron construidos entre los siglos XVI y XIX. Utilizaban la fuerza del viento para moler el grano, siendo fundamentales para la economía local durante siglos.

## Experiencia Recomendada

- Visita al amanecer o al atardecer para las mejores fotografías
- Algunos molinos ofrecen demostraciones de molienda tradicional
- Combina la visita con un paseo por los pueblos blancos de La Mancha
- Prueba las tortas de aceite y otros productos locales en los mercados`,
    image: "https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=1200&auto=format&fit=crop",
    date: "2024-03-10",
    readTime: "6 min",
    category: "Cultural"
  },
  {
    id: 3,
    title: "Desayuno Manchego Tradicional",
    excerpt: "Experimenta un auténtico desayuno manchego con productos locales y recetas centenarias.",
    content: `El desayuno manchego es una experiencia gastronómica única que refleja la esencia de la cocina tradicional de esta tierra.

## Platos Típicos del Desayuno Manchego

Un desayuno manchego auténtico incluye:

### Migas Manchegas
Plato tradicional elaborado con pan duro, ajo, aceite de oliva y pimentón. Se acompaña con uvas, melón o torreznos.

### Gachas Manchegas
Elaboradas con harina de almorta, estas gachas son un desayuno energético tradicional de pastores y agricultores.

### Tortas Cenceñas
Pan ácimo tradicional, perfecto con aceite de oliva virgen extra local y tomate natural.

## Productos Locales de Temporada

- **Aceite de Oliva Virgen Extra**: De producción local, con denominación de origen
- **Queso Manchego**: En diferentes curaciones, desde tierno hasta curado
- **Miel de La Mancha**: De azahar, romero o tomillo
- **Embutidos Artesanales**: Chorizo, morcilla y salchichón

## Dónde Disfrutarlo

Visita los mercados matinales locales para descubrir productos frescos y conocer a los productores. Muchos pueblos organizan desayunos comunales donde se preparan recetas tradicionales.

## Consejos

- Llega temprano a los mercados (antes de las 10:00)
- Pregunta por los productos de temporada
- No dudes en pedir recomendaciones a los vendedores locales`,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&auto=format&fit=crop",
    date: "2024-03-05",
    readTime: "4 min",
    category: "Gastronomía"
  },
  {
    id: 4,
    title: "Artesanía Manchega: Talleres Matutinos",
    excerpt: "Aprende técnicas tradicionales de cerámica y encaje de bolillos con artesanos locales.",
    content: `La artesanía manchega es un tesoro cultural que se ha transmitido de generación en generación. Participar en talleres artesanales es una forma única de conectar con las tradiciones de La Mancha.

## Tipos de Artesanía Tradicional

### Cerámica de La Mancha
Aprende a trabajar el barro con técnicas centenarias. Los maestros ceramistas te enseñarán desde el torneado hasta la decoración con motivos tradicionales manchegos.

### Encaje de Bolillos
Una técnica de encaje intrincada que requiere paciencia y habilidad. Las encajeras locales mantienen viva esta tradición que se remonta al siglo XVI.

### Forja Artesanal
Descubre cómo se elaboran los famosos cuchillos manchegos y otras herramientas tradicionales con técnicas de forja artesanal.

### Cestería
El arte de tejer cestos con mimbre y esparto, materiales tradicionales de la región.

## Experiencias Disponibles

Los talleres suelen ser por la mañana (9:00-12:00) y incluyen:
- Introducción a la historia de la artesanía
- Demostración por parte de maestros artesanos
- Práctica guiada donde creas tu propia pieza
- Visita a los talleres tradicionales

## Qué Aprenderás

No solo técnicas artesanales, sino también historias, tradiciones y el valor cultural de estos oficios. Muchos artesanos comparten anécdotas familiares y la evolución de su oficio.

## Información Práctica

- Reserva con al menos una semana de antelación
- Los talleres suelen durar 2-3 horas
- La mayoría de materiales están incluidos
- Puedes llevarte tu creación como recuerdo`,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&auto=format&fit=crop",
    date: "2024-03-01",
    readTime: "7 min",
    category: "Cultural"
  },
  {
    id: 5,
    title: "Ruta del Queso Manchego",
    excerpt: "Visita queserías tradicionales y aprende el proceso de elaboración del queso más famoso de España.",
    content: `El Queso Manchego es uno de los productos más emblemáticos de España, con Denominación de Origen Protegida. Una visita a las queserías locales es una experiencia gastronómica imperdible.

## El Proceso de Elaboración

### Origen
El Queso Manchego se elabora exclusivamente con leche de oveja manchega, una raza autóctona adaptada perfectamente al clima y terreno de La Mancha.

### Elaboración Tradicional
Visita queserías familiares donde observarás:
- El ordeño tradicional de las ovejas
- El cuajado y corte de la cuajada
- El moldeado y prensado
- Las cámaras de maduración

## Tipos de Curación

### Queso Fresco (2 semanas)
Sabor suave y cremoso, perfecto para ensaladas.

### Semicurado (3-4 meses)
Equilibrio perfecto entre suavidad y carácter.

### Curado (6-12 meses)
Sabor intenso y textura granulosa.

### Viejo (más de 12 meses)
El más intenso, con cristales de tirosina que aportan textura crujiente.

## Catas Comparativas

Las queserías ofrecen catas donde podrás degustar diferentes curaciones, aprendiendo a identificar matices de sabor, textura y aroma. Se acompañan con:
- Vinos de la región
- Membrillo artesanal
- Frutos secos locales
- Pan artesano

## Maridajes Recomendados

- **Queso tierno**: Vinos blancos jóvenes
- **Semicurado**: Vinos tintos jóvenes
- **Curado**: Vinos tintos reserva
- **Viejo**: Vinos dulces o crianza

## Información para la Visita

- Mejor época: primavera (época de partos)
- Duración: 2-3 horas
- Incluye degustación y compra directa
- Muchas queserías ofrecen visitas gratuitas`,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&auto=format&fit=crop",
    date: "2024-02-25",
    readTime: "5 min",
    category: "Gastronomía"
  },
  {
    id: 6,
    title: "Parque Natural de las Lagunas de Ruidera",
    excerpt: "Descubre un paraíso natural con cascadas y lagunas de aguas cristalinas a primera hora de la mañana.",
    content: `Las Lagunas de Ruidera conforman un paraje natural único en Europa, un sistema de 15 lagunas interconectadas por cascadas y arroyos que se extienden entre las provincias de Ciudad Real y Albacete.

## Un Espectáculo Natural

El Parque Natural de las Lagunas de Ruidera es un oasis en el corazón de La Mancha. Las aguas de color turquesa contrastan con el paisaje árido circundante, creando un paisaje de belleza excepcional.

## Las 15 Lagunas

Las lagunas están divididas en dos grupos:

### Lagunas Altas
- Laguna Blanca
- Laguna Conceja
- Laguna Tomilla
- Laguna Tinaja
- Laguna San Pedro

### Lagunas Bajas
- Laguna Redondilla
- Laguna Lengua
- Laguna Salvadora
- Laguna Santos Morcillo
- Laguna Batana
- Y otras más

## Actividades Disponibles

### Senderismo
Más de 50 km de rutas señalizadas que recorren las lagunas, con diferentes niveles de dificultad.

### Observación de Aves
El parque es hogar de más de 200 especies de aves, incluyendo garzas, cormoranes y águilas.

### Piragüismo y Paddle Surf
En algunas lagunas está permitido el uso de embarcaciones no motorizadas.

### Fotografía
Las cascadas y formaciones kársticas ofrecen oportunidades fotográficas únicas, especialmente al amanecer.

## Flora y Fauna

El parque alberga una rica biodiversidad:
- Carrizo, enea y juncos en las orillas
- Sabinas, encinas y pinos en las zonas secas
- Nutrias, zorros y jabalíes
- Más de 25 especies de peces

## Consejos para la Visita

- **Mejor época**: Primavera (abril-mayo) cuando las lagunas están llenas
- **Hora recomendada**: Amanecer para evitar multitudes y disfrutar de la mejor luz
- **Qué llevar**: Prismáticos, cámara, calzado cómodo y agua
- **Duración**: Un día completo para recorrer las principales lagunas
- **Centro de Interpretación**: Comienza aquí para entender el ecosistema

## Alrededores

Cerca del parque se encuentran:
- La Cueva de Montesinos, mencionada en Don Quijote
- Pueblos con encanto como Ruidera y Ossa de Montiel
- Áreas de picnic y restaurantes con gastronomía local`,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop",
    date: "2024-02-20",
    readTime: "8 min",
    category: "Cultural"
  }
];
