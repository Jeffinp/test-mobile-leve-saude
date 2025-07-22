import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

/**
 * Componente de layout para as abas principais da aplicação.
 * Define a estrutura e o estilo das abas de navegação.
 * @returns {JSX.Element} O componente de layout das abas.
 */
export default function TabLayout() {
  /**
   * Hook para obter o esquema de cores atual (claro ou escuro).
   * @type {'light' | 'dark' | null | undefined} colorScheme - O esquema de cores atual.
   */
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        /** Cor ativa do texto da aba. */
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        /** Cor de fundo ativa da aba. */
        tabBarActiveBackgroundColor:
          Colors[colorScheme ?? "light"].tabBarActiveBackground,
        /** Oculta o cabeçalho da tela. */
        headerShown: false,
        /** Componente personalizado para o botão da aba com feedback háptico. */
        tabBarButton: HapticTab,
        /** Componente personalizado para o fundo da barra de abas. */
        tabBarBackground: TabBarBackground,
        /** Estilo da barra de abas, com tratamento específico para iOS. */
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      {/* Tela "Home" */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      {/* Tela "Meus Feedbacks" */}
      <Tabs.Screen
        name="myFeedbacks"
        options={{
          title: "Meus Feedbacks",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="list.bullet" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}