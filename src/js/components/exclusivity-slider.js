import Swiper from 'swiper/bundle';
const initSlider = (swiper, isLooped) => {
  // object with parameters
  const params = {
    // gap between the slides
    gap: 30,
    // scale for common slides
    scale: 0.55,
    // scale for the active one
    activeScale: 1.46,
    // slides per view
    amount: 3,
  };

  // main variables
  const slides = swiper.slides;
  const slideWidth = swiper.el.offsetWidth / params.amount;
  const isEnd = swiper.activeIndex === slides.length - 1 ? true : false;
  const isStart = swiper.activeIndex === 0 ? true : false;
  const slideTr = slideWidth - slideWidth * params.scale;

  const setTransform = (x, scale) => {
    return `translateX(${x}px) scale(${scale})`;
  };

  // set scale to the active slide
  slides[swiper.activeIndex].style.transform = `scale(${params.activeScale})`;

  if (isEnd) {
    slides[slides.length - 2].style.transform = setTransform(
      slideTr / -2,
      params.scale
    );
  } else if (isStart) {
    slides[1].style.transform = setTransform(slideTr / 2, params.scale);
  } else {
    slides[swiper.activeIndex + 1].style.transform = setTransform(
      slideTr / 2,
      params.scale
    );
    slides[swiper.activeIndex - 1].style.transform = setTransform(
      slideTr / -2,
      params.scale
    );
  }
};

// build slider
if (document.querySelector('.exclusivity-swiper')) {
  const slider = new Swiper('.exclusivity-swiper', {
    speed: 1000,
    spaceBetween: 0,
    slidesPerView: 3,
    centeredSlides: true,
    allowTouchMove: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,

    // navigation
    navigation: {
      prevEl: '.exclusivity-btn-next',
      nextEl: '.exclusivity-btn-prev',
    },

    pagination: {
      el: '.exclusivity-pagination .total',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        let totalRes2 = total >= 10 ? total : `-0${total}`;
        return totalRes2;
      },
    },

    // events
    on: {
      afterInit: swiper => {
        swiper.slideTo(4);
        setTimeout(() => {
          initSlider(swiper, false);
        }, 0);
      },
      slideChange: swiper => {
        initSlider(swiper, false);
      },
    },
  });
  let curnum = document.querySelector('.exclusivity-pagination .current');
  let slides = slider.slides;
  slider.on('slideChange', function () {
    console.log(slider.realIndex)
    if(slider.realIndex - 1 < slides.length) {
      let ind = slides.length - (slider.realIndex);
      let indRes = ind >= 10 ? ind : `0${ind}`;
      curnum.innerHTML = indRes;
    } else {
      curnum.innerHTML = '01';
    }
  });
}
