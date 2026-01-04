// main.js - UNIVERSAL SCRIPT FOR ALL PAGES (FIXED VERSION)

document.documentElement.classList.add('js-enabled');

// ========== UNIFIED THEME TOGGLE (ONLY ONE HANDLER) ==========
// ========== UNIFIED THEME TOGGLE - WORKS AFTER DYNAMIC INSERTION ==========
(function () {
    // Function to initialize the theme toggle (call it now and after header insertion)
    function initThemeToggle() {
        const savedTheme = localStorage.getItem('theme') || 'dark';

        // Apply saved theme instantly
        document.documentElement.setAttribute('data-theme', savedTheme);

        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return; // Not ready yet

        const themeIcon = themeToggle.querySelector('i');
        if (themeIcon) {
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Remove any old listeners to avoid duplicates
        themeToggle.replaceWith(themeToggle.cloneNode(true));
        const newToggle = document.getElementById('themeToggle');

        newToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            const newIcon = newToggle.querySelector('i');
            if (newIcon) {
                newIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }

            // Force repaint
            document.body.style.display = 'none';
            document.body.offsetHeight;
            document.body.style.display = '';
        });
    }

    // Run immediately (for index.html where button is hardcoded)
    initThemeToggle();

    // Run again after dynamic header is inserted (for other pages)
    // Use MutationObserver to detect when #themeToggle appears
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
            if (document.getElementById('themeToggle')) {
                initThemeToggle();
                observer.disconnect(); // Stop observing once found
            }
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Fallback: Run after a short delay (in case observer misses it)
    setTimeout(initThemeToggle, 500);
})();

// ========== MOBILE MENU - MATCHING index.css STRUCTURE ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
    // Open menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close with X button
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') &&
            !mobileNav.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ========== ACTIVE NAV LINK ==========
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
});

// ========== DYNAMIC HEADER & FOOTER INSERTION (TO AVOID REPETITION) ==========
document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header id="header">
                <div class="header-background"></div>
                <nav class="container">
                    <!-- Left: Logo -->
                    <a href="index.html" class="logo">
                        <div class="logoImg">
                            <img src="./media/logoFinal.png" alt="LOGO">
                        </div>
                        <div class="logoText">
                            <h2>TARAISHA TECH</h2>
                            <p>DESIGN CODE DELIVERS</p>
                        </div>
                    </a>

                    <!-- Center: Desktop Navigation Links (Hidden on Mobile) -->
                    <ul class="nav-links">
                        <li><a href="index.html" data-i18n-key="nav.home">Home</a></li>
                        <li><a href="about.html" data-i18n-key="nav.about">About</a></li>
                        <li><a href="team.html" data-i18n-key="nav.team">Team</a></li>
                        <li><a href="contact.html" data-i18n-key="nav.contact">Contact</a></li>
                    </ul>

                    <!-- Right: Actions (Always Visible) -->
                    <div class="nav-actions">
                        <select id="languageSelect" class="language-select">
                            <option value="en">EN</option>
                            <option value="ne">नेपाली</option>
                            <option value="hi">हिन्दी</option>
                        </select>
                        <button class="theme-toggle" id="themeToggle">
                            <i class="fas fa-sun"></i> <!-- Adjusted based on theme -->
                        </button>
                        <!-- Mobile Menu Toggle Button -->
                        <button class="mobile-menu-btn" id="mobileMenuBtn">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </nav>

                <!-- Mobile Navigation Menu (Hidden by Default, Shows on Menu Button Click) -->
                <div class="mobile-nav" id="mobileNav">
                    <div class="mobile-nav-header">
                        <h3>Menu</h3>
                        <button class="mobile-close-btn" id="mobileCloseBtn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="mobile-nav-links">
                        <a href="index.html" data-i18n-key="nav.home">Home</a>
                        <a href="about.html" data-i18n-key="nav.about">About</a>
                        <a href="team.html" data-i18n-key="nav.team">Team</a>
                        <a href="contact.html" data-i18n-key="nav.contact">Contact</a>
                    </div>
                </div>
            </header>
        `;
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <a href="index.html" class="logo footer-logo">
                            <div class="logoImg">
                                <img src="./media/logoFinal.png" alt="LOGO">
                            </div>
                            <div class="logoText">
                                <h2>TARAISHA TECH</h2>
                                <p>DESIGN CODE DELIVERS</p>
                            </div>
                        </a>
                        <div class="footer-links">
                            <a href="index.html" data-i18n-key="footer.links.home">Home</a>
                            <a href="about.html" data-i18n-key="footer.links.about">About</a>
                            <a href="team.html" data-i18n-key="footer.links.team">Team</a>
                            <a href="contact.html" data-i18n-key="footer.links.contact">Contact</a>
                        </div>
                        <div class="copyright">
                            <span data-i18n-key="footer.copy">&copy; 2026 TARAISHA TECH. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
});