// =============================================
// KINGSWOOD APPLIANCE REPAIRS — SCRIPTS
// =============================================

// --- Mobile Menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const header = document.getElementById('site-header');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// --- Sticky header class ---
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// --- Smooth scroll for all anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80; // header height
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// --- Form submission feedback ---
const form = document.querySelector('.contact-form form');
if (form) {
  form.addEventListener('submit', async function(e) {
    const action = form.getAttribute('action');
    // Only intercept if formspree ID is a placeholder
    if (action.includes('REPLACE_WITH_ID')) {
      e.preventDefault();
      alert('Thanks for your enquiry! We will be in touch shortly.\n\n(Form submission is not yet configured — please call 07949 248341.)');
      return;
    }
    // For real formspree, let it submit normally (or handle async)
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.innerHTML = '<div style="text-align:center;padding:40px 20px"><h3 style="color:#1B3A6B;margin-bottom:12px">✅ Enquiry Sent!</h3><p style="color:#5a6070">Thanks — Dave will be in touch shortly. Or call <a href="tel:07949248341" style="color:#1B3A6B;font-weight:700">07949 248341</a> for a faster response.</p></div>';
      } else {
        alert('Something went wrong. Please call 07949 248341 directly.');
      }
    } catch {
      alert('Something went wrong. Please call 07949 248341 directly.');
    }
  });
}

// --- Animate sections on scroll ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .feature-box, .review-card, .step, .awards-grid img').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Add visible class immediately for above-fold
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// Intersection callback needs to apply styles
const styleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .feature-box, .review-card, .step, .awards-grid img').forEach(el => {
  styleObserver.observe(el);
});
