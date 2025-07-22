import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * Hook personalizado para determinar o esquema de cores (claro/escuro) no ambiente web.
 * Este hook garante que o valor seja recalculado no lado do cliente para suportar a renderização estática.
 * @returns {'light' | 'dark' | null} O esquema de cores atual ('light' ou 'dark'), ou null se ainda não hidratado.
 */
export function useColorScheme() {
  /**
   * Estado para controlar se o componente foi hidratado no lado do cliente.
   * @type {[boolean, Function]} hasHydrated - Indica se a hidratação ocorreu.
   */
  const [hasHydrated, setHasHydrated] = useState(false);

  /**
   * Efeito colateral que define `hasHydrated` como true após a montagem inicial do componente.
   */
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  /**
   * Hook `useColorScheme` nativo do React Native para obter o esquema de cores do sistema.
   * @type {'light' | 'dark' | null} colorScheme - O esquema de cores retornado pelo hook nativo.
   */
  const colorScheme = useRNColorScheme();

  // Se o componente já foi hidratado, retorna o esquema de cores do sistema.
  if (hasHydrated) {
    return colorScheme;
  }

  // Se ainda não foi hidratado (renderização estática), retorna 'light' como padrão.
  return "light";
}