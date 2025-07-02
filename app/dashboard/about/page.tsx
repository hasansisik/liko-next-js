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
import { ImageUpload } from "@/components/ui/image-upload"
import { Save, Eye, Plus, Trash2, Edit3, Image, Type, Layout } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAbout, updateAbout } from "@/redux/actions/aboutActions";
import { AboutData } from "@/redux/actions/aboutActions";

export default function AboutEditorPage() {
  const dispatch = useAppDispatch();
  const { about, loading, error, success } = useAppSelector((state) => state.about);
  
  const [editData, setEditData] = useState<AboutData | null>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch about data on component mount
  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  // Set edit data when about data is loaded
  useEffect(() => {
    if (about) {
      setEditData(about);
    }
  }, [about]);

  const handleSave = async () => {
    if (editData && editData._id) {
      await dispatch(updateAbout({
        aboutId: editData._id,
        hero: editData.hero,
        aboutInfo: editData.aboutInfo
      }));
    }
  };

  const handleHeroChange = (field: string, value: string | string[]) => {
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

  const handleAboutInfoChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        aboutInfo: {
          ...editData.aboutInfo,
          [field]: value
        }
      });
    }
  };

  const handleServicesChange = (field: string, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        aboutInfo: {
          ...editData.aboutInfo,
          services: {
            ...editData.aboutInfo.services,
            [field]: value
          }
        }
      });
    }
  };

  const addServiceItem = (column: 'column1' | 'column2') => {
    if (editData) {
      const newServices = [...editData.aboutInfo.services.servicesList[column], "Yeni Hizmet"];
      handleServicesChange('servicesList', {
        ...editData.aboutInfo.services.servicesList,
        [column]: newServices
      });
    }
  };

  const removeServiceItem = (column: 'column1' | 'column2', index: number) => {
    if (editData) {
      const newServices = editData.aboutInfo.services.servicesList[column].filter((_, i) => i !== index);
      handleServicesChange('servicesList', {
        ...editData.aboutInfo.services.servicesList,
        [column]: newServices
      });
    }
  };

  const updateServiceItem = (column: 'column1' | 'column2', index: number, value: string) => {
    if (editData) {
      const newServices = [...editData.aboutInfo.services.servicesList[column]];
      newServices[index] = value;
      handleServicesChange('servicesList', {
        ...editData.aboutInfo.services.servicesList,
        [column]: newServices
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
                <BreadcrumbPage>About Editor</BreadcrumbPage>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="hero" className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Hero
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  About
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  Services
                </TabsTrigger>
              </TabsList>

              {/* Hero Tab */}
              <TabsContent value="hero" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Hero Section
                    </CardTitle>
                  </CardHeader>
                                     <CardContent className="space-y-4">
                     <div>
                       <label className="text-sm font-medium">Background Image</label>
                       <ImageUpload
                         value={editData.hero.backgroundImage}
                         onChange={(url) => handleHeroChange('backgroundImage', url)}
                         placeholder="Enter image URL or upload background image"
                       />
                     </div>
                    <div>
                      <label className="text-sm font-medium">Subtitle</label>
                      <Input
                        value={editData.hero.subtitle}
                        onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                        placeholder="Professional dental care"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={editData.hero.title}
                        onChange={(e) => handleHeroChange('title', e.target.value)}
                        placeholder="Creating Healthy Smiles"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={editData.hero.description}
                        onChange={(e) => handleHeroChange('description', e.target.value)}
                        placeholder="Comprehensive dental care..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Scroll Text</label>
                      <Input
                        value={editData.hero.scrollText}
                        onChange={(e) => handleHeroChange('scrollText', e.target.value)}
                        placeholder="Scroll to explore"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      About Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Welcome Text</label>
                      <Input
                        value={editData.aboutInfo.welcomeText}
                        onChange={(e) => handleAboutInfoChange('welcomeText', e.target.value)}
                        placeholder="Welcome!"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Main Content</label>
                      <Textarea
                        value={editData.aboutInfo.mainContent}
                        onChange={(e) => handleAboutInfoChange('mainContent', e.target.value)}
                        placeholder="We are a modern dental clinic..."
                        rows={6}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="w-5 h-5" />
                      Services Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={editData.aboutInfo.services.title}
                          onChange={(e) => handleServicesChange('title', e.target.value)}
                          placeholder="Our"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input
                          value={editData.aboutInfo.services.subtitle}
                          onChange={(e) => handleServicesChange('subtitle', e.target.value)}
                          placeholder="SERVICES"
                        />
                      </div>
                    </div>

                    {/* Column 1 Services */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Column 1 Services</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addServiceItem('column1')}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {editData.aboutInfo.services.servicesList.column1.map((service, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={service}
                              onChange={(e) => updateServiceItem('column1', index, e.target.value)}
                              placeholder="Service name"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeServiceItem('column1', index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2 Services */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Column 2 Services</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addServiceItem('column2')}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {editData.aboutInfo.services.servicesList.column2.map((service, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={service}
                              onChange={(e) => updateServiceItem('column2', index, e.target.value)}
                              placeholder="Service name"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeServiceItem('column2', index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
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
                 <div 
                   className="relative h-96 rounded-lg bg-cover bg-center flex items-center justify-center text-white"
                   style={{ 
                     backgroundImage: editData.hero.backgroundImage 
                       ? `url(${editData.hero.backgroundImage})` 
                       : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                   }}
                 >
                   <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
                   <div className="relative text-center space-y-4 px-4">
                     <p className="text-lg opacity-90">{editData.hero.subtitle}</p>
                     <h1 className="text-4xl font-bold">{editData.hero.title}</h1>
                     <p className="text-lg max-w-2xl">{editData.hero.description}</p>
                     <p className="text-sm opacity-75">{editData.hero.scrollText}</p>
                   </div>
                   {!editData.hero.backgroundImage && (
                     <div className="absolute top-4 right-4">
                       <Badge variant="secondary" className="bg-white/20 text-white">
                         No Image - Default Background
                       </Badge>
                     </div>
                   )}
                 </div>

                {/* About Preview */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">{editData.aboutInfo.welcomeText}</h2>
                    <p className="text-gray-700 leading-relaxed">{editData.aboutInfo.mainContent}</p>
                  </div>

                  {/* Services Preview */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      {editData.aboutInfo.services.title} <span className="text-blue-600">{editData.aboutInfo.services.subtitle}</span>
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <ul className="space-y-2">
                          {editData.aboutInfo.services.servicesList.column1.map((service, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2">
                          {editData.aboutInfo.services.servicesList.column2.map((service, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode - Show structure
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-600">About Page Editor</h2>
                  <p className="text-gray-500 mt-2">Use the left panel to edit content, then preview your changes</p>
                </div>

                                 {/* Quick Stats */}
                 <div className="grid grid-cols-3 gap-4">
                   <Card>
                     <CardContent className="p-4 text-center">
                       <Image className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                       <p className="text-sm font-medium">Hero Section</p>
                       <Badge variant="outline" className="mt-1">5 Fields</Badge>
                       {editData.hero.backgroundImage && (
                         <Badge variant="secondary" className="mt-1 ml-1">
                           ✓ Image Set
                         </Badge>
                       )}
                     </CardContent>
                   </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Type className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium">About Info</p>
                      <Badge variant="outline" className="mt-1">2 Fields</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Layout className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">Services</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.aboutInfo.services.servicesList.column1.length + editData.aboutInfo.services.servicesList.column2.length} Items
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    ✅ Changes saved successfully!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
