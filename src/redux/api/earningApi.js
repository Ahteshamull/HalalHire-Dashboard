import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: ({ year, page }) => ({
        url: "payment/get-all-payment",
        method: "GET",
        params: {
          year,
          page,
        },
      }),
      providesTags: ["earning"],
    }),
    getAllPayments: builder.query({
      query: (params) => ({
        url: "payment_gateway/find_by_all_payment",
        method: "GET",
        params,
      }),
      providesTags: ["earning"],
    }),
    getPaymentStats: builder.query({
      query: () => ({
        url: "payment_gateway/find_by_avg_information",
        method: "GET",
      }),
      providesTags: ["earning"],
    }),
  }),
});

export const { useGetEarningQuery, useGetAllPaymentsQuery, useGetPaymentStatsQuery } = earningApi;

export default earningApi;
