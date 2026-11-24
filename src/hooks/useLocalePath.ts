import { useLocation } from "react-router-dom";
import { langOf, localizedPath } from "@/lib/locales";

/**
 * Traduce una dirección en español al idioma de la página actual.
 *
 * Se usa en todos los enlaces internos: en la web inglesa, un enlace a
 * "/gallery" tiene que llevar a "/en/gallery". Si no, el primer clic te
 * saca del inglés y Google ve una versión que se enlaza a sí misma mal.
 */
export const useLocalePath = () => {
  const { pathname } = useLocation();
  const lang = langOf(pathname);
  return (path: string) => localizedPath(path, lang);
};
