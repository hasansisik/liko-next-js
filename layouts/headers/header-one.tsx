"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderMenus from "./header-menus";
import useSticky from "@/hooks/use-sticky";
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";
import ContactFormDental from "@/components/form/contact-form-dental";
import { IHeaderData } from "@/types/header-d-t";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getHeader } from "@/redux/actions/headerActions";
import { HeaderData } from "@/redux/actions/headerActions";

// prop type
type IProps = {
  transparent?: boolean;
  color?: 'black' | 'white';
  headerData?: IHeaderData;
};

const HeaderOne = ({ transparent = false, color, headerData: staticData }: IProps) => {
  const {sticky,headerRef,headerFullWidth} = useSticky();
  const [openOffCanvas, setOpenOffCanvas] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  
  // Redux
  const dispatch = useAppDispatch();
  const { header, loading } = useAppSelector((state) => state.header);
  
  // Use Redux data if available, otherwise fallback to static data or default
  const data = header || staticData || {
    logo: {
      default: "/assets/img/logo/logo-white.png",
      dark: "/assets/img/logo/logo-black.png",
      sticky: "/assets/img/logo/logo-black.png",
      alt: "Logo",
      dimensions: {
        default: { width: 120, height: 40 },
        sticky: { width: 100, height: 35 }
      }
    },
    navigation: {
      menus: [
        { id: 1, title: "Home", url: "/", hasDropdown: false },
        { id: 2, title: "About", url: "/about", hasDropdown: false },
        { id: 3, title: "Services", url: "/service", hasDropdown: false },
        { id: 4, title: "Blog", url: "/blog", hasDropdown: false },
        { id: 5, title: "Contact", url: "/contact", hasDropdown: false }
      ],
      cta: {
        text: "Get Consultation",
        action: "openDialog"
      }
    },
    mobile: {
      hamburgerIcon: {
        lines: 3,
        animation: true
      },
      offcanvas: {
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
      }
    },
    dialog: {
      enabled: true,
      backdrop: {
        backgroundColor: "rgba(0,0,0,0.8)",
        closeOnClick: true
      },
      closeButton: {
        text: "×",
        size: "24px",
        position: { top: "-10px", right: "-10px" }
      }
    },
    styling: {
      container: {
        padding: "0 20px",
        maxWidth: "1200px"
      },
      header: {
        padding: "15px 0",
        transparentBackground: "transparent",
        stickyBackground: "rgba(255,255,255,0.95)",
        transition: "all 0.3s ease",
        boxShadow: {
          default: "none",
          sticky: "0 2px 10px rgba(0,0,0,0.1)"
        }
      },
      colors: {
        hamburger: {
          default: "white",
          white: "white",
          black: "#333",
          sticky: "#333"
        }
      }
    }
  };
  
  // Dynamic logo selection
  const getLogoSrc = () => {
    if (sticky) return data.logo.sticky;
    if (color === 'black') return data.logo.dark;
    if (color === 'white') return data.logo.default;
    return data.logo.default;
  };

  // Dynamic hamburger color
  const getHamburgerColor = () => {
    if (sticky) return data.styling.colors.hamburger.sticky;
    if (color === 'black') return data.styling.colors.hamburger.black;
    if (color === 'white') return data.styling.colors.hamburger.white;
    return data.styling.colors.hamburger.default;
  };

  useEffect(() => {
    headerFullWidth();
    // Fetch header data from API
    dispatch(getHeader());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <header className="tp-header-height" ref={headerRef}>
        <div
          id="header-sticky"
          className={`tp-header-area tp-header-mob-space ${transparent ? 'tp-transparent' : ''} z-index-9 ${sticky?'header-sticky':''}`}
          style={{
            backgroundColor: sticky ? data.styling.header.stickyBackground : data.styling.header.transparentBackground,
            transition: data.styling.header.transition,
            boxShadow: sticky ? data.styling.header.boxShadow.sticky : data.styling.header.boxShadow.default,
            padding: '0',
            margin: '0'
          }}
        >
          <div className="container-fluid" style={{ 
            padding: data.styling.container.padding,
            maxWidth: data.styling.container.maxWidth
          }}>
            <div className="row align-items-center justify-content-between" style={{ 
              margin: '0',
              padding: data.styling.header.padding
            }}>
              <div className="col-auto" style={{ padding: '0 20px' }}>
                <div className="tp-header-logo">
                  <Link href="/">
                    <Image
                      src={getLogoSrc()}
                      alt={data.logo.alt}
                      width={sticky ? data.logo.dimensions.sticky.width : data.logo.dimensions.default.width}
                      height={sticky ? data.logo.dimensions.sticky.height : data.logo.dimensions.default.height}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-auto d-none d-lg-block" style={{ padding: '0 20px' }}>
                <div className="tp-header-menu header-main-menu">
                  <nav className="tp-main-menu-content">
                    {/* header menus */}
                    <HeaderMenus 
                      onOpenDialog={() => setOpenDialog(true)}
                      isSticky={sticky} 
                      color={color}
                      navigationData={data.navigation}
                    />
                    {/* header menus */}
                  </nav>
                </div>
              </div>
              <div className="col-auto d-lg-none" style={{ padding: '0 20px' }}>
                <div className="tp-header-bar">
                  <button className="tp-offcanvas-open-btn" onClick={() => setOpenOffCanvas(true)}>
                    {Array.from({ length: data.mobile.hamburgerIcon.lines }, (_, index) => (
                      <span 
                        key={index}
                        style={{ 
                          backgroundColor: getHamburgerColor(),
                          transition: data.mobile.hamburgerIcon.animation ? 'background-color 0.3s ease' : 'none'
                        }}
                      ></span>
                    ))}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* off canvas */}
      <MobileOffcanvas 
        openOffcanvas={openOffCanvas} 
        setOpenOffcanvas={setOpenOffCanvas}
        navigationData={data.navigation}
        mobileData={data.mobile?.offcanvas ? data.mobile as any : undefined}
      />
      {/* off canvas */}

      {/* Personal Advice Dialog */}
      {openDialog && data.dialog.enabled && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: data.dialog.backdrop.backgroundColor,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={data.dialog.backdrop.closeOnClick ? () => setOpenDialog(false) : undefined}>
          <div style={{
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              onClick={() => setOpenDialog(false)}
              style={{
                position: 'absolute',
                top: data.dialog.closeButton.position.top,
                right: data.dialog.closeButton.position.right,
                background: 'transparent',
                border: 'none',
                fontSize: data.dialog.closeButton.size,
                cursor: 'pointer',
                color: '#666',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10001
              }}
            >
              {data.dialog.closeButton.text}
            </button>

            {/* ContactFormDental Component */}
            <ContactFormDental 
              style={{
                maxWidth: '600px',
                width: '90vw'
              }}
            />
          </div>
        </div>
      )}

    </>
  );
};

export default HeaderOne;