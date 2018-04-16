// ****************************************
// ****************************************
// Local Storage Controller 
// ****************************************
// ****************************************
const LocalStorageController = (function(){
  const getListUser = function() {
    let user;

    if(localStorage.getItem("listUser") !== null){
      user = JSON.parse(localStorage.getItem("listUser"));
    } else {
      user = [];
    }

    return user;
  };

  return {
    setNewScore: function(currentUser){
      let listUser = getListUser();

      listUser.forEach(function(el){
        if(el.id === currentUser.id){
          el.score = currentUser.score;
        }
      })

      localStorage.setItem("listUser", JSON.stringify(listUser));
    },

    saveUserToLocal: function(user){
      let listUser = getListUser();
      listUser.push(user);
      localStorage.setItem("listUser", JSON.stringify(listUser));
    },

    getListUserFromLocal: function(){
      return getListUser();
    }
  }

})();









// ****************************************
// ****************************************
// UI Controller 
// ****************************************
// ****************************************
const UIController = (function(){
  const DOMString = {
    easyButton: "#easy",
    mediumButton: "#medium",
    hardButton: "#hard",
    screenDiv: "#screen",
    card : ".card",
    score: "#score",
    winner: "#winner",
    screen: "#screen",
    playAgain: "#play-again",
    activeButton: ".active",
    saveBtn: "#save",
    continueBtn: "#continue",
    loginDiv: "#login",
    bg: "#bg",
    signupDiv : "#signup",
    close: "#close",
    close2: "#close2",
    submit: "#submit",
    username: "#username",
    password: "#password",
    fullname: "#fullname",
    birthday: "#birthday",
    job: "#job",
    submit2: "#submit2",
    username2: "#username2",
    password2: "#password2",
    infoFullname: "#info-fullname",
    infoBirthday: "#info-birthday",
    infoJob: "#info-job",
    avatar: ".avatar",
    rank: "#rank",
    ranks: "#ranks",
    oneUser : ".one-user",
    rulesOfGame: "#rules-of-game",
    rulesBtn: "#rules"

  }

  return {
    activeEasyBtn: function(){
      document.querySelector(DOMString.easyButton).classList.add("active");
      document.querySelector(DOMString.mediumButton).classList.remove("active");
      document.querySelector(DOMString.hardButton).classList.remove("active");
    },
    
    activeMediumBtn: function(){
      document.querySelector(DOMString.easyButton).classList.remove("active");
      document.querySelector(DOMString.mediumButton).classList.add("active");
      document.querySelector(DOMString.hardButton).classList.remove("active");
    },

    activeHardBtn: function(){
      document.querySelector(DOMString.easyButton).classList.remove("active");
      document.querySelector(DOMString.mediumButton).classList.remove("active");
      document.querySelector(DOMString.hardButton).classList.add("active");
    },

    generateCard : function(arrayImage){
      document.querySelector(DOMString.screenDiv).innerHTML = "";
      let div = document.createElement("div");
      div.id = "winner";

      let h1 = document.createElement("h1");
      h1.textContent = "Win Win Win !!!";

      let button = document.createElement("button");
      button.id = "play-again";
      button.textContent = "Play Again";

      div.insertAdjacentElement("afterbegin", button);
      div.insertAdjacentElement("afterbegin", h1);

      document.querySelector(DOMString.screen).insertAdjacentElement("afterbegin", div);

      arrayImage.forEach(function(el){
        let div = document.createElement("div");
        div.className = "card never";

        div.innerHTML = `
            <div class="front">
                <img src="images/backface-car.jpg" alt="" />
            </div>
            <div class="back">
                <img src="images/${el}.jpg" alt="" />
            </div>
        `;

        document.querySelector(DOMString.screenDiv).insertAdjacentElement("afterbegin", div);
      });
    },

    openCard: function(e){
      e.target.parentElement.parentElement.classList.add("visible"); 
    },

    hideCard : function(){
      document.querySelectorAll(".visible").forEach(function(el){
        el.className = "card opacity";
      })
    },

    downCard: function(){
      document.querySelectorAll(".visible").forEach(function(el){
        el.className = "card hidden";

        setTimeout(function(){
          el.className= "card never";
        },200);
      })
    },

    checkWinner: function(){
      let length = document.querySelectorAll(".card.never").length;

      if(length === 0){
        setTimeout(function(){
          document.querySelector(DOMString.winner).style.display = "block";
        }, 300);

        let arrayCard = document.querySelectorAll(DOMString.card);
        arrayCard.forEach(function(el){
          el.remove();
        });

        return true;
      }
      return false;
    },

    setScore: function(oldScore, score){
      let scoreDOM = document.querySelector(DOMString.score);
      let i = parseInt(oldScore);
      
      if(parseInt(oldScore) <= score)
      {
        let intervalScore = setInterval(function(){
          if(i === score){
            clearInterval(intervalScore);
          }
  
          scoreDOM.textContent = i;
          i++;
        }, 100);

      } else if(parseInt(oldScore) > score){
        let intervalScore = setInterval(function(){
          if(i === score){
            clearInterval(intervalScore);
          }
  
          scoreDOM.textContent = i;
          i--;
        }, 100);
      }
      

    },

    showLogin: function(){
      document.querySelector(DOMString.loginDiv).style.display = "flex";
      document.querySelector(DOMString.bg).style.display = "block";
      document.querySelector(DOMString.username2).focus();
    },

    hideAll: function(){
      document.querySelector(DOMString.loginDiv).style.display = "none";
      document.querySelector(DOMString.bg).style.display = "none";
      document.querySelector(DOMString.signupDiv).style.display = "none";
      document.querySelector(DOMString.ranks).style.display = "none";
      document.querySelector(DOMString.rulesOfGame).style.display = "none";
    },

    showSignup: function(){
      document.querySelector(DOMString.bg).style.display = "block";
      document.querySelector(DOMString.signupDiv).style.display = "flex";
      document.querySelector(DOMString.username).focus();
    },

    getInfo: function(){
      let user = {
        username : document.querySelector(DOMString.username).value,
        password : document.querySelector(DOMString.password).value,
        fullname : document.querySelector(DOMString.fullname).value,
        birthday : document.querySelector(DOMString.birthday).value,
        job : document.querySelector(DOMString.job).value,
        score : document.querySelector(DOMString.score).textContent
      };

      return user;
    },

    getInfoFromLogin: function(){
      let user = {
        username: document.querySelector(DOMString.username2).value,
        password: document.querySelector(DOMString.password2).value
      }

      return user;
    },

    showInfoUser: function(user){
      document.querySelector(DOMString.infoFullname).textContent = user.fullname;
      document.querySelector(DOMString.infoBirthday).textContent = user.birthday;
      document.querySelector(DOMString.infoJob).textContent = user.job;
    },

    clearFormLogin: function(){
      document.querySelector(DOMString.username2).value = "";
      document.querySelector(DOMString.password2).value = "";
    },

    setAvatar: function(user){
      document.querySelector(DOMString.avatar).src = `avartar/${user.username}.jpg`;
    },

    showRank: function(listUser){
      document.querySelector(DOMString.bg).style.display = "block";
      document.querySelector(DOMString.ranks).style.display = "block";
      document.querySelectorAll(DOMString.oneUser).forEach(function(el){
        el.remove();
      });
      let length = listUser.length;
      for(let i = 0; i < length; i++){
        if(i >= 10){
          break;
        }
        let div = document.createElement("div");
        div.className = "one-user";

        let p = document.createElement("p");
        p.innerHTML = `Full name: ${listUser[i].fullname}&nbsp---------------------- <span>Score : ${listUser[i].score}</span>`;

        div.insertAdjacentElement("afterbegin", p);

        document.querySelector("#ranks").insertAdjacentElement("beforeend", div);
      };

    },

    showRulesOfGame: function(){
      document.querySelector(DOMString.bg).style.display = "block";
      document.querySelector(DOMString.rulesOfGame).style.display = "block";
    },

    getDOMString: function(){
      return DOMString;
    }

  }
})();







