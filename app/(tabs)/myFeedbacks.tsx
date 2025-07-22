import { useIsFocused } from "@react-navigation/native";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";

// Definindo o tipo de dado para um feedback
interface Feedback {
  id: string;
  comment: string;
  rating: number;
  createdAt: Timestamp;
}

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

const MyFeedbacksScreen = () => {
  const { currentUser } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // Hook para saber se a tela está em foco

  useEffect(() => {
    // Se o usuário não estiver logado, não há o que buscar.
    // Paramos o loading e saímos da função.
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Apenas busca os dados se a tela estiver em foco.
    if (isFocused) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 12,
    color: "#666",
  },
  itemRating: {
    fontSize: 16,
  },
  itemComment: {
    fontSize: 14,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});

export default MyFeedbacksScreen;
