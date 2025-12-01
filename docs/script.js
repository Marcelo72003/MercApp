const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

const toggleMenu = () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('active', isOpen);
};

navToggle.addEventListener('click', toggleMenu);

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('is-open')) {
      toggleMenu();
    }
  });
});

// Animación suave en scroll para elementos clave
const animatedItems = document.querySelectorAll('.card, .hero-card, .diagram, .timeline .step');

const reveal = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(reveal, { threshold: 0.15 });
animatedItems.forEach((item) => observer.observe(item));
