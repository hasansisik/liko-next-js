import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hook";
import { getAllBlogPosts, BlogPostData } from "@/redux/actions/blogPostActions";
import { blog_modern } from "@/data/blog-data";
import usePagination from "@/hooks/use-pagination";
import Pagination from "../ui/pagination";
import { IBlogDT } from "@/types/blog-d-t";
import BlogItem from "./blog-item/blog-item";
import { formatBlogDate } from "@/utils/date-utils";

interface BlogModernProps {
  blogPosts?: BlogPostData[];
}

export default function BlogModern({ blogPosts = [] }: BlogModernProps) {
  const dispatch = useAppDispatch();

  // Fetch blog posts on component mount if not already loaded and no props provided
  useEffect(() => {
    if (blogPosts.length === 0) {
      dispatch(getAllBlogPosts({ 
        published: true,
        limit: 50 // Get more posts for pagination
      }));
    }
  }, [dispatch, blogPosts.length]);

  // Transform blog posts to match IBlogDT interface
  const transformedPosts = blogPosts.map(post => ({
    id: parseInt(post._id?.slice(-6) || "1", 16),
    img: post.img,
    title: post.title,
    date: formatBlogDate(post.date || post.createdAt),
    category: post.categories?.[0] || 'General',
    author: post.author || 'Admin',
    desc: post.desc,
    commentCount: post.commentCount || 0,
    comments: post.comments?.map((comment, index) => ({
      id: index + 1,
      name: comment.name,
      avatar: comment.avatar || "/assets/img/inner-blog/blog-details/avatar/avatar-3.jpg",
      date: comment.date,
      comment: comment.comment
    })) || [],
    content: post.content,
    video: post.video,
    videoId: post.videoId,
    // Add all optional fields from IBlogDT
    avatar: post.avatar,
    blogQuote: post.blogQuote,
    imgSlider: post.imgSlider,
    blogQuoteTwo: post.blogQuoteTwo,
    blogHeroSlider: post.blogHeroSlider,
    images: post.images,
    isPublished: post.isPublished,
    tags: post.tags,
    slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  }));

  // Use transformed posts if available, otherwise fallback to static data
  const blog_items = transformedPosts.length > 0 ? transformedPosts as IBlogDT[] : blog_modern;
  const { currentItems, handlePageClick, pageCount } = usePagination<IBlogDT>(blog_items, 9);

  // Loading state is now determined by whether we have posts
  const loading = blogPosts.length === 0;

  if (loading && transformedPosts.length === 0) {
    return (
      <div className="blog-details-realated-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="py-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-3">Blog yazıları yükleniyor...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-details-realated-area pt-120 pb-70">
      <div className="container">
        {blog_items.length === 0 ? (
          <div className="row">
            <div className="col-12 text-center">
              <div className="py-5">
                <h4>Henüz blog yazısı bulunmuyor</h4>
                <p>Yakında yeni içerikler eklenecek.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {currentItems.map((item) => (
                <div key={item.id} className="col-xl-4 col-lg-6 col-md-6 mb-50" style={{ 
                  display: 'flex',
                  alignItems: 'stretch'
                }}>
                  <BlogItem item={item} />
                </div>
              ))}
            </div>

            {pageCount > 1 && (
              <div className="row">
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
