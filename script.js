
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;
        const body = document.body;

        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // Mobile menu toggle
        function toggleMenu() {
            document.getElementById('mobileMenu').classList.toggle('active');
            document.getElementById('menuOverlay').classList.toggle('active');
        }

        // Scroll reveal animation with stagger effect
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));

        // Portfolio filter
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Add hover animation to buttons
        const allButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .submit-btn');
        allButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = '';
                }, 10);
            });
        });

        // Parallax effect for hero section (optional)
        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.hero-bg');
            if (hero) {
                const scrolled = window.scrollY;
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Contact form submit without leaving the page
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');

        if (contactForm) {
            contactForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;

                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                if (formStatus) {
                    formStatus.textContent = '';
                    formStatus.style.color = '';
                }

                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: new FormData(contactForm),
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Message could not be sent.');
                    }

                    alert('Message sent successfully! I will get back to you soon.');
                    contactForm.reset();

                    if (formStatus) {
                        formStatus.textContent = 'Message sent successfully!';
                        formStatus.style.color = '#4ade80';
                    }
                } catch (error) {
                    console.error(error);
                    alert('Something went wrong while sending your message. Please try again.');

                    if (formStatus) {
                        formStatus.textContent = 'Something went wrong. Please try again.';
                        formStatus.style.color = '#f87171';
                    }
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        }
