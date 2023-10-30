'use strict';
import Swiper from 'swiper/bundle';
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

const slider = new Swiper('.exclusivity-swiper', {
  direction: 'horizontal',
  slidesPerView: 3.2,
  spaceBetween: rem(4),
  centeredSlides: true,
  autoHeight: true,
  effect: 'coverflow', // Эффект, который увеличит активный слайд
  coverflowEffect: {
    rotate: 0, // Угол вращения
    //stretch: rem(17.3), // Расстояние между активным слайдом и соседними
    depth: 0, // Глубина эффекта
    modifier: 3, // Множитель для увеличения эффекта
    slideShadows: false,
  },
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
  on: {
    beforeInit: function () {
      var slides = this.slides;
      var activeIndex = this.activeIndex;

      for (var i = 0; i < slides.length; i++) {
        if (i === activeIndex) {
          slides[i].style.marginRight = rem(17.3);
          slides[i].style.marginLeft = rem(17.3);
        } else {
          slides[i].style.marginRight = rem(4);
        }
      }
    },
    slideChangeTransitionEnd: function () {
      var slides = this.slides;
      var activeIndex = this.activeIndex;

      for (var i = 0; i < slides.length; i++) {
        if (i === activeIndex) {
          slides[i].style.marginRight = rem(17.3);
          slides[i].style.marginLeft = rem(17.3);
        } else {
          slides[i].style.marginRight = rem(4);
        }
      }
    }

    //   slides.each(function (index, slide) {
    //     if (slide.classList.contains('swiper-slide-active')) {
    //       slide.style.marginRight = rem(17.3); // Расстояние для активного слайда
    //       slide.style.marginLeft = rem(17.3); 
    //     } else {
    //       slide.style.marginRight = rem(4); ; // Фиксированное расстояние для остальных слайдов
    //     }
    //   });
    // },
    // slideChangeTransitionEnd: function () {
    //   var slides = this.slides;

    //   slides.each(function (index, slide) {
    //     if (slide.classList.contains('swiper-slide-active')) {
    //       slide.style.marginRight = rem(17.3); // Расстояние для активного слайда
    //       slide.style.marginLeft = rem(17.3); // Расстояние для активного слайда
    //     } else {
    //       slide.style.marginRight = rem(4); // Фиксированное расстояние для остальных слайдов
    //     }
    //   });
    // },
  }
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

const slider3 = new Swiper('.catalog__swiper', {
  slidesPerView: 1,
  spaceBetween: rem(1),
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  speed: 1000,
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
    slider3.slideTo(idx);
  })
})