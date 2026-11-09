import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import Lesson1SelectorScreen from "./src/screens/Lesson1SelectorScreen";
import Lesson2AsyncThunkScreen from "./src/screens/Lesson2AsyncThunkScreen";

const LESSONS = [
  { id: 1, short: "Bài 1: Selector", title: "Bài 1: Selector trong Redux Toolkit" },
  {
    id: 2,
    short: "Bài 2: AsyncThunk",
    title: "Bài 2: createAsyncThunk trong Redux Toolkit",
  },
];

export default function App() {
  const [activeLesson, setActiveLesson] = useState(1);
  const currentLesson =
    LESSONS.find((l) => l.id === activeLesson) || LESSONS[0];

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>
            TỔNG HỢP BÀI GIẢNG REDUX TOOLKIT
          </Text>
          <Text style={styles.headerTitle}>{currentLesson.title}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabBar}
          >
            {LESSONS.map((lesson) => {
              const isActive = lesson.id === activeLesson;
              return (
                <TouchableOpacity
                  key={lesson.id}
                  style={[styles.tabItem, isActive && styles.tabItemActive]}
                  onPress={() => setActiveLesson(lesson.id)}
                >
                  <Text
                    style={[styles.tabText, isActive && styles.tabTextActive]}
                  >
                    {lesson.short}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.body}>
          {activeLesson === 1 && <Lesson1SelectorScreen />}
          {activeLesson === 2 && <Lesson2AsyncThunkScreen />}
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: "#0F172A",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 14,
  },
  headerSubtitle: {
    color: "#93C5FD",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 2,
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: "row",
    gap: 8,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
  },
  tabItemActive: {
    backgroundColor: "#2563EB",
    borderColor: "#60A5FA",
  },
  tabText: {
    color: "#CBD5E1",
    fontSize: 12.5,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  body: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
