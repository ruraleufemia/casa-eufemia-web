import { useLocation } from 'react-router-dom';
import { alternatePath, langOf, type Lang } from '@/lib/locales';

interface LanguageSwitcherProps {
  isTransparent?: boolean;
}

const ETIQUETAS: Record<Lang, string> = { es: 'ES', en: 'EN' };

/**
 * ES · EN, siempre a la vista.
 *
 * Antes era un desplegable, y eso escondía el idioma dos veces: había que
 * pulsar para descubrir que existía la versión inglesa, y en el HTML no
 * había ningún enlace a ella, porque el contenido de un desplegable solo
 * se crea al abrirlo. Ni los visitantes la encontraban ni Google tenía
 * por dónde llegar a /en.
 *
 * Ahora el idioma activo es texto y el otro es un enlace normal con su
 * dirección: una sola pulsación, visible en el móvil y rastreable.
 */
const LanguageSwitcher = ({ isTransparent = false }: LanguageSwitcherProps) => {
  const { pathname } = useLocation();
  const actual = langOf(pathname);
  const destino = alternatePath(pathname) ?? (actual === 'es' ? '/en' : '/');

  const estiloActivo = isTransparent ? 'text-white' : 'text-primary';
  const estiloEnlace = isTransparent
    ? 'text-white/70 hover:text-white'
    : 'text-muted-foreground hover:text-primary';

  const marca = (lang: Lang) => {
    const esActual = lang === actual;
    const texto = (
      <span
        className={`text-xs uppercase tracking-widest transition-colors ${
          esActual ? `${estiloActivo} font-medium` : `${estiloEnlace} font-light`
        }`}
      >
        {ETIQUETAS[lang]}
      </span>
    );
    if (esActual) return texto;
    return (
      <a
        href={destino}
        hrefLang={lang}
        lang={lang}
        aria-label={lang === 'en' ? 'View this page in English' : 'Ver esta página en español'}
      >
        {texto}
      </a>
    );
  };

  return (
    <div
      className={`flex items-center gap-1.5 px-1 ${isTransparent ? 'drop-shadow-lg' : ''}`}
    >
      {marca('es')}
      <span aria-hidden="true" className="text-xs opacity-30">
        ·
      </span>
      {marca('en')}
    </div>
  );
};

export default LanguageSwitcher;
