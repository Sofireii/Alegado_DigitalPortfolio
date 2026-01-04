// Sidebar toggle script
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector("#btn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

// Sidebar transparency toggle on scroll
const heroSection = document.querySelector('#hero');

function updateSidebarVisibility() {
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const scrollPosition = window.scrollY;
  
  // Hide sidebar only when in hero section, show everywhere else
  if (scrollPosition < heroBottom - 100) {
    sidebar.classList.add('transparent');
    sidebar.classList.remove('visible');
  } else {
    sidebar.classList.remove('transparent');
    sidebar.classList.add('visible');
  }
}

// Start with transparent sidebar
sidebar.classList.add('transparent');

// Observe scroll position
window.addEventListener('scroll', updateSidebarVisibility);

// Also check on load
window.addEventListener('load', updateSidebarVisibility);

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
  threshold: 0.45  // ~45% of section visible
});

targets.forEach(sec => observer.observe(sec));

// History Carousel Functionality
let currentSlide = 1;
const totalSlides = 6;
const slides = document.querySelectorAll('.history-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIndicator = document.getElementById('slideIndicator');

// CSS for slides
const style = document.createElement('style');
style.textContent = `
  .history-slide {
    display: none;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  .history-slide.active-slide {
    display: block;
    opacity: 1;
  }
  #prevBtn:hover, #nextBtn:hover {
    background: #e55a2b !important;
    transform: scale(1.05);
  }
  #prevBtn:disabled, #nextBtn:disabled {
    background: #ccc !important;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
document.head.appendChild(style);

function showSlide(n) {
  if (n > totalSlides) currentSlide = totalSlides;
  if (n < 1) currentSlide = 1;
  
  slides.forEach(slide => slide.classList.remove('active-slide'));
  slides[currentSlide - 1].classList.add('active-slide');
  
  slideIndicator.textContent = `${currentSlide} / ${totalSlides}`;
  
  prevBtn.disabled = (currentSlide === 1);
  nextBtn.disabled = (currentSlide === totalSlides);
}

prevBtn.addEventListener('click', () => {
  currentSlide--;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide++;
  showSlide(currentSlide);
});

// Initialize
showSlide(currentSlide);

// Social Carousel Functionality
let currentSocialSlide = 1;
const totalSocialSlides = 5;
const socialSlides = document.querySelectorAll('.social-slide');
const prevSocialBtn = document.getElementById('prevSocialBtn');
const nextSocialBtn = document.getElementById('nextSocialBtn');
const socialSlideIndicator = document.getElementById('socialSlideIndicator');

// CSS for social slides
const socialStyle = document.createElement('style');
socialStyle.textContent = `
  .social-slide {
    display: none;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  .social-slide.active-social-slide {
    display: block;
    opacity: 1;
  }
  #prevSocialBtn:hover, #nextSocialBtn:hover {
    background: #e55a2b !important;
    transform: scale(1.05);
  }
  #prevSocialBtn:disabled, #nextSocialBtn:disabled {
    background: #ccc !important;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
document.head.appendChild(socialStyle);

function showSocialSlide(n) {
  if (n > totalSocialSlides) currentSocialSlide = totalSocialSlides;
  if (n < 1) currentSocialSlide = 1;
  
  socialSlides.forEach(slide => slide.classList.remove('active-social-slide'));
  socialSlides[currentSocialSlide - 1].classList.add('active-social-slide');
  
  socialSlideIndicator.textContent = `${currentSocialSlide} / ${totalSocialSlides}`;
  
  prevSocialBtn.disabled = (currentSocialSlide === 1);
  nextSocialBtn.disabled = (currentSocialSlide === totalSocialSlides);
}

prevSocialBtn.addEventListener('click', () => {
  currentSocialSlide--;
  showSocialSlide(currentSocialSlide);
});

nextSocialBtn.addEventListener('click', () => {
  currentSocialSlide++;
  showSocialSlide(currentSocialSlide);
});

// Initialize
showSocialSlide(currentSocialSlide);

// Political Carousel
let currentPoliticalSlide = 1;
const totalPoliticalSlides = 6;
const politicalSlides = document.querySelectorAll('.political-slide');
const prevPoliticalBtn = document.getElementById('prevPoliticalBtn');
const nextPoliticalBtn = document.getElementById('nextPoliticalBtn');
const politicalSlideIndicator = document.getElementById('politicalSlideIndicator');

const politicalStyle = document.createElement('style');
politicalStyle.textContent = `.political-slide { display: none; opacity: 0; transition: opacity 0.5s; } .political-slide.active-political-slide { display: block; opacity: 1; } #prevPoliticalBtn:hover, #nextPoliticalBtn:hover { background: #e55a2b !important; transform: scale(1.05); } #prevPoliticalBtn:disabled, #nextPoliticalBtn:disabled { background: #ccc !important; cursor: not-allowed; opacity: 0.6; }`;
document.head.appendChild(politicalStyle);

function showPoliticalSlide(n) {
  if (n > totalPoliticalSlides) currentPoliticalSlide = totalPoliticalSlides;
  if (n < 1) currentPoliticalSlide = 1;
  politicalSlides.forEach(slide => slide.classList.remove('active-political-slide'));
  politicalSlides[currentPoliticalSlide - 1].classList.add('active-political-slide');
  politicalSlideIndicator.textContent = `${currentPoliticalSlide} / ${totalPoliticalSlides}`;
  prevPoliticalBtn.disabled = (currentPoliticalSlide === 1);
  nextPoliticalBtn.disabled = (currentPoliticalSlide === totalPoliticalSlides);
}
prevPoliticalBtn.addEventListener('click', () => { currentPoliticalSlide--; showPoliticalSlide(currentPoliticalSlide); });
nextPoliticalBtn.addEventListener('click', () => { currentPoliticalSlide++; showPoliticalSlide(currentPoliticalSlide); });
showPoliticalSlide(currentPoliticalSlide);

// Economic Carousel
let currentEconomicSlide = 1;
const totalEconomicSlides = 5;
const economicSlides = document.querySelectorAll('.economic-slide');
const prevEconomicBtn = document.getElementById('prevEconomicBtn');
const nextEconomicBtn = document.getElementById('nextEconomicBtn');
const economicSlideIndicator = document.getElementById('economicSlideIndicator');

const economicStyle = document.createElement('style');
economicStyle.textContent = `.economic-slide { display: none; opacity: 0; transition: opacity 0.5s; } .economic-slide.active-economic-slide { display: block; opacity: 1; } #prevEconomicBtn:hover, #nextEconomicBtn:hover { background: #e55a2b !important; transform: scale(1.05); } #prevEconomicBtn:disabled, #nextEconomicBtn:disabled { background: #ccc !important; cursor: not-allowed; opacity: 0.6; }`;
document.head.appendChild(economicStyle);

function showEconomicSlide(n) {
  if (n > totalEconomicSlides) currentEconomicSlide = totalEconomicSlides;
  if (n < 1) currentEconomicSlide = 1;
  economicSlides.forEach(slide => slide.classList.remove('active-economic-slide'));
  economicSlides[currentEconomicSlide - 1].classList.add('active-economic-slide');
  economicSlideIndicator.textContent = `${currentEconomicSlide} / ${totalEconomicSlides}`;
  prevEconomicBtn.disabled = (currentEconomicSlide === 1);
  nextEconomicBtn.disabled = (currentEconomicSlide === totalEconomicSlides);
}
prevEconomicBtn.addEventListener('click', () => { currentEconomicSlide--; showEconomicSlide(currentEconomicSlide); });
nextEconomicBtn.addEventListener('click', () => { currentEconomicSlide++; showEconomicSlide(currentEconomicSlide); });
showEconomicSlide(currentEconomicSlide);

// Culture Carousel
let currentCultureSlide = 1;
const totalCultureSlides = 7;
const cultureSlides = document.querySelectorAll('.culture-slide');
const cultureImages = document.querySelectorAll('.culture-image');
const prevCultureBtn = document.getElementById('prevCultureBtn');
const nextCultureBtn = document.getElementById('nextCultureBtn');
const cultureSlideIndicator = document.getElementById('cultureSlideIndicator');

const cultureStyle = document.createElement('style');
cultureStyle.textContent = `.culture-slide { display: none; opacity: 0; transition: opacity 0.5s; } .culture-slide.active-culture-slide { display: block; opacity: 1; } .culture-image { display: none; opacity: 0; transition: opacity 0.5s; position: absolute; top: 0; left: 0; width: 100%; } .culture-image.active-culture-image { display: block; opacity: 1; position: relative; } #prevCultureBtn:hover, #nextCultureBtn:hover { background: #e55a2b !important; transform: scale(1.05); } #prevCultureBtn:disabled, #nextCultureBtn:disabled { background: #ccc !important; cursor: not-allowed; opacity: 0.6; }`;
document.head.appendChild(cultureStyle);

function showCultureSlide(n) {
  if (n > totalCultureSlides) currentCultureSlide = totalCultureSlides;
  if (n < 1) currentCultureSlide = 1;
  cultureSlides.forEach(slide => slide.classList.remove('active-culture-slide'));
  cultureSlides[currentCultureSlide - 1].classList.add('active-culture-slide');
  cultureImages.forEach(img => img.classList.remove('active-culture-image'));
  cultureImages[currentCultureSlide - 1].classList.add('active-culture-image');
  cultureSlideIndicator.textContent = `${currentCultureSlide} / ${totalCultureSlides}`;
  prevCultureBtn.disabled = (currentCultureSlide === 1);
  nextCultureBtn.disabled = (currentCultureSlide === totalCultureSlides);
}
prevCultureBtn.addEventListener('click', () => { currentCultureSlide--; showCultureSlide(currentCultureSlide); });
nextCultureBtn.addEventListener('click', () => { currentCultureSlide++; showCultureSlide(currentCultureSlide); });
showCultureSlide(currentCultureSlide);

// Religion Carousel
let currentReligionSlide = 1;
const totalReligionSlides = 7;
const religionSlides = document.querySelectorAll('.religion-slide');
const prevReligionBtn = document.getElementById('prevReligionBtn');
const nextReligionBtn = document.getElementById('nextReligionBtn');
const religionSlideIndicator = document.getElementById('religionSlideIndicator');

const religionStyle = document.createElement('style');
religionStyle.textContent = `.religion-slide { display: none; opacity: 0; transition: opacity 0.5s; } .religion-slide.active-religion-slide { display: block; opacity: 1; } #prevReligionBtn:hover, #nextReligionBtn:hover { background: #e55a2b !important; transform: scale(1.05); } #prevReligionBtn:disabled, #nextReligionBtn:disabled { background: #ccc !important; cursor: not-allowed; opacity: 0.6; }`;
document.head.appendChild(religionStyle);

function showReligionSlide(n) {
  if (n > totalReligionSlides) currentReligionSlide = totalReligionSlides;
  if (n < 1) currentReligionSlide = 1;
  religionSlides.forEach(slide => slide.classList.remove('active-religion-slide'));
  religionSlides[currentReligionSlide - 1].classList.add('active-religion-slide');
  religionSlideIndicator.textContent = `${currentReligionSlide} / ${totalReligionSlides}`;
  prevReligionBtn.disabled = (currentReligionSlide === 1);
  nextReligionBtn.disabled = (currentReligionSlide === totalReligionSlides);
}
prevReligionBtn.addEventListener('click', () => { currentReligionSlide--; showReligionSlide(currentReligionSlide); });
nextReligionBtn.addEventListener('click', () => { currentReligionSlide++; showReligionSlide(currentReligionSlide); });
showReligionSlide(currentReligionSlide);