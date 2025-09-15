// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeTestimonialSlider();
    initializeGalleryFilter();
    initializeScrollEffects();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
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
    });
}

// Testimonial slider functionality
function initializeTestimonialSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-advance slides
    setInterval(nextSlide, 5000);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Gallery filter functionality
function initializeGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroImage.style.transform = `translateY(${parallax}px)`;
            }
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!validateForm(name, phone, service, message)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Create WhatsApp message
                const whatsappMessage = createWhatsAppMessage(name, phone, service, message);
                
                // Open WhatsApp
                window.open(`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                
                // Show success message
                showSuccessMessage();
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

function validateForm(name, phone, service, message) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    
    // Name validation
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name');
        isValid = false;
    }
    
    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Service validation
    if (!service) {
        showFieldError('service', 'Please select a service');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function createWhatsAppMessage(name, phone, service, message) {
    return `Hello! I'm interested in your tailoring services.

*Name:* ${name}
*Phone:* ${phone}
*Service:* ${service}
*Message:* ${message || 'No additional message'}

Please let me know about availability and pricing. Thank you!`;
}

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Thank you for your inquiry! We'll redirect you to WhatsApp to continue the conversation.
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .service-card,
        .testimonial-item,
        .gallery-item,
        .value-item,
        .service-item,
        .about-content,
        .contact-item
    `);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Instagram feed simulation (replace with actual Instagram API)
function loadInstagramFeed() {
    // This would typically connect to Instagram's API
    // For now, we'll use placeholder images
    console.log('Instagram feed loaded');
}

// Global functions for testimonial slider (called from HTML)
window.currentSlide = function(n) {
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === n - 1);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === n - 1);
    });
};

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Gallery lightbox effect (simple version)
function initializeGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
}

// Call gallery lightbox initialization
document.addEventListener('DOMContentLoaded', initializeGalleryLightbox);

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder image
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjRhNmE2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIENvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Image coming soon';
        });
    });
});

// Performance optimization - Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}