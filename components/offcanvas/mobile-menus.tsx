import React from "react";
import Image from "next/image";
import Link from "next/link";
import menu_data from "@/data/menu-data";
import shop_banner from '@/assets/img/menu/shop-menu/banner-1.jpg';
import port_img from '@/assets/img/menu/portfolio-menu/portfolio.png';
import { INavigation } from "@/types/header-d-t";

type IProps = {
  navigationData?: INavigation;
};

export default function MobileMenus({ navigationData }: IProps) {
  const [navTitle, setNavTitle] = React.useState<string>("");

  // Use navigationData if available, otherwise fallback to menu_data
  const menuItems = navigationData?.menus || menu_data;

  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  
  return (
    <>
      <nav className="tp-main-menu-content" style={{
        position: 'relative',
        zIndex: 1,
        height: 'auto',
        overflow: 'visible'
      }}>
        <ul style={{ 
          position: 'relative',
          zIndex: 1
        }}>
          {menuItems.map((menu) => {
            // Handle both new navigation structure and old menu_data structure
            const hasDropdown = (menu as any).hasDropdown || (menu as any).dropdown_menus || (menu as any).home_menus || (menu as any).portfolio_mega_menus;
            const menuLink = (menu as any).url || (menu as any).link;
            
            return (
            <li
              key={`mobile-menu-${menu.id}-${menu.title}`}
                className={`${hasDropdown ? "has-dropdown" : ""} ${
                  (menu as any).home_menus || (menu as any).portfolio_mega_menus
                  ? "has-homemenu"
                  : ""
                } ${(menu as any).home_menus ? "dropdown-opened" : ""}`}
                style={{
                  position: 'relative',
                  zIndex: 1
                }}
            >
                {hasDropdown ? (
              <a className="pointer" onClick={() => openMobileMenu(menu.title)}>
                {menu.title}
                <button className="dropdown-toggle-btn">
                  <i className="fa-light fa-plus"></i>
                </button>
              </a>
              ) : (
                  <Link href={menuLink}>{menu.title}</Link>
                )}
                
                {/* Handle simple dropdown for new navigation structure */}
                {(menu as any).hasDropdown && (menu as any).subMenus && (
                  <div className="tp-submenu submenu" style={{ 
                    display: navTitle === menu.title ? "block" : "none",
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <ul>
                      {(menu as any).subMenus.map((subMenu: any) => (
                        <li key={`submenu-${subMenu.id}-${subMenu.title}`}>
                          <Link href={subMenu.url}>{subMenu.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
              )}
              {(menu as any).home_menus ? (
                <div className="tp-submenu submenu tp-mega-menu" style={{ 
                  display: navTitle === menu.title ? "block" : "none",
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div className="tp-menu-fullwidth">
                    <div className="tp-homemenu-wrapper">
                      <div className="row gx-25 row-cols-xl-6 row-cols-lg-2 row-cols-md-2 row-cols-1">
                        {(menu as any).home_menus.map((hm: any, i: number) => (
                          <div key={`home-menu-${i}-${hm.title}`} className="col homemenu">
                            <div className="homemenu-thumb-wrap mb-20">
                              <div className="homemenu-thumb fix">
                                <Link href={hm.link}>
                                  <Image src={hm.img} alt={hm.title} width={512} height={480} style={{ height: "100%" }} />
                                </Link>
                              </div>
                            </div>
                            <div className="homemenu-content text-center">
                              <h4 className="homemenu-title">
                                <Link href={hm.link}>{hm.title}</Link>
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (menu as any).pages_mega_menu ? (
                <div className="tp-submenu submenu tp-mega-menu" style={{ 
                  display: navTitle === menu.title ? "block" : "none",
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div className="tp-megamenu-wrapper">
                    <div className="row gx-50">
                      <div className="col-xl-8">
                        <div className="tp-megamenu-list-box">
                          <div className="row gx-50">
                            <div className="col-xl-8">
                              <div className="tp-megamenu-list">
                                <h4 className="tp-megamenu-title">
                                  {(menu as any).pages_mega_menu.first.title}
                                </h4>
                                <div className="tp-megamenu-list-wrap">
                                  <ul>
                                    {(menu as any).pages_mega_menu.first.submenus.map(
                                      (sm: any, i: number) => (
                                        <li key={`pages-first-${i}-${sm.title}`}>
                                          <Link href={sm.link}>{sm.title}</Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4">
                              <div className="tp-megamenu-list tp-megamenu-list-2">
                                <h4 className="tp-megamenu-title">
                                  {(menu as any).pages_mega_menu.second.title}
                                </h4>
                                <div className="tp-megamenu-list-wrap">
                                  <ul>
                                    {(menu as any).pages_mega_menu.second.submenus.map(
                                      (sm: any, i: number) => (
                                        <li key={`pages-second-${i}-${sm.title}`}>
                                          <Link href={sm.link}>{sm.title}</Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="tp-megamenu-shop-style">
                          <div className="tp-shop-banner-left p-relative">
                            <div className="tp-shop-banner-thumb">
                              <Image
                                src={shop_banner}
                                alt="shop-banner"
                                style={{height:'auto'}}
                              />
                            </div>
                            <div className="tp-shop-banner-content">
                              <h4 className="tp-shop-banner-title">Sale</h4>
                              <span>20% Off all Shoes</span>
                              <Link
                                className="tp-shop-btn"
                                href="/shop-details/1"
                              >
                                Shop Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (menu as any).portfolio_mega_menus ? (
                <div className="tp-submenu submenu tp-mega-menu" style={{ 
                  display: navTitle === menu.title ? "block" : "none",
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div className="tp-menu-fullwidth">
                    <div className="tp-megamenu-portfolio p-relative">
                      <div className="tp-megamenu-portfolio-banner">
                        <Image
                          src={port_img}
                          alt="port-img"
                          style={{height:'auto'}}
                        />
                      </div>
                      <div className="row gx-50">
                        <div className="col-xxl-9 col-xl-10">
                          <div className="tp-megamenu-list-box">
                            <div className="row gx-50">
                              <div className="col-xxl-5 col-xl-6">
                                <div className="tp-megamenu-list">
                                  <h4 className="tp-megamenu-title">
                                    {(menu as any).portfolio_mega_menus.first.title}
                                  </h4>
                                  <div className="tp-megamenu-list-wrap tp-portfolio-menu-style">
                                    <div className="row">
                                      {(menu as any).portfolio_mega_menus.first.submenus.map(
                                        (portSm: any, i: number) => (
                                          <div key={`portfolio-first-${i}`} className="col-lg-6">
                                            <ul>
                                              {portSm.menu_lists.map((psm: any, j: number) => (
                                                <li key={`portfolio-first-${i}-${j}-${psm.title}`}>
                                                  <Link href={psm.link}>
                                                    {psm.title}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {(menu as any).portfolio_mega_menus.second.submenus.map(
                                (portSm2: any, i: number) => (
                                  <div key={`portfolio-second-${i}`} className="col-xxl-3 col-xl-3">
                                    <div className="tp-megamenu-list tp-megamenu-list-2 ml-20">
                                      <h4 className="tp-megamenu-title">
                                        {portSm2.title}
                                      </h4>
                                      <div className="tp-megamenu-list-wrap">
                                        <ul>
                                          {portSm2.menu_lists.map((psm: any, j: number) => (
                                            <li key={`portfolio-second-${i}-${j}-${psm.title}`}>
                                              <Link href={psm.link}>
                                                {psm.title}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 d-none d-xxl-block">
                          <div className="tp-megamenu-portfolio-text">
                            <h4>60+</h4>
                            <span>Pre-built demo home page</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (menu as any).dropdown_menus ? (
                <ul className="tp-submenu submenu" style={{ 
                  display: navTitle === menu.title ? "block" : "none",
                  position: 'relative',
                  zIndex: 2
                }}>
                  {(menu as any).dropdown_menus.map((mm: any, i: number) => (
                    <li key={`dropdown-${i}-${mm.title}`}>
                      <Link href={mm.link}>{mm.title}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
