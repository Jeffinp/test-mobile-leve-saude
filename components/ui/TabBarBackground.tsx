// This is a shim for web and Android where the tab bar is generally opaque.

/**
 * Componente padrão para o fundo da barra de abas em plataformas que não são iOS (web e Android).
 * Em geral, a barra de abas é opaca nessas plataformas, então este componente não renderiza nada.
 * @type {undefined}
 */
export default undefined;

/**
 * Hook para calcular o overflow da barra de abas na parte inferior.
 * Em plataformas que não são iOS, o overflow é geralmente 0, pois a barra de abas é opaca e não causa sobreposição.
 * @returns {number} O valor do overflow inferior da barra de abas (sempre 0 para web e Android).
 */
export function useBottomTabOverflow() {
  return 0;
}