import { IBlogDT } from "@/types/blog-d-t";

// blog images

// home 5
import blog_1 from "@/assets/img/home-05/blog/blog-1.jpg";
import blog_2 from "@/assets/img/home-05/blog/blog-2.jpg";
import blog_3 from "@/assets/img/home-05/blog/blog-3.jpg";
import blog_4 from "@/assets/img/home-05/blog/blog-4.jpg";
// blog modern 
import b_m_1 from "@/assets/img/inner-blog/blog-standard/blog-1.jpg";
import b_m_2 from "@/assets/img/inner-blog/blog-standard/blog-2.jpg";
import b_m_3 from "@/assets/img/inner-blog/blog-standard/blog-3.jpg";
import b_m_4 from "@/assets/img/inner-blog/blog-standard/blog-4.jpg";
import b_m_5 from "@/assets/img/inner-blog/blog-standard/blog-5.jpg";
import b_m_6 from "@/assets/img/inner-blog/blog-standard/blog-6.jpg";
import b_m_7 from "@/assets/img/inner-blog/blog-standard/blog-7.jpg";

// avatar
import avatar from "@/assets/img/inner-blog/blog-sidebar/avatar/avata-1.jpg";

// blog postbox img
import blog_post_1 from '@/assets/img/inner-blog/blog-sidebar/sidebar-left-1.jpg';
import blog_post_2 from '@/assets/img/inner-blog/blog-sidebar/sidebar-left-2.jpg';
import blog_post_3 from '@/assets/img/inner-blog/blog-sidebar/sidebar-left-3.jpg';
import blog_post_4 from '@/assets/img/inner-blog/blog-sidebar/sidebar-left-4.jpg';

// blog list images
import blog_list_1 from '@/assets/img/inner-blog/blog-right-sidebar/blog-1.jpg';
import blog_list_2 from '@/assets/img/inner-blog/blog-right-sidebar/blog-2.jpg';
import blog_list_3 from '@/assets/img/inner-blog/blog-right-sidebar/blog-3.jpg';
import blog_list_4 from '@/assets/img/inner-blog/blog-right-sidebar/blog-4.jpg';
import blog_list_5 from '@/assets/img/inner-blog/blog-right-sidebar/blog-5.jpg';

// detail images
import details_thumb_1 from "@/assets/img/inner-blog/blog-details/blog-details-2.jpg";
import details_thumb_2 from "@/assets/img/inner-blog/blog-details/blog-details-3.jpg";
import details_thumb_3 from "@/assets/img/inner-blog/blog-details/blog-details-4.jpg";

