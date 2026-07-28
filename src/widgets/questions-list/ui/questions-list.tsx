'use client'

import { useState } from 'react'
import { Alert, Pagination, Spin } from 'antd'

import { QuestionCard, useGetTodosQuery } from '@/entities/todo'

import styles from './questions-list.module.scss'

const PAGE_SIZE = 12

export function QuestionsList() {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: todos, isLoading, isError } = useGetTodosQuery()

  if (isLoading) {
    return <Spin size="large" />
  }

  if (isError || !todos) {
    return <Alert type="error" message="Не удалось загрузить вопросы" />
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE
  const visibleTodos = todos.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        {visibleTodos.map(todo => (
          <QuestionCard key={todo.id} todo={todo} />
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={todos.length}
        showSizeChanger={false}
        onChange={setCurrentPage}
      />
    </section>
  )
}
