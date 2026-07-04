/**
 * Jack's Grill - Core Interactive Script
 * Crafted by Award-Winning Senior Frontend Developer
 * Premium interactions, canvas effects, smooth animations
 */

document.addEventListener('DOMContentLoaded', () => {
  bindDynamicData();
  initNavigation();
  initHeroParallax();
  initSmokeCanvas();
  initMenuFilter();
  initTestimonialSlider();
  initScrollReveal();
  initFloatingActions();
  initContactForm();
  initCartSystem();
  initSpecialsPopup();
});

/**
 * 1. NAVIGATION MODULE
 * Sticky navbar, hamburger menu, auto-close links
 */
function initNavigation() {
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section, .hero');

  // Sticky Navbar Toggle
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active link highlighting on scroll
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Hamburger Toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Auto-close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Smooth scroll adjustment
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';

      if (targetSection) {
        const offsetPosition = targetSection.offsetTop - 80; // offset header
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 2. HERO PARALLAX
 * Delicate movement of background images on scroll
 */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Slowly shift down, create subtle parallax depth
    heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.05)`;
  });
}

/**
 * 3. SMOKE CANVAS EFFECT
 * Sophisticated, high-performance smoke simulation on the Hero header
 */
function initSmokeCanvas() {
  const canvas = document.getElementById('hero-smoke-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 30; // Highly optimized for performance

  class SmokeParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      // Start slightly below the hero viewport
      this.y = height + Math.random() * 80;
      this.size = Math.random() * 100 + 80;
      this.speedY = -(Math.random() * 0.5 + 0.2); // Slower rise
      this.speedX = Math.random() * 0.4 - 0.2; // Subtle drift
      this.opacity = Math.random() * 0.35 + 0.1;
      this.maxLife = Math.random() * 500 + 300;
      this.life = this.maxLife;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.life--;

      // Slower growth
      this.size += 0.15;
      
      // Calculate smooth fade-in and fade-out
      if (this.life > this.maxLife * 0.8) {
        // Fade in
        const progress = (this.maxLife - this.life) / (this.maxLife * 0.2);
        this.opacity = progress * 0.25;
      } else {
        // Fade out
        const progress = this.life / (this.maxLife * 0.8);
        this.opacity = progress * 0.25;
      }

      if (this.life <= 0 || this.y < -this.size) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      
      // Warm golden/amber tinted smoke particles
      grad.addColorStop(0, `rgba(216, 162, 52, ${this.opacity * 0.08})`);
      grad.addColorStop(0.3, `rgba(30, 30, 30, ${this.opacity * 0.05})`);
      grad.addColorStop(1, 'rgba(11, 11, 11, 0)');
      
      ctx.fillStyle = grad;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate initial particles
  for (let i = 0; i < maxParticles; i++) {
    const p = new SmokeParticle();
    // Scatter the initial particle life cycle so they don't spawn synchronously
    p.life = Math.random() * p.maxLife;
    particles.push(p);
  }

  function animateSmoke() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateSmoke);
  }

  animateSmoke();
}

/**
 * 4. MENU SECTION FILTER
 * Elegant card filtering with entry animation states
 */
function initMenuFilter() {
  const filterButtons = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle button states
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          // Force reflow for CSS animations to re-trigger
          void card.offsetWidth;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          // Hide completely after transition completes
          setTimeout(() => {
            if (button.getAttribute('data-filter') !== 'all' && category !== filterValue) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

/**
 * 5. TESTIMONIAL SLIDER
 * Full interactive sliding carousel
 */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.querySelector('.slider-dots');
  const btnPrev = document.querySelector('.slider-nav.prev');
  const btnNext = document.querySelector('.slider-nav.next');
  
  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const slideCount = cards.length;

  // Generate Navigation Dots
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  // Button Listeners
  if (btnNext) btnNext.addEventListener('click', nextSlide);
  if (btnPrev) btnPrev.addEventListener('click', prevSlide);

  // Auto-play Slider (every 6 seconds)
  let autoPlayTimer = setInterval(nextSlide, 6000);

  // Reset autoPlay timer on interaction
  function resetTimer() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, 6000);
  }

  [btnPrev, btnNext, dotsContainer].forEach(element => {
    if (element) {
      element.addEventListener('click', resetTimer);
    }
  });
}

/**
 * 6. SCROLL REVEAL MODULE
 * Automatically reveals elements with subtle animations as they enter view
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  function revealElements() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 120; // threshold

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealElements);
  // Trigger once initially to show elements already in viewport
  revealElements();
}

/**
 * 7. FLOATING ACTIONS
 * Show / Hide Back To Top button based on viewport placement
 */
function initFloatingActions() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 8. CONTACT FORM HANDLER
 * Premium submission UX with real WhatsApp order link builder
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !message) {
      alert('Please fill in your name and message details.');
      return;
    }

    // Get dynamic WhatsApp number
    let waNum = "27682428640";
    const saved = localStorage.getItem('jacks_grill_live_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.business && data.business.whatsapp) {
          waNum = data.business.whatsapp.replace(/\D/g, '');
          // If local South African format without country code, add 27 prefix
          if (waNum.startsWith('0') && waNum.length === 10) {
            waNum = '27' + waNum.slice(1);
          }
        }
      } catch (err) {}
    }

    // Compose custom WhatsApp text based on form input
    const encodedText = encodeURIComponent(
      `Hi Jack's Grill, my name is ${name}. Phone: ${phone}. Message: ${message}`
    );
    const waLink = `https://wa.me/${waNum}?text=${encodedText}`;

    // Elegant animated feedback before launching chat
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.style.background = '#25D366';
    submitBtn.style.color = '#fff';
    submitBtn.innerHTML = 'Connecting to WhatsApp...';

    setTimeout(() => {
      // Open custom composed WhatsApp chat in new window
      window.open(waLink, '_blank');
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.style.background = '';
      submitBtn.style.color = '';
      submitBtn.innerHTML = originalContent;
      
      // Reset form
      form.reset();
    }, 1200);
  });
}

