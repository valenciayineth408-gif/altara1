/* ============================================================
   ALTARA — script.js
   Animaciones, interactividad y microdetalles de lujo
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────
   CURSOR PERSONALIZADO
   ────────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (!cursor || !follower || window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    raf = requestAnimationFrame(animateFollower);
  }

  animateFollower();

  // Efecto hover en elementos interactivos
  const interactiveEls = document.querySelectorAll('a, button, input, .pieza');

  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.background = 'transparent';
      cursor.style.border = '1px solid var(--color-dorado)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'var(--color-dorado)';
      cursor.style.border = 'none';
    });
  });

  // Ocultar cursor al salir de la ventana
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
})();


/* ──────────────────────────────────────────────
   NAVEGACIÓN — efecto scroll
   ────────────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }, { passive: true });
})();


/* ──────────────────────────────────────────────
   INTERSECTION OBSERVER — animaciones de entrada
   ────────────────────────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
})();


/* ──────────────────────────────────────────────
   HERO — animación inicial de entrada
   ────────────────────────────────────────────── */
(function initHeroEntrance() {
  // Los elementos del hero se revelan inmediatamente al cargar
  const heroReveals = document.querySelectorAll('.hero .reveal-up');

  // Pequeño delay para asegurarnos que el CSS está listo
  requestAnimationFrame(() => {
    setTimeout(() => {
      heroReveals.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('revealed');
        }, i * 150);
      });
    }, 200);
  });
})();


/* ──────────────────────────────────────────────
   PARALLAX SUAVE en imagen del hero
   ────────────────────────────────────────────── */
(function initParallax() {
  const heroImg = document.querySelector('.hero__image');
  if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const limit = window.innerHeight;
        if (scrollY < limit) {
          heroImg.style.transform = `translateY(${scrollY * 0.18}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ──────────────────────────────────────────────
   FORMULARIO DE CAPTURA
   ────────────────────────────────────────────── */
(function initCapturaForm() {
  const btn      = document.getElementById('submitBtn');
  const form     = document.getElementById('capturaForm');
  const confirm  = document.getElementById('capturaConfirm');
  const emailEl  = document.getElementById('email');

  if (!btn || !form || !confirm || !emailEl) return;

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function shakeField(el) {
    el.style.transition = 'transform 0.08s ease';
    const frames = [
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' },
      { transform: 'translateX(0)' },
    ];
    let i = 0;
    function step() {
      if (i < frames.length) {
        el.style.transform = frames[i].transform;
        i++;
        setTimeout(step, 70);
      } else {
        el.style.transform = '';
      }
    }
    step();
    // Flash borde rojo breve
    el.style.borderColor = 'rgba(180, 60, 60, 0.6)';
    setTimeout(() => {
      el.style.borderColor = '';
    }, 600);
  }

  // Microinteracción: el botón respira ligeramente al hacer hover
  btn.addEventListener('mouseenter', () => {
    btn.style.letterSpacing = '0.22em';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.letterSpacing = '';
  });

  btn.addEventListener('click', () => {
    if (!isValidEmail(emailEl.value)) {
      shakeField(emailEl);
      emailEl.focus();
      return;
    }

    // Estado de carga
    btn.textContent = 'Procesando...';
    btn.disabled = true;
    btn.style.opacity = '0.6';

    setTimeout(() => {
      // Simular respuesta exitosa
      form.style.opacity = '0';
      form.style.transform = 'translateY(-10px)';
      form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      setTimeout(() => {
        form.hidden = true;
        confirm.hidden = false;

        // Micro-animación del ícono ✦
        const icon = confirm.querySelector('.captura__confirm-icon');
        if (icon) {
          icon.style.transform = 'scale(0)';
          icon.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          setTimeout(() => { icon.style.transform = 'scale(1)'; }, 50);
        }
      }, 400);
    }, 1200);
  });

  // Enter en campo email dispara el submit
  emailEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });

  // Validación en tiempo real suave
  emailEl.addEventListener('blur', () => {
    if (emailEl.value && !isValidEmail(emailEl.value)) {
      emailEl.style.borderColor = 'rgba(180, 60, 60, 0.4)';
    } else {
      emailEl.style.borderColor = '';
    }
  });
})();


/* ──────────────────────────────────────────────
   AÑO EN FOOTER
   ────────────────────────────────────────────── */
(function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


/* ──────────────────────────────────────────────
   SMOOTH SCROLL para anclas internas
   ────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
})();


/* ──────────────────────────────────────────────
   EFECTO EDITORIAL en hover de imágenes de piezas
   — sutil línea dorada que aparece al fondo —
   ────────────────────────────────────────────── */
(function initPiezaHover() {
  const piezas = document.querySelectorAll('.pieza');

  piezas.forEach(pieza => {
    const wrap = pieza.querySelector('.pieza__image-wrap');
    if (!wrap) return;

    // Borde dorado en la info al hover de la pieza completa
    const info = pieza.querySelector('.pieza__info');

    pieza.addEventListener('mouseenter', () => {
      if (info) {
        info.style.borderColor = 'rgba(198,169,107,0.45)';
        info.style.transition = 'border-color 0.5s ease';
      }
    });

    pieza.addEventListener('mouseleave', () => {
      if (info) {
        info.style.borderColor = '';
      }
    });
  });
})();


/* ──────────────────────────────────────────────
   NÚMERO DE EDICIÓN — efecto contador animado
   al entrar en viewport por primera vez
   ────────────────────────────────────────────── */
(function initEditionNumbers() {
  const tags = document.querySelectorAll('.pieza__edition-tag');
  if (!tags.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tag = entry.target;
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(-8px)';
        tag.style.transition = 'opacity 0.6s 0.3s ease, transform 0.6s 0.3s ease';
        requestAnimationFrame(() => {
          tag.style.opacity = '1';
          tag.style.transform = 'translateY(0)';
        });
        observer.unobserve(tag);
      }
    });
  }, { threshold: 0.4 });

  tags.forEach(tag => observer.observe(tag));
})();


/* ──────────────────────────────────────────────
   LÍNEA DORADA animada en el manifiesto
   ────────────────────────────────────────────── */
(function initManifiestoLine() {
  const mark = document.querySelector('.manifiesto__mark');
  if (!mark) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mark.style.backgroundSize = '100% 1px';
        observer.unobserve(mark);
      }
    });
  }, { threshold: 0.6 });

  observer.observe(mark);
})();


/* ──────────────────────────────────────────────
   PREFERS REDUCED MOTION — respeto global
   ────────────────────────────────────────────── */
(function respectReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Revelar todo inmediatamente
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
  }
})();
