import Link from 'next/link'
import { Button, Card, Tag, Typography } from 'antd'

import type { Todo } from '../../model/todo.types'

import styles from './question-card.module.scss'

const { Paragraph } = Typography

type QuestionCardProps = {
  todo: Todo
}

export function QuestionCard({ todo }: QuestionCardProps) {
  return (
    <Card className={styles.card} title={`Тема #${todo.id}`}>
      <div className={styles.content}>
        <Paragraph className={styles.title}>{todo.title}</Paragraph>

        <div className={styles.footer}>
          <Tag color={todo.completed ? 'green' : 'blue'}>{todo.completed ? 'Изучено' : 'Новая тема'}</Tag>

          <Link href={`/questions/${todo.id}`}>
            <Button type="primary">Перейти к теме</Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
