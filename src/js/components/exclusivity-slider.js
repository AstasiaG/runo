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
  const slideNum = slides[swiper.realIndex].querySelector('.num');

  const setTransform = (x, scale) => {
    return `translateX(${x}px) scale(${scale})`;
  };

  // set scale to the active slide
  slides[swiper.activeIndex].style.transform = `scale(${params.activeScale})`;
  slides[swiper.activeIndex].querySelector('.num').style.transform = 'translate(-0.8rem, 0.5rem) scale(0.8)';

  if (isEnd) {
    slides[slides.length - 2].style.transform = setTransform(
      slideTr / -2,
      params.scale
    );
    slides[slides.length - 2].querySelector('.num').style.transform = 'translate(6rem, -2.5rem) scale(2)'
  } else if (isStart) {
    slides[1].style.transform = setTransform(slideTr / 2, params.scale);
    slides[1].querySelector('.num').style.transform = 'translate(6rem, -2.5rem) scale(2)'
  } else {
    slides[swiper.activeIndex + 1].style.transform = setTransform(
      slideTr / 2,
      params.scale
    );
    slides[swiper.activeIndex - 1].style.transform = setTransform(
      slideTr / -2,
      params.scale
    );
    slides[swiper.activeIndex + 1].querySelector('.num').style.transform = 'translate(6rem, -2.5rem) scale(2)'
    slides[swiper.activeIndex - 1].querySelector('.num').style.transform = 'translate(6rem, -2.5rem) scale(2)'
  }
};

// build slider
if (document.querySelector('.exclusivity-swiper')) {
  if(window.innerWidth > 769){
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
    const slideNum = slides[slider.realIndex].querySelector('.num');
    slider.on('slideChange', function () {
      //console.log(slides[slider.realIndex].querySelector('.num'))
      if(slider.realIndex - 1 < slides.length) {
        let ind = slides.length - (slider.realIndex);
        let indRes = ind >= 10 ? ind : `0${ind}`;
        curnum.innerHTML = indRes;
        //slides[slider.realIndex].style.fontSize = '3.2rem';
      } else {
        curnum.innerHTML = '01';
      }
    });
  }

  if(window.innerWidth < 769) {
    const sliderContainer = document.querySelector('.exclusivity__slider');
    const slides = Array.from(sliderContainer.children);
    console.log(slides);
    slides.reverse();
    console.log(slides)
    sliderContainer.innerHTML = '';
    slides.forEach(slide => {
      sliderContainer.appendChild(slide);
    });

    const slider = new Swiper('.exclusivity-swiper', {
      speed: 1000,
      spaceBetween: 40,
      slidesPerView: 1,
      centeredSlides: true,
      allowTouchMove: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,

  
      pagination: {
        el: '.exclusivity-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }
}
