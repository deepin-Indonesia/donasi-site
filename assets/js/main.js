document.addEventListener('DOMContentLoaded', function() {
  /* ===== Mobile Menu Toggle ===== */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-navigation');
  const menuBackdrop = document.querySelector('.menu-backdrop');

  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (menuBackdrop) menuBackdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
    const bars = menuToggle.querySelectorAll('.menu-icon-bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }

  function openMenu() {
    mainNav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    if (menuBackdrop) menuBackdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    const bars = menuToggle.querySelectorAll('.menu-icon-bar');
    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      if (mainNav.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on backdrop click
    if (menuBackdrop) {
      menuBackdrop.addEventListener('click', closeMenu);
    }

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ===== Mobile Dropdown Toggle ===== */
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = toggle.closest('.dropdown');
        const menu = dropdown.querySelector('.dropdown-menu');
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
      }
    });
  });

  /* ===== Smooth scroll for anchor links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ===== Header scroll effect ===== */
  let lastScroll = 0;
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,.08)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
});
