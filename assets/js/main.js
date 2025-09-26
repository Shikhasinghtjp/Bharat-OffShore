(function initNavbarFunctions() {
  "use strict";

  const selectBody = document.querySelector("body");
  const selectHeader = document.querySelector("#header");

  // Cache these selectors to avoid repeated DOM queries
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  const preloader = document.querySelector("#preloader");
  const scrollTop = document.querySelector(".scroll-top");

  // Throttle or debounce scroll events to reduce reflows
  let lastScrollY = 0;
  function toggleScrolled() {
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    ) return;

    const scrollY = window.scrollY;
    if (Math.abs(scrollY - lastScrollY) > 10) { // Only trigger if scroll has moved a significant amount
      if (scrollY > 100) {
        selectBody.classList.add("scrolled");
      } else {
        selectBody.classList.remove("scrolled");
      }
      lastScrollY = scrollY;
    }
  }
  window.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  // Mobile nav toggle
  function mobileNavToggle() {
    selectBody.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToggle);
  }

  // Hide mobile nav on same-page/hash links
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (selectBody.classList.contains("mobile-nav-active")) {
        mobileNavToggle();
      }
    });
  });

  // Preloader
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  // Scroll top button
  if (scrollTop) {
    function toggleScrollTop() {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  // Animation on scroll function and init
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  // Init swiper sliders
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  // Initiate glightbox
  const glightbox = glightbox({
    selector: ".glightbox",
  });
})();
