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
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";

const SubmitFeedbackScreen = () => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStarPress = (rate: number) => {
    setRating(rate);
  };

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  starButton: {
    padding: 10, // Aumenta a área de toque ao redor da estrela
    marginHorizontal: 5,
  },
  starOutline: {
    fontSize: 40,
    color: "#ccc",
  },
  starFilled: {
    fontSize: 40,
    color: "#FFD700", // Cor de ouro para estrela preenchida
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
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
