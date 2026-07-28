import Link from "next/link";
import { Button } from "antd";

import styles from "./app-header.module.scss";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} href="/profile">
          Code Gym
        </Link>

        <nav className={styles.navigation}>
          <Link href="/profile">
            <Button type="text">Профиль</Button>
          </Link>

          <Link href="/questions">
            <Button type="text">Вопросы с собесов</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}