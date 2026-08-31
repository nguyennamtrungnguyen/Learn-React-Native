import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
};

const Lab10 = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1",
        );

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu user");
        }

        const data = await response.json();

        // Ép kiểu dữ liệu API thành User
        setUser(data as User);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <View style={styles.emptyContainer} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 User Profile</Text>

      <View style={styles.card}>
        <Text style={styles.name}>{user?.name}</Text>

        <Text style={styles.info}>Username: {user?.username}</Text>

        <Text style={styles.info}>Email: {user?.email}</Text>

        <Text style={styles.info}>Phone: {user?.phone}</Text>

        <Text style={styles.info}>Website: {user?.website}</Text>

        <Text style={styles.info}>
          Address: {user?.address?.street}, {user?.address?.city}
        </Text>

        <Text style={styles.info}>Company: {user?.company?.name}</Text>
      </View>
    </View>
  );
};

export default Lab10;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  info: {
    fontSize: 16,
    marginBottom: 12,
    color: "#444",
  },
});
