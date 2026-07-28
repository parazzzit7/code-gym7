'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './app-mobile-navigation.module.scss'

export function AppMobileNavigation() {
  const pathname = usePathname()

  return (
    <nav aria-label="Мобильная навигация" className={styles.navigation}>
      <span className={styles.disabledItem}>
        <span className={styles.icon}>✓</span>
        <span>Задачи</span>
      </span>

      <span className={styles.disabledItem}>
        <span className={styles.icon}>{'</>'}</span>
        <span>Daily</span>
      </span>

      <Link className={pathname.startsWith('/questions') ? styles.activeItem : styles.item} href="/questions">
        <span className={styles.icon}>?</span>
        <span>Вопросы</span>
      </Link>

      <Link className={pathname.startsWith('/profile') ? styles.activeItem : styles.item} href="/profile">
        <span className={styles.icon}>○</span>
        <span>Профиль</span>
      </Link>
    </nav>
  )
}
