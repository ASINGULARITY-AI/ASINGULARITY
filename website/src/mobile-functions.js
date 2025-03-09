/**
 * Mobile specific functions for AI SINGULARITY website
 * This file contains all functionality that is specific to mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - initializing mobile functions');
    
    // Инициализация всех мобильных функций
    if (window.innerWidth <= 768) {
        // Исправляем таймлайн немедленно
        setTimeout(fixMobileTimeline, 100);
        
        // Остальные функции
        initSmoothScrolling();
        initMobileGlitchEffects();
        initMobileRoadmap();
        initScrollIndicator();
        initPhaseDetailToggle();
        initTimelinePhases();

        // Отслеживаем изменение размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                setTimeout(fixMobileTimeline, 100);
                initSmoothScrolling();
                initMobileGlitchEffects();
                initMobileRoadmap();
                initScrollIndicator();
                initTimelinePhases();
            }
        });
    }
    
    // Добавляем обработчик для задержки при загрузке страницы
    window.addEventListener('load', function() {
        console.log('Window loaded - fixing mobile timeline again');
        if (window.innerWidth <= 768) {
            setTimeout(fixMobileTimeline, 500);
        }
    });
});

// Функция для стильной прокрутки с паузами на блоках для мобильных устройств
function initSmoothScrolling() {
    // Проверяем, является ли устройство мобильным
    if (window.innerWidth <= 768) {
        const sections = document.querySelectorAll('.section');
        let isScrolling = false;
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Проверяем, какая секция сейчас в видимости
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    // Проверяем, входит ли секция в видимую область
                    if (scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
                        if (Math.abs(scrollTop - lastScrollTop) > 50) {
                            // Добавляем глитч-эффект при прокрутке
                            section.classList.add('temp-glitch');
                            
                            // Приостанавливаем прокрутку на короткое время, но не перемещаем страницу
                            isScrolling = true;
                            
                            // Не используем scrollTo, чтобы не перебрасывать пользователя
                            // Просто добавляем небольшую паузу и эффект
                            setTimeout(() => {
                                section.classList.remove('temp-glitch');
                                isScrolling = false;
                                lastScrollTop = scrollTop;
                            }, 800);
                        }
                    }
                });
            }
        });
    }
}

// Добавляем эффекты глитча при прокрутке для мобильных устройств
function initMobileGlitchEffects() {
    if (window.innerWidth <= 768) {
        const cards = document.querySelectorAll('.feature-card, .ecosystem-card, .timeline-content, .type-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Добавляем случайную задержку для каждого элемента
                    // Уменьшаем вероятность появления глитча для более тонкого эффекта
                    if (Math.random() > 0.6) { // Только 40% шанс появления глитча
                        setTimeout(() => {
                            entry.target.classList.add('temp-glitch');
                            setTimeout(() => {
                                entry.target.classList.remove('temp-glitch');
                            }, 300); // Уменьшаем длительность эффекта
                        }, Math.random() * 200);
                    }
                }
            });
        }, {
            threshold: 0.4, // Увеличиваем порог для более точного срабатывания
            rootMargin: '0px 0px -10% 0px'
        });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Функция для правильного отображения и разворачивания блоков роадмапа на мобильных устройствах
function initMobileRoadmap() {
    if (window.innerWidth <= 768) {
        const roadmapCards = document.querySelectorAll('.roadmap-card');
        
        roadmapCards.forEach(card => {
            // Проверяем, есть ли уже индикатор разворачивания
            if (!card.querySelector('.expand-indicator')) {
                // Создаем индикатор разворачивания
                const expandIndicator = document.createElement('div');
                expandIndicator.className = 'expand-indicator';
                
                // Добавляем иконку "плюс"
                const plusIcon = document.createElement('span');
                plusIcon.innerHTML = '+';
                plusIcon.style.fontSize = '24px';
                plusIcon.style.fontWeight = 'bold';
                plusIcon.style.display = 'block';
                plusIcon.style.textAlign = 'center';
                plusIcon.style.lineHeight = '30px';
                
                expandIndicator.appendChild(plusIcon);
                card.appendChild(expandIndicator);
                
                // Добавляем обработчик событий для разворачивания/сворачивания
                card.addEventListener('click', function(e) {
                    // Если клик был по индикатору или по карточке (но не по ссылке внутри)
                    if (e.target.closest('.expand-indicator') || e.target === card || e.target.closest('.roadmap-card') === card) {
                        // Переключаем класс expanded
                        card.classList.toggle('expanded');
                        
                        // Обновляем иконку
                        if (card.classList.contains('expanded')) {
                            plusIcon.innerHTML = '−';
                        } else {
                            plusIcon.innerHTML = '+';
                        }
                        
                        // Добавляем глитч-эффект при разворачивании
                        card.classList.add('temp-glitch');
                        setTimeout(() => {
                            card.classList.remove('temp-glitch');
                        }, 500);
                        
                        // Отменяем всплытие события
                        e.stopPropagation();
                    }
                });
            }
        });
    }
}

// Функция для управления индикатором прокрутки
function initScrollIndicator() {
    if (window.innerWidth <= 768) {
        const scrollIndicator = document.querySelector('.mobile-scroll-indicator');
        if (scrollIndicator) {
            // Скрываем индикатор при прокрутке
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    scrollIndicator.classList.add('hidden');
                } else {
                    scrollIndicator.classList.remove('hidden');
                }
            });
            
            // Скрываем индикатор при клике на него
            scrollIndicator.addEventListener('click', function() {
                scrollIndicator.classList.add('hidden');
                // Плавно прокручиваем к следующей секции
                const firstSection = document.querySelector('.section');
                if (firstSection) {
                    window.scrollTo({
                        top: firstSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// Добавляем функционал для раскрытия блоков фаз на мобильных устройствах
function initPhaseDetailToggle() {
    if (window.innerWidth <= 768) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            const detail = item.querySelector('.timeline-detail');
            
            if (content && detail) {
                content.addEventListener('click', function(e) {
                    // Если клик был на ссылке внутри блока, не раскрываем блок
                    if (e.target.tagName === 'A') {
                        return;
                    }
                    
                    // Переключаем активное состояние для текущего элемента
                    item.classList.toggle('active-mobile');
                    
                    // Закрываем другие элементы
                    timelineItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active-mobile');
                        }
                    });
                    
                    // Скроллим к элементу, если он активирован
                    if (item.classList.contains('active-mobile')) {
                        setTimeout(() => {
                            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 300);
                    }
                });
            }
        });
    }
}

// Функция для обработки блоков таймлайна (фаз) на мобильных устройствах
function initTimelinePhases() {
    if (window.innerWidth <= 768) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            const detail = item.querySelector('.timeline-detail');
            
            if (content && detail) {
                // Добавляем обработчик клика на блок фазы
                content.addEventListener('click', function(e) {
                    // Если клик не по ссылке
                    if (!e.target.closest('a')) {
                        // Закрываем все остальные блоки
                        timelineItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active-mobile')) {
                                otherItem.classList.remove('active-mobile');
                            }
                        });
                        
                        // Переключаем активное состояние
                        item.classList.toggle('active-mobile');
                        
                        // Добавляем эффект глитча при переключении
                        content.classList.add('temp-glitch');
                        setTimeout(() => {
                            content.classList.remove('temp-glitch');
                        }, 300);
                        
                        // Если блок активирован, прокручиваем к нему
                        if (item.classList.contains('active-mobile')) {
                            setTimeout(() => {
                                const contentRect = content.getBoundingClientRect();
                                const offset = window.innerHeight * 0.15;
                                
                                window.scrollTo({
                                    top: window.pageYOffset + contentRect.top - offset,
                                    behavior: 'smooth'
                                });
                            }, 100);
                        }
                        
                        // Отменяем всплытие события
                        e.stopPropagation();
                    }
                });
                
                // Добавляем эффект при касании для мобильных
                content.addEventListener('touchstart', function() {
                    content.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        content.style.transform = 'none';
                    }, 300);
                }, { passive: true });
            }
        });
    }
}

// Фиксирование скролла на мобильных устройствах
function fixMobileScroll() {
    if (window.innerWidth <= 768) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Обработка прокрутки с учетом фиксированного заголовка
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Прокручиваем с учетом высоты заголовка
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Обновляем URL
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
}

// Исправление таймлайна для мобильных устройств
function fixMobileTimeline() {
    console.log('Fixing mobile timeline for compact view');
    if (window.innerWidth <= 768) {
        // Находим и удаляем вертикальную линию
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            // Находим timeline ::before и удаляем его, устанавливая display: none
            timeline.style.position = 'relative';
            timeline.style.display = 'flex';
            timeline.style.flexDirection = 'column';
            timeline.style.alignItems = 'center';
            timeline.style.width = '100%';
            timeline.style.padding = '0';
            timeline.style.margin = '0 auto';
            
            // Устанавливаем стили для timeline-item
            const timelineItems = document.querySelectorAll('.timeline-item');
            const isRussian = document.documentElement.lang === 'ru';
            
            timelineItems.forEach((item, index) => {
                // Компактное расположение
                item.style.width = '95%';
                item.style.margin = '2px auto';
                item.style.padding = '0';
                
                // Устанавливаем стили для timeline-content
                const timelineContent = item.querySelector('.timeline-content');
                if (timelineContent) {
                    timelineContent.style.padding = '10px';
                    timelineContent.style.marginBottom = '0';
                    timelineContent.style.minHeight = '70px';
                    timelineContent.style.cursor = 'pointer';
                    timelineContent.style.position = 'relative';
                    timelineContent.style.borderRadius = '5px';
                    
                    // Удаляем существующие индикаторы, если они есть
                    const existingIndicator = item.querySelector('.timeline-indicator');
                    if (existingIndicator && existingIndicator.parentNode) {
                        existingIndicator.parentNode.removeChild(existingIndicator);
                    }
                    
                    // Устанавливаем стили для timeline-detail
                    const timelineDetail = item.querySelector('.timeline-detail');
                    if (timelineDetail) {
                        timelineDetail.style.maxHeight = '0';
                        timelineDetail.style.padding = '0';
                        timelineDetail.style.opacity = '0';
                        timelineDetail.style.visibility = 'hidden';
                        timelineDetail.style.transition = 'all 0.3s ease';
                        timelineDetail.style.overflow = 'hidden';
                        timelineDetail.style.margin = '0';
                        
                        // Усиленное применение стилей для русской версии
                        if (isRussian) {
                            timelineDetail.style.fontSize = '0.9rem';
                            const detailHeadings = timelineDetail.querySelectorAll('h4');
                            detailHeadings.forEach(heading => {
                                heading.style.fontSize = '1.1rem';
                                heading.style.marginBottom = '8px';
                            });
                            
                            const detailLists = timelineDetail.querySelectorAll('ul');
                            detailLists.forEach(list => {
                                list.style.paddingLeft = '10px';
                                const listItems = list.querySelectorAll('li');
                                listItems.forEach(item => {
                                    item.style.marginBottom = '5px';
                                    item.style.fontSize = '0.85rem';
                                });
                            });
                        }
                    }
                    
                    // Обработчик клика для открытия/закрытия деталей
                    const handleClick = function(event) {
                        // Если клик был на ссылке внутри блока, не раскрываем блок
                        if (event.target.tagName === 'A') {
                            return;
                        }
                        
                        // Переключаем активное состояние для текущего элемента
                        const wasActive = item.classList.contains('active-mobile');
                        
                        // Закрываем другие элементы
                        timelineItems.forEach(otherItem => {
                            otherItem.classList.remove('active-mobile');
                            
                            // Скрываем детали других элементов
                            const otherDetail = otherItem.querySelector('.timeline-detail');
                            if (otherDetail) {
                                otherDetail.style.maxHeight = '0';
                                otherDetail.style.padding = '0';
                                otherDetail.style.opacity = '0';
                                otherDetail.style.visibility = 'hidden';
                                otherDetail.style.margin = '0';
                            }
                        });
                        
                        if (!wasActive) {
                            item.classList.add('active-mobile');
                            
                            // Если элемент активирован, раскрываем детали
                            const detail = item.querySelector('.timeline-detail');
                            if (detail) {
                                detail.style.maxHeight = isRussian ? '1000px' : '800px';
                                detail.style.padding = '15px';
                                detail.style.opacity = '1';
                                detail.style.visibility = 'visible';
                                detail.style.marginTop = '5px';
                                detail.style.marginBottom = '15px';
                                
                                // Улучшаем содержимое detail
                                enhanceDetailContent(item);
                            }
                            
                            // Скроллим к элементу плавно
                            setTimeout(() => {
                                item.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                        } else {
                            // Если элемент деактивирован, скрываем детали
                            const detail = item.querySelector('.timeline-detail');
                            if (detail) {
                                detail.style.maxHeight = '0';
                                detail.style.padding = '0';
                                detail.style.opacity = '0';
                                detail.style.visibility = 'hidden';
                                detail.style.margin = '0';
                            }
                        }
                    };
                    
                    // Удаляем существующий обработчик перед добавлением нового
                    timelineContent.removeEventListener('click', handleClick);
                    timelineContent.addEventListener('click', handleClick);
                }
            });
            
            // Добавляем дополнительные стили для активных элементов
            const activeItems = document.querySelectorAll('.timeline-item.active-mobile');
            activeItems.forEach(item => {
                const detail = item.querySelector('.timeline-detail');
                if (detail) {
                    detail.style.maxHeight = isRussian ? '1000px' : '800px';
                    detail.style.padding = '15px';
                    detail.style.opacity = '1';
                    detail.style.visibility = 'visible';
                    detail.style.marginTop = '5px';
                    detail.style.marginBottom = '15px';
                    
                    // Улучшаем содержимое detail
                    enhanceDetailContent(item);
                }
            });
        }
    }
}

// Улучшение отображения содержимого деталей
function enhanceDetailContent(item) {
    if (!item) return;
    
    const detailContent = item.querySelector('.timeline-detail-content');
    if (!detailContent) return;
    
    // Текущий язык
    const isRussian = document.documentElement.lang === 'ru';
    
    // Улучшаем стили для содержимого
    detailContent.style.opacity = '1';
    detailContent.style.visibility = 'visible';
    detailContent.style.display = 'block';
    detailContent.style.width = '100%';
    detailContent.style.boxSizing = 'border-box';
    
    // Улучшаем стили для заголовков
    const headings = detailContent.querySelectorAll('h4');
    headings.forEach(heading => {
        heading.style.color = '#00d9ff';
        heading.style.marginBottom = '10px';
        heading.style.fontSize = isRussian ? '15px' : '16px';
        heading.style.fontWeight = '600';
        heading.style.paddingTop = '10px';
        heading.style.lineHeight = isRussian ? '1.3' : '1.4';
    });
    
    // Улучшаем стили для списков
    const lists = detailContent.querySelectorAll('ul');
    lists.forEach(list => {
        list.style.paddingLeft = '20px';
        list.style.margin = '10px 0 20px 0';
        list.style.width = '100%';
        list.style.boxSizing = 'border-box';
        
        const items = list.querySelectorAll('li');
        items.forEach(li => {
            li.style.color = '#a0a0a0';
            li.style.marginBottom = isRussian ? '6px' : '8px';
            li.style.position = 'relative';
            li.style.paddingLeft = '15px';
            li.style.lineHeight = isRussian ? '1.3' : '1.4';
            li.style.fontSize = isRussian ? '13px' : '14px';
            li.style.width = '100%';
            li.style.boxSizing = 'border-box';
            li.style.textAlign = 'left';
            li.style.wordBreak = isRussian ? 'break-word' : 'normal';
            
            // Добавляем маркер перед элементом списка
            if (!li.querySelector('.list-marker')) {
                const marker = document.createElement('span');
                marker.className = 'list-marker';
                marker.style.position = 'absolute';
                marker.style.left = '0';
                marker.style.top = isRussian ? '2px' : '0';
                marker.style.color = '#00d9ff';
                marker.textContent = '•';
                li.insertBefore(marker, li.firstChild);
            }
        });
    });
    
    // Улучшаем отображение индикатора
    const indicator = item.querySelector('.timeline-indicator');
    if (indicator) {
        indicator.style.position = 'absolute';
        indicator.style.bottom = '15px';
        indicator.style.left = '0';
        indicator.style.right = '0';
        indicator.style.margin = '0 auto';
        indicator.style.width = 'fit-content';
        indicator.style.padding = '5px 15px';
        indicator.style.background = 'rgba(0, 0, 0, 0.8)';
        indicator.style.border = '1px solid rgba(255, 87, 34, 0.7)';
        indicator.style.borderRadius = '20px';
        indicator.style.fontSize = '14px';
        indicator.style.color = 'rgba(255, 87, 34, 0.9)';
        indicator.style.zIndex = '10';
        indicator.style.cursor = 'pointer';
        indicator.style.transition = 'all 0.3s ease';
        indicator.style.textAlign = 'center';
        indicator.style.boxShadow = '0 0 10px rgba(255, 87, 34, 0.3)';
        
        // Обновляем текст
        const isActive = item.classList.contains('active-mobile');
        indicator.textContent = isActive 
            ? (isRussian ? 'Свернуть' : 'Collapse') 
            : (isRussian ? 'Подробнее' : 'Details');
    }
    
    // Обеспечиваем достаточную высоту блока для русского языка
    const detail = item.querySelector('.timeline-detail');
    if (detail && isRussian) {
        detail.style.maxHeight = '2500px';
        detail.style.paddingBottom = '60px';
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    fixMobileScroll();
    fixMobileTimeline();
});

// Повторный вызов при полной загрузке страницы
window.addEventListener('load', function() {
    fixMobileScroll();
    fixMobileTimeline();
    
    // Дополнительно повторяем через небольшую задержку для лучшей совместимости
    setTimeout(fixMobileTimeline, 500);
});

// Вызываем при изменении размера окна
window.addEventListener('resize', function() {
    fixMobileScroll();
    fixMobileTimeline();
});

// Экспортируем функции для использования в других модулях
export { fixMobileScroll, fixMobileTimeline, enhanceDetailContent };

// Делаем функции доступными глобально
window.fixMobileScroll = fixMobileScroll;
window.fixMobileTimeline = fixMobileTimeline;
window.enhanceDetailContent = enhanceDetailContent; 