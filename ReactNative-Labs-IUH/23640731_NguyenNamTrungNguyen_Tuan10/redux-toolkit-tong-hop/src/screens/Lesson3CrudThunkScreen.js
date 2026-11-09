import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  deletePost,
  fetchPosts,
  selectDeletingId,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
  selectPostsSubmitting,
  updatePost,
} from "../features/posts/postsSlice";

export default function Lesson3CrudThunkScreen() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const submitting = useSelector(selectPostsSubmitting);
  const deletingId = useSelector(selectDeletingId);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState(null);

  // READ khi component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  // CREATE hoặc UPDATE với .unwrap()
  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập tiêu đề bài viết");
      return;
    }

    try {
      if (editingId) {
        await dispatch(
          updatePost({
            id: editingId,
            title: title.trim(),
            body: body.trim() || "Nội dung đã cập nhật",
            userId: 1,
          })
        ).unwrap();
      } else {
        await dispatch(
          addPost({
            title: title.trim(),
            body: body.trim() || "Nội dung bài viết mới",
            userId: 1,
          })
        ).unwrap();
      }
      setTitle("");
      setBody("");
      setEditingId(null);
    } catch (err) {
      Alert.alert("Thao tác thất bại", err?.message || "Có lỗi xảy ra");
    }
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setBody("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* THÔNG TIN & BÀI TẬP NHANH BÀI 3 */}
      <View style={styles.card}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>Bài 3 + Bài tập nhanh</Text>
          <Text style={styles.statusChip}>Tổng: {posts.length} bài</Text>
        </View>
        <Text style={styles.cardTitle}>
          CRUD với `createAsyncThunk` & `deletingId`
        </Text>
        <Text style={styles.subText}>
          • Create (`unshift`), Update (`findIndex`), Delete (`filter`).{"\n"}•
          Bài tập nhanh: Khi bấm Xóa, lưu `state.deletingId = action.meta.arg`
          để chỉ nút của bài viết đó hiện "Đang xóa..." và bị khóa.
        </Text>
      </View>

      {/* FORM THÊM / CẬP NHẬT */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {editingId
            ? `Đang sửa bài viết #${editingId}`
            : "Thêm bài viết mới (POST)"}
        </Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Tiêu đề bài viết..."
          placeholderTextColor="#94A3B8"
        />
        <TextInput
          style={[styles.input, { marginTop: 8 }]}
          value={body}
          onChangeText={setBody}
          placeholder="Nội dung tóm tắt (tùy chọn)..."
          placeholderTextColor="#94A3B8"
        />

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { flex: 1 },
              submitting && styles.btnDisabled,
            ]}
            disabled={submitting}
            onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnText}>
              {submitting
                ? "Đang xử lý..."
                : editingId
                ? "Cập nhật (PUT)"
                : "Thêm mới (POST)"}
            </Text>
          </TouchableOpacity>

          {editingId !== null && (
            <TouchableOpacity style={styles.cancelBtn} onPress={cancelEdit}>
              <Text style={styles.cancelBtnText}>Hủy</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* DANH SÁCH BÀI VIẾT */}
      <View style={styles.card}>
        <View style={styles.badgeRow}>
          <Text style={styles.cardTitle}>Danh sách bài viết (GET)</Text>
          <TouchableOpacity onPress={() => dispatch(fetchPosts())}>
            <Text style={styles.reloadLink}>Tải lại</Text>
          </TouchableOpacity>
        </View>

        {status === "loading" && (
          <View style={styles.loadingBox}>
            <ActivityIndicator color="#2563EB" />
            <Text style={styles.subText}>Đang tải danh sách bài viết...</Text>
          </View>
        )}

        {status === "failed" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Lỗi: {error}</Text>
          </View>
        )}

        {status === "succeeded" &&
          posts.map((p) => {
            const isDeletingThis = deletingId === p.id;
            const isEditingThis = editingId === p.id;
            return (
              <View
                key={p.id}
                style={[
                  styles.postItem,
                  isEditingThis && styles.postItemEditing,
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.postTitle}>
                    #{p.id}. {p.title}
                  </Text>
                  {p.body ? (
                    <Text style={styles.postBody} numberOfLines={2}>
                      {p.body}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.actionCol}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => startEdit(p)}
                  >
                    <Text style={styles.editBtnText}>Sửa</Text>
                  </TouchableOpacity>

                  {/* Bài tập nhanh Bài 3: Nút Xóa với deletingId */}
                  <TouchableOpacity
                    style={[
                      styles.deleteBtn,
                      isDeletingThis && styles.btnDisabled,
                    ]}
                    disabled={isDeletingThis}
                    onPress={() => dispatch(deletePost(p.id))}
                  >
                    <Text style={styles.deleteBtnText}>
                      {isDeletingThis ? "Đang xóa..." : "Xóa"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
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
  statusChip: {
    backgroundColor: "#F1F5F9",
    color: "#334155",
    fontSize: 11.5,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  subText: { fontSize: 12.5, color: "#475569", lineHeight: 18 },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.55 },
  primaryBtnText: { color: "#FFF", fontWeight: "700", fontSize: 13.5 },
  cancelBtn: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cancelBtnText: { color: "#475569", fontWeight: "700", fontSize: 13.5 },
  reloadLink: { color: "#2563EB", fontWeight: "700", fontSize: 13 },
  loadingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: 10,
    borderRadius: 8,
  },
  errorText: { color: "#DC2626", fontSize: 12.5, fontWeight: "600" },
  postItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  postItemEditing: {
    backgroundColor: "#EFF6FF",
    marginHorizontal: -8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  postTitle: { fontSize: 13.5, fontWeight: "700", color: "#1E293B" },
  postBody: { fontSize: 12, color: "#64748B", marginTop: 2 },
  actionCol: { flexDirection: "row", alignItems: "center", gap: 6 },
  editBtn: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editBtnText: { color: "#0369A1", fontSize: 12, fontWeight: "700" },
  deleteBtn: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteBtnText: { color: "#DC2626", fontSize: 12, fontWeight: "700" },
});
