import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, ImageIcon, Compass, Euro } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    const root = document.documentElement;
    if (isMobileMenuOpen) {
      const originalOverflow = root.style.overflow;
      root.style.overflow = "hidden";
      return () => {
        root.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t('nav.home'), path: "/", icon: Home },
    { name: t('nav.gallery'), path: "/gallery", icon: ImageIcon },
    { name: t('nav.experiences'), path: "/blog", icon: Compass },
    { name: t('nav.pricing'), path: "/pricing", icon: Euro },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Check if we're on a page with white background
  const isWhiteBackgroundPage = location.pathname !== "/";
  const shouldShowSolidBackground = isMobileMenuOpen || isScrolled || isWhiteBackgroundPage;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          shouldShowSolidBackground
            ? "bg-white backdrop-blur-lg shadow-sm border-b border-border/50"
            : "bg-transparent"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link
            to="/"
            className={`text-xl sm:text-2xl md:text-3xl font-display font-light tracking-wide transition-all duration-300 ${
              shouldShowSolidBackground ? "text-foreground" : "text-white drop-shadow-lg"
            } hover:opacity-70`}
          >
            Casa Eufemia
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-light tracking-widest uppercase transition-all duration-300 relative group ${
                    shouldShowSolidBackground
                      ? isActive(link.path)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                      : isActive(link.path)
                      ? "text-white"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span>{link.name}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${
                      shouldShowSolidBackground ? "bg-primary" : "bg-white"
                    } ${
                      isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden transition-all duration-300 p-2 ${
              shouldShowSolidBackground ? "text-foreground" : "text-white drop-shadow-lg"
            } hover:opacity-70`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu" 
          className="fixed inset-0 md:hidden bg-white dark:bg-background z-[60] animate-fade-in"
        >
          <div className="flex flex-col items-center justify-center h-full gap-12 px-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col items-center gap-3 text-lg font-light tracking-widest uppercase transition-all duration-300 ${
                    isActive(link.path)
                      ? "text-primary scale-110"
                      : "text-foreground hover:text-primary hover:scale-105"
                  }`}
                >
                  <Icon size={40} strokeWidth={1.5} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
