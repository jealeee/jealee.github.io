import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const OPEN_KAKAO_URL = 'https://open.kakao.com/o/sRj8qtEh';
const NAVER_BLOG_URL = 'https://blog.naver.com/leegastar';
const PHONE_NUMBER = '010-2334-7268';

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 16V4" />
    <path d="m7 9 5-5 5 5" />
    <path d="M5 20h14" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 17H5l1.4-1.4A2 2 0 0 0 7 14.2V11a5 5 0 1 1 10 0v3.2a2 2 0 0 0 .6 1.4L19 17h-4" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.8 19.8 0 0 1 0 1.18 2 2 0 0 1 2 1h3a2 2 0 0 1 2 1.72 12.1 12.1 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.1 8.9a16 16 0 0 0 9 9l1.25-1.15a2 2 0 0 1 2.11-.45 12.1 12.1 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3C6.48 3 2 6.58 2 11c0 2.88 1.74 5.42 4.35 6.97l-.9 3.33a.3.3 0 0 0 .44.34l3.88-2.58c.73.1 1.48.15 2.23.15 5.52 0 10-3.58 10-8.21S17.52 3 12 3Z" />
  </svg>
);

const BlogIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v16H4z" />
    <path d="M8 8h8" />
    <path d="M8 12h8" />
    <path d="M8 16h5" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

function useToast() {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const show = (text) => {
    setMsg(text);
    setVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 2200);
  };

  return { msg, visible, show };
}

function App() {
  const toast = useToast();
  const heroRef = useRef(null);
  const [compactHeaderVisible, setCompactHeaderVisible] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      if (!heroRef.current) {
        return;
      }

      const { bottom } = heroRef.current.getBoundingClientRect();
      setCompactHeaderVisible(bottom <= 96);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateHeaderState);
    };
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '보험 컨설턴트 이희제',
          text: '보험 분석과 보장 설계를 도와드립니다.',
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      toast.show('링크를 복사했습니다.');
    } catch {
      toast.show('공유를 완료하지 못했습니다.');
    }
  };

  const handlePhone = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const handleNotify = () => {
    toast.show('알림 기능은 준비 중입니다.');
  };

  const serviceItems = [
    '현재 가입 내용 분석',
    '불필요한 보험료 정리',
    '꼭 필요한 보장 재구성',
    '보험금 청구 및 관리까지',
  ];

  return (
    <div className="page">
      <div className={`floating-header-shell${compactHeaderVisible ? ' is-visible' : ''}`} aria-hidden={!compactHeaderVisible}>
        <div className="floating-header">
          <button className="icon-button dark" type="button" onClick={handleShare} aria-label="공유하기">
            <ShareIcon />
          </button>

          <div className="floating-profile">
            <img className="floating-avatar" src="/profile.jpg" alt="보험 컨설턴트 이희제" />
          </div>

          <button className="icon-button dark" type="button" onClick={handleNotify} aria-label="알림">
            <BellIcon />
          </button>
        </div>
      </div>

      <main className="container">
        <section className="card-shell">
          <header className="hero" ref={heroRef}>
            <div className="hero-actions">
              <button className="icon-button" type="button" onClick={handleShare} aria-label="공유하기">
                <ShareIcon />
              </button>
              <button className="icon-button" type="button" onClick={handleNotify} aria-label="알림">
                <BellIcon />
              </button>
            </div>

            <div className="profile-block">
              <img className="profile-image" src="/profile.jpg" alt="보험 컨설턴트 이희제 프로필" />
              <h1 className="profile-name">보험 컨설턴트 이희제</h1>
              <p className="profile-subtitle">Insurance Consultant</p>
            </div>

            <div className="quick-links" aria-label="연락처 링크">
              <a className="quick-link" href={`tel:${PHONE_NUMBER}`} aria-label="전화 상담">
                <PhoneIcon />
              </a>
              <a className="quick-link kakao" href={OPEN_KAKAO_URL} target="_blank" rel="noopener noreferrer" aria-label="카카오톡 상담">
                <KakaoIcon />
              </a>
              <a className="quick-link" href={NAVER_BLOG_URL} target="_blank" rel="noopener noreferrer" aria-label="블로그">
                <BlogIcon />
              </a>
              <a className="quick-link" href={NAVER_BLOG_URL} target="_blank" rel="noopener noreferrer" aria-label="웹사이트">
                <GlobeIcon />
              </a>
            </div>
          </header>

          <section className="content-section">
            <p className="intro-text">
              보험 컨설턴트 이희제입니다.
              <br />
              <br />
              단순히 보험을 판매하는 사람이 아니라,
              <br />
              고객님의 상황과 목적에 맞게
              <br />
              가장 현실적인 보장 구조를 설계하고
              <br />
              끝까지 관리하는 역할을 합니다.
              <br />
              <br />
              보험은 가입으로 끝나는 상품이 아니라
              <br />
              유지관리와 활용에 따라 결과가 달라지는 금융입니다.
              <br />
              <br />
              같은 치료를 받아도
              <br />
              진단명과 코드에 따라
              <br />
              보험금 지급 여부와 금액이 달라질 수 있기 때문에
              <br />
              <br />
              병원 가시기 전,
              <br />
              한 번의 상담이 큰 차이를 만듭니다.
            </p>
            <p style={{width: '150px', height: '1px', background:'#000', marginBottom:'20px'}}></p>
            <p className="intro-text">
              보험이 어렵고 복잡하셔도 괜찮습니다.
              <br />
              <br />
              <strong>✔ 현재 가입 내용 분석</strong>
              <br />
              <strong>✔ 불필요한 보험료 정리</strong>
              <br />
              <strong>✔ 꼭 필요한 보장 재구성</strong>
              <br />
              <strong>✔ 보험금 청구 및 관리까지</strong>
              <br />
              <br />
              단순 비교가 아니라
               <br />
              <strong>“실제로 받을 수 있는 구조”</strong>를 기준으로
               <br />
              하나씩 정리해드립니다.
            </p>
            <p style={{width: '150px', height: '1px', background:'#000', marginBottom:'20px'}}></p>
             <p className="intro-text">
              보험은 가입할 때보다
              <br />
              보험금을 받을 때가 가장 중요합니다.
              <br />
              <br />
              👉 병원 가기 전,<br />
              👉 의사선 생님을 만나기 전,<br />
              👉 <strong>이희제</strong>에게 먼저 연락 주세요.
             </p>


            <a className="cta-button" href={OPEN_KAKAO_URL} target="_blank" rel="noopener noreferrer">
              <MessageIcon />
              상담 먼저 받아보기
            </a>
          </section>
        </section>
      </main>

      <div className={`toast${toast.visible ? ' show' : ''}`}>{toast.msg}</div>
    </div>
  );
}

export default App;
