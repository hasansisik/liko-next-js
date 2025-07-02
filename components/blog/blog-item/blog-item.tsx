import React from "react";
import Image from "next/image";
import { IBlogDT } from "@/types/blog-d-t";
import Link from "next/link";
import { createSlug } from "@/utils/slug-utils";
import useMobile from "@/hooks/use-mobile";

export default function BlogItem({ item }: { item: IBlogDT }) {
  // Create category slug for URL
  const categorySlug = item.category?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'general';
  const isMobile = useMobile();
  
  return (
    <div 
      className="tp-blog-item" 
      style={{ 
        width: '100%',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <div className="tp-blog-thumb fix p-relative" style={{ 
        height: isMobile ? '200px' : '250px', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Image 
          src={item.img!} 
          alt="blog-img" 
          fill
          sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          style={{ 
            objectFit: "cover" 
          }} 
          priority={true}
        />
        <div className="tp-blog-meta">
          <span>{item.date}</span>
        </div>
      </div>
      <div className="tp-blog-content" style={{ 
        padding: isMobile ? '15px' : '20px', 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <Link 
            href={`/category/${categorySlug}`}
            style={{ 
              fontSize: '12px', 
              color: '#007bff', 
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '10px',
              display: 'block',
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
          <h4 className="tp-blog-title-sm" style={{ 
            margin: '0',
            lineHeight: '1.4',
            fontSize: isMobile ? '16px' : '18px'
          }}>
            <Link 
              href={`/${item.slug || createSlug(item.title)}`}
              style={{ 
                textDecoration: 'none',
                color: 'inherit',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {item.title}
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
