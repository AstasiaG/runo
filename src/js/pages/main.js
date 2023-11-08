'use strict';
import Swiper from 'swiper/bundle';
import Choices from 'choices.js';
import 'inputmask';
window.$ = window.jQuery = require('jquery');
let timer;

const rem = function (rem) {
  if (window.innerWidth > 768) {
    return 0.005208335 * window.innerWidth * rem;
  } else {
    // где 375 это ширина мобильной версии макета
    return (100 / 375) * (0.05 * window.innerWidth) * rem;
  }
}
const mask = new Inputmask('+7 (999) 999 99 99');
mask.mask($('.phone-mask'));

$(".questions__item").each(function () {
  let hide = $(this).find('.questions__item-text');
  hide.hide();
  $(this).on("click",function () {
    hide.slideToggle();
    $(this).toggleClass('active')
  });
});

$('.widget__content').hide();
$(".widget__icon").on("click",function () {
  let hide = $('.widget__content');
  hide.slideToggle();
  $(this).toggleClass('active')
});

// window.addEventListener('scroll', function () {
//   if (containerRect.top >= 988) {
//     $('.banner__btn').addClass('sticky-btn');
//   } else {
//     $('.banner__btn').removeClass('sticky-btn');
//   }
// });
$('.steps__content-item').each(function () {
  let hide = $(this).find('.steps__content-item-img');
  hide.hide();
  if($(this).hasClass('active')) {
    $(this).find('.steps__content-item-img').show();
  }
  $(this).on("click",function () {
    $(".header__dropdown-catalog-item").each(function () {
      $(this).find('.header__dropdown-catalog-content').hide();
      $(this).removeClass('active')
    })
    hide.show();
    $(this).addClass('active')
  });
})

$('.steps__content-item').on("mouseenter",
  function () {
    $('.steps__content-item').find('.steps__content-item-img').hide(200);
    $(this).find(".steps__content-item-img").show(200);
  })

$(".steps__content-item").on("mouseleave", function () {
  $(this).find(".steps__content-item-img").hide(200);
  }
);

//dropdown//

$(".dropdown").find('.header__dropdown').hide();
$(".dropdown").on("mouseenter",
  function () {
    clearTimeout(timer);
    $(".dropdown").find('.header__dropdown').hide();
    $(this).find(".header__dropdown").show();
  })

$(".dropdown").on("mouseleave", function () {
  const drop = $(this).find(".header__dropdown");
    timer = setTimeout(function () {
      drop.hide();
    }, 200);
    $(this).find(".header__dropdown").on("mouseenter",
      function () {
        clearTimeout(timer);
      })
    $(this).find(".header__dropdown").on("mouseleave",
      function () {
        drop.hide();
      })
  }
);

$(".header__dropdown-catalog-item").each(function () {
  let hide = $(this).find('.header__dropdown-catalog-content');
  hide.hide();
  if($(this).hasClass('active')) {
    $(this).find('.header__dropdown-catalog-content').show();
  }
  $(this).on("click",function () {
    $(".header__dropdown-catalog-item").each(function () {
      $(this).find('.header__dropdown-catalog-content').hide();
      $(this).removeClass('active')
    })
    hide.show();
    $(this).addClass('active')
  });
});


//button up

$('.btn-up').hide()
window.addEventListener("scroll", function() {
  if (window.scrollY > 900) { 
    $('.btn-up').show(200)
  } else {
    $('.btn-up').hide()
  }
});

$('.btn-up').on("click", function() {
  window.scrollTo(0, 0); 
});

//validation//

// function formFieldsInit() {
//   const formFields = $('input[placeholder]');
  
//   if (formFields.length) {
//     formFields.each(function() {
//       if (!$(this).is('[data-placeholder-nohide]')) {
//         $(this).data('placeholder', $(this).attr('placeholder'));
//       }
//     });
//   }
  
//   $('body').on('focusin', function(e) {
//     const targetElement = $(e.target);
//     if (targetElement.is('input')) {
//       if (targetElement.data('placeholder')) {
//         targetElement.attr('placeholder', '');
//       }

//       // Добавьте здесь логику валидации
//       if (targetElement.is('[data-validate]')) {
//         validateInput(targetElement);
//       }
//     }
//   });
  
//   $('body').on('focusout', function(e) {
//     const targetElement = $(e.target);
//     if (targetElement.is('input')) {
//       if (targetElement.data('placeholder')) {
//         targetElement.attr('placeholder', targetElement.data('placeholder'));
//       }
//     }
//   });

