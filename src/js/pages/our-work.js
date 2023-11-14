window.$ = window.jQuery = require('jquery');
$(document).ready(function() {
    let maxVisibleSlides = 6;
    let incrementSlides = 3;
    
    function setupSlides(activeTab) {
        let currentSlideItems = $(`.catalog__slide[data-tab='${activeTab}'] .catalog__slide-item`);
        
        // Показываем начальные слайды
        currentSlideItems.hide();
        currentSlideItems.slice(0, maxVisibleSlides).show();
        
        // Если число слайдов меньше или равно maxVisibleSlides, скрываем кнопку
        if (currentSlideItems.length <= maxVisibleSlides) {
            $('#loadMoreBtn').hide();
        } else {
            $('#loadMoreBtn').show();
        }
    
        // Обновляем обработчик событий
        $('#loadMoreBtn').off('click').on('click', function (e) {
            e.preventDefault();
        
            $(`.catalog__slide[data-tab='${activeTab}'] .catalog__slide-item:hidden`).slice(0, incrementSlides).slideDown();
        
            if ($(`.catalog__slide[data-tab='${activeTab}'] .catalog__slide-item:hidden`).length == 0) {
                $('#loadMoreBtn').fadeOut('slow');
            }
        });
    }
    
    // Первоначальная настройка слайдов
    setupSlides($('.our-works .catalog__button.active').data('tab'));
    
    // Ваш обработчик переключения вкладок, где вы вызываете setupSlides() заново
    $('.our-works .catalog__button').on('click', function() {
        console.log("уауа")
        
        let activeTab = $('.our-works .catalog__button.active').data('tab');
        console.log(activeTab)
        setupSlides(activeTab);
    });
  });