import Link from "next/link";
import React from "react";
import { IBigTextData } from "../types/blog-modern-d-t";

// type 
type IProps = {
  cls?: string;
  bigTextData?: IBigTextData;
};

export default function BigText({ cls = "", bigTextData }: IProps) {
  // Default values for backward compatibility
  const defaultData: IBigTextData = {
    leftText: "CLINIC",
    rightText: "TOUCH",
    mainText: "Get Contact",
    linkUrl: "/contact"
  };

  const data = bigTextData || defaultData;

  return (
    <div className={`sv-big-text-area pb-80 ${cls}`}>
      <div className="container container-1530">
        <div className="sv-small-text-box d-flex justify-content-between">
          <span>{data.leftText}</span>
          <span>{data.rightText}</span>
        </div>
        <div className="sv-big-text-box">
          <h4 className="sv-big-text tp-char-animation">
            <Link href={data.linkUrl}>{data.mainText}</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
