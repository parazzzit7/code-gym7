import { QuestionsList } from '@/widgets/questions-list'

export default function QuestionsPage() {
  return (
    <>
      <h1>Вопросы с собесов</h1>

      <p>Выбери тему, чтобы открыть её подробное описание.</p>

      <QuestionsList />
    </>
  )
}
