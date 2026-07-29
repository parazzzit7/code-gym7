import { notFound } from 'next/navigation'

import { QuestionDetails } from '@/widgets/question-details'

type QuestionPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { id } = await params
  const todoId = Number(id)

  if (!Number.isInteger(todoId) || todoId <= 0) {
    notFound()
  }

  return <QuestionDetails todoId={todoId} />
}
