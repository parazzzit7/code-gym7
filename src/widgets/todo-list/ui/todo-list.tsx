"use client";

import { Alert, Spin, Typography } from "antd";

import {
  TodoCard,
  useGetTodosByUserIdQuery,
} from "@/entities/todo";

import styles from "./todo-list.module.scss";

const { Title } = Typography;

type TodoListProps = {
  userId: number;
};

export function TodoList({ userId }: TodoListProps) {
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosByUserIdQuery(userId);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError || !todos) {
    return (
      <Alert
        type="error"
        message="Не удалось загрузить задачи"
      />
    );
  }

  return (
    <section className={styles.wrapper}>
      <Title level={2}>Задачи пользователя</Title>

      <div className={styles.list}>
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
}