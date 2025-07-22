import { useIsFocused } from "@react-navigation/native";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } => "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";

/**
 * Define o tipo de dado para um feedback.
 * @interface Feedback
 * @property {string} id - O ID único do feedback.
 * @property {string} comment - O comentário do feedback.
 * @property {number} rating - A avaliação em estrelas do feedback (1-5).
 * @property {Timestamp} createdAt - O timestamp de criação do feedback.
 */
interface Feedback {
  id: string;
  comment: string;
  rating: number;
  createdAt: Timestamp;
}

/**
 * Componente para renderizar um item individual de feedback na lista.
 * @param {object} props - As propriedades do componente.
 * @param {Feedback} props.item - O objeto de feedback a ser renderizado.
 * @returns {JSX.Element} Um componente de item de feedback.
 */
const FeedbackItem = ({ item }: { item: Feedback }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemHeader}>
      <Text style={styles.itemDate}>
        {item.createdAt.toDate().toLocaleDateString("pt-BR")}
      </Text>
      <Text style={styles.itemRating}>{"⭐".repeat(item.rating)}</Text>
    </View>
    <Text style={styles.itemComment}>{item.comment}</Text>
  </View>
);

/**
 * Componente de tela para exibir os feedbacks enviados pelo usuário logado.
 * Busca os feedbacks do Firestore e os exibe em uma lista.
 */
const MyFeedbacksScreen = () => {
  /**
   * Hook para acessar o usuário autenticado.
   * @type {object | null} currentUser - O objeto do usuário autenticado.
   */
  const { currentUser } = useAuth();
  /**
   * Estado para armazenar a lista de feedbacks do usuário.
   * @type {[Feedback[], Function]} feedbacks - Array de objetos de feedback.
   */
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  /**
   * Estado para controlar o status de carregamento dos feedbacks.
   * @type {[boolean, Function]} loading - Indica se os feedbacks estão sendo carregados.
   */
  const [loading, setLoading] = useState(true);
  /**
   * Hook para saber se a tela está em foco.
   * @type {boolean} isFocused - True se a tela estiver em foco, false caso contrário.
   */
  const isFocused = useIsFocused();

  /**
   * Efeito colateral para buscar os feedbacks do usuário quando a tela está em foco ou o usuário muda.
   */
  useEffect(() => {
    // Se o usuário não estiver logado, não há o que buscar.
    // Paramos o loading e saímos da função.
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Apenas busca os dados se a tela estiver em foco.
    if (isFocused) {
      /**
       * Função assíncrona para buscar os feedbacks do usuário no Firestore.
       */
      const fetchMyFeedbacks = async () => {
        setLoading(true); // Movemos o setLoading(true) para dentro da função
        try {
          const q = query(
            collection(db, "feedbacks"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const feedbacksData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Feedback[];
          setFeedbacks(feedbacksData);
        } catch (error) {
          console.error("Erro ao buscar feedbacks: ", error);
        } finally {
          setLoading(false); // Isso agora sempre será chamado
        }
      };
      fetchMyFeedbacks();
    }
  }, [currentUser, isFocused]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={feedbacks}
        renderItem={({ item }) => <FeedbackItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.title}>Meus Feedbacks</Text>}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Você ainda não enviou nenhum feedback.
          </Text>
        }
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

/**
 * Estilos para o componente MyFeedbacksScreen.
 */
const styles = StyleSheet.create({
  /** Estilo para o container principal da tela. */
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  /** Estilo para o indicador de carregamento. */
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  /** Estilo para o título da tela. */
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  /** Estilo para o container de cada item de feedback. */
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  /** Estilo para o cabeçalho de cada item de feedback (data e avaliação). */
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  /** Estilo para a data do feedback. */
  itemDate: {
    fontSize: 12,
    color: "#666",
  },
  /** Estilo para a avaliação em estrelas do feedback. */
  itemRating: {
    fontSize: 16,
  },
  /** Estilo para o comentário do feedback. */
  itemComment: {
    fontSize: 14,
    color: "#333",
  },
  /** Estilo para a mensagem exibida quando não há feedbacks. */
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});

export default MyFeedbacksScreen;