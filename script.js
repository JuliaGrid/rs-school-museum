function initWelcomeSlider() {
  const sliderInfoCurrent = document.querySelector(".slider__info-current");
  const sliderInfoMax = document.querySelector(".slider__info-max");
  const sliderArrowsBack = document.querySelector(".slider__arrows-back");
  const sliderArrowsForward = document.querySelector(".slider__arrows-forward");
  const sliderNavigationButtons = document.querySelectorAll(
    ".slider__navigation-button"
  );
  const welcomeImg = document.querySelector(".welcome__img");

  const SLIDER_CONFIG = {
    imgFolder: "./assets/img/welcome-slider",
    imgFormat: "jpg",
    minCount: 1,
    maxCount: 5,
  };

  sliderInfoMax.textContent = `0${SLIDER_CONFIG.maxCount}`;

  let counter = SLIDER_CONFIG.minCount;
  let prevSliderNavigationButton = sliderNavigationButtons[0];

  const changeInfo = () => {
    welcomeImg.src = `${SLIDER_CONFIG.imgFolder}/${counter}.${SLIDER_CONFIG.imgFormat}`;
    sliderInfoCurrent.textContent = `0${counter}`;

    prevSliderNavigationButton.classList.remove("active-navigation");
    prevSliderNavigationButton = sliderNavigationButtons[counter - 1];
    sliderNavigationButtons[counter - 1].classList.add("active-navigation");
  };

  const increaseCounter = () => {
    if (counter < SLIDER_CONFIG.maxCount) {
      counter++;
    } else {
      counter = SLIDER_CONFIG.minCount;
    }
    changeInfo();
  };

  const decreaseCounter = () => {
    if (counter > SLIDER_CONFIG.minCount) {
      counter--;
    } else {
      counter = SLIDER_CONFIG.maxCount;
    }
    changeInfo();
  };

  sliderArrowsBack.addEventListener("click", decreaseCounter);
  sliderArrowsForward.addEventListener("click", increaseCounter);
}

initWelcomeSlider();

function initVideoSection() {
  const mainVideo = document.querySelector(".video__main");
  const videoSlides = document.querySelectorAll(".video__slide");
  const arrowBack = document.querySelector(".video__slider-arrow-back");
  const arrowFoward = document.querySelector(".video__slider-arrow-foward");

  // const track = document.querySelector(".video__slider");
  // const items = Array.from(track.children);
  // const itemWidth = items[0].offsetWidth + 10;

  let counter = 0;

  const VIDEO_CONFIG = {
    minCount: 0,
    maxCount: 5,
  };

  const changeVideo = () => {
    const currentVideoSrc = videoSlides[counter].src;
    console.log("currentVideoSrc", currentVideoSrc);
    mainVideo.src = currentVideoSrc;
  };

  const backClick = () => {
    counter--;
    changeVideo();
  };

  const fowardClick = () => {
    counter++;
    changeVideo();
  };

  arrowBack.addEventListener("click", backClick);
  arrowFoward.addEventListener("click", fowardClick);
}

initVideoSection();
