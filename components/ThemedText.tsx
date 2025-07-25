import { StyleSheet, Text, type TextProps } from "react-native";

/**
 * Propriedades para o componente ThemedText.
 * Estende as propriedades padrão de TextProps e adiciona opções para tipos de texto predefinidos.
 * @interface ThemedTextProps
 * @property {'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'} [type='default'] - Tipo de estilo predefinido para o texto.
 */
export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const textColor = "#11181C";

  return (
    <Text
      style={[
        { color: textColor },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

/**
 * Estilos para os diferentes tipos de texto do componente ThemedText.
 */
const styles = StyleSheet.create({
  /** Estilo padrão para o texto. */
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  /** Estilo para texto semi-negrito padrão. */
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  /** Estilo para títulos. */
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  /** Estilo para subtítulos. */
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  /** Estilo para links. */
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
