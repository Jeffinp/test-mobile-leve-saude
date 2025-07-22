import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

/**
 * Componente de fundo da barra de abas para iOS que aplica um efeito de desfoque (blur).
 * Utiliza `BlurView` para criar um fundo que se adapta ao tema do sistema e se assemelha à aparência nativa da barra de abas do iOS.
 * @returns {JSX.Element} Um componente `BlurView` que serve como fundo da barra de abas.
 */
export default function BlurTabBarBackground() {
  return (
    <BlurView
      // O material do cromo do sistema se adapta automaticamente ao tema do sistema
      // e corresponde à aparência nativa da barra de abas no iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

/**
 * Hook para calcular o overflow da barra de abas na parte inferior para iOS.
 * Utiliza `useBottomTabBarHeight` do `@react-navigation/bottom-tabs` para obter a altura da barra de abas,
 * que pode ser usada para ajustar o preenchimento de conteúdo e evitar que seja ocultado pela barra de abas.
 * @returns {number} A altura da barra de abas inferior.
 */
export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}