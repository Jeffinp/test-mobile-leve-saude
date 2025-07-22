// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

/**
 * Tipo para os nomes dos ícones, baseado no mapeamento de SF Symbols para Material Icons.
 * @typedef {keyof typeof MAPPING} IconSymbolName
 */
type IconSymbolName = keyof typeof MAPPING;

/**
 * Mapeamento de nomes de SF Symbols para nomes de Material Icons.
 * Adicione seus SF Symbols para mapeamentos de Material Icons aqui.
 * - veja Material Icons no [Icons Directory](https://icons.expo.fyi).
 * - veja SF Symbols no aplicativo [SF Symbols](https://developer.apple.com/sf-symbols/).
 */
const MAPPING = {
  "house.fill": "home",
  "list.bullet": "format-list-bulleted",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as const;

/**
 * Um componente de ícone que usa SF Symbols nativos no iOS e Material Icons no Android e web.
 * Isso garante uma aparência consistente em todas as plataformas e uso otimizado de recursos.
 * Os `name`s dos ícones são baseados em SF Symbols e exigem mapeamento manual para Material Icons.
 * @param {object} props - As propriedades do componente.
 * @param {IconSymbolName} props.name - O nome do ícone SF Symbol a ser exibido.
 * @param {number} [props.size=24] - O tamanho do ícone.
 * @param {string | OpaqueColorValue} props.color - A cor do ícone.
 * @param {StyleProp<TextStyle>} [props.style] - Estilos adicionais para o ícone.
 * @param {SymbolWeight} [props.weight] - O peso do SF Symbol (não usado para Material Icons, mas mantido para compatibilidade de tipo).
 * @returns {JSX.Element} Um componente `MaterialIcons` que renderiza o ícone mapeado.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}