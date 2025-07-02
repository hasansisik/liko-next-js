"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ImageUpload } from "@/components/ui/image-upload";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Save,
  ArrowLeft,
  Plus,
  User,
  FileText,
  Image as ImageIcon,
  Video,
  Tag,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  createBlogPost,
  getBlogCategories,
  CreateBlogPostPayload,
} from "@/redux/actions/blogPostActions";
import {
  createCategory,
  CreateCategoryPayload
} from "@/redux/actions/categoryActions";

export default function CreateBlogPostPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories, loading, error, success } = useAppSelector(
    (state) => state.blogPosts
  );

  // Form state
  const [formData, setFormData] = useState<CreateBlogPostPayload>({
    title: "",
    img: "",
    images: [],
    categories: [],
    tags: [],
    author: "",
    videoId: "",
    avatar: "",
    blogQuote: false,
    video: false,
    imgSlider: false,
    blogQuoteTwo: false,
    blogHeroSlider: false,
    desc: "",
    content: {
      htmlContent: "",
    },
    isPublished: false,
  });

  // UI state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Category dialog state
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState<CreateCategoryPayload>({
    name: "",
    description: "",
    color: "#3B82F6",
    icon: ""
  });

  // Load categories on mount
  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);

  // Update form data when categories or tags change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      categories: selectedCategories,
      tags: tags
    }));
  }, [selectedCategories, tags]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContentChange = useCallback((htmlContent: string) => {
    setFormData((prev) => ({
      ...prev,
      content: { htmlContent },
    }));
  }, []);

  // Category management
  const handleCategorySelect = (categoryName: string) => {
    if (!selectedCategories.includes(categoryName)) {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const removeCategorySelection = (categoryName: string) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
  };

  // Tag management
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async (publish: boolean = false) => {
    if (!formData.title.trim()) {
      alert("Başlık gereklidir!");
      return;
    }

    if (selectedCategories.length === 0) {
      alert("En az bir kategori seçmelisiniz!");
      return;
    }

    const payload = {
      ...formData,
      isPublished: publish,
    };

    try {
      await dispatch(createBlogPost(payload));
      if (success) {
        router.push("/dashboard/blog-posts");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryFormData.name.trim()) return;
    
    await dispatch(createCategory(categoryFormData));
    setIsCreateCategoryOpen(false);
    setCategoryFormData({
      name: "",
      description: "",
      color: "#3B82F6",
      icon: ""
    });
    // Reload categories
    dispatch(getBlogCategories());
  };

  const handleBack = () => {
    router.push("/dashboard/blog-posts");
  };

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
                <BreadcrumbLink href="/dashboard/blog-posts">
                  Blog Yönetimi
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Yeni Blog Yazısı</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto px-4">
          <Button onClick={handleBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <Button
            onClick={() => handleSave(false)}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Taslak Kaydet
          </Button>
          <Button onClick={() => handleSave(true)} disabled={loading} size="sm">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Kaydediliyor..." : "Kaydet & Yayınla"}
          </Button>
        </div>
      </header>

      {/* Main Content - 2 Column Layout */}
      <div className="flex-1 flex">
        {/* Left Panel - Main Content */}
        <div className="w-3/4 p-6 space-y-6 overflow-y-auto">
          {/* Basic Information */}
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
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Blog post başlığı"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">URL otomatik olarak oluşturulacaktır</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Yazar</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      placeholder="Yazar adı"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Kategoriler *</Label>
                  <div className="flex gap-2">
                    <Select onValueChange={handleCategorySelect}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter(category => !selectedCategories.includes(category.name))
                          .map((category) => (
                          <SelectItem key={category._id} value={category.name}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCreateCategoryOpen(true)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Selected Categories */}
                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCategories.map((categoryName) => {
                        const category = categories.find(cat => cat.name === categoryName);
                        return (
                          <Badge key={categoryName} variant="secondary" className="flex items-center gap-1">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: category?.color || '#3B82F6' }}
                            />
                            {categoryName}
                            <X 
                              className="w-3 h-3 cursor-pointer hover:bg-gray-200 rounded" 
                              onClick={() => removeCategorySelection(categoryName)}
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label htmlFor="tags">Etiketler</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Etiket eklemek için yazın ve Enter'a basın"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                  >
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Selected Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="flex items-center gap-1">
                        #{tag}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:bg-gray-200 rounded" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="desc">Kısa Açıklama *</Label>
                <Textarea
                  id="desc"
                  value={formData.desc}
                  onChange={(e) => handleInputChange("desc", e.target.value)}
                  placeholder="Blog post hakkında kısa açıklama"
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
                placeholder="Blog post içeriğinizi buraya yazın..."
              />
            </CardContent>
          </Card>

          {/* Success/Error Messages */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              ✅ Blog post başarıyla oluşturuldu!
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              ❌ {error}
            </div>
          )}
        </div>

        {/* Right Panel - Media & Settings */}
        <div className="w-1/4 bg-gray-50/30 p-6 space-y-6 overflow-y-auto">
          {/* Media */}
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
                <ImageUpload
                  value={formData.img}
                  onChange={(url) => handleInputChange("img", url)}
                  placeholder="Ana görsel yükleyin"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="video"
                  checked={formData.video}
                  onCheckedChange={(checked) => handleInputChange("video", checked)}
                />
                <Label htmlFor="video" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Video içeriği
                </Label>
              </div>

              {formData.video && (
                <div>
                  <Label htmlFor="videoId">YouTube Video ID</Label>
                  <Input
                    id="videoId"
                    value={formData.videoId}
                    onChange={(e) => handleInputChange("videoId", e.target.value)}
                    placeholder="dQw4w9WgXcQ"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="imgSlider"
                  checked={formData.imgSlider}
                  onCheckedChange={(checked) => handleInputChange("imgSlider", checked)}
                />
                <Label htmlFor="imgSlider">Görsel galeri</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="blogHeroSlider"
                  checked={formData.blogHeroSlider}
                  onCheckedChange={(checked) => handleInputChange("blogHeroSlider", checked)}
                />
                <Label htmlFor="blogHeroSlider">Hero slider</Label>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Gelişmiş Ayarlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="blogQuote"
                    checked={formData.blogQuote}
                    onCheckedChange={(checked) => handleInputChange("blogQuote", checked)}
                  />
                  <Label htmlFor="blogQuote">Alıntı içeriği</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="blogQuoteTwo"
                    checked={formData.blogQuoteTwo}
                    onCheckedChange={(checked) => handleInputChange("blogQuoteTwo", checked)}
                  />
                  <Label htmlFor="blogQuoteTwo">İkinci alıntı</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publish Status */}
          <Card>
            <CardHeader>
              <CardTitle>Yayın Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                />
                <Label htmlFor="isPublished">
                  {formData.isPublished ? "Yayında" : "Taslak"}
                </Label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Oluşturulma tarihi otomatik olarak atanacaktır.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Category Dialog */}
      <Dialog open={isCreateCategoryOpen} onOpenChange={setIsCreateCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Kategori Oluştur</DialogTitle>
            <DialogDescription>
              Yeni bir blog kategorisi oluşturun.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="categoryName">Kategori Adı</Label>
              <Input
                id="categoryName"
                value={categoryFormData.name}
                onChange={(e) => setCategoryFormData({...categoryFormData, name: e.target.value})}
                placeholder="Marketing, Teknoloji, vb."
              />
            </div>
            <div>
              <Label htmlFor="categoryDescription">Açıklama</Label>
              <Textarea
                id="categoryDescription"
                value={categoryFormData.description}
                onChange={(e) => setCategoryFormData({...categoryFormData, description: e.target.value})}
                placeholder="Kategori açıklaması..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="categoryColor">Renk</Label>
              <Input
                id="categoryColor"
                type="color"
                value={categoryFormData.color}
                onChange={(e) => setCategoryFormData({...categoryFormData, color: e.target.value})}
                className="w-20 h-10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateCategoryOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleCreateCategory} disabled={!categoryFormData.name.trim() || loading}>
              {loading ? "Oluşturuluyor..." : "Oluştur"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 
 
 
 
 