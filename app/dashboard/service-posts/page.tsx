"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
} from "@/components/ui/alert-dialog"
import { Plus, Trash2, Edit3, Eye, EyeOff, Search, Tag } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { 
  getAllServicePosts,
  deleteServicePost,
  getServiceCategories
} from "@/redux/actions/servicePostActions";
import { ServicePostData } from "@/redux/actions/servicePostActions";
import { formatDisplayDate } from "@/utils/date-utils";

export default function ServicePostsEditorPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { servicePosts, categories, loading, error, success } = useAppSelector((state) => state.servicePosts);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getAllServicePosts({ limit: 100 }));
    dispatch(getServiceCategories());
  }, [dispatch]);

  // Handle edit
  const handleEdit = (post: ServicePostData) => {
    if (!post._id) {
      console.error("Post ID is missing:", post);
      return;
    }
        // Use window.location for direct navigation as a fallback if router.push doesn't work
    window.location.href = `/dashboard/service-posts/edit/${post._id}`;
  };

  // Handle delete
  const handleDelete = async (postId: string) => {
    await dispatch(deleteServicePost(postId));
    dispatch(getAllServicePosts({ limit: 100 }));
  };

  // Filter posts based on search and category
  const filteredPosts = servicePosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === "all" || 
      (post.categories && post.categories.includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  if (loading && servicePosts.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
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
                <BreadcrumbLink href="/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Service Posts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto px-4">
          <Button size="sm" onClick={() => router.push("/dashboard/service-posts/add")}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Service Post
          </Button>

        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Service postlarda ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Kategori filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name} ({category.postCount})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{servicePosts.length}</div>
              <p className="text-sm text-gray-500">Toplam Service Post</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {servicePosts.filter(post => post.isPublished).length}
              </div>
              <p className="text-sm text-gray-500">Yayında</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {servicePosts.filter(post => !post.isPublished).length}
              </div>
              <p className="text-sm text-gray-500">Taslak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-sm text-gray-500">Kategori</p>
            </CardContent>
          </Card>
        </div>

        {/* Service Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>Service Postlar ({filteredPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? "Arama kriterlerine uygun service post bulunamadı" : "Henüz service post yok"}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post._id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {post.img && (
                        <img 
                          src={post.img} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold truncate">{post.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {post.desc}
                          </p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {post.categories.map((category) => (
                              <Badge key={category} variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                            {post.tags && post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Status and Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant={post.isPublished ? "default" : "secondary"}>
                            {post.isPublished ? (
                              <>
                                <Eye className="w-3 h-3 mr-1" />
                                Yayında
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 mr-1" />
                                Taslak
                              </>
                            )}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bu service post kalıcı olarak silinecek. Bu işlem geri alınamaz.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>İptal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(post._id!)}>
                                  Sil
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                        <span>Yazar: {post.author || 'Admin'}</span>
                        <span>Oluşturma: {formatDisplayDate(post.createdAt)}</span>
                        <span>Yorum: {post.commentCount || 0}</span>
                        <span>ID: {post._id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            ✅ İşlem başarıyla tamamlandı!
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            ❌ Hata: {error}
          </div>
        )}
      </div>
    </>
  );
} 
 