document.addEventListener("DOMContentLoaded", function() {
  ///////////////////////////////////////////
  /////////////Xử lý slider//////////////////
  ///////////////////////////////////////////
  
  //Get button add and add event
  document.querySelector(".slider__content--control").addEventListener("click", function() {
    if(this.children[0].style.transform === '') {
      this.children[0].style.transform = "rotate(45deg)";
      this.parentElement.style.backgroundColor = "rgba(0, 0 ,0 , .8)";
      this.nextElementSibling.style.transform = "translateX(0%)";
    } else {
      this.children[0].style.transform = '';
      this.parentElement.style.backgroundColor = '';
      this.nextElementSibling.style.transform = "translateX(120%)";
    }
  })

  let check = true;
  let check2 = true;

  setInterval(function() {
    if(check2 === false) {
      let x = setTimeout(function() {
        check2 = true;
      }, 15000);

      return false;
    }

    let currentImg = document.querySelector(".active");
    let nextImg = document.querySelector(".active").nextElementSibling

    if(nextImg === null) {
      nextImg = document.querySelector(".slider__images img");
    }

    currentImg.classList.add("next-back");
    nextImg.classList.add("next-next");
    nextImg.classList.add("active");

    currentImg.addEventListener("webkitAnimationEnd", function() {
      this.classList.remove("next-back");
      this.classList.remove("active");
    })
    
    nextImg.addEventListener("webkitAnimationEnd", function() {
      this.classList.remove("next-next");
      this.classList.add("active");
    })
  }, 10000);

  //Get button next slide
  document.querySelector(".slider__controls--right").addEventListener("click", function() {
    if(check === false) return false;
    check = false;
    check2 = false;
    let count = 0;


    let currentImg = document.querySelector(".active");
    let nextImg = document.querySelector(".active").nextElementSibling

    if(nextImg === null) {
      nextImg = document.querySelector(".slider__images img");
    }

    currentImg.classList.add("next-back");
    nextImg.classList.add("next-next");
    nextImg.classList.add("active");

    currentImg.addEventListener("webkitAnimationEnd", function() {
      this.classList.remove("next-back");
      this.classList.remove("active");

      count++;
      if(count === 2) {
        check = true;
      }

    })
    
    nextImg.addEventListener("webkitAnimationEnd", function() {
      this.classList.remove("next-next");
      this.classList.add("active");

      count++;
      if(count === 2) {
        check = true;
      }
    })
  })

  //Get button next slide
  document.querySelector(".slider__controls--left").addEventListener("click", function() {
    if(check === false) return false;
    check = false;
    check2 = false;
    let count = 0;

    let currentImg = document.querySelector(".active");
    let prevImg = document.querySelector(".active").previousElementSibling;

    if(prevImg === null) {
      prevImg = document.querySelectorAll(".slider__images img")[document.querySelectorAll(".slider__images img").length - 1];
    }

    currentImg.classList.add("prev-back");
    prevImg.classList.add("prev-next");
    prevImg.classList.add("active");

    currentImg.addEventListener("webkitAnimationEnd", function() {
      this.classList.remove("prev-back");
      this.classList.remove("active");

      count++;
      if(count === 2) {
        check = true;
      }
    })
    
    prevImg.addEventListener("webkitAnimationEnd", function() {
      this.classList.remove("prev-next");
      this.classList.add("active");

      count++;
      if(count === 2) {
        check = true;
      }
    })
  })
})