export const blog_data: IBlogDT[] = [
  {
    id: 1,
    img: blog_list_1,
    title: "Design To Remember3",
    date: '01 DEC, 2023',
    category: 'Marketing',
    author: 'John Doe',
    desc: 'Exploring the fundamentals of memorable design that creates lasting impressions and drives business success.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>The metaverse can be viewed as an evolution of today's internet, which in turn evolved from passive media that we simply consumed. In the age of radio and television, the consumer's only job was to listen and decide if they wanted to buy.</p>
        </div>
        
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">What Makes Design Memorable?</h4>
          <p class="mb-20">Design to Remember is simply more than just aesthetics. It's about creating emotional connections with your audience through thoughtful visual storytelling and strategic brand positioning.</p>
          <p>It has survived not only five centuries, but also the leap into digital design, remaining essentially unchanged in its core principles.</p>
        </div>
        
        <div class="blog-details-thumb-box">
          <div class="row">
            <div class="col-md-6">
              <div class="blog-details-thumb">
                <img class="w-100 mb-20" src="/assets/img/inner-blog/blog-details/blog-details-2.jpg" alt="details-thumb" style="height: auto" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="blog-details-thumb">
                <img class="w-100 mb-20" src="/assets/img/inner-blog/blog-details/blog-details-3.jpg" alt="details-thumb" style="height: auto" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Relationship & Communication</h4>
          <p>But, like most designers, they promised more than they could deliver. Why not indeed! Creativity and everything. And then the design's not so bad? Hello, little brand. I will create you! No, I'm a designer! Design might! Man, I'm inspired all over. I feel like I just went ten rounds with mighty creativity. I found what I need. And it's not just colors, it's emotions. Then we'll go with that design file!</p>
        </div>
        
        <div class="blog-details-blockquote">
          <blockquote>
            <span class="quote-icon">
              <svg width="90" height="66" viewBox="0 0 90 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 42.6672C0 27.2282 7.2986 14.2644 21.8957 3.77586C25.3156 1.25862 27.8597 0 29.528 0C30.6957 0 31.2796 0.755172 31.2796 2.26552C31.2796 3.69195 31.0294 4.7408 30.5289 5.41207C30.1118 5.99943 29.5697 6.54483 28.9024 7.04828C28.2351 7.55172 27.5678 8.01322 26.9005 8.43276C26.2332 8.8523 25.4408 9.48161 24.5232 10.3207C16.3488 17.369 12.2616 24.2494 12.2616 30.9621C12.2616 34.5701 13.7213 36.3741 16.6408 36.3741C28.9024 36.3741 35.0332 41.4506 35.0332 51.6034C35.0332 55.5471 33.5317 58.9034 30.5289 61.6724C27.5261 64.3575 24.2313 65.7 20.6445 65.7C14.055 65.7 8.96682 63.1408 5.3801 58.0224C1.79337 52.8201 0 47.7017 0 42.6672ZM55.0919 42.6672C55.0919 26.9764 62.182 14.1385 76.3621 4.15345C79.6986 1.38448 82.2009 0 83.8692 0C85.5374 0 86.3716 0.755172 86.3716 2.26552C86.3716 3.69195 86.1213 4.69885 85.6208 5.28621C85.2038 5.87356 84.6616 6.46092 83.9943 7.04827C83.327 7.55172 82.6597 8.01322 81.9924 8.43276C81.3251 8.8523 80.5744 9.48161 79.7403 10.3207C71.3156 17.8724 67.1033 24.7529 67.1033 30.9621C67.1033 34.5701 68.6464 36.3741 71.7327 36.3741C83.9109 36.3741 90 41.4086 90 51.4776C90 55.3374 88.4986 58.6937 85.4957 61.5465C82.5763 64.3155 79.2815 65.7 75.6114 65.7C69.1886 65.7 64.1422 63.1828 60.472 58.1483C56.8853 53.0299 55.0919 47.8695 55.0919 42.6672Z" fill="#19191A" fill-opacity="0.1"></path>
              </svg>
            </span>
            <p>Don't watch the clock; do what it does. keep going.</p>
            <span class="blockquote-info">Sam Levenson</span>
          </blockquote>
        </div>
        
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">The Future of Design</h4>
          <p>With any accomplished project, great design management is an essential component. We business owners hire product designers, they expect them to not only perform well, but also on time. At Stan Vision, we provide you with an experienced design team, led by an expert PM who knows how to prioritise your platform and product.</p>
        </div>
        
        <div class="blog-details-thumb-box">
          <div class="row">
            <div class="col-xl-12">
              <div class="blog-details-thumb">
                <img src="/assets/img/inner-blog/blog-details/blog-details-4.jpg" alt="details-thumb" style="height: auto" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
                <a href="#">Creative</a>
                <a href="#">Design</a>
                <a href="#">Branding</a>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4">
              <div class="blog-details-share text-start text-md-end">
                <span>
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7547 4.90002C11.8317 4.90002 12.7047 4.02697 12.7047 2.95001C12.7047 1.87305 11.8317 1 10.7547 1C9.67774 1 8.80469 1.87305 8.80469 2.95001C8.80469 4.02697 9.67774 4.90002 10.7547 4.90002Z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M2.95001 9.45032C4.02697 9.45032 4.90002 8.57727 4.90002 7.5003C4.90002 6.42334 4.02697 5.55029 2.95001 5.55029C1.87305 5.55029 1 6.42334 1 7.5003C1 8.57727 1.87305 9.45032 2.95001 9.45032Z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M10.7547 14.0001C11.8317 14.0001 12.7047 13.1271 12.7047 12.0501C12.7047 10.9731 11.8317 10.1001 10.7547 10.1001C9.67774 10.1001 8.80469 10.9731 8.80469 12.0501C8.80469 13.1271 9.67774 14.0001 10.7547 14.0001Z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M4.63672 8.48145L9.07625 11.0685" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M9.06975 3.9314L4.63672 6.51841" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
                <a href="#">Share Post</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 2,
    img: blog_list_2,
    title: "Simplistic photo setup",
    date: '09. MAY. 2023',
    category: 'Photography',
    author: 'John Doe',
    desc: 'Learn how to create stunning photographs with minimal equipment and maximum creativity.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>Photography doesn't always require expensive equipment. Sometimes the most powerful images come from the simplest setups and creative vision.</p>
        </div>
        
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Minimalist Photography Principles</h4>
          <p class="mb-20">Simplistic photo setup is about understanding light, composition, and timing. These three elements are more important than any expensive camera gear you might own.</p>
          <p>The best photographers know that limitations often breed creativity and force you to think outside the box.</p>
        </div>
        
        <div class="blog-details-thumb-box">
          <div class="row">
            <div class="col-md-6">
              <div class="blog-details-thumb">
                <img class="w-100 mb-20" src="/assets/img/inner-blog/blog-details/blog-details-3.jpg" alt="details-thumb" style="height: auto" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="blog-details-thumb">
                <img class="w-100 mb-20" src="/assets/img/inner-blog/blog-details/blog-details-2.jpg" alt="details-thumb" style="height: auto" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Essential Equipment</h4>
          <p>You don't need a studio to create professional-looking photos. A simple setup with natural light, a clean background, and basic reflectors can produce amazing results.</p>
        </div>
        
        <div class="blog-details-blockquote">
          <blockquote>
            <span class="quote-icon">
              <svg width="90" height="66" viewBox="0 0 90 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 42.6672C0 27.2282 7.2986 14.2644 21.8957 3.77586C25.3156 1.25862 27.8597 0 29.528 0C30.6957 0 31.2796 0.755172 31.2796 2.26552C31.2796 3.69195 31.0294 4.7408 30.5289 5.41207C30.1118 5.99943 29.5697 6.54483 28.9024 7.04828C28.2351 7.55172 27.5678 8.01322 26.9005 8.43276C26.2332 8.8523 25.4408 9.48161 24.5232 10.3207C16.3488 17.369 12.2616 24.2494 12.2616 30.9621C12.2616 34.5701 13.7213 36.3741 16.6408 36.3741C28.9024 36.3741 35.0332 41.4506 35.0332 51.6034C35.0332 55.5471 33.5317 58.9034 30.5289 61.6724C27.5261 64.3575 24.2313 65.7 20.6445 65.7C14.055 65.7 8.96682 63.1408 5.3801 58.0224C1.79337 52.8201 0 47.7017 0 42.6672ZM55.0919 42.6672C55.0919 26.9764 62.182 14.1385 76.3621 4.15345C79.6986 1.38448 82.2009 0 83.8692 0C85.5374 0 86.3716 0.755172 86.3716 2.26552C86.3716 3.69195 86.1213 4.69885 85.6208 5.28621C85.2038 5.87356 84.6616 6.46092 83.9943 7.04827C83.327 7.55172 82.6597 8.01322 81.9924 8.43276C81.3251 8.8523 80.5744 9.48161 79.7403 10.3207C71.3156 17.8724 67.1033 24.7529 67.1033 30.9621C67.1033 34.5701 68.6464 36.3741 71.7327 36.3741C83.9109 36.3741 90 41.4086 90 51.4776C90 55.3374 88.4986 58.6937 85.4957 61.5465C82.5763 64.3155 79.2815 65.7 75.6114 65.7C69.1886 65.7 64.1422 63.1828 60.472 58.1483C56.8853 53.0299 55.0919 47.8695 55.0919 42.6672Z" fill="#19191A" fill-opacity="0.1"></path>
              </svg>
            </span>
            <p>The best camera is the one that's with you.</p>
            <span class="blockquote-info">Chase Jarvis</span>
          </blockquote>
        </div>
        
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Creative Techniques</h4>
          <p>With any accomplished photographer, understanding your tools is essential. We don't need expensive equipment to create stunning visuals. Sometimes a simple window light and creative angles are all you need to capture the perfect shot.</p>
        </div>
        
        <div class="blog-details-thumb-box">
          <div class="row">
            <div class="col-xl-12">
              <div class="blog-details-thumb">
                <img src="/assets/img/inner-blog/blog-details/blog-details-4.jpg" alt="details-thumb" style="height: auto" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
                <a href="#">Photography</a>
                <a href="#">Minimalism</a>
                <a href="#">Creative</a>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4">
              <div class="blog-details-share text-start text-md-end">
                <span>
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7547 4.90002C11.8317 4.90002 12.7047 4.02697 12.7047 2.95001C12.7047 1.87305 11.8317 1 10.7547 1C9.67774 1 8.80469 1.87305 8.80469 2.95001C8.80469 4.02697 9.67774 4.90002 10.7547 4.90002Z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M2.95001 9.45032C4.02697 9.45032 4.90002 8.57727 4.90002 7.5003C4.90002 6.42334 4.02697 5.55029 2.95001 5.55029C1.87305 5.55029 1 6.42334 1 7.5003C1 8.57727 1.87305 9.45032 2.95001 9.45032Z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M10.7547 14.0001C11.8317 14.0001 12.7047 13.1271 12.7047 12.0501C12.7047 10.9731 11.8317 10.1001 10.7547 10.1001C9.67774 10.1001 8.80469 10.9731 8.80469 12.0501C8.80469 13.1271 9.67774 14.0001 10.7547 14.0001Z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M4.63672 8.48145L9.07625 11.0685" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M9.06975 3.9314L4.63672 6.51841" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
                <a href="#">Share Post</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 3,
    img: blog_list_3,
    title: "Future Business Ideas.",
    date: '20. NOV. 2023',
    category: 'Business',
    author: 'John Doe',
    desc: 'Discover innovative business concepts that will shape the future of entrepreneurship and commerce.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>The business landscape is evolving rapidly with new technologies and changing consumer behaviors. Understanding these trends is crucial for future success.</p>
        </div>
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Emerging Technologies in Business</h4>
          <p>Future Business Ideas are rooted in understanding emerging technologies like AI, blockchain, and IoT. These technologies are reshaping how we think about commerce and customer relationships.</p>
        </div>
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                <a href="#">Business</a>
                <a href="#">Innovation</a>
                <a href="#">Technology</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 4,
    img: blog_list_4,
    title: "Is It Time To Rebrand?",
    date: '30. AUG. 2023',
    category: 'Branding',
    author: 'John Doe',
    desc: 'Signs that indicate your business might need a rebranding strategy and how to approach it effectively.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>Rebranding is a significant decision that can revitalize your business or confuse your customers. Knowing when and how to rebrand is crucial for long-term success.</p>
        </div>
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Signs You Need to Rebrand</h4>
          <p>Is It Time To Rebrand? This question often arises when businesses face declining sales, outdated visual identity, or expansion into new markets. Recognizing these signs early can save your business.</p>
        </div>
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                <a href="#">Branding</a>
                <a href="#">Strategy</a>
                <a href="#">Marketing</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 5,
    img: blog_list_5,
    title: "Desert Treasure Hunt",
    date: '09. MAY. 2023',
    category: 'Adventure',
    author: 'John Doe',
    desc: 'An exciting journey through the desert landscape in search of hidden treasures and unforgettable experiences.',
    video: true,
    videoId: 'rVHxkxJM3rY',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>Adventure awaits in the vast desert landscapes where ancient treasures and modern discoveries intersect in the most unexpected ways.</p>
        </div>
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Planning Your Desert Adventure</h4>
          <p>Desert Treasure Hunt requires careful planning and preparation. Understanding the terrain, weather conditions, and safety protocols is essential for a successful expedition.</p>
        </div>
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                <a href="#">Adventure</a>
                <a href="#">Travel</a>
                <a href="#">Exploration</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 6,
    img: blog_list_2,
    title: "Visualizing Your Brand",
    date: '12. JAN. 2023',
    category: 'Branding',
    author: 'John Doe',
    desc: 'Transform your brand identity through powerful visual storytelling and strategic design choices.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>Visual branding goes beyond logos and colors. It's about creating a cohesive visual language that communicates your brand's values and personality.</p>
        </div>
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">The Power of Visual Identity</h4>
          <p>Visualizing Your Brand starts with understanding how visual elements influence perception. Colors, typography, and imagery work together to create emotional connections with your audience.</p>
        </div>
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                <a href="#">Branding</a>
                <a href="#">Design</a>
                <a href="#">Visual Identity</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 7,
    img: b_m_1,
    title: 'Our New Projects With Local Community',
    date: '21. OCT. 2023',
    category: 'Community',
    author: 'John Doe',
    desc: 'Collaborating with local communities to create meaningful projects that drive positive social impact.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>Community collaboration is at the heart of sustainable development. Our latest projects demonstrate how working with local communities creates lasting positive change.</p>
        </div>
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Community-Centered Approach</h4>
          <p>Our New Projects With Local Community focus on understanding local needs and leveraging community strengths. This approach ensures projects are relevant and sustainable.</p>
        </div>
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                <a href="#">Community</a>
                <a href="#">Social Impact</a>
                <a href="#">Collaboration</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 8,
    img: b_m_2,
    title: 'Start Unique Experience.',
    date: '09. MAY. 2022',
    category: 'Experience Design',
    author: 'John Doe',
    desc: 'Creating distinctive experiences that engage customers and build lasting brand loyalty.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>In today's competitive marketplace, creating unique experiences is what sets successful brands apart from the rest. It's about crafting moments that matter.</p>
        </div>
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Experience Design Principles</h4>
          <p>Start Unique Experience begins with understanding your customer's journey and identifying opportunities to create memorable touchpoints that exceed expectations.</p>
        </div>
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                <a href="#">Experience</a>
                <a href="#">Innovation</a>
                <a href="#">Customer Journey</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 9,
    img: b_m_5,
    title: 'Setting up the creativity.',
    date: '11. JAN. 2022',
    category: 'Creativity',
    author: 'John Doe',
    desc: 'Establishing creative processes and environments that foster innovation and artistic expression.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>Creativity isn't just about inspiration—it's about creating systems and environments that consistently produce innovative ideas and solutions.</p>
        </div>
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Creating Creative Spaces</h4>
          <p>Setting up the creativity requires both physical and mental spaces that encourage experimentation and risk-taking. The environment plays a crucial role in creative output.</p>
        </div>
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                <a href="#">Creativity</a>
                <a href="#">Innovation</a>
                <a href="#">Process</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  {
    id: 10,
    img: b_m_6,
    title: 'Design to remember',
    date: '15. OCT. 2023',
    category: 'Design',
    author: 'John Doe',
    desc: 'Creating memorable design solutions that leave lasting impressions and drive meaningful engagement.',
    content: {
      htmlContent: `
        <div class="blog-details-top-text">
          <p>Memorable design transcends aesthetics to create emotional connections and lasting impressions that influence behavior and decision-making.</p>
        </div>
        <div class="blog-details-left-content">
          <h4 class="blog-details-left-title">Psychology of Memorable Design</h4>
          <p>Design to remember leverages psychological principles to create visual experiences that stick in people's minds and influence their perceptions and actions.</p>
        </div>
        <div class="blog-details-share-wrap mb-40">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <div class="blog-details-tag">
                <span><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.371 9.92961L9.7597 15.5409C9.61433 15.6865 9.44171 15.8019 9.25169 15.8807C9.06168 15.9595 8.858 16 8.6523 16C8.44661 16 8.24293 15.9595 8.05292 15.8807C7.8629 15.8019 7.69027 15.6865 7.54491 15.5409L0.822266 8.82613V1H8.64839L15.371 7.72264C15.6626 8.01591 15.8262 8.41262 15.8262 8.82613C15.8262 9.23964 15.6626 9.63634 15.371 9.92961Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.73633 4.91333H4.74467" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                <a href="#">Design</a>
                <a href="#">Psychology</a>
                <a href="#">Memory</a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  }
];

// Legacy exports for backward compatibility
export const blog_home_five = blog_data.slice(0, 4);
export const blog_modern = blog_data.slice(0, 10); // All blog posts for modern view
export const blog_classic = blog_data.slice(6, 10);
export const blog_lists = blog_data.slice(0, 6);

