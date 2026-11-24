import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

/**
 * El idioma lo manda la dirección, no el navegador.
 *
 * Importa arrancar ya en el idioma correcto: las páginas se sirven como
 * HTML ya hecho, así que si la dirección es /en y React empieza en
 * español, lo que pinta no coincide con lo que el navegador ya tiene en
 * pantalla y se ve un parpadeo (o React rehace la página entera).
 *
 * Se mira la dirección directamente y no se usa el detector del navegador:
 * alguien de Londres que abra la web en español la quiere en español, y
 * quien abra /en la quiere en inglés aunque tenga el móvil en castellano.
 */
const idiomaDeLaDireccion = () => {
  if (typeof window === 'undefined') return 'es';
  const ruta = window.location.pathname;
  return ruta === '/en' || ruta.startsWith('/en/') ? 'en' : 'es';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    lng: idiomaDeLaDireccion(),
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
