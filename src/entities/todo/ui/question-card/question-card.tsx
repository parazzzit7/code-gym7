import Link from 'next/link'
import { Button, Tag } from 'antd'

import { getInterviewTopic } from '../../model/interview-topics'
import type { Todo } from '../../model/todo.types'

import styles from './question-card.module.scss'

type QuestionCardProps = {
  todo: Todo
}

export function QuestionCard({ todo }: QuestionCardProps) {
  const topic = getInterviewTopic(todo.id)

  return (
    <article className={styles.questionCard}>
      <Tag color="blue">{topic.category}</Tag>

      <h2 className={styles.topicTitle}>{topic.title}</h2>

      <p className={styles.topicDescription}>{topic.description}</p>

      <div className={styles.cardFooter}>
        <Tag color={todo.completed ? 'green' : 'default'}>{todo.completed ? 'Изучено' : 'Не изучено'}</Tag>

        <Link href={`/questions/${todo.id}`}>
          <Button type="primary">Перейти к теме</Button>
        </Link>
      </div>
    </article>
  )
}
