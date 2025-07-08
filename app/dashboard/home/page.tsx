"use client";

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
import { Save, Eye, Edit3, Video, Users, Info, HelpCircle, Settings, Play, Image as ImageIcon } from "lucide-react"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { getHome, updateHome } from "@/redux/actions/homeActions";
import { HomeData, IAboutSectionItem, ITeamMember, IFaqItem } from "@/redux/actions/homeActions";

export default function HomeEditorPage() {
  const dispatch = useDispatch();
  const { home, loading, error } = useSelector((state: RootState) => state.home);
  
  const [editData, setEditData] = useState<HomeData | null>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch home data on component mount
  useEffect(() => {
    dispatch(getHome() as any);
  }, [dispatch]);

  // Set edit data when home data is loaded
  useEffect(() => {
    if (home) {
      setEditData(home);
    }
  }, [home]);

  const handleSave = async () => {
    if (editData) {
      await dispatch(updateHome({
        heroBanner: editData.heroBanner,
        serviceSection: editData.serviceSection,
        aboutSection: editData.aboutSection,
        teamSection: editData.teamSection,
        videoSection: editData.videoSection,
        faqSection: editData.faqSection
      }) as any);
    }
  };

  const handleHeroBannerChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        heroBanner: {
          ...editData.heroBanner,
          [field]: value
        }
      });
    }
  };

  const handleServiceSectionChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        serviceSection: {
          ...editData.serviceSection,
          [field]: value
        }
      });
    }
  };

  const handleAboutSectionChange = (field: string, value: string | IAboutSectionItem[]) => {
    if (editData) {
      setEditData({
        ...editData,
        aboutSection: {
          ...editData.aboutSection,
          [field]: value
        }
      });
    }
  };

  const handleTeamSectionChange = (field: string, value: string | ITeamMember[]) => {
    if (editData) {
      setEditData({
        ...editData,
        teamSection: {
          ...editData.teamSection,
          [field]: value
        }
      });
    }
  };

  const handleVideoSectionChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        videoSection: {
          ...editData.videoSection,
          [field]: value
        }
      });
    }
  };

  const handleFaqSectionChange = (field: string, value: string | IFaqItem[]) => {
    if (editData) {
      setEditData({
        ...editData,
        faqSection: {
          ...editData.faqSection,
          [field]: value
        }
      });
    }
  };

  const addAboutItem = () => {
    if (editData) {
      const newItem: IAboutSectionItem = {
        id: Date.now(),
        image: "/assets/img/home-01/ab-1.jpg",
        title: "New About Item",
        description: "Description for new about item",
        imagePosition: 'left'
      };
      handleAboutSectionChange('items', [...editData.aboutSection.items, newItem]);
    }
  };

  const removeAboutItem = (id: number) => {
    if (editData) {
      const filteredItems = editData.aboutSection.items.filter(item => item.id !== id);
      handleAboutSectionChange('items', filteredItems);
    }
  };

  const updateAboutItem = (id: number, field: string, value: string) => {
    if (editData) {
      const updatedItems = editData.aboutSection.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      );
      handleAboutSectionChange('items', updatedItems);
    }
  };

  const addTeamMember = () => {
    if (editData) {
      const newMember: ITeamMember = {
        id: Date.now(),
        img: "/assets/img/home-01/team/team-1-1.jpg"
      };
      handleTeamSectionChange('teamMembers', [...editData.teamSection.teamMembers, newMember]);
    }
  };

  const removeTeamMember = (id: number) => {
    if (editData) {
      const filteredMembers = editData.teamSection.teamMembers.filter(member => member.id !== id);
      handleTeamSectionChange('teamMembers', filteredMembers);
    }
  };

  const updateTeamMember = (id: number, field: string, value: string) => {
    if (editData) {
      const updatedMembers = editData.teamSection.teamMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      );
      handleTeamSectionChange('teamMembers', updatedMembers);
    }
  };

  const addFaqItem = () => {
    if (editData) {
      const newFaq: IFaqItem = {
        id: Date.now(),
        question: "New Question",
        answer: "Answer for the new question"
      };
      handleFaqSectionChange('faqItems', [...editData.faqSection.faqItems, newFaq]);
    }
  };

  const removeFaqItem = (id: number) => {
    if (editData) {
      const filteredFaqs = editData.faqSection.faqItems.filter(faq => faq.id !== id);
      handleFaqSectionChange('faqItems', filteredFaqs);
    }
  };

  const updateFaqItem = (id: number, field: string, value: string) => {
    if (editData) {
      const updatedFaqs = editData.faqSection.faqItems.map(faq =>
        faq.id === id ? { ...faq, [field]: value } : faq
      );
      handleFaqSectionChange('faqItems', updatedFaqs);
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
                <BreadcrumbPage>Home Editor</BreadcrumbPage>
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
                <TabsTrigger value="hero" className="flex items-center gap-1 text-xs">
                  <Video className="w-3 h-3" />
                  Hero
                </TabsTrigger>
                <TabsTrigger value="service" className="flex items-center gap-1 text-xs">
                  <Settings className="w-3 h-3" />
                  Service
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-1 text-xs">
                  <Info className="w-3 h-3" />
                  About
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid w-full grid-cols-3 mt-2">
                <TabsTrigger value="team" className="flex items-center gap-1 text-xs">
                  <Users className="w-3 h-3" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-1 text-xs">
                  <Play className="w-3 h-3" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-1 text-xs">
                  <HelpCircle className="w-3 h-3" />
                  FAQ
                </TabsTrigger>
              </TabsList>

              {/* Hero Tab */}
              <TabsContent value="hero" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Hero Banner
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Video Source</label>
                      <Input
                        value={editData.heroBanner.videoSrc}
                        onChange={(e) => handleHeroBannerChange('videoSrc', e.target.value)}
                        placeholder="/assets/img/home-01/video1.mp4"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Desktop Title</label>
                      <Input
                        value={editData.heroBanner.desktopTitle}
                        onChange={(e) => handleHeroBannerChange('desktopTitle', e.target.value)}
                        placeholder="Route to a Perfect Smile"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Mobile Title</label>
                      <Input
                        value={editData.heroBanner.mobileTitle}
                        onChange={(e) => handleHeroBannerChange('mobileTitle', e.target.value)}
                        placeholder="Excellence in Aesthetics & Health"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={editData.heroBanner.description}
                        onChange={(e) => handleHeroBannerChange('description', e.target.value)}
                        placeholder="Rediscover your beauty..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Service Tab */}
              <TabsContent value="service" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Service Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={editData.serviceSection.title}
                          onChange={(e) => handleServiceSectionChange('title', e.target.value)}
                          placeholder="Dental"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input
                          value={editData.serviceSection.subtitle}
                          onChange={(e) => handleServiceSectionChange('subtitle', e.target.value)}
                          placeholder="Excellence"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Button Text</label>
                      <Input
                        value={editData.serviceSection.buttonText}
                        onChange={(e) => handleServiceSectionChange('buttonText', e.target.value)}
                        placeholder="See All Services"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Button Link</label>
                      <Input
                        value={editData.serviceSection.buttonLink}
                        onChange={(e) => handleServiceSectionChange('buttonLink', e.target.value)}
                        placeholder="/service"
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
                      <Info className="w-5 h-5" />
                      About Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Main Title</label>
                      <Input
                        value={editData.aboutSection.mainTitle}
                        onChange={(e) => handleAboutSectionChange('mainTitle', e.target.value)}
                        placeholder="Cooperation is possible..."
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">About Items</label>
                        <Button size="sm" onClick={addAboutItem}>Add Item</Button>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {editData.aboutSection.items.map((item, index) => (
                          <div key={item.id} className="border rounded p-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">Item {index + 1}</span>
                              <Button size="sm" variant="destructive" onClick={() => removeAboutItem(item.id)}>
                                Remove
                              </Button>
                            </div>
                            <Input
                              placeholder="Title"
                              value={item.title}
                              onChange={(e) => updateAboutItem(item.id, 'title', e.target.value)}
                            />
                            <Textarea
                              placeholder="Description"
                              value={item.description}
                              onChange={(e) => updateAboutItem(item.id, 'description', e.target.value)}
                              rows={2}
                            />
                            <div>
                              <label className="text-xs font-medium mb-2 block">Image</label>
                              <ImageUpload
                                value={item.image}
                                onChange={(url) => updateAboutItem(item.id, 'image', url as string)}
                                placeholder="Select or upload image"
                              />
                            </div>
                            <select
                              value={item.imagePosition}
                              onChange={(e) => updateAboutItem(item.id, 'imagePosition', e.target.value)}
                              className="w-full p-2 border rounded"
                            >
                              <option value="left">Left</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Team Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Spacing</label>
                      <Input
                        value={editData.teamSection.spacing || ""}
                        onChange={(e) => handleTeamSectionChange('spacing', e.target.value)}
                        placeholder="pt-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Team Members</label>
                        <Button size="sm" onClick={addTeamMember}>Add Member</Button>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {editData.teamSection.teamMembers.map((member, index) => (
                          <div key={member.id} className="border rounded p-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">Member {index + 1}</span>
                              <Button size="sm" variant="destructive" onClick={() => removeTeamMember(member.id)}>
                                Remove
                              </Button>
                            </div>
                            <div>
                              <label className="text-xs font-medium mb-2 block">Image</label>
                              <ImageUpload
                                value={member.img}
                                onChange={(url) => updateTeamMember(member.id, 'img', url as string)}
                                placeholder="Select or upload team member image"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Video Tab */}
              <TabsContent value="video" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Video Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Video Source</label>
                      <Input
                        value={editData.videoSection.videoSrc}
                        onChange={(e) => handleVideoSectionChange('videoSrc', e.target.value)}
                        placeholder="/assets/img/home-01/video1.mp4"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      FAQ Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={editData.faqSection.title}
                        onChange={(e) => handleFaqSectionChange('title', e.target.value)}
                        placeholder="Frequently Asked Question"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={editData.faqSection.description}
                        onChange={(e) => handleFaqSectionChange('description', e.target.value)}
                        placeholder="We believe in making life-long connections..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Shape Image</label>
                      <Input
                        value={editData.faqSection.shapeImage}
                        onChange={(e) => handleFaqSectionChange('shapeImage', e.target.value)}
                        placeholder="/assets/img/home-02/service/sv-shape-1.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">FAQ Items</label>
                        <Button size="sm" onClick={addFaqItem}>Add FAQ</Button>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {editData.faqSection.faqItems.map((faq, index) => (
                          <div key={faq.id} className="border rounded p-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">FAQ {index + 1}</span>
                              <Button size="sm" variant="destructive" onClick={() => removeFaqItem(faq.id)}>
                                Remove
                              </Button>
                            </div>
                            <Input
                              placeholder="Question"
                              value={faq.question}
                              onChange={(e) => updateFaqItem(faq.id, 'question', e.target.value)}
                            />
                            <Textarea
                              placeholder="Answer"
                              value={faq.answer}
                              onChange={(e) => updateFaqItem(faq.id, 'answer', e.target.value)}
                              rows={2}
                            />
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
              <div className="space-y-12">
                {/* Hero Preview */}
                <div className="relative h-96 rounded-lg bg-gray-900 flex items-center justify-center text-white overflow-hidden">
                  {editData.heroBanner.videoSrc ? (
                    <video 
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay 
                      muted 
                      loop
                      src={editData.heroBanner.videoSrc}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  )}
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative text-center space-y-4 px-4 z-10">
                    <h1 className="text-4xl font-bold">{editData.heroBanner.desktopTitle}</h1>
                    <p className="text-lg max-w-3xl">{editData.heroBanner.description}</p>
                  </div>
                </div>

                {/* Service Section Preview */}
                <div className="text-center space-y-4">
                  <h2 className="text-6xl font-bold text-gray-300">{editData.serviceSection.title}</h2>
                  <h3 className="text-3xl font-bold text-blue-600">{editData.serviceSection.subtitle}</h3>
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-lg">
                    {editData.serviceSection.buttonText}
                  </button>
                </div>

                {/* About Section Preview */}
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-center">{editData.aboutSection.mainTitle}</h2>
                  <div className="grid gap-8">
                    {editData.aboutSection.items.slice(0, 2).map((item) => (
                      <div key={item.id} className={`flex gap-8 items-center ${item.imagePosition === 'right' ? 'flex-row-reverse' : ''}`}>
                        <div className="w-1/2">
                          <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg" />
                        </div>
                        <div className="w-1/2 space-y-4">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Section Preview */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-center">Our Team</h2>
                  <div className="grid grid-cols-6 gap-4">
                    {editData.teamSection.teamMembers.slice(0, 6).map((member) => (
                      <div key={member.id} className="aspect-square">
                        <img src={member.img} alt="Team member" className="w-full h-full object-cover rounded-lg" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Section Preview */}
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">{editData.faqSection.title}</h2>
                    <p className="text-gray-600">{editData.faqSection.description}</p>
                  </div>
                  <div className="grid gap-4">
                    {editData.faqSection.faqItems.slice(0, 3).map((faq) => (
                      <div key={faq.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode - Show structure
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-600">Home Page Editor</h2>
                  <p className="text-gray-500 mt-2">Use the left panel to edit content, then preview your changes</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">Hero Section</p>
                      <Badge variant="outline" className="mt-1">4 Fields</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Settings className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium">Service</p>
                      <Badge variant="outline" className="mt-1">4 Fields</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Info className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">About</p>
                      <Badge variant="outline" className="mt-1">{editData.aboutSection.items.length} Items</Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <p className="text-sm font-medium">Team</p>
                      <Badge variant="outline" className="mt-1">{editData.teamSection.teamMembers.length} Members</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Play className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <p className="text-sm font-medium">Video</p>
                      <Badge variant="outline" className="mt-1">1 Field</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <HelpCircle className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                      <p className="text-sm font-medium">FAQ</p>
                      <Badge variant="outline" className="mt-1">{editData.faqSection.faqItems.length} Items</Badge>
                    </CardContent>
                  </Card>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  💡 Tip: Switch to Preview mode to see how your home page will look to visitors
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
