import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// 1. Định nghĩa kiểu dữ liệu từ JSON API
type Post = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Lab09 = () => {
  // 2. State lưu danh sách dữ liệu
  const [posts, setPosts] = useState<Post[]>([]);

  // 3. State loading
  const [loading, setLoading] = useState<boolean>(true);

  // 4. Gọi API khi component được render
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );

        // Kiểm tra API có trả về thành công không
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ API");
        }

        // 5. Chuyển response sang JSON
        const data = await response.json();

        // 6. Gán kiểu Post[]
        setPosts(data as Post[]);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 7. Hiển thị loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  // 8. Hiển thị danh sách
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📰 News Feed</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.number}>#{index + 1}</Text>

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.status}>
                Trạng thái:{" "}
                {item.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Lab09;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },

  number: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  status: {
    marginTop: 8,
    fontSize: 13,
    color: "#666",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});