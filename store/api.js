import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser, updateAccessToken } from "./user-slice";

const BASE_URL = "http://192.168.160.114:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const userState = getState().user;

    if (userState?.userData?.accessToken) {
      const { accessToken } = userState.userData;
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data?.accessToken) {
      api.dispatch(
        updateAccessToken({ accessToken: refreshResult.data.accessToken })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    authenticateUser: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: "/auth",
          method: "POST",
          body: JSON.stringify({ email, password }),
        };
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    registerUser: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      }),
    }),

    getUserProfile: builder.query({
      query: () => "/user/profile",
    }),

    updateUserProfile: builder.mutation({
      query: (update) => ({
        url: "/user/profile",
        method: "PUT",
        body: JSON.stringify(update),
      }),
    }),
  }),
});

export const {
  useAuthenticateUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,

  useGetUserProfileQuery,

  useUpdateUserProfileMutation,
} = api;
