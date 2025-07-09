import React from "react";
import { useAppSelector } from '@/redux/hook';
import { formatBlogDate } from '@/utils/date-utils';
import { blog_home_five } from "@/data/blog-data";
import BlogItemTwo from "./blog-item/blog-item-2";

export default function BlogOne() {
  const { blogPosts } = useAppSelector((state) => state.blogPosts);
  
  // Convert Redux blog posts to the format expected by BlogItemTwo
  const reduxBlogItems = blogPosts.slice(0, 4).map(post => ({
    id: parseInt(post._id?.slice(-6) || "1", 16),
    _id: post._id,
    img: post.img,
    title: post.title,
    date: formatBlogDate(post.date || post.createdAt),
    category: post.categories?.[0] || 'General',
    author: post.author || 'Admin',
    desc: post.desc,
    commentCount: post.commentCount || 0,
    comments: (post.comments || []).map((comment, index) => ({
      id: parseInt(comment.id?.slice(-6) || index.toString(), 16),
      name: comment.name,
      avatar: comment.avatar || "/assets/img/inner-blog/blog-details/avatar/avatar-3.jpg",
      date: comment.date,
      comment: comment.comment
    })),
    content: post.content,
    video: post.video,
    videoId: post.videoId,
    blogQuote: post.blogQuote,
    imgSlider: post.imgSlider,
    blogQuoteTwo: post.blogQuoteTwo,
    blogHeroSlider: post.blogHeroSlider,
    images: post.images,
    avatar: post.avatar,
    isPublished: post.isPublished,
    tags: post.tags,
    slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  }));
  
  // Use Redux data if available, otherwise fallback to static data
  const blog_items = reduxBlogItems.length > 0 ? reduxBlogItems : blog_home_five.slice(0, 4);
  
  return (
    <div className="tp-blog-area ">
      <div className="container container-1775">
        <div className="row">
          {blog_items.map((item) => (
            <div key={item.id} className="col-xl-3 col-lg-6 col-md-6 ">
              <BlogItemTwo item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
