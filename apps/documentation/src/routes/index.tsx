import { createFileRoute } from "@tanstack/react-router";
import { ParallaxBackground } from "@/components/ParallaxBackground";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="relative min-h-screen">
      <ParallaxBackground />
      {/* Content area - add enough content to enable scrolling */}
      <div className="relative z-10 min-h-[200vh]">
        {/* Your content goes here */}
      </div>
    </div>
  );
}
