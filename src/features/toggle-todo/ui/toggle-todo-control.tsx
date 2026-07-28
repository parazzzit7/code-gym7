'use client'

import { Switch } from 'antd'

import { useUpdateTodoMutation, type Todo } from '@/entities/todo'

type ToggleTodoControlProps = {
  todo: Todo
}

export function ToggleTodoControl({ todo }: ToggleTodoControlProps) {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation()

  const handleChange = (completed: boolean) => {
    updateTodo({
      id: todo.id,
      userId: todo.userId,
      completed,
    })
  }

  return (
    <Switch
      checked={todo.completed}
      checkedChildren="Изучено"
      loading={isLoading}
      onChange={handleChange}
      unCheckedChildren="Не изучено"
    />
  )
}
