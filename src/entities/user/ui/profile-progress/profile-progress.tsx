import { Card, Col, Input, Progress, Row, Select, Statistic, Typography } from 'antd'

import { PROFILE_SKILLS, PROFILE_STATISTICS } from '../../model/profile.constants'

import styles from './profile-progress.module.scss'

const { Paragraph, Title } = Typography
const { TextArea } = Input

export function ProfileProgress() {
  return (
    <Card className={styles.card}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Title level={4}>Мой уровень</Title>

          <Paragraph type="secondary">Текущий прогресс обучения</Paragraph>
        </div>

        <Progress percent={65} strokeColor="#1677ff" />
      </section>

      <section className={styles.section}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <label className={styles.label}>Грейд</label>

            <Select
              className={styles.control}
              defaultValue="junior"
              options={[
                {
                  value: 'junior',
                  label: 'Junior',
                },
                {
                  value: 'middle',
                  label: 'Middle',
                },
                {
                  value: 'senior',
                  label: 'Senior',
                },
              ]}
            />
          </Col>

          <Col xs={24} md={12}>
            <label className={styles.label}>Специализация</label>

            <Select
              className={styles.control}
              defaultValue="frontend"
              options={[
                {
                  value: 'frontend',
                  label: 'Frontend-разработчик',
                },
                {
                  value: 'backend',
                  label: 'Backend-разработчик',
                },
                {
                  value: 'fullstack',
                  label: 'Fullstack-разработчик',
                },
              ]}
            />
          </Col>
        </Row>
      </section>

      <section className={styles.section}>
        <Title level={4}>Навыки</Title>

        <div className={styles.skills}>
          {PROFILE_SKILLS.map(skill => (
            <div className={styles.skill} key={skill.name}>
              <div className={styles.skillHeader}>
                <span>{skill.name}</span>
                <span>{skill.percent}%</span>
              </div>

              <Progress percent={skill.percent} showInfo={false} size="small" />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Title level={4}>О себе</Title>

        <TextArea
          rows={4}
          defaultValue="Изучаю frontend-разработку и готовлюсь к техническим собеседованиям."
          placeholder="Расскажи немного о себе"
        />
      </section>

      <section className={styles.section}>
        <Title level={4}>Статистика</Title>

        <Row gutter={[12, 12]}>
          {PROFILE_STATISTICS.map(item => (
            <Col xs={24} sm={8} key={item.title}>
              <Card size="small">
                <Statistic title={item.title} value={item.value} />
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Card>
  )
}
