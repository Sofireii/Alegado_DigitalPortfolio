// Sidebar toggle drawer functionality
const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector("#btn");

// Toggle sidebar on button click
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

// Smooth scroll + active link handling for sections
const navLinks = Array.from(document.querySelectorAll(".sidebar .nav-list a"));
const targets = navLinks
  .map(a => a.getAttribute("href"))
  .filter(href => href && href.startsWith("#"))
  .map(href => document.querySelector(href))
  .filter(Boolean);

// Ensure a little top padding when scrolling to a section
targets.forEach(sec => sec.style.scrollMarginTop = "40px");

// Click -> smooth scroll
navLinks.forEach(link => {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  const target = document.querySelector(href);
  if (!target) return;

  link.addEventListener("click", (e) => {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Observe sections to update active link
const linkById = new Map(
  navLinks
    .filter(a => a.getAttribute("href") && a.getAttribute("href").startsWith("#"))
    .map(a => [a.getAttribute("href").slice(1), a])
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = linkById.get(id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, {
  root: null,
  threshold: 0.45
});

targets.forEach(sec => observer.observe(sec));

// ====== FADE-IN ON SCROLL ANIMATION ======
// Add CSS for fade-in animation FIRST
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
  .fade-in-element {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .fade-in-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(fadeInStyle);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup observer
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  });

  // Add fade-in to sections that exist
  setTimeout(() => {
    const sectionsToAnimate = document.querySelectorAll('#story, #dates, #political, #economic, #culture, #religion, #issues, #pricing, #contact');
    sectionsToAnimate.forEach(section => {
      if (section) {
        section.classList.add('fade-in-element');
        fadeInObserver.observe(section);
      }
    });
  }, 100);
});

// ====== ENHANCED CAROUSEL TRANSITIONS ======
const carouselStyle = document.createElement('style');
carouselStyle.textContent = `
  /* Slide animations */
  .history-slide, .social-slide, .political-slide, .economic-slide, 
  .culture-slide, .religion-slide, .issues-slide {
    display: none;
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .history-slide.active-slide, .social-slide.active-social-slide, 
  .political-slide.active-political-slide, .economic-slide.active-economic-slide,
  .culture-slide.active-culture-slide, .religion-slide.active-religion-slide,
  .issues-slide.active-issues-slide {
    display: block;
    opacity: 1;
    transform: translateX(0);
    animation: slideIn 0.6s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Reverse animation for previous button */
  .slide-reverse {
    animation: slideInReverse 0.6s ease-out !important;
  }
  
  @keyframes slideInReverse {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Button hover effects */
  #prevBtn:hover, #nextBtn:hover,
  #prevSocialBtn:hover, #nextSocialBtn:hover,
  #prevPoliticalBtn:hover, #nextPoliticalBtn:hover,
  #prevEconomicBtn:hover, #nextEconomicBtn:hover,
  #prevCultureBtn:hover, #nextCultureBtn:hover,
  #prevReligionBtn:hover, #nextReligionBtn:hover,
  #prevIssuesBtn:hover, #nextIssuesBtn:hover {
    background: #e55a2b !important;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(229, 90, 43, 0.4);
  }
  
  #prevBtn:disabled, #nextBtn:disabled,
  #prevSocialBtn:disabled, #nextSocialBtn:disabled,
  #prevPoliticalBtn:disabled, #nextPoliticalBtn:disabled,
  #prevEconomicBtn:disabled, #nextEconomicBtn:disabled,
  #prevCultureBtn:disabled, #nextCultureBtn:disabled,
  #prevReligionBtn:disabled, #nextReligionBtn:disabled,
  #prevIssuesBtn:disabled, #nextIssuesBtn:disabled {
    background: #ccc !important;
    cursor: not-allowed;
    opacity: 0.6;
    transform: scale(1);
  }
  
  /* Culture image transitions */
  .culture-image {
    display: none;
    opacity: 0;
    transition: opacity 0.6s ease-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  
  .culture-image.active-culture-image {
    display: block;
    opacity: 1;
    position: relative;
    animation: fadeIn 0.6s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(carouselStyle);

// History Carousel with enhanced animations
let currentSlide = 1;
const totalSlides = 15;
const slides = document.querySelectorAll('.history-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIndicator = document.getElementById('slideIndicator');

function showSlide(n, direction = 'next') {
  if (n > totalSlides) currentSlide = totalSlides;
  if (n < 1) currentSlide = 1;
  
  slides.forEach(slide => {
    slide.classList.remove('active-slide', 'slide-reverse');
  });
  
  const activeSlide = slides[currentSlide - 1];
  activeSlide.classList.add('active-slide');
  if (direction === 'prev') {
    activeSlide.classList.add('slide-reverse');
  }
  
  slideIndicator.textContent = `${currentSlide} / ${totalSlides}`;
  prevBtn.disabled = (currentSlide === 1);
  nextBtn.disabled = (currentSlide === totalSlides);
}

prevBtn.addEventListener('click', () => {
  currentSlide--;
  showSlide(currentSlide, 'prev');
});

nextBtn.addEventListener('click', () => {
  currentSlide++;
  showSlide(currentSlide, 'next');
});

showSlide(currentSlide);

// Social Carousel
let currentSocialSlide = 1;
const totalSocialSlides = 7;
const socialSlides = document.querySelectorAll('.social-slide');
const prevSocialBtn = document.getElementById('prevSocialBtn');
const nextSocialBtn = document.getElementById('nextSocialBtn');
const socialSlideIndicator = document.getElementById('socialSlideIndicator');

function showSocialSlide(n, direction = 'next') {
  if (n > totalSocialSlides) currentSocialSlide = totalSocialSlides;
  if (n < 1) currentSocialSlide = 1;
  
  socialSlides.forEach(slide => {
    slide.classList.remove('active-social-slide', 'slide-reverse');
  });
  
  const activeSlide = socialSlides[currentSocialSlide - 1];
  activeSlide.classList.add('active-social-slide');
  if (direction === 'prev') {
    activeSlide.classList.add('slide-reverse');
  }
  
  socialSlideIndicator.textContent = `${currentSocialSlide} / ${totalSocialSlides}`;
  prevSocialBtn.disabled = (currentSocialSlide === 1);
  nextSocialBtn.disabled = (currentSocialSlide === totalSocialSlides);
}

prevSocialBtn.addEventListener('click', () => {
  currentSocialSlide--;
  showSocialSlide(currentSocialSlide, 'prev');
});

nextSocialBtn.addEventListener('click', () => {
  currentSocialSlide++;
  showSocialSlide(currentSocialSlide, 'next');
});

showSocialSlide(currentSocialSlide);

// Political Carousel
let currentPoliticalSlide = 1;
const totalPoliticalSlides = 5;
const politicalSlides = document.querySelectorAll('.political-slide');
const prevPoliticalBtn = document.getElementById('prevPoliticalBtn');
const nextPoliticalBtn = document.getElementById('nextPoliticalBtn');
const politicalSlideIndicator = document.getElementById('politicalSlideIndicator');

function showPoliticalSlide(n, direction = 'next') {
  if (n > totalPoliticalSlides) currentPoliticalSlide = totalPoliticalSlides;
  if (n < 1) currentPoliticalSlide = 1;
  
  politicalSlides.forEach(slide => {
    slide.classList.remove('active-political-slide', 'slide-reverse');
  });
  
  const activeSlide = politicalSlides[currentPoliticalSlide - 1];
  activeSlide.classList.add('active-political-slide');
  if (direction === 'prev') {
    activeSlide.classList.add('slide-reverse');
  }
  
  politicalSlideIndicator.textContent = `${currentPoliticalSlide} / ${totalPoliticalSlides}`;
  prevPoliticalBtn.disabled = (currentPoliticalSlide === 1);
  nextPoliticalBtn.disabled = (currentPoliticalSlide === totalPoliticalSlides);
}

prevPoliticalBtn.addEventListener('click', () => {
  currentPoliticalSlide--;
  showPoliticalSlide(currentPoliticalSlide, 'prev');
});

nextPoliticalBtn.addEventListener('click', () => {
  currentPoliticalSlide++;
  showPoliticalSlide(currentPoliticalSlide, 'next');
});

showPoliticalSlide(currentPoliticalSlide);

// Economic Carousel
let currentEconomicSlide = 1;
const totalEconomicSlides = 4;
const economicSlides = document.querySelectorAll('.economic-slide');
const prevEconomicBtn = document.getElementById('prevEconomicBtn');
const nextEconomicBtn = document.getElementById('nextEconomicBtn');
const economicSlideIndicator = document.getElementById('economicSlideIndicator');

function showEconomicSlide(n, direction = 'next') {
  if (n > totalEconomicSlides) currentEconomicSlide = totalEconomicSlides;
  if (n < 1) currentEconomicSlide = 1;
  
  economicSlides.forEach(slide => {
    slide.classList.remove('active-economic-slide', 'slide-reverse');
  });
  
  const activeSlide = economicSlides[currentEconomicSlide - 1];
  activeSlide.classList.add('active-economic-slide');
  if (direction === 'prev') {
    activeSlide.classList.add('slide-reverse');
  }
  
  economicSlideIndicator.textContent = `${currentEconomicSlide} / ${totalEconomicSlides}`;
  prevEconomicBtn.disabled = (currentEconomicSlide === 1);
  nextEconomicBtn.disabled = (currentEconomicSlide === totalEconomicSlides);
}

prevEconomicBtn.addEventListener('click', () => {
  currentEconomicSlide--;
  showEconomicSlide(currentEconomicSlide, 'prev');
});

nextEconomicBtn.addEventListener('click', () => {
  currentEconomicSlide++;
  showEconomicSlide(currentEconomicSlide, 'next');
});

showEconomicSlide(currentEconomicSlide);

// Culture Carousel
let currentCultureSlide = 1;
const totalCultureSlides = 8;
const cultureSlides = document.querySelectorAll('.culture-slide');
const cultureImages = document.querySelectorAll('.culture-image');
const prevCultureBtn = document.getElementById('prevCultureBtn');
const nextCultureBtn = document.getElementById('nextCultureBtn');
const cultureSlideIndicator = document.getElementById('cultureSlideIndicator');

function showCultureSlide(n, direction = 'next') {
  if (n > totalCultureSlides) currentCultureSlide = totalCultureSlides;
  if (n < 1) currentCultureSlide = 1;
  
  cultureSlides.forEach(slide => {
    slide.classList.remove('active-culture-slide', 'slide-reverse');
  });
  
  const activeSlide = cultureSlides[currentCultureSlide - 1];
  activeSlide.classList.add('active-culture-slide');
  if (direction === 'prev') {
    activeSlide.classList.add('slide-reverse');
  }
  
  cultureImages.forEach(img => img.classList.remove('active-culture-image'));
  cultureImages[currentCultureSlide - 1].classList.add('active-culture-image');
  
  cultureSlideIndicator.textContent = `${currentCultureSlide} / ${totalCultureSlides}`;
  prevCultureBtn.disabled = (currentCultureSlide === 1);
  nextCultureBtn.disabled = (currentCultureSlide === totalCultureSlides);
}

prevCultureBtn.addEventListener('click', () => {
  currentCultureSlide--;
  showCultureSlide(currentCultureSlide, 'prev');
});

nextCultureBtn.addEventListener('click', () => {
  currentCultureSlide++;
  showCultureSlide(currentCultureSlide, 'next');
});

showCultureSlide(currentCultureSlide);

// Religion Carousel
let currentReligionSlide = 1;
const totalReligionSlides = 14;
const religionSlides = document.querySelectorAll('.religion-slide');
const prevReligionBtn = document.getElementById('prevReligionBtn');
const nextReligionBtn = document.getElementById('nextReligionBtn');
const religionSlideIndicator = document.getElementById('religionSlideIndicator');

function showReligionSlide(n, direction = 'next') {
  if (n > totalReligionSlides) currentReligionSlide = totalReligionSlides;
  if (n < 1) currentReligionSlide = 1;
  
  religionSlides.forEach(slide => {
    slide.classList.remove('active-religion-slide', 'slide-reverse');
  });
  
  const activeSlide = religionSlides[currentReligionSlide - 1];
  activeSlide.classList.add('active-religion-slide');
  if (direction === 'prev') {
    activeSlide.classList.add('slide-reverse');
  }
  
  religionSlideIndicator.textContent = `${currentReligionSlide} / ${totalReligionSlides}`;
  prevReligionBtn.disabled = (currentReligionSlide === 1);
  nextReligionBtn.disabled = (currentReligionSlide === totalReligionSlides);
}

prevReligionBtn.addEventListener('click', () => {
  currentReligionSlide--;
  showReligionSlide(currentReligionSlide, 'prev');
});

nextReligionBtn.addEventListener('click', () => {
  currentReligionSlide++;
  showReligionSlide(currentReligionSlide, 'next');
});

showReligionSlide(currentReligionSlide);

// Issues Carousel
let currentIssuesSlide = 1;
const totalIssuesSlides = 6;
const issuesSlides = document.querySelectorAll('.issues-slide');
const prevIssuesBtn = document.getElementById('prevIssuesBtn');
const nextIssuesBtn = document.getElementById('nextIssuesBtn');
const issuesSlideIndicator = document.getElementById('issuesSlideIndicator');

function showIssuesSlide(n, direction = 'next') {
  if (n > totalIssuesSlides) currentIssuesSlide = totalIssuesSlides;
  if (n < 1) currentIssuesSlide = 1;
  
  issuesSlides.forEach(slide => {
    slide.classList.remove('active-issues-slide', 'slide-reverse');
  });
  
  const activeSlide = issuesSlides[currentIssuesSlide - 1];
  activeSlide.classList.add('active-issues-slide');
  if (direction === 'prev') {
    activeSlide.classList.add('slide-reverse');
  }
  
  issuesSlideIndicator.textContent = `${currentIssuesSlide} / ${totalIssuesSlides}`;
  prevIssuesBtn.disabled = (currentIssuesSlide === 1);
  nextIssuesBtn.disabled = (currentIssuesSlide === totalIssuesSlides);
}

prevIssuesBtn.addEventListener('click', () => {
  currentIssuesSlide--;
  showIssuesSlide(currentIssuesSlide, 'prev');
});

nextIssuesBtn.addEventListener('click', () => {
  currentIssuesSlide++;
  showIssuesSlide(currentIssuesSlide, 'next');
});

showIssuesSlide(currentIssuesSlide);