"use client";

import {
  TodoCard,
  useUpdateTodoMutation,
  type Todo,
} from "@/entities/todo";

type ToggleTodoCardProps = {
  todo: Todo;
};

export function ToggleTodoCard({ todo }: ToggleTodoCardProps) {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const handleCompletedChange = (completed: boolean) => {
    updateTodo({
      id: todo.id,
      userId: todo.userId,
      completed,
    });
  };

  return (
    <TodoCard
      todo={todo}
      disabled={isLoading}
      onCompletedChange={handleCompletedChange}
    />
  );
}