"use client";

import { motion } from "framer-motion";
import { Target, Zap, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

const POINTS: { icon: LucideIcon; text: string }[] = [
  {
    icon: Target,
    text: "스스로 만족하는 코드보다 서비스의 목표를 이해하고, 운영에 실질적으로 기여하는 코드를 더 가치있게 생각합니다.",
  },
  {
    icon: Zap,
    text: "실패를 두려워하지 않고, 빠른 실험과 검증을 통해 팀에 더 크게 기여할 수 있는 방향을 찾습니다.",
  },
  {
    icon: Heart,
    text: "구성원들의 신뢰를 소중히 여깁니다. 신뢰를 바탕으로 솔직하게 소통하며, 함께 사명에 맞는 가치를 만들어내고 싶습니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle title="About Me" />

        <div className="flex flex-col gap-4 mt-12">
          {POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="flex gap-4 items-start pt-6 pb-6">
                  <div className="bg-primary p-3 rounded-full flex-shrink-0">
                    <point.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <p className="text-foreground leading-relaxed pt-1">
                    {point.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
