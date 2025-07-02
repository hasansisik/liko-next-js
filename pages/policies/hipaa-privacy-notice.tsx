"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { gsap } from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";
import PolicyContent from "@/components/policy/policy-content";
import { hipaaPrivacyNoticeData } from "@/data/policy-data";

// animation
import { charAnimation } from "@/utils/title-animation";

const HipaaPrivacyNoticeMain = () => {
  useScrollSmooth();

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
                        <span className="tm-hero-subtitle">{hipaaPrivacyNoticeData.subtitle}</span>
                        <h4 className="tm-hero-title-big tp-char-animation">
                          {hipaaPrivacyNoticeData.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* hero area end */}

              {/* content area start */}
              <PolicyContent data={hipaaPrivacyNoticeData} />
              
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="policy-content">
                      <h3>NOTICE OF PRIVACY PRACTICES</h3>
                      <p><strong>THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.</strong></p>

                      <h3>1. Our Commitment to Your Privacy</h3>
                      <p>
                        Liko Dental is committed to protecting the privacy of your protected health information (PHI). We are required by law to maintain the privacy of your health information and to provide you with this notice of our legal duties and privacy practices.
                      </p>

                      <h3>2. How We May Use and Disclose Your Health Information</h3>
                      
                      <h4>2.1 For Treatment</h4>
                      <p>We may use and disclose your health information to provide you with dental treatment and services. For example:</p>
                      <ul>
                        <li>Sharing information with specialists we refer you to</li>
                        <li>Coordinating care with your physician or other healthcare providers</li>
                        <li>Discussing your treatment with dental assistants and hygienists</li>
                        <li>Reviewing your medical history before procedures</li>
                      </ul>

                      <h4>2.2 For Payment</h4>
                      <p>We may use and disclose your health information to obtain payment for services. For example:</p>
                      <ul>
                        <li>Submitting claims to your dental insurance company</li>
                        <li>Providing information to verify insurance coverage</li>
                        <li>Collecting payment for services rendered</li>
                        <li>Determining eligibility for benefits</li>
                      </ul>

                      <h4>2.3 For Healthcare Operations</h4>
                      <p>We may use and disclose your health information for healthcare operations. For example:</p>
                      <ul>
                        <li>Quality assessment and improvement activities</li>
                        <li>Staff training and education</li>
                        <li>Business planning and development</li>
                        <li>Accreditation and licensing activities</li>
                      </ul>

                      <h3>3. Other Uses and Disclosures</h3>
                      
                      <h4>3.1 Appointment Reminders</h4>
                      <p>We may contact you to remind you of scheduled appointments via phone, email, or text message.</p>

                      <h4>3.2 Treatment Alternatives</h4>
                      <p>We may contact you to provide information about treatment alternatives or health-related benefits and services.</p>

                      <h4>3.3 Required by Law</h4>
                      <p>We will disclose your health information when required by federal, state, or local law.</p>

                      <h4>3.4 Public Health Activities</h4>
                      <p>We may disclose your health information for public health activities, including:</p>
                      <ul>
                        <li>Reporting communicable diseases</li>
                        <li>Reporting suspected abuse or neglect</li>
                        <li>Reporting adverse drug reactions</li>
                        <li>Public health investigations</li>
                      </ul>

                      <h4>3.5 Health Oversight Activities</h4>
                      <p>We may disclose your health information to health oversight agencies for audits, investigations, inspections, and licensing purposes.</p>

                      <h4>3.6 Judicial and Administrative Proceedings</h4>
                      <p>We may disclose your health information in response to a court order, subpoena, or administrative request.</p>

                      <h3>4. Your Rights Regarding Your Health Information</h3>
                      
                      <h4>4.1 Right to Request Restrictions</h4>
                      <p>You have the right to request restrictions on how we use or disclose your health information. We are not required to agree to your request, but if we do, we will comply with your request unless the information is needed for emergency treatment.</p>

                      <h4>4.2 Right to Request Confidential Communications</h4>
                      <p>You have the right to request that we communicate with you about your health information in a certain way or at a certain location. For example, you may ask that we only contact you at work or by mail.</p>

                      <h4>4.3 Right to Inspect and Copy</h4>
                      <p>You have the right to inspect and copy your health information. To inspect and copy your health information, you must submit your request in writing. We may charge a fee for copying, mailing, and other supplies.</p>

                      <h4>4.4 Right to Amend</h4>
                      <p>You have the right to request that we amend your health information if you feel that the information is incorrect or incomplete. Your request must be in writing and must provide a reason for the request.</p>

                      <h4>4.5 Right to an Accounting of Disclosures</h4>
                      <p>You have the right to request an accounting of disclosures of your health information made by us for purposes other than treatment, payment, or healthcare operations.</p>

                      <h4>4.6 Right to a Paper Copy of This Notice</h4>
                      <p>You have the right to a paper copy of this notice even if you have agreed to receive the notice electronically.</p>

                      <h3>5. Changes to This Notice</h3>
                      <p>
                        We reserve the right to change this notice and to make the revised notice effective for health information we already have about you as well as any information we receive in the future. We will post a copy of the current notice in our office and on our website.
                      </p>

                      <h3>6. Complaints</h3>
                      <p>
                        If you believe your privacy rights have been violated, you may file a complaint with us or with the Secretary of the Department of Health and Human Services. To file a complaint with us, contact our Privacy Officer. You will not be retaliated against for filing a complaint.
                      </p>

                      <h3>7. Contact Information</h3>
                      <p>
                        <strong>Privacy Officer</strong><br/>
                        Liko Dental<br/>
                        740 NEW SOUTH HEAD RD, TRIPLE BAY SWFW 3108, NEW YORK<br/>
                        Phone: + 725 214 456<br/>
                        Email: privacy@liko.com
                      </p>

                      <p>
                        <strong>To file a complaint with the Department of Health and Human Services:</strong><br/>
                        Office for Civil Rights<br/>
                        U.S. Department of Health and Human Services<br/>
                        200 Independence Avenue, S.W.<br/>
                        Washington, D.C. 20201<br/>
                        Phone: 1-877-696-6775<br/>
                        Website: www.hhs.gov/ocr/privacy/hipaa/complaints/
                      </p>

                      <h3>8. Acknowledgment</h3>
                      <p>
                        By signing our acknowledgment form, you acknowledge that you have received a copy of this notice. If you have any questions about this notice, please ask to speak with our Privacy Officer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

export default HipaaPrivacyNoticeMain; 