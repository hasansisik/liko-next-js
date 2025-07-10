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
  
  // Dynamic logo selection
  const getLogoSrc = () => {
    if (!header) return "";
    if (sticky) return header.logo.sticky;
    if (color === 'black') return header.logo.dark;
    if (color === 'white') return header.logo.default;
    return header.logo.default;
  };

  // Dynamic hamburger color
  const getHamburgerColor = () => {
    if (!header) return "#333";
    if (sticky) return header.styling.colors.hamburger.sticky;
    if (color === 'black') return header.styling.colors.hamburger.black;
    if (color === 'white') return header.styling.colors.hamburger.white;
    return header.styling.colors.hamburger.default;
  };

  useEffect(() => {
    headerFullWidth();
    // Fetch header data from API
    dispatch(getHeader());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Show loading state
  if (loading || !header) {
    return (
      <header className="tp-header-height" ref={headerRef}>
        <div className="flex justify-center items-center h-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="tp-header-height" ref={headerRef}>
        <div
          id="header-sticky"
          className={`tp-header-area tp-header-mob-space ${transparent ? 'tp-transparent' : ''} z-index-9 ${sticky?'header-sticky':''}`}
          style={{
            backgroundColor: sticky ? header.styling.header.stickyBackground : header.styling.header.transparentBackground,
            transition: header.styling.header.transition,
            boxShadow: sticky ? header.styling.header.boxShadow.sticky : header.styling.header.boxShadow.default,
            padding: '0',
            margin: '0'
          }}
        >
          <div className="container-fluid" style={{ 
            padding: header.styling.container.padding,
            maxWidth: header.styling.container.maxWidth
          }}>
            <div className="row align-items-center justify-content-between" style={{ 
              margin: '0',
              padding: header.styling.header.padding
            }}>
              <div className="col-auto" style={{ padding: '0 20px' }}>
                <div className="tp-header-logo">
                  <Link href="/">
                    <Image
                      src={getLogoSrc()}
                      alt={header.logo.alt}
                      width={sticky ? header.logo.dimensions.sticky.width : header.logo.dimensions.default.width}
                      height={sticky ? header.logo.dimensions.sticky.height : header.logo.dimensions.default.height}
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
                      navigationData={header.navigation}
                    />
                    {/* header menus */}
                  </nav>
                </div>
              </div>
              <div className="col-auto d-lg-none" style={{ padding: '0 20px' }}>
                <div className="tp-header-bar">
                  <button className="tp-offcanvas-open-btn" onClick={() => setOpenOffCanvas(true)}>
                    {Array.from({ length: header.mobile.hamburgerIcon.lines }, (_, index) => (
                      <span 
                        key={index}
                        style={{ 
                          backgroundColor: getHamburgerColor(),
                          transition: header.mobile.hamburgerIcon.animation ? 'background-color 0.3s ease' : 'none'
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
        navigationData={header.navigation}
        mobileData={header.mobile?.offcanvas ? header.mobile as any : undefined}
      />
      {/* off canvas */}

      {/* Personal Advice Dialog */}
      {openDialog && header.dialog.enabled && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: header.dialog.backdrop.backgroundColor,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={header.dialog.backdrop.closeOnClick ? () => setOpenDialog(false) : undefined}>
          <div style={{
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              onClick={() => setOpenDialog(false)}
              style={{
                position: 'absolute',
                top: header.dialog.closeButton.position.top,
                right: header.dialog.closeButton.position.right,
                background: 'transparent',
                border: 'none',
                fontSize: header.dialog.closeButton.size,
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
              {header.dialog.closeButton.text}
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