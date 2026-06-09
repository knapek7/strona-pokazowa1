document.addEventListener('DOMContentLoaded', () => {
    // === Sticky Navbar ===
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    });

    // === Smooth Scrolling ===
    document.querySelectorAll('.nav-links a, .cta-buttons a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetPosition = targetSection.offsetTop - header.offsetHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            if (document.querySelector('.nav-links').classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // === Mobile Menu Hamburger ===
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    const toggleMobileMenu = () => {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    hamburgerMenu.addEventListener('click', toggleMobileMenu);

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburgerMenu.contains(e.target) && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // === Scroll Reveal Animations ===
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (elementTop < viewportHeight - 100) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // === Reviews Slider ===
    const reviewsSlider = document.querySelector('.reviews-slider');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    const updateSlider = () => {
        if (reviewCards.length === 0) return;
        const cardWidth = reviewsSlider.querySelector('.review-card').offsetWidth;
        const offset = -currentIndex * cardWidth;
        reviewsSlider.style.transform = `translateX(${offset}px)`;
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % reviewCards.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
        updateSlider();
    });

    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % reviewCards.length;
        updateSlider();
    }, 5000);

    reviewsSlider.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    reviewsSlider.parentElement.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % reviewCards.length;
            updateSlider();
        }, 5000);
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();

    // === Scroll to Top Button ===
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});