import Todo from "../models/Todo";
import { useAppSelector } from "../redux/hooks";

const TotalCompleteItems = () => {
  const totalCompleteTodos = useAppSelector((state) =>
    state.todos.filter((todo: Todo) => todo.completed === true)
  );
  return (
    <div>
      <h3 style={{ color: "#011f4b" }}>
        Total complete items: {totalCompleteTodos.length}
      </h3>
    </div>
  );
};

export default TotalCompleteItems;
