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
import { Switch } from "@/components/ui/switch"
import { Save, Eye, Edit3, MessageSquare, Phone, Settings, Globe } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getForm, updateForm } from "@/redux/actions/formActions";
import { FormData } from "@/redux/actions/formActions";

export default function FormEditorPage() {
  const dispatch = useAppDispatch();
  const { form, loading, error, success } = useAppSelector((state) => state.form);
  
  const [editData, setEditData] = useState<FormData | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch form data on component mount
  useEffect(() => {
    dispatch(getForm());
  }, [dispatch]);

  // Set edit data when form data is loaded
  useEffect(() => {
    if (form) {
      setEditData(form);
    }
  }, [form]);

  // Reset success state after showing it for a few seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // The success state will be reset on next action automatically
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSave = async () => {
    if (editData && editData._id) {
      try {
        console.log('Saving form data:', editData);
        const result = await dispatch(updateForm({
          formId: editData._id,
          title: editData.title,
          subtitle: editData.subtitle,
          responseTime: editData.responseTime,
          showWhatsApp: editData.showWhatsApp,
          whatsAppText: editData.whatsAppText,
          whatsAppLink: editData.whatsAppLink,
          submitButtonText: editData.submitButtonText,
          placeholders: editData.placeholders,
          defaultCountry: editData.defaultCountry
        }));
        console.log('Save result:', result);
      } catch (error) {
        console.error('Save error:', error);
      }
    } else {
      console.error('No edit data or ID available for saving');
    }
  };

  const handleGeneralChange = (field: string, value: string | boolean) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value
      });
    }
  };

  const handlePlaceholderChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        placeholders: {
          ...editData.placeholders,
          [field]: value
        }
      });
    }
  };

  const handleCountryChange = (value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        defaultCountry: value
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
                <BreadcrumbPage>Form Editor</BreadcrumbPage>
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
          <Button 
            onClick={() => {
              console.log('Save button clicked!');
              handleSave();
            }} 
            disabled={loading} 
            size="sm"
          >
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
                <TabsTrigger value="general" className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  General
                </TabsTrigger>
                <TabsTrigger value="placeholders" className="flex items-center gap-1">
                  <Edit3 className="w-3 h-3" />
                  Fields
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  WhatsApp
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Form Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Form Title</label>
                      <Input
                        value={editData.title}
                        onChange={(e) => handleGeneralChange('title', e.target.value)}
                        placeholder="Let's Talk Teeth!"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subtitle</label>
                      <Input
                        value={editData.subtitle}
                        onChange={(e) => handleGeneralChange('subtitle', e.target.value)}
                        placeholder="Online now"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Response Time</label>
                      <Input
                        value={editData.responseTime}
                        onChange={(e) => handleGeneralChange('responseTime', e.target.value)}
                        placeholder="avg. response time: 3 minutes"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Submit Button Text</label>
                      <Input
                        value={editData.submitButtonText}
                        onChange={(e) => handleGeneralChange('submitButtonText', e.target.value)}
                        placeholder="Send"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Placeholders Tab */}
              <TabsContent value="placeholders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit3 className="w-5 h-5" />
                      Form Field Labels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name Field Placeholder</label>
                      <Input
                        value={editData.placeholders.name}
                        onChange={(e) => handlePlaceholderChange('name', e.target.value)}
                        placeholder="Name*"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone Field Placeholder</label>
                      <Input
                        value={editData.placeholders.phone}
                        onChange={(e) => handlePlaceholderChange('phone', e.target.value)}
                        placeholder="Phone Number*"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Country Search Placeholder</label>
                      <Input
                        value={editData.placeholders.countrySearch}
                        onChange={(e) => handlePlaceholderChange('countrySearch', e.target.value)}
                        placeholder="Search country..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* WhatsApp Tab */}
              <TabsContent value="whatsapp" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      WhatsApp Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Enable WhatsApp Button</label>
                        <p className="text-xs text-gray-500">Show WhatsApp contact option</p>
                      </div>
                      <Switch
                        checked={editData.showWhatsApp}
                        onCheckedChange={(checked) => handleGeneralChange('showWhatsApp', checked)}
                      />
                    </div>
                    
                    {editData.showWhatsApp && (
                      <>
                        <div>
                          <label className="text-sm font-medium">WhatsApp Button Text</label>
                          <Input
                            value={editData.whatsAppText}
                            onChange={(e) => handleGeneralChange('whatsAppText', e.target.value)}
                            placeholder="Chat on WhatsApp"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">WhatsApp Link</label>
                          <Input
                            value={editData.whatsAppLink}
                            onChange={(e) => handleGeneralChange('whatsAppLink', e.target.value)}
                            placeholder="https://wa.me/905321234567"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Use format: https://wa.me/[country code][phone number]
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Form Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Default Country</label>
                      <select
                        value={editData.defaultCountry}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                      >
                        {editData.countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.name} ({country.phone})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        The country that will be selected by default
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">Country List</h4>
                      <p className="text-xs text-blue-600">
                        The country list is managed globally and cannot be edited here. 
                        Contact your administrator to modify available countries.
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {editData.countries.length} Countries Available
                      </Badge>
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
              // Preview Mode - Show actual form
              <div className="space-y-8">
                <div className="max-w-md mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow-lg border">
                    {/* Form Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {editData.title}
                      </h3>
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-600 text-sm font-medium">
                          {editData.subtitle}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {editData.responseTime}
                      </p>
                    </div>
                    
                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder={editData.placeholders.name}
                          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="flex">
                        <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50">
                          <span className="mr-2">
                            {editData.countries.find(c => c.code === editData.defaultCountry)?.flag}
                          </span>
                          <span className="text-sm">
                            {editData.countries.find(c => c.code === editData.defaultCountry)?.phone}
                          </span>
                        </div>
                        <input
                          type="tel"
                          placeholder={editData.placeholders.phone}
                          className="flex-1 p-3 border rounded-r-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      
                      <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                        {editData.submitButtonText}
                      </button>
                      
                      {editData.showWhatsApp && (
                        <button className="w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors">
                          {editData.whatsAppText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Settings Preview */}
                <div className="max-w-md mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">Form Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Default Country:</span>
                          <div className="mt-1">
                            {editData.countries.find(c => c.code === editData.defaultCountry)?.flag}{' '}
                            {editData.countries.find(c => c.code === editData.defaultCountry)?.name}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">WhatsApp:</span>
                          <div className="mt-1">
                            <Badge variant={editData.showWhatsApp ? "default" : "secondary"}>
                              {editData.showWhatsApp ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              // Edit Mode - Show structure
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-600">Contact Form Editor</h2>
                  <p className="text-gray-500 mt-2">Configure your contact form settings and preview changes</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">General</p>
                      <Badge variant="outline" className="mt-1">4 Fields</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Edit3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium">Placeholders</p>
                      <Badge variant="outline" className="mt-1">3 Labels</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Phone className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <p className="text-sm font-medium">WhatsApp</p>
                      <Badge variant={editData.showWhatsApp ? "default" : "secondary"} className="mt-1">
                        {editData.showWhatsApp ? "Enabled" : "Disabled"}
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Globe className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">Countries</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.countries.length} Available
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    ✅ Changes saved successfully!
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    ❌ Error: {error}
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
 