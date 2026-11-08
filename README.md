# Casa Eufemia - Casa Rural

Web oficial de Casa Eufemia, una casa rural situada en el corazón de La Mancha, en Arenales de San Gregorio, Ciudad Real.

## 🏡 Características

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Rendimiento**: Lazy loading de imágenes y optimización de assets
- **SEO Optimizado**: Meta tags, Open Graph y Schema.org
- **Galería de Fotos**: Lightbox para visualización de imágenes
- **Blog de Experiencias**: Artículos sobre turismo local y gastronomía
- **Diseño Moderno**: Interfaz limpia y elegante con animaciones suaves

## 🛠 Tecnologías

- **React 18** - Framework frontend
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS** - Estilos y diseño
- **React Router** - Navegación
- **Lucide React** - Iconos
- **Shadcn/ui** - Componentes UI

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── ui/            # Componentes UI base
│   ├── Hero.tsx       # Hero section con video
│   ├── Navbar.tsx     # Navegación principal
│   ├── Footer.tsx     # Pie de página
│   └── ...
├── pages/             # Páginas de la aplicación
├── data/              # Datos estáticos
└── assets/            # Imágenes y recursos
```

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 📝 Personalización de Contenido

### Blog Posts
Edita `/src/data/blogPosts.ts` para actualizar los artículos del blog con tu propio contenido.

### Imágenes
- Galería principal (página de inicio): `/public/1-6.jpg`
- Galería completa: todos los archivos en `/public/`
- Hero video: URL de YouTube configurada en `/src/pages/Index.tsx`

### Información de Contacto
Actualiza `/src/components/Footer.tsx` con tus datos reales:
- Email
- Teléfono
- Dirección
- Redes sociales
- Número de registro turístico

### Reseñas de Google
La sección de opiniones consulta Google Places desde `/api/google-reviews`, sin exponer la clave al navegador. El Place ID de Casa Rural Eufemia facilitado por la propiedad (`ChIJbSYSx-1VaA0RKuoR6Iyw8fI`) ya está incorporado. Para activarla en Vercel, añade esta variable en **Project Settings → Environment Variables**:

```bash
GOOGLE_MAPS_API_KEY=tu_clave_restringida
```

Activa **Places API (New)** y la facturación en Google Maps Platform; verifica que el Place ID corresponde exactamente a la ficha de Casa Rural Eufemia. Restringe la clave a esa API y a la IP de salida solo si dispones de una IP fija. Al usarse desde una función de servidor, no configures una restricción HTTP-referrer; guarda la clave solo como variable de entorno de producción en Vercel. Fija una cuota/presupuesto en Google Cloud antes de activarla: la consulta de reseñas usa el nivel **Place Details Enterprise + Atmosphere**, devuelve hasta cinco opiniones seleccionadas por relevancia y se consulta en cada carga de la sección para no almacenar el contenido de Google Maps. Después de añadir las variables, vuelve a desplegar el proyecto y comprueba que `/api/google-reviews` devuelve `configured: true` con opiniones de la ficha correcta. Sin estas variables, la sección enlaza a Google Maps, pero no muestra comentarios en la web.

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de diseño basado en tokens CSS definidos en `/src/index.css`:
- Colores semánticos (primary, secondary, muted, etc.)
- Espaciado consistente
- Animaciones predefinidas
- Modo claro/oscuro

## 📱 Optimizaciones Implementadas

- ✅ Lazy loading de imágenes
- ✅ Optimización de fuentes
- ✅ Minificación de assets
- ✅ Code splitting automático
- ✅ SEO optimizado con meta tags completos
- ✅ YouTube video optimizado para hero
- ✅ Componentes modulares y reutilizables
- ✅ Diseño responsive mobile-first

## 🔍 SEO

El proyecto incluye:
- Meta tags completos (title, description, keywords)
- Open Graph para redes sociales
- Twitter Cards
- Tags de geolocalización
- Canonical URLs
- Schema.org structured data ready

## 🚀 Despliegue

**Proyecto Lovable**: https://lovable.dev/projects/9113758b-2176-46ae-a435-3834e52b1a56

**Desplegar**: Abre el proyecto en Lovable y haz clic en Share → Publish

**Custom Domain**: Navega a Project > Settings > Domains para conectar tu dominio

## 📄 Licencia

Todos los derechos reservados © Casa Eufemia
