import React from "react";
import Image from "next/image";
import ContactForm from "../form/contact-form";
import Social from "../social/social";
import shape from "@/assets/img/inner-about/about/shape-1.png";
import { IContactFormData } from "../../types/contact-d-t";

interface ContactTwoProps {
  contactFormData: IContactFormData;
}

export default function ContactTwo({ contactFormData }: ContactTwoProps) {
  return (
    <div className="cn-contactform-area cn-contactform-style p-relative pb-100">
      <div className="ab-2-hero-social-wrap d-none d-xl-block">
        <div className="ab-2-hero-social">
          <Social socialData={contactFormData.socialMedia}/>
        </div>
        <div className="ab-2-hero-social-text">
          <span>{contactFormData.socialText}</span>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-5">
            <div className="ab-about-category-title-box mb-40 p-relative">
              <h4 className="ab-about-category-title">
                {contactFormData.title} <br />
                <span>{contactFormData.subtitle}</span>
              </h4>
              <Image
                className="ab-about-shape-1 d-none d-xl-block"
                src={shape}
                alt="shape"
              />
            </div>
          </div>
          <div className="col-xl-7">
            <div className="cn-contactform-wrap">
              {/* form start */}
              <ContactForm formData={contactFormData.form} />
              {/* form end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
