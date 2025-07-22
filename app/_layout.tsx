import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

/**
 * Componente de layout inicial que gerencia a navegação baseada no estado de autenticação do usuário.
 * Redireciona o usuário para as telas de autenticação ou para as abas principais, dependendo se está logado ou não.
 */
const InitialLayout = () => {
  /**
   * Hook para acessar o estado de autenticação do usuário e o status de carregamento.
   * @type {object | null} currentUser - O objeto do usuário autenticado.
   * @type {boolean} loading - Indica se o estado de autenticação está sendo carregado.
   */
  const { currentUser, loading } = useAuth();
  /**
   * Hook para obter os segmentos da URL atual.
   * @type {string[]} segments - Array de segmentos da URL.
   */
  const segments = useSegments();
  /**
   * Hook para acessar o objeto de roteamento.
   * @type {object} router - Objeto de roteamento do Expo Router.
   */
  const router = useRouter();

  /**
   * Efeito colateral que lida com o redirecionamento do usuário com base no estado de autenticação.
   * - Se o usuário estiver logado e tentando acessar as telas de autenticação, redireciona para as abas principais.
   * - Se o usuário não estiver logado e não estiver nas telas de autenticação, redireciona para a tela de login.
   */
  useEffect(() => {
    // Se ainda estiver carregando, não faça nada.
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    // Se o usuário estiver logado e tentando acessar as telas de auth,
    // redirecione para a tela principal.
    if (currentUser && inAuthGroup) {
      router.replace("/(tabs)");
    }
    // Se o usuário NÃO estiver logado e NÃO estiver nas telas de auth,
    // redirecione para a tela de login.
    else if (!currentUser && !inAuthGroup) {
      router.replace("/login");
    }
  }, [currentUser, loading, segments]);

  // Enquanto o estado de `loading` do AuthContext for true, mostramos um indicador.
  // Isso impede que o app renderize a tela errada antes da hora.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
};

/**
 * Componente de layout raiz que envolve toda a aplicação com o AuthProvider.
 * Garante que o contexto de autenticação esteja disponível para todos os componentes filhos.
 */
const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;