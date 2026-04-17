"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold font-space-grotesk">
                    넛지헬스케어(주)
                  </h3>
                  <p className="text-primary text-sm font-medium mt-0.5">
                    프론트엔드팀 파트장
                  </p>
                </div>
                <Badge variant="secondary" className="self-start sm:self-auto">
                  2023.03 – 2025.06
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                대한민국 국민 3명 중 1명이 사용하는 국민 건강앱{" "}
                <span className="text-foreground font-medium">[캐시워크]</span>를
                개발한 디지털 헬스케어 스타트업
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue={CAREER_PROJECTS[0].id}>
            <TabsList className="grid grid-cols-3 w-full mb-4">
              {CAREER_PROJECTS.map((p) => (
                <TabsTrigger key={p.id} value={p.id} className="font-space-grotesk">
                  {p.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {CAREER_PROJECTS.map((project) => (
              <TabsContent key={project.id} value={project.id}>
                <Card>
                  <CardContent className="pt-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <p className="text-muted-foreground text-sm">
                        {project.description}
                      </p>
                      <Badge variant="outline" className="self-start flex-shrink-0">
                        {project.period}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <ul className="space-y-2">
                      {project.achievements.map((ach, i) => (
                        <li key={i} className="flex gap-2 items-start text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
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
