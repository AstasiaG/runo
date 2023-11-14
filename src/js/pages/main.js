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

if(window.innerWidth > 768) {
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
}

// $('.widget__content-item #calculator-modal').on('click', function (event) {
//   if(!$('.calculator')) {
//     event.preventDefault();
//     modalCalculator();
//   }
// })

//tables//

$('.prices-table__line:nth-child(n + 12)').hide();
$('.prices-table__content-item:nth-child(n + 7)').hide();

$('.prices-table__btn').on('click', function () {
  $('.prices-table__table').toggleClass('active');
  $('.prices-table__content').toggleClass('active');
  if($('.prices-table__table').hasClass('active')) {
    $('.prices-table__line:nth-child(n + 12)').slideDown();
    $('.prices-table__btn').text('Скрыть');
  } 
  if($('.prices-table__content').hasClass('active')) {
    $('.prices-table__content-item:nth-child(n + 7)').slideDown();
    $('.prices-table__btn').text('Скрыть');
  }
  if(!$('.prices-table__content').hasClass('active')) {
    $('.prices-table__content-item:nth-child(n + 7)').slideUp();
    $('.prices-table__btn').text('Скрыть');
  }
  if(!$('.prices-table__table').hasClass('active')){
    $('.prices-table__line:nth-child(n + 12)').slideUp();
    $('.prices-table__btn').text('Посмотреть еще');
  }
})

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

//modals//
let scrollY = 0;

function openModal() {
  scrollY = window.scrollY;
  const body = document.body;
  body.style.height = '100vh';
  body.style.overflowY = 'hidden';
  if(window.innerWidth > 768) {
    body.style.paddingRight = '15px';
  }
}

function closeModal() {
  const body = document.body;
  body.style.position = '';
  body.style.top = '';
  body.style.height = '';
  body.style.overflowY = '';
  body.style.paddingRight = '';
  window.history.replaceState(null, null, window.location.pathname + window.location.search);
  window.scrollTo(0, scrollY);
}

function modalApplication() {
  $('.modal__application').addClass('active');
  openModal();
  const formModal = document.querySelector(".application__form-modal");
  const nameModal = document.querySelector(".name-modal");
  const phoneModal = document.querySelector(".phone-modal");
  const nameErrorModal = document.querySelector(".name-modal + span.error");
  const phoneErrorModal = document.querySelector(".phone-modal + span.error");

  //name validate//
  nameModal.addEventListener("input", function (event) {
    if (nameModal.validity.valid) {
      nameErrorModal.textContent = "";
      nameErrorModal.className = "error";
      nameModal.classList.remove('invalid')
    } else {
      showErrorNameModal();
    }
  });

  function showErrorNameModal() {
    if (nameModal.validity.valueMissing) {
      nameErrorModal.textContent = "Поле не должно быть пустым";
    } else if (nameModal.validity.patternMismatch) {
      nameErrorModal.textContent = "Имя не должно содержать цифры";
    } else if (nameModal.validity.tooShort) {
      nameErrorModal.textContent = `Слишком короткое имя`;
    }
    nameErrorModal.className = "error active";
    nameModal.classList.add('invalid')
  }

  //phone validate//
  phoneModal.addEventListener("input", function (event) {
    if (phoneModal.validity.valid) {
      phoneErrorModal.textContent = "";
      phoneErrorModal.className = "error";
      phoneModal.classList.remove('invalid')
    } else {
      showErrorPhoneModal();
    }
  });

  function showErrorPhoneModal() {
    if (phoneModal.validity.valueMissing) {
      phoneErrorModal.textContent = "Поле не должно быть пустым";
    }
    phoneErrorModal.className = "error active";
    phoneModal.classList.add('invalid')
  }

  formModal.addEventListener("submit", function (event) {
    event.preventDefault();
    if (nameModal.value == '' && phoneModal.value == '') {
      phoneModal.classList.add('invalid');
      nameModal.classList.add('invalid');
      phoneErrorModal.textContent = "Заполните поле";
      phoneErrorModal.className = "error active";
      nameErrorModal.textContent = "Заполните поле";
      nameErrorModal.className = "error active";
      return;
    } else {
      $.ajax();
      nameModal.value ='';
      nameErrorModal.textContent = "";
      nameErrorModal.className = "error";
      nameModal.classList.remove('invalid')
      phoneModal.value ='';
      phoneErrorModal.textContent = "";
      phoneErrorModal.className = "error";
      phoneModal.classList.remove('invalid')
      $('.modal__application').removeClass('active');
      modalSuccess.classList.add('active')
      openModal();
    }
  });
}

