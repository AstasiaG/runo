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

//dropdown//

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
      allowTouchMove: true,
      whatchOverflow: true,
      spaceBetween: rem(4),
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

  const slider2 = new Swiper('.catalog__swiper', {
    slidesPerView: 1,
    spaceBetween: rem(1),
    allowTouchMove: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1000,
    on: {
      slideChangeTransitionStart: function () {
        if(window.innerWidth < 769) {
          slider7.allowTouchMove = true;
        }
      },
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
      reachEnd: function () {
        document.querySelector('.catalog-btn-next').style.display = 'none';
      },
      fromEdge: function () {
        if(document.querySelector('.catalog-btn-next')) {
          document.querySelector('.catalog-btn-next').style.display = 'flex';
          document.querySelector('.catalog-btn-prev').style.display = 'flex';
        }
      },
      reachBeginning: function () {
        document.querySelector('.catalog-btn-prev').style.display = 'none';
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