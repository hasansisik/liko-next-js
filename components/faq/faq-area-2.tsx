import React from "react";
import Image from "next/image";
import FaqItem from "./faq-item";

interface IFaqItem {
  id: number;
  question: string;
  answer: string;
}

interface IFaqSectionData {
  title: string;
  description: string;
  shapeImage: string;
  faqItems: IFaqItem[];
}

interface FaqAreaTwoProps {
  faqData: IFaqSectionData;
}

export default function FaqAreaTwo({ faqData }: FaqAreaTwoProps) {
  return (
    <div className="tp-service-2-area pb-100" style={{ marginTop: '20px' }}>
      <div className="container">
        <div className="row align-items-start" style={{ minHeight: 'auto' }}>
          <div className="col-xl-4 col-lg-5">
            <div className="tp-price-inner-faq">
              <div className="tp-service-2-title-box pt-25 pb-50">
                <h4 className="tp-service-2-title mb-20 tp_title_anim">
                  {faqData.title}
                </h4>
                <p className="tp_title_anim">
                  {faqData.description}
                </p>
              </div>
              <div className="tp-service-2-shape-img text-center text-lg-start">
                <Image src={faqData.shapeImage} alt="shape" width={200} height={200} />
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7">
            <div className="tp-price-inner-faq-wrap" style={{ minHeight: 'auto', height: 'auto' }}>
              <div className="fq-faq-wrapper" style={{ height: 'auto' }}>
                <div className="tp-service-2-accordion-box" style={{ height: 'auto', overflow: 'visible' }}>
                  <div className="accordion" id="accordionExample" style={{ height: 'auto' }}>
                    {faqData.faqItems.map((item) => (
                      <FaqItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
