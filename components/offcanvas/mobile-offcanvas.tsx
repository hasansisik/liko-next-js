import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Behance, CloseTwo, Dribble, InstagramTwo, Youtube } from "../svg";
import MobileMenus from "./mobile-menus";
import { INavigation } from "@/types/header-d-t";

// prop type
type IProps = {
  openOffcanvas: boolean;
  setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  navigationData?: INavigation;
};

export default function MobileOffcanvas({openOffcanvas,setOpenOffcanvas, navigationData}: IProps) {
  return (
    <>
      <div className={`tp-offcanvas-area ${openOffcanvas ? "opened" : ""}`}>
        <div className="tp-offcanvas-wrapper">
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
            <div className="tp-offcanvas-logo">
              <Link href="/">
                <Image src="/assets/img/logo/logo.png" alt="logo" width={120} height={40} />
              </Link>
            </div>
            <div className="tp-offcanvas-close">
              <button
                className="tp-offcanvas-close-btn"
                onClick={() => setOpenOffcanvas(false)}
              >
                <CloseTwo />
              </button>
            </div>
          </div>
          <div className="tp-offcanvas-main">
            <div className="tp-main-menu-mobile d-xl-none">
              <MobileMenus navigationData={navigationData} />
            </div>

            <div className="tp-offcanvas-contact">
              <h3 className="tp-offcanvas-title sm">Information</h3>

              <ul>
                <li>
                  <a href="tel:1245654">+ 4 20 7700 1007</a>
                </li>
                <li>
                  <a href="mailto:hello@diego.com">hello@diego.com</a>
                </li>
                <li>
                  <a href="#">Avenue de Roma 158b, Lisboa</a>
                </li>
              </ul>
            </div>
            <div className="tp-offcanvas-social">
              <h3 className="tp-offcanvas-title sm">Follow Us</h3>
              <ul>
                <li>
                  <a href="#"><InstagramTwo /></a>
                </li>
                <li>
                  <a href="#"><Youtube /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setOpenOffcanvas(false)}
        className={`body-overlay ${openOffcanvas ? "opened" : ""}`}
      ></div>
    </>
  );
}
