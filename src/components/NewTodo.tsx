import styles from "./NewTodo.module.css";
import { PlusCircle } from "phosphor-react";
import { InvalidEvent } from "react";

interface NewTodoProps {
  onSubmit: any;
  onChange: any;
  value: string;
  disabled: boolean;
}

export function NewTodo({ onSubmit, onChange, value, disabled }: NewTodoProps) {

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  console.log(disabled);

  return (
    <form onSubmit={onSubmit} className={styles.newTodoForm}>
      <input
        onChange={onChange}
        onInvalid={handleNewCommentInvalid}
        value={value}
        required
        placeholder="Adicione uma nova tarefa"
      />
      <button disabled={disabled} title="Criar" type="submit">
        Criar
        <PlusCircle size={20} />
      </button>
    </form>
  )
}
