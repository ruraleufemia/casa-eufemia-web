export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  images?: string[]; // Imágenes adicionales para mostrar en el artículo
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

`,
    image: "/IMG_4765.JPG",
    images: ["/IMG_4770.JPG"]
  },
  {
    id: 2,
    title: "Casa Medrano",
    excerpt: "Este rincón histórico combina cultura y serenidad en un espacio sencillo pero lleno de significado. Una visita breve, cercana y perfecta para disfrutar de una tarde tranquila con un toque de historia.",
    content: `## Introducción

A pocos minutos en coche desde nuestro alojamiento en Arenales de San Gregorio se encuentra Argamasilla de Alba, un pueblo que guarda uno de los lugares más curiosos y especiales de La Mancha: la Casa Medrano, conocida por ser la supuesta cárcel de Cervantes y el lugar donde pudo comenzar a escribirse Don Quijote de la Mancha.

Este edificio, sencillo por fuera, esconde una historia que llama la atención nada más conocerla. Se dice que Miguel de Cervantes estuvo preso aquí en el siglo XVI, y que durante ese tiempo pudo empezar a dar forma a la obra que, con los años, se convertiría en una de las novelas más importantes de la literatura universal.
Estar allí, en la misma sala donde se cree que escribió parte del Quijote, tiene algo especial. Es uno de esos sitios donde la historia se siente cercana, casi real.

## Un lugar que mezcla cultura y tranquilidad

La Casa Medrano no es un museo grande ni recargado. Y precisamente por eso resulta agradable.
No necesitas ser un amante profundo de la literatura para disfrutarlo. Es un plan ligero, interesante y perfecto para una mañana o tarde tranquila.

Cerca de casa y fácil de visitar

Es una salida corta, cómoda y con ese toque histórico que hace el viaje más especial.

`,
    image: "/IMG_4586.JPG"
  },
  {
    id: 3,
    title: "Lagunas de Ruidera",
    excerpt: "Sus aguas enlazadas por cascadas y saltos crean un paisaje único, ideal para pasear, relajarse o disfrutar de actividades como kayak, paddle surf, ciclismo o rutas de senderismo.",
    content: `## Introducción

Descubre las Lagunas de Ruidera: un paraíso natural cerca de nuestro alojamiento en Arenales de San Gregorio
Si hay un lugar que siempre recomendamos a quienes se alojan en nuestra casa en Arenales de San Gregorio es, sin duda, las Lagunas de Ruidera. A tan solo unos kilómetros, se encuentra uno de los espacios naturales más bonitos y sorprendentes de Castilla La Mancha, perfecto para desconectar y disfrutar de la naturaleza en estado puro.

Lo más especial de este paraje es cómo el agua se va enlazando entre lagunas mediante pequeñas cascadas y saltos naturales, creando un paisaje que, sinceramente, no te esperas encontrar aquí. No hace falta ser un amante del senderismo para disfrutarlo; simplemente pasear, sentarte frente al agua o hacer una ruta sencilla ya te reconecta con todo.

## Un lugar para hacer lo que te apetezca: relax o aventura

Las Lagunas de Ruidera son muy versátiles. Puedes ir a pasar el día en plan tranquilo, llevarte algo de comer, una bebida fresca y buscar una sombra junto al agua.
Pero, si eres más de moverte, tienes muchas opciones:
-Rutas de senderismo y miradores con vistas impresionantes
-Kayak y paddle surf para disfrutar del agua de una forma diferente
-Zonas de baño en verano, ideales para refrescarse
-Ciclismo por caminos accesibles y bien señalizados

Y si vas con niños, es un plan perfecto: agua clara, zonas seguras, naturaleza y espacio para jugar sin prisas.
## La comodidad de alojarte en Arenales de San Gregorio

Una de las ventajas de nuestro alojamiento es precisamente la tranquilidad del entorno. Arenales es un pueblo pequeño, acogedor, donde se está en calma. Y lo mejor es que desde aquí puedes ir a las Lagunas de Ruidera en poco tiempo, sin tener que alojarte en zonas más saturadas o turísticas.

Si buscas naturaleza, aire limpio y un sitio bonito donde pasar unos días, las Lagunas de Ruidera son un acierto seguro. Y desde nuestro alojamiento tendrás la combinación perfecta: escapada, descanso y aventura, todo a tu ritmo

`,
    image: "/Ruidera1.jpg",
    images: ["/Ruidera2.jpg", "/Ruidera3.jpg", "/Ruidera4.jpg", "/Ruidera5.jpg"]
  },
  {
    id: 4,
    title: "Cooperativa Virgen de las Viñas",
    excerpt: "Durante la visita puedes descubrir el proceso del vino paso a paso y disfrutar del Museo Infanta Elena, con exposiciones de arte contemporáneo que complementan la experiencia.",
    content: `## Introducción

A muy pocos minutos de nuestro alojamiento en Arenales de San Gregorio tienes la oportunidad de conocer uno de los lugares más representativos de la cultura vitivinícola de la zona: la Cooperativa Virgen de las Viñas en Tomelloso.
No es solo una bodega, es parte de la identidad de La Mancha y una de las cooperativas más grandes y reconocidas de Europa.
Nada más llegar, impresiona el tamaño de las instalaciones y el ambiente tranquilo en el que todo parece girar alrededor de la elaboración del vino. Si te interesa saber cómo se transforma la uva en vino, aquí lo explican de forma clara y cercana.
Durante la visita vas recorriendo distintas salas y depósitos, conociendo el proceso paso a paso. Es una experiencia muy amena, tanto si ya te gusta el vino como si simplemente tienes curiosidad.


## El Museo Infanta Elena: arte entre vinos

Dentro del mismo complejo se encuentra el Museo Infanta Elena, un espacio que sorprende por su calidad y por lo bien cuidado que está.
Es un museo moderno, luminoso, con exposiciones de pintura, escultura y arte contemporáneo que cambian con frecuencia. La mezcla entre tradición vinícola y expresión artística crea una visita muy especial, diferente y agradable.

Es uno de esos lugares que hacen que el viaje sea más completo: no solo visitas un sitio, sino que vives una experiencia.


## Una visita perfecta desde nuestro alojamiento

Lo mejor de todo es que está muy cerca de nuestra casa en Arenales de San Gregorio, por lo que puedes ir sin prisas, dedicar el tiempo que quieras y volver tranquilamente después.
Ideas para aprovechar la visita:
- Visita guiada a la cooperativa
- Recorrido por el museo
- Degustación o compra de vino local para disfrutar luego en nuestra casa rural.

Ya sea que vengas en pareja, en familia o con amigos, es un plan sencillo, interesante y muy fácil de organizar.
Si buscas conocer un poco más la esencia de esta tierra, la Cooperativa Virgen de las Viñas y el Museo Infanta Elena son una parada que merece la pena.

`,
    image: "/IMG_4389.JPG",
    images: ["/IMG_4398.JPG","IMG_4469.JPG"]

  }
];
