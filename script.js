function initMenu() {
  const headerWrapper = document.querySelector(".header__wrapper");
  const headerMenuBurger = document.querySelector(".header__menu--burger");

  let isActive = false;

  const toggleActive = () => {
    if (isActive) {
      headerMenuBurger.firstElementChild.src = "assets/burger-menu.svg";
    } else {
      headerMenuBurger.firstElementChild.src = "assets/cross.svg";
    }
    headerWrapper.classList.toggle("menu-active");
    isActive = !isActive;
  };

  headerMenuBurger.addEventListener("click", toggleActive);
}

initMenu();

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
  const track = document.querySelector(".video__slider");
  const items = Array.from(track.children);
  const prevBtn = document.querySelector(".video__slider-arrow-back");
  const nextBtn = document.querySelector(".video__slider-arrow-foward");
  const videoSliderButtons = document.querySelectorAll(".video__slider-button");
  const visibleCount = 4;
  const totalItems = items.length;
  const itemWidth = items[0].getBoundingClientRect().width + 10; // include margin
  let counter = 0;
  let index = 0;

  // Клонируем элементы для бесконечности
  for (let i = 0; i < visibleCount; i++) {
    track.appendChild(items[i].cloneNode(true));
    track.insertBefore(
      items[totalItems - 1 - i].cloneNode(true),
      track.firstChild
    );
  }

  const changeVideo = () => {
    const currentVideoSrc = track.children[index].src;
    const currentVideoPoster = track.children[index].poster;

    mainVideo.src = currentVideoSrc;
    mainVideo.poster = currentVideoPoster;
  };

  // Начальная позиция — смещение на "visibleCount" элементов вперёд
  track.style.transform = `translateX(${-itemWidth * visibleCount}px)`;
  index = visibleCount;
  let prevSliderNavigationButton = videoSliderButtons[counter];
  let isMoving = false;

  function moveTo(newIndex) {
    if (isMoving) return;
    isMoving = true;

    switch (newIndex) {
      case 9:
        counter = 0;
        break;
      case 3:
        counter = 4;
        break;
      default:
        counter = newIndex - 4;
    }

    prevSliderNavigationButton.classList.remove("video__slider-button--active");
    prevSliderNavigationButton = videoSliderButtons[counter];
    videoSliderButtons[counter].classList.add("video__slider-button--active");

    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-itemWidth * newIndex}px)`;
    index = newIndex;
    changeVideo();
  }

  track.addEventListener("transitionend", () => {
    isMoving = false;

    if (index >= totalItems + visibleCount) {
      track.style.transition = "none";
      index = visibleCount;
      track.style.transform = `translateX(${-itemWidth * index}px)`;
    }

    if (index < visibleCount) {
      track.style.transition = "none";
      index = totalItems + visibleCount - 1;
      track.style.transform = `translateX(${-itemWidth * index}px)`;
    }
  });

  nextBtn.addEventListener("click", () => moveTo(index + 1));
  prevBtn.addEventListener("click", () => moveTo(index - 1));
}

initVideoSection();

function initBeforeAfter() {
  const separator = document.querySelector(".explore__img-separator");
  const beforeImg = document.querySelector(".explore__img--after");
  let isDragging = false;

  separator.addEventListener("mousedown", (e) => {
    isDragging = true;
    document.body.style.userSelect = "none";
  });

  const myElement = document.querySelector(".explore__img-container");

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Ограничение внутри родителя
    const container = separator.parentElement;
    const rect = container.getBoundingClientRect();
    let newLeft = e.clientX - rect.left;

    // Границы
    newLeft = Math.max(
      0,
      Math.min(newLeft, rect.width - separator.offsetWidth)
    );

    let offsetX = e.clientX - rect.left;

    // Ограничим в пределах контейнера
    offsetX = Math.max(0, Math.min(offsetX, rect.width));

    const percent = (offsetX / rect.width) * 100;

    beforeImg.style.width = `${percent}%`;
    separator.style.left = `calc(${percent}% - 15px)`;
    myElement.style.setProperty("--left", `${percent}%`);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
  });
}

initBeforeAfter();
