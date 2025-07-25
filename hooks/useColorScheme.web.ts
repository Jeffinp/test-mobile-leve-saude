/**
 * Hook simplificado que sempre retorna 'light' como esquema de cores para ambiente web.
 * Substitui o hook original que verificava o esquema de cores do sistema.
 * @returns {'light'} Sempre retorna 'light'
 */
export function useColorScheme(): 'light' {
  return 'light';
}