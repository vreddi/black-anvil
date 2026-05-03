"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="flex flex-col items-center gap-6 px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* warm forge glow halo so the logo pops against the dark mountains */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-30%] rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(253,230,138,0.45) 0%, rgba(245,163,91,0.3) 40%, rgba(245,163,91,0) 70%)",
            }}
          />
          <img
            src="/logo.png"
            alt="Black Anvil logo"
            draggable={false}
            className="relative h-32 w-32 select-none drop-shadow-[0_8px_32px_rgba(0,0,0,0.55)] sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-80 xl:w-80"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="max-w-xl text-balance text-base text-amber-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-lg"
        >
          Opinionated Nx plugins for shipping modern TypeScript projects.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-xs uppercase tracking-[0.3em] text-amber-200/80"
        >
          Open source · Forged by Black Anvil
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-amber-100/80"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
