/**
 * 이수민 부장 포트폴리오 웹사이트 자바스크립트 (Pure Vanilla JS)
 * - Zero Dependencies (GitHub Pages 100% 호환)
 * - 카운트업 애니메이션, 프로젝트 필터링, 모달 팝업, FAQ 아코디언, 클립보드 복사, 인쇄
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. 테마 토글 (다크/라이트 모드)
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");
  const mobileThemeToggleBtn = document.getElementById("mobileThemeToggleBtn");
  const mobileThemeIcon = document.getElementById("mobileThemeIcon");
  const mobileThemeText = document.getElementById("mobileThemeText");

  const applyTheme = (theme) => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      if (themeIcon) themeIcon.className = "fa-solid fa-moon";
      if (themeText) themeText.innerText = "다크 모드";
      if (mobileThemeIcon) mobileThemeIcon.className = "fa-solid fa-moon";
      if (mobileThemeText) mobileThemeText.innerText = "다크 모드로 전환";
      localStorage.setItem("packaging_portfolio_theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      if (themeIcon) themeIcon.className = "fa-solid fa-sun";
      if (themeText) themeText.innerText = "라이트 모드";
      if (mobileThemeIcon) mobileThemeIcon.className = "fa-solid fa-sun";
      if (mobileThemeText) mobileThemeText.innerText = "라이트 모드로 전환";
      localStorage.setItem("packaging_portfolio_theme", "dark");
    }
  };

  // 초기 테마 결정 (localStorage 확인, 기본값을 깔끔한 라이트 모드로 설정)
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("packaging_portfolio_theme") || "light";
  applyTheme(savedTheme);

  const toggleTheme = () => {
    const isLight = document.body.classList.contains("light-theme");
    applyTheme(isLight ? "dark" : "light");
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener("click", toggleTheme);
  }

  // 1. 모바일 햄버거 메뉴 토글
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
      const isOpen = mobileDrawer.classList.contains("open");
      mobileMenuBtn.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 2. 인쇄 / PDF 저장 트리거
  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // 3. 숫자 카운트업 애니메이션 (Intersection Observer)
  const counters = document.querySelectorAll(".counter");
  let hasCounted = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 1600; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad 곡선
        const easeOut = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOut * target);

        counter.innerText = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const metricsSection = document.getElementById("metrics");
  if (metricsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          countUp();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(metricsSection);
  }

  // 4. 프로젝트 카테고리 필터링
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          card.style.animation = "modal-enter 0.3s ease-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 5. 프로젝트 상세 모달 데이터 & 핸들러
  const projectData = {
    case1: {
      tag: "친환경 / ESG 패키징",
      title: "All-PE 단일재질 고차단성 리사이클 파우치 전면 상용화",
      client: "글로벌 헬스케어 & 소비재 라인",
      period: "2022.04 ~ 2023.05 (14개월)",
      challenge: "기존 4층 복합 알루미늄 필름(PET/AL/NY/PE)은 분리배출 재활용이 불가능하여 유럽 수출 규제(PPWR)에 가로막힘. 알루미늄 없이 산소와 수분을 동등 수준으로 막아내야 하며, 열에 약한 PE 수지의 인쇄 건조 시 늘어남 현상 극복이 최대 과제.",
      engineering: [
        "MDO-PE 기계 방향 연신 필름 표면에 초박막 투명 AlOx(산화알루미늄) 진공 증착 적용",
        "외층(고내열 MDO-PE) + 내층(저온 쾌속 LLDPE 실란트)의 100% PE 단일 소재 복합체 설계",
        "그라비어 인쇄 건조 챔버 온도를 90℃에서 70℃ 저온 대풍량 프로파일로 변경하여 치수 변형률 0.2% 미만 달성",
        "배리어 시험 결과: OTR 0.32 cc/㎡·day, WVTR 0.41 g/㎡·day 기록 (기존 알루미늄 대비 95% 성능 유지)"
      ],
      results: [
        "환경부 포장재 재활용 용이성 평가 '재활용 우수' 등급 획득",
        "전사 폐기물 부담금 연간 4억 2천만 원 감축",
        "유럽 및 북미 친환경 규격 승인 완료로 수출 대상국 3개국 확대"
      ]
    },
    case2: {
      tag: "원가 혁신 (Cost Innovation)",
      title: "전사 용기/캡 박막화(Down-gauging) 및 규격 통합 표준화",
      client: "생활화학 및 바디케어 전 품목",
      period: "2021.03 ~ 2022.02 (12개월)",
      challenge: "원유가 급등으로 플라스틱 수지 단가가 35% 폭등. 기존 85종의 다품종 용기로 인해 발주 단위(MOQ)가 쪼개져 단가 협상력이 낮고 금형 교체로 인한 공장 라인 손실이 심각함.",
      engineering: [
        "FEM(유한요소해석) 3D 시뮬레이션을 통해 용기 하단 및 숄더부에 곡률 리브(Rib) 보강 구조 설계",
        "내용물 충진 및 1.2m 낙하 테스트를 만족하면서 몸체 벽면 두께를 1.2mm에서 0.85mm로 30% 감량",
        "캡 네크 규격을 28/410, 24/410 단 2종으로 전사 표준화하여 펌프/디스펜서 대량 통합 발주",
        "금형 핫러너(Hot Runner) 밸런싱 개선으로 사출 사이클 타임 18초 → 13.5초 단축"
      ],
      results: [
        "연간 포장재 순구매비용 18억 4천만 원 절감 (기존 대비 14.3% 순절감)",
        "연간 수지 원료 사용량 310톤 감축으로 ESG 지표 개선",
        "공장 충진 라인 체인지오버(Changeover) 시간 45분 → 15분 단축으로 OEE 8.5% 향상"
      ]
    },
    case3: {
      tag: "생산 최적화 & 트러블슈팅",
      title: "초고속 로터리 파우치 라인 버스트(Burst) 터짐 불량 제로화",
      client: "액상 파우치 신설 고속 자동화 라인",
      period: "2020.08 ~ 2020.10 (3개월)",
      challenge: "신규 도입된 분당 180포 사양의 자동 포장 라인에서 가동률 80% 이상 상승 시 하단 실링 부위에서 미세 터짐(Micro-leak)이 발생하여 불량률 4.2% 기록, 공장 가동 중단 위기.",
      engineering: [
        "적외선 열화상 카메라를 통해 실링 바 상하단 온도 편차(최대 12℃) 감지 및 카트리지 히터 배선 재설계",
        "DSC(시차주사열량계) 분석을 통해 실란트 필름의 슬립제(Erucamide)가 표면으로 과도하게 블룸(Bloom)되어 핫택 접착을 방해함을 규명",
        "슬립제 함량을 800ppm → 450ppm으로 낮추고 고분자 m-LLDPE 3층 공압출 구조로 긴급 리포뮬레이션",
        "실링 압착 후 급속 냉각 블록(Chilling Block) 접촉 시간을 0.05초 연장하여 열변형 억제"
      ],
      results: [
        "라인 최고 속도(200 BPM) 가동 시 버스트 불량률 4.2% → 0.01% 미만으로 획기적 개선",
        "생산 라인 일일 가동 수율 99.4% 달성, 월 2억 8천만 원 생산 손실 차단",
        "포장재-기계 설비 매칭 표준 파라미터 가이드북 정립"
      ]
    },
    case4: {
      tag: "글로벌 공급망 SCM",
      title: "팬데믹 원자재 대란 속 글로벌 듀얼 벤더 구축 및 리스크 헷징",
      client: "고기능성 차단 필름 수급 라인",
      period: "2021.05 ~ 2021.09 (5개월)",
      challenge: "글로벌 물류 대란 및 원료 쇼티지로 일본계 독점 필름 공급사의 납기가 기존 4주에서 24주로 지연되어 전사 완제품 출하 중단 위기 직면.",
      engineering: [
        "국내 및 동남아(베트남, 인도네시아) 5개 필름 제조사 현장 긴급 오딧(Audit) 및 품질 검증",
        "14일간 초가속 보존 테스트(50℃/80%RH)와 라인 정속 테스트를 병렬 동시 수행하는 패스트트랙 가동",
        "물성 합격 기준을 충족하는 신규 제조사 2곳을 선정하고 품질보증협약(QAA) 체결",
        "메인 공급사와 서브 공급사 비율을 7:3으로 분할 운영하는 듀얼 소싱 체계 완성"
      ],
      results: [
        "생산 라인 셧다운 0시간 (단 하루의 결품 없이 출하 정상 유지)",
        "경쟁 입찰 구도 형성을 통해 기존 독점 단가 대비 5.8% 추가 단가 인하 달성",
        "공급망 다변화로 향후 지정학적 원자재 리스크 원천 차단"
      ]
    },
    case5: {
      tag: "고기능성 엔지니어링",
      title: "바이오·진단키트 극저습 알루미늄 배리어 파우치 국산화",
      client: "체외진단키트 및 바이오 헬스케어",
      period: "2020.02 ~ 2021.01 (12개월)",
      challenge: "수입에 의존하던 체외진단키트용 알루미늄 파우치의 가격 폭등 및 납기 지연(16주). 극미량의 수분 침투(WVTR < 0.01)도 시약 변성을 일으키므로 극한의 기밀성 보증 필요.",
      engineering: [
        "PET(12㎛) / Alu-Foil(9㎛) / BOPA(15㎛) / CPP(50㎛) 4중 고기능성 라미네이션 구조 설계",
        "압연 알루미늄 호일 핀홀(Pin-hole) 제로 규격 설정 및 전수 광학 검출 센서 적용",
        "무용제 우레탄 접착제 코팅량을 2.8g/㎡로 초정밀 도포하여 층간 박리 강도 4.5 N/15mm 확보",
        "진단 시약 가속 보존 6개월 추적 결과 변색 및 역가 저하 0건 입증"
      ],
      results: [
        "외산 대비 38% 원가 절감 달성 (연간 6억 5천만 원 비용 세이브)",
        "조달 리드타임 16주 → 2주로 단축하여 수출 납기 골든타임 사수",
        "의료기기 품질경영시스템(ISO 13485) 패키징 규격 승인"
      ]
    },
    case6: {
      tag: "친환경 지기구조 & 물류",
      title: "이커머스 친환경 무접착제 원터치 박스 및 물류 최적화",
      client: "전사 이커머스 배송 물류센터",
      period: "2022.01 ~ 2022.07 (7개월)",
      challenge: "비닐 테이프 사용으로 인한 친환경 불만과 물류센터 테이핑 작업 지연으로 출고 병목 현상 발생.",
      engineering: [
        "테이프 없이 1초 만에 조립 및 밀봉되는 크라프트 일체형 지기구조(Auto-bottom) 개발",
        "소비자 개봉 시 커터칼 없이 손으로 뜯을 수 있는 펄프 지퍼(Zipper) 오픈 라인 적용",
        "골판지 배면 꺾임선과 골 방향을 재설계하여 BCT(상자압축강도) 15% 상향",
        "ISTA 3A 택배 유통 낙하 및 진동 테스트 100% 통과"
      ],
      results: [
        "포장 작업 시간 건당 18초 → 6초로 66% 단축 (출고 생산성 40% 향상)",
        "플라스틱 박스테이프 연간 12만 롤 전면 퇴출 ('Zero Plastic' 포장 실현)",
        "고객 언박싱 만족도 지수(NPS) 24% 상승"
      ]
    }
  };

  const modalBackdrop = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-header-tag">${data.tag}</div>
      <h3 class="modal-title">${data.title}</h3>
      
      <div class="modal-section">
        <h5><i class="fa-solid fa-bullseye"></i> 과제 정의 (Challenge)</h5>
        <p>${data.challenge}</p>
      </div>

      <div class="modal-section">
        <h5><i class="fa-solid fa-microchip"></i> 적용 공학 솔루션 (Engineering Solution)</h5>
        <ul>
          ${data.engineering.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="modal-section">
        <h5><i class="fa-solid fa-trophy"></i> 비즈니스 & 정량 성과 (Results)</h5>
        <ul>
          ${data.results.map(item => `<li><strong>${item}</strong></li>`).join("")}
        </ul>
      </div>

      <div class="modal-section" style="margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-subtle); font-size: 0.8rem; color: var(--text-dim);">
        <span>수행 기간: ${data.period}</span> • <span>적용 대상: ${data.client}</span>
      </div>
    `;

    modalBackdrop.classList.add("open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const projId = btn.getAttribute("data-project");
      openModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("open")) {
      closeModal();
    }
  });

  // 6. FAQ 아코디언 인터랙션
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // 7. 클립보드 복사 & 토스트 알림
  const toastNotice = document.getElementById("toastNotice");
  const toastMessage = document.getElementById("toastMessage");

  const showToast = (msg) => {
    if (!toastNotice) return;
    toastMessage.innerText = msg;
    toastNotice.classList.add("show");
    setTimeout(() => {
      toastNotice.classList.remove("show");
    }, 2500);
  };

  const copyToClipboard = (text, successMsg) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  const fallbackCopy = (text, successMsg) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast(successMsg);
    } catch (err) {
      alert("복사 실패: " + text);
    }
    document.body.removeChild(textArea);
  };

  const copyEmailTrigger = document.getElementById("copyEmailTrigger");
  if (copyEmailTrigger) {
    copyEmailTrigger.addEventListener("click", () => {
      copyToClipboard("packaging.master.lee@gmail.com", "이메일 주소가 복사되었습니다.");
    });
  }

  const quickCopyEmailBtn = document.getElementById("quickCopyEmailBtn");
  if (quickCopyEmailBtn) {
    quickCopyEmailBtn.addEventListener("click", () => {
      copyToClipboard("packaging.master.lee@gmail.com", "이메일 주소가 복사되었습니다.");
    });
  }

  const copyPhoneTrigger = document.getElementById("copyPhoneTrigger");
  if (copyPhoneTrigger) {
    copyPhoneTrigger.addEventListener("click", () => {
      showToast("연락처는 채용 면접 및 사전 미팅 협의 시 공유드립니다.");
    });
  }

  // 8. 내비게이션 스크롤 스파이 (Active Nav Link)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
});
