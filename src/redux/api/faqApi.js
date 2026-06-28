import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query({
      query: (params) => ({
        url: "/faq/find_by_all_faq",
        method: "GET",
        params,
      }),
      providesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: ({ _id }) => ({
        url: `/faq/delete_faq/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create_faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    getSpecificFaq: builder.query({
      query: (id) => ({
        url: `/faq/specificFAQ/${id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/update_faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetSpecificFaqQuery,
  useUpdateFaqMutation,
} = faqApi;

export default faqApi;
