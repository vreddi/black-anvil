"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useEffect, useState } from "react";

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reduce parallax intensity on mobile for better performance
  // Different parallax speeds for depth effect
  // Farther layers move slower (smaller multiplier)
  const skyY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "10%" : "20%"]
  );
  const mountains4Y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "15%" : "30%"]
  );
  const mountains3Y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "20%" : "40%"]
  );
  const mountains2Y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "25%" : "50%"]
  );
  const mountains1Y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "30%" : "60%"]
  );

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-sky-200 dark:bg-slate-900"
      style={{ width: "100vw", height: "100vh", minHeight: "100vh" }}
    >
      {/* Sky layer - moves slowest */}
      <motion.div
        style={{ y: skyY, width: "100vw", height: "100vh", minHeight: "100vh" }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/backgrounds/sky.png"
          alt="Sky"
          className="select-none w-full h-full"
          draggable={false}
          loading="eager"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            objectFit: "cover",
            objectPosition: "center top",
          }}
          onError={(e) => {
            console.error("Failed to load sky.png", e);
          }}
        />
      </motion.div>

      {/* Mountain layers - farther mountains move slower */}
      <motion.div
        style={{
          y: mountains4Y,
          width: "100vw",
          height: "100vh",
          minHeight: "100vh",
        }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/backgrounds/mountains-4.png"
          alt="Mountains 4"
          className="select-none w-full h-full"
          draggable={false}
          loading="eager"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            objectFit: "cover",
            objectPosition: "center bottom",
          }}
          onError={(e) => {
            console.error("Failed to load mountains-4.png", e);
          }}
        />
      </motion.div>

      <motion.div
        style={{
          y: mountains3Y,
          width: "100vw",
          height: "100vh",
          minHeight: "100vh",
        }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/backgrounds/mountains-3.png"
          alt="Mountains 3"
          className="select-none w-full h-full"
          draggable={false}
          loading="eager"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            objectFit: "cover",
            objectPosition: "center bottom",
          }}
          onError={(e) => {
            console.error("Failed to load mountains-3.png", e);
          }}
        />
      </motion.div>

      <motion.div
        style={{
          y: mountains2Y,
          width: "100vw",
          height: "100vh",
          minHeight: "100vh",
        }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/backgrounds/mountains-2.png"
          alt="Mountains 2"
          className="select-none w-full h-full"
          draggable={false}
          loading="eager"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            objectFit: "cover",
            objectPosition: "center bottom",
          }}
          onError={(e) => {
            console.error("Failed to load mountains-2.png", e);
          }}
        />
      </motion.div>

      {/* Foreground mountains - move fastest */}
      <motion.div
        style={{
          y: mountains1Y,
          width: "100vw",
          height: "100vh",
          minHeight: "100vh",
        }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/backgrounds/mountains-1.png"
          alt="Mountains 1"
          className="select-none w-full h-full"
          draggable={false}
          loading="eager"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            objectFit: "cover",
            objectPosition: "center bottom",
          }}
          onError={(e) => {
            console.error("Failed to load mountains-1.png", e);
          }}
        />
      </motion.div>
    </div>
  );
}
