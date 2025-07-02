import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { blog_lists } from "@/data/blog-data";
import { createSlug } from "@/utils/slug-utils";
import ContactFormDental from "../form/contact-form-dental";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getAllBlogPosts } from '@/redux/actions/blogPostActions';

export default function BlogSidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { blogPosts } = useAppSelector((state) => state.blogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  
  // Fetch blog posts on component mount if not already loaded
  useEffect(() => {
    if (blogPosts.length === 0) {
      dispatch(getAllBlogPosts({ 
        published: true,
        limit: 100
      }));
    }
  }, [dispatch, blogPosts.length]);
  
  // Extract unique categories and recent posts from blog posts
  useEffect(() => {
    if (blogPosts.length > 0) {
      // Get all categories from all posts
      const allCategories = blogPosts.reduce((acc: string[], post) => {
        if (post.categories && Array.isArray(post.categories)) {
          return [...acc, ...post.categories];
        }
        return acc;
      }, []);
      
      // Remove duplicates and filter out empty categories
      const uniqueCategories = [...new Set(allCategories)].filter(Boolean);
      setCategories(uniqueCategories);
      
      // Get recent posts (sort by date and take the first 3)
      const sortedPosts = [...blogPosts]
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA; // Sort in descending order (newest first)
        })
        .slice(0, 3); // Take only the first 3 posts
      
      setRecentPosts(sortedPosts);
    }
  }, [blogPosts]);
  
  // Fallback categories if no blog posts are loaded
  const fallbackCategories = [
    "Branding",
    "Lifestyle",
    "UI/UX Design",
    "Production",
    "Dental Care",
    "Treatments"
  ];
  
  // Use dynamic categories or fallback if none are available
  const displayCategories = categories.length > 0 ? categories : fallbackCategories;
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/category/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <aside className="sidebar__wrapper">
      <div className="sidebar__widget mb-65">
        <div className="sidebar__widge-title-box">
          <h3 className="sidebar__widget-title">Search</h3>
        </div>
        <div className="sidebar__widget-content">
          <div className="sidebar__search">
            <form onSubmit={handleSearch}>
              <div className="sidebar__search-input-2">
                <input 
                  type="text" 
                  placeholder="Search here" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <i className="far fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Dental Contact Form Section */}
      <div className="sidebar__widget mb-65">
        <div className="service-details__contact-form-wrap p-30">
          <div className="text-center mb-30">
            <h3 className="sidebar__widget-title mb-20">Ready to Get Started?</h3>
            <p className="mb-0">Contact us today to discuss your treatment</p>
          </div>
          <ContactFormDental
            formData={{
              title: "Book Your Appointment",
              subtitle: "Expert available",
              responseTime: "Schedule within 24 hours",
              showWhatsApp: false,
              placeholders: {
                name: "Your Name",
                phone: "Phone Number",
                countrySearch: "Search country..."
              },
              countries: [
                { code: "US", name: "United States", phone: "+1", flag: "🇺🇸" },
                { code: "TR", name: "Turkey", phone: "+90", flag: "🇹🇷" }
              ],
              defaultCountry: "US",
              submitButtonText: "Book Now",
              whatsAppText: "Chat on WhatsApp",
              whatsAppLink: "https://wa.me/1234567890"
            }}
            style={{
              maxWidth: "100%",
              margin: "0",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>

      <div className="sidebar__widget mb-65">
        <h3 className="sidebar__widget-title">Recent Post</h3>
        <div className="sidebar__widget-content">
          <div className="sidebar__post rc__post">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="rc__post mb-30 d-flex align-items-center"
                >
                  <div className="rc__post-thumb mr-20">
                    <Link href={`/${post.slug || createSlug(post.title)}`}>
                      <Image
                        src={post.img || post.thumbnail || "/assets/img/blog/blog-1.jpg"}
                        alt={post.title}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                  <div className="rc__post-content">
                    <div className="rc__meta d-flex align-items-center">
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="rc__post-title">
                      <Link href={`/${post.slug || createSlug(post.title)}`}>
                        {post.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              // Fallback to static posts if no dynamic posts are available
              blog_lists.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="rc__post mb-30 d-flex align-items-center"
                >
                  <div className="rc__post-thumb mr-20">
                    <Link href={`/${createSlug(item.title)}`}>
                      <Image
                        src={item.img!}
                        alt="blog-img"
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                  <div className="rc__post-content">
                    <div className="rc__meta d-flex align-items-center">
                      <span>{item.date}</span>
                    </div>
                    <h3 className="rc__post-title">
                      <Link href={`/${createSlug(item.title)}`}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="sidebar__widget mb-65">
        <h3 className="sidebar__widget-title">Category</h3>
        <div className="sidebar__widget-content">
          <div className="tagcloud">
            {displayCategories.map((category, index) => (
              <Link 
                key={index} 
                href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>


    </aside>
  );
}
