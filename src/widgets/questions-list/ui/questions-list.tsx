'use client'

import { useMemo, useState } from 'react'

import { Alert, Empty, Input, Pagination, Select, Spin } from 'antd'

import { QuestionCard, useGetTodosQuery } from '@/entities/todo'

import styles from './questions-list.module.scss'

const PAGE_SIZE = 10

type StatusFilter = 'all' | 'completed' | 'active'

export function QuestionsList() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const { data: todos, isLoading, isError } = useGetTodosQuery()

  const filteredTodos = useMemo(() => {
    if (!todos) {
      return []
    }

    return todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        status === 'all' || (status === 'completed' && todo.completed) || (status === 'active' && !todo.completed)

      return matchesSearch && matchesStatus
    })
  }, [search, status, todos])

  if (isLoading) {
    return <Spin size="large" />
  }

  if (isError || !todos) {
    return <Alert message="Не удалось загрузить вопросы" type="error" />
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE

  const visibleTodos = filteredTodos.slice(startIndex, startIndex + PAGE_SIZE)

  const handleSearch = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleStatus = (value: StatusFilter) => {
    setStatus(value)
    setCurrentPage(1)
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        <Input.Search
          allowClear
          onChange={event => handleSearch(event.target.value)}
          placeholder="Поиск вопроса"
          value={search}
        />

        <Select<StatusFilter>
          onChange={handleStatus}
          options={[
            {
              label: 'Все вопросы',
              value: 'all',
            },
            {
              label: 'Изученные',
              value: 'completed',
            },
            {
              label: 'Не изученные',
              value: 'active',
            },
          ]}
          value={status}
        />
      </div>

      {visibleTodos.length ? (
        <div className={styles.list}>
          {visibleTodos.map(todo => (
            <QuestionCard key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <Empty description="Вопросы не найдены" />
      )}

      <Pagination
        current={currentPage}
        onChange={setCurrentPage}
        pageSize={PAGE_SIZE}
        showSizeChanger={false}
        total={filteredTodos.length}
      />
    </section>
  )
}
