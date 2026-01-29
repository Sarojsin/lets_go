// Add js-enabled class to document for animation fallbacks
document.documentElement.classList.add('js-enabled');

// Inject shared header into pages that use a placeholder
(function insertSharedHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder || document.getElementById('header')) {
        return;
    }

    headerPlaceholder.innerHTML = `
        <header id="header">
            <div class="header-background"></div>
            <nav class="container">
                <a href="index.html" class="logo">
                    <div class="logoImg">
                        <img src="./media/logoFinal.png" alt="LOGO">
                    </div>
                    <div class="logoText">
                        <h2>TARAISHA TECH</h2>
                        <p>DESIGN CODE DELIVERS</p>
                    </div>
                </a>

                <ul class="nav-links">
                    <li><a href="index.html" data-i18n-key="nav.home">Home</a></li>
                    <li><a href="about.html" data-i18n-key="nav.about">About</a></li>
                    <li><a href="team.html" data-i18n-key="nav.team">Team</a></li>
                    <li><a href="contact.html" data-i18n-key="nav.contact">Contact</a></li>
                </ul>

                <div class="nav-actions">
                    <select id="languageSelect" class="language-select">
                        <option value="en">EN</option>
                        <option value="ne">नेपाली</option>
                        <option value="hi">हिन्दी</option>
                    </select>
                    <button class="theme-toggle" id="themeToggle">
                        <i class="fas fa-sun"></i>
                    </button>
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>

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
})();

// Hide loader when page is loaded
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const mainContent = document.querySelector('.mainContent');
    const header = document.getElementById('header');

    if (mainContent) {
        mainContent.classList.add('show');
    }

    if (header) {
        header.classList.add('show');
    }

    if (loader) {
        // Add slide-up class to trigger CSS transition
        loader.classList.add('slide-up');
        // Remove from DOM after transition completes
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = mobileNav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// Header scroll effect
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle contact form submission for all pages
    const contactForm = document.getElementById('contactForm');
    if (contactForm && !contactForm.hasAttribute('data-handled')) {
        contactForm.setAttribute('data-handled', 'true');
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value;

            if (name && email && message) {
                // In a real application, you would send this data to a server
                console.log('Form submitted:', { name, email, subject, message });

                // Show success message
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;

                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.backgroundColor = '#10b981';

                    // Reset form after 3 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                }
            }
        });
    }
});