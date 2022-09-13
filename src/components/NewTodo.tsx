import styles from "./NewTodo.module.css";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent } from "react";

interface NewTodoProps {
  onSubmit: (event: FormEvent) => void;
  onChange: (event: ChangeEvent) => void;
  value: string;
  disabled: boolean;
}

export function NewTodo({ onSubmit, onChange, value, disabled }: NewTodoProps) {

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

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
