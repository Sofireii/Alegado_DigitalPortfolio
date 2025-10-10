// Portfolio smooth scrolling functionality
let isScrolling = false;
let currentSectionIndex = 0;
let isModalOpen = false; // Track modal state

const sections = [
    { element: null, name: 'hero' },
    { element: null, name: 'info' }
];

// Project data
const projectData = {
    1: {
        title: "Project Alpha",
        image: "https://via.placeholder.com/600x400/4A5568/38B2AC?text=Project+Alpha+Details",
        description: `
            <p>This is a comprehensive web application built with modern technologies. The project showcases advanced frontend development skills and responsive design principles.</p>
            <p><strong>Technologies Used:</strong></p>
            <ul class="list-disc list-inside space-y-1">
                <li>React & Next.js</li>
                <li>Tailwind CSS</li>
                <li>Node.js Backend</li>
                <li>PostgreSQL Database</li>
            </ul>
            <p><strong>Key Features:</strong></p>
            <ul class="list-disc list-inside space-y-1">
                <li>Real-time data synchronization</li>
                <li>User authentication system</li>
                <li>Mobile-first responsive design</li>
                <li>API integration</li>
            </ul>
        `
    },
    2: {
        title: "Project Beta",
        image: "https://via.placeholder.com/600x400/4A5568/38B2AC?text=Project+Beta+Details",
        description: `
            <p>An innovative mobile application designed to solve real-world problems. This project demonstrates expertise in cross-platform development and user experience design.</p>
            <p><strong>Technologies Used:</strong></p>
            <ul class="list-disc list-inside space-y-1">
                <li>React Native</li>
                <li>TypeScript</li>
                <li>Firebase</li>
                <li>GraphQL</li>
            </ul>
            <p><strong>Key Features:</strong></p>
            <ul class="list-disc list-inside space-y-1">
                <li>Cross-platform compatibility</li>
                <li>Push notifications</li>
                <li>Offline functionality</li>
                <li>Social media integration</li>
            </ul>
        `
    },
    3: {
        title: "Project Gamma",
        image: "https://via.placeholder.com/600x400/4A5568/38B2AC?text=Project+Gamma+Details",
        description: `
            <p>A data visualization dashboard that transforms complex datasets into intuitive, interactive charts and graphs. Perfect for business intelligence and analytics.</p>
            <p><strong>Technologies Used:</strong></p>
            <ul class="list-disc list-inside space-y-1">
                <li>Vue.js</li>
                <li>D3.js</li>
                <li>Python Flask</li>
                <li>MongoDB</li>
            </ul>
            <p><strong>Key Features:</strong></p>
            <ul class="list-disc list-inside space-y-1">
                <li>Interactive data visualization</li>
                <li>Real-time analytics</li>
                <li>Custom chart types</li>
                <li>Export functionality</li>
            </ul>
        `
    }
};

// Map container number to project page
const projectLinks = {
    1: "ProjectAlpha.html",
    2: "ProjectBeta.html",
    3: "ProjectGamma.html"
};

let currentContainer = null;

// Initialize sections and modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    sections[0].element = document.querySelector('.min-h-screen');
    sections[1].element = document.getElementById('info-containers');
    
    // Set initial section
    updateCurrentSection();
    
    // Initialize modal functionality
    initializeModal();
});

// Modal Functions
function initializeModal() {
    const containerCards = document.querySelectorAll('.container-card');
    const modal = document.getElementById('modal-overlay');
    const closeButton = document.getElementById('close-modal');
    
    // Add click event to each container
    containerCards.forEach(card => {
        card.addEventListener('click', function() {
            const containerId = this.getAttribute('data-container');
            openModal(containerId);
        });
    });
    
    // Close modal events
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });
}

