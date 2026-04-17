"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogBody,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/types";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card
                className="h-full flex flex-col hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => setSelected(project)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold font-space-grotesk text-lg">
                      {project.name}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground flex-shrink-0 -mt-1 -mr-1" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                    {project.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        {selected && (
          <DialogContent>
            <DialogHeader>
              <div className="flex items-start justify-between pr-6">
                <div>
                  <DialogTitle>{selected.name}</DialogTitle>
                  {selected.period && (
                    <p className="text-xs text-muted-foreground mt-1">{selected.period}</p>
                  )}
                </div>
                {selected.role && (
                  <Badge variant="secondary" className="mt-0.5 flex-shrink-0">{selected.role}</Badge>
                )}
              </div>
              <DialogDescription className="mt-2">
                {selected.description}
              </DialogDescription>
            </DialogHeader>

            <DialogBody>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selected.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
              </div>

              {selected.highlights && selected.highlights.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {selected.highlights.map((item, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex gap-2">
                {selected.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                      GitHub
                    </a>
                  </Button>
                )}
                {selected.demoUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selected.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </DialogBody>
          </DialogContent>
        )}
      </Dialog>
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
