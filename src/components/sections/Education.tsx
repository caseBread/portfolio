"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EDUCATION = [
  {
    id: "khu",
    school: "경희대학교",
    icon: GraduationCap,
    items: [
      {
        major: "소프트웨어융합대학 컴퓨터공학과",
        period: "2021.09 – 2027.02 예정",
        note: "전과",
      },
      {
        major: "공과대학 환경학 및 환경공학과",
        period: "2020.03 – 2021.07",
        note: "",
      },
    ],
  },
  {
    id: "boostcamp",
    school: "네이버 커넥트재단 부스트캠프 웹·모바일 7기",
    icon: GraduationCap,
    items: [
      {
        major: "챌린지 과정",
        period: "2022.07 – 2022.08",
        note: "JS ES6 기반 강도 높은 문제 해결 미션",
      },
      {
        major: "멤버십 과정",
        period: "2022.08 – 2022.12",
        note: "풀스택 웹 서비스 개발 도메인 지식 및 기술 학습",
      },
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle title="Education" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg flex-shrink-0">
                      <edu.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold font-space-grotesk text-base leading-snug">
                      {edu.school}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {edu.items.map((item, j) => (
                    <div key={j} className="border-l-2 border-border pl-3">
                      <p className="font-medium text-sm text-foreground">
                        {item.major}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.period}
                        </Badge>
                        {item.note && (
                          <span className="text-muted-foreground text-xs">
                            {item.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
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
