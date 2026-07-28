"use client";

import { Alert, Button, Spin, Typography } from "antd";

import { UserCard, useGetUserByIdQuery } from "@/entities/user";
import { TodoList } from "@/widgets/todo-list";

const { Title } = Typography;

export default function ProfilePage() {
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
    <>
      <Title level={1}>Профиль</Title>
      <UserCard user={user} />
      <TodoList userId={user.id} />
    </>
  );
}