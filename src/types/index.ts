export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
};

export type CareerProject = {
  id: string;
  name: string;
  period: string;
  description: string;
  techStack: string[];
  achievements: string[];
};

export type ExperienceItem = {
  id: string;
  org: string;
  period: string;
  description: string;
};

export type AwardItem = {
  id: string;
  title: string;
  org: string;
  year: string;
};

export type CertItem = {
  id: string;
  title: string;
  date: string;
};
