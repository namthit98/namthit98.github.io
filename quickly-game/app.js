let time = 0,
    maxSize,
    minSize = 100,
    maxTop ,
    minTop = 0,
    maxLeft,
    minLeft = 0,
    timeAnimation,
    score,
    level,
    heart,
    gameStart,
    currentLevel;

let scoreDOM = document.querySelector(".score"),
    hearts = document.querySelectorAll(".heart")
    btnPlay = document.querySelector(".btn-play")
    bg = document.querySelector(".bg");

const randomNumber = function(mode) {
  if (mode === "size") return Math.floor(Math.random() * (maxSize - minSize + 1) ) + minSize;
  if (mode === "top") return Math.floor(Math.random() * (maxTop - minTop + 1) ) + minTop;
  if (mode === "left") return Math.floor(Math.random() * (maxLeft - minLeft + 1) ) + minLeft;
}

const increaseScore = function() {
  score++;
}

const showScore = function() {
  scoreDOM.textContent = score;
}

const checkScore = function() {
  if (score < 1000) {
    if(level !== 1) {
      level = 1;
      createLevel(level);
    }
  } else if (score < 2000) {
    if(level !== 2) {
      level = 2;
      createLevel(level);
    }
  } else if (score < 4000) {
    if(level !== 3) {
      level = 3;
      createLevel(level);
    }
  } else if (score < 10000) {
    if(level !== 4) {
      level = 4;
      createLevel(level);
    }
  } else if (score < 15000) {
    if(level !== 5) {
      level = 5;
      createLevel(level);
    }
  }
}

const checkHeart = function() {
  console.log(heart);
  if (hearts[heart]) {
    if (heart === 0) {
      hearts[heart].style.fill = "#000";
      endGame();
    } else {
      hearts[heart].style.fill = "#000";
    }
  }
}

const newGame = function() {
  score = 0;
  level = 0;
  heart = 5;
  hearts.forEach(function(el) {
    el.style.fill = "#DB261D";
  })

  gameStart = setInterval(function() {

    // Update score
    increaseScore();
    showScore();
  
    // Check score to update level
    checkScore();
  
    // Check heart
    checkHeart();
  }, 1)
}

const endGame = function() {
  clearInterval(gameStart);
  clearInterval(currentLevel);

  btnPlay.style.opacity = "1";
  btnPlay.style.visibility = "visible";
  btnPlay.textContent = "Play again";
  bg.style.opacity = "1";
  bg.style.visibility = "visible";
}

const randomColor = function() {
  const numberA = Math.floor(Math.random() * (255 - 0 + 1) ) + 0;
  const numberB = Math.floor(Math.random() * (255 - 0 + 1) ) + 0;
  const numberC = Math.floor(Math.random() * (255 - 0 + 1) ) + 0;

  return `rgb(${numberA}, ${numberB}, ${numberC})`;
}

const createCircle = function() {
  const circle = document.createElement("div");
  circle.className = "circle";
  circle.style.backgroundColor = randomColor();
  circle.style.top = `${randomNumber("top")}%`;
  circle.style.left = `${randomNumber("left")}%`;
  circle.style.width = circle.style.height = `${randomNumber("size")}px`;
  circle.style.animation =  `invisible ${timeAnimation}s both ease-out`;

  circle.addEventListener("click", function() {
    this.remove();
  })

  circle.addEventListener("webkitanimationend", function() {
    heart--;
    this.remove();
  })

  document.querySelector(".game").appendChild(circle);
}

const createLevel = function(lv) {
  if (lv === 1) {
    time = 1500;
    timeAnimation = 4;
    maxSize = 200;
    minSize = 100;
    maxTop = 75;
    maxLeft = 80;
  } else if (lv === 2) {
    time = 1000;
    timeAnimation = 3;
    maxSize = 200;
    minSize = 100;
    maxTop = 70;
    maxLeft = 80;
  } else if (lv === 3) {
    time = 900;
    timeAnimation = 2;
    maxSize = 150;
    minSize = 100;
    maxTop = 70;
    maxLeft = 80;
  } else if (lv === 4) {
    time = 500;
    timeAnimation = 3;
    maxSize = 130;
    minSize = 100;
    maxTop = 75;
    maxLeft = 85;
  } else if (lv === 5) {
    time = 200;
    timeAnimation = 4;
    maxSize = 150;
    minSize = 100;
    maxTop = 75;
    maxLeft = 85;
  }

  clearInterval(currentLevel);

  currentLevel = setInterval(function() {
    createCircle();
  }, time)
}




// Start game
btnPlay.addEventListener("click", function() {
  btnPlay.style.opacity = "0";
  btnPlay.style.visibility = "hidden";
  btnPlay.textContent = "Start";
  bg.style.opacity = "0";
  bg.style.visibility = "hidden";

  newGame();
})




  


