// GSAP Animations
document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Custom Easing
        const smoothEase = "power3.out";
        const bounceEase = "elastic.out(1, 0.75)";

        // Initial Page Load Animation
        const heroContent = document.querySelector('.hero-content, .page-hero-content');
        if (heroContent) {
            gsap.fromTo(heroContent,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: smoothEase,
                    delay: 0.2
                }
            );
        }

        // Staggered Animations for lists/grids
        const staggerContainers = document.querySelectorAll('.services-grid, .contact-container');
        staggerContainers.forEach(container => {
            const children = container.children;
            if (children.length > 0) {
                gsap.fromTo(children,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: smoothEase,
                        scrollTrigger: {
                            trigger: container,
                            start: 'top 85%',
                        }
                    }
                );
            }
        });

        // General Fade In Elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            gsap.fromTo(el,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: smoothEase,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                    }
                }
            );
        });

        // Horizontal Slide Elements
        const slideLeft = document.querySelectorAll('.slide-in-left');
        slideLeft.forEach(el => {
            gsap.fromTo(el,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: smoothEase,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    }
                }
            );
        });

        const slideRight = document.querySelectorAll('.slide-in-right');
        slideRight.forEach(el => {
            gsap.fromTo(el,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: smoothEase,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    }
                }
            );
        });

        // Magnetic Button Effect (Subtle)
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });

        // Hover Scale Effects for Cards
        const hoverCards = document.querySelectorAll('.service-card, .team-card');
        hoverCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -10, duration: 0.4, ease: smoothEase });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.4, ease: smoothEase });
            });
        });
    }
});