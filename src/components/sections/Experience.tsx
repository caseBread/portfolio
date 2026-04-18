"use client";

import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { EXPERIENCES } from "@/data/projects";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle title="Experience" />

        <div className="mt-12 relative">
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-border" />

          <div className="space-y-8">
            {EXPERIENCES.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex gap-6"
              >
                <div className="relative flex-shrink-0 mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-background" />
                </div>

                <div className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                    <h3 className="font-semibold font-space-grotesk text-foreground flex items-center gap-1.5">
                      {item.org}
                      {item.homepageUrl && (
                        <a
                          href={item.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="홈페이지 열기"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Link className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </h3>
                    <span className="text-primary text-xs font-medium bg-primary/10 px-2 py-0.5 rounded-full self-start">
                      {item.period}
                    </span>
                  </div>
                  <ul className="text-muted-foreground text-sm leading-relaxed space-y-1">
                    {item.description.map((line, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="flex-shrink-0 w-1 h-1 rounded-full bg-primary" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-1 h-10 bg-primary rounded-full" />
      <h2 className="text-4xl font-bold font-space-grotesk">{title}</h2>
    </div>
  );
}
