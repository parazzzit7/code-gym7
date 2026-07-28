import Link from 'next/link'
import { Button, Input } from 'antd'

import styles from './app-footer.module.scss'

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.about}>
            <Link className={styles.logo} href="/profile">
              CODE GYM
            </Link>

            <p>Твой проводник в подготовке к техническим собеседованиям и развитию навыков.</p>
          </div>

          <div className={styles.links}>
            <h3>Основное</h3>

            <Link href="/profile">Профиль</Link>

            <Link href="/questions">Вопросы с собеседований</Link>

            <span>Daily Coding</span>
          </div>

          <div className={styles.contacts}>
            <h3>Контакты</h3>

            <a href="mailto:codegym@example.com">codegym@example.com</a>

            <span>Поддержка пользователей</span>
          </div>
        </div>

        <div className={styles.subscribe}>
          <div>
            <strong>Будь в курсе обновлений</strong>

            <p>Новые вопросы и материалы прямо на почту.</p>
          </div>

          <div className={styles.subscribeForm}>
            <Input aria-label="Email для подписки" placeholder="Введите email" type="email" />

            <Button type="primary">Подписаться</Button>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Code Gym</span>

          <span>Политика конфиденциальности</span>
        </div>
      </div>
    </footer>
  )
}
