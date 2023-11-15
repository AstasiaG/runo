$(document).ready(function() {
    
    $(".catalog__slide .frequently-asked-questions__blocks").each(function() {
        // В каждом конкретном блоке обновляем номера вопросов
        $(this).find(".frequently-asked-questions__block").each(function(idx) {
            let questionNumber = $(this).find(".frequently-asked-questions__number");

            if (idx < 9) {
                return questionNumber.text(`0${idx + 1}`);
            } 
            questionNumber.text(idx + 1);
        });

    });

    $('.catalog__slide.active .accordion-header').click(function() {
        // Свернуть все разделы, кроме текущего
        $('.accordion-content').not($(this).next()).slideUp();
        $(this).toggleClass('active');
        // Развернуть или свернуть текущий раздел
        $(this).next().slideToggle();
    });

    
});



$(document).ready(function() {
    let maxVisibleSlides = 10;
    let incrementSlides = 3;
    
    function setupSlides(activeTab) {
        let currentSlideItems = $(`.catalog__slide[data-tab='${activeTab}'] .frequently-asked-questions__block `);
        
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
        
            $(`.catalog__slide[data-tab='${activeTab}'] .frequently-asked-questions__block:hidden`).slice(0, incrementSlides).slideDown();
        
            if ($(`.catalog__slide[data-tab='${activeTab}'] .frequently-asked-questions__block:hidden`).length == 0) {
                $('#loadMoreBtn').fadeOut('slow');
            }
        });
    }
    
    // Первоначальная настройка слайдов
    setupSlides($('.frequently-asked-questions .catalog__button.active').data('tab'));
    // Ваш обработчик переключения вкладок
    $('.frequently-asked-questions .catalog__button').on('click', function() {
        
        let activeTab = $('.frequently-asked-questions .catalog__button.active').data('tab');
        setupSlides(activeTab);
        $('.catalog__slide.active .accordion-header').click(function() {
            // Свернуть все разделы, кроме текущего
            $('.accordion-content').not($(this).next()).slideUp();
            $(this).toggleClass('active');
            // Развернуть или свернуть текущий раздел
            $(this).next().slideToggle();
        });

    });
  });