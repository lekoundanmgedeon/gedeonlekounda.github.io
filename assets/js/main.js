document.addEventListener('DOMContentLoaded', () => {
  
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Smooth Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Typewriter Effect ---
  const roles = [
    "Software Engineer",
    "Data Scientist",
    "Database Engineer",
    "DevOps Engineer",
    "MLOps Engineer"
  ];
  
  const typeWriterElement = document.getElementById('typewriter');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 500; // Pause before new word
    }
    
    setTimeout(type, typingDelay);
  }
  
  if (typeWriterElement) {
    setTimeout(type, 1000);
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // --- Counter Animation ---
        if (entry.target.classList.contains('stat-card')) {
          const numEl = entry.target.querySelector('.stat-number');
          if (numEl && !numEl.classList.contains('counted')) {
            numEl.classList.add('counted');
            animateCounter(numEl);
          }
        }
      }
    });
  }, revealOptions);
  
  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
  
  // Initial check for elements already in view
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
        if (el.classList.contains('stat-card')) {
          const numEl = el.querySelector('.stat-number');
          if (numEl && !numEl.classList.contains('counted')) {
            numEl.classList.add('counted');
            animateCounter(numEl);
          }
        }
      }
    });
  }, 100);

  // --- Counter Animation Function ---
  function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.ceil(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        el.innerText = target + "+";
      }
    };
    updateCounter();
  }

  // --- tsParticles Initialization ---
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#3b82f6", "#8b5cf6", "#14b8a6"],
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    });
  }

  // --- Isotope Filtering ---
  if (typeof Isotope !== 'undefined') {
    // Wait for images to load before initializing Isotope
    window.addEventListener('load', () => {
      const grid = document.querySelector('.isotope-grid');
      if (grid) {
        const iso = new Isotope(grid, {
          itemSelector: '.isotope-item',
          layoutMode: 'fitRows'
        });

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            
            const filterValue = e.target.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
          });
        });
      }
    });
  }

  // --- Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  if (themeToggleBtn) {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.className = 'bi bi-moon-fill';
    }

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'bi bi-brightness-high-fill';
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'bi bi-moon-fill';
        localStorage.setItem('theme', 'light');
      }
    });
  }

});