"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { 
  getAllPolicies, 
  getPolicy, 
  updatePolicy, 
  createPolicy 
} from "@/redux/actions/policyActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import RichTextEditor from "@/components/RichTextEditor";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const PoliciesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { policies, policy, loading, error, success, message } = useSelector(
    (state: RootState) => state.policy
  );
  
  const [activeTab, setActiveTab] = useState<string>("privacy-policy");
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);
  
  // Fetch all policies on page load
  useEffect(() => {
    dispatch(getAllPolicies());
  }, [dispatch]);
  
  // Handle tab change and load policy data
  useEffect(() => {
    if (activeTab) {
      dispatch(getPolicy({ type: activeTab as any }));
    }
  }, [activeTab, dispatch]);
  
  // Update form when policy data changes
  useEffect(() => {
    if (policy) {
      setTitle(policy.title || "");
      setSubtitle(policy.subtitle || "");
      setHtmlContent(policy.htmlContent || "");
      setSelectedPolicyId(policy._id || null);
    }
  }, [policy]);
  
  // Show toast on success or error
  useEffect(() => {
    if (success && message) {
      toast.success(message);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error, message]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedPolicyId) {
      // Update existing policy
      dispatch(
        updatePolicy({
          policyId: selectedPolicyId,
          title,
          subtitle,
          htmlContent,
        })
      );
    } else {
      // Create new policy
      dispatch(
        createPolicy({
          title,
          subtitle,
          type: activeTab as any,
          htmlContent,
        })
      );
    }
  };
  
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                <BreadcrumbPage>Policies</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4">
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Policy
              </>
            )}
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Policies</h1>
          <p className="text-muted-foreground">Edit and manage your website policies including privacy policy, terms of service, and cookie policy.</p>
        </div>
        
        <Tabs
          defaultValue="privacy-policy"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="privacy-policy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms-of-service">Terms of Service</TabsTrigger>
            <TabsTrigger value="cookie-policy">Cookie Policy</TabsTrigger>
          </TabsList>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit {activeTab.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Policy Title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                          id="subtitle"
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          placeholder="Policy Subtitle"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <RichTextEditor
                        content={htmlContent}
                        onChange={setHtmlContent}
                        className="min-h-[500px] border rounded-md"
                        placeholder="Write your policy content here..."
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default PoliciesPage; 
