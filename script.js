// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/95', 'shadow-lg');
        navbar.classList.remove('bg-white/90', 'shadow-md');
    } else {
        navbar.classList.add('bg-white/90', 'shadow-md');
        navbar.classList.remove('bg-white/95', 'shadow-lg');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            
            // Scroll to target with smooth behavior
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Skill bar animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Intersection Observer for skills section
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Certificate slider functionality
const certTabs = document.querySelectorAll('.cert-tab');
const certSliders = document.querySelectorAll('.cert-slider');

certTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        certTabs.forEach(t => {
            t.classList.remove('active', 'bg-secondary', 'text-white');
            t.classList.add('bg-gray-100', 'text-primary');
        });
        
        // Add active class to clicked tab
        tab.classList.add('active', 'bg-secondary', 'text-white');
        tab.classList.remove('bg-gray-200', 'text-primary');
        
        // Hide all sliders
        certSliders.forEach(slider => {
            slider.classList.add('hidden');
            slider.classList.remove('active');
        });
        
        // Show corresponding slider
        const category = tab.getAttribute('data-category');
        const activeSlider = document.getElementById(`${category}-slider`);
        if (activeSlider) {
            activeSlider.classList.remove('hidden');
            activeSlider.classList.add('active');
            
            // Reset slider to first slide
            const sliderTrack = activeSlider.querySelector('.slider-track');
            if (sliderTrack) {
                sliderTrack.scrollTo({ left: 0, behavior: 'smooth' });
                
                // Update active dots
                const dots = activeSlider.querySelectorAll('.slider-dot');
                dots.forEach((dot, index) => {
                    if (index === 0) {
                        dot.classList.add('active', 'w-12', 'bg-secondary');
                        dot.classList.remove('w-3', 'bg-gray-300');
                    } else {
                        dot.classList.remove('active', 'w-12', 'bg-secondary');
                        dot.classList.add('w-3', 'bg-gray-300');
                    }
                });
            }
        }
    });
});

// Slider navigation controls - Enhanced version
const sliderControls = document.querySelectorAll('.slider-control');

sliderControls.forEach(control => {
    control.addEventListener('click', () => {
        try {
            const slider = control.closest('.cert-slider');
            if (!slider) return;
            
            const track = slider.querySelector('.slider-track');
            if (!track) return;
            
            const isNext = control.classList.contains('next');
            
            // Calculate slide width based on viewport
            const cards = track.querySelectorAll('.snap-center');
            if (cards.length === 0) return;
            
            const cardWidth = cards[0].offsetWidth;
            const visibleWidth = window.innerWidth;
            let slidesPerView = 1;
            
            if (visibleWidth >= 1024) {
                slidesPerView = 3;
            } else if (visibleWidth >= 768) {
                slidesPerView = 2;
            }
            
            const scrollAmount = cardWidth * slidesPerView;
            
            if (isNext) {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Error in slider control:', error);
        }
    });
});

// Slider dots navigation - Enhanced version
const sliderDots = document.querySelectorAll('.slider-dot');

sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
        try {
            const index = parseInt(dot.getAttribute('data-index'));
            const slider = dot.closest('.cert-slider');
            if (!slider) return;
            
            const track = slider.querySelector('.slider-track');
            if (!track) return;
            
            const cards = Array.from(track.querySelectorAll('.min-w-full'));
            if (cards.length <= index) return;
            
            const card = cards[index];
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            
            // Update active dots
            const dots = slider.querySelectorAll('.slider-dot');
            dots.forEach((d, i) => {
                if (i === index) {
                    d.classList.add('active', 'w-12', 'bg-secondary');
                    d.classList.remove('w-3', 'bg-gray-300');
                } else {
                    d.classList.remove('active', 'w-12', 'bg-secondary');
                    d.classList.add('w-3', 'bg-gray-300');
                }
            });
        } catch (error) {
            console.error('Error in slider dot navigation:', error);
        }
    });
});

// Update active dots when scrolling - Enhanced version
const sliderTracks = document.querySelectorAll('.slider-track');

sliderTracks.forEach(track => {
    track.addEventListener('scroll', () => {
        try {
            const slider = track.closest('.cert-slider');
            if (!slider) return;
            
            const cards = Array.from(track.querySelectorAll('.min-w-full'));
            if (cards.length === 0) return;
            
            const dots = slider.querySelectorAll('.slider-dot');
            const scrollPosition = track.scrollLeft;
            
            // Calculate slide width based on viewport
            const cardWidth = cards[0].offsetWidth;
            
            // Find the active card based on scroll position
            let activeIndex = 0;
            let closestDistance = Infinity;
            
            cards.forEach((card, index) => {
                const cardPosition = card.offsetLeft - track.offsetLeft;
                const distance = Math.abs(scrollPosition - cardPosition);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    activeIndex = index;
                }
            });
            
            // Update active dots
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active', 'w-12', 'bg-secondary');
                    dot.classList.remove('w-3', 'bg-gray-300');
                } else {
                    dot.classList.remove('active', 'w-12', 'bg-secondary');
                    dot.classList.add('w-3', 'bg-gray-300');
                }
            });
        } catch (error) {
            console.error('Error in scroll event:', error);
        }
    });
});

// Initialize the slider dots and navigation based on current scroll position
window.addEventListener('load', () => {
    sliderTracks.forEach(track => {
        track.dispatchEvent(new Event('scroll'));
    });
});

// Add event listeners to slider controls and dots after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial check for slider elements
    const sliders = document.querySelectorAll('.cert-slider');
    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const cards = track.querySelectorAll('.min-w-full');
        
        // Make sure there are cards in the slider
        if (cards.length === 0) {
            console.warn('No cards found in slider:', slider.id);
            return;
        }
        
        // Update slider dots count based on number of cards
        const dotsContainer = slider.querySelector('.flex.justify-center.mt-8');
        if (dotsContainer) {
            // Clear existing dots
            while (dotsContainer.firstChild) {
                dotsContainer.removeChild(dotsContainer.firstChild);
            }
            
            // Add new dots based on number of cards
            cards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot', 'w-3', 'h-3', 'rounded-full', 'bg-gray-300', 'focus:outline-none');
                dot.setAttribute('data-index', index);
                
                if (index === 0) {
                    dot.classList.add('active', 'w-12', 'bg-secondary');
                    dot.classList.remove('w-3', 'bg-gray-300');
                }
                
                dot.addEventListener('click', () => {
                    try {
                        const card = cards[index];
                        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        
                        // Update active dots
                        dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
                            if (i === index) {
                                d.classList.add('active', 'w-12', 'bg-secondary');
                                d.classList.remove('w-3', 'bg-gray-300');
                            } else {
                                d.classList.remove('active', 'w-12', 'bg-secondary');
                                d.classList.add('w-3', 'bg-gray-300');
                            }
                        });
                    } catch (error) {
                        console.error('Error in dot click:', error);
                    }
                });
                
                dotsContainer.appendChild(dot);
            });
        }
    });
});