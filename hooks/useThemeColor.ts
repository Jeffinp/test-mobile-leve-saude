/**
 * Hook simplificado que retorna cores fixas para a interface do usuário.
 */

// Definição das cores fixas da interface
const UIColors = {
  text: "#11181C",
  background: "#ffffff",
  tint: "#0a7ea4",
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: "#0a7ea4",
  tabBarActiveBackground: "#f0f0f0",
};

/**
 * Hook simplificado para obter uma cor da interface.
 * Não depende mais do tema claro/escuro, retornando sempre as mesmas cores.
 * @param {object} _props - Parâmetro ignorado (mantido para compatibilidade)
 * @param {keyof typeof UIColors} colorName - O nome da cor a ser retornada
 * @returns {string} A cor correspondente ao nome fornecido
 */
export function useThemeColor(
  _props: { light?: string; dark?: string },
  colorName: keyof typeof UIColors
): string {
  return UIColors[colorName];
}