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
    title: "Título del artículo 1",
    excerpt: "Breve descripción del artículo que aparecerá en la vista previa.",
    content: `## Introducción

Contenido del artículo aquí...

## Sección 1

Tu contenido aquí...

## Sección 2

Más contenido...`,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop",
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
