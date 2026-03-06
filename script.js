// =============================================
// KINGSWOOD APPLIANCE REPAIRS — SCRIPTS
// =============================================

// --- Mobile Menu ---
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

// --- Sticky header shadow ---
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
});

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// --- Form submission ---
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const action = form.getAttribute('action');
    if (!action || action.includes('placeholder')) {
      alert('Thanks! Please call 07949 248341 to book your repair.');
      return;
    }
    const data = new FormData(form);
    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.innerHTML = '<div style="text-align:center;padding:40px 20px"><h3 style="color:#1B3A6B;margin-bottom:12px">✅ Enquiry Sent!</h3><p style="color:#6b7280">Thanks — Dave will be in touch shortly. Or call <a href="tel:07949248341" style="color:#1B3A6B;font-weight:700">07949 248341</a>.</p></div>';
      } else {
        alert('Something went wrong. Please call 07949 248341 directly.');
      }
    } catch {
      alert('Something went wrong. Please call 07949 248341 directly.');
    }
  });
}

// --- Animate on scroll ---
const animEls = document.querySelectorAll('.service-card, .feature-card, .review-card, .step-card, .award-card');
animEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animEls.forEach(el => observer.observe(el));
