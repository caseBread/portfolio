"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LiquidEtherBackground = dynamic(
  () => import("@/components/ui/LiquidEtherBackground"),
  { ssr: false }
);

const ROLES = [
  "Performance Optimizer",
  "Team Leader",
  "SaaS Builder",
  "Frontend Engineer",
];

const STATS = [
  { value: "2Y+", label: "경력" },
  { value: "MAU 150만", label: "서비스 운영" },
  { value: "3개", label: "서비스 동시 개발" },
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    if (!isDeleting && displayedText === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(pause);
    }
    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentRole.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <LiquidEtherBackground />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[1100px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className="text-primary text-sm font-inter tracking-[0.15em] uppercase mb-6">
            Frontend Developer
          </p>

          <h1 className="text-[clamp(52px,8vw,96px)] leading-none font-bold font-space-grotesk text-foreground mb-6">
            Geonu Kim
          </h1>

          <div className="h-12 flex items-center justify-center mb-5">
            <span className="text-primary text-[clamp(20px,3vw,32px)] font-space-grotesk">
              {displayedText}
              <span className="inline-block w-[2px] h-7 bg-primary ml-[2px] animate-pulse align-middle" />
            </span>
          </div>

          <p className="text-muted-foreground text-[17px] leading-relaxed mb-10 max-w-lg">
            서비스의 목표를 이해하고, 운영에 실질적으로 기여하는 코드를 만듭니다.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Button asChild>
              <a
                href="https://github.com/caseBread"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/resume.pdf" download="김건우_이력서.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 w-full max-w-md"
        >
          {STATS.map((stat) => (
            <Card
              key={stat.value}
              className="bg-card/60 backdrop-blur-sm border-border"
            >
              <CardContent className="pt-6 pb-4 text-center">
                <p className="text-xl font-bold font-space-grotesk text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
