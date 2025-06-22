import { Metadata } from "next";
import HomeOnePage from "@/app/(logged-out)/(homes)/home-1/page";

export const metadata: Metadata = {
  title: "Liko - Home Page",
};

export default function Home() {
  return (
    <>
      <HomeOnePage />
    </>
  );
}