/**
 * 9. DYNAMIC DATA BINDING ENGINE
 * Seamlessly overrides static markup with admin customizations
 */
function bindDynamicData() {
  const saved = localStorage.getItem('jacks_grill_live_data');
  if (!saved) return;

  try {
    const data = JSON.parse(saved);

    // --- A. THEME OVERRIDES ---
    if (data.theme) {
      const t = data.theme;
      const rootStyle = document.documentElement.style;
      if (t.primaryColor) rootStyle.setProperty('--primary-gold', t.primaryColor);
      if (t.secondaryColor) rootStyle.setProperty('--accent-orange', t.secondaryColor);
      if (t.buttonColor) rootStyle.setProperty('--primary-gold', t.buttonColor);

      // Dynamically load font suite
      if (t.fontFamily) {
        const fontStyle = document.createElement('style');
        fontStyle.innerHTML = `
          @import url('https://fonts.googleapis.com/css2?family=${t.fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800&display=swap');
          :root {
            --font-sans: "${t.fontFamily}", sans-serif;
            --font-header: "${t.fontFamily}", sans-serif;
            --font-display: "${t.fontFamily}", serif;
          }
        `;
        document.head.appendChild(fontStyle);
      }

      // Favicon override
      if (t.faviconEmoji) {
        const favicons = document.querySelectorAll('link[rel="icon"]');
        favicons.forEach(favicon => {
          favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${t.faviconEmoji}</text></svg>`;
        });
      }

      // Brand Logo Mode and Content
      if (t.logoMode === 'image' && t.logoImage) {
        document.querySelectorAll('.logo-icon').forEach(el => {
          el.innerHTML = `<img src="${t.logoImage}" alt="Logo" referrerpolicy="no-referrer" onerror="this.src='assets/images/logo.jpg'">`;
          el.classList.add('has-image');
        });
      } else {
        document.querySelectorAll('.logo-icon').forEach(el => {
          el.textContent = t.logoLetter || "J";
          el.classList.remove('has-image');
        });
      }
      if (t.logoText) {
        document.querySelectorAll('.logo-text').forEach(el => {
          // Keep the admin panel's text custom if we're on admin.html
          if (el.innerHTML.includes('ADMIN')) {
            el.innerHTML = t.logoText.replace("GRILL", "ADMIN");
          } else {
            el.innerHTML = t.logoText;
          }
        });
      }
    }

    // --- B. BUSINESS SETTINGS OVERRIDES ---
    if (data.business) {
      const b = data.business;
      let waNumClean = b.whatsapp ? b.whatsapp.replace(/\D/g, '') : "27682428640";
      if (waNumClean.startsWith('0') && waNumClean.length === 10) {
        waNumClean = '27' + waNumClean.slice(1);
      }

      // Tagline
      if (b.tagline) {
        document.querySelectorAll('.logo-tagline').forEach(el => el.textContent = b.tagline);
      }

      // Hotlines (Address, hours and phone numbers)
      const callCard = document.getElementById('contact-call-card');
      if (callCard && b.phone) {
        callCard.href = `tel:${b.phone.replace(/\s+/g, '')}`;
        const pEl = callCard.querySelector('p');
        if (pEl) pEl.textContent = b.phone;
      }

      const waCard = document.getElementById('contact-whatsapp-card');
      if (waCard && b.whatsapp) {
        const orderTxt = encodeURIComponent("Hi Jack's Grill, I'd like to place an order.");
        waCard.href = `https://wa.me/${waNumClean}?text=${orderTxt}`;
        const pEl = waCard.querySelector('p');
        if (pEl) pEl.textContent = b.whatsapp;
      }

      const locContact = document.getElementById('location-contact-channels');
      if (locContact && b.phone) {
        const pEl = locContact.querySelector('.location-detail-text');
        if (pEl) pEl.innerHTML = `Call: ${b.phone}<br>WhatsApp: ${b.whatsapp || b.phone}`;
      }

      const floatWa = document.getElementById('float-whatsapp');
      if (floatWa && b.whatsapp) {
        const orderTxt = encodeURIComponent("Hi Jack's Grill, I'd like to place an order.");
        floatWa.href = `https://wa.me/${waNumClean}?text=${orderTxt}`;
      }

      const navBtnOrder = document.getElementById('nav-btn-order');
      if (navBtnOrder && b.whatsapp) {
        const orderTxt = encodeURIComponent("Hi Jack's Grill, I'd like to place an order.");
        navBtnOrder.href = `https://wa.me/${waNumClean}?text=${orderTxt}`;
      }

      const contactCallBtn = document.getElementById('contact-call-btn');
      if (contactCallBtn && b.phone) {
        contactCallBtn.href = `tel:${b.phone.replace(/\s+/g, '')}`;
      }

      // Uber Eats Link
      const uberCard = document.getElementById('contact-ubereats-card');
      if (uberCard && b.uberEats) {
        uberCard.outerHTML = `
          <a href="${b.uberEats}" target="_blank" class="contact-info-card reveal" id="contact-ubereats-card">
            <div class="contact-card-icon">
              <i data-lucide="truck" style="width: 24px; height: 24px;"></i>
            </div>
            <div class="contact-card-content">
              <h4>Uber Eats Online</h4>
              <p>Order direct to your doorstep</p>
            </div>
          </a>
        `;
      }

      // Address Location
      const locAddress = document.getElementById('location-address');
      if (locAddress && b.address) {
        const pEl = locAddress.querySelector('.location-detail-text');
        if (pEl) pEl.innerHTML = b.address.replace(/,/g, '<br>');
      }

      // Hours
      const locHours = document.getElementById('location-hours');
      if (locHours && b.hours) {
        const pEl = locHours.querySelector('.location-detail-text');
        if (pEl) pEl.innerHTML = b.hours.replace(/\n/g, '<br>');
      }

      const footerHoursCol = document.getElementById('footer-hours-col');
      if (footerHoursCol && b.hours) {
        const listEl = footerHoursCol.querySelector('.footer-hours-list');
        if (listEl) {
          listEl.innerHTML = b.hours.split('\n').map(line => {
            const parts = line.split(':');
            const day = parts[0] ? parts[0].trim() : '';
            const time = parts.slice(1).join(':') ? parts.slice(1).join(':').trim() : '';
            return `<li><span class="day">${day}</span> <span>${time}</span></li>`;
          }).join('');
        }
      }

      // Social Media Links
      const footerSocials = document.querySelector('.footer-socials');
      if (footerSocials) {
        const orderTxt = encodeURIComponent("Hi Jack's Grill, I'd like to place an order.");
        footerSocials.innerHTML = `
          <a href="https://wa.me/${waNumClean}?text=${orderTxt}" class="social-icon-btn" aria-label="WhatsApp" target="_blank" referrerpolicy="no-referrer">
            <i data-lucide="message-circle" style="width: 20px; height: 20px;"></i>
          </a>
          ${b.facebook ? `
          <a href="${b.facebook}" class="social-icon-btn" aria-label="Facebook" target="_blank" referrerpolicy="no-referrer">
            <i data-lucide="facebook" style="width: 20px; height: 20px;"></i>
          </a>` : ''}
          ${b.instagram ? `
          <a href="${b.instagram}" class="social-icon-btn" aria-label="Instagram" target="_blank" referrerpolicy="no-referrer">
            <i data-lucide="instagram" style="width: 20px; height: 20px;"></i>
          </a>` : ''}
          ${b.twitter ? `
          <a href="${b.twitter}" class="social-icon-btn" aria-label="Twitter" target="_blank" referrerpolicy="no-referrer">
            <i data-lucide="twitter" style="width: 20px; height: 20px;"></i>
          </a>` : ''}
        `;
      }
    }

    // --- C. HOMEPAGE CONTENT OVERRIDES ---
    if (data.homepage) {
      const h = data.homepage;
      
      const heroTitle = document.getElementById('hero-main-title');
      if (heroTitle && h.heroTitle) heroTitle.innerHTML = h.heroTitle;

      const heroSubtitle = document.getElementById('hero-sub-tagline');
      if (heroSubtitle && h.heroSubtitle) heroSubtitle.textContent = h.heroSubtitle;

      // About Us
      const aboutSec = document.getElementById('about');
      if (aboutSec) {
        const aTitle = aboutSec.querySelector('.section-title');
        const aTagline = aboutSec.querySelector('.about-tagline');
        const aPs = aboutSec.querySelectorAll('.about-p');
        const aBadgeNum = aboutSec.querySelector('.about-stats-num');
        const aBadgeLabel = aboutSec.querySelector('.about-stats-label');
        const aBadgeDesc = aboutSec.querySelector('.about-stats-desc');

        if (aTitle && h.aboutTitle) aTitle.innerHTML = h.aboutTitle;
        if (aTagline && h.aboutTagline) aTagline.textContent = h.aboutTagline;
        if (aPs[0] && h.aboutText1) aPs[0].textContent = h.aboutText1;
        if (aPs[1] && h.aboutText2) aPs[1].textContent = h.aboutText2;
        if (aBadgeNum && h.aboutStatsNum) aBadgeNum.textContent = h.aboutStatsNum;
        if (aBadgeLabel && h.aboutStatsLabel) aBadgeLabel.textContent = h.aboutStatsLabel;
        if (aBadgeDesc && h.aboutStatsDesc) aBadgeDesc.textContent = h.aboutStatsDesc;
      }

      // Gallery spots
      if (h.gallery && h.gallery.length === 6) {
        for (let i = 0; i < 6; i++) {
          const gSpot = document.getElementById(`gallery-item-${i + 1}`);
          if (gSpot) {
            const imgEl = gSpot.querySelector('.gallery-item-img');
            const catEl = gSpot.querySelector('.gallery-category');
            const titleEl = gSpot.querySelector('.gallery-title');

            if (imgEl && h.gallery[i].image) imgEl.src = h.gallery[i].image;
            if (catEl && h.gallery[i].category) catEl.textContent = h.gallery[i].category;
            if (titleEl && h.gallery[i].title) titleEl.textContent = h.gallery[i].title;
          }
        }
      }
    }

    // --- D. TESTIMONIALS SLIDER ---
    if (data.testimonials && data.testimonials.length > 0) {
      const track = document.getElementById('testimonial-track-container');
      if (track) {
        track.innerHTML = data.testimonials.map(item => `
          <div class="testimonial-card glassmorphism">
            <div class="testimonial-quote-icon">“</div>
            <div class="testimonial-stars">
              ${'<i data-lucide="star" style="fill: currentColor; width: 18px; height: 18px;"></i>'.repeat(item.stars)}
            </div>
            <p class="testimonial-text">"${item.text}"</p>
            <h4 class="testimonial-author">${item.author}</h4>
            <span class="testimonial-role">${item.role}</span>
          </div>
        `).join('');
      }
    }

    // --- E. LIVE MENU GRID BINDING ---
    if (data.menu && data.menu.length > 0) {
      const grid = document.querySelector('.menu-grid');
      if (grid) {
        let waNum = "27682428640";
        if (data.business && data.business.whatsapp) {
          waNum = data.business.whatsapp.replace(/\D/g, '');
          if (waNum.startsWith('0') && waNum.length === 10) {
            waNum = '27' + waNum.slice(1);
          }
        }

        grid.innerHTML = data.menu.map((item, idx) => {
          const textMsg = encodeURIComponent(`Hi Jack's Grill, I'd like to order the ${item.name}.`);
          const waLink = `https://wa.me/${waNum}?text=${textMsg}`;
          
          let badgeHTML = '';
          if (item.isSoldOut) {
            badgeHTML = '<span class="menu-badge text-red" style="background: rgba(239, 68, 68, 0.95); color: #fff; font-weight: 700;">SOLD OUT</span>';
          } else if (item.badge) {
            badgeHTML = `<span class="menu-badge">${item.badge}</span>`;
          } else if (item.isBestSeller) {
            badgeHTML = '<span class="menu-badge">Best Seller</span>';
          }

          return `
            <div class="menu-card reveal" data-category="${item.category}" id="menu-item-dyn-${idx}">
              <div class="menu-img-wrapper">
                <img src="${item.image || 'assets/images/beef_stew.jpg'}" alt="${item.name}" class="menu-img" referrerpolicy="no-referrer" onerror="this.src='assets/images/beef_stew.jpg'">
                ${badgeHTML}
              </div>
              <div class="menu-details">
                <div class="menu-meta">
                  <h3 class="menu-name">${item.name}</h3>
                  <span class="menu-price">${item.price}</span>
                </div>
                <p class="menu-description">${item.description}</p>
                <div class="menu-footer">
                  ${item.isSoldOut ? `
                  <button class="btn btn-secondary" style="width: 100%; opacity: 0.5; cursor: not-allowed;" disabled>
                    <i data-lucide="slash" style="width: 16px; height: 16px;"></i>
                    <span>Sold Out</span>
                  </button>
                  ` : `
                  <button class="btn btn-primary btn-add-to-cart" data-name="${item.name}" data-price="${item.price}" data-image="${item.image || ''}">
                    <i data-lucide="shopping-cart" style="width: 16px; height: 16px;"></i>
                    <span>Add to Cart</span>
                  </button>
                  `}
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Trigger Lucide icons rebuild for dynamically loaded DOM elements
    lucide.createIcons();
    
  } catch (err) {
    console.error("Jack's Grill Data Binding Error: ", err);
  }
}

/**
 * 11. PREMIUM CART SYSTEM
 * Provides client-side persistence, sliding cart drawer, real-time total calculator
 * and custom formatted prefilled WhatsApp order generator.
 */
let cart = [];

function initCartSystem() {
  // Load existing cart from localStorage
  const savedCart = localStorage.getItem('jacks_grill_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }

  // Render cart on load
  updateCartBadge();
  renderCartItems();

  // Convert static index.html menu links to "Add to Cart" buttons
  convertStaticMenuLinksToAddToCart();

  // Event listener for opening the cart drawer
  const floatCartBtn = document.getElementById('float-cart');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const cartCloseBtn = document.getElementById('cart-drawer-close');

  if (floatCartBtn) {
    floatCartBtn.addEventListener('click', () => {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
    });
  }

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', () => {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
    });
  }

  // Listen for delegated click events on Add to Cart buttons (both static and dynamic)
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-to-cart');
    if (btn) {
      e.preventDefault();
      const name = btn.dataset.name;
      const priceStr = btn.dataset.price || 'R0';
      const image = btn.dataset.image || '';
      
      // Parse numerical price (removes 'R' or spaces)
      const priceVal = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;

      // Add to cart array
      addToCart(name, priceVal, image);

      // Animation feedback on the button itself
      const originalHtml = btn.innerHTML;
      btn.style.backgroundColor = '#25D366';
      btn.style.borderColor = '#25D366';
      btn.style.color = '#fff';
      btn.innerHTML = `<i data-lucide="check" style="width: 16px; height: 16px;"></i><span>Added!</span>`;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.innerHTML = originalHtml;
        if (window.lucide) window.lucide.createIcons();
      }, 1000);
    }
  });

  // Listener for checkout button
  const checkoutBtn = document.getElementById('btn-checkout-whatsapp');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      checkoutCart();
    });
  }
}

// Automatically scan the page and convert all order links to "Add to Cart"
function convertStaticMenuLinksToAddToCart() {
  document.querySelectorAll('.menu-card').forEach(card => {
    const footer = card.querySelector('.menu-footer');
    if (!footer) return;
    
    // Check if it already has an add-to-cart button
    if (footer.querySelector('.btn-add-to-cart')) return;

    // Look for the default order link
    const oldLink = footer.querySelector('a[href*="wa.me"]');
    if (oldLink) {
      const name = card.querySelector('.menu-name').textContent.trim();
      const price = card.querySelector('.menu-price').textContent.trim();
      const imageEl = card.querySelector('.menu-img');
      const image = imageEl ? imageEl.getAttribute('src') : '';

      const newBtn = document.createElement('button');
      newBtn.className = 'btn btn-primary btn-add-to-cart';
      newBtn.innerHTML = `
        <i data-lucide="shopping-cart" style="width: 16px; height: 16px;"></i>
        <span>Add to Cart</span>
      `;
      newBtn.dataset.name = name;
      newBtn.dataset.price = price;
      newBtn.dataset.image = image;

      oldLink.parentNode.replaceChild(newBtn, oldLink);
    }
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function addToCart(name, price, image) {
  const existingIndex = cart.findIndex(item => item.name === name);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image || 'assets/images/beef_stew.jpg',
      quantity: 1
    });
  }
  
  saveCart();
  updateCartBadge();
  renderCartItems();

  // Highlight / Bounce the floating cart button to notify user
  const floatCartBtn = document.getElementById('float-cart');
  if (floatCartBtn) {
    floatCartBtn.style.transform = 'scale(1.25)';
    setTimeout(() => {
      floatCartBtn.style.transform = '';
    }, 300);
  }
}

function updateQuantity(name, change) {
  const index = cart.findIndex(item => item.name === name);
  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    updateCartBadge();
    renderCartItems();
  }
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function saveCart() {
  localStorage.setItem('jacks_grill_cart', JSON.stringify(cart));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartBadge() {
  const count = getCartCount();
  const badge = document.querySelector('.cart-count');
  const floatCart = document.getElementById('float-cart');
  
  if (badge) {
    badge.textContent = count;
  }
  
  // Show/Hide floating button based on items
  if (floatCart) {
    if (count > 0) {
      floatCart.style.display = 'flex';
    } else {
      floatCart.style.display = 'flex'; // Keep always visible so they can open/interact
    }
  }
}

function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <i data-lucide="shopping-cart" style="width: 48px; height: 48px; opacity: 0.3; margin-bottom: 1rem;"></i>
        <p>Your cart is empty</p>
        <span style="font-size: 0.85rem; color: rgba(255,255,255,0.5);">Browse our legendary menu and add some flame-grilled favorites!</span>
      </div>
    `;
    
    document.getElementById('cart-subtotal').textContent = 'R0.00';
    document.getElementById('cart-total').textContent = 'R0.00';
    
    const checkoutBtn = document.getElementById('btn-checkout-whatsapp');
    if (checkoutBtn) checkoutBtn.disabled = true;

    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item-card">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/images/beef_stew.jpg'">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-price">R${item.price.toFixed(2)}</span>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="updateQuantity('${item.name.replace(/'/g, "\\'")}', -1)">-</button>
          <span class="cart-qty-num">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="updateQuantity('${item.name.replace(/'/g, "\\'")}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')" title="Remove Item">
        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
      </button>
    </div>
  `).join('');

  // Calculate prices
  const subtotal = getCartTotal();
  const total = subtotal;
  
  document.getElementById('cart-subtotal').textContent = `R${subtotal.toFixed(2)}`;
  document.getElementById('cart-total').textContent = `R${total.toFixed(2)}`;

  const checkoutBtn = document.getElementById('btn-checkout-whatsapp');
  if (checkoutBtn) checkoutBtn.disabled = false;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Make helper functions globally accessible so inline onclick handlers work flawlessly!
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

function checkoutCart() {
  if (cart.length === 0) return;

  // Retrieve current dynamic WhatsApp number
  let waNum = "27682428640";
  const saved = localStorage.getItem('jacks_grill_live_data');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data.business && data.business.whatsapp) {
        waNum = data.business.whatsapp.replace(/\D/g, '');
        if (waNum.startsWith('0') && waNum.length === 10) {
          waNum = '27' + waNum.slice(1);
        }
      }
    } catch (err) {}
  }

  // Get customer details
  const nameInput = document.getElementById('cart-customer-name');
  const noteInput = document.getElementById('cart-customer-note');
  
  const customerName = nameInput ? nameInput.value.trim() : '';
  const customerNote = noteInput ? noteInput.value.trim() : '';

  // Compose a gorgeous WhatsApp Order message
  let message = `*🔥 NEW ORDER - JACK'S GRILL 🔥*\n`;
  if (customerName) {
    message += `👤 *Customer:* ${customerName}\n`;
  }
  message += `📅 *Date:* ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}\n`;
  message += `----------------------------------------\n\n`;

  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    message += `🛒 *${idx + 1}. ${item.name}*\n`;
    message += `   Qty: ${item.quantity} × R${item.price.toFixed(2)}\n`;
    message += `   Subtotal: *R${itemTotal.toFixed(2)}*\n\n`;
  });

  if (customerNote) {
    message += `----------------------------------------\n`;
    message += `📝 *Special Notes:* ${customerNote}\n`;
  }

  message += `----------------------------------------\n`;
  message += `💰 *TOTAL AMOUNT: R${getCartTotal().toFixed(2)}*\n`;
  message += `----------------------------------------\n`;
  message += `Please confirm my order and send payment options. Thank you!`;

  const encodedText = encodeURIComponent(message);
  const waLink = `https://wa.me/${waNum}?text=${encodedText}`;

  // Clear cart on successful order
  cart = [];
  saveCart();
  updateCartBadge();
  renderCartItems();

  // Close the cart drawer
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (cartDrawer) cartDrawer.classList.remove('active');
  if (cartOverlay) cartOverlay.classList.remove('active');

  // Reset input fields
  if (nameInput) nameInput.value = '';
  if (noteInput) noteInput.value = '';

  // Open WhatsApp link in new tab
  window.open(waLink, '_blank');
}

/**
 * 12. SPECIALS POPUP MODULE
 * Periodically triggers a beautiful popup presenting dynamic specials added by admin.
 */
function initSpecialsPopup() {
  // Check if there are specials
  let specials = [];
  const saved = localStorage.getItem('jacks_grill_live_data');
  if (saved) {
    try {
      const db = JSON.parse(saved);
      if (db.specials && db.specials.length > 0) {
        specials = db.specials;
      }
    } catch (e) {}
  }
  
  // Fallback to default special if none loaded
  if (specials.length === 0) {
    specials = [
      {
        id: "special-1",
        name: "Kasi Kota & Fries Special",
        price: "R40.00",
        catchy: "Get our legendary quarter loaded kota for R5 less today!",
        image: "assets/images/kasi_kota.jpg"
      }
    ];
  }

  // Create the Popup HTML element and inject it
  const popupContainer = document.createElement('div');
  popupContainer.id = 'specials-popup-container';
  popupContainer.innerHTML = `
    <button class="specials-popup-close" id="specials-popup-close" aria-label="Dismiss Special">
      <i data-lucide="x" style="width: 18px; height: 18px;"></i>
    </button>
    <div class="specials-popup-badge">🔥 TODAY'S HOT SPECIAL</div>
    <div class="specials-popup-body">
      <div class="specials-popup-img-wrapper">
        <img id="specials-popup-img" src="" alt="Promo item" onerror="this.src='assets/images/meat_platter.jpg'">
      </div>
      <div class="specials-popup-info">
        <h4 id="specials-popup-name">Loading...</h4>
        <div class="specials-popup-price-tag">
          <span class="specials-popup-price-lbl">Special Price:</span>
          <span id="specials-popup-price" class="text-gold">R0.00</span>
        </div>
        <p id="specials-popup-catchy" class="specials-popup-catchy">Catchy slogan line goes here!</p>
        <button class="btn btn-primary btn-add-to-cart" id="specials-popup-add-btn" data-name="" data-price="" data-image="">
          <i data-lucide="shopping-cart" style="width: 14px; height: 14px;"></i>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(popupContainer);
  if (window.lucide) window.lucide.createIcons();

  let currentSpecialIndex = 0;
  let popupTimeout = null;
  let nextTriggerTimeout = null;

  const closeBtn = document.getElementById('specials-popup-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      dismissPopup();
    });
  }

  function showPopup() {
    if (specials.length === 0) return;
    const special = specials[currentSpecialIndex];
    
    // Fill data
    const imgEl = document.getElementById('specials-popup-img');
    const nameEl = document.getElementById('specials-popup-name');
    const priceEl = document.getElementById('specials-popup-price');
    const catchyEl = document.getElementById('specials-popup-catchy');
    const addBtn = document.getElementById('specials-popup-add-btn');

    if (imgEl) imgEl.src = special.image || 'assets/images/meat_platter.jpg';
    if (nameEl) nameEl.textContent = special.name;
    if (priceEl) priceEl.textContent = special.price;
    if (catchyEl) catchyEl.textContent = special.catchy;
    
    if (addBtn) {
      addBtn.dataset.name = special.name;
      addBtn.dataset.price = special.price;
      addBtn.dataset.image = special.image || '';
      // Reset button if it was checked
      addBtn.style.backgroundColor = '';
      addBtn.style.borderColor = '';
      addBtn.style.color = '';
      addBtn.innerHTML = `<i data-lucide="shopping-cart" style="width: 14px; height: 14px;"></i><span>Add to Cart</span>`;
      if (window.lucide) window.lucide.createIcons();
    }

    // Slide in
    popupContainer.classList.add('active');

    // Auto dismiss after 7 seconds
    popupTimeout = setTimeout(() => {
      dismissPopup();
    }, 7000);

    // Increment index for next time
    currentSpecialIndex = (currentSpecialIndex + 1) % specials.length;
  }

  function dismissPopup() {
    popupContainer.classList.remove('active');
    if (popupTimeout) clearTimeout(popupTimeout);
    
    // Schedule next popup in 18 seconds
    scheduleNextPopup(18000);
  }

  function scheduleNextPopup(delay) {
    if (nextTriggerTimeout) clearTimeout(nextTriggerTimeout);
    nextTriggerTimeout = setTimeout(() => {
      showPopup();
    }, delay);
  }

  // First popup shows up 4 seconds after page load
  scheduleNextPopup(4000);
}
