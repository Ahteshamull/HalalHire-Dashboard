import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "/setting/find_by_privacy_policys",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    createPrivacy: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/privacy_policys",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    createAboutUs: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/about",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/setting/find_by_about_us",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    createCookiePolicy: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/cookie_policy",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    getCookiePolicy: builder.query({
      query: () => ({
        url: "/setting/find_by_cookie_policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    createAccessibility: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/accessibility",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    createImprint: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/imprint",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    getAccessibility: builder.query({
      query: () => ({
        url: "/setting/find_by_accessibility",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    getImprint: builder.query({
      query: () => ({
        url: "/setting/find_by_imprints",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
  }),
});

export const {
  useGetPrivacyQuery,
  useCreatePrivacyMutation,
  useCreateAboutUsMutation,
  useGetAboutUsQuery,
  useCreateCookiePolicyMutation,
  useGetCookiePolicyQuery,
  useCreateAccessibilityMutation,
  useGetAccessibilityQuery,
  useCreateImprintMutation,
  useGetImprintQuery,
} = privacyApi;
