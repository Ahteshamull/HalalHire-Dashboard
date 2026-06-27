"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateSubscriptionPricingMutation } from "@/redux/api/subscriptionApi";
import Swal from "sweetalert2";

interface ManageSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionData: any;
}

export function ManageSubscriptionModal({
  isOpen,
  onClose,
  subscriptionData,
}: ManageSubscriptionModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState("PREMIUM");
  const [monthly, setMonthly] = useState<number>(0);
  const [quarterly, setQuarterly] = useState<number>(0);
  const [yearly, setYearly] = useState<number>(0);

  const [updatePricing, { isLoading }] = useUpdateSubscriptionPricingMutation();

  useEffect(() => {
    if (subscriptionData && isOpen) {
      let planData;
      if (selectedPlanId === "FREE") planData = subscriptionData.userPlans?.free;
      else if (selectedPlanId === "PREMIUM") planData = subscriptionData.userPlans?.premium;
      else if (selectedPlanId === "BUSINESS") planData = subscriptionData.companyPlans?.business;
      else if (selectedPlanId === "BUSINESS_PLUS") planData = subscriptionData.companyPlans?.businessPlus;

      if (planData && planData.price) {
        setMonthly(planData.price.monthly || 0);
        setQuarterly(planData.price.quarterly || 0);
        setYearly(planData.price.yearly || 0);
      }
    }
  }, [subscriptionData, selectedPlanId, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const payload = {
        planId: selectedPlanId,
        monthly: Number(monthly),
        quarterly: Number(quarterly),
        yearly: Number(yearly),
      };

      const res = await updatePricing(payload).unwrap();
      if (res.success) {
        Swal.fire("Success", "Pricing updated successfully!", "success");
        onClose();
      } else {
        Swal.fire("Error", res.message || "Failed to update pricing", "error");
      }
    } catch (error: any) {
      Swal.fire("Error", error?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="dark:bg-sidebar w-full max-w-md overflow-hidden rounded-lg border border-[#E2E8F0] bg-white shadow-lg dark:border-[#F4B057]">
        <div className="dark:bg-sidebar flex items-center justify-between border-b border-[#E2E8F0] bg-white p-4 dark:border-[#F4B057]/30">
          <h2 className="text-lg font-semibold text-[#0D2357] dark:text-white">
            Update Pricing
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#0D2357] transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-[#F4B057]/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
              Select Plan
            </label>
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
            >
              <option value="FREE">Free Plan</option>
              <option value="PREMIUM">Premium Plan</option>
              <option value="BUSINESS">Business Plan</option>
              <option value="BUSINESS_PLUS">Business Plus Plan</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
              Monthly Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              disabled={selectedPlanId === "FREE"}
              className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
              Quarterly Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={quarterly}
              onChange={(e) => setQuarterly(Number(e.target.value))}
              disabled={selectedPlanId === "FREE"}
              className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
              Yearly Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={yearly}
              onChange={(e) => setYearly(Number(e.target.value))}
              disabled={selectedPlanId === "FREE"}
              className="dark:bg-sidebar w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white disabled:opacity-50"
            />
          </div>
        </div>

        <div className="dark:bg-sidebar flex justify-end gap-3 border-t border-[#E2E8F0] bg-white p-4 dark:border-[#F4B057]/30">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="dark:bg-sidebar rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0D2357] transition-colors hover:bg-gray-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="rounded-lg border border-[#F4B057] bg-[#F4B057] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#F4B057]/90 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
