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
import { Save, Eye, Plus, Trash2, Edit3, Building, MapPin, Link as LinkIcon, Scale, Copyright } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFooter, updateFooter } from "@/redux/actions/footerActions";
import { FooterData } from "@/redux/actions/footerActions";

export default function FooterEditorPage() {
  const dispatch = useAppDispatch();
  const { footer, loading, error, success } = useAppSelector((state) => state.footer);
  
  const [editData, setEditData] = useState<FooterData | null>(null);
  const [activeTab, setActiveTab] = useState("company");
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch footer data on component mount
  useEffect(() => {
    dispatch(getFooter());
  }, [dispatch]);

  // Set edit data when footer data is loaded
  useEffect(() => {
    if (footer) {
      setEditData(footer);
    }
  }, [footer]);

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
        const result = await dispatch(updateFooter({
          footerId: editData._id,
          company: editData.company,
          office: editData.office,
          sitemap: editData.sitemap,
          legal: editData.legal,
          copyright: editData.copyright
        }));
      } catch (error) {
        console.error('Save error:', error);
      }
    } else {
      console.error('No edit data or ID available for saving');
    }
  };

  const handleCompanyChange = (field: string, value: string | string[]) => {
    if (editData) {
      setEditData({
        ...editData,
        company: {
          ...editData.company,
          [field]: value
        }
      });
    }
  };

  const handleOfficeChange = (field: string, value: any) => {
    if (editData) {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        const parentObj = editData.office[parent as keyof typeof editData.office] as any;
        setEditData({
          ...editData,
          office: {
            ...editData.office,
            [parent]: {
              ...parentObj,
              [child]: value
            }
          }
        });
      } else {
        setEditData({
          ...editData,
          office: {
            ...editData.office,
            [field]: value
          }
        });
      }
    }
  };

  const handleSitemapChange = (field: string, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        sitemap: {
          ...editData.sitemap,
          [field]: value
        }
      });
    }
  };

  const handleLegalChange = (field: string, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        legal: {
          ...editData.legal,
          [field]: value
        }
      });
    }
  };

  const handleCopyrightChange = (field: string, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        copyright: {
          ...editData.copyright,
          [field]: value
        }
      });
    }
  };

  const addSitemapLink = () => {
    if (editData) {
      const newLink = { text: "New Link", url: "/new-link" };
      handleSitemapChange('links', [...editData.sitemap.links, newLink]);
    }
  };

  const removeSitemapLink = (index: number) => {
    if (editData) {
      const newLinks = editData.sitemap.links.filter((_, i) => i !== index);
      handleSitemapChange('links', newLinks);
    }
  };

  const updateSitemapLink = (index: number, field: string, value: string) => {
    if (editData) {
      const newLinks = [...editData.sitemap.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      handleSitemapChange('links', newLinks);
    }
  };

  const addLegalLink = () => {
    if (editData) {
      const newLink = { text: "New Policy", url: "/new-policy" };
      handleLegalChange('links', [...editData.legal.links, newLink]);
    }
  };

  const removeLegalLink = (index: number) => {
    if (editData) {
      const newLinks = editData.legal.links.filter((_, i) => i !== index);
      handleLegalChange('links', newLinks);
    }
  };

  const updateLegalLink = (index: number, field: string, value: string) => {
    if (editData) {
      const newLinks = [...editData.legal.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      handleLegalChange('links', newLinks);
    }
  };

  const addSocialLink = () => {
    if (editData) {
      const newLink = { text: "New Social", url: "https://example.com" };
      handleCopyrightChange('socialLinks', [...editData.copyright.socialLinks, newLink]);
    }
  };

  const removeSocialLink = (index: number) => {
    if (editData) {
      const newLinks = editData.copyright.socialLinks.filter((_, i) => i !== index);
      handleCopyrightChange('socialLinks', newLinks);
    }
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    if (editData) {
      const newLinks = [...editData.copyright.socialLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      handleCopyrightChange('socialLinks', newLinks);
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
                <BreadcrumbPage>Footer Editor</BreadcrumbPage>
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="company" className="flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  Company
                </TabsTrigger>
                <TabsTrigger value="office" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Office
                </TabsTrigger>
                <TabsTrigger value="sitemap" className="flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  Sitemap
                </TabsTrigger>
                <TabsTrigger value="legal" className="flex items-center gap-1">
                  <Scale className="w-3 h-3" />
                  Legal
                </TabsTrigger>
                <TabsTrigger value="copyright" className="flex items-center gap-1">
                  <Copyright className="w-3 h-3" />
                  Copyright
                </TabsTrigger>
              </TabsList>

              {/* Company Tab */}
              <TabsContent value="company" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Logo (Light)</label>
                      <ImageUpload
                        value={editData.company.logo}
                        onChange={(url) => handleCompanyChange('logo', url)}
                        placeholder="Light logo URL"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Logo (Dark)</label>
                      <ImageUpload
                        value={editData.company.logoDark}
                        onChange={(url) => handleCompanyChange('logoDark', url)}
                        placeholder="Dark logo URL"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={editData.company.description}
                        onChange={(e) => handleCompanyChange('description', e.target.value)}
                        placeholder="Company description"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Office Tab */}
              <TabsContent value="office" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Office Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={editData.office.title}
                        onChange={(e) => handleOfficeChange('title', e.target.value)}
                        placeholder="Office"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Address</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-medium">Address Text</label>
                          <Textarea
                            value={editData.office.address.text}
                            onChange={(e) => handleOfficeChange('address.text', e.target.value)}
                            placeholder="Full address"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Maps URL</label>
                          <Input
                            value={editData.office.address.url}
                            onChange={(e) => handleOfficeChange('address.url', e.target.value)}
                            placeholder="Google Maps URL"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Phone</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">Display Text</label>
                          <Input
                            value={editData.office.phone.text}
                            onChange={(e) => handleOfficeChange('phone.text', e.target.value)}
                            placeholder="P: + 725 214 456"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Phone Number</label>
                          <Input
                            value={editData.office.phone.number}
                            onChange={(e) => handleOfficeChange('phone.number', e.target.value)}
                            placeholder="+725214456"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Email</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">Display Text</label>
                          <Input
                            value={editData.office.email.text}
                            onChange={(e) => handleOfficeChange('email.text', e.target.value)}
                            placeholder="E: contact@liko.com"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email Address</label>
                          <Input
                            value={editData.office.email.address}
                            onChange={(e) => handleOfficeChange('email.address', e.target.value)}
                            placeholder="contact@liko.com"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sitemap Tab */}
              <TabsContent value="sitemap" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5" />
                      Sitemap Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={editData.sitemap.title}
                        onChange={(e) => handleSitemapChange('title', e.target.value)}
                        placeholder="Sitemap"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Links</label>
                      <Button size="sm" variant="outline" onClick={addSitemapLink}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {editData.sitemap.links.map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Link Text"
                            value={link.text}
                            onChange={(e) => updateSitemapLink(index, 'text', e.target.value)}
                          />
                          <Input
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => updateSitemapLink(index, 'url', e.target.value)}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeSitemapLink(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Legal Tab */}
              <TabsContent value="legal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5" />
                      Legal & Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={editData.legal.title}
                        onChange={(e) => handleLegalChange('title', e.target.value)}
                        placeholder="Legal & Policies"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Policy Links</label>
                      <Button size="sm" variant="outline" onClick={addLegalLink}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {editData.legal.links.map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Policy Name"
                            value={link.text}
                            onChange={(e) => updateLegalLink(index, 'text', e.target.value)}
                          />
                          <Input
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => updateLegalLink(index, 'url', e.target.value)}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeLegalLink(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Copyright Tab */}
              <TabsContent value="copyright" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Copyright className="w-5 h-5" />
                      Copyright & Social
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Copyright Text</label>
                      <Input
                        value={editData.copyright.text}
                        onChange={(e) => handleCopyrightChange('text', e.target.value)}
                        placeholder="All rights reserved — {year} © Company"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Use {"{year}"} to automatically insert current year
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Social Links</label>
                      <Button size="sm" variant="outline" onClick={addSocialLink}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {editData.copyright.socialLinks.map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Platform Name"
                            value={link.text}
                            onChange={(e) => updateSocialLink(index, 'text', e.target.value)}
                          />
                          <Input
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeSocialLink(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
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
                {/* Footer Preview */}
                <div className="border rounded-lg overflow-hidden bg-gray-900 text-white">
                  <div className="p-8">
                    <div className="grid md:grid-cols-4 gap-8">
                      {/* Company Section */}
                      <div>
                        <img 
                          src={editData.company.logo} 
                          alt="logo"
                          className="w-32 h-auto mb-4"
                        />
                        <p className="text-gray-300 text-sm">
                          {editData.company.description}
                        </p>
                      </div>
                      
                      {/* Office Section */}
                      <div>
                        <h4 className="font-semibold mb-4">{editData.office.title}</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <div>
                            <a href={editData.office.address.url} target="_blank" className="hover:text-white">
                              {editData.office.address.text}
                            </a>
                          </div>
                          <div>
                            <a href={`tel:${editData.office.phone.number}`} className="hover:text-white">
                              {editData.office.phone.text}
                            </a>
                          </div>
                          <div>
                            <a href={`mailto:${editData.office.email.address}`} className="hover:text-white">
                              {editData.office.email.text}
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      {/* Sitemap Section */}
                      <div>
                        <h4 className="font-semibold mb-4">{editData.sitemap.title}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          {editData.sitemap.links.map((link, index) => (
                            <li key={index}>
                              <a href={link.url} className="hover:text-white">{link.text}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Legal Section */}
                      <div>
                        <h4 className="font-semibold mb-4">{editData.legal.title}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          {editData.legal.links.map((link, index) => (
                            <li key={index}>
                              <a href={link.url} className="hover:text-white">{link.text}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Copyright Section */}
                  <div className="border-t border-gray-700 p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <p className="text-sm text-gray-400">
                        {editData.copyright.text.replace('{year}', new Date().getFullYear().toString())}
                      </p>
                      <div className="flex space-x-4 mt-2 md:mt-0">
                        {editData.copyright.socialLinks.map((link, index) => (
                          <a key={index} href={link.url} className="text-sm text-gray-400 hover:text-white">
                            {link.text}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logo Variants */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-white">
                    <h3 className="text-sm font-medium mb-2">Light Logo</h3>
                    <img 
                      src={editData.company.logo} 
                      alt="light logo"
                      className="w-32 h-auto"
                    />
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-900">
                    <h3 className="text-sm font-medium mb-2 text-white">Dark Logo</h3>
                    <img 
                      src={editData.company.logoDark} 
                      alt="dark logo"
                      className="w-32 h-auto"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode - Show structure
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-600">Footer Editor</h2>
                  <p className="text-gray-500 mt-2">Use the left panel to edit footer content, then preview your changes</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-5 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">Company</p>
                      <Badge variant="outline" className="mt-1">2 Logos</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium">Office</p>
                      <Badge variant="outline" className="mt-1">Contact Info</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <LinkIcon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <p className="text-sm font-medium">Sitemap</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.sitemap.links.length} Links
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Scale className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">Legal</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.legal.links.length} Policies
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Copyright className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                      <p className="text-sm font-medium">Copyright</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.copyright.socialLinks.length} Social
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