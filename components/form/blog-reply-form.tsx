import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addComment } from "@/redux/actions/blogPostActions";
import { toast } from "sonner";

type IProps = {
  postId: string;
};

export default function BlogReplyForm({ postId }: IProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.blogPosts);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if postId is valid (for database posts) or show message for static posts
    if (!postId || postId.length < 10) {
      toast.error("Comments are only available for published blog posts");
      return;
    }

    try {
      const result = await dispatch(addComment({ 
        postId, 
        comment: formData 
      }));
      
      if (addComment.fulfilled.match(result)) {
        toast.success("Your comment has been submitted. It will appear after approval.");
        setFormData({ name: "", email: "", comment: "" });
      } else {
        toast.error(result.payload as string || "Comment could not be sent");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <form className="tp-postbox-details-form-wrapper" onSubmit={handleSubmit}>
      <div className="tp-postbox-details-form-inner">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-postbox-details-input-box">
              <div className="tp-postbox-details-input">
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Write your comment here..."
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="tp-postbox-details-input-box">
              <div className="tp-postbox-details-input">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name *" 
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="tp-postbox-details-input-box">
              <div className="tp-postbox-details-input">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email *" 
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-postbox-details-input-box">
        <button 
          className="tp-btn-border-lg" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
