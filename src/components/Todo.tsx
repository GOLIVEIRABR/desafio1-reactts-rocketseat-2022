import styles from './Todo.module.css';
import { Trash } from 'phosphor-react';

interface TaskProps {
  id: number;
  content: string;
  completed: boolean;
  onDeleteTask: (task: number) => void;
  onCompleteTask: (task: number) => void;
}

export function Todo({ id, content, completed = false, onDeleteTask, onCompleteTask }: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCompleteTask() {
    onCompleteTask(id);
  }

  return (
    <div className={styles.wrapper}>
      <button className={completed === false ? styles.statusButton : styles.statusButtonCompleted} onClick={handleCompleteTask}><span></span></button>
      <p className={completed === false ? "" : styles.completedText}>{content}</p>
      <button className={styles.trash} title="Deletar tarefa" onClick={handleDeleteTask}>
        <Trash size={16} />
      </button>
    </div >
  );
}
