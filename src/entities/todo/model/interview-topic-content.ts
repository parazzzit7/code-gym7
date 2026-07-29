export type InterviewTopicContent = {
  definition: string
  example: string
  keyPoints: string[]
}

const TOPIC_CONTENT: Record<number, InterviewTopicContent> = {
  1: {
    definition:
      'SSR — это серверный рендеринг. HTML страницы формируется на сервере для каждого запроса, после чего браузер получает уже готовую разметку.',
    example: `export default async function Page() {
  const response = await fetch('https://api.example.com/posts')
  const posts = await response.json()

  return <PostList posts={posts} />
}`,
    keyPoints: [
      'Пользователь быстрее видит готовый контент.',
      'Поисковые системы получают заполненный HTML.',
      'Сервер выполняет работу при каждом запросе.',
    ],
  },
  2: {
    definition:
      'CSR, SSR, SSG и ISR — разные способы создания HTML. Они отличаются местом и моментом, в котором формируется страница.',
    example: `// CSR — страница создаётся в браузере
// SSR — на сервере при каждом запросе
// SSG — во время сборки проекта
// ISR — статическая страница обновляется через интервал`,
    keyPoints: [
      'CSR подходит для интерактивных кабинетов.',
      'SSR полезен для динамических SEO-страниц.',
      'SSG и ISR подходят для контента, который меняется нечасто.',
    ],
  },
  3: {
    definition:
      'App Router — система маршрутизации Next.js, основанная на папке app. Папки образуют адреса страниц, а файл page.tsx создаёт страницу.',
    example: `src/app/
  page.tsx
  profile/
    page.tsx
  questions/
    page.tsx
    [id]/
      page.tsx`,
    keyPoints: [
      'page.tsx создаёт страницу.',
      'layout.tsx создаёт общий интерфейс.',
      'Папка [id] используется для динамического параметра.',
    ],
  },
  4: {
    definition:
      'Server Components выполняются на сервере. Client Components работают в браузере и нужны для состояния, событий и браузерных API.',
    example: `'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`,
    keyPoints: [
      'Компоненты Next.js по умолчанию серверные.',
      'Клиентский компонент начинается с директивы use client.',
      'useState и обработчики событий работают в клиентских компонентах.',
    ],
  },
  5: {
    definition:
      'Жизненный цикл описывает создание, обновление и удаление компонента. В функциональных компонентах эта логика обычно реализуется через useEffect.',
    example: `useEffect(() => {
  console.log('Компонент появился')

  return () => {
    console.log('Компонент удаляется')
  }
}, [])`,
    keyPoints: [
      'Mount — компонент добавлен на страницу.',
      'Update — свойства или состояние изменились.',
      'Unmount — компонент удаляется со страницы.',
    ],
  },
  6: {
    definition:
      'Props передаются компоненту снаружи и доступны только для чтения. State хранится внутри компонента и может изменяться.',
    example: `type GreetingProps = {
  name: string
}

function Greeting({ name }: GreetingProps) {
  const [visible, setVisible] = useState(true)

  return visible ? <p>Привет, {name}</p> : null
}`,
    keyPoints: [
      'Props передаёт родительский компонент.',
      'State принадлежит конкретному компоненту.',
      'Изменение state вызывает повторный рендер.',
    ],
  },
  7: {
    definition:
      'useState хранит состояние компонента. useEffect выполняет побочные эффекты: запросы, подписки, таймеры и работу с внешними системами.',
    example: `const [user, setUser] = useState(null)

useEffect(() => {
  fetch('/api/user')
    .then(response => response.json())
    .then(setUser)
}, [])`,
    keyPoints: [
      'useState возвращает значение и функцию изменения.',
      'useEffect запускается после рендера.',
      'Массив зависимостей управляет повторными запусками эффекта.',
    ],
  },
  8: {
    definition:
      'В управляемой форме значение поля хранится в состоянии React. Компонент сам обновляет значение через обработчик onChange.',
    example: `const [name, setName] = useState('')

<input
  value={name}
  onChange={event => setName(event.target.value)}
/>`,
    keyPoints: [
      'value берётся из состояния.',
      'onChange изменяет состояние.',
      'Данные формы всегда доступны внутри компонента.',
    ],
  },
  9: {
    definition:
      'Redux Toolkit — официальный набор инструментов для работы с Redux. Он упрощает создание стора, редьюсеров и действий.',
    example: `const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1
    },
  },
})`,
    keyPoints: [
      'configureStore создаёт Redux store.',
      'createSlice объединяет actions и reducer.',
      'useSelector читает данные, useDispatch изменяет их.',
    ],
  },
  10: {
    definition:
      'RTK Query — часть Redux Toolkit для запросов к API. Она кеширует ответы и предоставляет состояния загрузки и ошибки.',
    example: `export const todoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
    }),
  }),
})`,
    keyPoints: [
      'query используется для получения данных.',
      'mutation используется для изменения данных.',
      'Результаты запросов сохраняются в Redux store.',
    ],
  },
  11: {
    definition:
      'type и interface описывают форму данных в TypeScript. Interface удобен для объектов, а type также умеет создавать объединения.',
    example: `interface User {
  id: number
  name: string
}

type Status = 'loading' | 'success' | 'error'`,
    keyPoints: [
      'Оба варианта описывают объекты.',
      'Interface можно расширять через extends.',
      'Type поддерживает union и intersection.',
    ],
  },
  12: {
    definition:
      'Event Loop управляет выполнением асинхронного кода JavaScript. Сначала выполняется синхронный код, затем микрозадачи и другие задачи.',
    example: `console.log('Первый')

Promise.resolve().then(() => console.log('Третий'))

console.log('Второй')`,
    keyPoints: [
      'Синхронный код выполняется первым.',
      'Promise попадает в очередь микрозадач.',
      'Event Loop проверяет, свободен ли стек вызовов.',
    ],
  },
  13: {
    definition:
      'Promise представляет результат асинхронной операции. async/await позволяет работать с Promise в более читаемом виде.',
    example: `async function loadUser() {
  try {
    const response = await fetch('/api/user')
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}`,
    keyPoints: [
      'Promise может быть pending, fulfilled или rejected.',
      'await ожидает выполнение Promise.',
      'Ошибки обрабатываются через try/catch.',
    ],
  },
  14: {
    definition:
      'Замыкание возникает, когда функция сохраняет доступ к переменным из внешней области видимости после завершения внешней функции.',
    example: `function createCounter() {
  let count = 0

  return () => {
    count += 1
    return count
  }
}

const counter = createCounter()`,
    keyPoints: [
      'Внутренняя функция запоминает внешние переменные.',
      'Замыкания помогают скрывать данные.',
      'Они используются в обработчиках и React-хуках.',
    ],
  },
  15: {
    definition:
      'HTTP — протокол обмена данными. REST API представляет данные как ресурсы и использует стандартные HTTP-методы.',
    example: `GET /todos
GET /todos/1
POST /todos
PATCH /todos/1
DELETE /todos/1`,
    keyPoints: ['GET получает данные.', 'POST создаёт ресурс.', 'PATCH обновляет часть ресурса, DELETE удаляет его.'],
  },
  16: {
    definition:
      'CORS — механизм безопасности браузера. Сервер должен явно разрешить запросы, которые приходят с другого домена.',
    example: `Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PATCH`,
    keyPoints: [
      'CORS проверяется браузером.',
      'Разрешения задаются заголовками ответа.',
      'Некоторые запросы сначала выполняют preflight-запрос OPTIONS.',
    ],
  },
  17: {
    definition:
      'Flexbox используется для расположения элементов в одном направлении. Grid удобен для строк и колонок одновременно.',
    example: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
    keyPoints: [
      'Flexbox хорошо подходит для меню и отдельных рядов.',
      'Grid подходит для сеток карточек.',
      'Обе технологии поддерживают адаптивную вёрстку.',
    ],
  },
  18: {
    definition:
      'Семантическая вёрстка использует HTML-теги по их назначению. Это улучшает доступность, структуру страницы и SEO.',
    example: `<header>Шапка</header>
<main>
  <article>Основной материал</article>
</main>
<footer>Подвал</footer>`,
    keyPoints: [
      'button нужно использовать для действий.',
      'nav обозначает навигацию.',
      'main содержит основной контент страницы.',
    ],
  },
  19: {
    definition:
      'Git-ветка позволяет разрабатывать новую функцию отдельно. Pull Request используется для проверки и объединения изменений.',
    example: `git switch -c feature/profile
git add .
git commit -m "Добавил страницу профиля"
git push -u origin feature/profile`,
    keyPoints: [
      'main обычно содержит стабильный код.',
      'Новая задача выполняется в отдельной ветке.',
      'Pull Request показывает все изменения перед объединением.',
    ],
  },
  20: {
    definition:
      'Feature-Sliced Design разделяет приложение по ответственности. Основные слои: app, pages, widgets, features, entities и shared.',
    example: `src/
  app/
  widgets/
  features/
  entities/
  shared/`,
    keyPoints: [
      'Entities содержат бизнес-сущности.',
      'Features содержат пользовательские действия.',
      'Widgets собирают сущности и функции в крупные блоки.',
    ],
  },
}

export function getInterviewTopicContent(todoId: number): InterviewTopicContent {
  return (
    TOPIC_CONTENT[todoId] ?? {
      definition: 'Материал для подготовки к техническому собеседованию.',
      example: '// Добавь практический пример',
      keyPoints: ['Изучи определение.', 'Подготовь пример.', 'Повтори тему.'],
    }
  )
}
