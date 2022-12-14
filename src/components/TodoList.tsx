import { Todo } from './Todo';
import styles from './TodoList.module.css';
import clipboard from '../assets/clipboard.svg';
import { useState, FormEvent, ChangeEvent } from 'react';
import { NewTodo } from './NewTodo';

import { v4 as uuidv4 } from 'uuid';

const sampleTasks = [
  {
    id: uuidv4(),
    content: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    completed: false
  },
  {
    id: uuidv4(),
    content: "Lorem ipsum dolor sit amet, qui minim labore",
    completed: false
  },
  {
    id: uuidv4(),
    content: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    completed: true
  }
]

export function TodoList() {
  const [listOfTasks, setListOfTasks] = useState(sampleTasks);
  const [completedTasks, setCompletedTasks] = useState(sampleTasks.filter(task => task.completed == true).length);
  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      id: uuidv4(),
      content: newTaskText,
      completed: false
    }
    setListOfTasks([...listOfTasks, newTask]);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleToggleCompleteTask(taskToComplete: string) {
    const taskWithOneCompleted = listOfTasks.map(task => {
      if (task.id === taskToComplete) {
        task.completed = !task.completed;
      }
      return task;
    });

    setCompletedTasks(taskWithOneCompleted.filter((task) => task.completed === true).length);
    setListOfTasks([...taskWithOneCompleted]);
  }

  function removeTask(taskToDelete: string) {
    const taskWithoutDeletedOne = listOfTasks.filter(task => {
      return task.id !== taskToDelete;
    });

    setCompletedTasks(taskWithoutDeletedOne.filter((task) => task.completed === true).length);
    setListOfTasks([...taskWithoutDeletedOne]);
  }

  const isNewTaskEmpty = newTaskText.length === 0;

  return (
    <div>
      <NewTodo
        onSubmit={handleCreateNewTask}
        onChange={handleNewTaskChange}
        value={newTaskText}
        disabled={isNewTaskEmpty}
      />
      <div className={styles.info}>
        <div>
          <span className={styles.taskQuantityTitle}>Tarefas Criadas</span><span className={styles.number}>{listOfTasks.length}</span>
        </div>
        <div>
          <span className={styles.taskCompleteTitle}>Conclu??das </span><span className={styles.number}>{`${completedTasks} de ${listOfTasks.length}`}</span>
        </div>
      </div>
      {
        listOfTasks.length == 0
          ?
          <div className={styles.warning}>
            <img src={clipboard} />
            <p>Voc?? ainda n??o tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
          :
          <article>
            {
              listOfTasks.map(task => {
                return (
                  <Todo
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    completed={task.completed}
                    onDeleteTask={removeTask}
                    onCompleteTask={handleToggleCompleteTask}
                  />
                )
              })
            }
          </article>
      }
    </div >
  )
}
