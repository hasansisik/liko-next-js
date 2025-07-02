"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllFormSubmissions, updateFormSubmission, deleteFormSubmission } from "@/redux/actions/formSubmissionActions";
import { FormSubmission } from "@/redux/actions/formSubmissionActions";
import { Pencil, Trash2, CheckCircle, XCircle, Clock, PhoneCall, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FormSubmissionsPage = () => {
  const dispatch = useAppDispatch();
  const { formSubmissions, loading, error, success } = useAppSelector((state) => state.formSubmission);
  
  const [filter, setFilter] = useState<{
    status: string;
    isArchived: boolean;
    sort: string;
    order: 'asc' | 'desc';
  }>({
    status: "",
    isArchived: false,
    sort: "createdAt",
    order: "desc",
  });
  
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"new" | "contacted" | "completed" | "cancelled">("new");
  
  useEffect(() => {
        // Fetch all form submissions without filtering
    dispatch(getAllFormSubmissions());
  }, [dispatch]);
  
  // Separate effect for handling success
  useEffect(() => {
    if (success) {
      dispatch(getAllFormSubmissions());
    }
  }, [success, dispatch]);
  
  
  const handleStatusUpdate = async (submission: FormSubmission, newStatus: "new" | "contacted" | "completed" | "cancelled") => {
    if (submission._id) {
      await dispatch(updateFormSubmission({
        submissionId: submission._id,
        status: newStatus
      }));
      toast.success(`Status updated to "${newStatus}"`);
    }
  };
  
  const handleDelete = async (submission: FormSubmission) => {
    if (window.confirm("Are you sure you want to delete this form submission?")) {
      if (submission._id) {
        await dispatch(deleteFormSubmission(submission._id));
        toast.success("Form deleted successfully");
      }
    }
  };
  
  const openModal = (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setNotes(submission.notes || "");
    setStatus(submission.status);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };
  
  const handleSaveNotes = async () => {
    if (selectedSubmission?._id) {
      await dispatch(updateFormSubmission({
        submissionId: selectedSubmission._id,
        notes,
        status
      }));
      toast.success("Notes saved successfully");
      closeModal();
    }
  };
  
  const handleRefresh = () => {
    dispatch(getAllFormSubmissions());
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock size={12} className="mr-1" /> New
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <PhoneCall size={12} className="mr-1" /> Contacted
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Form Submissions</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage form submissions from customers.
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Form Submission List</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCw size={16} className="mr-2" /> Refresh
              </button>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-gray-400 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Loading form submissions...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : !formSubmissions || formSubmissions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No form submissions found.</p>
            
            {/* Debug panel */}
            <div className="mt-4 p-4 bg-gray-100 rounded text-left">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Debug Info:</h3>
              <p className="text-xs text-gray-600">Form Count: {formSubmissions ? formSubmissions.length : 0}</p>
              <p className="text-xs text-gray-600">Loading: {loading ? 'Yes' : 'No'}</p>
              <p className="text-xs text-gray-600">Error: {error || 'None'}</p>
              <p className="text-xs text-gray-600">Success: {success ? 'Yes' : 'No'}</p>
              <p className="text-xs text-gray-600">Filter: {JSON.stringify(filter)}</p>
              <p className="text-xs text-gray-600">Redux State: {JSON.stringify({
                formSubmissions: formSubmissions ? formSubmissions.length : 0,
                loading,
                error,
                success
              })}</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.countryCode} {submission.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.countryName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.createdAt && format(new Date(submission.createdAt), 'dd.MM.yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(submission)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        
                        {submission.status === "new" && (
                          <button
                            onClick={() => handleStatusUpdate(submission, "contacted")}
                            className="text-gray-600 hover:text-gray-900"
                            title="Mark as Contacted"
                          >
                            <PhoneCall size={16} />
                          </button>
                        )}
                        
                        {(submission.status === "new" || submission.status === "contacted") && (
                          <button
                            onClick={() => handleStatusUpdate(submission, "completed")}
                            className="text-gray-600 hover:text-gray-900"
                            title="Mark as Completed"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDelete(submission)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* ShadCN Dialog */}
      <Dialog open={isModalOpen && selectedSubmission !== null} onOpenChange={(open) => {
        if (!open) closeModal();
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Form Details</DialogTitle>
            <DialogDescription>
              View and edit form submission details.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <p className="text-sm font-medium text-right">Name:</p>
                  <p className="col-span-3">{selectedSubmission.name}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <p className="text-sm font-medium text-right">Phone:</p>
                  <p className="col-span-3">{selectedSubmission.countryCode} {selectedSubmission.phone}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <p className="text-sm font-medium text-right">Country:</p>
                  <p className="col-span-3">{selectedSubmission.countryName}</p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <p className="text-sm font-medium text-right">Date:</p>
                  <p className="col-span-3">
                    {selectedSubmission.createdAt && format(new Date(selectedSubmission.createdAt), 'dd.MM.yyyy HH:mm')}
                  </p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-sm font-medium text-right">Status:</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="notes" className="text-sm font-medium text-right">Notes:</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="col-span-3 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add notes about this submission..."
                  />
                </div>
              </div>
              <DialogFooter>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormSubmissionsPage; 