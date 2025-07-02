"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { gsap } from "gsap";
import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getPolicy } from "@/redux/actions/policyActions";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";
import PolicyContent from "@/components/policy/policy-content";

// animation
import { charAnimation } from "@/utils/title-animation";

const PrivacyPolicyMain = () => {
  useScrollSmooth();
  const dispatch = useDispatch<AppDispatch>();
  const { policy, loading } = useSelector((state: RootState) => state.policy);

  useEffect(() => {
    dispatch(getPolicy({ type: "privacy-policy" }));
  }, [dispatch]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderOne transparent={true} color="black"/>
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div
            className="inner-bg"
            style={{
              backgroundImage:
                "url(/assets/img/home-01/team/team-details-bg.png)",
            }}
          >
            <main>
              {/* hero area start */}
              <div className="tm-hero-area tm-hero-ptb p-relative">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="tm-hero-content">
                        <span className="tm-hero-subtitle">{policy?.subtitle || "Liko Dental"}</span>
                        <h4 className="tm-hero-title-big tp-char-animation">
                          {policy?.title || "Privacy Policy"}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* hero area end */}

              {/* content area start */}
              {loading ? (
                <div className="container py-5">
                  <div className="text-center">Loading...</div>
                </div>
              ) : (
                <div className="container py-5">
                  <div className="policy-content" dangerouslySetInnerHTML={{ __html: policy?.htmlContent || "" }} />
                </div>
              )}
              {/* content area end */}
            </main>

            {/* footer area */}
            <FooterTwo />
            {/* footer area */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PrivacyPolicyMain; 