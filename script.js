// ============================================
// 1. TOGGLE TEMA (Dark/Light)
// ============================================
const modeToggle = document.querySelector("#modeToggle");
const iconTheme = modeToggle ? modeToggle.querySelector('i') : null;

if (modeToggle && iconTheme) {
    modeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light");
        
        if (document.body.classList.contains("light")) {
            iconTheme.className = "fas fa-sun";
            modeToggle.style.borderColor = "#ffb454";
            localStorage.setItem('theme', 'light');
        } else {
            iconTheme.className = "fas fa-moon";
            modeToggle.style.borderColor = "";
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ============================================
// 2. CEK PREFERENSI TEMA
// ============================================
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        if (iconTheme) {
            iconTheme.className = "fas fa-sun";
            modeToggle.style.borderColor = "#ffb454";
        }
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light');
        if (iconTheme) {
            iconTheme.className = "fas fa-moon";
            modeToggle.style.borderColor = "";
        }
    } else if (systemTheme.matches) {
        document.body.classList.add('light');
        if (iconTheme) {
            iconTheme.className = "fas fa-sun";
            modeToggle.style.borderColor = "#ffb454";
        }
    }
}

loadTheme();

// ============================================
// 3. MOBILE MENU
// ============================================
const menuToggle = document.querySelector("#menuToggle");
const navList = document.querySelector(".nav-list");

if (menuToggle && navList) {
    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("open");
        
        const icon = this.querySelector('i');
        if (navList.classList.contains("open")) {
            icon.className = "fas fa-times";
            this.style.borderColor = "var(--accent)";
            document.body.style.overflow = 'hidden';
        } else {
            icon.className = "fas fa-bars";
            this.style.borderColor = "";
            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            const icon = menuToggle.querySelector('i');
            icon.className = "fas fa-bars";
            menuToggle.style.borderColor = "";
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isClickInside = navList.contains(e.target) || menuToggle.contains(e.target);
            if (!isClickInside && navList.classList.contains('open')) {
                navList.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                icon.className = "fas fa-bars";
                menuToggle.style.borderColor = "";
                document.body.style.overflow = '';
            }
        }
    });
}

// ============================================
// 4. SCROLL EFFECT NAVBAR
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// 5. ACTIVE LINK
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    if (sections.length > 0) {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ============================================
// 6. SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            const navbarHeight = navbar ? navbar.offsetHeight : 70;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 7. TYPING EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let charIndex = 0;
        const typingSpeed = 50;
        
        function typeText() {
            if (charIndex < originalText.length) {
                subtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                subtitle.style.borderRight = '2px solid var(--accent)';
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeText, 1000);
    }
});

// ============================================
// 8. KEYBOARD SHORTCUT
// ============================================
document.addEventListener('keydown', function (e) {
    if ((e.key === 't' || e.key === 'T') && modeToggle) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            modeToggle.click();
        }
    }
});

// ============================================
// 9. RESIZE HANDLER
// ============================================
let resizeTimer;

window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navList && navList.classList.contains('open')) {
            navList.classList.remove('open');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.className = "fas fa-bars";
                menuToggle.style.borderColor = "";
                document.body.style.overflow = '';
            }
        }
        updateActiveLink();
    }, 250);
});

// ============================================
// 10. INTERSECTION OBSERVER
// ============================================
if ('IntersectionObserver' in window) {
    const animateElements = document.querySelectorAll('.skill-card, .hobi-card, .fact-card, .bio-card, .quote-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
        observer.observe(el);
    });
}

// ============================================
// 11. STIKER INTERAKTIF
// ============================================
const stiker = document.getElementById('stiker');
const bubble = document.getElementById('bubble');

if (stiker) {
    stiker.addEventListener('click', function() {
        const messages = [
            'Halo! 👋',
            'Apa kabar? 😊',
            'Senang bertemu! ✨',
            'Semangat belajar! 💪',
            'Jangan lupa tersenyum! 😄',
            'Kamu hebat! 🌟'
        ];
        
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        
        if (bubble) {
            bubble.textContent = randomMsg;
            bubble.style.opacity = '1';
            bubble.style.transform = 'scale(1)';
            
            clearTimeout(stiker.timeout);
            stiker.timeout = setTimeout(() => {
                if (window.location.pathname.includes('about')) {
                    bubble.textContent = 'Kenalan yuk! 😊';
                } else {
                    bubble.textContent = 'Halo! 👋';
                }
            }, 3000);
        }
    });

    stiker.addEventListener('mouseenter', function() {
        const wave = document.querySelector('.hand-wave');
        if (wave) {
            wave.style.animation = 'wave 0.5s ease-in-out 3';
        }
    });
}

// ============================================
// 12. STIKER TAMPIL SETELAH SCROLL
// ============================================
let stikerShown = false;

window.addEventListener('scroll', function() {
    const stikerEl = document.getElementById('stiker');
    if (stikerEl && !stikerShown) {
        if (window.scrollY > 300) {
            stikerEl.style.opacity = '1';
            stikerEl.style.transform = 'scale(1)';
            stikerShown = true;
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const stikerEl = document.getElementById('stiker');
    if (stikerEl) {
        stikerEl.style.opacity = '0';
        stikerEl.style.transform = 'scale(0.5)';
        stikerEl.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            stikerEl.style.opacity = '1';
            stikerEl.style.transform = 'scale(1)';
        }, 2000);
    }
});

// ============================================
// 13. CONSOLE INFO
// ============================================
console.log('🚀 Portofolio Finza siap!');
console.log('💡 Tekan "T" untuk ganti tema');
console.log('📱 Klik hamburger untuk menu mobile');
console.log('🌙 Tema tersimpan di LocalStorage');
console.log('👋 Klik stiker untuk pesan random!');

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
});

// ============================================
// PARTICLES BACKGROUND
// ============================================
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        container.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// ============================================
// COUNTER ANIMASI
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Jalankan counter saat element terlihat
if ('IntersectionObserver' in window) {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(statsSection);
    }
}

// ============================================
// SKILL FILTER
// ============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Toggle active class
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        const cards = document.querySelectorAll('.skill-card');
        
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SKILL PROGRESS ANIMASI (Saat scroll)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.skill-progress-bar');
                    bars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillCards.forEach(card => observer.observe(card));
    }
});