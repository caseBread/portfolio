import type { Project, CareerProject, ExperienceItem, AwardItem, CertItem } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "monepple",
    name: "모네플",
    description: "MAU 150만의 SaaS형 커뮤니티 모듈 서비스. 18개 서비스에 모듈 연동.",
    techStack: ["React.js", "Next.js", "TypeScript", "GraphQL", "Apollo", "AWS CloudFront", "refine"],
    githubUrl: "#",
    demoUrl: "#",
    period: "2024.03 – 2025.06",
    role: "프론트엔드 파트장",
    highlights: [
      "4명 규모 프론트엔드 파트 실무 관리 (온보딩 미션 프로세스 도입)",
      "Core Web Vitals(LCP, INP, CLS) 각각 50% 이상 점수 개선 (CrUX 보고서 기준)",
      "SVG sprite 기법으로 첫 페이지 로드 시 이미지 요청 수 90% 감소",
      "크롤링 예산 약 25% 절약 (SSR 동시성 문제 해결)",
      "source html CDN 적용으로 평균 응답속도 59% 감소",
      "멀티테넌시 아키텍처 내 로그인 연동구조 주도적 설계",
    ],
  },
  {
    id: "unni",
    name: "언니의파우치",
    description: "화장품 리뷰 기반 뷰티 앱테크 서비스.",
    techStack: ["React.js", "Next.js", "TypeScript", "Tanstack Query", "openapi-typescript"],
    githubUrl: "#",
    demoUrl: "#",
    period: "2023.11 – 2024.10",
    role: "프론트엔드 개발",
    highlights: [
      "2명 규모 프론트엔드 파트 실무 관리",
      "Play Framework 레거시 페이지를 Next.js로 개편",
      "AWS SNS + Lambda로 CodePipeline 배포 완료 시 슬랙 자동 알림 개발",
      "캐시딜(커머스) 모듈 연동 개발",
      "제품 및 브랜드 정보 관리 백오피스 개발",
    ],
  },
  {
    id: "supple",
    name: "서플",
    description: "뉴스 큐레이션 앱테크 서비스.",
    techStack: ["React.js", "Next.js", "TypeScript", "Tanstack Query"],
    githubUrl: "#",
    demoUrl: "#",
    period: "2023.03 – 2024.02",
    role: "프론트엔드 개발",
    highlights: [
      "캐시워크 앱 내 잠금화면 노출 서플뉴스 기능 개발",
      "Adsense, Adfit 등 웹 광고 연동 및 광고 미디에이션 시스템 개발",
    ],
  },
  {
    id: "placeholder-1",
    name: "Coming Soon",
    description: "새로운 프로젝트를 준비 중입니다.",
    techStack: ["React", "TypeScript"],
  },
  {
    id: "placeholder-2",
    name: "Coming Soon",
    description: "새로운 프로젝트를 준비 중입니다.",
    techStack: ["Next.js", "TypeScript"],
  },
];

export const CAREER_PROJECTS: CareerProject[] = [
  {
    id: "monepple",
    name: "모네플",
    period: "2024.03 – 2025.06",
    description:
      "MAU 150만의 수익화 가능한 SaaS형 커뮤니티 모듈 서비스. 현재 18개 서비스에 모듈 연동.",
    techStack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Apollo",
      "AWS CloudFront",
      "refine",
    ],
    achievements: [
      "4명 규모 프론트엔드 파트 실무 관리 (온보딩 미션 프로세스 도입)",
      "Core Web Vitals(LCP, INP, CLS) 각각 50% 이상 점수 개선 (CrUX 보고서 기준)",
      "SVG sprite 기법으로 첫 페이지 로드 시 이미지 요청 수 90% 감소",
      "크롤링 예산 약 25% 절약 (SSR 동시성 문제 해결)",
      "source html CDN 적용으로 평균 응답속도 59% 감소",
      "다국어(i18n) 기능 도입 (next-i18next)",
      "멀티테넌시 아키텍처 내 로그인 연동구조 주도적 설계",
      "고객사 모듈 도입 시간 최대 2주 → 1주 단축 (웹뷰 연동 구조 문서화)",
      "프론트엔드 A/B 테스트 구조 설계 (AWS ALB 가중치 설정 활용)",
    ],
  },
  {
    id: "unni",
    name: "언니의파우치",
    period: "2023.11 – 2024.10",
    description: "화장품 리뷰 기반 뷰티 앱테크 서비스.",
    techStack: ["React.js", "Next.js", "TypeScript", "Tanstack Query", "openapi-typescript"],
    achievements: [
      "2명 규모 프론트엔드 파트 실무 관리",
      "Play Framework 레거시 페이지를 Next.js로 개편",
      "AWS SNS + Lambda로 CodePipeline 배포 완료 시 슬랙 자동 알림 개발 (업무 효율 개선)",
      "캐시딜(커머스) 모듈 연동 개발",
      "제품 및 브랜드 정보 관리 백오피스 개발",
    ],
  },
  {
    id: "supple",
    name: "서플",
    period: "2023.03 – 2024.02",
    description: "뉴스 큐레이션 앱테크 서비스.",
    techStack: ["React.js", "Next.js", "TypeScript", "Tanstack Query"],
    achievements: [
      "캐시워크 앱 내 잠금화면 노출 서플뉴스 기능 개발",
      "Adsense, Adfit 등 웹 광고 연동 및 광고 미디에이션 시스템 개발",
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "kusithms",
    org: "KUSITHMS(한국대학생IT경영학회) 32기",
    period: "2025.08 – 2025.12",
    description: "LG전자 라이프집 개선 프로젝트 진행 → 2등상 수상",
  },
  {
    id: "ausg",
    org: "AUSG 9기",
    period: "2025.07 – 현재",
    description: "AWS 사용자 그룹",
  },
  {
    id: "dnd",
    org: "DND 13기",
    period: "2025.06 – 2025.08",
    description: "Wini 프로젝트 진행",
  },
  {
    id: "dnd-hackathon",
    org: "2025 DND Hackathon",
    period: "2025",
    description: "골목이음 프로젝트 진행",
  },
  {
    id: "feconf",
    org: "2023 FEConf 스태프",
    period: "2023",
    description: "컨퍼런스 참여자 등록 보조",
  },
  {
    id: "sprint",
    org: "테오의 스프린트 11기",
    period: "2023.02",
    description: "simple-thumbnail 프로젝트 진행",
  },
];

export const AWARDS: AwardItem[] = [
  {
    id: "kusithms-award",
    title: "LG전자 라이프집 개선 프로젝트 2등상",
    org: "KUSITHMS",
    year: "2025",
  },
  {
    id: "spring-contest",
    title: "봄 프로그래밍 경시대회 입상",
    org: "경희대학교",
    year: "2022",
  },
  {
    id: "fall-contest",
    title: "가을 프로그래밍 경시대회 장려상",
    org: "경희대학교",
    year: "2021",
  },
];

export const CERTS: CertItem[] = [
  {
    id: "info-cert",
    title: "정보처리기능사",
    date: "2022.05",
  },
];
