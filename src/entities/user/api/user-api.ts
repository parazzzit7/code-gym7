import { baseApi } from '@/shared/api'

import type { UpdateUserRequest, User } from '../model/user.types'

type JsonPlaceholderUser = Omit<User, 'grade' | 'specialization' | 'about' | 'links'>

const userApiWithQueries = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query<User, number>({
      query: userId => `/users/${userId}`,

      transformResponse: (user: JsonPlaceholderUser): User => ({
        ...user,
        grade: 'junior',
        specialization: 'frontend',
        about: 'Изучаю frontend-разработку и готовлюсь к техническим собеседованиям.',
        links: [user.website],
      }),

      providesTags: (_result, _error, userId) => [
        {
          type: 'User',
          id: userId,
        },
      ],
    }),
  }),
})

const userApi = userApiWithQueries.injectEndpoints({
  endpoints: builder => ({
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, changes }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: changes,
      }),

      async onQueryStarted({ id, changes }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          userApiWithQueries.util.updateQueryData('getUserById', id, user => {
            Object.assign(user, changes)
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
    }),
  }),
})

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi
