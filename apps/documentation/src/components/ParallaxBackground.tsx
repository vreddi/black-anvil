"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Layered pixel-art parallax.
 *
 * The mountain assets each have a transparent area above a silhouette that
 * fades into a solid colour block extending to the bottom of the image. They
 * are designed to be stacked with the bottom of every layer pinned to the
 * bottom of the viewport, with progressively shorter heights so each layer's
 * silhouette peeks above the layer in front of it.
 *
 * We use background-image + repeat-x rather than <img> so the pixel art tiles
 * crisply across any viewport width without distortion or cropping.
 */

type Layer = {
  src: string;
  /** Height of the layer as a fraction of the viewport. */
  heightVh: number;
  /** Parallax travel range. Negative means the layer drifts up as we scroll. */
  range: [number, number];
};

const LAYERS: Layer[] = [
  // Background → foreground. Heights step down so each silhouette appears
  // higher on screen than the one in front of it.
  { src: "/backgrounds/mountains-4.png", heightVh: 78, range: [0, -8] },
  { src: "/backgrounds/mountains-3.png", heightVh: 58, range: [0, -16] },
  { src: "/backgrounds/mountains-2.png", heightVh: 44, range: [0, -28] },
  { src: "/backgrounds/mountains-1.png", heightVh: 30, range: [0, -44] },
];

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Sky drifts gently downward to feel like the camera is tilting.
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "8%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      // Sunset gradient backstop matching the warm pixel-art palette so the
      // empty sky area never reads as plain white before the PNG paints. The
      // top stop matches the cyan of sky.png so when the sky parallax drifts
      // downward on scroll, the exposed gradient seam stays invisible instead
      // of revealing a dull-blue band.
      style={{
        background:
          "linear-gradient(to bottom, #5bb8c0 0%, #7a9aa4 22%, #8c5a5a 50%, #c66a3a 78%, #e7a45a 100%)",
      }}
    >
      {/* Sky watercolour overlay */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/backgrounds/sky.png"
          alt=""
          draggable={false}
          loading="eager"
          className="h-full w-full select-none object-cover opacity-60 mix-blend-soft-light"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.div>

      {LAYERS.map((layer) => (
        <ParallaxLayer
          key={layer.src}
          layer={layer}
          reduced={reduced}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function ParallaxLayer({
  layer,
  reduced,
  scrollYProgress,
}: {
  layer: Layer;
  reduced: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [from, to] = reduced ? [0, 0] : layer.range;
  const y = useTransform(scrollYProgress, [0, 1], [`${from}%`, `${to}%`]);

  return (
    <motion.div
      style={{
        y,
        height: `${layer.heightVh}vh`,
        backgroundImage: `url(${layer.src})`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center bottom",
        backgroundSize: "auto 100%",
        imageRendering: "pixelated",
      }}
      className="absolute inset-x-0 bottom-0 will-change-transform"
    />
  );
}
