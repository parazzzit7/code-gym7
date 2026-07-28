'use client'

import { useState } from 'react'
import { Alert, Avatar, Button, Form, Input, Progress, Select, Statistic } from 'antd'

import { PROFILE_SKILLS, PROFILE_STATISTICS } from '@/entities/user/model/profile.constants'

import { useUpdateUserMutation, type User } from '@/entities/user'

import styles from './edit-user-profile-form.module.scss'

const { TextArea } = Input

type EditUserProfileFormProps = {
  user: User
}

type ProfileFormValues = {
  name: string
  username: string
  email: string
  phone: string
  website: string
  grade: string
  specialization: string
  about: string
}

export function EditUserProfileForm({ user }: EditUserProfileFormProps) {
  const [isSaved, setIsSaved] = useState(false)

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation()

  const initials = user.name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleSubmit = async (values: ProfileFormValues) => {
    setIsSaved(false)

    try {
      await updateUser({
        id: user.id,
        changes: {
          name: values.name,
          username: values.username,
          email: values.email,
          phone: values.phone,
          website: values.website,
        },
      }).unwrap()

      setIsSaved(true)
    } catch {
      setIsSaved(false)
    }
  }

  return (
    <Form<ProfileFormValues>
      className={styles.profile}
      layout="vertical"
      initialValues={{
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        grade: 'junior',
        specialization: 'frontend',
        about: 'Изучаю frontend-разработку и готовлюсь к техническим собеседованиям.',
      }}
      onFinish={handleSubmit}>
      <div className={styles.top}>
        <div className={styles.avatarBlock}>
          <Avatar className={styles.avatar} size={88}>
            {initials}
          </Avatar>

          <strong>{user.name}</strong>
          <span>@{user.username}</span>
        </div>

        <section className={styles.personal}>
          <h2>Личные данные</h2>

          <div className={styles.fields}>
            <Form.Item
              label="Имя"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Введите имя',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Почта"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Введите почту',
                },
                {
                  type: 'email',
                  message: 'Некорректная почта',
                },
              ]}>
              <Input type="email" />
            </Form.Item>

            <Form.Item label="Telegram" name="username">
              <Input addonBefore="@" />
            </Form.Item>

            <Form.Item label="Телефон" name="phone">
              <Input />
            </Form.Item>
          </div>
        </section>

        <aside className={styles.subscription}>
          <h2>Подписка</h2>

          <strong>Без подписки</strong>

          <p>Получи доступ к дополнительным вопросам, статистике и материалам.</p>

          <ul>
            <li>Новые вопросы</li>
            <li>Расширенная статистика</li>
            <li>Персональный план</li>
          </ul>

          <Button block htmlType="button" type="primary">
            Выбрать подписку
          </Button>
        </aside>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Мой уровень</h2>
          <span>65%</span>
        </div>

        <Progress percent={65} showInfo={false} />
      </section>

      <section className={styles.section}>
        <div className={styles.twoColumns}>
          <Form.Item label="Грейд" name="grade">
            <Select
              options={[
                {
                  label: 'Junior',
                  value: 'junior',
                },
                {
                  label: 'Middle',
                  value: 'middle',
                },
                {
                  label: 'Senior',
                  value: 'senior',
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Специализация" name="specialization">
            <Select
              options={[
                {
                  label: 'Frontend-разработчик',
                  value: 'frontend',
                },
                {
                  label: 'Backend-разработчик',
                  value: 'backend',
                },
                {
                  label: 'Fullstack-разработчик',
                  value: 'fullstack',
                },
              ]}
            />
          </Form.Item>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Навыки</h2>

        <div className={styles.skills}>
          {PROFILE_SKILLS.map(skill => (
            <div key={skill.name}>
              <div className={styles.skillTitle}>
                <span>{skill.name}</span>
                <span>{skill.percent}%</span>
              </div>

              <Progress percent={skill.percent} showInfo={false} size="small" />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>О себе</h2>

        <Form.Item name="about">
          <TextArea rows={4} />
        </Form.Item>
      </section>

      <section className={styles.section}>
        <h2>Статистика</h2>

        <div className={styles.statistics}>
          {PROFILE_STATISTICS.map(item => (
            <div className={styles.statistic} key={item.title}>
              <Statistic title={item.title} value={item.value} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Полезные ссылки</h2>

        <Form.Item label="Сайт" name="website">
          <Input addonBefore="https://" />
        </Form.Item>
      </section>

      {isError && <Alert className={styles.message} message="Не удалось сохранить профиль" type="error" />}

      {isSaved && <Alert className={styles.message} message="Профиль сохранён в Redux Store" type="success" />}

      <div className={styles.actions}>
        <Button htmlType="submit" loading={isLoading} type="primary">
          Сохранить
        </Button>
      </div>
    </Form>
  )
}
