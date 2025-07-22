import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";

/**
 * Componente de tela para envio de feedback.
 * Permite que o usuário avalie o serviço com estrelas e adicione um comentário.
 * O feedback é enviado para o Firestore.
 */
const SubmitFeedbackScreen = () => {
  /**
   * Hook para acessar o usuário autenticado.
   * @type {object | null} currentUser - O objeto do usuário autenticado.
   */
  const { currentUser } = useAuth();
  /**
   * Estado para armazenar a avaliação em estrelas do usuário.
   * @type {[number, Function]} rating - O valor da avaliação (0-5).
   */
  const [rating, setRating] = useState(0);
  /**
   * Estado para armazenar o comentário do usuário.
   * @type {[string, Function]} comment - O texto do comentário.
   */
  const [comment, setComment] = useState("");
  /**
   * Estado para controlar o estado de carregamento durante o envio do feedback.
   * @type {[boolean, Function]} loading - Indica se o feedback está sendo enviado.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Lida com o evento de toque em uma estrela para definir a avaliação.
   * @param {number} rate - O número de estrelas selecionado.
   */
  const handleStarPress = (rate: number) => {
    setRating(rate);
  };

  /**
   * Lida com o envio do formulário de feedback.
   * Realiza validações e envia os dados para o Firestore.
   * Exibe alertas de sucesso ou erro.
   */
  const handleSubmit = async () => {
    // Validação dos campos
    if (rating === 0) {
      Alert.alert(
        "Campo Obrigatório",
        "Por favor, selecione uma nota de 1 a 5 estrelas."
      );
      return;
    }
    if (comment.length < 10) {
      Alert.alert(
        "Comentário Curto",
        "Seu comentário deve ter no mínimo 10 caracteres."
      );
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "feedbacks"), {
        userId: currentUser?.uid,
        userName: currentUser?.email, // Usando o email como nome de usuário
        rating: rating,
        comment: comment,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Obrigado!", "Seu feedback foi enviado com sucesso.");
      // Limpa o formulário
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Erro ao enviar feedback: ", error);
      Alert.alert(
        "Erro",
        "Não foi possível enviar seu feedback. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Deixe seu Feedback</Text>
        <Text style={styles.subtitle}>Como você avalia nosso serviço?</Text>

        {/* Componente de Estrelas com área de toque maior */}
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((rate) => (
            <TouchableOpacity
              key={rate}
              onPress={() => handleStarPress(rate)}
              style={styles.starButton}
              activeOpacity={0.6}
            >
              <Text
                style={rate <= rating ? styles.starFilled : styles.starOutline}
              >
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Seu comentário:</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Digite seu comentário aqui (mínimo de 10 caracteres)..."
          value={comment}
          onChangeText={setComment}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Enviar Feedback" onPress={handleSubmit} />
        )}
      </View>
  );
};

/**
 * Estilos para o componente SubmitFeedbackScreen.
 */
const styles = StyleSheet.create({
  /** Estilo para o container principal da tela. */
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  /** Estilo para o título principal da tela. */
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  /** Estilo para o subtítulo da tela. */
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  /** Estilo para o container das estrelas de avaliação. */
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  /** Estilo para o botão de cada estrela, aumentando a área de toque. */
  starButton: {
    padding: 10, // Aumenta a área de toque ao redor da estrela
    marginHorizontal: 5,
  },
  /** Estilo para o ícone de estrela não preenchida. */
  starOutline: {
    fontSize: 40,
    color: "#ccc",
  },
  /** Estilo para o ícone de estrela preenchida. */
  starFilled: {
    fontSize: 40,
    color: "#FFD700", // Cor de ouro para estrela preenchida
  },
  /** Estilo para o rótulo do campo de comentário. */
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  /** Estilo para o campo de entrada de texto do comentário. */
  textInput: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    textAlignVertical: "top", // Para o texto começar do topo no Android
    marginBottom: 20,
  },
});

export default SubmitFeedbackScreen;