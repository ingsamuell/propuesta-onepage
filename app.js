/* ==========================================================================
   GAH 24/7 - INTERACTIVE CORPORATE LOGIC & UX ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Header Scrolled Shadow Effect
  const headerNav = document.getElementById('header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Hamburger Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      mobileToggle.innerHTML = isActive 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking any link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });

    // Close menu when clicking outside header
    document.addEventListener('click', (e) => {
      if (!headerNav.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }

  // 3. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 4. FAQ Accordion Toggle Logic
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentItem = trigger.closest('.faq-item');
      const isOpen = parentItem.classList.contains('active');

      // Close all other FAQ items for a clean single-open behavior
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        parentItem.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. Contact Form Submission & Confirmation Modal
  const contactForm = document.getElementById('contact-form');
  const contactModal = document.getElementById('contact-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (contactForm && contactModal) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Open modal with smooth fade
      contactModal.classList.add('active');
      
      // Reset form fields
      contactForm.reset();
    });

    // Close modal via close button
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        contactModal.classList.remove('active');
      });
    }

    // Close modal when clicking outside modal box
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
      }
    });
  }

});
