/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Cor de destaque para o tema claro.
 * @type {string}
 */
const tintColorLight = "#0a7ea4";
/**
 * Cor de destaque para o tema escuro.
 * @type {string}
 */
const tintColorDark = "#fff";

/**
 * Objeto que define as cores utilizadas na aplicação para os temas claro e escuro.
 * @property {object} light - Cores para o tema claro.
 * @property {string} light.text - Cor do texto no tema claro.
 * @property {string} light.background - Cor de fundo no tema claro.
 * @property {string} light.tint - Cor de destaque no tema claro.
 * @property {string} light.icon - Cor dos ícones no tema claro.
 * @property {string} light.tabIconDefault - Cor padrão dos ícones da aba no tema claro.
 * @property {string} light.tabIconSelected - Cor dos ícones da aba selecionados no tema claro.
 * @property {string} light.tabBarActiveBackground - Cor de fundo da aba ativa no tema claro.
 * @property {object} dark - Cores para o tema escuro.
 * @property {string} dark.text - Cor do texto no tema escuro.
 * @property {string} dark.background - Cor de fundo no tema escuro.
 * @property {string} dark.tint - Cor de destaque no tema escuro.
 * @property {string} dark.icon - Cor dos ícones no tema escuro.
 * @property {string} dark.tabIconDefault - Cor padrão dos ícones da aba no tema escuro.
 * @property {string} dark.tabIconSelected - Cor dos ícones da aba selecionados no tema escuro.
 * @property {string} dark.tabBarActiveBackground - Cor de fundo da aba ativa no tema escuro.
 */
export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    tabBarActiveBackground: "#f0f0f0",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    tabBarActiveBackground: "#333333",
  },
};