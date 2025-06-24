"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderMenus from "./header-menus";
import useSticky from "@/hooks/use-sticky";
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";
import ContactFormDental from "@/components/form/contact-form-dental";

// prop type
type IProps = {
  transparent?: boolean;
  color?: 'black' | 'white';
};

const HeaderOne = ({ transparent = false, color }: IProps) => {
  const {sticky,headerRef,headerFullWidth} = useSticky();
  const [openOffCanvas, setOpenOffCanvas] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  useEffect(() => {
    headerFullWidth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className="tp-header-height" ref={headerRef}>
        <div
          id="header-sticky"
          className={`tp-header-area tp-header-mob-space ${transparent ? 'tp-transparent' : ''} z-index-9 ${sticky?'header-sticky':''}`}
          style={{
            backgroundColor: sticky ? 'white' : 'transparent',
            transition: 'background-color 0.3s ease',
            boxShadow: sticky ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
            padding: '0',
            margin: '0'
          }}
        >
          <div className="container-fluid" style={{ 
            padding: '0 clamp(20px, 6vw, 300px)',
            maxWidth: '100%' 
          }}>
            <div className="row align-items-center justify-content-between" style={{ 
              margin: '0',
              padding: '10px 0'
            }}>
              <div className="col-auto" style={{ padding: '0 20px' }}>
                <div className="tp-header-logo">
                  <Link href="/">
                    <Image
                      src={
                        sticky 
                          ? "/assets/img/logo/logo.png" 
                          : color === 'black' 
                            ? "/assets/img/logo/logo.png"
                            : color === 'white'
                              ? "/assets/img/logo/logo-white.png"
                              : "/assets/img/logo/logo-white.png"
                      }
                      alt="logo"
                      width={sticky ? 120 : 150}
                      height={sticky ? 40 : 50}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-auto d-none d-lg-block" style={{ padding: '0 20px' }}>
                <div className="tp-header-menu header-main-menu">
                  <nav className="tp-main-menu-content">
                    {/* header menus */}
                    <HeaderMenus onOpenDialog={() => setOpenDialog(true)} isSticky={sticky} color={color} />
                    {/* header menus */}
                  </nav>
                </div>
              </div>
              <div className="col-auto d-lg-none" style={{ padding: '0 20px' }}>
                <div className="tp-header-bar">
                  <button className="tp-offcanvas-open-btn" onClick={() => setOpenOffCanvas(true)}>
                    <span style={{ 
                      backgroundColor: sticky 
                        ? '#333' 
                        : color === 'black' 
                          ? '#333'
                          : color === 'white'
                            ? 'white'
                            : 'white',
                      transition: 'background-color 0.3s ease'
                    }}></span>
                    <span style={{ 
                      backgroundColor: sticky 
                        ? '#333' 
                        : color === 'black' 
                          ? '#333'
                          : color === 'white'
                            ? 'white'
                            : 'white',
                      transition: 'background-color 0.3s ease'
                    }}></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* off canvas */}
      <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
      {/* off canvas */}

      {/* Personal Advice Dialog */}
      {openDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setOpenDialog(false)}>
          <div style={{
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              onClick={() => setOpenDialog(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
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
              ×
            </button>

            {/* ContactFormDental Component */}
            <ContactFormDental 
              title="Let's Talk Teeth!"
              subtitle="Online now"
              responseTime="avg. response time: 3 minutes"
              showWhatsApp={true}
              style={{
                maxWidth: '500px',
                width: '90vw',
                margin: '0',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                borderRadius: '15px'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderOne;
