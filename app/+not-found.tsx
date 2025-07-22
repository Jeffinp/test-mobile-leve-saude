import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

/**
 * Componente de tela "Não Encontrado" (404).
 * Exibido quando uma rota não corresponde a nenhuma tela definida no aplicativo.
 * @returns {JSX.Element} O componente da tela "Não Encontrado".
 */
export default function NotFoundScreen() {
  return (
    <>
      {/* Define o título da tela na pilha de navegação. */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Esta tela não existe.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Voltar para a tela inicial</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

/**
 * Estilos para o componente NotFoundScreen.
 */
const styles = StyleSheet.create({
  /** Estilo para o container principal da tela. */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  /** Estilo para o link de navegação. */
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});