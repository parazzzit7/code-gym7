import { baseApi } from "@/shared/api";
import type { User } from "../model/user.types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, number>({
      query: (userId) => `/users/${userId}`,

      providesTags: (_result, _error, userId) => [
        { type: "User", id: userId },
      ],
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;