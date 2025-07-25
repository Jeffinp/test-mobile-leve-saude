import { View, type ViewProps } from "react-native";

/**
 * Propriedades para o componente ThemedView.
 * Estende as propriedades padrão de ViewProps.
 * @interface ThemedViewProps
 */
export type ThemedViewProps = ViewProps;

/**
 * Um componente View com cor de fundo fixa.
 * @param {ThemedViewProps} props - As propriedades do componente.
 * @returns {JSX.Element} Um componente View com cor de fundo definida.
 */
export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = "#ffffff";

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
