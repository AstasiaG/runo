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

const modalSuccess = document.querySelector('.submit');

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

$(function() {
  if ($(window).width() > 768) {
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

    $('.header__dropdown-catalog-content').first().css('right', '15.5rem');
  }
  if ($(window).width() <= 768) {
    $(".header__dropdown-catalog-content").find('.list').hide();
    $(".header__dropdown-catalog-content + .list-title").on("click", function () {
      $(this).parent().find(".list").slideToggle();
    })

    $(".dropdown").find('.header__dropdown').slideUp();
    $(".dropdown > span").on("click", function () {
      const parent = $(this).parent();

        if(parent.hasClass('active')) {
          parent.find(".header__dropdown").slideUp();
          parent.removeClass('active');
        } else {
          parent.find(".header__dropdown").slideDown();
          parent.addClass('active');
        }
    })

    $(".list-wrap").on("click",function () {
      if($(this).hasClass('active')) {
        $(this).find('.list').slideUp();
      } else {
        $(this).find('.list').slideDown();
      }
      $(this).toggleClass('active');
    });

    $('.button__close').on('click', function () {
      $('.header__nav').slideUp();
      $('.header__phone').removeClass('active');
      $('.header__burger').removeClass('active');
      $('.button__close').removeClass('active');
      $('.header__call').removeClass('active');
    })

    $('.header__burger').on('click', function () {
      $('.header__nav').slideDown();
      $('.header__phone').addClass('active');
      $('.header__burger').addClass('active');
      $('.button__close').addClass('active');
      $('.header__call').addClass('active');
    })
  }
})


//validation//
function validateForm() {
  if(document.querySelector(".application__form")) {
    const form = document.querySelector(".application__form");
    const name = document.querySelector(".name");
    const phone = document.querySelector(".phone-mask");
    const nameError = document.querySelector(".name + span.error");
    const phoneError = document.querySelector(".phone-mask + span.error");
  
    //name validate//
    name.addEventListener("input", function (event) {
      if (name.validity.valid) {
        nameError.textContent = "";
        nameError.className = "error";
        name.classList.remove('invalid')
      } else {
        showErrorName();
      }
    });
  
    function showErrorName() {
      if (name.validity.valueMissing) {
        nameError.textContent = "Поле не должно быть пустым";
      } else if (name.validity.patternMismatch) {
        nameError.textContent = "Имя не должно содержать цифры";
      } else if (name.validity.tooShort) {
        nameError.textContent = `Слишком короткое имя`;
      }
      nameError.className = "error active";
      name.classList.add('invalid')
    }
  
    //phone validate//
    phone.addEventListener("input", function (event) {
      if (phone.validity.valid) {
        phoneError.textContent = "";
        phoneError.className = "error";
        phone.classList.remove('invalid')
      } else {
        showErrorPhone();
      }
    });
  
    function showErrorPhone() {
      if (phone.validity.valueMissing) {
        phoneError.textContent = "Поле не должно быть пустым";
      }
      phoneError.className = "error active";
      phone.classList.add('invalid')
    }
  
    form.addEventListener("submit", function (event) {
      if (name.value == '' && phone.value == '') {
        event.preventDefault();
        phone.classList.add('invalid');
        name.classList.add('invalid');
        phoneError.textContent = "Заполните поле";
        nameError.textContent = "Заполните поле";
        return;
      } else {
        event.preventDefault();
        $.ajax();
        name.value ='';
        phone.value ='';
        modalSuccess.classList.add('active')
      }
    });
  }
  
}

validateForm();

if(document.querySelector(".calculator__form")) {
  const form = document.querySelector(".calculator__form");
  const square = document.querySelector(".square");
  const lamps = document.querySelector(".lamps");
  const lights = document.querySelector(".lights");
  const squareError = document.querySelector(".square + span.error");
  const lampsError = document.querySelector(".lamps + span.error");
  const lightsError = document.querySelector(".lights + span.error");

  lights.addEventListener("input", function (event) {
    if (lights.validity.valid) {
      lightsError.textContent = "";
      lightsError.className = "error";
      lights.classList.remove('invalid')
    } else {
      showError();
    }
  });

  lamps.addEventListener("input", function (event) {
    if (lamps.validity.valid) {
      lampsError.textContent = "";
      lampsError.className = "error";
      lamps.classList.remove('invalid')
    } else {
      showError();
    }
  });

  square.addEventListener("input", function (event) {
    if (square.validity.valid) {
      squareError.textContent = "";
      squareError.className = "error";
      square.classList.remove('invalid')
    } else {
      showError();
    }
  });

  function showError() {
    if (!square.validity.valid) {
      if (square.validity.valueMissing) {
        squareError.textContent = "Поле не должно быть пустым";
      } else if (square.validity.patternMismatch) {
        squareError.textContent = "Необходимо ввести числовое значение";
      }
      squareError.className = "error active";
      square.classList.add('invalid')
    }
    if (!lights.validity.valid) {
      if (lights.validity.patternMismatch) {
        lightsError.textContent = "Необходимо ввести числовое значение";
      }
      lightsError.className = "error active";
      lights.classList.add('invalid')
    }
    if (!lamps.validity.valid) {
      if (lamps.validity.patternMismatch) {
        lampsError.textContent = "Необходимо ввести числовое значение";
      }
      lampsError.className = "error active";
      lamps.classList.add('invalid')
    }
  }

  form.addEventListener("submit", function (event) {
    if (square.value == '') {
      event.preventDefault();
      square.classList.add('invalid');
      squareError.textContent = "Заполните поле";
      return;
    } else {
      event.preventDefault();
      $.ajax();
      //modalSuccess.classList.add('active')
    }
  });
}

