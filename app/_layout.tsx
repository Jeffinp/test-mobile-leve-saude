import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

const InitialLayout = () => {
  const { currentUser, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

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
      <Stack.Screen name="(auth)" options={{ presentation: "modal" }} />
    </Stack>
  );
};

// O RootLayout continua igual, envolvendo tudo no AuthProvider.
const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
