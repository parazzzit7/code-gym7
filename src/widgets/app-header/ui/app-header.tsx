import Link from 'next/link'
import { Button } from 'antd'

import styles from './app-header.module.scss'

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} href="/profile">
          CODE GYM
        </Link>

        <nav className={styles.navigation}>
          <Button disabled type="text">
            Задачи
          </Button>

          <Link href="/questions">
            <Button type="text">Вопросы с собеседований</Button>
          </Link>

          <Button disabled type="text">
            Daily Coding
          </Button>
        </nav>

        <div className={styles.actions}>
          <Button>Вход</Button>

          <Button type="primary">Регистрация</Button>
        </div>
      </div>
    </header>
  )
}
