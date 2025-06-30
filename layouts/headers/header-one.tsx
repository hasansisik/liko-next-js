"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderMenus from "./header-menus";
import useSticky from "@/hooks/use-sticky";
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";
import ContactFormDental from "@/components/form/contact-form-dental";
import { headerData } from "@/data/header-data";
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
  const data = header || staticData || headerData;
  
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
