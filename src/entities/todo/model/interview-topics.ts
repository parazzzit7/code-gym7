export type InterviewTopic = {
  title: string
  description: string
  category: string
}

const INTERVIEW_TOPICS: Record<number, InterviewTopic> = {
  1: {
    title: 'SSR в Next.js',
    description: 'Что такое серверный рендеринг и когда его стоит использовать.',
    category: 'Next.js',
  },
  2: {
    title: 'CSR, SSR, SSG и ISR',
    description: 'Чем отличаются основные способы рендеринга веб-страниц.',
    category: 'Next.js',
  },
  3: {
    title: 'App Router',
    description: 'Как устроена маршрутизация в современных приложениях Next.js.',
    category: 'Next.js',
  },
  4: {
    title: 'Server и Client Components',
    description: 'Разница между серверными и клиентскими React-компонентами.',
    category: 'React',
  },
  5: {
    title: 'Жизненный цикл компонента',
    description: 'Как React создаёт, обновляет и удаляет компоненты.',
    category: 'React',
  },
  6: {
    title: 'Props и State',
    description: 'Чем свойства компонента отличаются от его внутреннего состояния.',
    category: 'React',
  },
  7: {
    title: 'Хуки useState и useEffect',
    description: 'Как хранить состояние и выполнять побочные эффекты.',
    category: 'React',
  },
  8: {
    title: 'Управляемые формы',
    description: 'Как React управляет значениями инпутов и отправкой формы.',
    category: 'React',
  },
  9: {
    title: 'Redux Toolkit',
    description: 'Для чего нужен глобальный стор и как с ним работать.',
    category: 'Redux',
  },
  10: {
    title: 'RTK Query',
    description: 'Получение, кеширование и обновление серверных данных.',
    category: 'Redux',
  },
  11: {
    title: 'Типы и интерфейсы',
    description: 'Разница между type и interface в TypeScript.',
    category: 'TypeScript',
  },
  12: {
    title: 'Event Loop',
    description: 'Как JavaScript выполняет синхронный и асинхронный код.',
    category: 'JavaScript',
  },
  13: {
    title: 'Promise и async/await',
    description: 'Как выполнять асинхронные операции и обрабатывать ошибки.',
    category: 'JavaScript',
  },
  14: {
    title: 'Замыкания',
    description: 'Как функция сохраняет доступ к внешней области видимости.',
    category: 'JavaScript',
  },
  15: {
    title: 'HTTP и REST API',
    description: 'Методы запросов, коды ответа и устройство REST API.',
    category: 'Web',
  },
  16: {
    title: 'CORS',
    description: 'Почему браузер блокирует некоторые запросы между доменами.',
    category: 'Web',
  },
  17: {
    title: 'Flexbox и Grid',
    description: 'Когда использовать одномерную и двумерную CSS-раскладку.',
    category: 'CSS',
  },
  18: {
    title: 'Семантическая вёрстка',
    description: 'Как HTML-семантика влияет на доступность и поисковую выдачу.',
    category: 'HTML',
  },
  19: {
    title: 'Ветки и Pull Request',
    description: 'Как организовать разработку новой функциональности в Git.',
    category: 'Git',
  },
  20: {
    title: 'Архитектура FSD',
    description: 'Как разделять приложение на слои, слайсы и сегменты.',
    category: 'Архитектура',
  },
}

export function getInterviewTopic(todoId: number): InterviewTopic {
  return (
    INTERVIEW_TOPICS[todoId] ?? {
      title: `Тема №${todoId}`,
      description: 'Вопрос для подготовки к техническому собеседованию.',
      category: 'Разработка',
    }
  )
}
