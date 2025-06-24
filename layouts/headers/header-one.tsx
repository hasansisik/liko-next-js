"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderMenus from "./header-menus";
import useSticky from "@/hooks/use-sticky";
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";
import { ArrowRight } from 'lucide-react';

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
            padding: '20px 0 0 0',
            margin: '0'
          }}
        >
          <div className="container-fluid" style={{ 
            padding: '0 clamp(20px, 6vw, 300px)',
            maxWidth: '100%' 
          }}>
            <div className="row align-items-center justify-content-between" style={{ 
              margin: '0',
              padding: '15px 0'
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
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            width: '100%',
            maxWidth: '500px',
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
                justifyContent: 'center'
              }}
            >
              ×
            </button>

            {/* Dialog Content */}
            <div className="tp-hero-2-form-header" style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#333',
                textAlign: 'center'
              }}>Let&apos;s Talk Teeth!</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#4CAF50',
                  borderRadius: '50%',
                  marginRight: '8px'
                }}></span>
                <span style={{
                  color: '#4CAF50',
                  fontSize: '16px',
                  fontWeight: '500'
                }}>Online now</span>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: '0',
                textAlign: 'center'
              }}>avg. response time: 3 minutes</p>
            </div>
            
            <form>
              <div style={{ marginBottom: '20px' }}>
                <input 
                  type="text" 
                  placeholder="Name*" 
                  required 
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #eee',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                />
              </div>
              
              <div style={{
                display: 'flex',
                marginBottom: '25px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  border: '2px solid #eee',
                  borderRight: 'none',
                  borderRadius: '8px 0 0 8px',
                  backgroundColor: '#f8f9fa',
                  minWidth: '90px'
                }}>
                  <span style={{ marginRight: '8px' }}>🇹🇷</span>
                  <span style={{ fontSize: '16px' }}>+90</span>
                </div>
                <input 
                  type="tel" 
                  placeholder="Phone Number*" 
                  required 
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: '2px solid #eee',
                    borderRadius: '0 8px 8px 0',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                />
              </div>
              
              <button type="submit" style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#000',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '15px',
                transition: 'background-color 0.3s ease'
              }}
                             onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#333'}
               onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#000'}
               >
                 Send <ArrowRight size={20} style={{ marginLeft: '8px', display: 'inline' }} />
               </button>
              
              <Link href="#" style={{
                display: 'block',
                width: '100%',
                padding: '15px',
                backgroundColor: '#25D366',
                color: 'white',
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#1da851'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#25D366'}
              >
                💬 Chat on WhatsApp
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderOne;
