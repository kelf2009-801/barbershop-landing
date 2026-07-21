/* ============================================
   BRUTUS — Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- HEADER SCROLL ----------
  const header = document.querySelector('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  });

  // ---------- BURGER MENU ----------
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav');
  const headerCta = document.querySelector('.header-cta');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.classList.toggle('active');
      burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Меню');

      if (nav.classList.contains('open')) {
        nav.style.cssText = `
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 80px;
          left: 0;
          right: 0;
          background: rgba(10,10,10,0.98);
          backdrop-filter: blur(20px);
          padding: 20px;
          gap: 16px;
          border-bottom: 1px solid var(--color-border, #2a2a2a);
          z-index: 999;
        `;
        if (headerCta) headerCta.style.display = 'none';
        // Show copy of CTA in mobile nav
        const mobileCta = document.createElement('a');
        mobileCta.href = '#cta';
        mobileCta.className = 'btn btn-primary';
        mobileCta.textContent = 'Записаться';
        mobileCta.style.cssText = 'width:100%;text-align:center;margin-top:8px;';
        nav.appendChild(mobileCta);
      } else {
        nav.style.cssText = '';
        // Remove mobile CTA duplicates
        const mobileCtas = nav.querySelectorAll('.btn.btn-primary');
        mobileCtas.forEach(el => {
          if (el !== headerCta) el.remove();
        });
        if (headerCta) headerCta.style.display = '';
      }
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        nav.style.cssText = '';
        burger.classList.remove('active');
        if (headerCta) headerCta.style.display = '';
      });
    });
  }

  // ---------- FAQ ACCORDION ----------
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Open clicked if wasn't open
      if (!isActive) item.classList.add('active');
    });
  });

  // ---------- REVEAL ON SCROLL ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- SMOOTH SCROLL FOR ANCHORS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- HERO PARALLAX (мышь) ----------
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      const bg = hero.querySelector('.hero-bg');
      if (bg) bg.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });
  }
});