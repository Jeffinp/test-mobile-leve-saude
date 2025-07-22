/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * Hook personalizado para obter uma cor baseada no tema atual (claro/escuro).
 * Permite sobrescrever as cores padrão do tema com cores específicas fornecidas via props.
 * @param {object} props - Objeto contendo as cores para os temas claro e escuro.
 * @param {string} [props.light] - Cor a ser usada no tema claro.
 * @param {string} [props.dark] - Cor a ser usada no tema escuro.
 * @param {keyof typeof Colors.light & keyof typeof Colors.dark} colorName - O nome da cor a ser buscada no objeto `Colors` se não for fornecida via props.
 * @returns {string} A cor apropriada para o tema atual.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  /**
   * Obtém o esquema de cores atual do sistema.
   * Assume 'light' como padrão se o esquema de cores não puder ser determinado.
   */
  const theme = useColorScheme() ?? 'light';
  /**
   * Tenta obter a cor das propriedades fornecidas, com base no tema atual.
   */
  const colorFromProps = props[theme];

  // Se uma cor específica foi fornecida para o tema atual, retorna-a.
  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Caso contrário, retorna a cor do objeto `Colors` com base no tema e no nome da cor.
    return Colors[theme][colorName];
  }
}