function openModal(containerId) {
    const modal = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    
    const project = projectData[containerId];
    
    if (project) {
        // Update modal content
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        modalDescription.innerHTML = project.description;
        
        // Show modal with animation
        isModalOpen = true;
        modal.classList.remove('invisible', 'opacity-0');
        modal.classList.add('opacity-100');
        
        setTimeout(() => {
            modalContent.classList.remove('scale-90');
            modalContent.classList.add('scale-100');
        }, 50);
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    
    // Hide modal with animation
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-90');
    
    setTimeout(() => {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0', 'invisible');
        isModalOpen = false;
        
        // Re-enable body scroll
        document.body.style.overflow = '';
    }, 200);
}

function updateCurrentSection() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // More reliable section detection
    if (scrollY < windowHeight * 0.3) {
        currentSectionIndex = 0;
    } else {
        currentSectionIndex = 1;
    }
    
    console.log('Current section updated to:', currentSectionIndex, 'ScrollY:', scrollY); // Debug log
}

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    
    isScrolling = true;
    
    console.log('Scrolling to section', index);
    
    sections[index].element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Update the section index immediately
    currentSectionIndex = index;
    
    // Also update after animation completes
    setTimeout(() => { 
        isScrolling = false; 
        updateCurrentSection();
        console.log('Scroll animation completed. Section is now:', currentSectionIndex);
    }, 1000);
}

// Enhanced wheel event (disabled when modal is open)
document.addEventListener('wheel', function(e) {
    // Don't handle wheel events when modal is open
    if (isModalOpen) return;
    
    // Allow small scroll movements for normal scrolling
    if (Math.abs(e.deltaY) < 10) {
        return;
    }
    
    if (isScrolling) {
        e.preventDefault();
        return;
    }
    
    // Update current section before processing wheel event
    updateCurrentSection();
    
    console.log('Wheel event - deltaY:', e.deltaY, 'current section:', currentSectionIndex); // Debug log
    
    if (e.deltaY > 0) {
        // Scrolling down
        if (currentSectionIndex === 0) {
            e.preventDefault();
            console.log('Scrolling DOWN to section 1');
            scrollToSection(1);
        }
    } else {
        // Scrolling up
        if (currentSectionIndex === 1) {
            e.preventDefault();
            console.log('Scrolling UP to section 0');
            scrollToSection(0);
        }
    }
}, { passive: false });

// Update current section on scroll (for manual scrolling)
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!isScrolling && !isModalOpen) {
        // Debounce scroll updates
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCurrentSection();
        }, 100);
    }
});

// Touch/swipe support for mobile (disabled when modal is open)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    if (!isModalOpen) {
        touchStartY = e.changedTouches[0].screenY;
    }
});

document.addEventListener('touchend', function(e) {
    if (isScrolling || isModalOpen) return;
    
    touchEndY = e.changedTouches[0].screenY;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > 50) {
        updateCurrentSection(); // Update before processing
        
        if (swipeDistance > 0) {
            // Swiping up (scrolling down)
            if (currentSectionIndex === 0) {
                scrollToSection(1);
            }
        } else {
            // Swiping down (scrolling up)
            if (currentSectionIndex === 1) {
                scrollToSection(0);
            }
        }
    }
});

// Keyboard navigation (disabled when modal is open, except for Escape)
document.addEventListener('keydown', function(e) {
    if (isScrolling) return;
    
    // Handle Escape key for modal
    if (e.key === 'Escape' && isModalOpen) {
        closeModal();
        return;
    }
    
    // Don't handle other keys when modal is open
    if (isModalOpen) return;
    
    updateCurrentSection(); // Update before processing
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSectionIndex === 0) {
            scrollToSection(1);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSectionIndex === 1) {
            scrollToSection(0);
        }
    }
});

// View Project button logic
document.getElementById('view-project-btn').addEventListener('click', function() {
    if (currentContainer && projectLinks[currentContainer]) {
        window.location.href = projectLinks[currentContainer];
    }
});

// Debug function - call this in console to check current state
function debugScrolling() {
    updateCurrentSection();
    console.log('=== DEBUG INFO ===');
    console.log('Current section index:', currentSectionIndex);
    console.log('Window scrollY:', window.scrollY);
    console.log('Window height:', window.innerHeight);
    console.log('Is scrolling:', isScrolling);
    console.log('Is modal open:', isModalOpen);
    console.log('Section threshold (30% of window):', window.innerHeight * 0.3);
    console.log('Sections:', sections);
}