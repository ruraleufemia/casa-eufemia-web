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
    title: "Campo de Criptana",
    excerpt: "A pocos kilómetros de Arenales de San Gregorio, Campo de Criptana ofrece una experiencia que va más allá de sus famosos molinos de viento.",
    content: `## Introducción

A pocos kilómetros de nuestro alojamiento en Arenales de San Gregorio se encuentra Campo de Criptana, uno de esos sitios que aunque hayas visto en fotos, te sorprende cuando estás allí. Sus molinos de viento dominando la llanura son parte de la historia de La Mancha y de la imagen que todos tenemos del Quijote. Pero más allá de la postal, lo que realmente engancha es la sensación del lugar.

Subir hasta los molinos y ver cómo se extiende el paisaje a tu alrededor es algo que transmite tranquilidad. No es solo un punto turístico, es un espacio abierto, silencioso, donde parece que todo va más despacio.

## El atardecer, el mejor momento

Si hay un momento especial para visitar Campo de Criptana es la caída de la tarde.
Cuando el sol empieza a bajar, el cielo se llena de colores cálidos: naranjas, rosas, violetas… y los molinos se recortan en el horizonte creando una imagen difícil de olvidar. Es uno de esos atardeceres que te invitan a quedarte quieto, a mirar y a dejar pasar el tiempo.

Puedes estar charlando con alguien, haciendo fotos o simplemente sentado, pero al final todos acabamos igual: mirando en silencio.

## Paseo, historia y calma

Pasear por el barrio del Albaicín con sus casas blancas es muy agradable.

Si te gusta la fotografía, te encontrarás buscando ángulos una y otra vez.

Y si simplemente necesitas desconectar, aquí es fácil respirar profundo y relajar la mente.

## Muy cerca de nuestro alojamiento

Una de las ventajas de alojarse en Arenales de San Gregorio es precisamente esa tranquilidad y la cercanía a lugares con tanta magia como este. Puedes ir por la tarde, ver el atardecer y volver sin prisas, disfrutando del camino.

Campo de Criptana no solo se visita, se siente.
Y si vienes, entenderás perfectamente por qué sus atardeceres se quedan guardados dentro.

Más contenido...`,
    image: "/IMG_4765.JPG",
    image: "/IMG_4770.JPG",
    date: "2024-03-15",
    readTime: "5 min",
    category: "Gastronomía"
  },
  {
    id: 2,
    title: "Título del artículo 2",
    excerpt: "Breve descripción del artículo que aparecerá en la vista previa.",
    content: `## Introducción

Contenido del artículo aquí...

## Sección 1

Tu contenido aquí...

## Sección 2

Más contenido...`,
    image: "https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=1200&auto=format&fit=crop",
    date: "2024-03-10",
    readTime: "6 min",
    category: "Cultural"
  },
  {
    id: 3,
    title: "Título del artículo 3",
    excerpt: "Breve descripción del artículo que aparecerá en la vista previa.",
    content: `## Introducción

Contenido del artículo aquí...

## Sección 1

Tu contenido aquí...

## Sección 2

Más contenido...`,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&auto=format&fit=crop",
    date: "2024-03-05",
    readTime: "4 min",
    category: "Gastronomía"
  },
  {
    id: 4,
    title: "Título del artículo 4",
    excerpt: "Breve descripción del artículo que aparecerá en la vista previa.",
    content: `## Introducción

Contenido del artículo aquí...

## Sección 1

Tu contenido aquí...

## Sección 2

Más contenido...`,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&auto=format&fit=crop",
    date: "2024-03-01",
    readTime: "7 min",
    category: "Cultural"
  },
  {
    id: 5,
    title: "Título del artículo 5",
    excerpt: "Breve descripción del artículo que aparecerá en la vista previa.",
    content: `## Introducción

Contenido del artículo aquí...

## Sección 1

Tu contenido aquí...

## Sección 2

Más contenido...`,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&auto=format&fit=crop",
    date: "2024-02-25",
    readTime: "5 min",
    category: "Gastronomía"
  },
  {
    id: 6,
    title: "Título del artículo 6",
    excerpt: "Breve descripción del artículo que aparecerá en la vista previa.",
    content: `## Introducción

Contenido del artículo aquí...

## Sección 1

Tu contenido aquí...

## Sección 2

Más contenido...`,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop",
    date: "2024-02-20",
    readTime: "8 min",
    category: "Cultural"
  }
];