// ****************************************
// ****************************************
// Game Controller 
// ****************************************
// ****************************************
const GameController = (function(){
  function User(id, username, password, fullname, birthday, job, score){
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.birthday = birthday;
    this.job = job;
    this.score = score;
  }

  const data = {
    max: 35,
    level: "medium",
    score: 0,
    numberOfCard: {
      easy: 6,
      medium: 9,
      hard: 9
    },
    imageChoosen:[],
    turn1: '',
    turn2: '',
    currentUser: new User(-1, "", "", "", "", "", 0),
    listUser: []
  }

  return {
    getListUser: function(){
      return data.listUser;
    },

    updateListUser: function(){
      data.listUser.forEach(function(el){
        if(el.id === data.currentUser.id){
          el.score = data.currentUser.score;
        }
      })
    },

    setNewScoreToCurrentUser: function(newScore){
      data.currentUser.score = newScore;
    },

    setCurrentUser: function(user){
      data.currentUser = new User(user.id, user.username, user.password, user.fullname, user.birthday, user.job, user.score);
      data.score = user.score;
    },

    checkUser: function(user){
      let ret;
      data.listUser.forEach(function(el){
        if(el.username === user.username && el.password === user.password){
          ret = el;
        }
      });
      return ret;
    },

    addListFromLocal: function(list){
      data.listUser = list;
    },

    saveCurrentUser: function(user){
      let ID = 0;
      if(data.listUser.length !== 0){
        ID = data.listUser[data.listUser.length - 1].id + 1;
      }
      data.currentUser = new User(ID, user.username, user.password, user.fullname, user.birthday, user.job, parseInt(user.score));
      data.listUser.push(data.currentUser);
    },

    getCurrentUser: function(){
      return data.currentUser;
    },

    setScore: function(score){
      data.score = score;
    },

    getScore: function(){
      return data.score;
    },

    getLevel: function(){
      return data.level;
    },

    setLevel : function(level){
      data.level = level;
    },

    generateCard: function(level){
      let number = data.numberOfCard[level];
      let max = data.max;
      let array = [];

      for(let i = 0; i < number; i++){
        let choose = Math.floor(Math.random() * max) + 1;
        if(array.indexOf(choose) === -1){
          array.push(choose);
          array.push(choose);
        } else {
          i--;
        }
      }

      data.imageChoosen =  array.sort(function() {  
          return Math.random() - 0.5
      });
      
      return data.imageChoosen;
    },

    saveCard: function(e){
      let card = e.target.parentElement
                .nextElementSibling.children[0].getAttribute("src");
      
      if(data.turn1 === ''){
        data.turn1 = card;
      } else if (data.turn2 === ''){
        data.turn2 = card;
      }

    },

    setTurns: function(turn1, turn2){
      data.turn1 = turn2;
      data.turn2 = turn2;
    },

    getTurns: function(){
      return data.turn1 + '-' + data.turn2;
    },

    checkCard: function(turn1, turn2){
      if(turn1 === turn2){
        return true;
      } else {
        return false;
      }
    },

    increaseScore: function(){
      if(data.level === "easy"){
        data.score += 10;
      } else if (data.level === "medium") {
        data.score += 20;
      } else if (data.level === "hard") {
        data.score += 50;
      }
    },

    decreaseScore: function(){
      if(data.level === "easy"){
        data.score -= 1;
      } else if (data.level === "medium") {
        data.score -= 2;
      } else if (data.level === "hard") {
        data.score -= 5;
      }
    },

    logData: function(){
      return data;
    }
  }
})();












