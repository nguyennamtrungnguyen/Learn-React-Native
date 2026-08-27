import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingContainerProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const LoadingContainer = ({
  isLoading,
  children,
}: LoadingContainerProps) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
