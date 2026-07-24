// ============================================
// ABOUT.JS - JAVASCRIPT KHUSUS HALAMAN ABOUT
// ============================================

// ============================================
// 1. ANIMASI FAKTA SINGKAT (Sudah di CSS)
// ============================================
// Fact cards sudah punya animasi di about.css
// Tapi kita tambahkan efek tambahan

document.addEventListener('DOMContentLoaded', function() {
    const factCards = document.querySelectorAll('.fact-card');
    
    factCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Efek getar kecil saat hover
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('click', function() {
            // Klik fact card = muncul alert dengan fakta
            const title = this.querySelector('h4').textContent;
            const desc = this.querySelector('p').textContent;
            alert(`📌 ${title}\n${desc}`);
        });
    });
});

// ============================================
// 2. QUOTE BOX INTERAKTIF
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const quoteBox = document.querySelector('.quote-box');
    
    if (quoteBox) {
        // Klik quote = ganti quote random
        const quotes = [
            '"Setiap tantangan adalah kesempatan untuk belajar dan berkembang."',
            '"Kesuksesan dimulai dari keberanian untuk mencoba."',
            '"Belajar tanpa henti adalah kunci menuju masa depan."',
            '"Jangan takut gagal, takutlah untuk tidak mencoba."',
            '"Mimpi besar dimulai dari langkah kecil."',
            '"Percaya pada proses, nikmati perjalanannya."'
        ];
        
        quoteBox.addEventListener('click', function() {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            const blockquote = this.querySelector('blockquote');
            
            if (blockquote) {
                blockquote.textContent = randomQuote;
                
                // Animasi perubahan
                blockquote.style.transition = 'all 0.3s ease';
                blockquote.style.transform = 'scale(0.9)';
                blockquote.style.opacity = '0';
                
                setTimeout(() => {
                    blockquote.style.transform = 'scale(1)';
                    blockquote.style.opacity = '1';
                }, 200);
                
                // Kembali ke quote asli setelah 5 detik
                clearTimeout(quoteBox.quoteTimeout);
                quoteBox.quoteTimeout = setTimeout(() => {
                    blockquote.textContent = '"Setiap tantangan adalah kesempatan untuk belajar dan berkembang."';
                    blockquote.style.transform = 'scale(0.9)';
                    blockquote.style.opacity = '0';
                    
                    setTimeout(() => {
                        blockquote.style.transform = 'scale(1)';
                        blockquote.style.opacity = '1';
                    }, 200);
                }, 5000);
            }
        });
    }
});

// ============================================
// 3. COUNTER STATISTIK (Opsional)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan counter kecil di about page
    const stats = [
        { selector: '.fact-card:nth-child(1) .fact-icon', label: 'Siswa' },
        { selector: '.fact-card:nth-child(2) .fact-icon', label: 'Usia' },
        { selector: '.fact-card:nth-child(3) .fact-icon', label: 'Cita-cita' }
    ];
    
    // Efek tambahan: fact card muncul dengan delay berbeda
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
});

// ============================================
// 4. SMOOTH SCROLL UNTUK ABOUT (Khusus link internal)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navbar = document.querySelector('.navbar');
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
// 5. TOGGLE TEMA (Sama dengan index)
// ============================================
const modeToggle = document.querySelector("#modeToggle");
const iconTheme = modeToggle ? modeToggle.querySelector('i') : null;

if (modeToggle && iconTheme) {
    modeToggle.addEventListener("click", function() {
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
// 6. LOAD THEME
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
// 7. MOBILE MENU
// ============================================
const menuToggle = document.querySelector("#menuToggle");
const navList = document.querySelector(".nav-list");

if (menuToggle && navList) {
    menuToggle.addEventListener("click", function() {
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
// 8. SCROLL EFFECT NAVBAR
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// 9. KEYBOARD SHORTCUT
// ============================================
document.addEventListener('keydown', function(e) {
    if ((e.key === 't' || e.key === 'T') && modeToggle) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            modeToggle.click();
        }
    }
});

// ============================================
// 10. RESIZE HANDLER
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
    }, 250);
});

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
                bubble.textContent = 'Kenalan yuk! 😊';
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
// 12. STIKER TAMPIL
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
console.log('📖 Halaman About siap!');
console.log('💡 Klik fact card untuk lihat detail');
console.log('💬 Klik quote box untuk ganti quote');
console.log('👋 Klik stiker untuk pesan random!');