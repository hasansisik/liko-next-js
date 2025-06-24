import React from "react";
import { blog_modern } from "@/data/blog-data";
import usePagination from "@/hooks/use-pagination";
import Pagination from "../ui/pagination";
import { IBlogDT } from "@/types/blog-d-t";
import BlogItem from "./blog-item/blog-item";

export default function BlogModern() {
  const blog_items = [...blog_modern];
  const { currentItems, handlePageClick, pageCount } = usePagination<IBlogDT>(blog_items,9);
  return (
    <div className="blog-details-realated-area pt-120 pb-70">
      <div className="container">
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {currentItems.map((item) => (
            <div key={item.id} className="col-xl-4 col-lg-6 col-md-6 mb-50" style={{ 
              display: 'flex',
              alignItems: 'stretch'
            }}>
              <BlogItem item={item} />
            </div>
          ))}

          <div className="col-12">
            <div className="basic-pagination mt-40 d-flex align-items-center justify-content-center">
              <nav>
                <Pagination
                  handlePageClick={handlePageClick}
                  pageCount={pageCount}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
