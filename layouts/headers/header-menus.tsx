import React, { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { INavigation } from "@/types/header-d-t";

// Props type
type IProps = {
  onOpenDialog?: () => void;
  isSticky?: boolean;
  color?: "black" | "white";
  navigationData?: INavigation;
};

const imgStyle: CSSProperties = {
  width: "100%",
  height: "auto",
  objectFit: "cover",
};
const HeaderMenus = ({ onOpenDialog, isSticky = false, color, navigationData }: IProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Return early if no navigationData provided
  if (!navigationData?.menus) {
    return null;
  }
  
  const menuItems = navigationData.menus;
  
  return (
    <ul
      style={{
        fontSize: "13px",
        fontWeight: "500",
      }}
    >
      {menuItems.map((menu) => (
        <li key={menu.id} className={menu.hasDropdown ? "has-dropdown" : ""}>
          <Link
            href={menu.url}
            style={{
              color: isSticky
                ? "#333"
                : color === "black"
                ? "#333"
                : color === "white"
                ? "white"
                : "white",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
          >
            {menu.title}
          </Link>
          {menu.hasDropdown && menu.subMenus && (
            <ul className="tp-submenu submenu">
              {menu.subMenus.map((sm) => (
                <li key={sm.id}>
                  <Link
                    href={sm.url}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "12px",
                    }}
                  >
                    {sm.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}

      {/* Dynamic CTA Button */}
      {navigationData?.cta && (
        <li className="get-advice-btn" style={{ marginLeft: "20px" }}>
          <button
            onClick={navigationData?.cta?.action === 'openDialog' ? onOpenDialog : undefined}
            style={{
              background: "transparent",
              border: "none",
              color: isSticky
                ? "#333"
                : color === "black"
                ? "#333"
                : color === "white"
                ? "white"
                : "white",
              fontSize: "13px",
              fontWeight: "500",
              textDecoration: "underline",
              cursor: "pointer",
              padding: "0",
              position: "relative",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              setIsHovered(true);
              e.currentTarget.style.textDecoration = "none";
              e.currentTarget.style.transform = "translateX(5px)";
            }}
            onMouseLeave={(e) => {
              setIsHovered(false);
              e.currentTarget.style.textDecoration = "underline";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {navigationData.cta.text.toUpperCase()}
            {isHovered ? (
              <ArrowRight
                size={25}
                style={{
                  marginLeft: "8px",
                  transition: "all 0.3s ease",
                  display: "inline-block",
                }}
              />
            ) : (
              <ArrowUpRight
                size={25}
                style={{
                  marginLeft: "8px",
                  transition: "all 0.3s ease",
                  display: "inline-block",
                }}
              />
            )}
          </button>
        </li>
      )}
    </ul>
  );
};

export default HeaderMenus;
