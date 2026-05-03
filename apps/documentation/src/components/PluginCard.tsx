"use client";
import { motion } from "motion/react";
import { ArrowUpRight, Package, Terminal } from "lucide-react";
import type { Plugin } from "@/data/plugins";

export function PluginCard({ plugin, index }: { plugin: Plugin; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col gap-5 rounded-2xl border border-white/40 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-emerald-500/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Package className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {plugin.name}
            </h3>
            <p className="font-mono text-xs text-muted-foreground">
              {plugin.packageName}
            </p>
          </div>
        </div>
        <a
          href={plugin.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${plugin.name} on GitHub`}
          className="rounded-full p-2 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {plugin.description}
      </p>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Generators
        </span>
        <ul className="flex flex-col gap-1.5">
          {plugin.generators.map((g) => (
            <li
              key={g.name}
              className="flex items-start gap-2 text-sm text-foreground/90"
            >
              <Terminal className="mt-0.5 h-3.5 w-3.5 flex-none text-emerald-600 dark:text-emerald-400" />
              <span>
                <code className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-xs text-emerald-700 dark:text-emerald-300">
                  {g.name}
                </code>
                <span className="ml-2 text-muted-foreground">
                  {g.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto rounded-lg bg-slate-950/95 p-3 font-mono text-xs text-emerald-300 ring-1 ring-white/5">
        <span className="text-slate-500">$ </span>
        {plugin.install}
      </div>

      <div className="flex items-center gap-4 text-xs">
        <a
          href={plugin.npm}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          npm
        </a>
        <a
          href={plugin.repo}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          source
        </a>
      </div>
    </motion.article>
  );
}
