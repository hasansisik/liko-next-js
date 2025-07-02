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
  const rc_posts = [...blog_lists].slice(0, 3);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  
  // Fetch blog posts on component mount if not already loaded
  useEffect(() => {
    if (blogPosts.length === 0) {
      dispatch(getAllBlogPosts({ 
        published: true,
        limit: 100
      }));
    }
  }, [dispatch, blogPosts.length]);
  
  // Extract unique categories from blog posts
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
        <h3 className="sidebar__widget-title">Category</h3>
        <div className="sidebar__widget-content">
          <ul>
            {displayCategories.map((category, index) => (
              <li key={index}>
                <Link 
                  href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sidebar__widget mb-65">
        <h3 className="sidebar__widget-title">Recent Post</h3>
        <div className="sidebar__widget-content">
          <div className="sidebar__post rc__post">
            {rc_posts.map((item) => (
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
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar__widget mb-65">
        <h3 className="sidebar__widget-title">Tags</h3>
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

      <div className="sidebar__widget mb-65">
        <h3 className="sidebar__widget-title">Follow Us</h3>
        <div className="sidebar__widget-content">
          <div className="sidebar__social">
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
