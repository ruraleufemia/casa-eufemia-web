import { useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { alternatePath, langOf, type Lang } from '@/lib/locales';

interface LanguageSwitcherProps {
  isTransparent?: boolean;
}

/**
 * Cambiar de idioma ahora es ir a otra dirección, no cambiar un ajuste en
 * el navegador: /gallery lleva a /en/gallery y al revés. Son enlaces <a> de
 * verdad, con recarga, por dos motivos: Google los sigue y encuentra la
 * versión inglesa, y la página nueva arranca ya en su idioma en lugar de
 * pintarse primero en el anterior.
 */
const LanguageSwitcher = ({ isTransparent = false }: LanguageSwitcherProps) => {
  const { pathname } = useLocation();
  const lang = langOf(pathname);
  const otro = alternatePath(pathname);

  const destino = (destinoLang: Lang) => {
    if (destinoLang === lang) return pathname;
    return otro ?? (destinoLang === 'en' ? '/en' : '/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1.5 transition-colors ${
            isTransparent
              ? "text-white hover:bg-white/20 drop-shadow-lg"
              : "text-foreground hover:bg-muted/50"
          }`}
        >
          <Globe size={18} strokeWidth={1.5} />
          <span className="uppercase text-xs font-light tracking-widest">
            {lang === 'es' ? 'ES' : 'EN'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border z-[70] min-w-[120px]">
        <DropdownMenuItem asChild className={`cursor-pointer ${lang === 'es' ? 'bg-muted' : ''}`}>
          <a href={destino('es')} hrefLang="es" lang="es" className="flex items-center gap-2">
            <span aria-hidden="true">🇪🇸</span>
            <span>Español</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={`cursor-pointer ${lang === 'en' ? 'bg-muted' : ''}`}>
          <a href={destino('en')} hrefLang="en" lang="en" className="flex items-center gap-2">
            <span aria-hidden="true">🇬🇧</span>
            <span>English</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
