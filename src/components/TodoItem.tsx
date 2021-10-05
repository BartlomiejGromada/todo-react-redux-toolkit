import Todo from "../models/Todo";
import { useAppDispatch } from "../redux/hooks";
import { deleteTodoAsync, toggleCompleteAsync } from "../redux/todoSlice";
import styles from "./todoStyles.module.scss";

const TodoItem: React.FC<Todo> = ({ id, name, completed }) => {
  const dispatch = useAppDispatch();

  const handleComplete = () => {
    dispatch(toggleCompleteAsync({ id: id, completed: !completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync({ id: id }));
  };
  return (
    <div className={completed ? styles.todoItemCompleted : styles.todoItem}>
      <div>
        <p>{name}</p>
      </div>
      <div className={styles.containerButtons}>
        <input type="checkbox" checked={completed} onChange={handleComplete} />
        <input type="button" value="X" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default TodoItem;
