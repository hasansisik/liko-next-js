import React from "react";
import Image from "next/image";
import { IBlogDT } from "@/types/blog-d-t";
import Link from "next/link";
import { createSlug } from "@/utils/slug-utils";

export default function BlogItemTwo({ item }: { item: IBlogDT }) {
  // Create category slug for URL
  const categorySlug = item.category?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'general';
  
  return (
    <div className="tp-blog-item tp_fade_bottom">
      <div className="tp-blog-thumb fix p-relative">
        <Image src={item.img!} alt="blog-img" style={{ height: "auto" }} />
        <div className="tp-blog-meta">
          <span>{item.date}</span>
        </div>
      </div>
      <div className="tp-blog-content">
        <Link 
          href={`/category/${categorySlug}`}
          style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0056b3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#007bff';
          }}
        >
          {item.category}
        </Link>
        <h4 className="tp-blog-title-sm">
          <Link href={`/${item.slug || createSlug(item.title)}`}>{item.title}</Link>
        </h4>
      </div>
    </div>
  );
}
