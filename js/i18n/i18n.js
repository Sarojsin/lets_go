// i18n utility for multilingual support
// Loads language JSON files from js/i18n/ folder and applies translations

const I18n = (function () {
    const storageKey = 'siteLanguage';
    let currentLang = localStorage.getItem(storageKey) || 'en';
    let translations = {};

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`js/i18n/${lang}.json`);
            if (!response.ok) {
                console.warn(`Language file not found: ${lang}, using default text`);
                return {};
            }
            return await response.json();
        } catch (error) {
            console.warn(`Could not load translations for ${lang}:`, error);
            return {};
        }
    }

    function applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n-key');
            const text = translations[key];
            if (text) {
                if (el.tagName.toLowerCase() === 'input' && el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', text);
                } else {
                    el.textContent = text;
                }
            }
        });
    }

    async function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(storageKey, lang);
        translations = await loadTranslations(lang);
        applyTranslations();
        const selector = document.getElementById('languageSelect');
        if (selector) selector.value = lang;
    }

    // Initialize on page load (non-blocking)
    async function init() {
        try {
            translations = await loadTranslations(currentLang);
            applyTranslations();
        } catch (error) {
            console.warn('i18n initialization failed, using default text');
        }
        
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.value = currentLang;
            selector.addEventListener('change', e => setLanguage(e.target.value));
        }
    }

    // Start initialization without blocking DOM
    init();

    return { setLanguage };
})();
