// ===================================
// ZAKARIA MOJAHID - PORTFOLIO JS
// Dynamic Animations & Interactions
// ===================================

import './style.css';

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initSmoothScroll();
  initNavigation();
  initScrollAnimations();
  initParallax();
  initTypingEffect();
  initCounterAnimation();
  initTechBars();
  initMagneticButtons();
  initMobileMenu();
  initHeaderScroll();
  
  console.log('🚀 Portfolio Zakaria Mojahid initialized!');
});

// ===================================
// CUSTOM CURSOR
// ===================================
function initCustomCursor() {
  const cursor = document.querySelector('.cursor-follower');
  if (!cursor) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('visible');
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });
  
  // Smooth cursor following
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = cursorX - 15 + 'px';
    cursor.style.top = cursorY - 15 + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .tech-category');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        document.querySelector('.mobile-menu')?.classList.remove('active');
        document.querySelector('.hamburger')?.classList.remove('active');
      }
    });
  });
}

// ===================================
// NAVIGATION ACTIVE STATE
// ===================================
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li');
  
  function updateActiveNav() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(li => li.classList.remove('active'));
        document.querySelector(`nav a[href="#${sectionId}"]`)?.parentElement?.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Stagger child animations
        const children = entry.target.querySelectorAll('.stagger');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('visible');
        });
      }
    });
  }, observerOptions);
  
  // Observe elements
  const animatedElements = document.querySelectorAll(
    '.timeline-item, .project-card, .tech-category, .fade-in'
  );
  animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// PARALLAX EFFECT
// ===================================
function initParallax() {
  const bgText = document.querySelector('.hero-bg-text');
  const shapes = document.querySelectorAll('.shape');
  
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    
    if (bgText) {
      bgText.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.5;
      shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

// ===================================
// TYPING EFFECT
// ===================================
function initTypingEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;
  
  const text = typingText.textContent;
  typingText.textContent = '';
  typingText.style.borderRight = '2px solid var(--accent-primary)';
  
  let i = 0;
  function type() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    } else {
      // Blinking cursor after typing complete
      setInterval(() => {
        typingText.style.borderRightColor = 
          typingText.style.borderRightColor === 'transparent' 
            ? 'var(--accent-primary)' 
            : 'transparent';
      }, 500);
    }
  }
  
  // Start typing after a delay
  setTimeout(type, 500);
}

// ===================================
// COUNTER ANIMATION
// ===================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        function updateCounter() {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        }
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

// ===================================
// TECH SKILL BARS
// ===================================
function initTechBars() {
  const techItems = document.querySelectorAll('.tech-item[data-skill]');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skill = entry.target.getAttribute('data-skill');
        const progressBar = entry.target.querySelector('.tech-progress');
        
        if (progressBar) {
          setTimeout(() => {
            progressBar.style.width = skill + '%';
          }, 200);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  techItems.forEach(item => observer.observe(item));
}

// ===================================
// MAGNETIC BUTTONS
// ===================================
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// ===================================
// FORM HANDLING
// ===================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span:first-child').textContent;
    
    submitBtn.querySelector('span:first-child').textContent = 'ENVOI EN COURS...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      submitBtn.querySelector('span:first-child').textContent = 'MESSAGE ENVOYÉ ✓';
      submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      
      // Reset after 3 seconds
      setTimeout(() => {
        submitBtn.querySelector('span:first-child').textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// ===================================
// GLITCH EFFECT ON HOVER
// ===================================
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
  glitchText.addEventListener('mouseenter', () => {
    glitchText.style.animation = 'glitch 0.3s infinite';
  });
  
  glitchText.addEventListener('mouseleave', () => {
    glitchText.style.animation = 'glitch 3s infinite';
  });
}

// ===================================
// RANDOM GLITCH EFFECT
// ===================================
function randomGlitch() {
  const glitchText = document.querySelector('.glitch-text');
  if (!glitchText) return;
  
  setInterval(() => {
    if (Math.random() > 0.95) {
      glitchText.style.animation = 'glitch 0.1s infinite';
      setTimeout(() => {
        glitchText.style.animation = 'glitch 3s infinite';
      }, 200);
    }
  }, 100);
}
randomGlitch();

// ===================================
// EASTER EGG - KONAMI CODE
// ===================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  document.body.style.animation = 'rainbow 2s linear infinite';
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    document.body.style.animation = '';
    style.remove();
  }, 5000);
  
  console.log('🎮 Easter egg activated! You found the Konami code!');
}
