document.addEventListener("DOMContentLoaded", function() {
  const content = [
    "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos recusandae nihil obcaecati. Aut asperiores maiores earum doloribus at atque. Dolor suscipit necessitatibus ipsa, corporis optio numquam non fuga alias provident?",
    "2. Dolor suscipit necessitatibus ipsa, corporis optio numquam non fuga alias provident? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos recusandae nihil obcaecati. Aut asperiores maiores earum doloribus at atque.",
    "3. ng elit. Quos recusandae nihil obcaecati. Aut asperiores maiores earum doloribus at Lorem ipsum dolor sit amet consectetur adipisici atque. Dolor suscipit necessitatibus ipsa, corporis optio numquam non fuga alias provident?"
  ];

  // Select the node that will be observed for mutations
  let targetNode = document.querySelector(".slider__images");

  // Options for the observer (which mutations to observe)
  let config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  let callback = function(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type == "childList") {
        console.log("A child node has been added or removed.");
      } else if (mutation.type == "attributes") {
        let imgActive = document.querySelector(".slider__images img.active");
        if(imgActive) {
          document.querySelector(".slider__content--text").textContent = content[imgActive.dataset.order - 1];
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
});
