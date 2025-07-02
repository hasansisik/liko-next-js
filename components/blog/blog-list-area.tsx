import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blog_lists } from "@/data/blog-data";
import usePagination from "@/hooks/use-pagination";
import Pagination from "../ui/pagination";
import { createSlug } from "@/utils/slug-utils";
import { formatBlogDate } from "@/utils/date-utils";
import { IBlogDT } from "@/types/blog-d-t";

interface BlogListAreaProps {
  blogPosts?: any[];
}

export default function BlogListArea({ blogPosts }: BlogListAreaProps) {
  // Use provided blogPosts or fallback to static data
  const blog_items: IBlogDT[] = blogPosts && blogPosts.length > 0 
    ? blogPosts.map(post => ({
        id: parseInt(post._id?.slice(-6) || "1", 16),
        img: post.img || "/assets/img/blog/default-blog.jpg",
        title: post.title,
        date: formatBlogDate(post.date || post.createdAt),
        category: post.categories?.[0] || 'General',
        author: post.author || 'Admin',
        desc: post.desc,
        slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        commentCount: post.commentCount || 0,
        comments: post.comments || [],
        content: post.content || '',
        video: post.video,
        videoId: post.videoId,
        avatar: post.avatar,
        blogQuote: post.blogQuote,
        imgSlider: post.imgSlider,
        blogQuoteTwo: post.blogQuoteTwo,
        blogHeroSlider: post.blogHeroSlider,
        images: post.images,
        isPublished: post.isPublished,
        tags: post.tags
      }))
    : blog_lists;
    
  const { currentItems, handlePageClick, pageCount } = usePagination(blog_items, 4);
  
  return (
    <div className="tp-blog-list-area" style={{ marginTop: '0', paddingTop: '20px', paddingBottom: '40px' }}>
      <div className="container container-1480">
        <div className="tp-blog-list-wrap">
          {currentItems.map((item) => (
            <div key={item.id} className="tp-blog-list-item" style={{ marginBottom: '30px' }}>
              <div className="row">
                <div className="col-xl-2 col-lg-2 tp-flex-end">
                  <div className="tp-blog-list-meta">
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-7">
                  <div className="tp-blog-list-content-wrap">
                    <div className="tp-blog-list-thumb anim-zoomin-wrap">
                      <Link href={`/${item.slug || createSlug(item.title)}`}>
                        <Image
                          className="anim-zoomin"
                          src={item.img!}
                          alt="blog-img"
                          style={{height: "auto"}}
                          width={500}
                          height={300}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5">
                  <div className="tp-blog-list-content tp-flex-column">
                    <div className="tp-blog-list-title-wrap">
                      <h4 className="tp-blog-list-title-sm">
                        <Link href={`/${item.slug || createSlug(item.title)}`}>{item.title}</Link>
                      </h4>
                      {item.desc && (
                        <p className="tp-blog-list-desc mt-2">
                          {item.desc.length > 150 ? `${item.desc.substring(0, 150)}...` : item.desc}
                        </p>
                      )}
                    </div>
                    <div className="tp-blog-list-link-wrap">
                      <Link className="tp-blog-list-link" href={`/${item.slug || createSlug(item.title)}`}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {pageCount > 1 && (
            <div className="col-12" style={{ marginTop: '40px' }}>
              <div className="basic-pagination d-flex align-items-center justify-content-center">
                <nav>
                  <Pagination
                    handlePageClick={handlePageClick}
                    pageCount={pageCount}
                  />
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

