import { router } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  const { currentUser, logout } = useAuth();
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
   * Estado para controlar a visibilidade do modal de alerta personalizado
   */
  const [alertVisible, setAlertVisible] = useState(false);
  /**
   * Estado para armazenar o título do alerta personalizado
   */
  const [alertTitle, setAlertTitle] = useState("");
  /**
   * Estado para armazenar a mensagem do alerta personalizado
   */
  const [alertMessage, setAlertMessage] = useState("");

  /**
   * Função para mostrar um alerta personalizado
   */
  const showCustomAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  /**
   * Lida com o evento de toque em uma estrela para definir a avaliação.
   * @param {number} rate - O número de estrelas selecionado.
   */
  const handleStarPress = (rate: number) => {
    setRating(rate);
  };

  /**
   * Lida com o logout do usuário
   */
  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Não foi possível fazer logout. Tente novamente.");
    }
  };

  /**
   * Lida com o envio do formulário de feedback.
   * Realiza validações e envia os dados para o Firestore.
   * Exibe alertas de sucesso ou erro.
   */
  const handleSubmit = async () => {
    console.log("Função handleSubmit iniciada");
    console.log("Comentário:", comment, "Tamanho:", comment.length);
    console.log("Rating:", rating);

    // Validação dos campos
    if (rating === 0) {
      console.log("Alerta: Selecione uma nota");
      showCustomAlert(
        "Campo Obrigatório",
        "Por favor, selecione uma nota de 1 a 5 estrelas."
      );
      return;
    }
    if (comment.length < 10) {
      console.log("Alerta: Comentário curto");
      showCustomAlert(
        "Comentário Curto",
        "Seu comentário deve ter no mínimo 10 caracteres."
      );
      return;
    }

    setLoading(true);
    try {
      console.log("Tentando enviar feedback para o Firestore");
      await addDoc(collection(db, "feedbacks"), {
        userId: currentUser?.uid,
        userName: currentUser?.email, // Usando o email como nome de usuário
        rating: rating,
        comment: comment,
        createdAt: serverTimestamp(),
      });

      console.log("Feedback enviado com sucesso");
      showCustomAlert("Obrigado!", "Seu feedback foi enviado com sucesso.");
      // Limpa o formulário
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Erro ao enviar feedback: ", error);
      showCustomAlert(
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

      {/* Botão de Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>

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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            console.log("Botão de enviar feedback pressionado");
            handleSubmit();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.submitButtonText}>Enviar Feedback</Text>
        </TouchableOpacity>
      )}

      {/* Modal para alerta personalizado */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{alertTitle}</Text>
            <Text style={styles.modalText}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  /** Estilo para o botão de logout */
  logoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "center",
  },
  /** Estilo para o texto do botão de logout */
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  /** Estilo para o botão de envio de feedback */
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  /** Estilo para o texto do botão de envio de feedback */
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
  /** Estilo para o modal de alerta personalizado. */
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  /** Estilo para a view interna do modal. */
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  /** Estilo para o título do modal. */
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  /** Estilo para o texto do modal. */
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  /** Estilo para o botão do modal. */
  modalButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  /** Estilo para o texto do botão do modal. */
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SubmitFeedbackScreen;
