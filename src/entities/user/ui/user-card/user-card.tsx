import { Card, Descriptions, Typography } from "antd";

import type { User } from "../../model/user.types";

import styles from "./user-card.module.scss";

const { Text } = Typography;

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className={styles.card} title={user.name}>
      <Descriptions column={1}>
        <Descriptions.Item label="Логин">
          {user.username}
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          {user.email}
        </Descriptions.Item>

        <Descriptions.Item label="Телефон">
          {user.phone}
        </Descriptions.Item>

        <Descriptions.Item label="Город">
          {user.address.city}
        </Descriptions.Item>

        <Descriptions.Item label="Компания">
          {user.company.name}
        </Descriptions.Item>
      </Descriptions>

      <Text className={styles.note} type="secondary">
        Данные получены через RTK Query
      </Text>
    </Card>
  );
}