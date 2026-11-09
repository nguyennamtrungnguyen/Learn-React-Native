import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import usersReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});
