import React from "react";
import Image from "next/image";
import { IBlogDT } from "@/types/blog-d-t";

interface BlogDetailsCommentsProps {
  blog: IBlogDT;
}

export default function BlogDetailsComments({ blog }: BlogDetailsCommentsProps) {
  const comments = blog.comments || [];
  
  return (
    <ul>
      {comments.map((item) => (
        <li key={item.id}>
          <div className="postbox__comment-box d-flex">
            <div className="postbox__comment-info ">
              <div className="postbox__comment-avater mr-20">
                <Image 
                  src={item.avatar} 
                  alt="avatar" 
                  width={60}
                  height={60}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                />
              </div>
            </div>
            <div className="postbox__comment-text">
              <div className="postbox__comment-name d-flex justify-content-between align-items-center">
                <h5>{item.name}</h5>
                <span className="post-meta">{item.date}</span>
              </div>
              <p>{item.comment}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
