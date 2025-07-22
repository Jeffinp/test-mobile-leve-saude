import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";

/**
 * Componente de ícone que utiliza SF Symbols nativos no iOS.
 * Permite exibir ícones com base em seus nomes SF Symbol, tamanho, cor e peso.
 * @param {object} props - As propriedades do componente.
 * @param {SymbolViewProps['name']} props.name - O nome do SF Symbol a ser exibido.
 * @param {number} [props.size=24] - O tamanho do ícone em pontos.
 * @param {string} props.color - A cor do ícone.
 * @param {StyleProp<ViewStyle>} [props.style] - Estilos adicionais para o container do ícone.
 * @param {SymbolWeight} [props.weight='regular'] - O peso do SF Symbol (ex: 'regular', 'medium', 'semibold').
 * @returns {JSX.Element} Um componente `SymbolView` que renderiza o SF Symbol.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: SymbolViewProps["name"];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}