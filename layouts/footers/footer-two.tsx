import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IFooterData } from "@/types/footer-d-t";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFooter } from "@/redux/actions/footerActions";
import { FooterData } from "@/redux/actions/footerActions";

// prop type
type IProps = {
  whiteFooter?: boolean;
  topCls?: string;
  footerData?: IFooterData;
};

export default function FooterTwo({ whiteFooter = false, topCls='', footerData: staticData }: IProps) {
  // Redux
  const dispatch = useAppDispatch();
  const { footer, loading } = useAppSelector((state) => state.footer);
  
  // Use Redux data if available, otherwise fallback to static data or default
  const data = footer || staticData || {
    company: {
      logo: "/assets/img/logo/logo-white.png",
      logoDark: "/assets/img/logo/logo-black.png",
      description: "Modern dental clinic providing comprehensive oral healthcare services."
    },
    office: {
      title: "Office",
      address: { text: "123 Main St, City", url: "#" },
      phone: { text: "+1 234 567 8900", number: "+12345678900" },
      email: { text: "info@clinic.com", address: "info@clinic.com" }
    },
    sitemap: {
      title: "Sitemap",
      links: [
        { text: "Home", url: "/" },
        { text: "About", url: "/about" },
        { text: "Services", url: "/services" },
        { text: "Contact", url: "/contact" }
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { text: "Privacy Policy", url: "/privacy" },
        { text: "Terms of Service", url: "/terms" }
      ]
    },
    copyright: {
      text: "© {year} Dental Clinic. All rights reserved.",
      socialLinks: [
        { text: "Facebook", url: "#" },
        { text: "Instagram", url: "#" }
      ]
    }
  };

  useEffect(() => {
    // Fetch footer data from API
    dispatch(getFooter());
  }, [dispatch]);
  return (
    <footer>
      <div
        className={`tp-footer-2-area pt-90 mt-50 ${
          whiteFooter ? "tp-footer-white" : "black-bg"
        }`}
      >
        <div className="container container-1480">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="tp-footer-2-widget footer-col-2-1">
                {!whiteFooter && (
                  <div className="tp-footer-2-widget-logo">
                    <Link href="/">
                      <Image src={data.company.logo} alt="logo" width={150} height={50} />
                    </Link>
                  </div>
                )}
                {whiteFooter && (
                  <div className="tp-footer-2-widget-logo tp-footer-dark">
                    <Link className="logo-1" href="/">
                      <Image src={data.company.logoDark} alt="logo" width={150} height={50} />
                    </Link>
                    <Link className="logo-2" href="/">
                      <Image src={data.company.logo} alt="logo" width={150} height={50} />
                    </Link>
                  </div>
                )}
                <div className="tp-footer-2-widget-text">
                  <p>
                    {data.company.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-5 col-md-6">
              <div className="tp-footer-2-widget footer-col-2-3">
                <h4 className="tp-footer-2-widget-title">{data.office.title}</h4>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a
                      href={data.office.address.url}
                      target="_blank"
                    >
                      {data.office.address.text}
                    </a>
                  </span>
                </div>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a href={`tel:${data.office.phone.number}`}>{data.office.phone.text}</a>
                  </span>
                </div>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a href={`mailto:${data.office.email.address}`}>{data.office.email.text}</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-6">
              <div className="tp-footer-2-widget footer-col-2-2">
                <div className="tp-footer-2-widget-menu">
                  <h4 className="tp-footer-2-widget-title">{data.sitemap.title}</h4>
                  <ul>
                    {data.sitemap.links.map((link, index) => (
                      <li key={index}><Link href={link.url}>{link.text}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-6">
              <div className="tp-footer-2-widget footer-col-2-4">
                <div className="tp-footer-2-widget-menu">
                  <h4 className="tp-footer-2-widget-title">{data.legal.title}</h4>
                  <ul>
                    {data.legal.links.map((link, index) => (
                      <li key={index}><Link href={link.url}>{link.text}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`tp-copyright-2-area tp-copyright-2-bdr-top ${
          whiteFooter ? "tp-copyright-white" : "black-bg"
        }`}
      >
        <div className="container container-1480">
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-5">
              <div className="tp-copyright-2-left text-center text-lg-start">
                <p>
                  {data.copyright.text.replace('{year}', new Date().getFullYear().toString())}
                </p>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="tp-copyright-2-social text-center text-lg-end">
                {data.copyright.socialLinks.map((link, index) => (
                  <a key={index} href={link.url}>{link.text}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
