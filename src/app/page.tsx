"use client";

import { Alert, Button, Spin, Typography } from "antd";

import { UserCard, useGetUserByIdQuery } from "@/entities/user";

const { Title } = Typography;

export default function HomePage() {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useGetUserByIdQuery(1);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError || !user) {
    return (
      <Alert
        type="error"
        message="Не удалось загрузить пользователя"
        action={<Button onClick={refetch}>Повторить</Button>}
      />
    );
  }

  return (
    <main>
      <Title level={1}>Code Gym</Title>
      <UserCard user={user} />
      <TodoList userId={user.id} />
    </main>
  );
}
import { TodoList } from "@/widgets/todo-list";