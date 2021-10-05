import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Todo from "../models/Todo";
import TodoItem from "./TodoItem";
import styles from "./todoStyles.module.scss";
import { getTodosAsync } from "../redux/todoSlice";
import { useEffect } from "react";

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <div className={styles.containerList}>
      <div className={styles.containerTitle}>
        <h3 style={{ color: "#011f4b" }}>Todo list</h3>
      </div>
      <div className={styles.cotainerTodos}>
        {todos.map((todo: Todo) => {
          return (
            <TodoItem
              key={todo.id}
              id={todo.id}
              name={todo.name}
              completed={todo.completed}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
