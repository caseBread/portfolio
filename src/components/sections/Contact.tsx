"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle title="Contact" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center text-center max-w-lg mx-auto"
        >
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            새로운 기회나 협업 제안은 언제든 환영합니다.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href="mailto:kgu0515@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                kgu0515@gmail.com
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/caseBread"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </motion.div>
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
