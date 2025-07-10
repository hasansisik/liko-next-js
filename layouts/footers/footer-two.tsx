import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IFooterData } from "@/types/footer-d-t";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFooter } from "@/redux/actions/footerActions";

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

  useEffect(() => {
    // Fetch footer data from API
    dispatch(getFooter());
  }, [dispatch]);

  // Show loading state
  if (loading || !footer) {
    return (
      <footer>
        <div className={`tp-footer-2-area pt-90 mt-50 ${whiteFooter ? "tp-footer-white" : "black-bg"}`}>
          <div className="container container-1480">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

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
                      <Image src={footer.company.logo} alt="logo" width={150} height={50} />
                    </Link>
                  </div>
                )}
                {whiteFooter && (
                  <div className="tp-footer-2-widget-logo tp-footer-dark">
                    <Link className="logo-1" href="/">
                      <Image src={footer.company.logoDark} alt="logo" width={150} height={50} />
                    </Link>
                    <Link className="logo-2" href="/">
                      <Image src={footer.company.logo} alt="logo" width={150} height={50} />
                    </Link>
                  </div>
                )}
                <div className="tp-footer-2-widget-text">
                  <p>
                    {footer.company.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-5 col-md-6">
              <div className="tp-footer-2-widget footer-col-2-3">
                <h4 className="tp-footer-2-widget-title">{footer.office.title}</h4>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a
                      href={footer.office.address.url}
                      target="_blank"
                    >
                      {footer.office.address.text}
                    </a>
                  </span>
                </div>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a href={`tel:${footer.office.phone.number}`}>{footer.office.phone.text}</a>
                  </span>
                </div>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a href={`mailto:${footer.office.email.address}`}>{footer.office.email.text}</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-6">
              <div className="tp-footer-2-widget footer-col-2-2">
                <div className="tp-footer-2-widget-menu">
                  <h4 className="tp-footer-2-widget-title">{footer.sitemap.title}</h4>
                  <ul>
                    {footer.sitemap.links.map((link, index) => (
                      <li key={index}><Link href={link.url}>{link.text}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-6">
              <div className="tp-footer-2-widget footer-col-2-4">
                <div className="tp-footer-2-widget-menu">
                  <h4 className="tp-footer-2-widget-title">{footer.legal.title}</h4>
                  <ul>
                    {footer.legal.links.map((link, index) => (
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
                  {footer.copyright.text.replace('{year}', new Date().getFullYear().toString())}
                </p>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="tp-copyright-2-social text-center text-lg-end">
                {footer.copyright.socialLinks.map((link, index) => (
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
