import Link from 'next/link'
import { Button, Tag } from 'antd'

import type { Todo } from '../../model/todo.types'

import styles from './question-card.module.scss'

type QuestionCardProps = {
  todo: Todo
}

export function QuestionCard({ todo }: QuestionCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.number}>{todo.id}</div>

      <div className={styles.content}>
        <strong>{todo.title}</strong>

        <span>Вопрос для подготовки к техническому собеседованию</span>
      </div>

      <Tag color={todo.completed ? 'green' : 'blue'}>{todo.completed ? 'Изучено' : 'Не изучено'}</Tag>

      <Link href={`/questions/${todo.id}`}>
        <Button size="small" type="primary">
          Перейти к теме
        </Button>
      </Link>
    </article>
  )
}
