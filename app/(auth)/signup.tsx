import { useNavigation } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../lib/firebase";

/**
 * Componente de tela de cadastro de usuário.
 * Permite que o usuário crie uma nova conta com email e senha usando o Firebase Authentication.
 */
const SignUpScreen = () => {
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
   * Hook para acessar o objeto de navegação.
   * @type {object} navigation - Objeto de navegação do Expo Router.
   */
  const navigation = useNavigation();

  /**
   * Lida com o processo de cadastro de um novo usuário.
   * Valida os campos de email e senha e tenta criar uma nova conta no Firebase.
   * Exibe alertas de sucesso ou erro.
   */
  const handleSignUp = async () => {
    if (email === "" || password === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Conta criada!");
      // A navegação para o app principal será tratada pelo listener de autenticação
    } catch (error: any) {
      Alert.alert("Erro no Cadastro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={handleSignUp} />
      <View style={styles.loginLink}>
        <Button
          title="Já tem uma conta? Faça Login"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

/**
 * Estilos para o componente SignUpScreen.
 */
const styles = StyleSheet.create({
  /** Estilo para o container principal da tela. */
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
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
    backgroundColor: "#fff",
  },
  /** Estilo para o link de login. */
  loginLink: {
    marginTop: 20,
  },
});

export default SignUpScreen;