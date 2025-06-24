import React from "react";
import Image from "next/image";
import { IBlogDT } from "@/types/blog-d-t";
import Link from "next/link";
import { createSlug } from "@/utils/slug-utils";

export default function BlogItem({ item }: { item: IBlogDT }) {
  return (
    <div className="tp-blog-item">
      <div className="tp-blog-thumb fix p-relative">
        <Image src={item.img!} alt="blog-img" style={{ height: "auto" }} />
        <div className="tp-blog-meta">
          <span>{item.date}</span>
        </div>
      </div>
      <div className="tp-blog-content">
        <span>{item.category}</span>
        <h4 className="tp-blog-title-sm">
          <Link href={`/blog-details/${createSlug(item.title)}`}>{item.title}</Link>
        </h4>
      </div>
    </div>
  );
}
