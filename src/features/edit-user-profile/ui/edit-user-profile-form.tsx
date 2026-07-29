'use client'

import { useState } from 'react'
import { Alert, Avatar, Button, Form, Input, Progress, Select, Statistic } from 'antd'

import type { Todo } from '@/entities/todo'
import {
  PROFILE_SKILLS,
  useUpdateUserMutation,
  type User,
  type UserGrade,
  type UserSpecialization,
} from '@/entities/user'

import styles from './edit-user-profile-form.module.scss'

const { TextArea } = Input

type EditUserProfileFormProps = {
  user: User
  todos: Todo[]
}

type ProfileFormValues = {
  name: string
  username: string
  email: string
  phone: string
  grade: UserGrade
  specialization: UserSpecialization
  about: string
  links: string[]
}

export function EditUserProfileForm({ user, todos }: EditUserProfileFormProps) {
  const [isSaved, setIsSaved] = useState(false)

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation()

  const completedTodosCount = todos.filter(todo => todo.completed).length

  const statistics = [
    {
      title: 'Решённые задачи',
      value: completedTodosCount,
    },
    {
      title: 'Всего вопросов',
      value: todos.length,
    },
    {
      title: 'Дней подряд',
      value: 30,
    },
  ]

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
          website: values.links[0] ?? '',
          grade: values.grade,
          specialization: values.specialization,
          about: values.about,
          links: values.links,
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
      initialValues={{
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        grade: user.grade,
        specialization: user.specialization,
        about: user.about,
        links: user.links,
      }}
      layout="vertical"
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
              <Input prefix="@" />
            </Form.Item>

            <Form.Item label="Телефон" name="phone">
              <Input />
            </Form.Item>
          </div>
        </section>

        <aside className={styles.tips}>
          <h2>Подсказки</h2>

          <strong>Рекомендации по профилю</strong>

          <ul>
            <li>Заполни все поля профиля.</li>
            <li>Укажи актуальные навыки.</li>
            <li>Регулярно обновляй информацию.</li>
          </ul>

          <strong>Полезная информация</strong>

          <p>Чем подробнее заполнен профиль, тем проще отслеживать прогресс обучения.</p>
        </aside>
      </div>

      <section className={`${styles.section} ${styles.subscriptionRow}`}>
        <div>
          <h2>Подписка</h2>

          <strong>Нет активной подписки</strong>

          <p>Оформи подписку, чтобы получить доступ к дополнительным материалам.</p>
        </div>

        <Button htmlType="button" type="primary">
          Оформить
        </Button>
      </section>

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
            <Select<UserGrade>
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
            <Select<UserSpecialization>
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
          {statistics.map(item => (
            <div className={styles.statistic} key={item.title}>
              <Statistic title={item.title} value={item.value} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Личные ссылки</h2>

        <Form.List name="links">
          {(fields, { add, remove }) => (
            <>
              <div className={styles.links}>
                {fields.map((field, index) => (
                  <div className={styles.linkRow} key={field.key}>
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          required: true,
                          message: 'Введите адрес сайта',
                        },
                      ]}>
                      <Input prefix="https://" placeholder="example.com" />
                    </Form.Item>

                    <Button
                      aria-label={`Удалить ссылку ${index + 1}`}
                      danger
                      htmlType="button"
                      onClick={() => remove(field.name)}
                      type="text">
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              <Button className={styles.addLink} htmlType="button" onClick={() => add('')} type="link">
                + Добавить сайт
              </Button>
            </>
          )}
        </Form.List>
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
