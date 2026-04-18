import type {
  Project,
  CareerProject,
  ExperienceItem,
  AwardItem,
  CertItem,
} from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "litmus",
    imageUrl: "/images/projects/litmers-homepage.png",
    name: "리트머스 홈페이지 개선",
    description:
      "리트머스 홈페이지 리뉴얼 및 고객 문의 플로우 고도화를 위한 프로젝트",
    techStack: ["React", "TypeScript", "Next.js", "Shadcn", "Figma MCP"],
    demoUrl: "https://homepage-six-xi-49.vercel.app/",
    period: "2026.02 – 2026.03",
    role: "프론트엔드",
    highlights: [
      "기획 2명, 디자인 2명, 프론트엔드 2명, 백엔드 2명",
      "리트머스 홈페이지 리뉴얼 및 고객 문의 플로우 고도화",
      "Figma MCP를 활용한 디자인-개발 워크플로우 적용",
    ],
  },
  {
    id: "cheeeese",
    imageUrl: "/images/projects/cheeeese.png",
    name: "치이이즈",
    description: "딱 7일만 열리는 특별한 공유 앨범 웹 서비스",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Zustand",
      "React-query",
      "Tailwind CSS",
      "Vitest",
      "Github Actions",
    ],
    githubUrl: "https://github.com/Say-Cheese/FE",
    demoUrl: "https://say-cheese.me/",
    period: "2025.09 – 2025.11",
    role: "프론트엔드",
    highlights: [
      "큐시즘 소속 — 기획 2명, 디자인 2명, 프론트엔드 2명, 백엔드 2명",
      "딱 7일만 열리는 특별한 공유 앨범 웹 서비스 개발",
      "Vitest 기반 테스트 환경 구축",
      "Github Actions를 활용한 CI/CD 파이프라인 구성",
    ],
  },
  {
    id: "lifezip",
    imageUrl: "/images/projects/lifezip.png",
    name: "LG전자 라이프집 커뮤니티 활성화",
    description:
      "LG전자와 큐시즘이 협업하여 '라이프집' 서비스의 리텐션 및 수익화 구조를 개선하기 위해 기능을 제안한 프로젝트",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "React-query",
      "Zustand",
      "Styled-component",
      "NCP",
    ],
    period: "2025.08 – 2025.09",
    role: "프론트엔드",
    highlights: [
      "큐시즘 소속 — 기획 2명, 디자인 2명, 프론트엔드 2명, 백엔드 2명",
      "LG전자 라이프집 서비스 리텐션 및 수익화 구조 개선 기능 제안 및 개발",
      "KUSITMS 32기 최종 발표 2등상 수상",
      "GitHub: 기업보안 상 private repository",
    ],
  },

  {
    id: "wini",
    imageUrl: "/images/projects/wini.png",
    name: "Wini",
    description: "룸메이트와 잘 살기위한 소통 앱",
    techStack: [
      "React Native",
      "Expo",
      "FCM",
      "APNs",
      "TypeScript",
      "Zustand",
      "React-query",
    ],
    githubUrl: "https://github.com/dnd-side-project/dnd-13th-3-frontend",
    presentationUrl: "https://dnd.ac/projects/93",
    period: "2025.07 – 2025.08",
    role: "프론트엔드",
    highlights: [
      "DND 소속 — 디자인 2명, 프론트엔드 2명, 백엔드 2명",
      "룸메이트 간 생활 규칙 공유 및 소통을 위한 모바일 앱 개발",
      "FCM + APNs 기반 푸시 알림 구현",
      "DND 13기 운영진 특별상 수상",
    ],
  },
  {
    id: "ausgcon",
    imageUrl: "/images/projects/ausgcon.png",
    name: "AUSGCON 2025",
    description: "AUSG에서 개최하는 컨퍼런스 홈페이지 제작",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/AUSGcon2025",
    demoUrl: "https://2025.ausg.me/",
    period: "2025.08.04 – 2025.08.20",
    role: "프론트엔드",
    highlights: [
      "AUSG 소속 — 프론트엔드 1명 단독 개발",
      "AUSG 컨퍼런스 공식 홈페이지 기획 및 개발",
    ],
  },
  {
    id: "simple-thumbnail",
    imageUrl: "/images/projects/simple-thumbnail.png",
    name: "simple-thumbnail",
    description: "빠르고 쉽게 썸네일을 제작 할 수 있는 서비스",
    techStack: ["TypeScript", "React", "Tailwind CSS", "Recoil"],
    githubUrl: "https://github.com/yannmbthumbnail",
    demoUrl: "https://simple-thumbnail.com/",
    period: "2023.02.22 – 2023.02.27",
    role: "프론트엔드",
    highlights: [
      "테오의 스프린트 소속 — 프론트엔드 6명",
      "빠르고 쉽게 썸네일을 제작할 수 있는 웹 서비스 개발",
    ],
  },
  {
    id: "mine-sweeper",
    imageUrl: "/images/projects/mine-sweeper.gif",
    name: "지뢰찾기",
    description: "지뢰찾기 게임을 웹 상에서 구현한 프로젝트",
    techStack: ["TypeScript", "React", "Redux", "Styled-component"],
    githubUrl: "https://github.com/casebread/minesweeper_clone",
    demoUrl: "https://casebread.github.io/minesweeper_clone/",
    period: "2023.01 – 2023.02",
    role: "프론트엔드",
    highlights: [
      "개인 프로젝트 — 프론트엔드 1명 단독 개발",
      "지뢰찾기 게임 로직 및 UI 웹으로 구현",
    ],
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
      {
        text: "4명 규모 프론트엔드 파트 실무 관리 (온보딩 미션 프로세스 도입)",
      },
      {
        text: "Core Web Vitals(LCP, INP, CLS) 각각 50% 이상 점수 개선 (CrUX 보고서 기준)",
      },
      { text: "SVG sprite 기법으로 첫 페이지 로드 시 이미지 요청 수 90% 감소" },
      { text: "크롤링 예산 약 25% 절약 (SSR 동시성 문제 해결)" },
      { text: "source html CDN 적용으로 평균 응답속도 59% 감소" },
      { text: "다국어(i18n) 기능 도입 (next-i18next)" },
      {
        text: "멀티테넌시 아키텍처 내 로그인 연동구조 주도적 설계",
        link: "https://lace-arithmetic-e7e.notion.site/2e8670f23303802d881ec34843284e7a?source=copy_link",
      },
      {
        text: "고객사 모듈 도입 시간 최대 2주 → 1주 단축 (웹뷰 연동 구조 문서화)",
      },
      { text: "프론트엔드 A/B 테스트 구조 설계 (AWS ALB 가중치 설정 활용)" },
    ],
  },
  {
    id: "unni",
    name: "언니의파우치",
    period: "2023.11 – 2024.10",
    description: "화장품 리뷰 기반 뷰티 앱테크 서비스.",
    techStack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tanstack Query",
      "openapi-typescript",
    ],
    achievements: [
      { text: "2명 규모 프론트엔드 파트 실무 관리" },
      { text: "Play Framework 레거시 페이지를 Next.js로 개편" },
      {
        text: "AWS SNS + Lambda로 CodePipeline 배포 완료 시 슬랙 자동 알림 개발 (업무 효율 개선)",
      },
      { text: "캐시딜(커머스) 모듈 연동 개발" },
      { text: "제품 및 브랜드 정보 관리 백오피스 개발" },
    ],
  },
  {
    id: "supple",
    name: "서플",
    period: "2023.03 – 2024.02",
    description: "뉴스 큐레이션 앱테크 서비스.",
    techStack: ["React.js", "Next.js", "TypeScript", "Tanstack Query"],
    achievements: [
      { text: "캐시워크 앱 내 잠금화면 노출 서플뉴스 기능 개발" },
      { text: "Adsense, Adfit 등 웹 광고 연동 및 광고 미디에이션 시스템 개발" },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "kusitms",
    org: "KUSITMS(한국대학생IT경영학회) 32-33기",
    homepageUrl: "https://www.kusitms.com",
    period: "2025.08 – 2026.06",
    description: [
      "LG전자, 리트머스 등 기업 산학협력 프로젝트 운영 총괄",
      "UT, 데모데이 등 세션 커리큘럼 운영 총괄",
      "리트머스 홈페이지 개선 프로젝트 진행 : 최우수상 수상",
      "LG전자 라이프집 개선 프로젝트 진행 : 2등상 수상",
    ],
  },
  {
    id: "ausg",
    org: "AUSG(AWSKRUG University Student Group) 9기",
    homepageUrl: "https://ausg.me/",
    period: "2025.07 – 현재",
    description: [
      "2025 AUSGCON 홈페이지 제작",
      "BigChat 발표 - 프론트엔드가 아닌 개발자 대상으로 프론트엔드 서버 구조에 대해 발표",
    ],
  },
  {
    id: "dnd",
    org: "DND 13기",
    homepageUrl: "https://dnd.ac/",
    period: "2025.06 – 2025.08",
    description: ["룸메이트 소통 앱 'Wini' 프로젝트 진행 : 운영진 특별상 수상"],
  },
  {
    id: "dnd-hackathon",
    org: "2025 DND Hackathon 참여",
    period: "2025",
    description: ["골목이음 프로젝트 진행"],
  },
  {
    id: "feconf",
    org: "2023 FEConf 스태프 참여",
    homepageUrl: "https://2023.feconf.kr/",
    period: "2023.10",
    description: ["컨퍼런스 참여자 등록 보조"],
  },
  {
    id: "sprint",
    org: "테오의 스프린트 11기",
    period: "2023.02",
    description: ["simple-thumbnail 프로젝트 진행"],
  },
];

export const AWARDS: AwardItem[] = [
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
