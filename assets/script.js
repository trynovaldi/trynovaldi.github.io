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

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    } else {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(30px)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".skill-item, .project-card, .cert-card, .about-desc, .about h2, .skills h2, .projects h2, .certifications h2, .category-tabs"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(el);
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

// Certificate slider functionality
let currentCertSlide = 0;
const cardsPerView = 3;

function slideCerts(direction) {
  const certCards = document.querySelectorAll(".cert-card");
  const totalCertCards = certCards.length;
  const maxSlide = Math.ceil(totalCertCards / cardsPerView) - 1;

  currentCertSlide += direction;

  if (currentCertSlide < 0) {
    currentCertSlide = maxSlide;
  } else if (currentCertSlide > maxSlide) {
    currentCertSlide = 0;
  }

  const translateX = -(currentCertSlide * (100 / cardsPerView));
  document.getElementById(
    "certGrid"
  ).style.transform = `translateX(${translateX}%)`;
}
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
