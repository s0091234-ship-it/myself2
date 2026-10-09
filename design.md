# 이수민 부장 패키징 포트폴리오 웹사이트 디자인 가이드 (Design System)

본 문서는 **GitHub Pages**에 단일 정적 웹사이트로 배포 가능한 이수민 부장의 19년 패키징 엔지니어링 포트폴리오의 디자인 시스템 및 UI/UX 인터랙션 설계서입니다.

---

## 1. 디자인 컨셉 & 비주얼 아이덴티티

* **컨셉 키워드**: `Engineering Precision (엔지니어링의 정밀함)`, `Sustainable Future (지속가능한 순환경제)`, `Executive Leadership (19년차 총괄의 신뢰감)`
* **비주얼 톤앤매너**:
  - 기존의 흔한 템플릿 느낌을 탈피하고, 하이테크 소재 공학과 지속가능성을 대변하는 **'딥 슬레이트 & 바이오 에메랄드 (Deep Slate & Bio Emerald)'** 테마.
  - 정밀 공학 도면의 그리드 라인과 현대적인 글래스모피즘(Glassmorphism) 카드를 결합하여 전문성과 가독성을 극대화.

---

## 2. 컬러 시스템 (Color Palette)

### 2.1 다크 테마 컬러 (Default Dark)
| 구분 | 색상명 | Hex Code | HSL / RGB | 사용처 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Base** | Deep Slate Dark | `#070b14` | `hsl(222, 47%, 5%)` | 메인 백그라운드 |
| **Surface Dark** | Navy Slate | `#0e1526` | `hsl(220, 39%, 10%)` | 카드, 섹션 배경, 모달 |
| **Surface Border** | Muted Cyan Border | `rgba(56, 189, 248, 0.15)` | - | 글래스모피즘 보더, 그리드 라인 |
| **Accent Primary** | Bio Eco-Emerald | `#10b981` | `hsl(160, 84%, 39%)` | 친환경 지표, 주요 CTA, 하이라이트 |
| **Accent Tech** | Electric Cyan | `#06b6d4` | `hsl(189, 94%, 43%)` | 기술 수치, 배지, 그래프/차트 |
| **Accent Warm** | Amber Bronze | `#f59e0b` | `hsl(38, 92%, 50%)` | 비용 절감액, 특허, 주요 수상 |
| **Text Main** | Pure Off-White | `#f8fafc` | `hsl(210, 40%, 98%)` | 헤드라인, 본문 텍스트 |
| **Text Muted** | Slate Gray | `#cbd5e1` | `hsl(215, 20%, 80%)` | 부연 설명, 메타 정보, 캡션 |

### 2.2 라이트 테마 컬러 (Editorial Clean White)
| 구분 | 색상명 | Hex Code | HSL / RGB | 사용처 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Base** | Clean Slate White | `#f8fafc` | `hsl(210, 40%, 98%)` | 메인 백그라운드 |
| **Surface Light** | Pure Card White | `#ffffff` | `hsl(0, 0%, 100%)` | 카드, 섹션 배경, 모달 |
| **Surface Border** | Soft Slate Border | `rgba(15, 23, 42, 0.08)` | - | 카드 경계선, 구분선 |
| **Accent Primary** | Deep Bio-Emerald | `#059669` | `hsl(160, 84%, 31%)` | 친환경 지표, 주요 CTA, 하이라이트 |
| **Accent Tech** | Deep Ocean Cyan | `#0284c7` | `hsl(199, 89%, 40%)` | 기술 수치, 배지, 그래프/차트 |
| **Accent Warm** | Deep Amber Gold | `#d97706` | `hsl(38, 92%, 44%)` | 비용 절감액, 특허, 주요 수상 |
| **Text Main** | Charcoal Black | `#0f172a` | `hsl(222, 47%, 11%)` | 헤드라인, 주요 제목 |
| **Text Muted** | Muted Slate Gray | `#64748b` | `hsl(215, 16%, 47%)` | 본문, 부연 설명, 메타 정보 |

---

## 3. 타이포그래피 (Typography)

