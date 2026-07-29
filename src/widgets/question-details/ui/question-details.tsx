'use client'

import Link from 'next/link'
import { Alert, Button, Spin, Tag } from 'antd'

import { getInterviewTopic, getInterviewTopicContent, useGetTodoByIdQuery } from '@/entities/todo'
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

  const topic = getInterviewTopic(todo.id)
  const content = getInterviewTopicContent(todo.id)

  return (
    <article className={styles.page}>
      <Link className={styles.back} href="/questions">
        ← Назад к вопросам
      </Link>

      <header className={styles.header}>
        <div>
          <div className={styles.meta}>
            <Tag color="blue">{topic.category}</Tag>
            <span>Вопрос #{todo.id}</span>
          </div>

          <h1>{topic.title}</h1>
        </div>

        <Tag color={todo.completed ? 'green' : 'default'}>{todo.completed ? 'Изучено' : 'Не изучено'}</Tag>
      </header>

      <section className={styles.section}>
        <h2>Определение</h2>
        <p>{content.definition}</p>
      </section>

      <section className={styles.section}>
        <h2>Пример</h2>

        <pre className={styles.code}>
          <code>{content.example}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Что рассказать на собеседовании</h2>

        <ul className={styles.points}>
          {content.keyPoints.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>
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
