import React from "react";
import { Facebook, Instagram, Linkdin, Twitter } from "../svg";

interface SocialMediaItem {
  id: number;
  name: string;
  link: string;
}

interface SocialProps {
  socialData?: SocialMediaItem[];
}

const defaultSocialData = [
  {
    id: 1,
    name: "LinkedIn",
    link: "https://www.facebook.com/",
  },
  {
    id: 2,
    name: "Twitter",
    link: "https://twitter.com/",
  },
  {
    id: 3,
    name: "Instagram",
    link: "https://www.instagram.com/",
  },
  {
    id: 4,
    name: "Facebook",
    link: "https://www.facebook.com/",
  },
];

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'linkedin':
      return <Linkdin />;
    case 'twitter':
      return <Twitter />;
    case 'instagram':
      return <Instagram />;
    case 'facebook':
      return <Facebook />;
    default:
      return <Facebook />;
  }
};

export default function Social({ socialData = defaultSocialData }: SocialProps) {
  return (
    <>
      {socialData.map((item) => (
        <a href={item.link} key={item.id} target="_blank" rel="noopener noreferrer">
          <span>{getIcon(item.name)}</span>
        </a>
      ))}
    </>
  );
}
