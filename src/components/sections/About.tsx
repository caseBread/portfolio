"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const POINTS = [
  "스스로 만족하는 코드보다 서비스의 목표를 이해하고, 운영에 실질적으로 기여하는 코드를 더 가치있게 생각합니다.",
  "실패를 두려워하지 않고, 빠른 실험과 검증을 통해 팀에 더 크게 기여할 수 있는 방향을 찾습니다.",
  "구성원들의 신뢰를 소중히 여깁니다. 신뢰를 바탕으로 솔직하게 소통하며, 함께 사명에 맞는 가치를 만들어내고 싶습니다.",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle title="About Me" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <Card>
            <CardContent className="pt-6 pb-6">
              <ul className="space-y-4">
                {POINTS.map((text, i) => (
                  <li key={i} className="flex gap-3 items-start text-foreground leading-relaxed">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-1 h-10 bg-primary rounded-full" />
      <h2 className="text-4xl font-bold">{title}</h2>
    </div>
  );
}
