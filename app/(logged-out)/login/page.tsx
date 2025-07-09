"use client";

import React from "react";
import LoginMain from "@/page-components/login/login-main";
import SEOMetadata from "@/components/seo/seo-metadata";

const LoginPage = () => {
  return (
    <>
      <SEOMetadata 
        pageName="login" 
        fallback={{
          title: "Liko - Login",
          description: "Login to your account",
          keywords: ["login", "account", "authentication", "access"]
        }}
      />
      <LoginMain/>
    </>
  );
};

export default LoginPage;
