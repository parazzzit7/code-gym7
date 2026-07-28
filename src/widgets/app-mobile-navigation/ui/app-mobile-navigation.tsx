'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from 'antd'

import styles from './app-mobile-navigation.module.scss'

export function AppMobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className={styles.navigation}>
      <Link href="/profile">
        <Button type={pathname.startsWith('/profile') ? 'primary' : 'text'}>Профиль</Button>
      </Link>

      <Link href="/questions">
        <Button type={pathname.startsWith('/questions') ? 'primary' : 'text'}>Вопросы</Button>
      </Link>
    </nav>
  )
}
