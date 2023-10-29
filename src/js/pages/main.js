'use strict';
import Swiper from 'swiper/bundle';
window.$ = window.jQuery = require('jquery');

const rem = function (rem) {
  if (window.innerWidth > 768) {
    return 0.005208335 * window.innerWidth * rem;
  } else {
    // где 375 это ширина мобильной версии макета
    return (100 / 375) * (0.05 * window.innerWidth) * rem;
  }
}

$(".questions__item").each(function () {
  let hide = $(this).find('.questions__item-text');
  hide.hide();
  $(this).on("click",function () {
    hide.slideToggle();
    $(this).toggleClass('active')
  });
});

//sliders

const slider = new Swiper('.exclusivity-swiper', {
  slidesPerView: 3.2,
  spaceBetween: 40,
  centeredSlides: true,
  reverse: true,
  navigation: {
    nextEl: '.exclusivity-btn-next',
    prevEl: '.exclusivity-btn-prev',
  },
  pagination: {
    el: '.exclusivity-pagination .total',
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      let totalRes2 = total >= 10 ? total : `-0${total}`;
      return totalRes2;
    },
  },
  speed: 1000,
});
let curnum = document.querySelector('.exclusivity-pagination .current');
slider.on('slideChange', function () {
  let ind = slider.realIndex + 1,
    indRes = ind >= 10 ? ind : `0${ind}`;
  curnum.innerHTML = indRes;
});


const slider2 = new Swiper('.baner__swiper', {
  slidesPerView: 1.18,
  spaceBetween: rem(0),
  loop: true,
  navigation: {
    nextEl: '.baner-btn-next',
    // prevEl: '.exclusivity-btn-prev',
  },
  pagination: {
    el: '.baner-progress',
    type: 'progressbar',
    },
  // renderProgressbar: function (progressbarFillClass) {
  //   return '<span class="' + progressbarFillClass + '"></span>';
  // },
  speed: 1000,
});