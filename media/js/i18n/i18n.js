// i18n utility for multilingual support
// Loads language JSON files from js/i18n/ folder and applies translations

const I18n = (function () {
    const storageKey = 'siteLanguage';
    let currentLang = localStorage.getItem(storageKey) || 'en';
    let translations = {};

    async function loadTranslations(lang) {
        const response = await fetch(`js/i18n/${lang}.json`);
        if (!response.ok) {
            console.error(`Failed to load language file: ${lang}`);
            return {};
        }
        return await response.json();
    }

    async function applyTranslations() {
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
        await applyTranslations();
        // Update selector value if present
        const selector = document.getElementById('languageSelect');
        if (selector) selector.value = lang;
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', async () => {
        translations = await loadTranslations(currentLang);
        await applyTranslations();
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.value = currentLang;
            selector.addEventListener('change', e => setLanguage(e.target.value));
        }
    });

    return { setLanguage };
})();
