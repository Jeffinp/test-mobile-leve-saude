import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";

/**
 * Um componente de botão de aba que fornece feedback háptico leve ao ser pressionado no iOS.
 * Utiliza `PlatformPressable` para garantir compatibilidade entre plataformas.
 * @param {BottomTabBarButtonProps} props - As propriedades do botão da barra de abas.
 * @returns {JSX.Element} Um componente `PlatformPressable` com feedback háptico.
 */
export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        // Verifica se o ambiente é iOS para aplicar o feedback háptico.
        if (process.env.EXPO_OS === "ios") {
          // Adiciona um feedback háptico suave ao pressionar as abas.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        // Chama a função onPressIn original, se houver.
        props.onPressIn?.(ev);
      }}
    />
  );
}