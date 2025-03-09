// Функция для переключения языка
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация переключателя языка...');
    
    const languageSwitcher = document.querySelector('.language-switcher');
    if (!languageSwitcher) return;

    const buttons = languageSwitcher.querySelectorAll('button');
    
    // Load saved language preference
    const savedLang = localStorage.getItem('language') || localStorage.getItem('preferredLanguage') || 'en';
    document.documentElement.lang = savedLang;
    
    // Update active button state
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
    });
    
    // Initial update of course links
    console.log('Initial update of course links for language:', savedLang);
    if (typeof window.updateCourseLinks === 'function') {
        window.updateCourseLinks(savedLang);
    } else {
        console.warn('updateCourseLinks function not found, waiting for script.js to load...');
        // Wait for script.js to load and try again
        setTimeout(() => {
            if (typeof window.updateCourseLinks === 'function') {
                window.updateCourseLinks(savedLang);
            }
        }, 1000);
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            
            // Update active state
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Set language
            document.documentElement.lang = lang;
            localStorage.setItem('language', lang);
            localStorage.setItem('preferredLanguage', lang);
            
            // Update course links
            console.log('Updating course links after language change to:', lang);
            if (typeof window.updateCourseLinks === 'function') {
                window.updateCourseLinks(lang);
            } else {
                console.warn('updateCourseLinks function not found');
            }
            
            // Add switching effect
            document.body.classList.add('language-switching');
            setTimeout(() => {
                document.body.classList.remove('language-switching');
            }, 1000);
            
            // Update content if translation function exists
            if (typeof window.updateContent === 'function') {
                window.updateContent();
            }
            
            // Dispatch custom event for other scripts
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
        });
    });
    
    // Double check course links periodically until they are updated correctly
    let checkCount = 0;
    const maxChecks = 5;
    
    function checkLinks() {
        console.log('Checking course links...');
        const currentLang = document.documentElement.lang;
        const courseLinks = document.querySelectorAll('.course-card a[data-link-en]');
        
        courseLinks.forEach((link, index) => {
            const enLink = link.getAttribute('data-link-en');
            const ruLink = link.getAttribute('data-link-ru');
            const currentHref = link.href;
            
            console.log(`Link ${index} current state:`, {
                lang: currentLang,
                href: currentHref,
                shouldBe: currentLang === 'ru' ? ruLink : enLink
            });
            
            if (currentLang === 'ru' && ruLink && currentHref !== ruLink) {
                console.log(`Fixing RU link ${index}`);
                if (typeof window.updateCourseLinks === 'function') {
                    window.updateCourseLinks(currentLang);
                }
            } else if (currentLang === 'en' && enLink && currentHref !== enLink) {
                console.log(`Fixing EN link ${index}`);
                if (typeof window.updateCourseLinks === 'function') {
                    window.updateCourseLinks(currentLang);
                }
            }
        });
        
        checkCount++;
        if (checkCount < maxChecks) {
            setTimeout(checkLinks, 1000);
        }
    }
    
    // Start checking links
    setTimeout(checkLinks, 1000);
}); 