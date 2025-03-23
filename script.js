// Modern CSE Resume - JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Enhanced typing animation
    function resetTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (typingElement) {
            typingElement.style.animation = 'none';
            setTimeout(() => {
                typingElement.style.animation = 'typing 3.5s steps(30) 1s forwards, blink 1s step-end infinite';
            }, 50);
        }
    }

    // Reset typing animation when it comes into view
    const hero = document.querySelector('.hero');
    if (hero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resetTypingAnimation();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(hero);
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .btn');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'transparent';
            cursor.style.backgroundColor = '#f50057';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = '#6c63ff';
            cursor.style.backgroundColor = '#6c63ff';
        });
    });

    // Disable custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#f50057';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (valid) {
                // Form submission logic
                // In a real implementation, you would send the form data to a server
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    const formElements = contactForm.elements;
                    for (let i = 0; i < formElements.length; i++) {
                        if (formElements[i].type !== 'submit') {
                            formElements[i].value = '';
                        }
                    }
                    
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                    
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Animate progress bars
    function animateProgressBars() {
        const skills = document.querySelector('.skills');
        if (skills) {
            const progressBars = skills.querySelectorAll('.progress');
            
            const skillsPosition = skills.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (skillsPosition < screenPosition) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    }

    // Listen for scroll to animate progress bars
    window.addEventListener('scroll', animateProgressBars);
    
    // Initial call
    animateProgressBars();

    // Project card tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });

    // Particle background effect
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position, size, and animation delay
            const size = Math.random() * 5 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            hero.appendChild(particle);
        }
    };
    
    // Create particles
    createParticles();

    // Dynamic year in footer copyright
    const yearEl = document.querySelector('.copyright p');
    if (yearEl) {
        const year = new Date().getFullYear();
        yearEl.innerHTML = yearEl.innerHTML.replace('2023', year);
    }
});

// Add CSS for particles
window.addEventListener('load', function() {
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(108, 99, 255, 0.5);
            pointer-events: none;
            z-index: 0;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}); 