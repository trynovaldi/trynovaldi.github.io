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
const projectGrids = document.querySelectorAll(".projects-grid");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all tabs
    tabBtns.forEach((tab) => tab.classList.remove("active"));
    // Add active class to clicked tab
    btn.classList.add("active");

    // Hide all project grids
    projectGrids.forEach((grid) => grid.classList.add("hidden"));

    // Show selected category
    const category = btn.getAttribute("data-category");
    const targetGrid = document.getElementById(`${category}-projects`);
    if (targetGrid) {
      targetGrid.classList.remove("hidden");
      // Reset slide position when switching tabs
      currentProjectSlide = 0;
      targetGrid.style.transform = 'translateX(0%)';
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

// Enhanced scroll animations
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.skill-item, .project-card, .cert-card, .about-desc, .hero-content');
  
  elements.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;
    
    if (isVisible && !el.classList.contains('animated')) {
      el.classList.add('animated');
      el.style.animationDelay = `${index * 0.1}s`;
    }
  });
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.skill-item, .project-card, .cert-card');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
  });
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
  const activeGrid = document.querySelector('.projects-grid:not(.hidden)');
  if (!activeGrid) return;
  
  const projectCards = activeGrid.querySelectorAll('.project-card');
  const totalCards = projectCards.length;
  const cardsPerView = getProjectCardsPerView();
  
  currentProjectSlide += direction;
  
  if (currentProjectSlide < 0) {
    currentProjectSlide = 0;
  } else if (currentProjectSlide > totalCards - cardsPerView) {
    currentProjectSlide = totalCards - cardsPerView;
  }
  
  const translateX = -(currentProjectSlide * (100 / cardsPerView));
  activeGrid.style.transform = 'translateX(' + translateX + '%)';
}

// Skills slider functionality - Responsive
let currentSkillSlide = 0;

function getSkillCardsPerView() {
  return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 4;
}

function slideSkills(direction) {
  const skillGrid = document.getElementById('skillsGrid');
  const skillCards = document.querySelectorAll('.skill-item');
  const totalCards = skillCards.length;
  const cardsPerView = getSkillCardsPerView();
  
  currentSkillSlide += direction;
  
  if (currentSkillSlide < 0) {
    currentSkillSlide = 0;
  } else if (currentSkillSlide > totalCards - cardsPerView) {
    currentSkillSlide = totalCards - cardsPerView;
  }
  
  const translateX = -(currentSkillSlide * (100 / cardsPerView));
  skillGrid.style.transform = 'translateX(' + translateX + '%)';
}

// Certificate slider functionality - Responsive
let currentCertSlide = 0;

function getCardsPerView() {
  return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
}

function slideCerts(direction) {
  const certGrid = document.getElementById('certGrid');
  const certCards = document.querySelectorAll('.cert-card');
  const totalCards = certCards.length;
  const cardsPerView = getCardsPerView();
  
  currentCertSlide += direction;
  
  if (currentCertSlide < 0) {
    currentCertSlide = 0;
  } else if (currentCertSlide > totalCards - cardsPerView) {
    currentCertSlide = totalCards - cardsPerView;
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
    
    // Skills slider
    const skillPrevBtn = document.querySelector('.skill-prev');
    const skillNextBtn = document.querySelector('.skill-next');
    
    if (skillPrevBtn && skillNextBtn) {
      skillPrevBtn.onclick = function() { slideSkills(-1); };
      skillNextBtn.onclick = function() { slideSkills(1); };
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
    activeProjectGrid.style.transform = 'translateX(0%)';
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
