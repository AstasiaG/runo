'use strict';
import Swiper from 'swiper/bundle';
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

$(".dropdown").find('.header__dropdown').hide();
$(".dropdown").on("mouseenter",
  function () {
    clearTimeout(timer);
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
// .on("click",function () {
//   let hide = $('.header__dropdown-catalog-content');
//   hide.slideToggle();
//   $(this).toggleClass('active')
// });

//sliders

const slider1 = new Swiper('.baner__swiper', {
  slidesPerView: 1.18,
  spaceBetween: rem(0),
  loop: true,
  slideToClickedSlide: true,
  parallax: true,
  navigation: {
    nextEl: '.baner-btn-next',
  },
  pagination: {
    el: '.baner-progress',
    type: 'progressbar',
    },
  speed: 1000,
});

const slider2 = new Swiper('.catalog__swiper', {
  slidesPerView: 1,
  spaceBetween: rem(1),
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  speed: 1000,
});

const slider3 = new Swiper('.sertificates__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: rem(4),
  speed: 1000,
  navigation: {
    nextEl: '.sertificates-btn-next',
    prevEl: '.sertificates-btn-prev',
  },
});

const slider4 = new Swiper('.reviews__swiper', {
  slidesPerView: 1,
  spaceBetween: rem(1),
  loop: true,
  speed: 1000,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: '.reviews-btn-next',
    prevEl: '.reviews-btn-prev',
  },
});

const catalogBtns = Array.from(document.querySelectorAll('.catalog__button'));
let idx;

catalogBtns.forEach(e => {
  e.addEventListener('click', () => {
    for(let i = 0; i < catalogBtns.length;i++){
      catalogBtns[i].classList.remove('active');
    }
    e.classList.add('active');
    idx = catalogBtns.indexOf(e);
    slider2.slideTo(idx);
  })
})

const select = new Choices('.select', {
	searchEnabled: false,
  position: 'bottom',
	itemSelectText: '',
	classNames: {
		containerOuter: 'choices select-choices',
	},
});