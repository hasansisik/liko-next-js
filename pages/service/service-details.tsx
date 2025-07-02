"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { gsap } from "gsap";
import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { getAllServicePosts } from '@/redux/actions/servicePostActions';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderEleven from "@/layouts/headers/header-eleven";
import ServiceDetailsArea from "@/components/service/service-details-area";
import LineImgSlider from "@/components/line-text/line-img-slider";
import BigText from "@/components/big-text";
import FooterTwo from "@/layouts/footers/footer-two";
import { IServiceDT } from "@/types/service-d-t";
// animation
import { charAnimation, titleAnimation } from "@/utils/title-animation";
import HeaderOne from "@/layouts/headers/header-one";
// data
import { service_data } from "@/data/service-data";

interface ServiceDetailsMainProps {
  service?: IServiceDT;
  slug?: string;
}

const ServiceDetailsMain = ({ service, slug }: ServiceDetailsMainProps) => {
  const dispatch = useDispatch();
  const { servicePosts, loading, error } = useSelector((state: RootState) => state.servicePosts);
  
  useScrollSmooth();

  // Fetch service posts if not already loaded
  useEffect(() => {
    if (!servicePosts || servicePosts.length === 0) {
      dispatch(getAllServicePosts({ published: true, limit: 100 }) as any);
    }
  }, [dispatch, servicePosts]);

  // Find service by slug if provided
  const currentService = service || (slug && servicePosts ? 
    servicePosts.find(post => post.slug === slug) : null);

  // Use the provided service directly if available
  const serviceData = service || (currentService && '_id' in currentService ? {
    id: 1,
    title: currentService.title,
    desc: currentService.desc,
    img: currentService.img,
    category: currentService.categories?.[0] || 'Service',
    features: currentService.tags || [],
    shortDesc: currentService.desc,
    content: currentService.content
  } as IServiceDT : service_data[0]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      titleAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });


  // Loading state
  if (loading && !service) {
    return (
      <Wrapper>
        <HeaderOne transparent={true} color="black"/>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </Wrapper>
    );
  }

  // Error state
  if (error && !service) {
    return (
      <Wrapper>
        <HeaderOne transparent={true} color="black"/>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => dispatch(getAllServicePosts({ published: true, limit: 100 }) as any)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Service not found
  if (!serviceData) {
    return (
      <Wrapper>
        <HeaderOne transparent={true} color="black"/>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <p className="text-gray-600">The requested service could not be found.</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderOne transparent={true} color="black"/>
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* service details area */}
            <ServiceDetailsArea service={serviceData} />
            {/* service details area */}

            {/* big text */}
            <BigText />
            {/* big text */}
          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

// Export a static version for SSG
export default function ServiceDetailsPage(props: ServiceDetailsMainProps) {
  return (
    <ServiceDetailsMain {...props} />
  );
}
