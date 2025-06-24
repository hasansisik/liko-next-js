import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blog_lists } from "@/data/blog-data";
import { createSlug } from "@/utils/slug-utils";
import ContactFormDental from "../form/contact-form-dental";

export default function BlogSidebar() {
  const rc_posts = [...blog_lists].slice(0, 3);
  return (
    <aside className="sidebar__wrapper">
      <div className="sidebar__widget mb-65">
        <div className="sidebar__widge-title-box">
          <h3 className="sidebar__widget-title">Search</h3>
        </div>
        <div className="sidebar__widget-content">
          <div className="sidebar__search">
            <form action="#">
              <div className="sidebar__search-input-2">
                <input type="text" placeholder="Search here" />
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
            title={`Book Your `}
            subtitle="Expert available"
            responseTime="Schedule within 24 hours"
            showWhatsApp={false}
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
            <li>
              <Link href="/blog">Branding</Link>
            </li>
            <li>
              <Link href="/blog">Lifestyle</Link>
            </li>
            <li>
              <Link href="/blog">UI/UX Design</Link>
            </li>
            <li>
              <Link href="/blog">Production</Link>
            </li>
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
            <a href="#">Creative</a>
            <a href="#">Photography</a>
            <a href="#">Lifestyle</a>
            <a href="#">Branding</a>
            <a href="#">Marketing</a>
            <a href="#">UI/UX Design</a>
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
