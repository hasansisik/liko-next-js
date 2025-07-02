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
import { Save, Eye, Plus, Trash2, Edit3, Image, Type, Users, MapPin, Phone, Mail } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getContact, updateContact } from "@/redux/actions/contactActions";
import { ContactData } from "@/redux/actions/contactActions";

export default function ContactEditorPage() {
  const dispatch = useAppDispatch();
  const { contact, loading, error, success } = useAppSelector((state) => state.contact);
  
  const [editData, setEditData] = useState<ContactData | null>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch contact data on component mount
  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  // Set edit data when contact data is loaded
  useEffect(() => {
    if (contact) {
      setEditData(contact);
    }
  }, [contact]);

  const handleSave = async () => {
    if (editData && editData._id) {
      await dispatch(updateContact({
        contactId: editData._id,
        hero: editData.hero,
        contactForm: editData.contactForm,
        contactInfo: editData.contactInfo
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

  const handleContactFormChange = (field: string, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        contactForm: {
          ...editData.contactForm,
          [field]: value
        }
      });
    }
  };

  const handleFormFieldChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        contactForm: {
          ...editData.contactForm,
          form: {
            ...editData.contactForm.form,
            [field]: value
          }
        }
      });
    }
  };

  const handleSocialMediaChange = (index: number, field: string, value: string) => {
    if (editData) {
      const newSocialMedia = [...editData.contactForm.socialMedia];
      newSocialMedia[index] = {
        ...newSocialMedia[index],
        [field]: value
      };
      handleContactFormChange('socialMedia', newSocialMedia);
    }
  };

  const addSocialMedia = () => {
    if (editData) {
      const newId = Math.max(...editData.contactForm.socialMedia.map(s => s.id)) + 1;
      const newSocialMedia = [...editData.contactForm.socialMedia, {
        id: newId,
        name: "New Platform",
        link: "https://example.com"
      }];
      handleContactFormChange('socialMedia', newSocialMedia);
    }
  };

  const removeSocialMedia = (index: number) => {
    if (editData) {
      const newSocialMedia = editData.contactForm.socialMedia.filter((_, i) => i !== index);
      handleContactFormChange('socialMedia', newSocialMedia);
    }
  };

  const handleLocationChange = (index: number, field: string, value: string) => {
    if (editData) {
      const newLocations = [...editData.contactInfo.locations];
      newLocations[index] = {
        ...newLocations[index],
        [field]: value
      };
      setEditData({
        ...editData,
        contactInfo: {
          ...editData.contactInfo,
          locations: newLocations
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
                <BreadcrumbPage>Contact Editor</BreadcrumbPage>
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hero" className="flex items-center gap-1">
                  <Image className="w-3 h-3" />
                  Hero
                </TabsTrigger>
                <TabsTrigger value="form" className="flex items-center gap-1">
                  <Type className="w-3 h-3" />
                  Form
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="location" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location
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
                        placeholder="Liko Studio"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={editData.hero.title}
                        onChange={(e) => handleHeroChange('title', e.target.value)}
                        placeholder="Get in touch"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Form Tab */}
              <TabsContent value="form" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      Contact Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Form Title</label>
                        <Input
                          value={editData.contactForm.title}
                          onChange={(e) => handleContactFormChange('title', e.target.value)}
                          placeholder="Send a Message"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Form Subtitle</label>
                        <Input
                          value={editData.contactForm.subtitle}
                          onChange={(e) => handleContactFormChange('subtitle', e.target.value)}
                          placeholder="Contact Us"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Form Fields</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-500">Name Label</label>
                          <Input
                            className="h-8"
                            value={editData.contactForm.form.nameLabel}
                            onChange={(e) => handleFormFieldChange('nameLabel', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Name Placeholder</label>
                          <Input
                            className="h-8"
                            value={editData.contactForm.form.namePlaceholder}
                            onChange={(e) => handleFormFieldChange('namePlaceholder', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Subject Label</label>
                          <Input
                            className="h-8"
                            value={editData.contactForm.form.subjectLabel}
                            onChange={(e) => handleFormFieldChange('subjectLabel', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Subject Placeholder</label>
                          <Input
                            className="h-8"
                            value={editData.contactForm.form.subjectPlaceholder}
                            onChange={(e) => handleFormFieldChange('subjectPlaceholder', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Message Label</label>
                        <Input
                          className="h-8"
                          value={editData.contactForm.form.messageLabel}
                          onChange={(e) => handleFormFieldChange('messageLabel', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Message Placeholder</label>
                        <Input
                          className="h-8"
                          value={editData.contactForm.form.messagePlaceholder}
                          onChange={(e) => handleFormFieldChange('messagePlaceholder', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Button Text</label>
                        <Input
                          className="h-8"
                          value={editData.contactForm.form.buttonText}
                          onChange={(e) => handleFormFieldChange('buttonText', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Social Tab */}
              <TabsContent value="social" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Social Text</label>
                      <Input
                        value={editData.contactForm.socialText}
                        onChange={(e) => handleContactFormChange('socialText', e.target.value)}
                        placeholder="Follow us"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Social Links</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={addSocialMedia}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {editData.contactForm.socialMedia.map((social, index) => (
                          <div key={social.id} className="flex gap-2 p-2 border rounded">
                            <div className="flex-1">
                              <Input
                                className="h-8"
                                placeholder="Platform name"
                                value={social.name}
                                onChange={(e) => handleSocialMediaChange(index, 'name', e.target.value)}
                              />
                            </div>
                            <div className="flex-1">
                              <Input
                                className="h-8"
                                placeholder="URL"
                                value={social.link}
                                onChange={(e) => handleSocialMediaChange(index, 'link', e.target.value)}
                              />
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeSocialMedia(index)}
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

              {/* Location Tab */}
              <TabsContent value="location" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Location Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editData.contactInfo.locations.map((location, index) => (
                      <div key={location.id} className="space-y-3 p-3 border rounded">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-500">Country</label>
                            <Input
                              className="h-8"
                              value={location.country}
                              onChange={(e) => handleLocationChange(index, 'country', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Time</label>
                            <Input
                              className="h-8"
                              value={location.time}
                              onChange={(e) => handleLocationChange(index, 'time', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Location Title</label>
                          <Input
                            className="h-8"
                            value={location.locationTitle}
                            onChange={(e) => handleLocationChange(index, 'locationTitle', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Address</label>
                          <Textarea
                            rows={2}
                            value={location.address}
                            onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-500">Phone</label>
                            <Input
                              className="h-8"
                              value={location.phone}
                              onChange={(e) => handleLocationChange(index, 'phone', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Email</label>
                            <Input
                              className="h-8"
                              value={location.email}
                              onChange={(e) => handleLocationChange(index, 'email', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Maps URL</label>
                          <Input
                            className="h-8"
                            value={location.mapsUrl}
                            onChange={(e) => handleLocationChange(index, 'mapsUrl', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
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
              // Preview Mode
              <div className="space-y-8">
                {/* Hero Preview */}
                <div 
                  className="relative h-64 rounded-lg bg-cover bg-center flex items-center justify-center text-white"
                  style={{ 
                    backgroundImage: editData.hero.backgroundImage 
                      ? `url(${editData.hero.backgroundImage})` 
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
                  <div className="relative text-center space-y-2 px-4">
                    <p className="text-lg opacity-90">{editData.hero.subtitle}</p>
                    <h1 className="text-3xl font-bold">{editData.hero.title}</h1>
                  </div>
                  {!editData.hero.backgroundImage && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        No Image - Default Background
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Contact Form Preview */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">{editData.contactForm.subtitle}</h3>
                    <h2 className="text-2xl font-bold mb-6">{editData.contactForm.title}</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">{editData.contactForm.form.nameLabel}</label>
                        <input className="w-full p-2 border rounded" placeholder={editData.contactForm.form.namePlaceholder} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{editData.contactForm.form.subjectLabel}</label>
                        <input className="w-full p-2 border rounded" placeholder={editData.contactForm.form.subjectPlaceholder} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{editData.contactForm.form.messageLabel}</label>
                        <textarea className="w-full p-2 border rounded" rows={4} placeholder={editData.contactForm.form.messagePlaceholder}></textarea>
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded">
                        {editData.contactForm.form.buttonText}
                      </button>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-medium mb-3">{editData.contactForm.socialText}</p>
                      <div className="flex gap-3">
                        {editData.contactForm.socialMedia.map((social) => (
                          <a key={social.id} href={social.link} className="text-blue-600 hover:underline text-sm">
                            {social.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-6">Locations</h3>
                    {editData.contactInfo.locations.map((location) => (
                      <div key={location.id} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <img src={location.img} alt={location.country} className="w-6 h-4 object-cover rounded" />
                          <span className="font-medium">{location.country}</span>
                          <span className="text-sm text-gray-500">{location.time}</span>
                        </div>
                        <h4 className="font-medium">{location.locationTitle}</h4>
                        <div dangerouslySetInnerHTML={{ __html: location.address }} className="text-sm text-gray-600" />
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {location.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {location.email}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-600">Contact Page Editor</h2>
                  <p className="text-gray-500 mt-2">Use the left panel to edit content, then preview your changes</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Image className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">Hero Section</p>
                      <Badge variant="outline" className="mt-1">3 Fields</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Type className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium">Contact Form</p>
                      <Badge variant="outline" className="mt-1">7 Fields</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">Social Media</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.contactForm.socialMedia.length} Links
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <p className="text-sm font-medium">Locations</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.contactInfo.locations.length} Places
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
