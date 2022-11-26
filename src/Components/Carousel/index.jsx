import React from "react";
import "./style.css";

export default function Carousel() {
  return (
    <div className="carousel mb-5">
      <div className="videoContainer">
        <iframe src="https://www.youtube-nocookie.com/embed/kcSEsljlges?controls=0&autoplay=1&mute=1&playsinline=1&playlist=kcSEsljlges&loop=1" />
      </div>
      <div className="overlayContent">
        <h1>Welcome to Cybersoft</h1>
      </div>
    </div>
  );
}
