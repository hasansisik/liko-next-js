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
import { getService } from '@/redux/actions/serviceActions';
import { getAllServicePosts } from '@/redux/actions/servicePostActions';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import { ServiceItems } from "@/components/service/service-five";
import ServiceHero from "@/components/service/service-hero";
import ServiceSix from "@/components/service/service-six";
import BigText from "@/components/big-text";
import { Leaf } from "@/components/svg";
import FooterTwo from "@/layouts/footers/footer-two";
// animation
import { charAnimation, fadeAnimation } from "@/utils/title-animation";
import { servicePanel } from "@/utils/panel-animation";
import HeaderOne from "@/layouts/headers/header-one";

// fallback data import
import { servicePageData } from "@/data/service-page-data";

const ServiceMain = () => {
  const dispatch = useDispatch();
  const { service, loading: serviceLoading, error: serviceError } = useSelector((state: RootState) => state.service);
  const { servicePosts, loading: servicePostsLoading, error: servicePostsError } = useSelector((state: RootState) => state.servicePosts);
  
  useScrollSmooth();

  // Fetch service data on component mount
  useEffect(() => {
    dispatch(getService() as any);
    dispatch(getAllServicePosts({ published: true, limit: 100 }) as any);
  }, [dispatch]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      fadeAnimation();
      servicePanel();
    }, 100);
    return () => clearTimeout(timer);
  });

  // Use Redux data if available, otherwise fallback to static data
  const currentServiceData = service || servicePageData;
  const loading = serviceLoading || servicePostsLoading;
  const error = serviceError || servicePostsError;

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderOne transparent={true} color="black"/>
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                  <p className="text-red-600 mb-4">Error loading service data: {error}</p>
                  <button 
                    onClick={() => {
                      dispatch(getService() as any);
                      dispatch(getAllServicePosts({ published: true, limit: 100 }) as any);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Content */}
            {!loading && !error && (
              <>
                {/* service hero */}
                <ServiceHero heroData={currentServiceData.hero} />
                {/* service hero */}

                {/* service area */}
                <div className="tp-service-5-area sv-service-style pb-70">
                  <div className="container container-1530">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="tp-service-5-title-box mb-90">
                          <span className="ab-inner-subtitle mb-20">
                            {currentServiceData.serviceSection.subtitle}
                          </span>
                          <h4 className="tp-service-5-title">
                            {currentServiceData.serviceSection.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="tp-service-5-wrap">
                      <ServiceItems servicePosts={servicePosts} />
                    </div>
                  </div>
                </div>
                {/* service area */}

                {/* service area */}
                <ServiceSix servicePosts={servicePosts} />
                {/* service area */}

                {/* big text */}
                <BigText bigTextData={currentServiceData.bigText} />
                {/* big text */}
              </>
            )}
          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default ServiceMain;
