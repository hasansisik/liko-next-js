"use client";
import { gsap } from "gsap";
import React from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import ContactTwo from "@/components/contact/contact-two";
import ContactLocation from "@/components/contact/contact-location";
// animation
import { charAnimation } from "@/utils/title-animation";
import FooterTwo from "@/layouts/footers/footer-two";
import HeaderOne from "@/layouts/headers/header-one";

// Redux imports
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getContact } from "@/redux/actions/contactActions";

const ContactMain = () => {
  const dispatch = useAppDispatch();
  const { contact, loading, error } = useAppSelector((state) => state.contact);
  
  useScrollSmooth();

  // Fetch contact data on component mount
  React.useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  // Show loading state
  if (loading) {
    return (
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Show error state
  if (error) {
    return (
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </Wrapper>
    );
  }

  // Show content if contact data is available
  if (!contact) {
    return (
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="alert alert-warning" role="alert">
            Contact verisi bulunamadı.
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
          <div
            className="inner-bg"
            style={{
              backgroundImage: `url(${contact.hero.backgroundImage})`,
            }}
          >
            <main>
              {/* hero area start */}
              <div className="tm-hero-area tm-hero-ptb p-relative">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="tm-hero-content">
                        <span className="tm-hero-subtitle">{contact.hero.subtitle}</span>
                        <h4 className="tm-hero-title-big tp-char-animation">
                          {contact.hero.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* hero area end */}

              {/* contact area */}
              <ContactTwo contactFormData={contact.contactForm} />
              {/* contact area */}

              {/* contact location */}
              <ContactLocation contactInfoData={contact.contactInfo} />
              {/* contact location */}
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

export default ContactMain;
