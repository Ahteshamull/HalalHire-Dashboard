"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/TiptapEditor";
import {
  useCreatePrivacyMutation,
  useGetPrivacyQuery,
} from "@/redux/api/privacyApi";
import Swal from "sweetalert2";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const [createPrivacy, { isLoading: isCreating }] = useCreatePrivacyMutation();
  const { data: privacyData, isLoading: isFetching } = useGetPrivacyQuery({});

  const [content, setContent] = useState("");

  useEffect(() => {
    if (privacyData?.data?.PrivacyPolicy) {
      setContent(privacyData.data.PrivacyPolicy);
    }
  }, [privacyData]);

  const handleSave = async () => {
    try {
      const response = await createPrivacy({
        requestData: {
          PrivacyPolicy: content,
        },
      }).unwrap();

      Swal.fire("Success", "Privacy Policy saved successfully!", "success");
    } catch (err: any) {
      console.error("Save Privacy Policy Error:", err);
      const errorMessage =
        err?.data?.message ||
        "Failed to save Privacy Policy. Please try again.";
      Swal.fire("Error", errorMessage, "error");
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
          <h2 className="text-xl font-semibold">Privacy Policy</h2>
        </div>
      </div>

      <div className="bg-card p-6">
        {isFetching ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="Write privacy policy..."
          />
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar flex flex-col items-center justify-center p-4 sm:flex-row">
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
          disabled={isCreating || isFetching}
        >
          {isCreating ? (
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