function modalCalculator() {
  $('.modal__calculator').addClass('active');
  openModal();
  const form = document.querySelector(".calculator__form-modal");
  const square = document.querySelector(".square-modal");
  const lamps = document.querySelector(".lamps-modal");
  const lights = document.querySelector(".lights-modal");
  const squareError = document.querySelector(".square-modal + span.error");
  const lampsError = document.querySelector(".lamps-modal + span.error");
  const lightsError = document.querySelector(".lights-modal + span.error");

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
    event.preventDefault();
    if (square.value == '') {
      square.classList.add('invalid');
      squareError.className = "error active";
      squareError.textContent = "Заполните поле";
      return;
    } else {
      $.ajax();
      squareError.textContent = "";
      squareError.className = "error";
      square.classList.remove('invalid');
      $('.modal__calculator').removeClass('active');
      modalApplication();
    }
  });
}

$('#modal-application').on('click', function () {
  modalApplication();
});

$('#modal-calc').on('click', function () {
  modalCalculator();
});

function initModalSwiper(el, indexSlide = 0) {
  $('.modal2__swiper .swiper-slide').html('');
  $('.modal-thumbs2__swiper .swiper-slide').html('');
  const container = el.closest('.catalog__slide').find('.catalog__slide-big');
  const slide1 = container.html();
  const container2 = el.closest('.catalog__slide').find('.catalog__slide-small');
  //$('.modal2__swiper .swiper-slide')[0].html(slide1);
  $('.modal2__swiper .swiper-slide').each((index,element) => {
    if(index > 0){
      let idx = index - 1;
      let slideHtml = container2.eq(idx).html();
      element.innerHTML = slideHtml;
    }
    if(index == 0) {
      element.innerHTML = slide1;
    }
  })
  $('.modal-thumbs2__swiper .swiper-slide').each((index,element) => {
    if(index > 0){
      let idx = index - 1;
      let slideHtml = container2.eq(idx).html();
      element.innerHTML = slideHtml;
    }
    if(index == 0) {
      element.innerHTML = slide1;
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
      current4.innerText = indRes2;
  });
  slider14.slideTo(indexSlide);
}

$('.catalog__slide-big').on('click', function () {
  initModalSwiper($(this));
  $(`.modal2`).addClass('active');
  openModal();
})

$('.catalog__slide-small').on('click', function () {
  const elements = $(this).closest('.catalog__slide-content-images-wr').children();
  const indx = elements.index($(this)) + 1;
  initModalSwiper($(this), indx);
  $(`.modal2`).addClass('active');
  openModal();
})

$('.widget__content-item #calculator-modal').on('click', function (event) {
  if(!$('.calculator')) {
    event.preventDefault();
    modalCalculator();
  }
})

let slider = document.querySelector('.modal')
let sliderTwo = document.querySelector('.modal2')
let index;

if($('.modal__close').length) {
  $('.modal__close').on('click', function () {
    if($(this).closest('.modal').hasClass('active')) {
      $(this).closest('.modal').removeClass('active');
      closeModal();
    }
    if($(this).closest('.modal2').hasClass('active')) {
      $(this).closest('.modal2').removeClass('active');
      closeModal();
    }
  });
}

if($('.modal__button').length) {
  $('.modal__button').on('click', function () {
    if($(this).closest('.modal').hasClass('active')) {
      $(this).closest('.modal').removeClass('active');
      closeModal();
    }
  })
}

document.addEventListener('click', (el) => {
  if(slider) {
    const modal = document.querySelector('.modal__wrapper');
    const notSlider = el.composedPath().includes(modal);
    const notModal = el.composedPath().includes(document.querySelector('.modal'));
    if(slider.className.includes('active')) {
      if(notModal && !notSlider){
        slider.classList.remove('active');
        closeModal();
      }
    }
    if($('.modal.submit').hasClass('active')) {
      if(notModal && !notSlider){
        $('.modal.submit').removeClass('active');
        closeModal();
      }
    }
  }
  if(sliderTwo) {
    const modal = document.querySelector('.modal2__wrapper');
    const notSlider = el.composedPath().includes(modal);
    const notModal = el.composedPath().includes(document.querySelector('.modal2'));
    if(sliderTwo.className.includes('active')) {
      if(notModal && !notSlider){
        sliderTwo.classList.remove('active');
        closeModal();
      }
    }
  }
  // if($('.modal.submit')) {
  //   const modal = $('.modal__wrapper');
  //   const notSlider = el.composedPath().includes(modal);
  //   const notModal = el.composedPath().includes($('.modal'));
  //   if($('.modal.submit').hasClass('active')) {
  //     if(notModal && !notSlider){
  //       $('.modal.submit').removeClass('active');
  //       closeModal();
  //     }
  //   }
  // }
})


//validation//
$(function() {
  if(document.querySelector(".application .application__form")) {
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
      event.preventDefault();
      if (name.value == '' && phone.value == '') {
        phone.classList.add('invalid');
        name.classList.add('invalid');
        phoneError.textContent = "Заполните поле";
        phoneError.className = "error active";
        nameError.textContent = "Заполните поле";
        nameError.className = "error active";
        return;
      } else {
        $.ajax();
        name.value ='';
        phone.value ='';
        modalSuccess.classList.add('active')
        openModal();
      }
    });
  }
})

