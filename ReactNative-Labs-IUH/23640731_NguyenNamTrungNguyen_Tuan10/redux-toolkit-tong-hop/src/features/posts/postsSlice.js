import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API = "https://jsonplaceholder.typicode.com/posts";

// Hàm tiện ích kiểm tra res.ok
const request = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
  return res.json();
};

// 1. READ: lấy danh sách
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await request(`${API}?_limit=10`);
});

// 2. CREATE: thêm mới
export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const created = await request(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  return {
    ...created,
    // JSONPlaceholder luôn trả về id: 101; nếu đã có id 101 thì tạo id mới để tránh trùng key
    id: created.id === 101 ? Date.now() : created.id,
  };
});

// 3. UPDATE: cập nhật
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  // Với các bài viết vừa tạo trên client (id > 100), JSONPlaceholder PUT /posts/:id sẽ báo 500
  if (post.id > 100) {
    await new Promise((r) => setTimeout(r, 350));
    return post;
  }
  return await request(`${API}/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
});

// 4. DELETE: xóa (return id để reducer lọc bỏ)
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await request(`${API}/${id}`, { method: "DELETE" });
  return id; // trở thành action.payload
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle", // trạng thái tải danh sách
    error: null,
    submitting: false,
    // Bài tập nhanh Bài 3: trạng thái deletingId
    deletingId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // READ
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // CREATE: thêm vào đầu mảng
      .addCase(addPost.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.submitting = false;
        state.items.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state) => {
        state.submitting = false;
      })

      // UPDATE: thay phần tử có cùng id
      .addCase(updatePost.pending, (state) => {
        state.submitting = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.submitting = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updatePost.rejected, (state) => {
        state.submitting = false;
      })

      // DELETE + Bài tập nhanh Bài 3 (deletingId = action.meta.arg)
      .addCase(deletePost.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletingId = null;
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state) => {
        state.deletingId = null;
      });
  },
});

export default postsSlice.reducer;

// Selectors
export const selectPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectPostsSubmitting = (state) => state.posts.submitting;
export const selectDeletingId = (state) => state.posts.deletingId;
