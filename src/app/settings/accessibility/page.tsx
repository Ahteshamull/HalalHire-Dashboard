"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/TiptapEditor";
import { useCreateAccessibilityMutation, useGetAccessibilityQuery } from "@/redux/api/privacyApi";

export default function AccessibilityPage() {
  const router = useRouter();
  const { data: accessibilityData, isLoading: isFetching } = useGetAccessibilityQuery({});
  const [createAccessibility, { isLoading }] = useCreateAccessibilityMutation();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (accessibilityData?.data) {
      let data = accessibilityData.data;
      if (data.data) {
        data = data.data; // Unwrap nested data object
      }
      data = Array.isArray(data) ? data[0] : data;
      
      if (data) {
        // Find the content regardless of the exact key used by the backend
        const fetchedContent = data.accessibility || data.description || data.content || data.text || Object.values(data).find(v => typeof v === 'string' && v.includes('<p>')) || "";
        if (fetchedContent) {
          setContent(fetchedContent as string);
        }
      }
    }
  }, [accessibilityData]);

  const handleSave = async () => {
    try {
      const response = await createAccessibility({
        requestData: {
          accessibility: content,
        },
      }).unwrap();
      
      Swal.fire({
        title: "Success!",
        text: "Accessibility saved successfully!",
        icon: "success",
        confirmButtonColor: "#0D2357",
      });
    } catch (err: any) {
      console.error("Save Accessibility Error:", err);
      const errorMessage = err?.data?.message || "Failed to save Accessibility. Please try again.";
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
          <h2 className="text-xl font-semibold">Accessiblity</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card p-6">
        {isFetching ? (
          <div className="flex justify-center py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : (
          <TiptapEditor content={content} onChange={setContent} placeholder="Write accessibility..." />
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar flex flex-col items-center justify-center p-4 sm:flex-row">
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