//   // Функция для валидации поля
//   function validateInput(input) {
//     const value = input.val().trim();
//     const fieldName = input.attr('name');

//     if (fieldName === 'name' && value.length === 0) {
//       // Если поле имени пустое, добавьте класс ошибки
//       input.addClass('invalid');
//       input.closest('label').find('.error').show();
//       // Добавьте сообщение об ошибке (если необходимо)
//       // Подход к валидации может зависеть от ваших требований
//     } else if (fieldName === 'phone' && value.length === 0) {
//       // Если поле телефона не соответствует правильному формату, добавьте класс ошибки
//       input.addClass('invalid');
//       input.closest('label').find('.error').show();
//       // Добавьте сообщение об ошибке (если необходимо)
//     } else {
//       // Если поле прошло валидацию, уберите класс ошибки (если он был)
//       input.removeClass('invalid');
//       input.closest('label').find('.error').hide();
//       // Удалите сообщение об ошибке (если было)
//     }
//   }
// }

// formFieldsInit();
let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if (
          (formRequiredItem.offsetParent !== null ||
            formRequiredItem.tagName === 'SELECT') &&
          !formRequiredItem.disabled
        ) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;
    if (formRequiredItem.dataset.required === 'email') {
      formRequiredItem.value = formRequiredItem.value.replace(' ', '');
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
      }
    } else if (
      formRequiredItem.type === 'checkbox' &&
      !formRequiredItem.checked
    ) {
      this.addError(formRequiredItem);
      error++;
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
      }
    }
    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('.error');
    formRequiredItem.parentElement.classList.add('.error');
    let inputError =
      formRequiredItem.parentElement.querySelector('.error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML(
        'beforeend',
        `<span class="error">${formRequiredItem.dataset.error}</span>`
      );
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('.error');
    formRequiredItem.parentElement.classList.remove('.error');
    if (formRequiredItem.parentElement.querySelector('.error')) {
      formRequiredItem.parentElement.removeChild(
        formRequiredItem.parentElement.querySelector('.error')
      );
    }
  },
}

//video-control//

$('.banner-zamer__video-control').on("click", function() {
  let video = $('.banner-zamer__video').find('.video')[0];
  if (video.paused) {
    video.play();
    $(this).find('.banner-zamer__video-control').hide();
  } 
  if(!video.paused || video.ended) {
    video.pause();
    $(this).find('.banner-zamer__video-control').show();
  }
});

//tabs//

$('.catalog__button').on('click', function() {
  let id = $(this).attr('data-tab');
  let content = $('.catalog__slide[data-tab="'+ id +'"]');
  
  $('.catalog__button.active').removeClass('active'); // 1
  $(this).addClass('active'); // 2
  
  $('.catalog__slide').removeClass('active'); // 3
  content.addClass('active'); // 4
});


//sliders//

const slider1 = new Swiper('.banner__swiper', {
  slidesPerView: 1.18,
  spaceBetween: rem(0),
  loop: true,
  slideToClickedSlide: true,
  parallax: true,
  navigation: {
    nextEl: '.banner-btn-next',
  },
  pagination: {
    el: '.banner-progress',
    type: 'progressbar',
    },
  speed: 1000,
  breakpoints: {
    769: {
      slidesPerView: 1.18,
      spaceBetween: rem(0),
    },
    210: {
      slidesPerView: 1,
      spaceBetween: rem(1),
      pagination: {
        el: '.banner-progress',
        type: 'bullets',
        clickable: true,
        },
    }
  }
});

