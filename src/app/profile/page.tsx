'use client'

import { Alert, Button, Spin } from 'antd'

import { useGetUserByIdQuery } from '@/entities/user'
import { EditUserProfileForm } from '@/features/edit-user-profile'

import styles from './profile-page.module.scss'

export default function ProfilePage() {
  const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(1)

  if (isLoading) {
    return <Spin size="large" />
  }

  if (isError || !user) {
    return (
      <Alert
        action={<Button onClick={refetch}>Повторить</Button>}
        message="Не удалось загрузить профиль"
        type="error"
      />
    )
  }

  return (
    <div className={styles.page}>
      <h1>Профиль</h1>

      <EditUserProfileForm user={user} />
    </div>
  )
}
