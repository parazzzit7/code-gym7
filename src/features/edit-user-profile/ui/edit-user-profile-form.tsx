'use client'

import { useState } from 'react'
import { Alert, Button, Form, Input, Progress, Select, Statistic, Tag } from 'antd'
import {
  BarChartOutlined,
  EditOutlined,
  GiftOutlined,
  LinkOutlined,
  MailOutlined,
  RocketOutlined,
  SendOutlined,
  StarOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons'

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
  email: string
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
      title: 'Решённых задач',
      value: completedTodosCount,
    },
    {
      title: 'Собеседований',
      value: 4,
    },
    {
      title: 'Дней подряд',
      value: 30,
    },
  ]

  const handleSubmit = async (values: ProfileFormValues) => {
    setIsSaved(false)

    try {
      await updateUser({
        id: user.id,
        changes: {
          name: values.name,
          email: values.email,
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
        email: user.email,
        grade: user.grade,
        specialization: user.specialization,
        about: user.about,
        links: user.links,
      }}
      layout="vertical"
      onFinish={handleSubmit}>
      <div className={styles.profileGrid}>
        <div className={styles.mainColumn}>
          <div className={styles.identity}>
            <div className={styles.avatarPlaceholder}>
              <svg aria-hidden="true" fill="none" viewBox="0 0 64 64">
                <rect height="42" rx="4" stroke="currentColor" strokeWidth="2" width="42" x="11" y="11" />

                <circle cx="24" cy="25" r="5" stroke="currentColor" strokeWidth="2" />

                <path d="M13 47c7-9 14-12 21-9 5 2 9 1 17-5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            <div className={styles.contactFields}>
              <Form.Item
                label={
                  <span className={styles.fieldLabel}>
                    <UserOutlined />
                    Фамилия и имя
                  </span>
                }
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Введите фамилию и имя',
                  },
                ]}>
                <Input placeholder="Введите вашу фамилию и имя" />
              </Form.Item>

              <Form.Item
                label={
                  <span className={styles.fieldLabel}>
                    <MailOutlined />
                    Почта
                  </span>
                }
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
                <Input placeholder="example@mail.com" type="email" />
              </Form.Item>

              <div className={styles.telegramRow}>
                <span className={styles.fieldLabel}>
                  <SendOutlined />
                  Telegram:
                </span>

                <Tag color="blue" variant="filled">
                  @{user.username}
                </Tag>
              </div>
            </div>
          </div>

          <section className={styles.subscription}>
            <h2>
              <GiftOutlined />
              Подписка
            </h2>

            <div className={styles.subscriptionContent}>
              <div>
                <strong>Нет активной подписки</strong>
                <p>Оформите подписку для доступа ко всем функциям</p>
              </div>

              <Button htmlType="button" type="primary">
                Оформить
              </Button>
            </div>
          </section>

          <section className={styles.levelSection}>
            <h2>
              <TrophyOutlined />
              lvl- уровень
            </h2>

            <div className={styles.levelCard}>
              <strong>Текущий уровень: 1</strong>
              <p>Решайте задачи и повышайте свой уровень!</p>

              <Progress percent={50} showInfo={false} />

              <span className={styles.levelCaption}>5/10 задач до следующего уровня</span>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.twoColumns}>
              <Form.Item
                label={
                  <span className={styles.fieldLabel}>
                    <RocketOutlined />
                    Грейд
                  </span>
                }
                name="grade">
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

              <Form.Item
                label={
                  <span className={styles.fieldLabel}>
                    <TeamOutlined />
                    Специализация
                  </span>
                }
                name="specialization">
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
            <h2>
              <StarOutlined />
              Навыки
            </h2>

            <div className={styles.skills}>
              {PROFILE_SKILLS.map(skill => (
                <div className={styles.skill} key={skill.name}>
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
            <h2>
              <EditOutlined />
              О себе
            </h2>

            <Form.Item name="about">
              <TextArea placeholder="Расскажите о себе..." rows={4} />
            </Form.Item>
          </section>

          <section className={styles.section}>
            <h2>
              <BarChartOutlined />
              Статистика
            </h2>

            <div className={styles.statistics}>
              {statistics.map(item => (
                <div className={styles.statistic} key={item.title}>
                  <Statistic title={item.title} value={item.value} />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2>
              <LinkOutlined />
              Личные ссылки
            </h2>

            <Form.List name="links">
              {(fields, { add, remove }) => (
                <div className={styles.linksBlock}>
                  <div className={styles.links}>
                    {fields.map((field, index) => (
                      <div className={styles.linkRow} key={field.key}>
                        <Form.Item
                          name={field.name}
                          rules={[
                            {
                              required: true,
                              message: 'Введите адрес сайта',
                            },
                          ]}>
                          <Input placeholder="example.com" />
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
                </div>
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
        </div>

        <aside className={styles.tips}>
          <h2>Подсказки</h2>

          <h3>Рекомендации по профилю</h3>

          <p>Заполните все поля профиля, чтобы получить максимальную пользу от платформы.</p>

          <ul>
            <li>Укажите реальные навыки для получения персонализированных рекомендаций.</li>
          </ul>

          <h3>Повышение уровня</h3>

          <p>Чтобы повысить уровень, вам необходимо решать задачи. За каждую решённую задачу вы получаете баллы:</p>

          <dl className={styles.scores}>
            <div>
              <dt>Простые задачи:</dt>
              <dd>1 балл</dd>
            </div>

            <div>
              <dt>Средние задачи:</dt>
              <dd>3 балла</dd>
            </div>

            <div>
              <dt>Сложные задачи:</dt>
              <dd>5 баллов</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Form>
  )
}
