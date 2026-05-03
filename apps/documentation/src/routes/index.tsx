import { createFileRoute } from "@tanstack/react-router";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { Hero } from "@/components/Hero";
import { PluginCard } from "@/components/PluginCard";
import { plugins } from "@/data/plugins";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="relative">
      <ParallaxBackground />

      <div className="relative z-10">
        <Hero />

        {/* Transition band – parallax stays visible while we scroll into the
            plugins section, then fades into the page background. The gradient
            stops are sized in vh so the fade always completes within the 40vh
            padding-top, regardless of how much content the section holds. */}
        {/* biome-ignore lint/correctness/useUniqueElementIds: stable fragment anchor for #plugins links */}
        <section
          id="plugins"
          className="relative pb-24"
          style={{
            paddingTop: "40vh",
            backgroundColor: "var(--background)",
            backgroundImage:
              "linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.25) 18vh, var(--background) 35vh)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex flex-col gap-3 text-center">
              <span className="mx-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Plugins
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Nx plugins, ready to drop in
              </h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                A small, growing collection of opinionated Nx plugins extracted
                from real projects. Each one solves a specific problem so you
                don't have to wire it up from scratch.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {plugins.map((plugin, i) => (
                <PluginCard
                  key={plugin.packageName}
                  plugin={plugin}
                  index={i}
                />
              ))}
            </div>

            <p className="mt-12 text-center text-sm text-muted-foreground">
              More plugins on the way. Have an idea?{" "}
              <a
                href="https://github.com/vreddi/black-anvil/issues"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Open an issue
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
