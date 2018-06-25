document.addEventListener("DOMContentLoaded", function() {
  let content = [
    "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos recusandae nihil obcaecati. Aut asperiores maiores earum doloribus at atque. Dolor suscipit necessitatibus ipsa, corporis optio numquam non fuga alias provident?",
    "2. Dolor suscipit necessitatibus ipsa, corporis optio numquam non fuga alias provident? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos recusandae nihil obcaecati. Aut asperiores maiores earum doloribus at atque.",
    "3. ng elit. Quos recusandae nihil obcaecati. Aut asperiores maiores earum doloribus at Lorem ipsum dolor sit amet consectetur adipisici atque. Dolor suscipit necessitatibus ipsa, corporis optio numquam non fuga alias provident?"
  ]

  document.querySelector(".slider__images").addEventListener('DOMSubtreeModified', function () {
    let imgActive = document.querySelector(".slider__images img.active");
    document.querySelector(".slider__content--text").textContent = content[imgActive.dataset.order - 1];
  }, false);

})