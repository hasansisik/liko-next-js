import React from "react";
import Image from "next/image";
import { IBlogDT } from "@/types/blog-d-t";
import Link from "next/link";
import { createSlug } from "@/utils/slug-utils";

export default function BlogItem({ item }: { item: IBlogDT }) {
  return (
    <div 
      className="tp-blog-item" 
      style={{ 
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
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="tp-blog-thumb fix p-relative" style={{ 
        height: '250px', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Image 
          src={item.img!} 
          alt="blog-img" 
          fill
          style={{ 
            objectFit: "cover" 
          }} 
        />
        <div className="tp-blog-meta">
          <span>{item.date}</span>
        </div>
      </div>
      <div className="tp-blog-content" style={{ 
        padding: '20px', 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <span style={{ 
            fontSize: '12px', 
            color: '#666', 
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '10px',
            display: 'block'
          }}>
            {item.category}
          </span>
          <h4 className="tp-blog-title-sm" style={{ 
            margin: '0',
            lineHeight: '1.4'
          }}>
            <Link 
              href={`/${createSlug(item.title)}`}
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