$(function() {
  if(document.querySelector(".calculator .calculator__form")) {
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
        squareError.className = "error active";
        squareError.textContent = "Заполните поле";
        return;
      } else {
        event.preventDefault();
        $.ajax();
        $('.modal__calculator').removeClass('active');
        $('.modal__application').addClass('active');
      }
    });
  }
})

//tabs//

$('.catalog__button').on('click', function() {
  let id = $(this).attr('data-tab');
  let content = $('.catalog__slide[data-tab="'+ id +'"]');
  
  $('.catalog__button.active').removeClass('active');
  $(this).addClass('active');
  
  $('.catalog__slide').removeClass('active');
  content.addClass('active');
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
$('.banner__swiper').on('click', '.banner__button', function () {
  modalApplication();
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
  // on: {
  //   click: function (swiper) {
  //     //console.log(swiper.clickedSlide.closest());
  //     let slide = $('.catalog__slide-small');
  //     let ind = swiper.realIndex + 1;
  //     initModalSwiper(slide, ind);
  //     $('.modal2').addClass('active');
  //     openModal();
  //   }
  // }
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
  pagination: {
    el: '.team-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 3.3,
      spaceBetween: rem(4),
    },
    210: {
      slidesPerView: 1,
      spaceBetween: rem(1),
    }
  }
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
    prevEl: '.product__thumbs-btn-prev',
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
  pagination: {
    el: '.product__images-pagination',
    type: 'bullets',
    clickable: true,
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
  pagination: {
    el: '.benefits-details-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 2,
      spaceBetween: rem(4),
    },
    210: {
      slidesPerView: 1,
      spaceBetween: rem(1),
    }
  }
});

const slider11 = new Swiper('.modal-thumbs__swiper', {
  slidesPerView: 4,
  spaceBetween: rem(2),
  speed: 1000,
});

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
slider12.on('slideChange', function () {
  let ind2 = slider12.realIndex + 1;
  let indRes2 = ind2 >= 10 ? ind2 : `0${ind2}`;
    current3.innerText = indRes2;
});

// const slider13 = new Swiper('.modal-thumbs2__swiper', {
//   slidesPerView: 4,
//   spaceBetween: rem(2),
//   speed: 1000,
// });

// const slider14 = new Swiper('.modal2__swiper', {
//   slidesPerView: 1,
//   spaceBetween: rem(4),
//   speed: 1000,
//   navigation: {
//     nextEl: '.modal2-btn-next',
//     prevEl: '.modal2-btn-prev',
//   },
//   pagination: {
//     el: '.modal2-pagination .total',
//     type: 'custom',
//         renderCustom: function (swiper, current, total) {
//           let totalRes2 = total >= 10 ? total : `/0${total}`;
//           return totalRes2;
//         },
//   },
//   thumbs: {
//     swiper: slider13,
//   },
// });

// let current4 = document.querySelector('.modal2-pagination .current');
// slider14.on('slideChange', function () {
//   let ind2 = slider14.realIndex + 1;
//   let indRes2 = ind2 >= 10 ? ind2 : `0${ind2}`;
//     current4.innerText = indRes2;
// });

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
        openModal();
        index = e.clickedIndex;
        slider12.slideTo(index, 0);
        slider12.update();
      }
    },
  }
});

