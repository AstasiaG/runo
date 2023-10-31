import Swiper from 'swiper/bundle';

const initSlider = swiper => {
  // object with parameters
  const params = {
    // gap between the slides
    gap: 40,
    // scale for common slides
    scale: 1,
    // scale for the active one
    activeScale: 3.3,
    // slides per view
    amount: 3,
  }

  // main variables
  const slides = swiper.slides
  // array with previous slides
  const prevSlides = []
  // array with next slides
  const nextSlides = []
  // single slide width
  const slideWidth = swiper.el.offsetWidth / params.amount
  // empty space that scale() makes for a common slide
  const emptySpace = slideWidth - slideWidth * params.scale
  // space that scale() makes for the active slide from both sides (divided by 2)
  const additionalSpace =
    params.activeScale !== 1
      ? Math.abs(
          (slideWidth * params.activeScale - slideWidth * params.scale) / 2 -
            emptySpace
        )
      : Math.abs(slideWidth - slideWidth * params.scale - emptySpace / 2)

  // set scale to the active slide
slides[swiper.activeIndex].style.transform = `scale(${params.activeScale})`

  // push slides into arrays
  slides.forEach(slide => {
    if (slides.indexOf(slide) < swiper.activeIndex) {
      prevSlides.push(slide)
    } else if (slides.indexOf(slide) > swiper.activeIndex) {
      nextSlides.push(slide)
    }
  })
  // function, that calculates translateX for every slide
  const setTransform = (arr, isNext) => {
    console.log(arr[1]);
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i]
        const x0 =
          params.activeScale !== 1
            ? additionalSpace + params.gap
            : additionalSpace - params.gap
        const x1 =
          params.activeScale !== 1
            ? emptySpace - x0 - params.gap
            : x0 + emptySpace - params.gap
        const x2 = emptySpace + x1 - params.gap
        arr[1].style.transform = `translateX(${isNext ? -x1 : x1}px) scale(${
          params.scale
        })`
        arr[2].style.transform = `translateX(${isNext ? -x2 : x2}px) scale(${
          params.scale
        })`
        if (params.activeScale !== 1) {
          arr[0].style.transform = `translateX(${isNext ? x0 : -x0}px) scale(${
            params.scale
          })`
        } else {
          arr[0].style.transform = `translateX(${isNext ? -x0 : x0}px) scale(${
            params.scale
          })`
        }
        if (i > 2) {
          const prevGap = arr[i - 1].style.transform
            .split(' ')[0]
            .match(/\d+/g)
            .join('.')
          if (!isNext) {
            const x3 = x2 > 0 ? Number(prevGap) : Number(prevGap) * -1
            el.style.transform = `translateX(${
              x3 + emptySpace - params.gap
            }px) scale(${params.scale})`
          } else {
            const x3 = x2 > 0 ? Number(prevGap) * -1 : Number(prevGap)
            el.style.transform = `translateX(${
              x3 - emptySpace + params.gap
            }px) scale(${params.scale})`
          }
        }
      }
    }
  }

  prevSlides.reverse()
  setTransform(prevSlides, 0)
  setTransform(nextSlides, 1)
}

// build slider
new Swiper('.exclusivity-swiper', {
      loop: true,
      speed: 1000,
      spaceBetween: 0,
      slidesPerView: 3,
      centeredSlides: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,

      // navigation
      navigation: {
        prevEl: '.exclusivity-btn-prev',
        nextEl: '.exclusivity-btn-next',
      },

      // events
      on: {
        afterInit: swiper => {
            initSlider(swiper)
        },
        slideChange: swiper => {
            initSlider(swiper)
        },
      },
    })