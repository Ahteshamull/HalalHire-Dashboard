"use client";

import { EarningChart } from "@/components/EarningChart";
import { CountingNumber } from "@/components/ui/CountingNumber";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useGetAllPaymentsQuery, useGetPaymentStatsQuery } from "@/redux/api/earningApi";

const Earnings = () => {
  // Fetch stats from API
  const { data: statsResponse } = useGetPaymentStatsQuery({});
  const stats = statsResponse?.data || { totalUser: 0, totalTransaction: 0, totalPayment: 0 };
  
  const totalRevenue = stats.totalPayment || 0;
  const totalTransaction = stats.totalTransaction || 0;
  const avgTransaction = totalTransaction > 0 ? totalRevenue / totalTransaction : 0;

  // Pagination and filter state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: response, isLoading, error } = useGetAllPaymentsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const allTransactions = response?.data?.data || [];
  const meta = response?.data?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };

  return (
    <div className="py-6">
      {/* stat */}
      <div
        className="dark:bg-sidebar mb-4 flex w-full flex-col items-center justify-center rounded-lg border border-[#E2E8F0] bg-white shadow-sm py-6 sm:flex-row sm:py-0 dark:border-[#F4B057]"
        style={{ minHeight: "110px" }}
      >
        <div className="flex flex-1 flex-col items-center justify-center px-2 py-4 sm:py-0">
          <p className="ipad:text-3xl mb-1 text-xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={avgTransaction}
              duration={1000}
              decimals={2}
              prefix="$"
              className="ipad:text-3xl text-xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-xs font-medium text-[#0D2357] lg:text-lg dark:text-white sm:text-sm">
            Average Transaction
          </span>
        </div>
        <div className="mx-4 h-16 w-px bg-[#F4B057] hidden sm:block" />
        <div className="my-2 h-px w-3/4 bg-[#F4B057]/30 block sm:hidden" />
        
        <div className="flex flex-1 flex-col items-center justify-center px-2 py-4 sm:py-0">
          <p className="ipad:text-3xl mb-1 text-xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={totalTransaction}
              duration={1000}
              decimals={0}
              className="ipad:text-3xl text-xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-xs font-medium text-[#0D2357] lg:text-lg dark:text-white sm:text-sm">
            Total Transactions
          </span>
        </div>
        <div className="mx-4 h-16 w-px bg-[#F4B057] hidden sm:block" />
        <div className="my-2 h-px w-3/4 bg-[#F4B057]/30 block sm:hidden" />

        <div className="flex flex-1 flex-col items-center justify-center px-2 py-4 sm:py-0">
          <p className="ipad:text-3xl mb-1 text-xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={totalRevenue}
              duration={1000}
              decimals={2}
              prefix="$"
              className="ipad:text-3xl text-xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-xs font-medium text-[#0D2357] lg:text-lg dark:text-white sm:text-sm">
            Total Revenue
          </span>
        </div>
      </div>

      {/* chart */}
      <div className="h-[350px] w-full sm:h-[400px]">
        <EarningChart />
      </div>

      {/* table  */}
      <h1 className="mt-12 mb-5 ml-2 text-2xl font-bold text-[#0D2357] dark:text-white">
        All Transactions
      </h1>

      <div className="dark:bg-sidebar rounded-lg border border-[#E2E8F0] bg-white shadow-sm dark:border-[#F4B057]">
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <h1 className="text-xl text-[#0D2357] dark:text-white">All transactions are here</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#F4B057]">
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Payable Name
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Date
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Description
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Type
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-[#0D2357] dark:text-white">
                    Amount
                  </th>
                  <th className="pb-3 text-center text-sm font-medium text-[#0D2357] dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#0D2357] dark:text-white">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                      <span className="mt-2 block">Loading transactions...</span>
                    </td>
                  </tr>
                ) : allTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#0D2357] dark:text-white">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  allTransactions.map((transaction: any) => (
                    <tr
                      key={transaction._id}
                      className="border-b border-[#E2E8F0] last:border-0 dark:border-[#F4B057]/30"
                    >
                      <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                        {transaction.payable_name || "-"}
                      </td>
                      <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                        {transaction.buyerId?.name || transaction.buyerId?.email || "Unknown User"}
                      </td>
                      <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                        {transaction.paymentmethod}
                      </td>
                      <td
                        className={`py-3 text-right text-sm font-medium ${
                          transaction.price < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        ${Math.abs(transaction.price).toLocaleString()}
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
                            transaction.payment_status === "paid" || transaction.payment_status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {transaction.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-[#E2E8F0] pt-4 sm:flex-row sm:items-center dark:border-[#F4B057]/30">
            <div className="text-sm text-[#0D2357] dark:text-white">
              Showing {meta.total > 0 ? (meta.page - 1) * meta.limit + 1 : 0} to{" "}
              {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}{" "}
              transactions
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="dark:bg-sidebar flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  disabled={isLoading}
                  className={`flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors ${
                    currentPage === page
                      ? "border-[#F4B057] bg-[#F4B057] text-white"
                      : "dark:bg-sidebar border-[#E2E8F0] bg-white text-[#0D2357] hover:bg-gray-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
                  } disabled:opacity-50`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, meta.totalPage))}
                disabled={currentPage === meta.totalPage || meta.totalPage === 0 || isLoading}
                className="dark:bg-sidebar flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
