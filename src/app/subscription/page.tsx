"use client";

import { Check, Crown, Settings } from "lucide-react";
import { useState } from "react";
import { useGetSubscriptionQuery } from "@/redux/api/subscriptionApi";
import { ManageSubscriptionModal } from "./ManageSubscriptionModal";

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: subResponse, isLoading, error } = useGetSubscriptionQuery({});

  const subscriptionData = subResponse?.data?.data?.[0] || subResponse?.data?.[0];
  const userPlans = subscriptionData?.userPlans;
  const companyPlans = subscriptionData?.companyPlans;

  if (isLoading) {
    return <div className="p-8 text-center text-[#0D2357] dark:text-white">Loading subscriptions...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load subscription plans.</div>;
  }

  if (!userPlans || !companyPlans) {
    return <div className="p-8 text-center text-[#0D2357] dark:text-white">No subscription data available.</div>;
  }

  return (
    <div className="m-2 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2357] dark:text-white">Subscription Plans</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#F4B057] bg-[#F4B057] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#F4B057]/90"
        >
          <Settings className="h-4 w-4" />
          Manage Pricing
        </button>
      </div>

      {/* User Plans Section */}
      <h2 className="mb-4 text-xl font-semibold text-[#0d2357] dark:text-white">User Plans</h2>
      <div className="mx-auto grid grid-cols-1 gap-6 pb-8 md:grid-cols-2">
        {/* Free Plan */}
        {userPlans.free && (
          <div className="dark:bg-sidebar rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-[#F4B057]">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{userPlans.free.name}</h2>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#0D2357] dark:text-white">
                  ${userPlans.free.price?.monthly || 0}
                </span>
                <span className="text-sm text-[#0D2357]/70 dark:text-white/70">/ month</span>
              </div>
            </div>
            <ul className="space-y-3">
              {userPlans.free.features?.map((feature: any, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-[#0D2357] dark:text-white">{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Premium Plan */}
        {userPlans.premium && (
          <div className="dark:bg-sidebar relative rounded-lg border-2 border-[#F4B057] bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-[#F4B057] px-3 py-1 text-xs font-medium text-white">
              <Crown className="h-3 w-3" />
              Popular
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{userPlans.premium.name}</h2>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#0D2357] dark:text-white">
                    ${userPlans.premium.price?.monthly || 0}
                  </span>
                  <span className="text-sm text-[#0D2357]/70 dark:text-white/70">/ month</span>
                </div>
                <div className="text-xs text-[#0D2357]/70 dark:text-white/70">
                  Quarterly: ${userPlans.premium.price?.quarterly || 0} | Yearly: ${userPlans.premium.price?.yearly || 0}
                </div>
              </div>
            </div>
            <ul className="space-y-3">
              {userPlans.premium.features?.map((feature: any, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-[#0D2357] dark:text-white">{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Company Plans Section */}
      <h2 className="mb-4 mt-6 text-xl font-semibold text-[#0d2357] dark:text-white">Company Plans</h2>
      <div className="mx-auto grid grid-cols-1 gap-6 pb-8 md:grid-cols-2">
        {/* Business Plan */}
        {companyPlans.business && (
          <div className="dark:bg-sidebar rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-[#F4B057]">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{companyPlans.business.name}</h2>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#0D2357] dark:text-white">
                    ${companyPlans.business.price?.monthly || 0}
                  </span>
                  <span className="text-sm text-[#0D2357]/70 dark:text-white/70">/ month</span>
                </div>
                <div className="text-xs text-[#0D2357]/70 dark:text-white/70">
                  Quarterly: ${companyPlans.business.price?.quarterly || 0} | Yearly: ${companyPlans.business.price?.yearly || 0}
                </div>
              </div>
            </div>
            <ul className="space-y-3">
              {companyPlans.business.features?.map((feature: any, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-[#0D2357] dark:text-white">{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Business Plus Plan */}
        {companyPlans.businessPlus && (
          <div className="dark:bg-sidebar relative rounded-lg border-2 border-[#F4B057] bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-[#F4B057] px-3 py-1 text-xs font-medium text-white">
              <Crown className="h-3 w-3" />
              Best Value
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{companyPlans.businessPlus.name}</h2>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#0D2357] dark:text-white">
                    ${companyPlans.businessPlus.price?.monthly || 0}
                  </span>
                  <span className="text-sm text-[#0D2357]/70 dark:text-white/70">/ month</span>
                </div>
                <div className="text-xs text-[#0D2357]/70 dark:text-white/70">
                  Quarterly: ${companyPlans.businessPlus.price?.quarterly || 0} | Yearly: ${companyPlans.businessPlus.price?.yearly || 0}
                </div>
              </div>
            </div>
            <ul className="space-y-3">
              {companyPlans.businessPlus.features?.map((feature: any, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-[#0D2357] dark:text-white">{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ManageSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subscriptionData={subscriptionData}
      />
    </div>
  );
};

export default Subscription;
