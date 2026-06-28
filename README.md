# artinus-fe

## 주요 기술·구조 선택의 이유, 트레이드오프

| 기술                | 선택 이유                                                                |
| ------------------- | ------------------------------------------------------------------------ |
| **Vite**            | HTML 엔트리 기반 MPA 빌드·HMR 지원. SPA 대비 페이지별 번들 분리가 명확함 |
| **Tailwind CSS**    | 전체적인 프로젝트의 디자인                                               |
| **React Hook Form** | 회원가입 폼 필드·약관·blur의 유효성 검증을 선언적으로 처리               |
| **React Router**    | 메인부터 회원가입 페이지 내 가입 → 완료 흐름을 라우팅                    |
| **Zustand**         | 전체적인 회원 가입의 대한 상태 관리                                      |
| **MSW**             | `/api/verify` mock을 브라우저에서 테스트하기 위해 선택했습니다.          |

**트레이드오프:** MPA 구조는 서비스별 독립 HTML 산출물 생성과 배포 단위 분리에 유리하지만, SPA 대비 공통 코드 관리가 복잡하고 빌드 엔트리 및 서버 설정 관리가 필요합니다.

## 실행 및 빌드 방법

### 사전 요구사항

- Node.js
- npm

### 설치

```bash
npm install
```

### 개발 서버

```bash
npm run dev
```

- 홈: `http://localhost:5173/`
- 회원가입: `http://localhost:5173/signup/community`, `/signup/news`, `/signup/shopping`

개발 환경에서는 MSW mock API가 동작합니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드 결과는 `dist/`에 생성됩니다.

```
dist/
├── index.html
└── signup/
    ├── community.html
    ├── news.html
    └── shopping.html
```

### 빌드 결과 미리보기

```bash
npm run preview
```

`dist/`를 로컬에서 서빙합니다. 기본 주소는 `http://localhost:4173/`입니다.

회원가입 페이지는 `/signup/community.html`이 아닌 **`/signup/community`** URL로 접속해야 합니다.

## 확장성을 고려한 설계 설명

단순 회원가입 페이지를 위한 프로젝트가 아니라 향후 다른 페이지 및 도메인을 추가할 수 있도록 설계했습니다.

### 폴더 구조

```
artinus-fe/
├── index.html                 # 홈 MPA 엔트리
├── signup/                    # 회원가입 MPA HTML (서비스별)
│   ├── community.html
│   ├── news.html
│   └── shopping.html
├── public/                    # 정적 에셋 (이미지, favicon, MSW worker)
└── src/
    ├── entries/               # MPA 진입점 (HTML → TS 연결)
    │   ├── mountApp.tsx       # MSW + React 마운트 공통 처리
    │   ├── home/main.tsx      # index.html
    │   └── signup/main.tsx    # signup/*.html (data-theme으로 서비스 구분)
    ├── pages/                 # 페이지 단위 UI (홈, 404 등)
    ├── components/            # 도메인 공통 UI (Input, Button, FormField 등)
    ├── features/              # 기능(도메인)별 코드
    │   └── signup/
    │       ├── components/    # 회원가입 전용 컴포넌트
    │       ├── constants/     # 테마, 필드, validation 등
    │       ├── hooks/
    │       ├── router/        # 서비스별 라우터 조립
    │       ├── types/
    │       ├── utils/
    │       └── mountSignupApp.tsx
    ├── api/                   # API 클라이언트 (기능별 하위 폴더)
    │   └── signup/
    ├── store/                 # 전역 상태 (기능별 하위 폴더)
    │   └── signup/
    └── mocks/                 # MSW mock (개발 전용)
```

### 확장 시 가이드

- **새 도메인 페이지 추가** (예: `checkout`): `src/features/checkout/`에 컴포넌트·로직을 모으고, `checkout/order.html`처럼 HTML을 도메인 폴더 아래에 두며 `vite.config.ts`의 `build.rollupOptions.input`에 등록합니다.
- **MPA 엔트리 추가**: `src/entries/{도메인}/main.tsx`를 만들고 해당 HTML의 `<script>`에서 연결합니다.
- **여러 HTML이 같은 JS를 쓸 때**: signup처럼 HTML의 `data-*` 속성으로 분기하거나, 엔트리별 `main.tsx`를 분리합니다.
- **공통 UI**는 `src/components/`에 둡니다.
- **화면 UI** (라우트에 연결되는 페이지 컴포넌트)는 `src/pages/` 또는 `features/{도메인}/components/`에 둡니다.
- **앱 조립** (라우터 + Provider + `mountApp` 연결)은 `src/entries/{도메인}/main.tsx`에서 하고, 도메인 로직이 많으면 `features/{도메인}/mount*.tsx`로 분리합니다. (예: signup → `mountSignupApp.tsx`, home → `entries/home/main.tsx`에 직접 작성)

빌드 산출물도 HTML 경로와 동일하게 `dist/signup/news.html`처럼 **도메인별 폴더**로 나뉘어, 루트에 HTML이 무한히 쌓이지 않도록 했습니다.

## AI 활용 내용

프로젝트 진행 중 AI 도구(Cursor)의 도움을 받았습니다.

- **디자인**: 회원가입 전체 레이아웃
- **코드 리팩토링**: MPA 엔트리·feature 폴더 분리, signup 도메인 코드 정리, utils/feature별 파일 배치
- **유효성 검사**: 폼·휴대폰 인증 validation 로직, API 오류 처리, 인증 실패 시 상태 초기화
