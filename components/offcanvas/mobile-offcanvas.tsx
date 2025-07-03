import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Behance, CloseTwo, Dribble, InstagramTwo, Youtube } from "../svg";
import MobileMenus from "./mobile-menus";
import { INavigation } from "@/types/header-d-t";
import { Mobile } from "@/redux/actions/headerActions";

// prop type
type IProps = {
  openOffcanvas: boolean;
  setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  navigationData?: INavigation;
  mobileData?: Mobile;
};

export default function MobileOffcanvas({openOffcanvas,setOpenOffcanvas, navigationData, mobileData}: IProps) {
  // Handle body scroll locking
  useEffect(() => {
    if (openOffcanvas) {
      document.body.classList.add('tp-offcanvas-opened');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.classList.remove('tp-offcanvas-opened');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('tp-offcanvas-opened');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [openOffcanvas]);

  // Default values for fallback
  const defaultOffcanvas = {
    logo: {
      src: "/assets/img/logo/logo.png",
      alt: "logo",
      width: 120,
      height: 40
    },
    information: {
      title: "Information",
      phone: {
        text: "+ 4 20 7700 1007",
        number: "+420777001007"
      },
      email: {
        text: "hello@diego.com",
        address: "hello@diego.com"
      },
      address: {
        text: "Avenue de Roma 158b, Lisboa",
        link: ""
      }
    },
    socialMedia: {
      title: "Follow Us",
      links: [
        {
          platform: "Instagram",
          url: "#",
          icon: "InstagramTwo"
        },
        {
          platform: "YouTube",
          url: "#",
          icon: "Youtube"
        }
      ]
    }
  };

  // Safe navigation and fallback
  const offcanvasData = {
    logo: {
      src: mobileData?.offcanvas?.logo?.src || defaultOffcanvas.logo.src,
      alt: mobileData?.offcanvas?.logo?.alt || defaultOffcanvas.logo.alt,
      width: mobileData?.offcanvas?.logo?.width || defaultOffcanvas.logo.width,
      height: mobileData?.offcanvas?.logo?.height || defaultOffcanvas.logo.height
    },
    information: {
      title: mobileData?.offcanvas?.information?.title || defaultOffcanvas.information.title,
      phone: {
        text: mobileData?.offcanvas?.information?.phone?.text || defaultOffcanvas.information.phone.text,
        number: mobileData?.offcanvas?.information?.phone?.number || defaultOffcanvas.information.phone.number
      },
      email: {
        text: mobileData?.offcanvas?.information?.email?.text || defaultOffcanvas.information.email.text,
        address: mobileData?.offcanvas?.information?.email?.address || defaultOffcanvas.information.email.address
      },
      address: {
        text: mobileData?.offcanvas?.information?.address?.text || defaultOffcanvas.information.address.text,
        link: mobileData?.offcanvas?.information?.address?.link || defaultOffcanvas.information.address.link
      }
    },
    socialMedia: {
      title: mobileData?.offcanvas?.socialMedia?.title || defaultOffcanvas.socialMedia.title,
      links: mobileData?.offcanvas?.socialMedia?.links || defaultOffcanvas.socialMedia.links
    }
  };

  const handleClose = () => {
    setOpenOffcanvas(false);
  };

  return (
    <>
      <div className={`tp-offcanvas-area ${openOffcanvas ? "opened" : ""}`}>
        <div className="tp-offcanvas-wrapper">
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
            <div className="tp-offcanvas-logo">
              <Link href="/">
                <Image 
                  src={offcanvasData.logo.src} 
                  alt={offcanvasData.logo.alt} 
                  width={offcanvasData.logo.width} 
                  height={offcanvasData.logo.height} 
                />
              </Link>
            </div>
            <div className="tp-offcanvas-close">
              <button 
                onClick={handleClose}
                className="tp-offcanvas-close-btn"
                type="button"
              >
                <CloseTwo />
              </button>
            </div>
          </div>
          <div className="tp-main-menu-mobile">
            <MobileMenus navigationData={navigationData} />
          </div>
          <div className="tp-offcanvas-content">
            <h4 className="tp-offcanvas-title">{offcanvasData.information.title}</h4>
          </div>
          <div className="tp-offcanvas-contact">
            <ul>
              <li>
                <a href={`tel:${offcanvasData.information.phone.number}`}>
                  {offcanvasData.information.phone.text}
                </a>
              </li>
              <li>
                <a href={`mailto:${offcanvasData.information.email.address}`}>
                  {offcanvasData.information.email.text}
                </a>
              </li>
              <li>
                {offcanvasData.information.address.link ? (
                  <a href={offcanvasData.information.address.link}>
                    {offcanvasData.information.address.text}
                  </a>
                ) : (
                  <span>{offcanvasData.information.address.text}</span>
                )}
              </li>
            </ul>
          </div>
          <div className="tp-offcanvas-social">
            <h4 className="tp-offcanvas-title sm">{offcanvasData.socialMedia.title}</h4>
            <ul>
              {offcanvasData.socialMedia.links.map((social, index) => (
                <li key={`social-${index}-${social.platform}`}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.icon === "InstagramTwo" && <InstagramTwo />}
                    {social.icon === "Youtube" && <Youtube />}
                    {social.icon === "Behance" && <Behance />}
                    {social.icon === "Dribble" && <Dribble />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* overlay */}
      <div 
        onClick={handleClose}
        className={`body-overlay ${openOffcanvas ? "opened" : ""}`}
      ></div>
    </>
  );
}
