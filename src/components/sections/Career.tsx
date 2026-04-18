"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CAREER_PROJECTS } from "@/data/projects";

export default function Career() {
  return (
    <section id="career" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle title="Career" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                    <Image
                      src="/images/career/cashwalk.png"
                      alt="넛지헬스케어 로고"
                      loading="lazy"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">넛지헬스케어(주)</h3>
                    <p className="text-primary text-sm font-medium mt-0.5">
                      프론트엔드팀 파트장
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="self-start sm:self-auto">
                  2023.03 – 2025.06
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                대한민국 국민 3명 중 1명이 사용하는 국민 건강앱{" "}
                <span className="text-foreground font-medium">[캐시워크]</span>
                를 개발한 디지털 헬스케어 스타트업
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-6">
              {CAREER_PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card className="bg-muted/40">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-bold text-base">
                            {project.name}
                          </h4>
                          <p className="text-muted-foreground text-sm mt-1">
                            {project.description}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="self-start flex-shrink-0"
                        >
                          {project.period}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <ul className="space-y-2">
                        {project.achievements.map((ach, j) => (
                          <li
                            key={j}
                            className="flex gap-2 items-start text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground flex items-center gap-1">
                              {ach.text}
                              {ach.link && (
                                <a
                                  href={ach.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="관련 링크 열기"
                                  className="text-primary hover:text-primary/70 transition-colors flex-shrink-0"
                                >
                                  <Link className="h-3.5 w-3.5" aria-hidden="true" />
                                </a>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
