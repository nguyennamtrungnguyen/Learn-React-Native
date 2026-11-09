import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 1. Thunk tải danh sách users (có condition chặn gọi trùng khi đang loading)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) {
        return rejectWithValue(
          `Lỗi HTTP ${res.status}: Không thể tải danh sách user`
        );
      }
      return await res.json();
    } catch {
      return rejectWithValue("Không thể kết nối tới server");
    }
  },
  {
    condition: (_, { getState }) => {
      const { users } = getState();
      return users.status !== "loading";
    },
  }
);

// 2. Thunk có tham số: tải chi tiết 1 user theo userId
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!res.ok) {
        return rejectWithValue(
          `Không tìm thấy user có ID = ${userId} (HTTP ${res.status})`
        );
      }
      return await res.json();
    } catch {
      return rejectWithValue("Lỗi mạng khi tải chi tiết user");
    }
  }
);

// 3. Thunk minh họa rejectWithValue & unwrap() (Mục 4.2 & 4.3)
export const loginDemo = createAsyncThunk(
  "users/loginDemo",
  async (credentials, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (
      credentials.email === "student@iuh.edu.vn" &&
      credentials.password === "123456"
    ) {
      return {
        id: 100,
        name: "Sinh viên IUH",
        email: credentials.email,
        token: "jwt-demo-token-2026",
      };
    }
    return rejectWithValue(
      "Sai email hoặc mật khẩu! (Gợi ý: student@iuh.edu.vn / 123456)"
    );
  }
);

// 4. Bài tập nhanh Bài 2: Viết thunk addPost gửi POST tới JSONPlaceholder,
// thêm bài viết mới vào đầu mảng posts khi thành công, và hiển thị lỗi khi thất bại.
export const addQuickPost = createAsyncThunk(
  "posts/addPost",
  async (newPost, { rejectWithValue }) => {
    try {
      const endpoint = newPost.simulateError
        ? "https://jsonplaceholder.typicode.com/invalid-posts-404"
        : "https://jsonplaceholder.typicode.com/posts";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          userId: 1,
        }),
      });
      if (!res.ok) {
        return rejectWithValue("Không thể thêm bài viết");
      }
      const data = await res.json();
      return {
        ...data,
        id: Date.now(), // Đảm bảo id duy nhất khi thêm nhiều bài trên JSONPlaceholder
      };
    } catch {
      return rejectWithValue("Không thể thêm bài viết");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    selectedUser: null,
    detailStatus: "idle",
    detailError: null,
    authUser: null,
    authStatus: "idle",
    authError: null,
    // State cho Bài tập nhanh Bài 2
    posts: [
      {
        id: 1,
        title: "Bài viết mẫu: Vòng đời createAsyncThunk",
        body: "Tự động sinh 3 action: pending, fulfilled, rejected",
      },
    ],
    quickPostStatus: "idle",
    quickPostError: null,
  },
  reducers: {
    resetUsersState: (state) => {
      state.list = [];
      state.status = "idle";
      state.error = null;
    },
    logoutDemo: (state) => {
      state.authUser = null;
      state.authStatus = "idle";
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message;
      })

      // fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.selectedUser = null;
        state.detailError = action.payload ?? action.error.message;
      })

      // loginDemo
      .addCase(loginDemo.pending, (state) => {
        state.authStatus = "loading";
        state.authError = null;
      })
      .addCase(loginDemo.fulfilled, (state, action) => {
        state.authStatus = "succeeded";
        state.authUser = action.payload;
      })
      .addCase(loginDemo.rejected, (state, action) => {
        state.authStatus = "failed";
        state.authError = action.payload ?? action.error.message;
      })

      // Bài tập nhanh Bài 2: addQuickPost
      .addCase(addQuickPost.pending, (state) => {
        state.quickPostStatus = "loading";
        state.quickPostError = null;
      })
      .addCase(addQuickPost.fulfilled, (state, action) => {
        state.quickPostStatus = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(addQuickPost.rejected, (state, action) => {
        state.quickPostStatus = "failed";
        state.quickPostError = action.payload ?? action.error.message;
      });
  },
});

export const { resetUsersState, logoutDemo } = usersSlice.actions;

export const selectUsers = (state) => state.users.list;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
export const selectSelectedUser = (state) => state.users.selectedUser;
export const selectDetailStatus = (state) => state.users.detailStatus;
export const selectDetailError = (state) => state.users.detailError;
export const selectAuthUser = (state) => state.users.authUser;
export const selectAuthStatus = (state) => state.users.authStatus;
export const selectAuthError = (state) => state.users.authError;
export const selectQuickPosts = (state) => state.users.posts;
export const selectQuickPostStatus = (state) => state.users.quickPostStatus;
export const selectQuickPostError = (state) => state.users.quickPostError;

export default usersSlice.reducer;
