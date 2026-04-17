"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

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

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/caseBread",
    icon: <GithubIcon className="h-5 w-5" />,
  },
  {
    label: "Email",
    href: "mailto:kgu0515@gmail.com",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/geonu-kim",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "https://velog.io/@casebread",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm3 2v2h12V7H6zm0 4v2h12v-2H6zm0 4v2h8v-2H6z" />
      </svg>
    ),
  },
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
            김건우
          </h1>

          <div className="h-12 flex items-center justify-center mb-5">
            <span className="text-primary text-[clamp(20px,3vw,32px)] font-space-grotesk">
              {displayedText}
              <span className="inline-block w-[2px] h-7 bg-primary ml-[2px] animate-pulse align-middle" />
            </span>
          </div>

          <p className="text-muted-foreground text-[17px] leading-relaxed mb-8 max-w-lg">
            서비스의 목표를 이해하고, 운영에 실질적으로 기여하는 코드를 만듭니다.
          </p>

          <Button asChild size="lg" className="mb-6">
            <a href="/resume.pdf" download="김건우_이력서.pdf">
              <Download className="mr-2 h-4 w-4" />
              이력서 다운로드
            </a>
          </Button>

          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-11 h-11 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
