// $(document).ready(function() {
//     var slideWorksCount = 6; // количество слайдов по умолчанию
//     var slideWorksStep = 3; // количество слайдов, добавляемых при нажатии на кнопку

//     // Показать слайды по умолчанию
//     $('.our-works.catalog__slide-item:lt(' + slideCount + ')').show();

//     // Обработчик нажатия на кнопку "Добавить слайды"
//     $('#addSlidesButton').click(function() {
//       // Увеличить счетчик слайдов, чтобы добавить новые
//       slideCount += slideStep;

//       // Показать новые слайды
//       $('.slide:lt(' + slideCount + ')').show();

//       // Скрыть кнопку, если достигнуто максимальное количество слайдов
//       if ($('.slide').length <= slideCount) {
//         $(this).hide();
//       }
//     });
//   });