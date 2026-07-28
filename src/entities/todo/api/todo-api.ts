import { baseApi } from "@/shared/api";

import type { Todo, UpdateTodoRequest } from "../model/todo.types";

const todoApiWithQueries = baseApi.injectEndpoints({
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
  }),
});

const todoApi = todoApiWithQueries.injectEndpoints({
  endpoints: (builder) => ({
    updateTodo: builder.mutation<Todo, UpdateTodoRequest>({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: {
          completed,
        },
      }),

      async onQueryStarted(
        { id, userId, completed },
        { dispatch, queryFulfilled },
      ) {
        const userTodosPatch = dispatch(
          todoApiWithQueries.util.updateQueryData(
            "getTodosByUserId",
            userId,
            (todos) => {
              const todo = todos.find((item) => item.id === id);

              if (todo) {
                todo.completed = completed;
              }
            },
          ),
        );

        const todoDetailsPatch = dispatch(
          todoApiWithQueries.util.updateQueryData(
            "getTodoById",
            id,
            (todo) => {
              todo.completed = completed;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          userTodosPatch.undo();
          todoDetailsPatch.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodosByUserIdQuery,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} = todoApi;