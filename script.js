// Data
const brands = ["Hero", "Honda", "Bajaj", "TVS", "Suzuki", "Yamaha", "Mahindra"];

const highlights = [
  {
    title: "2.5 Acre Factory",
    desc: "ABS molding, spray painting, packing under one roof.",
  },
  {
    title: "20+ Years Experience",
    desc: "Trusted aftermarket partner across India.",
  },
  {
    title: "Pan-India Logistics",
    desc: "Eicher trucks & pickups for reliable dispatch.",
  },
  {
    title: "Quality First",
    desc: "ISO-ready processes & rigorous QC checks.",
  },
];

const categories = [
  { name: "Visors", code: "V-Series", img: "visor.jpg" },
  { name: "Front Fenders", code: "FF-Series", img: "fender.jpg" },
  { name: "Side Panels", code: "SP-Series", img: "sidepanel.jpg" },
  // { name: "Tail Panels", code: "TP-Series", img: "tailpanel.jpg" },
  // { name: "Mudguards", code: "MG-Series", img: "mudguard.jpg" },
  // { name: "Other ABS Parts", code: "X-Series", img: "abs-parts.jpg" },
];

// Image Slider Configuration
let heroSliderInterval;
let exportsSliderInterval;
let currentHeroSlide = 0;
let currentExportsSlide = 0;

function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  const indicatorsContainer = document.getElementById('heroIndicators');

  if (!slider || !indicatorsContainer) return;

  // Clear old indicators
  indicatorsContainer.innerHTML = "";

  const slides = slider.querySelectorAll('.slider-slide');
  const totalSlides = slides.length;

  // Create indicators dynamically
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'slider-indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToHeroSlide(i));
    indicatorsContainer.appendChild(indicator);
  }

  // Clear old interval and reset state
  clearInterval(heroSliderInterval);
  currentHeroSlide = 0;
  updateHeroSlider();

  // Start auto-slide
  heroSliderInterval = setInterval(() => {
    currentHeroSlide = (currentHeroSlide + 1) % totalSlides;
    updateHeroSlider();
  }, 4000);
}

function goToHeroSlide(index) {
  currentHeroSlide = index;
  updateHeroSlider();
  
  // Reset interval
  clearInterval(heroSliderInterval);
  heroSliderInterval = setInterval(() => {
    currentHeroSlide = (currentHeroSlide + 1) % document.querySelectorAll('#heroSlider .slider-slide').length;
    updateHeroSlider();
  }, 4000);
}

function updateHeroSlider() {
  const slides = document.querySelectorAll('#heroSlider .slider-slide');
  const indicators = document.querySelectorAll('#heroIndicators .slider-indicator');
  
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentHeroSlide);
  });
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentHeroSlide);
  });
}

function initExportsSlider() {
  const slider = document.getElementById('exportsSlider');
  const indicatorsContainer = document.getElementById('exportsIndicators');

  if (!slider || !indicatorsContainer) return;

  // Clear old indicators
  indicatorsContainer.innerHTML = "";

  const slides = slider.querySelectorAll('.slider-slide');
  const totalSlides = slides.length;

  // Create indicators dynamically
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'slider-indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToExportsSlide(i));
    indicatorsContainer.appendChild(indicator);
  }

  // Clear old interval and reset state
  clearInterval(exportsSliderInterval);
  currentExportsSlide = 0;
  updateExportsSlider();

  // Start auto-slide
  exportsSliderInterval = setInterval(() => {
    currentExportsSlide = (currentExportsSlide + 1) % totalSlides;
    updateExportsSlider();
  }, 5000);
}

function goToExportsSlide(index) {
  currentExportsSlide = index;
  updateExportsSlider();
  
  // Reset interval
  clearInterval(exportsSliderInterval);
  exportsSliderInterval = setInterval(() => {
    currentExportsSlide = (currentExportsSlide + 1) % document.querySelectorAll('#exportsSlider .slider-slide').length;
    updateExportsSlider();
  }, 5000);
}

function updateExportsSlider() {
  const slides = document.querySelectorAll('#exportsSlider .slider-slide');
  const indicators = document.querySelectorAll('#exportsIndicators .slider-indicator');
  
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentExportsSlide);
  });
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentExportsSlide);
  });
}

// Render brands
function renderBrands() {
  const brandsList = document.getElementById('brandsList');
  if (brandsList) {
    brandsList.innerHTML = brands.map(brand => 
      `<span class="brand-badge">${brand}</span>`
    ).join('');
  }
}

// Render highlights with alternating animations
function renderHighlights() {
  const highlightsList = document.getElementById('highlightsList');
  if (highlightsList) {
    highlightsList.innerHTML = highlights.map((h, index) => `
      <div class="highlight-card" data-index="${index}">
        <div class="highlight-title">${h.title}</div>
        <p class="highlight-desc">${h.desc}</p>
      </div>
    `).join('');
    
    // Setup highlight animations
    setupHighlightAnimations();
  }
}

