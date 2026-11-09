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
  addQuickPost,
  fetchUserById,
  fetchUsers,
  loginDemo,
  logoutDemo,
  resetUsersState,
  selectAuthError,
  selectAuthStatus,
  selectAuthUser,
  selectDetailError,
  selectDetailStatus,
  selectQuickPostError,
  selectQuickPosts,
  selectQuickPostStatus,
  selectSelectedUser,
  selectUsers,
  selectUsersError,
  selectUsersStatus,
} from "../features/users/usersSlice";

export default function Lesson2AsyncThunkScreen() {
  const dispatch = useDispatch();

  // State danh sách user
  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  // State chi tiết user theo ID
  const selectedUser = useSelector(selectSelectedUser);
  const detailStatus = useSelector(selectDetailStatus);
  const detailError = useSelector(selectDetailError);
  const [userIdInput, setUserIdInput] = useState("1");

  // State demo login với unwrap() & rejectWithValue
  const authUser = useSelector(selectAuthUser);
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const [email, setEmail] = useState("student@iuh.edu.vn");
  const [password, setPassword] = useState("123456");
  const [unwrapMessage, setUnwrapMessage] = useState("");

  // State Bài tập nhanh Bài 2: addQuickPost
  const quickPosts = useSelector(selectQuickPosts);
  const quickPostStatus = useSelector(selectQuickPostStatus);
  const quickPostError = useSelector(selectQuickPostError);
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleLoginWithUnwrap = async () => {
    setUnwrapMessage("");
    try {
      const user = await dispatch(loginDemo({ email, password })).unwrap();
      const msg = `unwrap() thành công: Xin chào ${user.name}!`;
      setUnwrapMessage(msg);
      Alert.alert("Đăng nhập thành công", msg);
    } catch (err) {
      const msg = `unwrap() bắt được lỗi: ${err}`;
      setUnwrapMessage(msg);
      Alert.alert("Đăng nhập thất bại", String(err));
    }
  };

  const handleAddQuickPost = (simulateError = false) => {
    const trimmed = postTitle.trim() || "Bài viết mới từ createAsyncThunk";
    dispatch(
      addQuickPost({
        title: trimmed,
        body: "Nội dung gửi qua POST /posts",
        simulateError,
      })
    )
      .unwrap()
      .then(() => {
        if (!simulateError) setPostTitle("");
      })
      .catch(() => {});
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* BÀI TẬP NHANH BÀI 2: addPost */}
      <View style={styles.card}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>Bài tập nhanh Bài 2</Text>
          <Text style={styles.statusChip}>Status: {quickPostStatus}</Text>
        </View>
        <Text style={styles.cardTitle}>
          Thunk `addPost` (POST + unshift + rejectWithValue)
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={postTitle}
            onChangeText={setPostTitle}
            placeholder="Nhập tiêu đề bài viết mới..."
            placeholderTextColor="#94A3B8"
          />
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { flex: 1 },
              quickPostStatus === "loading" && styles.btnDisabled,
            ]}
            disabled={quickPostStatus === "loading"}
            onPress={() => handleAddQuickPost(false)}
          >
            <Text style={styles.primaryBtnText}>
              {quickPostStatus === "loading"
                ? "Đang gửi..."
                : "POST Thêm đầu mảng"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dangerOutlineBtn, { flex: 1 }]}
            disabled={quickPostStatus === "loading"}
            onPress={() => handleAddQuickPost(true)}
          >
            <Text style={styles.dangerOutlineBtnText}>Giả lập lỗi 404</Text>
          </TouchableOpacity>
        </View>

        {quickPostError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Lỗi: {quickPostError}</Text>
          </View>
        )}

        {quickPosts.slice(0, 4).map((p) => (
          <View key={p.id} style={styles.postItem}>
            <Text style={styles.postTitle}>• {p.title}</Text>
          </View>
        ))}
      </View>

      {/* 1. DANH SÁCH USER & 3 TRẠNG THÁI */}
      <View style={styles.card}>
        <View style={styles.badgeRow}>
          <Text style={styles.cardTitle}>
            1. `fetchUsers` & Vòng đời 3 trạng thái
          </Text>
          <Text style={styles.statusChip}>{status}</Text>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => dispatch(fetchUsers())}
          >
            <Text style={styles.secondaryBtnText}>Tải lại Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => dispatch(resetUsersState())}
          >
            <Text style={styles.secondaryBtnText}>Reset về Idle</Text>
          </TouchableOpacity>
        </View>

        {status === "loading" && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#2563EB" />
            <Text style={styles.subText}>Đang tải danh sách user...</Text>
          </View>
        )}
        {status === "failed" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Lỗi: {error}</Text>
          </View>
        )}
        {status === "succeeded" &&
          users.slice(0, 5).map((u) => (
            <View key={u.id} style={styles.userRow}>
              <Text style={styles.userName}>
                {u.id}. {u.name}
              </Text>
              <Text style={styles.userEmail}>{u.email}</Text>
            </View>
          ))}
      </View>

      {/* 2. THUNK CÓ THAM SỐ */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          2. Truyền tham số: `fetchUserById(userId)`
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 0, width: 70, textAlign: "center" }]}
            value={userIdInput}
            onChangeText={setUserIdInput}
            keyboardType="numeric"
            placeholder="ID"
          />
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => dispatch(fetchUserById(userIdInput))}
          >
            <Text style={styles.primaryBtnText}>Tìm User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dangerOutlineBtn}
            onPress={() => {
              setUserIdInput("999");
              dispatch(fetchUserById(999));
            }}
          >
            <Text style={styles.dangerOutlineBtnText}>Thử ID=999 (Lỗi)</Text>
          </TouchableOpacity>
        </View>

        {detailStatus === "loading" && (
          <ActivityIndicator color="#2563EB" style={{ marginVertical: 6 }} />
        )}
        {detailStatus === "failed" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{detailError}</Text>
          </View>
        )}
        {detailStatus === "succeeded" && selectedUser && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Họ tên: {selectedUser.name} (@{selectedUser.username})
            </Text>
            <Text style={styles.subText}>
              Công ty: {selectedUser.company?.name} | ĐT: {selectedUser.phone}
            </Text>
          </View>
        )}
      </View>

      {/* 3. UNWRAP() & REJECTWITHVALUE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          3. `rejectWithValue` & `.unwrap()` tại Component
        </Text>
        <Text style={styles.subText}>
          Đúng: `student@iuh.edu.vn` / `123456`. Thử nhập sai để thấy `try/catch`
          với `.unwrap()` bắt lỗi trả về từ `rejectWithValue`.
        </Text>
        <TextInput
          style={[styles.input, { marginTop: 8, marginBottom: 8 }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { marginBottom: 10 }]}
          value={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          secureTextEntry
        />
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.primaryBtn, { flex: 1 }]}
            disabled={authStatus === "loading"}
            onPress={handleLoginWithUnwrap}
          >
            <Text style={styles.primaryBtnText}>
              {authStatus === "loading"
                ? "Đang kiểm tra..."
                : "Đăng nhập (.unwrap)"}
            </Text>
          </TouchableOpacity>
          {authUser && (
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => {
                dispatch(logoutDemo());
                setUnwrapMessage("");
              }}
            >
              <Text style={styles.secondaryBtnText}>Đăng xuất</Text>
            </TouchableOpacity>
          )}
        </View>
        {unwrapMessage !== "" && (
          <View
            style={
              authStatus === "failed" ? styles.errorBox : styles.infoBox
            }
          >
            <Text
              style={
                authStatus === "failed" ? styles.errorText : styles.infoText
              }
            >
              {unwrapMessage}
            </Text>
          </View>
        )}
        {authError && !unwrapMessage && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{authError}</Text>
          </View>
        )}
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
    marginBottom: 8,
  },
  subText: { fontSize: 12.5, color: "#475569", lineHeight: 18 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: "#FFF", fontWeight: "700", fontSize: 13 },
  secondaryBtn: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#1D4ED8", fontWeight: "700", fontSize: 12.5 },
  dangerOutlineBtn: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  dangerOutlineBtnText: { color: "#DC2626", fontWeight: "700", fontSize: 12.5 },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  errorText: { color: "#DC2626", fontSize: 12.5, fontWeight: "600" },
  infoBox: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  infoText: { color: "#15803D", fontSize: 13, fontWeight: "700" },
  userRow: {
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  userName: { fontSize: 13.5, fontWeight: "700", color: "#1E293B" },
  userEmail: { fontSize: 12, color: "#64748B" },
  postItem: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  postTitle: { fontSize: 13, color: "#1E293B" },
});
