import { Avatar, Button, Card, Descriptions, Tag, Typography } from 'antd'

import type { User } from '../../model/user.types'

import styles from './user-card.module.scss'

const { Paragraph, Text, Title } = Typography

type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <section className={styles.grid}>
      <Card className={styles.personalCard}>
        <div className={styles.profileHeader}>
          <Avatar className={styles.avatar} size={88}>
            {initials}
          </Avatar>

          <div>
            <Title level={2} className={styles.name}>
              {user.name}
            </Title>

            <Text type="secondary">@{user.username}</Text>
          </div>
        </div>

        <Title level={4}>Личные данные</Title>

        <Descriptions className={styles.descriptions} column={1} size="small">
          <Descriptions.Item label="Имя">{user.name}</Descriptions.Item>

          <Descriptions.Item label="Почта">{user.email}</Descriptions.Item>

          <Descriptions.Item label="Telegram">@{user.username}</Descriptions.Item>

          <Descriptions.Item label="Телефон">{user.phone}</Descriptions.Item>

          <Descriptions.Item label="Город">{user.address.city}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className={styles.subscriptionCard} title="Подписка">
        <Tag color="blue">Без подписки</Tag>

        <Paragraph className={styles.subscriptionText}>
          Подписка открывает дополнительные задачи, материалы и возможность отслеживать прогресс подготовки.
        </Paragraph>

        <ul className={styles.advantages}>
          <li>Новые вопросы с собеседований</li>
          <li>Расширенная статистика</li>
          <li>Персональный план обучения</li>
        </ul>

        <Button type="primary" block>
          Выбрать подписку
        </Button>
      </Card>
    </section>
  )
}
