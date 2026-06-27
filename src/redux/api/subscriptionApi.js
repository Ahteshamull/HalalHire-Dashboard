import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query({
      query: ({ role }) => ({
        url: "subscription/get-subscription-plan",
        method: "GET",
        params: { role },
      }),
      providesTags: ["subscription"],
    }),
    getSubscription: builder.query({
      query: () => ({
        url: "subscription/find_subscription",
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    updateSubscriptionPricing: builder.mutation({
      query: (data) => ({
        url: "subscription/update_subscription_pricing",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const { useGetSubscriptionPlansQuery, useGetSubscriptionQuery, useUpdateSubscriptionPricingMutation } = subscriptionApi;

export default subscriptionApi;
