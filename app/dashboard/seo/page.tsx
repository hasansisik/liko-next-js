"use client";

import React, { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import { 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  Search, 
  Globe, 
  Share2, 
  Image, 
  Settings,
  FileText,
  Tag,
  ExternalLink
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { 
  getAllSEO, 
  getSEOByPage, 
  createSEO, 
  updateSEO, 
  deleteSEO,
  SEOData,
  CreateSEOPayload,
  UpdateSEOPayload
} from "@/redux/actions/seoActions";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const PAGE_NAMES = [
  { value: "home", label: "Ana Sayfa" },
  { value: "about", label: "Hakkımızda" },
  { value: "services", label: "Hizmetler" },
  { value: "blog", label: "Blog" },
  { value: "contact", label: "İletişim" },
  { value: "portfolio", label: "Portfolyo" },
  { value: "team", label: "Ekibimiz" },
  { value: "faq", label: "Sık Sorulan Sorular" },
  { value: "pricing", label: "Fiyatlandırma" },
  { value: "privacy-policy", label: "Gizlilik Politikası" },
  { value: "terms-of-service", label: "Kullanım Şartları" },
  { value: "cookie-policy", label: "Çerez Politikası" },
];

export default function SEOManagementPage() {
  const dispatch = useAppDispatch();
  const { seoData, currentSEO, loading, error } = useAppSelector((state) => state.seo);
  
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [editData, setEditData] = useState<SEOData | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [previewMode, setPreviewMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");

  // Fetch all SEO data on component mount
  useEffect(() => {
    dispatch(getAllSEO());
  }, [dispatch]);

  // Handle page selection
  const handlePageSelect = (pageName: string) => {
    setSelectedPage(pageName);
    dispatch(getSEOByPage(pageName));
  };

  // Set edit data when current SEO is loaded
  useEffect(() => {
    if (currentSEO) {
      setEditData(currentSEO);
      setKeywords(currentSEO.keywords || []);
      setIsEditing(true);
    } else if (selectedPage) {
      // Create new SEO data for the selected page
      const newSEOData: SEOData = {
        pageName: selectedPage,
        title: "",
        description: "",
        keywords: [],
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        ogUrl: "",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
        canonical: "",
        robots: "index, follow",
        structuredData: null,
        isActive: true,
      };
      setEditData(newSEOData);
      setKeywords([]);
      setIsEditing(false);
    }
  }, [currentSEO, selectedPage]);

  const handleSave = async () => {
    if (!editData || !selectedPage) return;

    try {
      const seoPayload = {
        ...editData,
        keywords,
        pageName: selectedPage,
      };

      let result;
      if (isEditing && editData._id) {
        result = await dispatch(updateSEO({
          id: editData._id,
          ...seoPayload
        } as UpdateSEOPayload));
      } else {
        result = await dispatch(createSEO(seoPayload as CreateSEOPayload));
      }

      if (result.type.endsWith('/fulfilled')) {
        toast.success(isEditing ? "SEO verisi güncellendi!" : "SEO verisi oluşturuldu!");
        dispatch(getAllSEO());
      } else {
        toast.error("İşlem başarısız!");
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Bir hata oluştu!");
    }
  };

  const handleDelete = async () => {
    if (!editData?._id) return;

    try {
      const result = await dispatch(deleteSEO(editData._id));
      if (result.type.endsWith('/fulfilled')) {
        toast.success("SEO verisi silindi!");
        setEditData(null);
        setSelectedPage("");
        dispatch(getAllSEO());
      } else {
        toast.error("Silme işlemi başarısız!");
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("Bir hata oluştu!");
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value
      });
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  if (loading) {
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
                <BreadcrumbPage>SEO Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto px-4">
          <Button
            variant={previewMode ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "Edit Mode" : "Preview"}
          </Button>
          {editData && (
            <Button 
              onClick={handleSave}
              disabled={loading} 
              size="sm"
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          )}
          {isEditing && editData?._id && (
            <Button 
              onClick={handleDelete}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Panel - Page Selection */}
        <div className="w-1/4 border-r bg-gray-50/50 overflow-y-auto">
          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Sayfa Seçimi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {PAGE_NAMES.map((page) => {
                    const existingSEO = seoData.find(seo => seo.pageName === page.value);
                    return (
                      <div
                        key={page.value}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedPage === page.value
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-gray-100'
                        }`}
                        onClick={() => handlePageSelect(page.value)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{page.label}</span>
                          {existingSEO && (
                            <Badge variant={existingSEO.isActive ? "default" : "secondary"} className="text-xs">
                              {existingSEO.isActive ? "Aktif" : "Pasif"}
                            </Badge>
                          )}
                        </div>
                        {existingSEO && (
                          <div className="text-xs mt-1 opacity-70">
                            {existingSEO.title || "Başlık belirtilmemiş"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className="flex-1 bg-gray-50/50 overflow-y-auto">
          {selectedPage && editData ? (
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="basic" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Temel Bilgiler
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Sosyal Medya
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Gelişmiş
                  </TabsTrigger>
                  <TabsTrigger value="images" className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Görseller
                  </TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Temel SEO Bilgileri
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Sayfa Başlığı <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={editData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="SEO başlığı (maksimum 60 karakter)"
                          maxLength={60}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {editData.title.length}/60 karakter
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Meta Açıklama <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          value={editData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="SEO açıklaması (maksimum 160 karakter)"
                          maxLength={160}
                          rows={3}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {editData.description.length}/160 karakter
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Anahtar Kelimeler
                        </label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            onKeyPress={handleKeywordKeyPress}
                            placeholder="Anahtar kelime ekle"
                          />
                          <Button 
                            onClick={addKeyword}
                            variant="outline"
                            size="sm"
                            className="bg-black hover:bg-gray-800 text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {keywords.map((keyword, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Tag className="w-3 h-3" />
                              {keyword}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 ml-1"
                                onClick={() => removeKeyword(index)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Canonical URL
                        </label>
                        <Input
                          value={editData.canonical || ''}
                          onChange={(e) => handleInputChange('canonical', e.target.value)}
                          placeholder="https://example.com/page"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Robots Direktifi
                        </label>
                        <Select
                          value={editData.robots}
                          onValueChange={(value) => handleInputChange('robots', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="index, follow">Index, Follow</SelectItem>
                            <SelectItem value="noindex, nofollow">NoIndex, NoFollow</SelectItem>
                            <SelectItem value="index, nofollow">Index, NoFollow</SelectItem>
                            <SelectItem value="noindex, follow">NoIndex, Follow</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="active"
                          checked={editData.isActive}
                          onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                        />
                        <label htmlFor="active" className="text-sm font-medium">
                          Aktif
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Social Media Tab */}
                <TabsContent value="social" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Open Graph (Facebook)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">OG Başlık</label>
                        <Input
                          value={editData.ogTitle || ''}
                          onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                          placeholder="Facebook için başlık"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">OG Açıklama</label>
                        <Textarea
                          value={editData.ogDescription || ''}
                          onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                          placeholder="Facebook için açıklama"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">OG URL</label>
                        <Input
                          value={editData.ogUrl || ''}
                          onChange={(e) => handleInputChange('ogUrl', e.target.value)}
                          placeholder="https://example.com/page"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Twitter Cards
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Twitter Başlık</label>
                        <Input
                          value={editData.twitterTitle || ''}
                          onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                          placeholder="Twitter için başlık"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Twitter Açıklama</label>
                        <Textarea
                          value={editData.twitterDescription || ''}
                          onChange={(e) => handleInputChange('twitterDescription', e.target.value)}
                          placeholder="Twitter için açıklama"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Gelişmiş SEO Ayarları
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Structured Data (JSON-LD)
                        </label>
                        <Textarea
                          value={editData.structuredData ? JSON.stringify(editData.structuredData, null, 2) : ''}
                          onChange={(e) => {
                            try {
                              const parsed = e.target.value ? JSON.parse(e.target.value) : null;
                              handleInputChange('structuredData', parsed);
                            } catch (error) {
                              // Invalid JSON, keep the text for editing
                            }
                          }}
                          placeholder='{"@context": "https://schema.org", "@type": "WebPage", "name": "Page Name"}'
                          rows={8}
                          className="font-mono text-sm"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Geçerli JSON formatında structured data girin
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="w-5 h-5" />
                        Sosyal Medya Görselleri
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Open Graph Görseli
                        </label>
                        <ImageUpload
                          value={editData.ogImage || ''}
                          onChange={(url) => handleInputChange('ogImage', url)}
                          placeholder="Facebook paylaşım görseli"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Önerilen boyut: 1200x630px
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Twitter Görseli
                        </label>
                        <ImageUpload
                          value={editData.twitterImage || ''}
                          onChange={(url) => handleInputChange('twitterImage', url)}
                          placeholder="Twitter paylaşım görseli"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Önerilen boyut: 1200x600px
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sayfa Seçin
                </h3>
                <p className="text-gray-500">
                  Sol panelden düzenlemek istediğiniz sayfayı seçin
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 