import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";

import styles from "./App.module.css";
import "./global.css";

export function App() {
  return (
    <div >
      <Header />
      <div className={styles.wrapper}>
        <TodoList />
      </div>
    </div>
  );
}
