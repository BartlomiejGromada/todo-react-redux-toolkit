import React from "react";
import AddToDoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TotalCompleteItems from "./components/TotalCompleteItems";
import styles from "./appStyles.module.scss";

function App() {
  return (
    <div className={styles.containerApp}>
      <div className={styles.header}>
        <h1>Todos App - Redux Toolkit</h1>
      </div>
      <AddToDoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
}

export default App;
