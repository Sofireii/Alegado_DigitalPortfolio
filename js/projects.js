// Mobile Menu Toggle Function
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Sidebar Toggle Function
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  
  if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
    sidebar.classList.remove('open');
  }
});

// Close Lightbox Function
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scrolling
}

// Close lightbox on ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Load More Functionality
let loadedCount = 0;

function loadMore() {
  const hiddenProjects = document.querySelectorAll('.project-card.hidden');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const projectsToShow = 4; // Show 4 more projects each time
  
  for (let i = loadedCount; i < loadedCount + projectsToShow && i < hiddenProjects.length; i++) {
    hiddenProjects[i].classList.remove('hidden');
    // Add fade-in animation
    hiddenProjects[i].style.animation = 'fadeIn 0.5s ease-in';
  }
  
  loadedCount += projectsToShow;
  
  // Hide button if all projects are shown
  if (loadedCount >= hiddenProjects.length) {
    loadMoreBtn.style.display = 'none';
  }
}

// Category Filter and Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card:not(.hidden)');

  // Category Filter
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      const allCards = document.querySelectorAll('.project-card');
      allCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease-in';
        } else {
          if (card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Lightbox Zoom Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  
  // Add click event to all project cards
  const allCards = document.querySelectorAll('.project-card');
  allCards.forEach(card => {
    card.addEventListener('click', function(e) {
      const img = card.querySelector('.project-image img');
      const title = card.querySelector('.project-title').textContent;
      const location = card.querySelector('.project-location').textContent;
      
      e.preventDefault();
      lightbox.classList.add('active');
      lightboxImg.src = img.src.replace('w=600', 'w=1920').replace('h=400', 'h=1080');
      lightboxCaption.textContent = `${title} - ${location}`;
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
});

// Add fade-in animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
