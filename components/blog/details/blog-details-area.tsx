import React from "react";
import Image from "next/image";
import BlogSidebar from "../blog-sidebar";
import { QuoteThree, Share, Tag } from "@/components/svg";
import BlogDetailsAuthor from "./blog-details-author";
import BlogDetailsNavigation from "./blog-details-navigation";
import BlogDetailsComments from "./blog-details-comments";
import BlogReplyForm from "@/components/form/blog-reply-form";
import { IBlogDT } from "@/types/blog-d-t";

type IProps = {
  blog: IBlogDT;
};

export default function BlogDetailsArea({ blog }: IProps) {
  // Handle case where blog might be undefined during build
  if (!blog) {
    return (
      <section className="postbox__area tp-blog-sidebar-sticky-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="postbox__wrapper">
                <div className="blog-details-top-text">
                  <p>Blog post not found.</p>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const content = blog.content;
  
  if (!content) {
    return (
      <section className="postbox__area tp-blog-sidebar-sticky-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="postbox__wrapper">
                <div className="blog-details-top-text">
                  <p>Content not available for this blog post.</p>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="postbox__area tp-blog-sidebar-sticky-area pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-xxl-8 col-xl-8 col-lg-8">
            <div className="postbox__wrapper">
              <div 
                dangerouslySetInnerHTML={{ __html: content.htmlContent }}
              />

              {/* blog details navigation */}
              <BlogDetailsNavigation />
              {/* blog details navigation */}

              <div className="postbox__comment mb-100">
                <h3 className="postbox__comment-title">3 Comments</h3>
                {/* blog details comments */}
                <BlogDetailsComments />
                {/* blog details comments */}
              </div>

              <div className="tp-postbox-details-form">
                <h3 className="tp-postbox-details-form-title">Leave a Reply</h3>
                <p>
                  Your email address will not be published. Required fields are
                  marked *
                </p>

                {/* blog reply form */}
                <BlogReplyForm />
                {/* blog reply form */}
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
