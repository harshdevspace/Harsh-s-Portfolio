/**
 * ==============================================================================
 * PORTFOLIO JAVASCRIPT - HARSH MISHRA
 * Clean, modular, and easy to explain vanilla JavaScript.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------------------------
  // 1. INITIALIZE LUCIDE ICONS
  // ----------------------------------------------------------------------------
  // Lucide is a lightweight open-source icon library.
  // We call createIcons() on page load to replace <i> tags with SVG icons.
  function initIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
  initIcons();

  // ----------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU TOGGLE
  // ----------------------------------------------------------------------------
  // Handles opening and closing the mobile navigation drawer.
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    // Toggle menu state on hamburger icon click
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        const isOpen = navLinks.classList.contains('active');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        initIcons();
      }
    });

    // Close the menu when any navigation link is clicked
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            initIcons();
          }
        }
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 3. NAVBAR STICKY SCROLL EFFECT
  // ----------------------------------------------------------------------------
  // Adds a background blur and shadow to the navbar once the user scrolls down.
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 4. HERO SECTION TYPING ANIMATION
  // ----------------------------------------------------------------------------
  // Dynamically types and erases developer titles in a loop.
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Software Developer',
    'Full Stack Developer',
    'B.Tech CSE Student @ SRMCEM',
    'Java & DSA Problem Solver'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Erase character
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45; // Faster deletion
    } else {
      // Type character
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // Word completed -> Pause and then delete
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } 
    // Word deleted -> Switch to next word
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeRole, typingSpeed);
  }

  if (typingElement) {
    typeRole();
  }

  // ----------------------------------------------------------------------------
  // 5. INTERACTIVE MONOCHROME PARTICLE CANVAS
  // ----------------------------------------------------------------------------
  // Renders a lightweight, high-performance particle network on HTML5 canvas.
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const maxParticles = 55;

    // Track mouse coordinates for subtle interactive repulsion
    const mouse = {
      x: null,
      y: null,
      radius: 100
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Resize canvas dynamically to match the viewport
    function setCanvasDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }
    window.addEventListener('resize', setCanvasDimensions);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle Object Model
    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Bounce on screen edges
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Subtle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const distX = mouse.x - this.x;
          const distY = mouse.y - this.y;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          if (distance < mouse.radius) {
            this.x -= (distX / distance) * 1.2;
            this.y -= (distY / distance) * 1.2;
          }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    // Populate particle pool with subtle white & grey particles
    function createParticles() {
      particlesArray = [];
      const count = Math.min(maxParticles, Math.floor((canvas.width * canvas.height) / 25000));

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.8 + 0.8;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const dx = (Math.random() - 0.5) * 0.4;
        const dy = (Math.random() - 0.5) * 0.4;
        const color = i % 2 === 0 ? 'rgba(255, 255, 255, 0.22)' : 'rgba(161, 161, 170, 0.2)';

        particlesArray.push(new Particle(x, y, dx, dy, size, color));
      }
    }

    // Connect nearby particles with subtle monochrome lines
    function connectParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = dx * dx + dy * dy;
          const maxDistance = 14000;

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.06})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation Loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();
  }

  // ----------------------------------------------------------------------------
  // 6. SCROLL-SPY ACTIVE NAV LINK HIGHLIGHTING
  // ----------------------------------------------------------------------------
  // Uses IntersectionObserver to automatically update active navbar link as user scrolls.
  const sections = document.querySelectorAll('section');
  const navLinkElements = document.querySelectorAll('.nav-links a');

  if (sections.length > 0 && navLinkElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // ----------------------------------------------------------------------------
  // 7. CONTACT FORM SUBMISSION
  // ----------------------------------------------------------------------------
  // Handles form submission, simulates network request, and displays success state.
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnHtml = submitBtn.innerHTML;

      // Show loading indicator
      submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="spin"></i>';
      submitBtn.disabled = true;
      initIcons();

      // Simulate sending data (1.2s delay)
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'none';
        formSuccess.style.display = 'flex';
        initIcons();

        // Restore form after 7 seconds
        setTimeout(() => {
          formSuccess.style.display = 'none';
          contactForm.style.display = 'flex';
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;
          initIcons();
        }, 7000);
      }, 1200);
    });
  }

});
