import { QuestionsList } from '@/widgets/questions-list'

import styles from './questions-page.module.scss'

export default function QuestionsPage() {
  return (
    <div className={styles.page}>
      <header>
        <h1>Вопросы с собесов</h1>

        <p>Выбери вопрос и перейди к подробной теме.</p>
      </header>

      <QuestionsList />
    </div>
  )
}
