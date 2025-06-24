import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";

import BlogSidebar from "./blog-sidebar";
import { blog_classic } from "@/data/blog-data";
import { Quote, QuoteTwo } from "../svg";
import usePagination from "@/hooks/use-pagination";
import { IBlogDT } from "@/types/blog-d-t";
import PaginationCom from "../ui/pagination";
import { createSlug } from "@/utils/slug-utils";

// slider setting
const slider_setting: SwiperOptions = {
  slidesPerView: 1,
  loop: true,
  autoplay: false,
  spaceBetween: 0,
  speed: 1000,
  effect: "fade",
  pagination: {
    el: ".blog-sidebar-dot",
    clickable: true,
  },
  navigation: {
    prevEl: ".postbox-arrow-prev",
    nextEl: ".postbox-arrow-next",
  },
};

// prop type
type IProps = {
  setIsVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
};

export default function BlogClassicArea({setIsVideoOpen,setVideoId}:IProps) {
  const blog_items = [...blog_classic.filter((b) => !b.blogHeroSlider)];
  const { currentItems, handlePageClick, pageCount } = usePagination<IBlogDT>(blog_items,4);

  function handleVideoModal(id: string) {
    setIsVideoOpen(true);
    setVideoId(id);
  }
  return (
    <section
      id="postbox"
      className="postbox__area tp-blog-sidebar-sticky-area pt-120 pb-80"
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-8 col-xl-8 col-lg-8">
            <div className="postbox__wrapper">
              {currentItems.map((item) => (
                <article key={item.id} className="postbox__item format-image mb-50 transition-3">
                  {item.img && (
                    <div className="postbox__thumb w-img">
                      <Link href={`/blog-details/${createSlug(item.title)}`}>
                        <Image
                          src={item.img}
                          alt="blog-img"
                          style={{ height: "auto" }}
                        />
                      </Link>
                    </div>
                  )}
                  {item.video && (
                    <div className="postbox__thumb postbox__video w-img p-relative">
                      <Image
                        src={item.img!}
                        alt="blog-img"
                        style={{ height: "auto" }}
                      />
                      <button
                        onClick={() => handleVideoModal(item.videoId!)}
                        className="play-btn pulse-btn popup-video"
                      >
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                  )}
                  {item.imgSlider && (
                    <div className="postbox__thumb postbox__slider w-img p-relative">
                      <div className="postbox__slider-nav">
                        <button
                          type="button"
                          className="postbox__slider-button-next"
                        >
                          <i className="fal fa-angle-right"></i>
                        </button>
                        <button
                          type="button"
                          className="postbox__slider-button-prev"
                        >
                          <i className="fal fa-angle-left"></i>
                        </button>
                      </div>
                      <div className="swiper-container postbox__slider">
                        <div className="swiper-wrapper">
                          {item.images?.map((img, i) => (
                            <div key={i} className="swiper-slide">
                              <Image
                                src={img}
                                alt="blog-img"
                                style={{ height: "auto" }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {!item.blogQuote && !item.blogQuoteTwo && (
                    <div className="postbox__content">
                      <div className="postbox__meta">
                        <span>
                          {item.category} . {item.date}
                        </span>
                      </div>
                      <h3 className="postbox__title">
                        <Link href={`/blog-details/${createSlug(item.title)}`}>{item.title}</Link>
                      </h3>
                      <div className="postbox__text">
                        <p>{item.desc}</p>
                      </div>
                      <div className="postbox__read-more">
                        <Link href={`/blog-details/${createSlug(item.title)}`}
                          className="tp-btn-border-lg"
                        >
                          read more
                        </Link>
                      </div>
                    </div>
                  )}
                  {item.blogQuoteTwo && (
                    <div className="postbox__link-post-wrap d-flex align-items-center">
                      <span className="postbox__link-post-icon">
                        <Quote />
                      </span>
                      <p>
                        MERGE DIFFERENT TO CREATE A PERFECT <br /> PLAYLIST FOR
                        EACH.
                      </p>
                    </div>
                  )}
                  {item.blogQuote && (
                    <div className="postbox__quote">
                      <blockquote>
                        <p>{item.desc}</p>
                        <footer>
                          <cite>{item.title}</cite>
                        </footer>
                      </blockquote>
                    </div>
                  )}
                </article>
              ))}

              <div className="basic-pagination">
                <nav>
                  <PaginationCom
                    handlePageClick={handlePageClick}
                    pageCount={pageCount}
                  />
                </nav>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-4">
            {/* blog sidebar area */}
            <BlogSidebar />
            {/* blog sidebar area */}
          </div>
        </div>
      </div>
    </section>
  );
}