* **메인 한글 폰트**: [Pretendard](https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css) (깔끔한 시인성과 공학적 단정함)
* **영문/숫자 헤드라인 폰트**: [Outfit](https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap) (모던하고 기하학적인 프리미엄 산세리프)
* **계층 구조**:
  - **H1 (Hero Title)**: 48px ~ 56px / Line-height 1.15 / Font-weight 800
  - **H2 (Section Title)**: 32px ~ 38px / Line-height 1.25 / Font-weight 700
  - **H3 (Card Title)**: 20px ~ 24px / Line-height 1.35 / Font-weight 600
  - **Body (본문)**: 15px ~ 16.5px / Line-height 1.7 / Font-weight 400
  - **Metric Stat (숫자 지표)**: 36px ~ 48px / Font-family 'Outfit' / Bold

---

## 4. UI 레이아웃 구조 (Information Architecture)

```
[Sticky Header / Navigation]
├── Logo ("Lee Soo-Min | Packaging Director")
├── Nav Menu (소개, 지표, 역량, 프로젝트, 프로세스, FAQ, 로드맵, 연락처)
└── Actions (이력서 인쇄/PDF 저장, 다크/라이트 토글)

[Hero Section]
├── Executive Tag ("19-Year Packaging Engineering Veteran")
├── Main Hook Headline & Subtitle
├── Quick Contact Badges
└── CTA Buttons ("프로젝트 둘러보기", "기술 역량 검증", "온보딩 로드맵")

[Key Metrics Dashboard]
├── 19년 경력 / 142억 절감 / 380+ 런칭 / 82% 불량감축 / 78% 친환경 전환 카운터

[Executive Summary & Value Proposition]
├── 5대 축(마케팅, R&D, 생산, 재무, ESG) 밸류체인 인터랙티브 카드

[Core Competencies]
├── 소재공학 (연포장, 사출, 지류)
├── 친환경 순환경제 (단일소재, PCR, 경량화)
├── 자동화 라인 트러블슈팅
└── 글로벌 공급망 & 구매 원가 분석

[Interactive Project Portfolio (Case Studies)]
├── 필터 탭 (전체 / 친환경 ESG / 원가 혁신 / 생산 최적화 / 글로벌 SCM)
└── 6대 프로젝트 상세 카드 (배경, 적용 기술, 정량적 성과, 모달 팝업 연동)

[Domain Expertise Matrix]
├── 식품/HMR, 바이오/헬스케어, 생활화학, 화장품, 이커머스 매트릭스 테이블

[Packaging Engineering Workflow]
├── 6단계 스테이지 게이트(Stage-Gate) 인터랙티브 타임라인

[Technical Checklist & FAQ]
├── 현장 핵심 파라미터(COF, SIT, Hot-Tack 등)
└── 채용 관계자가 가장 궁금해하는 7대 질문 아코디언(Accordion)

[30-60-90-365 Day Onboarding Roadmap]
├── 4단계 액션 플랜 타임라인 카드

[Testimonials & Recommendations]
├── 생산본부장, 해외영업팀장, 파트너사 대표 추천사

[Footer & Direct Contact]
├── 프로필 요약 카드, 이메일 복사 버튼, 연락처, 저작권 표기
```

---

## 5. 인터랙션 및 프론트엔드 기능 명세 (Vanilla JS)

1. **상대경로 100% 호환 (GitHub Pages Zero-Config)**:
   - 빌드 과정 없는 순수 `index.html`, `style.css`, `app.js` 단일 폴더 구조.
2. **숫자 카운트업 애니메이션 (Count-up Animation)**:
   - 대시보드 지표(19년, 142억, 380건 등)가 화면에 스크롤 진입 시 부드럽게 카운트업.
3. **프로젝트 카테고리 실시간 필터링**:
   - `All`, `친환경 ESG`, `원가 혁신`, `생산 최적화`, `공급망 SCM` 버튼 클릭 시 매끄러운 페이드 전환.
4. **프로젝트 상세 모달(Modal Pop-up)**:
   - 각 프로젝트 카드 클릭 시 세부 공정 조건(수지 조성, 건조 프로파일, 시험 성적 등) 팝업 제공.
5. **FAQ 아코디언(Accordion)**:
   - 질문 클릭 시 부드럽게 펼쳐지는 인터랙션.
6. **원클릭 인쇄 및 PDF 저장 (`window.print()`)**:
   - 채용 담당자가 오프라인 면접 시 출력해 갈 수 있도록 `@media print` 전용 스타일 시트 탑재.
7. **이메일 및 전화번호 복사 클립보드 피드백**:
   - 복사 버튼 클릭 시 "클립보드에 복사되었습니다" 토스트 알림 표시.
