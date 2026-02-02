import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [height, setHeight] = useState(getResponsiveHeight());

  function getResponsiveHeight() {
    const width = window.innerWidth;

    if (width <= 480) return 220;   // small mobiles
    if (width <= 768) return 300;   // normal mobiles
    if (width <= 1024) return 380;  // tablets
    return 480;                     // desktop (original)
  }

  useEffect(() => {
    const handleResize = () => {
      setHeight(getResponsiveHeight());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#FFF9E6",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${height}px`, // responsive height
        }}
      >
        <img
          src="/job.png"
          alt="Online Job Portal"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
