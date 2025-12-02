import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
  isTransparent?: boolean;
}

const LanguageSwitcher = ({ isTransparent = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
            {i18n.language === 'es' ? 'ES' : 'EN'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border z-[70] min-w-[120px]">
        <DropdownMenuItem 
          onClick={() => changeLanguage('es')}
          className={`cursor-pointer gap-2 ${i18n.language === 'es' ? 'bg-muted' : ''}`}
        >
          <span>🇪🇸</span>
          <span>Español</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer gap-2 ${i18n.language === 'en' ? 'bg-muted' : ''}`}
        >
          <span>🇬🇧</span>
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
