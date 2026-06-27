/*
   Art Home Construction - Custom JS Logic
   Provides Form Validation, Dynamic Stats Counting, Scroll reveals, progress bars
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Spinner dismiss
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
            }, 500);
        });
        // Fallback in case load event already fired
        if (document.readyState === 'complete') {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
    }

    // 2. Scroll Progress Bar
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
    });

    // 3. Sticky Navbar Class Toggle & Active Link Highlight
    const mainNavbar = document.getElementById('mainNavbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky class
        if (window.scrollY > 50) {
            mainNavbar.classList.add('navbar-scrolled');
        } else {
            mainNavbar.classList.remove('navbar-scrolled');
        }

        // Active link highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-fade-in, .reveal-slide-up');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 5. Statistics Counters Trigger on Scroll
    const statsSection = document.getElementById('why-choose-us');
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.getAttribute('data-target'));
                const count = parseInt(counter.innerText);
                const increment = Math.ceil(target / 80);

                if (count < target) {
                    counter.innerText = count + increment > target ? target : count + increment;
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    if (statsSection && counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    runCounters();
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    }

    // 6. Portfolio Filter Grid Logic
    const filterButtons = document.querySelectorAll('.portfolio-filter-group button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
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

    // 7. Back-to-Top Button Handler
    const btnBackToTop = document.getElementById('btnBackToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnBackToTop.style.display = 'flex';
        } else {
            btnBackToTop.style.display = 'none';
        }
    });

    btnBackToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 8. Contact Form Validation and Status Response
    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactFormStatus.classList.add('d-none');
            
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // Simulate form submission
            contactFormStatus.className = "alert alert-success mt-3";
            contactFormStatus.innerHTML = "<i class='bi bi-check-circle-fill me-2'></i>Thank you for contacting Art Home Construction! We will get back to you shortly.";
            contactFormStatus.classList.remove('d-none');
            
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        });
    }

    // 9. Free Quote Modal Form Validation
    const quoteForm = document.getElementById('quoteForm');
    const quoteFormStatus = document.getElementById('quoteFormStatus');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            quoteFormStatus.classList.add('d-none');

            if (!quoteForm.checkValidity()) {
                e.stopPropagation();
                quoteForm.classList.add('was-validated');
                return;
            }

            // Simulate estimate request submission
            quoteFormStatus.className = "alert alert-success mt-3";
            quoteFormStatus.innerHTML = "<i class='bi bi-check-circle-fill me-2'></i>Estimate request submitted successfully. Our lead engineer will contact you with custom pricing plans.";
            quoteFormStatus.classList.remove('d-none');

            quoteForm.reset();
            quoteForm.classList.remove('was-validated');
        });
    }

    // 10. Newsletter Form Validation
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterStatus = document.getElementById('newsletterStatus');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterStatus.classList.add('d-none');

            if (!newsletterForm.checkValidity()) {
                e.stopPropagation();
                return;
            }

            newsletterStatus.className = "text-gold mt-2";
            newsletterStatus.innerHTML = "<i class='bi bi-envelope-check-fill me-1'></i> Successfully subscribed to newsletter!";
            newsletterStatus.classList.remove('d-none');

            newsletterForm.reset();
        });
    }
});