$('.widget__content-item').on('click', function () {
  $('.modal__application').addClass('active');
  validateForm()
})

$('#modal-open').on('click', function () {
  $('.modal__application').addClass('active');
  validateForm()
})

//tabs//

$('.catalog__button').on('click', function() {
  let id = $(this).attr('data-tab');
  let content = $('.catalog__slide[data-tab="'+ id +'"]');
  
  $('.catalog__button.active').removeClass('active'); // 1
  $(this).addClass('active'); // 2
  
  $('.catalog__slide').removeClass('active'); // 3
  content.addClass('active'); // 4
})


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

const slider2 = new Swiper('.catalog__slide-content-images', {
  slidesPerView: 'auto',
  spaceBetween: rem(4),
  watchOverflow: true,
  speed: 1000,
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

const slider11 = new Swiper('.modal-thumbs__swiper', {
  slidesPerView: 4,
  spaceBetween: rem(2),
  speed: 1000,
});

const btnContinue = document.querySelector('.modal__button')
const closeBtn = document.querySelector('.modal__close');
const closeBtn2 = document.querySelector('.modal2__close');
let slider = document.querySelector('.modal')
let sliderTwo = document.querySelector('.modal2')
let index;

$('.modal__close').on('click', function () {
  slider.classList.remove('active');
  if(modalSuccess.className.includes('active')) {
    modalSuccess.classList.remove('active');
  }
  if($('.modal__application').hasClass('active')) {
    $('.modal__application').addClass('active');
  }
})

if(btnContinue) {
  btnContinue.addEventListener('click', () => {
    modalSuccess.classList.remove('active');
  })
}
if(closeBtn2) {
  closeBtn2.addEventListener('click', () => {
    sliderTwo.classList.remove('active');
  })
}

const slider12 = new Swiper('.modal__swiper', {
  slidesPerView: 1,
  spaceBetween: rem(4),
  speed: 1000,
  navigation: {
    nextEl: '.modal-btn-next',
    prevEl: '.modal-btn-prev',
  },
  pagination: {
    el: '.modal-pagination .total',
    type: 'custom',
        renderCustom: function (swiper, current, total) {
          let totalRes2 = total >= 10 ? total : `/0${total}`;
          return totalRes2;
        },
  },
  thumbs: {
    swiper: slider11,
  },
});

let current3 = document.querySelector('.modal-pagination .current');
console.log(current3)
slider12.on('slideChange', function () {
  let ind2 = slider12.realIndex + 1;
  let indRes2 = ind2 >= 10 ? ind2 : `0${ind2}`;
    current3.innerText = indRes2; // Используйте .text() для изменения текста
});

document.addEventListener('click', (el) => {
  if(slider) {
    const modal = document.querySelector('.modal__wrapper');
    const notSlider = el.composedPath().includes(modal);
    const notModal = el.composedPath().includes(slider);
    if(slider.className.includes('active')) {
      if(notModal && !notSlider){
        slider.classList.remove('active');
      }
    }
  }
  if(modalSuccess) {
    const modal3 = document.querySelector('.submit > .modal__wrapper');
    const notModal3 = el.composedPath().includes(modal3);
    const notSuccess = el.composedPath().includes(modalSuccess);
    console.log(modal3)
    if(modalSuccess.className.includes('active')) {
      if(!notModal3 && !notSuccess){
        modalSuccess.classList.remove('active');
      }
    }
  }
  if(sliderTwo) {
    const modal2 = document.querySelector('.modal2__wrapper');
    const notSlider2 = el.composedPath().includes(modal2);
    const notModal2 = el.composedPath().includes(sliderTwo);

    if(sliderTwo.className.includes('active')) {
      if(notModal2 && !notSlider2){
        sliderTwo.classList.remove('active');
      }
    }
  }
})



const slider13 = new Swiper('.modal-thumbs2__swiper', {
  slidesPerView: 4,
  spaceBetween: rem(2),
  speed: 1000,
});

const slider14 = new Swiper('.modal2__swiper', {
  slidesPerView: 1,
  spaceBetween: rem(4),
  speed: 1000,
  navigation: {
    nextEl: '.modal2-btn-next',
    prevEl: '.modal2-btn-prev',
  },
  pagination: {
    el: '.modal2-pagination .total',
    type: 'custom',
        renderCustom: function (swiper, current, total) {
          let totalRes2 = total >= 10 ? total : `/0${total}`;
          return totalRes2;
        },
  },
  thumbs: {
    swiper: slider13,
  },
});

let current4 = document.querySelector('.modal2-pagination .current');

slider14.on('slideChange', function () {
  let ind2 = slider14.realIndex + 1;
  let indRes2 = ind2 >= 10 ? ind2 : `0${ind2}`;
    current4.innerText = indRes2; // Используйте .text() для изменения текста
});

// document.addEventListener('click', (el) => {
//   const modal = document.querySelector('.modal__wrapper');
//   const notSlider = el.composedPath().includes(modal);
//   const notModal = el.composedPath().includes(sliderTwo);
//     if(sliderTwo.className.includes('active')) {
//       if(notModal && !notSlider){
//         sliderTwo.classList.remove('active');
//       }
//     }
// })

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
  },
  on: {
    click: function (e) {
      if(e.clickedSlide !== undefined) {
        slider.classList.add('active');
        index = e.clickedIndex;
        slider12.slideTo(index, 0);
        slider12.update();
      }
    },
  }
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