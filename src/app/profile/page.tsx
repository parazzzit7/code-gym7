'use client'

import { Alert, Button, Spin, Typography } from 'antd'

import { ProfileProgress, UserCard, useGetUserByIdQuery } from '@/entities/user'

import { EditUserProfileForm } from '@/features/edit-user-profile'

import { TodoList } from '@/widgets/todo-list'

import styles from './profile-page.module.scss'

const { Title } = Typography

export default function ProfilePage() {
  const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(1)

  if (isLoading) {
    return <Spin size="large" />
  }

  if (isError || !user) {
    return (
      <Alert
        type="error"
        message="Не удалось загрузить пользователя"
        action={<Button onClick={refetch}>Повторить</Button>}
      />
    )
  }

  return (
    <div className={styles.page}>
      <Title className={styles.title} level={1}>
        Профиль
      </Title>

      <UserCard user={user} />

      <EditUserProfileForm user={user} />

      <ProfileProgress />

      <TodoList userId={user.id} />
    </div>
  )
}
