// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Project Category Tabs
const tabBtns = document.querySelectorAll(".tab-btn");
const allProjects = document.querySelectorAll(".project-card");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all tabs
    tabBtns.forEach((tab) => tab.classList.remove("active"));
    // Add active class to clicked tab
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    
    // Show/hide projects based on category
    allProjects.forEach((project) => {
      if (project.classList.contains(`${category}-project`)) {
        project.style.display = "flex";
      } else {
        project.style.display = "none";
      }
    });
    
    // Reset slide position
    currentProjectSlide = 0;
    const projectGrid = document.getElementById('allProjects');
    if (projectGrid) {
      projectGrid.style.transform = 'translateX(0%)';
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Enhanced scroll animations with bidirectional support
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  
  const elements = document.querySelectorAll('.fade-up');
  
  elements.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
    
    if (isVisible && !el.classList.contains('animated')) {
      setTimeout(() => {
        el.classList.add('animated');
      }, index * 50);
    } else if (!isVisible && scrollDirection === 'up') {
      el.classList.remove('animated');
    }
  });
  
  lastScrollY = currentScrollY;
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
  // Animation controller will handle this
});

// Contact form handling - REMOVED
// Form functionality removed as requested

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero h2");
  if (heroTitle) {
    function startTypingAnimation() {
      const originalText =
        '<span class="highlight">Halo, Saya</span> Try Novaldi Ramadhan Muadi';
      heroTitle.innerHTML = '<span class="highlight">Halo, Saya</span> ';

      const nameText = "Try Novaldi Ramadhan Muadi";
      let i = 0;

      function typeChar() {
        if (i < nameText.length) {
          heroTitle.innerHTML += nameText.charAt(i);
          i++;
          setTimeout(typeChar, 80);
        } else {
          setTimeout(() => {
            heroTitle.innerHTML = originalText;
            setTimeout(startTypingAnimation, 4000);
          }, 3000);
        }
      }
      typeChar();
    }
    startTypingAnimation();
  }
});

// Add active class to navigation based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Project slider functionality - Responsive
let currentProjectSlide = 0;

function getProjectCardsPerView() {
  return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
}

function slideProjects(direction) {
  const projectGrid = document.getElementById('allProjects');
  if (!projectGrid) return;
  
  const totalCards = projectGrid.querySelectorAll('.card').length;
  const cardsPerView = getProjectCardsPerView();
  
  // Don't slide if all cards fit in viewport
  if (cardsPerView >= totalCards) {
    currentProjectSlide = 0;
    projectGrid.style.transform = 'translateX(0%)';
    return;
  }
  
  const maxSlide = totalCards - cardsPerView;
  
  currentProjectSlide += direction;
  
  if (currentProjectSlide < 0) {
    currentProjectSlide = 0;
  } else if (currentProjectSlide > maxSlide) {
    currentProjectSlide = maxSlide;
  }
  
  const translateX = -(currentProjectSlide * (100 / cardsPerView));
  projectGrid.style.transform = 'translateX(' + translateX + '%)';
}

// Skills slider functionality - Responsive
let currentSkillSlide = 0;

function getSkillCardsPerView() {
  return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
}

function slideSkills(direction) {
  const skillGrid = document.getElementById('skillsGrid');
  if (!skillGrid) return;
  
  const totalCards = skillGrid.querySelectorAll('.card').length;
  const cardsPerView = getSkillCardsPerView();
  
  // Don't slide if all cards fit in viewport (desktop)
  if (cardsPerView >= totalCards) {
    currentSkillSlide = 0;
    skillGrid.style.transform = 'translateX(0%)';
    return;
  }
  
  const maxSlide = totalCards - cardsPerView;
  
  currentSkillSlide += direction;
  
  if (currentSkillSlide < 0) {
    currentSkillSlide = 0;
  } else if (currentSkillSlide > maxSlide) {
    currentSkillSlide = maxSlide;
  }
  
  const translateX = -(currentSkillSlide * (100 / cardsPerView));
  skillGrid.style.transform = 'translateX(' + translateX + '%)';
}

// Touch/swipe support for skills
let skillTouchStartX = 0;
let skillTouchEndX = 0;

function handleSkillTouchStart(e) {
  skillTouchStartX = e.changedTouches[0].screenX;
}

