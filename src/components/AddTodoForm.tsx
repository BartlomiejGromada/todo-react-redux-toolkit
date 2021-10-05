import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { addTodoAsync } from "../redux/todoSlice";
import styles from "./todoStyles.module.scss";

const AddToDoForm: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value !== "") {
      dispatch(
        addTodoAsync({
          name: value,
        })
      );
      setValue("");
    }
  };

  return (
    <div className={styles.containerForm}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="Todo*"
          className={styles.inputField}
          autoFocus
        />
        <button type="submit" className={styles.buttonSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddToDoForm;
