"use client";
import { useState, useEffect, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  alwaysVisible = true,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: ReactNode;
  }[];
  className?: string;
  alwaysVisible?: boolean;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(alwaysVisible);

  useEffect(() => {
    if (alwaysVisible) {
      setVisible(true);
    }
  }, [alwaysVisible]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Skip scroll tracking if alwaysVisible is enabled
    if (alwaysVisible) {
      setVisible(true);
      return;
    }

    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto rounded-full z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          // Apple Liquid Glass styling
          "bg-white/20 dark:bg-white/10",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-white/20 dark:border-white/10",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
          "shadow-lg",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1",
              "text-neutral-700 dark:text-neutral-200",
              "hover:text-neutral-900 dark:hover:text-white",
              "transition-colors duration-200"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm font-medium">
              {navItem.name}
            </span>
          </a>
        ))}
        <button
          className={cn(
            "text-sm font-medium relative px-4 py-2 rounded-full",
            "bg-white/30 dark:bg-white/10",
            "backdrop-blur-sm backdrop-saturate-150",
            "border border-white/30 dark:border-white/20",
            "text-neutral-900 dark:text-white",
            "hover:bg-white/40 dark:hover:bg-white/20",
            "transition-all duration-200",
            "shadow-sm"
          )}
        >
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
