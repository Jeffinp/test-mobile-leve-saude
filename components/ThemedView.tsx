import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * Propriedades para o componente ThemedView.
 * Estende as propriedades padrão de ViewProps e adiciona opções para cores de tema.
 * @interface ThemedViewProps
 * @property {string} [lightColor] - Cor de fundo para o tema claro.
 * @property {string} [darkColor] - Cor de fundo para o tema escuro.
 */
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

/**
 * Um componente View que adapta sua cor de fundo com base no tema atual (claro/escuro).
 * Pode receber cores específicas para os temas claro e escuro, ou usará as cores padrão do tema.
 * @param {ThemedViewProps} props - As propriedades do componente.
 * @returns {JSX.Element} Um componente View com cor de fundo adaptada ao tema.
 */
export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  /**
   * Hook para obter a cor de fundo baseada no tema atual.
   * Se `lightColor` ou `darkColor` forem fornecidos, eles terão precedência.
   * Caso contrário, a cor 'background' do tema será usada.
   */
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}