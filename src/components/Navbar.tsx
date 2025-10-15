import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, ImageIcon, Compass } from "lucide-react";

const Navbar = () => {
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
    { name: "Inicio", path: "/", icon: Home },
    { name: "Galería", path: "/gallery", icon: ImageIcon },
    { name: "Experiencias", path: "/blog", icon: Compass },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isMobileMenuOpen || isScrolled
          ? "bg-white backdrop-blur-lg shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link
            to="/"
            className={`text-xl sm:text-2xl md:text-3xl font-display font-light tracking-wide transition-all duration-300 ${
              isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
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
                    isScrolled
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
                      isScrolled ? "bg-primary" : "bg-white"
                    } ${
                      isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden transition-all duration-300 p-2 ${
              isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
            } hover:opacity-70`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Navigation - Full Screen */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="fixed inset-x-0 top-20 bottom-0 md:hidden bg-white dark:bg-background z-40 animate-fade-in overflow-y-auto">
            <div className="flex flex-col items-center justify-center min-h-full gap-8 px-6 py-12">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex flex-col items-center gap-3 text-base font-light tracking-widest uppercase transition-all duration-300 ${
                      isActive(link.path)
                        ? "text-primary scale-110"
                        : "text-foreground hover:text-primary hover:scale-105"
                    }`}
                  >
                    <Icon size={32} strokeWidth={1.5} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
