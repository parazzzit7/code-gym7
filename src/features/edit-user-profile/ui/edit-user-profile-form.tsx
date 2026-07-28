'use client'

import { useState } from 'react'
import { Alert, Button, Card, Form, Input } from 'antd'

import { useUpdateUserMutation, type User } from '@/entities/user'

import styles from './edit-user-profile-form.module.scss'

type EditUserProfileFormProps = {
  user: User
}

type ProfileFormValues = {
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export function EditUserProfileForm({ user }: EditUserProfileFormProps) {
  const [isSaved, setIsSaved] = useState(false)

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation()

  const handleSubmit = async (values: ProfileFormValues) => {
    setIsSaved(false)

    try {
      await updateUser({
        id: user.id,
        changes: values,
      }).unwrap()

      setIsSaved(true)
    } catch {
      setIsSaved(false)
    }
  }

  return (
    <Card title="Редактирование профиля">
      <Form<ProfileFormValues>
        layout="vertical"
        initialValues={{
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
        }}
        onFinish={handleSubmit}>
        <div className={styles.grid}>
          <Form.Item
            label="Имя"
            name="name"
            rules={[
              {
                required: true,
                message: 'Введите имя',
              },
            ]}>
            <Input placeholder="Имя пользователя" />
          </Form.Item>

          <Form.Item
            label="Telegram"
            name="username"
            rules={[
              {
                required: true,
                message: 'Введите username',
              },
            ]}>
            <Input addonBefore="@" />
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

          <Form.Item label="Телефон" name="phone">
            <Input />
          </Form.Item>

          <Form.Item className={styles.fullWidth} label="Полезная ссылка" name="website">
            <Input addonBefore="https://" />
          </Form.Item>
        </div>

        {isError && <Alert className={styles.message} type="error" message="Не удалось сохранить изменения" />}

        {isSaved && <Alert className={styles.message} type="success" message="Изменения сохранены в Redux Store" />}

        <Button htmlType="submit" loading={isLoading} type="primary">
          Сохранить
        </Button>
      </Form>
    </Card>
  )
}
