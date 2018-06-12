    ///////////////////////////////////////////
    /////////////Xử lý side-menu//////////////////
    ///////////////////////////////////////////
    document.querySelectorAll(".side-menu__submenu").forEach(function(el) {
      el.parentElement.addEventListener("click", function() {
        el.classList.toggle("side-menu__submenu--active");

        let icon = el.previousElementSibling.firstElementChild;

        if(icon.classList.contains("fa-plus-square")) {
          icon.className = "fas fa-minus-square";
        } else {
          icon.className = "fas fa-plus-square";
        }
      })
    })