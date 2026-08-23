"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { useGetAllNotificationQuery } from "@/redux/api/notificationApi";

export default function NotificationMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: notificationData, isLoading } = useGetAllNotificationQuery({});
  const notifications = notificationData?.data?.data || [];
  const ref = useRef<HTMLDivElement | null>(null);

  // Get up to 5 most recent notifications
  const items = [...notifications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className="absolute right-0 z-50 mt-2 w-[320px]">
      <div className="bg-card border-border rounded-lg border p-2 shadow-md">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="text-sm font-medium">Notifications</div>
        </div>

        <div className="mt-1 divide-y max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
          ) : items.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          ) : (
            items.map((it: any) => (
              <div
                key={it._id}
                className={`flex items-start gap-2 px-3 py-2 ${it.isRead ? "opacity-60" : ""}`}
              >
                <div className="text-muted-foreground pt-1">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{it.message || it.title || "Notification"}</div>
                  <div className="text-muted-foreground text-xs mt-1">
                    {it.createdAt ? new Date(it.createdAt).toLocaleString() : "Just now"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-2">
          <Link
            href="/notifications"
            className="bg-primary block rounded-md px-3 py-2 text-center text-sm text-white"
          >
            All notifications
          </Link>
        </div>
      </div>
    </div>
  );
}
