import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { StoreProvider } from '@/app/providers/store-provider'
import { AppFooter } from '@/widgets/app-footer'
import { AppHeader } from '@/widgets/app-header'
import { AppMobileNavigation } from '@/widgets/app-mobile-navigation'

import './globals.css'
import styles from './layout.module.scss'

export const metadata: Metadata = {
  title: 'Code Gym',
  description: 'Приложение для подготовки к собеседованиям',
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <AntdRegistry>
          <StoreProvider>
            <div className={styles.shell}>
              <AppHeader />

              <main className={styles.content}>{children}</main>

              <AppFooter />

              <AppMobileNavigation />
            </div>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
