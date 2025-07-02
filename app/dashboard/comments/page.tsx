"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllComments, approveComment, deleteComment } from "@/redux/actions/blogPostActions";
import { Check, X, MessageSquare, User, Mail, Calendar, Trash2, RefreshCw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function CommentsPage() {
  const dispatch = useAppDispatch();
  const { comments, commentsPagination, loading, error } = useAppSelector((state) => state.blogPosts);
  const [activeTab, setActiveTab] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    postId: string;
    commentId: string;
    commentText: string;
  }>({
    isOpen: false,
    postId: "",
    commentId: "",
    commentText: ""
  });

  useEffect(() => {
    dispatch(getAllComments({ status: activeTab, page: 1, limit: 10 }));
  }, [dispatch, activeTab]);

  const handleApproveComment = async (postId: string, commentId: string) => {
    try {
      const result = await dispatch(approveComment({ postId, commentId }));
      if (approveComment.fulfilled.match(result)) {
        toast.success("Comment approved");
        // Refresh the comments list
        dispatch(getAllComments({ status: activeTab, page: 1, limit: 10 }));
      } else {
        toast.error(result.payload as string || "Comment could not be approved");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteComment = async () => {
    try {
      const result = await dispatch(deleteComment({ 
        postId: deleteDialog.postId, 
        commentId: deleteDialog.commentId 
      }));
      if (deleteComment.fulfilled.match(result)) {
        toast.success("Comment deleted");
        // Refresh the comments list
        dispatch(getAllComments({ status: activeTab, page: 1, limit: 10 }));
      } else {
        toast.error(result.payload as string || "Comment could not be deleted");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setDeleteDialog({ isOpen: false, postId: "", commentId: "", commentText: "" });
    }
  };

  const openDeleteDialog = (postId: string, commentId: string, commentText: string) => {
    setDeleteDialog({
      isOpen: true,
      postId,
      commentId,
      commentText: commentText.substring(0, 50) + (commentText.length > 50 ? "..." : "")
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const renderCommentCard = (item: any) => (
    <Card key={item.comment._id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{item.comment.name}</h4>
                {item.comment.isGuest && (
                  <Badge variant="secondary" className="text-xs">
                    Guest
                  </Badge>
                )}
                {item.comment.isApproved && (
                  <Badge variant="default" className="text-xs bg-green-500">
                    Approved
                  </Badge>
                )}
                {!item.comment.isApproved && (
                  <Badge variant="destructive" className="text-xs">
                    Pending
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {item.comment.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.comment.date}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!item.comment.isApproved && (
              <Button
                size="sm"
                variant="default"
                onClick={() => handleApproveComment(item.postId, item.comment._id)}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="w-4 h-4 mr-1" />
                Approve
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => openDeleteDialog(item.postId, item.comment._id, item.comment.comment)}
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
            {item.comment.comment}
          </p>
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Blog Post:</span> {item.postTitle}
        </div>
      </CardContent>
    </Card>
  );

  const loadComments = () => {
    dispatch(getAllComments({ status: activeTab, page: 1, limit: 10 }));
  };

  if (loading && comments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Comment Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto px-4">
          <Button onClick={loadComments} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
                      <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{commentsPagination?.totalComments || 0}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <X className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {comments.filter((c) => !c.comment.isApproved).length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {comments.filter((c) => c.comment.isApproved).length}
                </div>
              </CardContent>
            </Card>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="">
              All Comments
              {commentsPagination?.totalComments && activeTab === "" && (
                <Badge variant="secondary" className="ml-2">
                  {commentsPagination.totalComments}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending Comments
              {commentsPagination?.totalComments && activeTab === "pending" && (
                <Badge variant="secondary" className="ml-2">
                  {commentsPagination.totalComments}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved Comments
              {commentsPagination?.totalComments && activeTab === "approved" && (
                <Badge variant="secondary" className="ml-2">
                  {commentsPagination.totalComments}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  All Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No comments found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map(renderCommentCard)}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <X className="w-5 h-5 text-orange-500" />
                  Pending Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No pending comments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map(renderCommentCard)}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Approved Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No approved comments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map(renderCommentCard)}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {commentsPagination && commentsPagination.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!commentsPagination.hasPrev || loading}
                onClick={() => {
                  dispatch(getAllComments({ 
                    status: activeTab, 
                    page: commentsPagination.currentPage - 1, 
                    limit: 10 
                  }));
                }}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {commentsPagination.currentPage} / {commentsPagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={!commentsPagination.hasNext || loading}
                onClick={() => {
                  dispatch(getAllComments({ 
                    status: activeTab, 
                    page: commentsPagination.currentPage + 1, 
                    limit: 10 
                  }));
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialog.isOpen} onOpenChange={(open) => 
          !open && setDeleteDialog({ isOpen: false, postId: "", commentId: "", commentText: "" })
        }>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Comment</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this comment? This action cannot be undone.
                <br />
                <br />
                <span className="font-medium">Comment preview:</span>
                <br />
                <span className="text-sm italic">&ldquo;{deleteDialog.commentText}&rdquo;</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteComment}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
} 