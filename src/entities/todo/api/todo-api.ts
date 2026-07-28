import { baseApi } from "@/shared/api";

import type { Todo, UpdateTodoRequest } from "../model/todo.types";

const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",

      providesTags: (result) =>
        result
          ? [
              ...result.map((todo) => ({
                type: "Todo" as const,
                id: todo.id,
              })),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),

    getTodosByUserId: builder.query<Todo[], number>({
      query: (userId) => ({
        url: "/todos",
        params: {
          userId,
        },
      }),

      providesTags: (result) =>
        result
          ? result.map((todo) => ({
              type: "Todo" as const,
              id: todo.id,
            }))
          : [],
    }),

    getTodoById: builder.query<Todo, number>({
      query: (todoId) => `/todos/${todoId}`,

      providesTags: (_result, _error, todoId) => [
        { type: "Todo", id: todoId },
      ],
    }),

    updateTodo: builder.mutation<Todo, UpdateTodoRequest>({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: {
          completed,
        },
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "Todo", id },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodosByUserIdQuery,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} = todoApi;