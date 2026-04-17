"use client";

import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AWARDS, CERTS } from "@/data/projects";

export default function AwardsCerts() {
  return (
    <section id="awards" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle title="Awards & Certificates" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg flex-shrink-0">
                    <Trophy className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold font-space-grotesk">수상경력</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {AWARDS.map((award) => (
                  <div key={award.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {award.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {award.org}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {award.year}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg flex-shrink-0">
                    <Award className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold font-space-grotesk">자격증</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {CERTS.map((cert) => (
                  <div key={cert.id} className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">
                      {cert.title}
                    </p>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {cert.date}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
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