// Setup highlight card animations
function setupHighlightAnimations() {
  const highlightCards = document.querySelectorAll('.highlight-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = parseInt(card.dataset.index);
        
        // Alternate between right and left animations
        if (index % 2 === 0) {
          card.classList.add('animate-slide-right');
        } else {
          card.classList.add('animate-slide-left');
        }
        
        // Add staggered delay
        card.style.animationDelay = `${(index % 4) * 0.15}s`;
        
        observer.unobserve(card);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  highlightCards.forEach(card => {
    observer.observe(card);
  });
}

// Render products with real images
function renderProducts() {
  const productsList = document.getElementById('productsList');
  if (productsList) {
    productsList.innerHTML = categories.map((c, index) => `
      <div class="product-card" data-index="${index}">
        <div class="product-image">
          <img src="${c.img}" alt="${c.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="product-placeholder" style="display: none;">
            <span class="placeholder-text">${c.name}</span>
          </div>
        </div>
        <div class="product-content">
          <div class="product-header">
            <h3 class="product-name">${c.name}</h3>
            <span class="product-code">${c.code}</span>
          </div>
          <p class="product-desc">Compatible with Hero, Honda, Bajaj, TVS, Suzuki, Yamaha, etc.</p>
          <div class="product-buttons">
            <button class="product-btn-primary" onclick="openEnquiryForm('${c.name}', '${c.code}')">Enquire Now</button>
            <button class="product-btn-secondary" onclick="openEnquiryForm('${c.name}', '${c.code}')">View Details</button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Setup intersection observer for animations
    setupProductAnimations();
  }
}

// Setup product animations
function setupProductAnimations() {
  const productCards = document.querySelectorAll('.product-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = parseInt(card.dataset.index);
        
        // Alternate left and right animations
        if (index % 2 === 0) {
          card.classList.add('animate-in-left');
        } else {
          card.classList.add('animate-in-right');
        }
        
        // Add staggered delay
        card.style.animationDelay = `${(index % 3) * 0.1}s`;
        
        observer.unobserve(card);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  productCards.forEach(card => {
    observer.observe(card);
  });
}

// Open enquiry form with product details
function openEnquiryForm(productName, productCode) {
  const productInput = document.getElementById('productInput');
  const productGroup = document.getElementById('productSelectionGroup');
  const contactSection = document.getElementById('contact');
  
  if (productInput && productGroup) {
    productInput.value = `${productName} (${productCode})`;
    productGroup.style.display = 'block';
  }
  
  // Smooth scroll to contact form
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Add a highlight effect to the form
    setTimeout(() => {
      const form = document.getElementById('enquiryForm');
      if (form) {
        form.style.transition = 'all 0.3s ease';
        form.style.transform = 'scale(1.02)';
        setTimeout(() => {
          form.style.transform = 'scale(1)';
        }, 300);
      }
    }, 500);
  }
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#home') {
        if (href === '#home') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Form submission handler
function setupFormHandler() {
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: form.elements['name'].value,
        phone: form.elements['phone'].value,
        email: form.elements['email'].value,
        product: form.elements['product'] ? form.elements['product'].value : '',
        requirements: form.elements['requirements'].value
      };
      
      // Basic validation
      if (!formData.name || !formData.phone || !formData.email || !formData.requirements) {
        alert('Please fill in all required fields marked with *');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Phone validation (basic)
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid phone number');
        return;
      }
      
      // Show success message
      alert(`Thank you for your enquiry, ${formData.name}!\n\nOur team will contact you within 1 business day.\n\n${formData.product ? 'Product: ' + formData.product : ''}`);
      
      // In production, this would send data to server
      console.log('Form submitted:', formData);
      
      // Reset form
      form.reset();
      
      // Hide product selection if it was shown
      const productGroup = document.getElementById('productSelectionGroup');
      if (productGroup) {
        productGroup.style.display = 'none';
      }
      
      // Show success feedback
      const submitBtn = form.querySelector('.btn-submit');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Enquiry Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }
}

// Active navigation highlighting
function setupActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function highlightNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Initial call
}

// Add scroll-triggered animations for other sections
function setupScrollAnimations() {
  const animateElements = document.querySelectorAll('.quality-card, .about-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          entry.target.style.transition = 'all 0.6s ease';
          
          requestAnimationFrame(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          });
        }, index * 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

// Header scroll effect
function setupHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
  });
}

// Pause sliders when tab is not visible
function setupVisibilityChange() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(heroSliderInterval);
      clearInterval(exportsSliderInterval);
    } else {
      // Restart sliders when tab becomes visible
      initHeroSlider();
      initExportsSlider();
    }
  });
}

// Preload images
function preloadImages() {
  const imageUrls = [
    'home.jpeg',
    'visor.jpg',
    'fender.jpg',
    'sidepanel.jpg',
    'tailpanel.jpg',
    'mudguard.jpg',
    'abs-parts.jpg',
    'logistics.jpg',
    'truck-delivery.jpg',
    'dealer-network.jpg'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Render content
  renderBrands();
  renderHighlights();
  renderProducts();
  setCurrentYear();
  
  // Setup interactions
  setupSmoothScroll();
  setupFormHandler();
  setupActiveNav();
  setupHeaderScroll();
  
  // Initialize sliders
  initHeroSlider();
  initExportsSlider();
  
  // Setup animations
  setupScrollAnimations();
  
  // Setup visibility change handler
  setupVisibilityChange();
  
  // Preload images
  preloadImages();
  
  // Add loading complete class for any CSS transitions
  document.body.classList.add('loaded');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-initialize animations if needed
    setupProductAnimations();
    setupHighlightAnimations();
  }, 250);
});

// Keyboard navigation for sliders
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    const currentSection = getCurrentSection();
    if (currentSection === 'home') {
      const totalSlides = document.querySelectorAll('#heroSlider .slider-slide').length;
      currentHeroSlide = (currentHeroSlide - 1 + totalSlides) % totalSlides;
      goToHeroSlide(currentHeroSlide);
    } else if (currentSection === 'exports') {
      const totalSlides = document.querySelectorAll('#exportsSlider .slider-slide').length;
      currentExportsSlide = (currentExportsSlide - 1 + totalSlides) % totalSlides;
      goToExportsSlide(currentExportsSlide);
    }
  } else if (e.key === 'ArrowRight') {
    const currentSection = getCurrentSection();
    if (currentSection === 'home') {
      const totalSlides = document.querySelectorAll('#heroSlider .slider-slide').length;
      currentHeroSlide = (currentHeroSlide + 1) % totalSlides;
      goToHeroSlide(currentHeroSlide);
    } else if (currentSection === 'exports') {
      const totalSlides = document.querySelectorAll('#exportsSlider .slider-slide').length;
      currentExportsSlide = (currentExportsSlide + 1) % totalSlides;
      goToExportsSlide(currentExportsSlide);
    }
  }
});

// Get current visible section
function getCurrentSection() {
  const heroSection = document.querySelector('.hero');
  const exportsSection = document.getElementById('exports');
  
  if (!heroSection || !exportsSection) return null;
  
  const heroRect = heroSection.getBoundingClientRect();
  const exportsRect = exportsSection.getBoundingClientRect();
  
  if (heroRect.top <= 300 && heroRect.bottom >= 300) {
    return 'home';
  } else if (exportsRect.top <= 300 && exportsRect.bottom >= 300) {
    return 'exports';
  }
  
  return null;
}

// Add touch swipe support for sliders on mobile
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe(elementId, nextFunc, prevFunc) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  element.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture(nextFunc, prevFunc);
  });
}

function handleSwipeGesture(nextFunc, prevFunc) {
  if (touchEndX < touchStartX - 50) {
    // Swipe left - next slide
    nextFunc();
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right - previous slide
    prevFunc();
  }
}

// Setup swipe handlers after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  handleSwipe('heroSlider', 
    () => {
      const totalSlides = document.querySelectorAll('#heroSlider .slider-slide').length;
      currentHeroSlide = (currentHeroSlide + 1) % totalSlides;
      goToHeroSlide(currentHeroSlide);
    },
    () => {
      const totalSlides = document.querySelectorAll('#heroSlider .slider-slide').length;
      currentHeroSlide = (currentHeroSlide - 1 + totalSlides) % totalSlides;
      goToHeroSlide(currentHeroSlide);
    }
  );
  
  handleSwipe('exportsSlider',
    () => {
      const totalSlides = document.querySelectorAll('#exportsSlider .slider-slide').length;
      currentExportsSlide = (currentExportsSlide + 1) % totalSlides;
      goToExportsSlide(currentExportsSlide);
    },
    () => {
      const totalSlides = document.querySelectorAll('#exportsSlider .slider-slide').length;
      currentExportsSlide = (currentExportsSlide - 1 + totalSlides) % totalSlides;
      goToExportsSlide(currentExportsSlide);
    }
  );
});



//form section

(function() {
    emailjs.init("tb9s9bW7SNIJ21FiU"); // replace with your real public key
})();

document.getElementById("enquiryForm").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_5p8w6jk", "template_ssyt07h", this)
        .then(function() {
            alert("✅ Enquiry sent successfully! We'll contact you soon.");
        }, function(error) {
            alert("❌ Failed to send message. Please try again later.");
            console.error(error);
        });
});