function handleSkillTouchEnd(e) {
  skillTouchEndX = e.changedTouches[0].screenX;
  handleSkillSwipe();
}

function handleSkillSwipe() {
  const swipeThreshold = 50;
  if (skillTouchEndX < skillTouchStartX - swipeThreshold) {
    slideSkills(1); // Swipe left - next
  }
  if (skillTouchEndX > skillTouchStartX + swipeThreshold) {
    slideSkills(-1); // Swipe right - prev
  }
}

// Certificate slider functionality - Responsive
let currentCertSlide = 0;

function getCardsPerView() {
  return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
}

function slideCerts(direction) {
  const certGrid = document.getElementById('certGrid');
  if (!certGrid) return;
  
  const totalCards = certGrid.querySelectorAll('.card').length;
  const cardsPerView = getCardsPerView();
  
  // Don't slide if all cards fit in viewport
  if (cardsPerView >= totalCards) {
    currentCertSlide = 0;
    certGrid.style.transform = 'translateX(0%)';
    return;
  }
  
  const maxSlide = totalCards - cardsPerView;
  
  currentCertSlide += direction;
  
  if (currentCertSlide < 0) {
    currentCertSlide = 0;
  } else if (currentCertSlide > maxSlide) {
    currentCertSlide = maxSlide;
  }
  
  const translateX = -(currentCertSlide * (100 / cardsPerView));
  certGrid.style.transform = 'translateX(' + translateX + '%)';
}

// Initialize slider after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    // Project slider
    const projectPrevBtn = document.querySelector('.project-prev');
    const projectNextBtn = document.querySelector('.project-next');
    
    if (projectPrevBtn && projectNextBtn) {
      projectPrevBtn.onclick = function() { slideProjects(-1); };
      projectNextBtn.onclick = function() { slideProjects(1); };
    }
    
    // Project pagination dots
    // Removed pagination dots functionality
    
    // Skills slider
    const skillPrevBtn = document.querySelector('.skill-prev');
    const skillNextBtn = document.querySelector('.skill-next');
    const skillsGrid = document.getElementById('skillsGrid');
    
    if (skillPrevBtn && skillNextBtn) {
      skillPrevBtn.onclick = function() { slideSkills(-1); };
      skillNextBtn.onclick = function() { slideSkills(1); };
    }
    
    // Add touch support for skills
    if (skillsGrid) {
      skillsGrid.addEventListener('touchstart', handleSkillTouchStart, false);
      skillsGrid.addEventListener('touchend', handleSkillTouchEnd, false);
    }
    
    // Certificates slider
    const prevBtn = document.querySelector('.cert-prev');
    const nextBtn = document.querySelector('.cert-next');
    
    if (prevBtn && nextBtn) {
      prevBtn.onclick = function() { slideCerts(-1); };
      nextBtn.onclick = function() { slideCerts(1); };
    }
  }, 1000);
});

// Responsive utilities
function handleResize() {
  currentCertSlide = 0;
  currentSkillSlide = 0;
  currentProjectSlide = 0;
  const certGrid = document.getElementById('certGrid');
  const skillGrid = document.getElementById('skillsGrid');
  const activeProjectGrid = document.querySelector('.projects-grid:not(.hidden)');
  
  if (certGrid) {
    certGrid.style.transform = 'translateX(0%)';
  }
  if (skillGrid) {
    skillGrid.style.transform = 'translateX(0%)';
  }
  if (activeProjectGrid) {
    const cardsPerView = getProjectCardsPerView();
    const totalCards = activeProjectGrid.querySelectorAll('.card').length;
    if (cardsPerView >= totalCards) {
      activeProjectGrid.style.transform = 'translateX(0%)';
    }
  }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    slideCerts(1); // Swipe left - next
  }
  if (touchEndX > touchStartX + 50) {
    slideCerts(-1); // Swipe right - prev
  }
}

// Add event listeners
window.addEventListener('resize', handleResize);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});
// Add CSS for active navigation link
const style = document.createElement("style");
style.textContent = `
    .nav-menu a.active {
        color: #1e3a8a !important;
        position: relative;
    }
    
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);
/* ===== ANIMATION CONTROLLER ===== */

class AnimationController {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    if (this.isReducedMotion) return;
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Intersection Observer for initial load animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            setTimeout(() => {
              entry.target.classList.add('animated');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-up').forEach(el => {
      observer.observe(el);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
});