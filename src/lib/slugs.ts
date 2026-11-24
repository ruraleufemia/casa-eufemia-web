/**
 * Las direcciones de las páginas de búsqueda, en un archivo sin
 * dependencias.
 *
 * Antes cada página exportaba la suya, pero el mapa de idiomas necesita
 * todas y las páginas necesitan el mapa (lo usa el componente de SEO), así
 * que se formaba un círculo: al arrancar, el mapa leía una constante de un
 * módulo a medio cargar y salían direcciones "/undefined".
 */
export const POOL_BBQ_SLUG = "casa-rural-con-piscina-y-barbacoa";
export const DOGS_SLUG = "casa-rural-que-admite-perros";
export const MADRID_SLUG = "escapada-rural-desde-madrid";
