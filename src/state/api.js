import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjc3NzI1MTE3LCJleHAiOjE2NzgzMjk5MTd9.GuNzQiZWVuNkhfvw7pWzfNzJekeYSO6Dg29AXyAHj4OZjApfxDVBQbR1MrkV7lxFZKFSjNxDG75GyU-SC351QA`,
  },
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8084/api" }),
  reducerPath: "orderApi",
  tagTypes: ["Order"],
  endpoints: (build) => ({
    getOrder: build.query({
      query: () => {
        return {
          url: "/orders",
          method: "GET",
          headers: config.headers,
        };
      },
      providesTags: ["Order"],
    }),
    updateOrder: build.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "PUT",
        headers: config.headers,
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});
export const { useGetOrderQuery, useUpdateOrderMutation } = api;
