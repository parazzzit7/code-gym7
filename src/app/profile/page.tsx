'use client'

import { Alert, Button, Spin } from 'antd'

import { useGetTodosByUserIdQuery } from '@/entities/todo'
import { useGetUserByIdQuery } from '@/entities/user'
import { EditUserProfileForm } from '@/features/edit-user-profile'

import styles from './profile-page.module.scss'

const USER_ID = 1

export default function ProfilePage() {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useGetUserByIdQuery(USER_ID)

  const {
    data: todos,
    isLoading: areTodosLoading,
    isError: areTodosError,
    refetch: refetchTodos,
  } = useGetTodosByUserIdQuery(USER_ID)

  if (isUserLoading || areTodosLoading) {
    return <Spin size="large" />
  }

  if (isUserError || areTodosError || !user || !todos) {
    const handleRefetch = () => {
      refetchUser()
      refetchTodos()
    }

    return (
      <Alert
        action={<Button onClick={handleRefetch}>Повторить</Button>}
        message="Не удалось загрузить профиль"
        type="error"
      />
    )
  }

  return (
    <div className={styles.page}>
      <h1>Профиль</h1>

      <EditUserProfileForm todos={todos} user={user} />
    </div>
  )
}
