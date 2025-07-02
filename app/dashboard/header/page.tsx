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
import { Save, Eye, Plus, Trash2, Edit3, Image, Menu, Smartphone, Settings, Palette, Sidebar, Type, Layout } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getHeader, updateHeader } from "@/redux/actions/headerActions";
import { HeaderData } from "@/redux/actions/headerActions";
import { Switch } from "@/components/ui/switch";

export default function HeaderEditorPage() {
  const dispatch = useAppDispatch();
  const { header, loading, error, success } = useAppSelector((state) => state.header);
  
  const [editData, setEditData] = useState<HeaderData | null>(null);
  const [activeTab, setActiveTab] = useState("logo");
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch header data on component mount
  useEffect(() => {
    dispatch(getHeader());
  }, [dispatch]);

  // Set edit data when header data is loaded
  useEffect(() => {
    if (header) {
      setEditData(header);
    }
  }, [header]);

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

        const result = await dispatch(updateHeader({
          headerId: editData._id,
          logo: editData.logo,
          navigation: editData.navigation,
          mobile: editData.mobile,
          dialog: editData.dialog,
          styling: editData.styling
        }));
        
        if (result.type.endsWith('/fulfilled')) {
        } else if (result.type.endsWith('/rejected')) {
          console.error('Save failed:', result.payload);
        }
      } catch (error) {
        console.error('Save error:', error);
      }
    } else {
      console.error('No edit data or ID available for saving');
    }
  };

  const handleLogoChange = (field: string, value: any) => {
    if (editData) {
      if (field.includes('.')) {
        const [parent, child, grandchild] = field.split('.');
        const parentObj = editData.logo[parent as keyof typeof editData.logo] as any;
        setEditData({
          ...editData,
          logo: {
            ...editData.logo,
            [parent]: {
              ...parentObj,
              [child]: grandchild ? {
                ...parentObj[child],
                [grandchild]: value
              } : value
            }
          }
        });
      } else {
        setEditData({
          ...editData,
          logo: {
            ...editData.logo,
            [field]: value
          }
        });
      }
    }
  };

  const handleNavigationChange = (field: string, value: any) => {
    if (editData) {
      if (field === 'menus') {
        setEditData({
          ...editData,
          navigation: {
            ...editData.navigation,
            menus: value
          }
        });
      } else if (field.startsWith('cta.')) {
        const ctaField = field.split('.')[1];
        setEditData({
          ...editData,
          navigation: {
            ...editData.navigation,
            cta: {
              ...editData.navigation.cta,
              [ctaField]: value
            }
          }
        });
      }
    }
  };

  const handleMobileChange = (field: string, value: any) => {
    if (editData) {
      if (field.includes('.')) {
        const parts = field.split('.');
        let newMobile = { ...editData.mobile };
        
        // Ensure offcanvas structure exists
        if (!newMobile.offcanvas) {
          newMobile.offcanvas = {
            logo: {
              src: "/assets/img/logo/logo.png",
              alt: "logo",
              width: 120,
              height: 40
            },
            information: {
              title: "Information",
              phone: {
                text: "+ 4 20 7700 1007",
                number: "+420777001007"
              },
              email: {
                text: "hello@diego.com",
                address: "hello@diego.com"
              },
              address: {
                text: "Avenue de Roma 158b, Lisboa",
                link: ""
              }
            },
            socialMedia: {
              title: "Follow Us",
              links: [
                {
                  platform: "Instagram",
                  url: "#",
                  icon: "InstagramTwo"
                },
                {
                  platform: "YouTube",
                  url: "#", 
                  icon: "Youtube"
                }
              ]
            }
          };
        }
        
        if (parts.length === 2) {
          const [parent, child] = parts;
          const parentObj = newMobile[parent as keyof typeof newMobile] as any;
          newMobile = {
            ...newMobile,
            [parent]: {
              ...parentObj,
              [child]: value
            }
          };
        } else if (parts.length === 3) {
          const [parent, child, grandchild] = parts;
          const parentObj = newMobile[parent as keyof typeof newMobile] as any;
          const childObj = parentObj?.[child] || {};
          newMobile = {
            ...newMobile,
            [parent]: {
              ...parentObj,
              [child]: {
                ...childObj,
                [grandchild]: value
              }
            }
          };
        } else if (parts.length === 4) {
          const [parent, child, grandchild, greatGrandchild] = parts;
          const parentObj = newMobile[parent as keyof typeof newMobile] as any;
          const childObj = parentObj?.[child] || {};
          const grandchildObj = childObj?.[grandchild] || {};
          newMobile = {
            ...newMobile,
            [parent]: {
              ...parentObj,
              [child]: {
                ...childObj,
                [grandchild]: {
                  ...grandchildObj,
                  [greatGrandchild]: value
                }
              }
            }
          };
        }
        
        setEditData({
          ...editData,
          mobile: newMobile
        });
      } else {
        setEditData({
          ...editData,
          mobile: {
            ...editData.mobile,
            [field]: value
          }
        });
      }
    }
  };

  const handleDialogChange = (field: string, value: any) => {
    if (editData) {
      if (field.includes('.')) {
        const parts = field.split('.');
        if (parts.length === 2) {
          const [parent, child] = parts;
          const parentObj = editData.dialog[parent as keyof typeof editData.dialog] as any;
          setEditData({
            ...editData,
            dialog: {
              ...editData.dialog,
              [parent]: {
                ...parentObj,
                [child]: value
              }
            }
          });
        } else if (parts.length === 3) {
          const [parent, child, grandchild] = parts;
          const parentObj = editData.dialog[parent as keyof typeof editData.dialog] as any;
          setEditData({
            ...editData,
            dialog: {
              ...editData.dialog,
              [parent]: {
                ...parentObj,
                [child]: {
                  ...parentObj[child],
                  [grandchild]: value
                }
              }
            }
          });
        }
      } else {
        setEditData({
          ...editData,
          dialog: {
            ...editData.dialog,
            [field]: value
          }
        });
      }
    }
  };

  const handleStylingChange = (field: string, value: any) => {
    if (editData) {
      const parts = field.split('.');
      if (parts.length === 2) {
        const [parent, child] = parts;
        const parentObj = editData.styling[parent as keyof typeof editData.styling] as any;
        setEditData({
          ...editData,
          styling: {
            ...editData.styling,
            [parent]: {
              ...parentObj,
              [child]: value
            }
          }
        });
      } else if (parts.length === 3) {
        const [parent, child, grandchild] = parts;
        const parentObj = editData.styling[parent as keyof typeof editData.styling] as any;
        setEditData({
          ...editData,
          styling: {
            ...editData.styling,
            [parent]: {
              ...parentObj,
              [child]: {
                ...parentObj[child],
                [grandchild]: value
              }
            }
          }
        });
      }
    }
  };

  const addMenuItem = () => {
    if (editData) {
      const newId = Math.max(...editData.navigation.menus.map(m => m.id)) + 1;
      const newMenu = {
        id: newId,
        title: "New Menu",
        url: "/new-menu",
        hasDropdown: false
      };
      handleNavigationChange('menus', [...editData.navigation.menus, newMenu]);
    }
  };

  const removeMenuItem = (index: number) => {
    if (editData) {
      const newMenus = editData.navigation.menus.filter((_, i) => i !== index);
      handleNavigationChange('menus', newMenus);
    }
  };

  const updateMenuItem = (index: number, field: string, value: any) => {
    if (editData) {
      const newMenus = [...editData.navigation.menus];
      newMenus[index] = { ...newMenus[index], [field]: value };
      handleNavigationChange('menus', newMenus);
    }
  };

  const addSubMenuItem = (menuIndex: number) => {
    if (editData) {
      const newMenus = [...editData.navigation.menus];
      const menu = newMenus[menuIndex];
      if (!menu.subMenus) menu.subMenus = [];
      const newId = menu.subMenus.length > 0 ? Math.max(...menu.subMenus.map(sm => sm.id)) + 1 : 1;
      menu.subMenus.push({
        id: newId,
        title: "New Submenu",
        url: "/new-submenu"
      });
      menu.hasDropdown = true;
      handleNavigationChange('menus', newMenus);
    }
  };

  const removeSubMenuItem = (menuIndex: number, subMenuIndex: number) => {
    if (editData) {
      const newMenus = [...editData.navigation.menus];
      const menu = newMenus[menuIndex];
      if (menu.subMenus) {
        menu.subMenus = menu.subMenus.filter((_, i) => i !== subMenuIndex);
        if (menu.subMenus.length === 0) {
          menu.hasDropdown = false;
          delete menu.subMenus;
        }
      }
      handleNavigationChange('menus', newMenus);
    }
  };

  const updateSubMenuItem = (menuIndex: number, subMenuIndex: number, field: string, value: any) => {
    if (editData) {
      const newMenus = [...editData.navigation.menus];
      const menu = newMenus[menuIndex];
      if (menu.subMenus) {
        menu.subMenus[subMenuIndex] = { ...menu.subMenus[subMenuIndex], [field]: value };
      }
      handleNavigationChange('menus', newMenus);
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
                <BreadcrumbPage>Header Editor</BreadcrumbPage>
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
                <TabsTrigger value="logo" className="flex items-center gap-1">
                  <Image className="w-3 h-3" />
                  Logo
                </TabsTrigger>
                <TabsTrigger value="navigation" className="flex items-center gap-1">
                  <Menu className="w-3 h-3" />
                  Nav
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="dialog" className="flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  Dialog
                </TabsTrigger>
                <TabsTrigger value="styling" className="flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  Style
                </TabsTrigger>
              </TabsList>

              {/* Logo Tab */}
              <TabsContent value="logo" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Logo Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Default Logo</label>
                      <ImageUpload
                        value={editData.logo.default}
                        onChange={(url) => handleLogoChange('default', url)}
                        placeholder="Default logo URL"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Dark Logo</label>
                      <ImageUpload
                        value={editData.logo.dark}
                        onChange={(url) => handleLogoChange('dark', url)}
                        placeholder="Dark logo URL"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Sticky Logo</label>
                      <ImageUpload
                        value={editData.logo.sticky}
                        onChange={(url) => handleLogoChange('sticky', url)}
                        placeholder="Sticky logo URL"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Alt Text</label>
                      <Input
                        value={editData.logo.alt}
                        onChange={(e) => handleLogoChange('alt', e.target.value)}
                        placeholder="Logo alt text"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Default Width</label>
                        <Input
                          type="number"
                          value={editData.logo.dimensions.default.width}
                          onChange={(e) => handleLogoChange('dimensions.default.width', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Default Height</label>
                        <Input
                          type="number"
                          value={editData.logo.dimensions.default.height}
                          onChange={(e) => handleLogoChange('dimensions.default.height', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Sticky Width</label>
                        <Input
                          type="number"
                          value={editData.logo.dimensions.sticky.width}
                          onChange={(e) => handleLogoChange('dimensions.sticky.width', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Sticky Height</label>
                        <Input
                          type="number"
                          value={editData.logo.dimensions.sticky.height}
                          onChange={(e) => handleLogoChange('dimensions.sticky.height', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Navigation Tab */}
              <TabsContent value="navigation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Menu className="w-5 h-5" />
                      Navigation Menus
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Menu Items</label>
                      <Button size="sm" variant="outline" onClick={addMenuItem}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {editData.navigation.menus.map((menu, index) => (
                        <div key={menu.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Menu {index + 1}</h4>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeMenuItem(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Title"
                              value={menu.title}
                              onChange={(e) => updateMenuItem(index, 'title', e.target.value)}
                            />
                            <Input
                              placeholder="URL"
                              value={menu.url}
                              onChange={(e) => updateMenuItem(index, 'url', e.target.value)}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={menu.hasDropdown}
                              onCheckedChange={(checked) => updateMenuItem(index, 'hasDropdown', checked)}
                            />
                            <label className="text-sm">Has Dropdown</label>
                          </div>
                          
                          {menu.hasDropdown && (
                            <div className="ml-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Submenu Items</label>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addSubMenuItem(index)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              {menu.subMenus?.map((subMenu, subIndex) => (
                                <div key={subMenu.id} className="flex gap-2">
                                  <Input
                                    placeholder="Title"
                                    value={subMenu.title}
                                    onChange={(e) => updateSubMenuItem(index, subIndex, 'title', e.target.value)}
                                  />
                                  <Input
                                    placeholder="URL"
                                    value={subMenu.url}
                                    onChange={(e) => updateSubMenuItem(index, subIndex, 'url', e.target.value)}
                                  />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeSubMenuItem(index, subIndex)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Settings */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Call to Action Button</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="CTA Text"
                          value={editData.navigation.cta.text}
                          onChange={(e) => handleNavigationChange('cta.text', e.target.value)}
                        />
                        <Input
                          placeholder="CTA Action"
                          value={editData.navigation.cta.action}
                          onChange={(e) => handleNavigationChange('cta.action', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Mobile Tab */}
              <TabsContent value="mobile" className="space-y-4">
                {/* Hamburger Icon Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Menu className="w-5 h-5" />
                      Hamburger Icon
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Hamburger Lines</label>
                      <Input
                        type="number"
                        value={editData.mobile.hamburgerIcon.lines}
                        onChange={(e) => handleMobileChange('hamburgerIcon.lines', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editData.mobile.hamburgerIcon.animation}
                        onCheckedChange={(checked) => handleMobileChange('hamburgerIcon.animation', checked)}
                      />
                      <label className="text-sm">Enable Animation</label>
                    </div>
                  </CardContent>
                </Card>

                {/* Offcanvas Logo Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Offcanvas Logo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Logo URL</label>
                      <ImageUpload
                        value={editData.mobile.offcanvas?.logo?.src || "/assets/img/logo/logo.png"}
                        onChange={(url) => handleMobileChange('offcanvas.logo.src', url)}
                        placeholder="Offcanvas logo URL"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-sm font-medium">Alt Text</label>
                        <Input
                          value={editData.mobile.offcanvas?.logo?.alt || "logo"}
                          onChange={(e) => handleMobileChange('offcanvas.logo.alt', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Width</label>
                        <Input
                          type="number"
                          value={editData.mobile.offcanvas?.logo?.width || 120}
                          onChange={(e) => handleMobileChange('offcanvas.logo.width', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Height</label>
                        <Input
                          type="number"
                          value={editData.mobile.offcanvas?.logo?.height || 40}
                          onChange={(e) => handleMobileChange('offcanvas.logo.height', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Information Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      Information Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={editData.mobile.offcanvas?.information?.title || "Information"}
                        onChange={(e) => handleMobileChange('offcanvas.information.title', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium">Phone Display Text</label>
                        <Input
                          value={editData.mobile.offcanvas?.information?.phone?.text || "+ 4 20 7700 1007"}
                          onChange={(e) => handleMobileChange('offcanvas.information.phone.text', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone Number (tel:)</label>
                        <Input
                          value={editData.mobile.offcanvas?.information?.phone?.number || "+420777001007"}
                          onChange={(e) => handleMobileChange('offcanvas.information.phone.number', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium">Email Display Text</label>
                        <Input
                          value={editData.mobile.offcanvas?.information?.email?.text || "hello@diego.com"}
                          onChange={(e) => handleMobileChange('offcanvas.information.email.text', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <Input
                          value={editData.mobile.offcanvas?.information?.email?.address || "hello@diego.com"}
                          onChange={(e) => handleMobileChange('offcanvas.information.email.address', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium">Address Text</label>
                        <Input
                          value={editData.mobile.offcanvas?.information?.address?.text || "Avenue de Roma 158b, Lisboa"}
                          onChange={(e) => handleMobileChange('offcanvas.information.address.text', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Address Link (optional)</label>
                        <Input
                          value={editData.mobile.offcanvas?.information?.address?.link || ""}
                          onChange={(e) => handleMobileChange('offcanvas.information.address.link', e.target.value)}
                          placeholder="https://maps.google.com/..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="w-5 h-5" />
                      Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={editData.mobile.offcanvas?.socialMedia?.title || "Follow Us"}
                        onChange={(e) => handleMobileChange('offcanvas.socialMedia.title', e.target.value)}
                      />
                    </div>
                    
                    {/* Social Media Links */}
                    <div className="space-y-3">
                      {(editData.mobile.offcanvas?.socialMedia?.links || []).map((social, index) => (
                        <div key={index} className="border p-3 rounded">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Social Link {index + 1}</h5>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (editData.mobile.offcanvas?.socialMedia?.links) {
                                  const newLinks = editData.mobile.offcanvas.socialMedia.links.filter((_, i) => i !== index);
                                  handleMobileChange('offcanvas.socialMedia.links', newLinks);
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-sm font-medium">Platform</label>
                              <Input
                                value={social.platform}
                                onChange={(e) => {
                                  if (editData.mobile.offcanvas?.socialMedia?.links) {
                                    const newLinks = [...editData.mobile.offcanvas.socialMedia.links];
                                    newLinks[index] = { ...newLinks[index], platform: e.target.value };
                                    handleMobileChange('offcanvas.socialMedia.links', newLinks);
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">URL</label>
                              <Input
                                value={social.url}
                                onChange={(e) => {
                                  if (editData.mobile.offcanvas?.socialMedia?.links) {
                                    const newLinks = [...editData.mobile.offcanvas.socialMedia.links];
                                    newLinks[index] = { ...newLinks[index], url: e.target.value };
                                    handleMobileChange('offcanvas.socialMedia.links', newLinks);
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Icon</label>
                              <Input
                                value={social.icon}
                                onChange={(e) => {
                                  if (editData.mobile.offcanvas?.socialMedia?.links) {
                                    const newLinks = [...editData.mobile.offcanvas.socialMedia.links];
                                    newLinks[index] = { ...newLinks[index], icon: e.target.value };
                                    handleMobileChange('offcanvas.socialMedia.links', newLinks);
                                  }
                                }}
                                placeholder="InstagramTwo, Youtube, etc."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (editData.mobile.offcanvas?.socialMedia?.links) {
                            const newLinks = [
                              ...editData.mobile.offcanvas.socialMedia.links,
                              {
                                platform: "New Platform",
                                url: "#",
                                icon: "InstagramTwo"
                              }
                            ];
                            handleMobileChange('offcanvas.socialMedia.links', newLinks);
                          } else {
                            // Initialize offcanvas structure if it doesn't exist
                            const newLinks = [
                              {
                                platform: "New Platform",
                                url: "#",
                                icon: "InstagramTwo"
                              }
                            ];
                            handleMobileChange('offcanvas.socialMedia.links', newLinks);
                          }
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Social Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>



              {/* Dialog Tab */}
              <TabsContent value="dialog" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Dialog Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editData.dialog.enabled}
                        onCheckedChange={(checked) => handleDialogChange('enabled', checked)}
                      />
                      <label className="text-sm">Enable Dialog</label>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Backdrop Color</label>
                      <Input
                        value={editData.dialog.backdrop.backgroundColor}
                        onChange={(e) => handleDialogChange('backdrop.backgroundColor', e.target.value)}
                        placeholder="rgba(0, 0, 0, 0.5)"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editData.dialog.backdrop.closeOnClick}
                        onCheckedChange={(checked) => handleDialogChange('backdrop.closeOnClick', checked)}
                      />
                      <label className="text-sm">Close on Backdrop Click</label>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium">Close Button Text</label>
                        <Input
                          value={editData.dialog.closeButton.text}
                          onChange={(e) => handleDialogChange('closeButton.text', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Close Button Size</label>
                        <Input
                          value={editData.dialog.closeButton.size}
                          onChange={(e) => handleDialogChange('closeButton.size', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium">Close Button Top</label>
                        <Input
                          value={editData.dialog.closeButton.position.top}
                          onChange={(e) => handleDialogChange('closeButton.position.top', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Close Button Right</label>
                        <Input
                          value={editData.dialog.closeButton.position.right}
                          onChange={(e) => handleDialogChange('closeButton.position.right', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Styling Tab */}
              <TabsContent value="styling" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Styling Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Container</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">Padding</label>
                          <Input
                            value={editData.styling.container.padding}
                            onChange={(e) => handleStylingChange('container.padding', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Max Width</label>
                          <Input
                            value={editData.styling.container.maxWidth}
                            onChange={(e) => handleStylingChange('container.maxWidth', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Header</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-medium">Padding</label>
                          <Input
                            value={editData.styling.header.padding}
                            onChange={(e) => handleStylingChange('header.padding', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Transition</label>
                          <Input
                            value={editData.styling.header.transition}
                            onChange={(e) => handleStylingChange('header.transition', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-sm font-medium">Sticky Background</label>
                            <Input
                              value={editData.styling.header.stickyBackground}
                              onChange={(e) => handleStylingChange('header.stickyBackground', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Transparent Background</label>
                            <Input
                              value={editData.styling.header.transparentBackground}
                              onChange={(e) => handleStylingChange('header.transparentBackground', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-sm font-medium">Default Box Shadow</label>
                            <Input
                              value={editData.styling.header.boxShadow.default}
                              onChange={(e) => handleStylingChange('header.boxShadow.default', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Sticky Box Shadow</label>
                            <Input
                              value={editData.styling.header.boxShadow.sticky}
                              onChange={(e) => handleStylingChange('header.boxShadow.sticky', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Hamburger Colors</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">Default</label>
                          <Input
                            value={editData.styling.colors.hamburger.default}
                            onChange={(e) => handleStylingChange('colors.hamburger.default', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Black</label>
                          <Input
                            value={editData.styling.colors.hamburger.black}
                            onChange={(e) => handleStylingChange('colors.hamburger.black', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">White</label>
                          <Input
                            value={editData.styling.colors.hamburger.white}
                            onChange={(e) => handleStylingChange('colors.hamburger.white', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Sticky</label>
                          <Input
                            value={editData.styling.colors.hamburger.sticky}
                            onChange={(e) => handleStylingChange('colors.hamburger.sticky', e.target.value)}
                          />
                        </div>
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
                {/* Header Preview */}
                <div className="border rounded-lg overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between"
                    style={{
                      backgroundColor: editData.styling.header.stickyBackground,
                      boxShadow: editData.styling.header.boxShadow.sticky
                    }}
                  >
                    <div className="flex items-center">
                      <img 
                        src={editData.logo.sticky} 
                        alt={editData.logo.alt}
                        width={editData.logo.dimensions.sticky.width}
                        height={editData.logo.dimensions.sticky.height}
                        className="object-contain"
                      />
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                      {editData.navigation.menus.map((menu) => (
                        <div key={menu.id} className="relative group">
                          <a 
                            href={menu.url} 
                            className="text-sm font-medium hover:text-blue-600 transition-colors"
                          >
                            {menu.title}
                          </a>
                          {menu.hasDropdown && menu.subMenus && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                              {menu.subMenus.map((subMenu) => (
                                <a
                                  key={subMenu.id}
                                  href={subMenu.url}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                  {subMenu.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button className="text-sm font-medium text-blue-600 underline">
                        {editData.navigation.cta.text}
                      </button>
                    </div>
                    <div className="md:hidden">
                      <div className="flex flex-col space-y-1">
                        {Array.from({ length: editData.mobile.hamburgerIcon.lines }, (_, i) => (
                          <div 
                            key={i}
                            className="w-6 h-0.5 bg-gray-800"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logo Variants */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-white">
                    <h3 className="text-sm font-medium mb-2">Default Logo</h3>
                    <img 
                      src={editData.logo.default} 
                      alt={editData.logo.alt}
                      width={editData.logo.dimensions.default.width}
                      height={editData.logo.dimensions.default.height}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-900">
                    <h3 className="text-sm font-medium mb-2 text-white">Dark Logo</h3>
                    <img 
                      src={editData.logo.dark} 
                      alt={editData.logo.alt}
                      width={editData.logo.dimensions.default.width}
                      height={editData.logo.dimensions.default.height}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4 border rounded-lg bg-white shadow-md">
                    <h3 className="text-sm font-medium mb-2">Sticky Logo</h3>
                    <img 
                      src={editData.logo.sticky} 
                      alt={editData.logo.alt}
                      width={editData.logo.dimensions.sticky.width}
                      height={editData.logo.dimensions.sticky.height}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode - Show structure
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-600">Header Editor</h2>
                  <p className="text-gray-500 mt-2">Use the left panel to edit header content, then preview your changes</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-5 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Image className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">Logo</p>
                      <Badge variant="outline" className="mt-1">3 Variants</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Menu className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium">Navigation</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.navigation.menus.length} Items
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Smartphone className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <p className="text-sm font-medium">Mobile</p>
                      <Badge variant="outline" className="mt-1">
                        {editData.mobile.hamburgerIcon.lines} Lines
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Settings className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">Dialog</p>
                      <Badge variant={editData.dialog.enabled ? "default" : "secondary"} className="mt-1">
                        {editData.dialog.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Palette className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                      <p className="text-sm font-medium">Styling</p>
                      <Badge variant="outline" className="mt-1">Custom</Badge>
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