// ****************************************
// ****************************************
// App Controller 
// ****************************************
// ****************************************
const AppController = (function(uiCtrl, gameCtrl, localStorageCtrl){

  let count = 0;
  let check = false;
  let checkClick = true;
  //Add Event Listenner
  const addEventListener = function(){
    document.querySelector(uiCtrl.getDOMString().easyButton).addEventListener("click", activeEasy);
    document.querySelector(uiCtrl.getDOMString().mediumButton).addEventListener("click", activeMedium);
    document.querySelector(uiCtrl.getDOMString().hardButton).addEventListener("click", activeHard);
    document.querySelector(uiCtrl.getDOMString().screenDiv).addEventListener("click", openCard);
    document.querySelector(uiCtrl.getDOMString().saveBtn).addEventListener("click", save);
    document.querySelector(uiCtrl.getDOMString().continueBtn).addEventListener("click", login);
    document.querySelector(uiCtrl.getDOMString().bg).addEventListener("click", hideAll);
    document.querySelector(uiCtrl.getDOMString().close).addEventListener("click", hideAll);
    document.querySelector(uiCtrl.getDOMString().close2).addEventListener("click", hideAll);
    document.querySelector(uiCtrl.getDOMString().submit).addEventListener("click", submit);
    document.querySelector(uiCtrl.getDOMString().submit2).addEventListener("click", submit2);
    document.querySelector(uiCtrl.getDOMString().rank).addEventListener("click", showRank);
    document.querySelector(uiCtrl.getDOMString().rulesBtn).addEventListener("click", showRulesOfGame);
  };

  const showRulesOfGame = function(){
    uiCtrl.showRulesOfGame()
  };

  const showRank = function(){
    let listUser = gameCtrl.getListUser();
    let length = listUser.length;
    
    for(let i = 0; i < length; i++){
      for(let j = i + 1; j < length; j++){
        if(listUser[i].score < listUser[j].score){
          let temp = listUser[i];
          listUser[i] = listUser[j];
          listUser[j] = temp;
        }
      }
    }

    uiCtrl.showRank(listUser);
  };

  const submit2 = function(){
    //Get info from ui
    let user = uiCtrl.getInfoFromLogin();
    if(user.username === '' || user.password === ''){
      alert("Complete form, please !");
      return false;
    }

    //Check user
    let ret = gameCtrl.checkUser(user);

    //Show notification
    if(ret === undefined) {
      alert("Account does not exist or wrong password.");
    } else {
      gameCtrl.setCurrentUser(ret);
      uiCtrl.showInfoUser(gameCtrl.getCurrentUser());
      setScore(document.querySelector(uiCtrl.getDOMString().score).textContent);
      uiCtrl.setAvatar(ret);
      hideAll();
      uiCtrl.clearFormLogin();
    }

    //Reset game
    playAgain();

  };

  const submit = function(){
    //Get info from ui
    let user = uiCtrl.getInfo();
    if(user.username === '' || user.password === '' || user.fullname === '' || user.birthday === '' || user.job === '' || user.score === ''){
      alert("Complete form , please .....");
      return false;
    }

    hideAll();

    //save to game
    gameCtrl.saveCurrentUser(user);

    //Show info
    uiCtrl.showInfoUser(gameCtrl.getCurrentUser());
    uiCtrl.setAvatar(gameCtrl.getCurrentUser());

    //save to local 
    let currentUser = gameCtrl.getCurrentUser();
    localStorageCtrl.saveUserToLocal(currentUser);
  };

  const hideAll = function(){
    uiCtrl.hideAll();
  };

  const save = function(){

    let currentUser = gameCtrl.getCurrentUser();
    if(currentUser.id !== -1){
      //Get new score
      let newScore = gameCtrl.getScore();

      //Save to current user
      gameCtrl.setNewScoreToCurrentUser(newScore)

      //Save to list
      gameCtrl.updateListUser();

      //Save to local
      localStorageCtrl.setNewScore(gameCtrl.getCurrentUser());

      alert("Save ok");
    } else {
      uiCtrl.showSignup();
    }

  };

  const login = function(){
    uiCtrl.showLogin();
  };

  const activeEasy = function(){
    //Active UI
    uiCtrl.activeEasyBtn();

    //Active game
    gameCtrl.setLevel("easy");
    let arrayImage = gameCtrl.generateCard(gameCtrl.getLevel());

    //Reset level game
    uiCtrl.generateCard(arrayImage);

    checkClick = true;

  };

  const activeMedium = function(){
    //Active UI
    uiCtrl.activeMediumBtn();

    //Active game
    gameCtrl.setLevel("medium");
    let arrayImage = gameCtrl.generateCard(gameCtrl.getLevel());

    //Reset level game
    uiCtrl.generateCard(arrayImage);

    checkClick = true;
  };

  const activeHard = function(){
    //Active UI
    uiCtrl.activeHardBtn();

    //Active game
    gameCtrl.setLevel("hard");
    let arrayImage = gameCtrl.generateCard(gameCtrl.getLevel());

    //Reset level game
    uiCtrl.generateCard(arrayImage);

    checkClick = true;
  };

  const openCard = function(e){
    if(checkClick === false) return false;

    if(e.target.parentElement.parentElement.classList.contains("card")){

      checkClick= false;
      check = true;

      //Open ui
      uiCtrl.openCard(e);

      //Save image to game
      gameCtrl.saveCard(e);

      //Add event listener
      e.target.parentElement.parentElement
       .addEventListener("webkitAnimationEnd", checkCard);
    }
  };

  const checkCard = function(){
    if(check == false) return false;
    count++;
    checkClick = true;
    
    if(count === 4){
      let turns = gameCtrl.getTurns().split('-');
      let checkImage = gameCtrl.checkCard(turns[0], turns[1]);
      if(checkImage == true){
        check = false;
        uiCtrl.hideCard()
        let winner = uiCtrl.checkWinner();
        if(winner === true){
          gameCtrl.increaseScore();
          setScore(document.querySelector(uiCtrl.getDOMString().score).textContent);
          document.querySelector(uiCtrl.getDOMString().playAgain).addEventListener("click", playAgain);
        }
        
      } else if (checkImage == false){
        check = false;
        uiCtrl.downCard();
        gameCtrl.decreaseScore();
        setScore(document.querySelector(uiCtrl.getDOMString().score).textContent);
      }

      gameCtrl.setTurns('', '');
      count = 0;
    }
  };

  const setScore = function(oldScore){
    //Get score
    let score = gameCtrl.getScore();

    //Show scoreUI
    uiCtrl.setScore(oldScore, score);
  };

  const playAgain = function(){
    checkClick = true;
    let activeButton = document.querySelector(uiCtrl.getDOMString().activeButton).id;

    if(activeButton === "easy") {
      activeEasy();
    } else if (activeButton === "medium") {
      activeMedium();
    } else if (activeButton === "hard") {
      activeHard();
    }
  };

  return {
    init: function(){
      addEventListener();
      activeMedium();

      let listUser = localStorageCtrl.getListUserFromLocal();
      gameCtrl.addListFromLocal(listUser);

      setScore(0);    
    }
  }
  
})(UIController, GameController, LocalStorageController);


//Run .....
AppController.init();
  