'use client'

import Link from 'next/link'
import { Alert, Button, Spin, Tag } from 'antd'

import { useGetTodoByIdQuery } from '@/entities/todo'
import { ToggleTodoControl } from '@/features/toggle-todo'

import styles from './question-details.module.scss'

type QuestionDetailsProps = {
  todoId: number
}

export function QuestionDetails({ todoId }: QuestionDetailsProps) {
  const { data: todo, isLoading, isError, refetch } = useGetTodoByIdQuery(todoId)

  if (isLoading) {
    return <Spin size="large" />
  }

  if (isError || !todo) {
    return <Alert action={<Button onClick={refetch}>Повторить</Button>} message="Тема не найдена" type="error" />
  }

  return (
    <article className={styles.page}>
      <Link className={styles.back} href="/questions">
        ← Назад к вопросам
      </Link>

      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Вопрос #{todo.id}</span>

          <h1>{todo.title}</h1>
        </div>

        <Tag color={todo.completed ? 'green' : 'blue'}>{todo.completed ? 'Изучено' : 'Не изучено'}</Tag>
      </header>

      <section className={styles.section}>
        <h2>Описание темы</h2>

        <p>Изучи вопрос, сформулируй собственный ответ и подготовь несколько практических примеров.</p>
      </section>

      <section className={styles.section}>
        <h2>Информация</h2>

        <dl className={styles.information}>
          <div>
            <dt>ID вопроса</dt>
            <dd>{todo.id}</dd>
          </div>

          <div>
            <dt>ID пользователя</dt>
            <dd>{todo.userId}</dd>
          </div>

          <div>
            <dt>Текущий статус</dt>
            <dd>{todo.completed ? 'Тема изучена' : 'Нужно изучить'}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.progress}>
        <div>
          <h2>Прогресс</h2>

          <p>Отметь тему после изучения.</p>
        </div>

        <ToggleTodoControl todo={todo} />
      </section>
    </article>
  )
}
