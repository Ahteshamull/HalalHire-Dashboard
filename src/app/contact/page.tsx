"use client";

import React, { useState } from "react";
import { Search, Eye, MessageSquare, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllContactsQuery, useDeleteContactMutation } from "@/redux/api/contactApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Swal from "sweetalert2";

// Define Contact interface
interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isSolve: boolean;
  isPending: boolean;
  isDelete: boolean;
  createdAt: string;
}

export default function ContactPage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const itemsPerPage = 10;
  
  const [deleteContact] = useDeleteContactMutation();

  // Use the API hook
  const { data: contactsResponse, isLoading, error } = useGetAllContactsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const apiContacts = contactsResponse?.data?.all_contact || [];
  const meta = contactsResponse?.data?.meta || { total: 0, totalPage: 1 };
  
  const totalPages = meta.totalPage;

  // Local filtering if needed (but API handles pagination)
  const filteredContacts = apiContacts.filter(
    (c: Contact) =>
      (c.name?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (c.email?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (c.subject?.toLowerCase() || "").includes(query.toLowerCase())
  );

  const handleDeleteContact = async (contact: Contact) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete this contact message from "${contact.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteContact(contact._id).unwrap();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Contact message deleted successfully!",
        });
      } catch (err: any) {
        console.error("Delete Contact Error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err?.data?.message || "Failed to delete contact",
        });
      }
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Contact Messages</h2>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search Contacts"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-background text-foreground border-primary-foreground/20 w-full pl-9"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table area */}
      <div className="bg-card border-border overflow-hidden rounded-b-lg border shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading contacts...</div>
        ) : error ? (
          <div className="p-8 text-center text-destructive">Error loading contacts.</div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No contacts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">Name</th>
                  <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">Email</th>
                  <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">Subject</th>
                  <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">Date</th>
                  <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {filteredContacts.map((c: Contact) => (
                  <tr key={c._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{c.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{c.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground truncate max-w-[200px]">{c.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                          onClick={() => handleDeleteContact(c)}
                          title="Delete Contact"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                          onClick={() => setSelectedContact(c)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-border mt-4 rounded-lg border p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <span className="mr-1 hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Contact Modal */}
      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Details
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-sm font-semibold text-muted-foreground">From:</div>
                <div className="col-span-3 text-sm">{selectedContact.name} ({selectedContact.email})</div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-sm font-semibold text-muted-foreground">Date:</div>
                <div className="col-span-3 text-sm">{new Date(selectedContact.createdAt).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-4 gap-4 border-b pb-4">
                <div className="text-sm font-semibold text-muted-foreground">Subject:</div>
                <div className="col-span-3 text-sm font-medium">{selectedContact.subject}</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-muted-foreground mb-2">Message:</div>
                <div className="text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
