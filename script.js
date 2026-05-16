document.addEventListener("DOMContentLoaded", () => {
    // Hide Loader
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Sticky Navbar
    const navbar = document.getElementById("navbar");
    if(navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("glass-nav");
                navbar.classList.remove("bg-transparent");
            } else {
                navbar.classList.remove("glass-nav");
                navbar.classList.add("bg-transparent");
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById("scroll-top");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll(".counter-value");
    if (counters.length > 0) {
        const speed = 100;
        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target + (counter.getAttribute('data-plus') === 'true' ? '+' : '');
                    }
                };
                updateCount();
            });
        };
        
        // Use IntersectionObserver to start counter
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        const statsSection = document.getElementById("stats-section");
        if(statsSection) {
            observer.observe(statsSection);
        }
    }

    // GSAP Scroll Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const fadeUps = document.querySelectorAll(".fade-up");
        fadeUps.forEach(elem => {
            gsap.fromTo(elem, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }}
            );
        });

        const staggers = document.querySelectorAll(".stagger-container");
        staggers.forEach(container => {
            const items = container.querySelectorAll(".stagger-item");
            gsap.fromTo(items,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: {
                    trigger: container,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }}
            );
        });
    }
});
