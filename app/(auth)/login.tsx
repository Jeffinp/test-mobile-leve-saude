import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../lib/firebase";

/**
 * Componente de tela de login.
 * Permite que o usuário faça login com email e senha usando o Firebase Authentication.
 */
const LoginScreen = () => {
  /**
   * Estado para armazenar o email do usuário.
   * @type {[string, Function]} email - O email digitado pelo usuário.
   */
  const [email, setEmail] = useState("");
  /**
   * Estado para armazenar a senha do usuário.
   * @type {[string, Function]} password - A senha digitada pelo usuário.
   */
  const [password, setPassword] = useState("");

  /**
   * Lida com o processo de login do usuário.
   * Tenta autenticar o usuário com o email e senha fornecidos.
   * Exibe um alerta em caso de erro no login.
   */
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O redirecionamento será automático pelo _layout
    } catch (error: any) {
      Alert.alert("Erro no Login", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Link href="/signup" asChild>
        <Button title="Não tem uma conta? Cadastre-se" />
      </Link>
    </View>
  );
};

/**
 * Estilos para o componente LoginScreen.
 */
const styles = StyleSheet.create({
  /** Estilo para o container principal da tela. */
  container: { flex: 1, justifyContent: "center", padding: 20 },
  /** Estilo para o título da tela. */
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  /** Estilo para os campos de entrada de texto (TextInput). */
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 15,
  },
});

export default LoginScreen;