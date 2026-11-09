import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: 1, title: "Học Selector cơ bản & useSelector", done: true },
    { id: 2, title: "Khai báo selectors trong createSlice (RTK 2.0+)", done: true },
    { id: 3, title: "Tối ưu hiệu năng với createSelector (Memoization)", done: false },
    { id: 4, title: "Hoàn thành bài tập nhanh selectProgress", done: false },
  ],
  filter: "all", // "all" | "done" | "active"
  unrelatedCounter: 0, // Dùng để kiểm chứng createSelector không tính lại khi state khác đổi
};

let memoCalcCount = 0;
export const getMemoCalcCount = () => memoCalcCount;

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const nextId =
        state.items.length > 0
          ? Math.max(...state.items.map((t) => t.id)) + 1
          : 1;
      state.items.push({
        id: nextId,
        title: action.payload,
        done: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    incrementUnrelated: (state) => {
      state.unrelatedCounter += 1;
    },
  },
  // Mục 3: Selector trong createSlice (RTK 2.0+)
  selectors: {
    selectItems: (sliceState) => sliceState.items,
    selectFilter: (sliceState) => sliceState.filter,
    selectDoneCount: (sliceState) =>
      sliceState.items.filter((t) => t.done).length,
    selectUnrelatedCounter: (sliceState) => sliceState.unrelatedCounter,
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  incrementUnrelated,
} = todosSlice.actions;

export const {
  selectItems,
  selectFilter,
  selectDoneCount,
  selectUnrelatedCounter,
} = todosSlice.selectors;

// Mục 4: createSelector (Memoization)
export const selectVisibleTodos = createSelector(
  [selectItems, selectFilter],
  (items, filter) => {
    memoCalcCount += 1;
    if (filter === "done") return items.filter((t) => t.done);
    if (filter === "active") return items.filter((t) => !t.done);
    return items;
  }
);

// Selector có tham số: tìm todo theo id
export const selectTodoById = createSelector(
  [selectItems, (_state, id) => id],
  (items, id) => items.find((t) => t.id === Number(id))
);

// Bài tập nhanh Bài 1: Viết selector selectProgress trả về % todo đã hoàn thành
export const selectProgress = createSelector([selectItems], (items) =>
  items.length === 0
    ? 0
    : Math.round((items.filter((t) => t.done).length / items.length) * 100)
);

export default todosSlice.reducer;
