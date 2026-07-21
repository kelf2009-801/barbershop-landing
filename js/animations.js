/* ============================================
   BRUTUS — Animations v2 (GSAP + fixed)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- GSAP ANIMATIONS ----------
  if (typeof gsap !== 'undefined') {
    ScrollTrigger.refresh();

    // Hero parallax
    gsap.to('.hero-collage', {
      y: '15%',
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    // Hero reveal
    gsap.from('.hero-title', { y: 80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
    gsap.from('.hero-buttons', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.6 });
    gsap.from('.hero-stats', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.8 });
    gsap.from('.hero-badge', { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)', delay: 0.1 });

    // Section reveals with ScrollTrigger
    gsap.utils.toArray('.section').forEach(section => {
      const cards = section.querySelectorAll('.reveal');
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // Counter animation
    gsap.utils.toArray('.stat-num').forEach(el => {
      const text = el.textContent;
      const num = parseInt(text.replace(/[^0-9]/g, '')) || 0;
      const suffix = text.replace(/[0-9]/g, '');
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, {
            innerHTML: num + suffix,
            duration: 1.5,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
              const val = Math.round(parseFloat(this.targets()[0].textContent)) || 0;
              el.innerHTML = val + suffix;
            }
          });
        }
      });
    });
  }

  // ---------- HEADER SCROLL ----------
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ---------- BURGER MENU ----------
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav');
  const headerCta = document.querySelector('.header-cta');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.classList.toggle('active');

      if (nav.classList.contains('open')) {
        nav.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:80px;left:0;right:0;background:rgba(10,10,10,0.98);backdrop-filter:blur(20px);padding:24px;gap:16px;border-bottom:1px solid #2a2a2a;z-index:999;';
        if (headerCta) headerCta.style.display = 'none';
        const mobileCta = document.createElement('a');
        mobileCta.href = '#cta';
        mobileCta.className = 'btn btn-primary';
        mobileCta.textContent = 'Записаться';
        mobileCta.style.cssText = 'width:100%;text-align:center;margin-top:8px;';
        nav.appendChild(mobileCta);
      } else {
        nav.style.cssText = '';
        nav.querySelectorAll('.btn.btn-primary').forEach(el => { if (el !== headerCta) el.remove(); });
        if (headerCta) headerCta.style.display = '';
      }
    });

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
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ---------- SMOOTH SCROLL ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- LIGHTBOX ----------
  const lightboxLinks = document.querySelectorAll('[data-lightbox]');
  if (lightboxLinks.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt=""><span class="lightbox-prev">&lsaquo;</span><span class="lightbox-next">&rsaquo;</span>';
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    let currentIndex = 0;
    const images = Array.from(lightboxLinks).map(a => a.href);

    lightboxLinks.forEach((a, i) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = i;
        showImage(i);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function showImage(i) { lightboxImg.src = images[i]; }
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + images.length) % images.length; showImage(currentIndex); });
    nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % images.length; showImage(currentIndex); });

    function closeLightbox() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + images.length) % images.length; showImage(currentIndex); }
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % images.length; showImage(currentIndex); }
    });
  }
});