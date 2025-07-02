"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';


import React, { useState, useEffect, useCallback } from "react";
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
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/ui/image-upload"
import RichTextEditor from "@/components/RichTextEditor"
import { Save, ArrowLeft, Plus, X, FileText, Image as ImageIcon, Settings } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { 
  createServicePost,
  getServiceCategories
} from "@/redux/actions/servicePostActions";
import { ServicePostData } from "@/redux/actions/servicePostActions";

export default function AddServicePostPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories, loading, error, success } = useAppSelector((state) => state.servicePosts);
  
  const [formData, setFormData] = useState<Partial<ServicePostData>>({
    title: "",
    img: "",
    images: [],
    categories: [],
    tags: [],
    desc: "",
    content: { htmlContent: "" },
    isPublished: false,
    author: "",
    videoId: "",
    video: false,
    blogQuote: false,
    imgSlider: false,
    blogQuoteTwo: false,
    blogHeroSlider: false
  });

  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getServiceCategories());
  }, [dispatch]);

  // Redirect on successful creation
  useEffect(() => {
    if (success && !loading) {
      router.push("/dashboard/service-posts");
    }
  }, [success, loading, router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.img || !formData.desc || !formData.content?.htmlContent) {
      alert("Lütfen tüm zorunlu alanları doldurun");
      return;
    }

    setIsSubmitting(true);
    await dispatch(createServicePost(formData as any));
    setIsSubmitting(false);
  };

  // Add category
  const addCategory = () => {
    if (newCategory && !formData.categories?.includes(newCategory)) {
      setFormData({
        ...formData,
        categories: [...(formData.categories || []), newCategory]
      });
      setNewCategory("");
    }
  };

  // Remove category
  const removeCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories?.filter(cat => cat !== category) || []
    });
  };

  // Add tag
  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag]
      });
      setNewTag("");
    }
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag) || []
    });
  };

  // Handle content change
  const handleContentChange = useCallback((htmlContent: string) => {
    setFormData((prev) => ({
      ...prev,
      content: { htmlContent },
    }));
  }, []);

  return (
    <>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard/service-posts">Service Posts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Yeni Service Post</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Yeni Service Post Ekle</h1>
            <p className="text-muted-foreground">
              Yeni bir service post oluşturun ve yayınlayın.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Content - 2 Column Layout */}
          <div className="flex flex-1">
            {/* Left Panel - Main Content */}
            <div className="w-3/4 pr-6 space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Temel Bilgiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Başlık *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Service post başlığı"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Yazar</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Yazar adı"
                    />
                  </div>

                  <div>
                    <Label htmlFor="desc">Kısa Açıklama *</Label>
                    <Textarea
                      id="desc"
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                      placeholder="Service post kısa açıklaması"
                      rows={3}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle>İçerik *</CardTitle>
                </CardHeader>
                <CardContent>
                  <RichTextEditor
                    content={formData.content?.htmlContent || ""}
                    onChange={handleContentChange}
                    placeholder="Service post içeriğinizi buraya yazın..."
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Media & Settings */}
            <div className="w-1/4 bg-gray-50/30 pl-6 space-y-6">
              {/* Publish Settings - Moved to the top */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Yayın Ayarları
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                    />
                    <Label htmlFor="isPublished">Yayınla</Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                </CardContent>
              </Card>

              {/* Media Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Medya
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Ana Görsel *</Label>
                    <div className="mt-2">
                      <ImageUpload
                        value={formData.img}
                        onChange={(url) => setFormData({ ...formData, img: url as string })}
                        placeholder="Enter image URL or upload image"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>Ek Görseller</Label>
                    <div className="mt-2">
                      <ImageUpload
                        value={formData.images || []}
                        onChange={(urls) => setFormData({ ...formData, images: Array.isArray(urls) ? urls : [urls] })}
                        placeholder="Enter image URL or upload additional images"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="videoId">Video ID (YouTube)</Label>
                    <Input
                      id="videoId"
                      value={formData.videoId}
                      onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                      placeholder="YouTube video ID"
                    />
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Switch
                      id="video"
                      checked={formData.video}
                      onCheckedChange={(checked) => setFormData({ ...formData, video: checked })}
                    />
                    <Label htmlFor="video">Video İçerik</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="imgSlider"
                      checked={formData.imgSlider}
                      onCheckedChange={(checked) => setFormData({ ...formData, imgSlider: checked })}
                    />
                    <Label htmlFor="imgSlider">Resim Slider</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Kategoriler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Select value={newCategory} onValueChange={setNewCategory}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Kategori seç" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category, index) => (
                          <SelectItem key={`category-${index}`} value={String(category)}>
                            {String(category)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      size="icon" 
                      onClick={addCategory}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.categories?.map((category, index) => (
                      <Badge key={`badge-${index}`} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <button 
                          type="button" 
                          onClick={() => removeCategory(category)} 
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Etiketler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Yeni etiket"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      size="icon" 
                      onClick={addTag}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.tags?.map((tag, index) => (
                      <Badge key={`tag-${index}`} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)} 
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </>
  );
} 
