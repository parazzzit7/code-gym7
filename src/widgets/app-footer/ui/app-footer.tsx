import Link from 'next/link'
import { Button } from 'antd'

import styles from './app-footer.module.scss'

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link className={styles.logo} href="/profile">
              CODE GYM
            </Link>

            <p>
              Платформа для подготовки разработчиков к техническим собеседованиям и улучшения алгоритмических навыков.
            </p>
          </div>

          <nav className={styles.navigation}>
            <strong>Основное</strong>

            <span>Задачи</span>

            <Link href="/questions">Вопросы с собеседований</Link>

            <span>Daily Coding</span>
          </nav>
        </div>

        <div className={styles.meta}>
          <span>©2025 CODE GYM. Все права защищены.</span>

          <div>
            <span>Политика конфиденциальности</span>
            <span>Пользовательское соглашение</span>
          </div>
        </div>

        <div className={styles.support}>
          <span>Есть вопросы или предложения? Мы всегда готовы помочь!</span>

          <Button htmlType="button" type="primary">
            Обратиться в поддержку
          </Button>
        </div>
      </div>
    </footer>
  )
}
