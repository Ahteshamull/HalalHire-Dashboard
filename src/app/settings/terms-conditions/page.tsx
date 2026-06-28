"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/TiptapEditor";
import { useCreateTermsAndConditionsMutation, useGetTermsAndConditionsQuery } from "@/redux/api/termsApi";

export default function TermsConditionsPage() {
  const router = useRouter();
  const { data: termsData, isLoading: isFetching } = useGetTermsAndConditionsQuery({});
  const [createTermsAndConditions, { isLoading }] = useCreateTermsAndConditionsMutation();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (termsData?.data?.TermsConditions) {
      setContent(termsData.data.TermsConditions);
    }
  }, [termsData]);

  const handleSave = async () => {
    try {
      const response = await createTermsAndConditions({
        requestData: {
          TermsConditions: content,
        },
      }).unwrap();
      
      Swal.fire({
        title: "Success!",
        text: "Terms & Conditions saved successfully!",
        icon: "success",
        confirmButtonColor: "#0D2357", // Match primary color
      });
    } catch (err: any) {
      console.error("Save Terms & Conditions Error:", err);
      const errorMessage = err?.data?.message || "Failed to save Terms & Conditions. Please try again.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#0D2357",
      });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">Terms & Condition</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card p-6">
        {isFetching ? (
          <div className="flex justify-center py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : (
          <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="Write terms and conditions..."
          />
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar flex flex-col items-center justify-center gap-3 p-4 sm:flex-row">
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </div>
  );
}
