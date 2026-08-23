import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (params) => ({
        url: "/user/create_new_admin",
        method: "POST",
        body: params, // Use body for POST requests
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, formData }) => ({
        url: "/auth/update_my_profile",
        method: "PATCH",
        params: userId ? { userId } : {}, 
        body: formData, 
      }),
      invalidatesTags: ["user"],
    }),
    blockUserStatus: builder.mutation({
      query: (data) => ({
        url: `/auth/change_status/${data.userId}`,
        method: "PATCH",
        body: { status: data.status },
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/auth/delete_account/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useUpdateUserMutation,
  useBlockUserStatusMutation,
  useDeleteUserMutation,
} = adminApi;
