import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getPublicSEO } from "@/redux/actions/seoActions";
import { clearCurrentSEO } from "@/redux/reducers/seoReducer";

export const useSEO = (pageName: string, companyId?: string) => {
  const dispatch = useAppDispatch();
  const { currentSEO, loading, error } = useAppSelector((state) => state.seo);

  useEffect(() => {
    if (pageName) {
      dispatch(getPublicSEO({ pageName, companyId }));
    }

    return () => {
      dispatch(clearCurrentSEO());
    };
  }, [dispatch, pageName, companyId]);

  return {
    seoData: currentSEO,
    loading,
    error,
  };
};

// Helper function to generate metadata from SEO data
export const generateMetadata = (seoData: any) => {
  if (!seoData) {
    return {
      title: "Default Title",
      description: "Default description",
    };
  }

  const metadata: any = {
    title: seoData.title,
    description: seoData.description,
  };

  if (seoData.keywords && seoData.keywords.length > 0) {
    metadata.keywords = seoData.keywords.join(", ");
  }

  if (seoData.canonical) {
    metadata.alternates = {
      canonical: seoData.canonical,
    };
  }

  if (seoData.robots) {
    metadata.robots = seoData.robots;
  }

  // Open Graph metadata
  if (seoData.ogTitle || seoData.ogDescription || seoData.ogImage) {
    metadata.openGraph = {};
    
    if (seoData.ogTitle) metadata.openGraph.title = seoData.ogTitle;
    if (seoData.ogDescription) metadata.openGraph.description = seoData.ogDescription;
    if (seoData.ogImage) metadata.openGraph.images = [seoData.ogImage];
    if (seoData.ogUrl) metadata.openGraph.url = seoData.ogUrl;
  }

  // Twitter metadata
  if (seoData.twitterTitle || seoData.twitterDescription || seoData.twitterImage) {
    metadata.twitter = {};
    
    if (seoData.twitterTitle) metadata.twitter.title = seoData.twitterTitle;
    if (seoData.twitterDescription) metadata.twitter.description = seoData.twitterDescription;
    if (seoData.twitterImage) metadata.twitter.images = [seoData.twitterImage];
  }

  return metadata;
}; 