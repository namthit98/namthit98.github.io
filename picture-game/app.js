$(document).ready(function() {

  // GET DOM
  const currentLevel = $(".setting__choose-level p")[0];
  const input = $(".setting__choose-image input");
  const rangeEl = $(".setting__input-range");
  const imagePreview = $(".setting__preview-image img");
  const loaderGameArea = $(".game-area .loader");
  const loaderPreview = $(".setting__preview-image .loader");
  const btn = $(".btn-start");
  const pieces = $(".pieces");
  const imageArea = $(".image");
  const bg = $(".bg");

  // CREATE VARIABLES
  const width = imageArea.width();
  const height = imageArea.height();
  let currentImg;
  let columns = rows = rangeEl.val();

  let x = 0;
  let y = 0;
  let times = columns * rows;
  let increaseX = width / columns;
  let increaseY = height / rows;
  let zIndex = 10000;
  let draging;

  // DISABLE START BUTTON
  btn.attr("disabled", true);

  // GET CURRENT LEVEL
  currentLevel.textContent = rangeEl.val();

  // GET LEVEL AND UPDATE 'COLUMNS' AND 'ROWS' VARIABLE
  rangeEl.on("input", function() {
    currentLevel.textContent = this.value;
    columns = rows = this.value;
  });


  // GET IMAGE FROM CLIENT
  $(".setting__input-file").change(function() {

    // SHOW LOADER
    loaderPreview.css("display", "block");

    // GET IMAGE, AND SHOW PREVIEW
    getImg(this)
    .then(function(img) {
      imagePreview.attr("src", img);  

      currentImg = img;   // SAVE IMAGE TO currentImage

      btn.attr("disabled", false);
    })
    .then(function() {
      loaderPreview.css("display", "none");
    })
  });


  // START GAME
  btn.click(function() {
    startGame(currentImg);
  });


  function getImg(input) {
    return new Promise(function(resolve, reject) {
      if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function(e) {
          resolve(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      } else {
        reject(new Error("Don't load image ...."));
      }
    });
  }

  function startGame() {
    // CONFIG UI
    configStartGame();

    return breathe.times(times, createPieces)
    .then(function() {
      x = 0;
      y = 0;
      return breathe.times(times, createImageArea)
    }).then(configEnd);
  }

  function configStartGame() {
    imageArea.css("grid-template-columns", `repeat(${columns}, 1fr)`);
    imageArea.css("grid-template-rows", `repeat(${rows}, 1fr)`);
    imageArea.css("background-color", "#fff");

    btn.attr("disabled", true);
    btn.text("Reset");
    bg.css("display", "block");
    input.attr("disabled", true);    
    loaderGameArea.css("display", "block");

    pieces.html("");
    imageArea.html("");

    x = 0;
    y = 0;
    times = columns * rows;
    increaseX = width / columns;
    increaseY = height / rows;
  }

  function createPieces(i) {
    let maxTop;
    let maxLeft;

    if (columns < 5) {
      maxTop = 50;
      maxLeft = 25;
    } else if(columns < 15) {
      maxTop = 60;
      maxLeft = 50;
    } else if (columns < 20) {
      maxTop = 70;
      maxLeft = 40;
    } else if (columns <= 50) {
      maxTop = 90;
      maxLeft = 80;
    }

    if (i % columns === 0 && i !== 0) {
      y += increaseY;
      x = 0;
    }

    x = i * increaseX;

    let el = document.createElement("div");

    el.className = "el";

    el.setAttribute("data-id", i);

    el.style.backgroundImage = `url("${currentImg}")`;

    el.style.backgroundSize = `${width}px ${height}px`;

    el.style.backgroundPositionX = `-${x}px`;
    el.style.backgroundPositionY = `-${y}px`;

    el.style.position = "absolute";
    el.style.top = `${Math.floor(Math.random() * (maxTop - 5 + 1)) + 5}%`;
    el.style.left = `${Math.floor(Math.random() * (maxLeft - 5 + 1)) + 5}%`;
    el.style.width = increaseX + "px";
    el.style.height = increaseY + "px";

    el.style.zIndex = `${Math.floor(Math.random() * (100 - 0 + 1)) + 0}`;

    $(el).draggable({
      containment: ".game-area",
      scroll: false,
      zIndex: 1000000000,
      start: function(e) {
        draging = e;
      },
      stop: function(e) {
        const el = e.target;
        el.style.zIndex = `${zIndex++}`;
      }
    });

    pieces.append(el);
  }

  function createImageArea(i) {
    if (i % columns === 0 && i !== 0) {
      y += increaseY;
      x = 0;
    }

    x = i * increaseX;

    let el = document.createElement("div");

    el.className = "el";

    el.setAttribute("data-id", i);

    el.style.backgroundSize = `${width}px ${height}px`;

    el.style.backgroundPositionX = `-${x}px`;
    el.style.backgroundPositionY = `-${y}px`;

    $(el).droppable({
      drop: function(e) {
        const el = draging.target;
        if (el.dataset.id === e.target.dataset.id) {
          el.remove();
          e.target.style.backgroundImage = `url("${currentImg}")`;
        }
      },
      over: function(e) {
        const el = draging.target;
        if (el.dataset.id === e.target.dataset.id) {
          el.style.border = "10px solid #DB261D";
        } else {
          el.style.border = "1px solid transparent";
        }
      }
    });

    imageArea.append(el);
  }

  function configEnd() {
    loaderGameArea.css("display", "none");
    btn.attr("disabled", false);
    input.attr("disabled", false);
    bg.css("display", "none");
  }

});
