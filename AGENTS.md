# 프로젝트명

나의 개인 포트폴리오 사이트

## 기술 스택

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- 상태관리: Zustand

## 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev

# 빌드
npm run build
```

## 디렉토리 구조

src/
├── app/ # Next.js App Router (페이지/레이아웃)
├── components/ # 공통 UI 컴포넌트
├── hooks/ # 커스텀 훅
├── lib/ # 외부 라이브러리 래퍼, 유틸
├── services/ # API 통신 함수
├── store/ # 전역 상태
└── types/ # 공통 타입 정의

## 코딩 컨벤션

- 컴포넌트 파일명: PascalCase (`UserCard.tsx`)
- 훅 파일명: camelCase, use 접두사 (`useAuth.ts`)
- 타입은 반드시 `types/`에서 정의, 인라인 type 선언 금지
- `any` 사용 금지 (unknown 또는 명시적 타입 사용)

## 핵심 규칙

- Server Component / Client Component 구분 명시 (`"use client"` 없으면 서버)
- 데이터 fetch는 Server Component에서, 인터랙션은 Client Component에서
- API 통신은 반드시 `services/` 경유
