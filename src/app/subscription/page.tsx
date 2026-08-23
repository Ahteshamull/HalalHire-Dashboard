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

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 pb-10 md:grid-cols-2 xl:grid-cols-4">
        {/* Free Plan */}
        {userPlans.free && (
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-sidebar">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#F4B057]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10 mb-6">
              <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4">USER PLAN</div>
              <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{userPlans.free.name}</h2>
              <div className="mt-4 mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#0D2357] dark:text-white">
                  ${userPlans.free.price?.monthly || 0}
                </span>
                <span className="text-sm font-medium text-[#0D2357]/70 dark:text-white/70">/ month</span>
              </div>
              <div className="mb-6 h-px w-full bg-border/60"></div>
              <ul className="space-y-4">
                {userPlans.free.features?.map((feature: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs font-medium text-[#0D2357]/80 dark:text-white/80">{feature.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Premium Plan */}
        {userPlans.premium && (
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-[#F4B057] bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F4B057]/20 dark:bg-sidebar">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F4B057]/10 via-transparent to-[#F4B057]/5 opacity-50 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute -right-12 top-6 rotate-45 bg-[#F4B057] px-12 py-1 text-[10px] font-bold text-white shadow-md">
              POPULAR
            </div>
            <div className="relative z-10 mb-6">
              <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4">USER PLAN</div>
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-[#F4B057] animate-pulse" />
                <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{userPlans.premium.name}</h2>
              </div>
              <div className="mt-4 mb-4 flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[#0D2357] dark:text-white">
                    ${userPlans.premium.price?.monthly || 0}
                  </span>
                  <span className="text-sm font-medium text-[#0D2357]/70 dark:text-white/70">/ month</span>
                </div>
                <div className="inline-flex max-w-fit rounded-md bg-muted/50 px-2 py-1 text-[10px] font-semibold text-[#0D2357]/70 dark:text-white/70">
                  Quarterly: ${userPlans.premium.price?.quarterly || 0} • Yearly: ${userPlans.premium.price?.yearly || 0}
                </div>
              </div>
              <div className="mb-6 h-px w-full bg-border/60"></div>
              <ul className="space-y-4">
                {userPlans.premium.features?.map((feature: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F4B057]/20">
                      <Check className="h-3 w-3 text-[#F4B057]" />
                    </div>
                    <span className="text-xs font-medium text-[#0D2357]/80 dark:text-white/80">{feature.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Business Plan */}
        {companyPlans.business && (
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-sidebar">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#F4B057]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10 mb-6">
              <div className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 mb-4">COMPANY PLAN</div>
              <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{companyPlans.business.name}</h2>
              <div className="mt-4 mb-4 flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[#0D2357] dark:text-white">
                    ${companyPlans.business.price?.monthly || 0}
                  </span>
                  <span className="text-sm font-medium text-[#0D2357]/70 dark:text-white/70">/ month</span>
                </div>
                <div className="inline-flex max-w-fit rounded-md bg-muted/50 px-2 py-1 text-[10px] font-semibold text-[#0D2357]/70 dark:text-white/70">
                  Quarterly: ${companyPlans.business.price?.quarterly || 0} • Yearly: ${companyPlans.business.price?.yearly || 0}
                </div>
              </div>
              <div className="mb-6 h-px w-full bg-border/60"></div>
              <ul className="space-y-4">
                {companyPlans.business.features?.map((feature: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs font-medium text-[#0D2357]/80 dark:text-white/80">{feature.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Business Plus Plan */}
        {companyPlans.businessPlus && (
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-[#F4B057] bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F4B057]/20 dark:bg-sidebar">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F4B057]/10 via-transparent to-[#F4B057]/5 opacity-50 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute -right-10 top-6 rotate-45 bg-gradient-to-r from-[#F4B057] to-[#F4B057]/80 px-12 py-1 text-[10px] font-bold text-white shadow-md">
              BEST VALUE
            </div>
            <div className="relative z-10 mb-6">
              <div className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 mb-4">COMPANY PLAN</div>
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-[#F4B057] animate-pulse" />
                <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{companyPlans.businessPlus.name}</h2>
              </div>
              <div className="mt-4 mb-4 flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[#0D2357] dark:text-white">
                    ${companyPlans.businessPlus.price?.monthly || 0}
                  </span>
                  <span className="text-sm font-medium text-[#0D2357]/70 dark:text-white/70">/ month</span>
                </div>
                <div className="inline-flex max-w-fit rounded-md bg-[#F4B057]/10 px-2 py-1 text-[10px] font-semibold text-[#F4B057]">
                  Quarterly: ${companyPlans.businessPlus.price?.quarterly || 0} • Yearly: ${companyPlans.businessPlus.price?.yearly || 0}
                </div>
              </div>
              <div className="mb-6 h-px w-full bg-border/60"></div>
              <ul className="space-y-4">
                {companyPlans.businessPlus.features?.map((feature: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F4B057]/20">
                      <Check className="h-3 w-3 text-[#F4B057]" />
                    </div>
                    <span className="text-xs font-medium text-[#0D2357]/80 dark:text-white/80">{feature.title}</span>
                  </li>
                ))}
              </ul>
            </div>
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
