
// Скрипт для проверки наличия всех ключей i18n в файле локализаций
document.addEventListener('DOMContentLoaded', function() {
    console.log('Проверка ключей i18n...');
    
    // Получаем все элементы с атрибутом data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`Найдено ${elements.length} элементов с атрибутом data-i18n`);
    
    // Создаем массив всех уникальных ключей
    const keys = new Set();
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            keys.add(key);
        }
    });
    console.log(`Уникальных ключей: ${keys.size}`);
    
    // Проверяем наличие каждого ключа в файле локализаций
    const missingKeys = {
        en: [],
        ru: []
    };
    
    keys.forEach(key => {
        if (!translations.en[key]) {
            missingKeys.en.push(key);
        }
        if (!translations.ru[key]) {
            missingKeys.ru.push(key);
        }
    });
    
    // Выводим результаты
    console.log('Результаты проверки:');
    console.log(`Отсутствующие ключи в английской локализации (${missingKeys.en.length}):`, missingKeys.en);
    console.log(`Отсутствующие ключи в русской локализации (${missingKeys.ru.length}):`, missingKeys.ru);
    
    // Выводим предупреждение, если есть отсутствующие ключи
    if (missingKeys.en.length > 0 || missingKeys.ru.length > 0) {
        console.warn('ВНИМАНИЕ: Обнаружены отсутствующие ключи в файле локализаций!');
    } else {
        console.log('Все ключи найдены в файле локализаций.');
    }
}); 