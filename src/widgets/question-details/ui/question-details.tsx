'use client'

import Link from 'next/link'
import { Alert, Button, Card, Descriptions, Spin, Tag, Typography } from 'antd'

import { useGetTodoByIdQuery } from '@/entities/todo'
import { ToggleTodoCard } from '@/features/toggle-todo'

import styles from './question-details.module.scss'

const { Paragraph, Title } = Typography

type QuestionDetailsProps = {
  todoId: number
}

export function QuestionDetails({ todoId }: QuestionDetailsProps) {
  const { data: todo, isLoading, isError, refetch } = useGetTodoByIdQuery(todoId)

  if (isLoading) {
    return <Spin size="large" />
  }

  if (isError || !todo) {
    return <Alert type="error" message="Тема не найдена" action={<Button onClick={refetch}>Повторить</Button>} />
  }

  return (
    <section className={styles.wrapper}>
      <div>
        <Tag color={todo.completed ? 'green' : 'blue'}>{todo.completed ? 'Изучено' : 'Новая тема'}</Tag>

        <Title level={1}>Тема #{todo.id}</Title>
      </div>

      <Card title="Вопрос">
        <Paragraph className={styles.description}>{todo.title}</Paragraph>
      </Card>

      <Card title="Информация">
        <Descriptions column={1}>
          <Descriptions.Item label="ID задачи">{todo.id}</Descriptions.Item>

          <Descriptions.Item label="ID пользователя">{todo.userId}</Descriptions.Item>

          <Descriptions.Item label="Статус">
            {todo.completed ? 'Тема изучена' : 'Тема ещё не изучена'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Отметить прогресс">
        <ToggleTodoCard todo={todo} />
      </Card>

      <div className={styles.actions}>
        <Link href="/questions">
          <Button>Назад к вопросам</Button>
        </Link>

        <Link href="/profile">
          <Button type="primary">Перейти в профиль</Button>
        </Link>
      </div>
    </section>
  )
}
