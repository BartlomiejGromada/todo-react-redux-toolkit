import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import Todo from "../models/Todo";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch("http://localhost:7000/todos");
    if (response.ok) {
      const todos: Todo[] = await response.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload: any) => {
    const response = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: payload.name }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload: any) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload: any) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state: any, action) => {
      const newTodo: Todo = {
        id: nanoid(),
        name: action.payload.name,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state: any, action) => {
      const index = state.findIndex(
        (todo: Todo) => todo.id === action.payload.id
      );
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state: any, action) => {
      return state.filter((todo: Todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.fulfilled, (state: any, action): any => {
      return action.payload?.todos;
    });
    builder.addCase(addTodoAsync.fulfilled, (state: any, action) => {
      state.push(action.payload?.todo);
    });
    builder.addCase(
      toggleCompleteAsync.fulfilled,
      (state: any, action): any => {
        const index = state.findIndex(
          (todo: Todo) => todo.id === action.payload?.id
        );
        state[index].completed = action.payload?.completed;
      }
    );
    builder.addCase(deleteTodoAsync.fulfilled, (state: any, action) => {
      return action.payload?.todos;
    });
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
