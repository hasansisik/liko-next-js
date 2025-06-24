"use client";
import { gsap } from "gsap";
import { useState } from "react";
import { ScrollSmoother} from '@/plugins';
import { useGSAP } from "@gsap/react";

export default function useScrollSmooth() {
  const [isScrollSmooth, setIsScrollSmooth] = useState<boolean>(true);
  useGSAP(() => {
    const smoothWrapper = document.getElementById("smooth-wrapper");
    const smoothContent = document.getElementById("smooth-content");

    if (smoothWrapper && smoothContent && isScrollSmooth) {

      gsap.config({
        nullTargetWarn: false,
      });

      ScrollSmoother.create({
        smooth: 0.8,
        effects: true,
        smoothTouch: 0.05,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    }
  });
}
