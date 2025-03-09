// Immediate Course Links Initializer
// This script runs as early as possible to ensure course links are set correctly

(function() {
    function initializeLinks() {
        console.log('Initializing course links...');
        
        // Get current language
        const lang = document.documentElement.lang || 
                    localStorage.getItem('language') || 
                    localStorage.getItem('preferredLanguage') || 
                    'en';
        
        console.log('Current language detected as:', lang);
        
        // Set document language explicitly
        document.documentElement.lang = lang;
        
        // Find all course links
        const courseLinks = document.querySelectorAll('.course-card a[data-link-en]');
        console.log(`Found ${courseLinks.length} course links to update`);
        
        // Update each link
        courseLinks.forEach((link, index) => {
            const enLink = link.getAttribute('data-link-en');
            const ruLink = link.getAttribute('data-link-ru');
            
            console.log(`Link ${index} attributes:`, { en: enLink, ru: ruLink });
            
            // Set appropriate link based on language
            if (lang === 'ru' && ruLink) {
                console.log(`Setting Russian link for card ${index}`);
                link.href = ruLink;
            } else if (enLink) {
                console.log(`Setting English link for card ${index}`);
                link.href = enLink;
            }
        });
        
        // Verify all links are correct
        setTimeout(() => {
            console.log('Verifying course links...');
            document.querySelectorAll('.course-card a[data-link-en]').forEach((link, index) => {
                const enLink = link.getAttribute('data-link-en');
                const ruLink = link.getAttribute('data-link-ru');
                const currentHref = link.href;
                
                const isRussian = lang === 'ru';
                const expectedLink = isRussian ? ruLink : enLink;
                const isCorrect = isRussian ? 
                    currentHref.includes('/ru/') : 
                    currentHref.includes('/en/');
                
                console.log(`Link ${index} verification:`, {
                    href: currentHref,
                    language: lang,
                    shouldContain: isRussian ? '/ru/' : '/en/',
                    isCorrect: isCorrect
                });
                
                // Fix if incorrect
                if (!isCorrect && expectedLink) {
                    console.log(`Fixing link ${index} to correct language path`);
                    link.href = expectedLink;
                }
            });
        }, 500);
    }
    
    // Run when DOM is interactive
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLinks);
    } else {
        initializeLinks();
    }
    
    // Also run on language changes
    window.addEventListener('languageChanged', function(e) {
        console.log('Language changed event detected in course-links.js:', e.detail.language);
        setTimeout(initializeLinks, 100);
    });
})(); 