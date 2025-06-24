import React from "react";
import Link from "next/link";
import { IBlogDT } from "@/types/blog-d-t";

type IProps = {
  blog: IBlogDT;
};

export default function BlogDetailsBreadcrumb({ blog }: IProps) {
  // Handle case where blog might be undefined during build
  if (!blog) {
    return (
      <div className="blog-details-area">
        <div className="blog-details-bg p-relative d-flex align-items-center pt-120 pb-120" style={{
          backgroundColor: '#000',
          minHeight: '400px'
        }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="blog-details-content text-center">
                  <h1 className="blog-details-title" style={{
                    color: '#fff',
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    marginTop: '15px',
                    marginBottom: '0'
                  }}>
                    Blog Details
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-details-area">
      <div
        className="blog-details-bg p-relative d-flex align-items-center pt-120 pb-120"
        style={{
          backgroundColor: '#000',
          minHeight: '400px'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-30 text-center">
                <ol className="breadcrumb justify-content-center" style={{
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0'
                }}>
                  <li className="breadcrumb-item" style={{
                    '--bs-breadcrumb-divider': "'/'",
                    '--bs-breadcrumb-divider-color': '#fff'
                  } as React.CSSProperties}>
                    <Link href="/" style={{
                      color: '#999',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item" style={{
                    '--bs-breadcrumb-divider': "'/'",
                    '--bs-breadcrumb-divider-color': '#fff'
                  } as React.CSSProperties}>
                    <Link href="/blog" style={{
                      color: '#999',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}>
                      Blog
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page" style={{
                    color: '#fff',
                    fontSize: '14px'
                  }}>
                    Blog Details
                  </li>
                </ol>
              </nav>
              
              <style jsx>{`
                .breadcrumb-item + .breadcrumb-item::before {
                  content: "/";
                  color: #fff !important;
                  font-weight: bold;
                  font-size: 16px;
                  margin: 0 8px;
                }
              `}</style>
              
              {/* Content */}
              <div className="blog-details-content text-center">
                <span className="blog-details-meta" style={{
                  color: '#999',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {blog.category} <i style={{ color: '#666' }}>. {blog.date}</i>
                </span>
                <h1 className="blog-details-title tp-char-animation" style={{
                  color: '#fff',
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  fontWeight: 'bold',
                  lineHeight: '1.2',
                  marginTop: '15px',
                  marginBottom: '0'
                }}>
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
