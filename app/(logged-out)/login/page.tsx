import React from "react";
import { Metadata } from "next";
import LoginMain from "@/page-components/login/login-main";

export const metadata: Metadata = {
  title: "Liko - Login page",
};

const LoginPage = () => {
  return (
    <LoginMain/>
  );
};

export default LoginPage;
