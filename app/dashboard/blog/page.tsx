"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';


import React, { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Eye, Edit3, Video, Layout } from "lucide-react"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { getBlog, updateBlog } from "@/redux/actions/blogActions";
import { BlogData } from "@/redux/actions/blogActions";

export default function BlogEditorPage() {
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state: RootState) => state.blog);
  
  const [editData, setEditData] = useState<BlogData | null>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch blog data on component mount
  useEffect(() => {
    dispatch(getBlog() as any);
  }, [dispatch]);

  // Set edit data when blog data is loaded
  useEffect(() => {
    if (blog) {
      setEditData(blog);
    }
  }, [blog]);

  const handleSave = async () => {
    if (editData) {
      await dispatch(updateBlog({
        hero: editData.hero,
        bigText: editData.bigText
      }) as any);
    }
  };

  const handleHeroChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        hero: {
          ...editData.hero,
          [field]: value
        }
      });
    }
  };

  const handleBigTextChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        bigText: {
          ...editData.bigText,
          [field]: value
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-500">Hata: {error}</div>
      </div>
    );
  }

  if (!editData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div>Veri bulunamadı</div>
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
                <BreadcrumbPage>Blog Editor</BreadcrumbPage>
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
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "Edit Mode" : "Preview"}
          </Button>
          <Button onClick={handleSave} disabled={loading} size="sm">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          </div>
        </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Panel - Editor */}
        <div className="w-1/3 border-r bg-gray-50/50 overflow-y-auto">
          <div className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hero" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Hero
                </TabsTrigger>
                <TabsTrigger value="bigtext" className="flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  Big Text
                </TabsTrigger>
              </TabsList>

              {/* Hero Tab */}
              <TabsContent value="hero" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Hero Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Video Source</label>
                      <Input
                        value={editData.hero.videoSrc}
                        onChange={(e) => handleHeroChange('videoSrc', e.target.value)}
                        placeholder="/assets/img/home-01/video1.mp4"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={editData.hero.title}
                        onChange={(e) => handleHeroChange('title', e.target.value)}
                        placeholder="DENTAL INSIGHTS"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={editData.hero.description}
                        onChange={(e) => handleHeroChange('description', e.target.value)}
                        placeholder="DISCOVER EXPERT TIPS, TREATMENT TRENDS..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Big Text Tab */}
              <TabsContent value="bigtext" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="w-5 h-5" />
                      Big Text Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Left Text</label>
                        <Input
                          value={editData.bigText.leftText}
                          onChange={(e) => handleBigTextChange('leftText', e.target.value)}
                          placeholder="CLINIC"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Right Text</label>
                        <Input
                          value={editData.bigText.rightText}
                          onChange={(e) => handleBigTextChange('rightText', e.target.value)}
                          placeholder="TOUCH"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Main Text</label>
                      <Input
                        value={editData.bigText.mainText}
                        onChange={(e) => handleBigTextChange('mainText', e.target.value)}
                        placeholder="Get Contact"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Link URL</label>
                      <Input
                        value={editData.bigText.linkUrl}
                        onChange={(e) => handleBigTextChange('linkUrl', e.target.value)}
                        placeholder="/contact"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="p-8">
            {previewMode ? (
              // Preview Mode - Show how it will look
              <div className="space-y-8">
                {/* Hero Preview */}
                <div className="relative h-96 rounded-lg bg-gray-900 flex items-center justify-center text-white overflow-hidden">
                  {editData.hero.videoSrc ? (
                    <video 
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay 
                      muted 
                      loop
                      src={editData.hero.videoSrc}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  )}
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative text-center space-y-4 px-4 z-10">
                    <h1 className="text-4xl font-bold tracking-wider">{editData.hero.title}</h1>
                    <p className="text-lg max-w-3xl leading-relaxed">{editData.hero.description}</p>
                  </div>
                  {!editData.hero.videoSrc && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        No Video - Default Background
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Big Text Preview */}
                <div className="bg-gray-50 rounded-lg p-12">
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-8">
                      <span className="text-6xl font-bold text-gray-300">
                        {editData.bigText.leftText}
                      </span>
                      <span className="text-3xl font-bold text-blue-600">
                        {editData.bigText.mainText}
                      </span>
                      <span className="text-6xl font-bold text-gray-300">
                        {editData.bigText.rightText}
                      </span>
                    </div>
                    <a 
                      href={editData.bigText.linkUrl}
                      className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      {editData.bigText.mainText}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode - Show structure
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-600">Blog Page Editor</h2>
                  <p className="text-gray-500 mt-2">Use the left panel to edit content, then preview your changes</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">Hero Section</p>
                      <Badge variant="outline" className="mt-1">3 Fields</Badge>
                      {editData.hero.videoSrc && (
                        <Badge variant="secondary" className="mt-1 ml-1">
                          ✓ Video Set
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Layout className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">Big Text</p>
                      <Badge variant="outline" className="mt-1">4 Fields</Badge>
                    </CardContent>
                  </Card>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  💡 Tip: Switch to Preview mode to see how your blog page will look to visitors
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
