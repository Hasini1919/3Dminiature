"use client"; 

import { useEffect } from "react";
import "./globals.css"; 

export default function Scroller() {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animation", "true");
      });
    }
  }, []); 

  return (
    <div className="scroller overflow-hidden">
      <ul className="text-list text-lg">
        <li>Memories</li>
        <li>Celebrate</li>
        <li>Wedding</li>
        <li>Glow</li>
        <li>Fast</li>
        <li>Quality</li>
        <li>Gifts</li>
        <li>Memories</li>
        <li>Celebrate</li>
        <li>Wedding</li>
        <li>Glow</li>
        <li>Fast</li>
        <li>Quality</li>
        <li>Gifts</li>
    
        
      </ul>
    </div>
  );
}
