// Ramdev Sales & Gas Service - Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle & Smooth Scrolling
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-open');
    });

    // Close menu when clicking outside or clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll indicator click
  const scrollIndicator = document.querySelector('.scroll-mouse-pill');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = document.getElementById('about') || document.getElementById('services');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  // ==========================================================================
  // INTERACTIVE SERVICES CATALOGUE NAVIGATION
  // ==========================================================================
  const mainGrid = document.getElementById('services-main-grid');
  const subView = document.getElementById('services-sub-view');
  const backBtn = document.getElementById('services-back-btn');
  const dynamicTitle = document.getElementById('services-dynamic-title');
  const dynamicSubtitle = document.getElementById('services-dynamic-subtitle');
  const categoryCards = document.querySelectorAll('.service-category-card');
  const subGrids = document.querySelectorAll('.subcategory-grid');
  const servicesSection = document.getElementById('services');

  const defaultTitle = 'Complete Gas Repair & Maintenance Solutions';
  const defaultSubtitle = 'End-to-end services for residential kitchens and commercial setups, delivered with safety and precision.';

  function openCategory(categoryId) {
    const targetGrid = document.getElementById(`grid-${categoryId}`);
    if (!targetGrid || !mainGrid || !subView) return;

    const categoryTitle = targetGrid.getAttribute('data-category-title') || 'Category Services';

    // 1. Hide main category grid
    mainGrid.classList.add('is-hidden');

    // 2. Hide all subcategory grids and reveal only the active one
    subGrids.forEach(grid => grid.classList.add('is-hidden'));
    targetGrid.classList.remove('is-hidden');
    subView.classList.remove('is-hidden');

    // 3. Update section header
    if (dynamicTitle) dynamicTitle.textContent = categoryTitle;
    if (dynamicSubtitle) dynamicSubtitle.textContent = `Browse our specialized solutions under ${categoryTitle}.`;
    if (backBtn) backBtn.classList.remove('is-hidden');

    // 4. Smoothly scroll into the services section
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function backToAllServices() {
    if (!mainGrid || !subView) return;

    // 1. Hide subcategory grids and sub view
    subGrids.forEach(grid => grid.classList.add('is-hidden'));
    subView.classList.add('is-hidden');

    // 2. Show main categories grid
    mainGrid.classList.remove('is-hidden');

    // 3. Reset section header
    if (dynamicTitle) dynamicTitle.textContent = defaultTitle;
    if (dynamicSubtitle) dynamicSubtitle.textContent = defaultSubtitle;
    if (backBtn) backBtn.classList.add('is-hidden');

    // 4. Smooth scroll back to services top
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Category card click & keyboard listeners
  categoryCards.forEach(card => {
    const categoryId = card.getAttribute('data-category-id');

    card.addEventListener('click', () => {
      if (categoryId) openCategory(categoryId);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (categoryId) openCategory(categoryId);
      }
    });
  });

  // Back button click listener
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      backToAllServices();
    });
  }
});