const slider15 = new Swiper('.steps-main .steps__content-list', {
  direction: 'vertical',
  slidesPerView: 4,
  autoHeight: true,
  spaceBetween: rem(6),
  speed: 1000,
  pagination: {
    el: '.steps-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 4,
      spaceBetween: rem(6),
    },
    210: {
      autoHeight: false,
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: rem(1),
    }
  },
})

const slider16 = new Swiper('.steps-services .steps__content-list', {
  direction: 'vertical',
  slidesPerView: 'auto',
  spaceBetween: rem(0),
  speed: 1000,
  pagination: {
    el: '.steps-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 'auto',
      spaceBetween: rem(0),
    },
    210: {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: rem(1),
    }
  },
})

const slider17 = new Swiper('.achievements__list', {
  direction: 'vertical',
  slidesPerView: 'auto',
  spaceBetween: rem(0),
  speed: 1000,
  pagination: {
    el: '.achievements__list-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 'auto',
      spaceBetween: rem(0),
    },
    210: {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: rem(1),
    }
  },
})

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

if(document.querySelector('.select-modal')) {
  const select = new Choices('.select-modal', {
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


// $(document).on('click', function(event) {
//   if ($('.modal.active').length > 0) {
//     const modalWrapper = $('.modal__wrapper');
//     const notModal = !$(event.target).closest('.modal');
//     const notSlider = !$(event.target).closest(modalWrapper);

//     if (notModal && notSlider) {
//       $('.modal.active').removeClass('active');
//       closeModal();
//     }
//   }
// });
//   if(modalSuccess) {
//     const modal3 = document.querySelector('.submit > .modal__wrapper');
//     const notModal3 = el.composedPath().includes(modal3);
//     const notSuccess = el.composedPath().includes(modalSuccess);
//     console.log(modal3)
//     if(modalSuccess.className.includes('active')) {
//       if(!notModal3 && !notSuccess){
//         modalSuccess.classList.remove('active');
//         closeModal();
//       }
//     }
//   }
//   if(sliderTwo) {
//     const modal2 = document.querySelector('.modal2__wrapper');
//     const notSlider2 = el.composedPath().includes(modal2);
//     const notModal2 = el.composedPath().includes(sliderTwo);

//     if(sliderTwo.className.includes('active')) {
//       if(notModal2 && !notSlider2){
//         sliderTwo.classList.remove('active');
//         closeModal();
//       }
//     }
//   }
// })