import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  incrementUnrelated,
  selectItems,
  selectFilter,
  selectDoneCount,
  selectUnrelatedCounter,
  selectVisibleTodos,
  selectTodoById,
  selectProgress,
  getMemoCalcCount,
} from "../features/todos/todosSlice";

const FILTERS = [
  { key: "all", label: "Tất cả" },
  { key: "active", label: "Chưa xong" },
  { key: "done", label: "Đã xong" },
];

export default function Lesson1SelectorScreen() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [lookupId, setLookupId] = useState("1");

  // 1. Selector cơ bản & selector trong createSlice (RTK 2.0+)
  const allTodos = useSelector(selectItems);
  const filter = useSelector(selectFilter);
  const doneCount = useSelector(selectDoneCount);
  const unrelatedCounter = useSelector(selectUnrelatedCounter);

  // 2. Memoized selector bằng createSelector
  const visibleTodos = useSelector(selectVisibleTodos);
  const calcCount = getMemoCalcCount();

  // 3. Selector có tham số (selectTodoById)
  const foundTodo = useSelector((state) => selectTodoById(state, lookupId));

  // 4. Bài tập nhanh Bài 1: selectProgress (% hoàn thành)
  const progress = useSelector(selectProgress);

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(addTodo(trimmed));
    setTitle("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* BÀI TẬP NHANH: selectProgress */}
      <View style={styles.card}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>Bài tập nhanh Bài 1</Text>
          <Text style={styles.progressText}>{progress}% hoàn thành</Text>
        </View>
        <Text style={styles.cardTitle}>
          Selector `selectProgress` (createSelector)
        </Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.subText}>
          Đã xong {doneCount} / {allTodos.length} công việc (tính bằng{" "}
          `todosSlice.selectors.selectDoneCount`)
        </Text>
      </View>

      {/* THÊM & LỌC TODO */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          1. Quản lý Todo & `selectVisibleTodos`
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Nhập công việc mới..."
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity style={styles.primaryBtn} onPress={handleAdd}>
            <Text style={styles.primaryBtnText}>Thêm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.filterBtn, active && styles.filterBtnActive]}
                onPress={() => dispatch(setFilter(f.key))}
              >
                <Text
                  style={[
                    styles.filterBtnText,
                    active && styles.filterBtnTextActive,
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {visibleTodos.length === 0 ? (
          <Text style={styles.emptyText}>Không có công việc nào trong mục này.</Text>
        ) : (
          visibleTodos.map((item) => (
            <View key={item.id} style={styles.todoItem}>
              <TouchableOpacity
                style={styles.todoMain}
                onPress={() => dispatch(toggleTodo(item.id))}
              >
                <View
                  style={[styles.checkbox, item.done && styles.checkboxDone]}
                >
                  {item.done && <Text style={styles.checkIcon}>✓</Text>}
                </View>
                <Text
                  style={[styles.todoTitle, item.done && styles.todoTitleDone]}
                >
                  #{item.id}. {item.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => dispatch(deleteTodo(item.id))}
              >
                <Text style={styles.deleteBtnText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* KIỂM CHỨNG MEMOIZATION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          2. Kiểm chứng Memoization (`createSelector`)
        </Text>
        <Text style={styles.subText}>
          Khi bấm nút tăng biến đếm không liên quan (`unrelatedCounter`),{" "}
          `selectVisibleTodos` không chạy lại vì `items` và `filter` không đổi!
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{calcCount}</Text>
            <Text style={styles.statLabel}>Số lần tính lại danh sách</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{unrelatedCounter}</Text>
            <Text style={styles.statLabel}>State khác (Unrelated)</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => dispatch(incrementUnrelated())}
        >
          <Text style={styles.secondaryBtnText}>
            Đổi State khác (+1) → Không tính lại danh sách
          </Text>
        </TouchableOpacity>
      </View>

      {/* SELECTOR CÓ THAM SỐ */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          3. Selector có tham số (`selectTodoById`)
        </Text>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Tìm ID:</Text>
          <TextInput
            style={[styles.input, { flex: 0, width: 80, textAlign: "center" }]}
            value={lookupId}
            onChangeText={setLookupId}
            keyboardType="numeric"
          />
          <View style={{ flex: 1 }}>
            {foundTodo ? (
              <Text style={styles.foundText}>
                Tìm thấy: "{foundTodo.title}" (
                {foundTodo.done ? "Đã xong" : "Chưa xong"})
              </Text>
            ) : (
              <Text style={styles.notFoundText}>
                Không tìm thấy Todo có ID = {lookupId || "?"}
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 14, paddingBottom: 32, gap: 14 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  badge: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  progressText: { fontSize: 13, fontWeight: "700", color: "#0F172A" },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  subText: { fontSize: 12.5, color: "#475569", lineHeight: 18 },
  progressBarBg: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 999,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryBtnText: { color: "#FFF", fontWeight: "700", fontSize: 13.5 },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  filterBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  filterBtnActive: {
    backgroundColor: "#1E40AF",
    borderColor: "#1E40AF",
  },
  filterBtnText: { fontSize: 12.5, fontWeight: "600", color: "#475569" },
  filterBtnTextActive: { color: "#FFFFFF" },
  emptyText: {
    textAlign: "center",
    color: "#94A3B8",
    paddingVertical: 12,
    fontStyle: "italic",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  todoMain: { flexDirection: "row", alignItems: "center", flex: 1, gap: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#94A3B8",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: { backgroundColor: "#16A34A", borderColor: "#16A34A" },
  checkIcon: { color: "#FFF", fontSize: 13, fontWeight: "800" },
  todoTitle: { fontSize: 14, color: "#1E293B", flex: 1 },
  todoTitleDone: { textDecorationLine: "line-through", color: "#94A3B8" },
  deleteBtn: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  deleteBtnText: { color: "#DC2626", fontSize: 12, fontWeight: "700" },
  statsRow: { flexDirection: "row", gap: 10, marginVertical: 10 },
  statBox: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  statVal: { fontSize: 20, fontWeight: "800", color: "#1D4ED8" },
  statLabel: { fontSize: 11.5, color: "#475569", marginTop: 2 },
  secondaryBtn: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#1D4ED8", fontWeight: "700", fontSize: 13 },
  label: { fontSize: 13.5, fontWeight: "600", color: "#334155" },
  foundText: { fontSize: 13, color: "#15803D", fontWeight: "600" },
  notFoundText: { fontSize: 13, color: "#DC2626", fontWeight: "600" },
});