if(document.querySelector('.catalog__swiper')) {
    const slider7 = new Swiper('.catalog__slide-content-images', {
      slidesPerView: 'auto',
      //allowTouchMove: true,
      //noSwiping: false,
      //noSwipingClass: 'catalog__slide',
      spaceBetween: rem(4),
      speed: 1000,
      touchRatio: 2.0,
      breakpoints: {
        769: {
          slidesPerView: 'auto',
          spaceBetween: rem(4),
        },
        210: {
          slidesPerView: 'auto',
          spaceBetween: rem(4),
        }
      },
    });

  // const slider2 = new Swiper('.catalog__swiper', {
  //   slidesPerView: 1,
  //   spaceBetween: rem(1),
  //   // allowTouchMove: false,
  //   //noSwiping: true,
  //   noSwipingClass: 'catalog__slide',
  //   effect: 'fade',
  //   fadeEffect: {
  //     crossFade: true
  //   },
  //   speed: 1000,
  //   // on: {
  //   //   slideChangeTransitionStart: function () {
  //   //     if(window.innerWidth < 769) {
  //   //       slider7.allowTouchMove = true;
  //   //     }
  //   //   },
  //   // },
    
  // });

  // slider2.on('slideChangeTransitionEnd', function () {
  //   // Проверьте, что текущий слайд родительского слайдера содержит вложенный слайдер
  //   if (slider2.activeIndex === 0) {
  //     // Если условие выполняется, инициализируйте вложенный слайдер
  //     slider7.init();
  //   }
  // })
  
  const sliderThumbs = new Swiper('.catalog__btns', {
    slidesPerView: 'auto',
    watchOverflow: true,
    spaceBetween: rem(2),
    speed: 1000,
    navigation: {
      nextEl: '.catalog-btn-next',
      prevEl: '.catalog-btn-prev',
    },
    on: {
      //Показать и скрыть кнопки при прокрутке
      fromEdge: function () {
        if(document.querySelector('.catalog-btn-next')) {
          document.querySelector('.catalog-btn-next').style.display = 'flex';
          document.querySelector('.catalog-btn-prev').style.display = 'flex';
        }
      },
    },
    breakpoints: {
      769: {
        slidesPerView: 'auto',
        spaceBetween: rem(2),
      },
      210: {
        slidesPerView: 'auto',
        spaceBetween: rem(4),
      }
    }

    
  });

  if(document.querySelector('.catalog-btn-next')) {
    sliderThumbs.on('reachEnd', () => {
      document.querySelector('.catalog-btn-next').style.display = 'none';
    })
    sliderThumbs.on('reachBeginning', () => {
      document.querySelector('.catalog-btn-prev').style.display = 'none';
    })
  }
  
  // const catalogBtns = Array.from(document.querySelectorAll('.catalog__button'));
  // let idx;
  
  // catalogBtns.forEach(e => {
  //   e.addEventListener('click', () => {
  //     for(let i = 0; i < catalogBtns.length;i++){
  //       catalogBtns[i].classList.remove('active');
  //     }
  //     e.classList.add('active');
  //     idx = catalogBtns.indexOf(e);
  //     slider2.slideTo(idx);
  //   })
  // })
  
  //sliderThumbs.controller.control = slider2;
}


const slider3 = new Swiper('.certificates__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: rem(4),
  speed: 1000,
  navigation: {
    nextEl: '.certificates-btn-next',
    prevEl: '.certificates-btn-prev',
  },
  pagination: {
    el: '.certificates-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: rem(4),
    },
    210: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: rem(1),
    }
  }
});

const slider4 = new Swiper('.reviews__swiper', {
  slidesPerView: 1,
  spaceBetween: rem(1),
  speed: 1000,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: '.reviews-btn-next',
    prevEl: '.reviews-btn-prev',
  },
  pagination: {
    el: '.reviews-pagination',
    type: 'bullets',
    clickable: true,
  },
});

const slider5 = new Swiper('.team__swiper', {
  slidesPerView: 3.3,
  spaceBetween: rem(4),
  speed: 1000,
  navigation: {
    nextEl: '.team-btn-next',
    prevEl: '.team-btn-prev',
  },
});

const slider6 = new Swiper('.prices__items', {
  slidesPerView: 3,
  spaceBetween: rem(4),
  speed: 1000,
  watchOverflow: true,
  pagination: {
    el: '.prices-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 3,
      spaceBetween: rem(4),
    },
    210: {
      slidesPerView: 1,
      spaceBetween: rem(1),
    }
  }
});

const slider8 = new Swiper('.product__thumbs', {
  slidesPerView: 4,
  loop: true,
  watchSlidesProgress: true,
  spaceBetween: rem(2),
  speed: 1000,
  clickableSlides: true,
  navigation: {
    nextEl: '.product__thumbs-btn-next',
  },
});

const slider9 = new Swiper('.product__images', {
  slidesPerView: 1,
  loop: true,
  spaceBetween: rem(1),
  speed: 1000,
  thumbs: {
    swiper: slider8,
  },
});

const slider10 = new Swiper('.benefits-details__swiper', {
  slidesPerView: 2,
  spaceBetween: rem(4),
  speed: 1000,
  navigation: {
    nextEl: '.benefits-details-btn-next',
    prevEl: '.benefits-details-btn-prev',
  },
});

if(document.querySelector('.select')) {
  const select = new Choices('.select', {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
    classNames: {
      containerOuter: 'choices select-choices',
    },
  });
}

if(document.querySelector('.select-filter')) {
  const filter = new Choices('.select-filter', {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
    classNames: {
      containerOuter: 'choices select-choices swiper-slide',
    },
  });
}