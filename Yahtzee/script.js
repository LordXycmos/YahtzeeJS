var dice = [0, 0, 0, 0, 0];
var canRoll = true;
var rerolls = 0;
var rolls = [];
var gameTotal = 0;

//=========================
// ROLL BUTTON
//=========================

document.querySelector(".roll-btn").addEventListener("click", function () {
  roll();
});

function roll() {
  if (canRoll) {
    for (var i = 1; i <= 5; i++) {
      var randomDie = Math.floor(Math.random() * 6) + 1;
      var currentDie = ".dice-" + i;
      var diceDOM = document.querySelector(currentDie);
      diceDOM.style.display = "block";
      diceDOM.src = "dice/die-" + randomDie + ".png";
      rolls.push(randomDie);
    }
    canRoll = false;
    rerolls = 2;
    document.querySelector(".rolls-left").innerHTML = rerolls;
  }
}

//=========================
// LOCK DIE
//=========================

function lockDice(die, index) {
  var diceDOM = document.querySelector(die);
  if (dice[index] == 0 && !canRoll) {
    diceDOM.style.border = "2px solid black";
    diceDOM.style.margin = "8px";
    dice[index] = 1;
  } else if (dice[index] == 1 && !canRoll) {
    diceDOM.style.border = "none";
    diceDOM.style.margin = "10px";
    dice[index] = 0;
  }
}

document.querySelector(".dice-1").addEventListener("click", function () {
  lockDice(".dice-1", 0);
});
document.querySelector(".dice-2").addEventListener("click", function () {
  lockDice(".dice-2", 1);
});
document.querySelector(".dice-3").addEventListener("click", function () {
  lockDice(".dice-3", 2);
});
document.querySelector(".dice-4").addEventListener("click", function () {
  lockDice(".dice-4", 3);
});
document.querySelector(".dice-5").addEventListener("click", function () {
  lockDice(".dice-5", 4);
});

//=========================
// REROLL BUTTON
//=========================

document.querySelector(".reroll-btn").addEventListener("click", function () {
  reroll();
});

function reroll() {
  if (rerolls > 0) {
    for (var i = 1; i <= 5; i++) {
      if (dice[i - 1] == 0) {
        var randomDie = Math.floor(Math.random() * 6) + 1;
        var currentDie = ".dice-" + i;
        var diceDOM = document.querySelector(currentDie);
        diceDOM.style.display = "block";
        diceDOM.src = "dice/die-" + randomDie + ".png";
        rolls.shift();
        rolls.push(randomDie);
      } else {
        var heldRolls = rolls[0];
        rolls.shift();
        rolls.push(heldRolls);
      }
    }
    rerolls--;
    document.querySelector(".rolls-left").innerHTML = rerolls;
  }
}

// =========================
// ADD SCORE TO TOP HALF
// =========================

var totalTop = 0;
var totalTopHalf = 0;
var elementCounts = {};

var onesRolls = true,
  twosRolls = true,
  threesRolls = true,
  foursRolls = true,
  fivesRolls = true,
  sixesRolls = true;

function NextRound() {
  rerolls = 0;
  canRoll = true;
  clearLocked();
  rolls = [];
  elementCounts = {};
}

function clearLocked() {
  for (var i = 0; i < 5; i++) {
    var curDice = ".dice-" + (i + 1);
    if (dice[i] == 1) {
      var diceDOM = document.querySelector(curDice);
      diceDOM.style.border = "none";
      diceDOM.style.margin = "10px";
      dice[i] = 0;
    }
  }
}

function pointCounter(id, index, bool) {
  if (bool) {
    rolls.forEach((element) => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });
    if (elementCounts[index] > 0 && !canRoll) {
      document.querySelector(id).innerHTML = elementCounts[index] * index;
      totalTop += elementCounts[index] * index;
      totalTopHalf += elementCounts[index] * index;
      CalcTotalTop();
      NextRound();
      return true;
    } else if (!canRoll) {
      document.querySelector(id).innerHTML = "-";
      NextRound();
      return true;
    }
    return false;
  }
}

// ONES
document.querySelector("#ones").addEventListener("click", function () {
  var isFilledIn = pointCounter("#ones", 1, onesRolls);
  if (isFilledIn) {
    onesRolls = false;
  }
});

// TWOS
document.querySelector("#twos").addEventListener("click", function () {
  var isFilledIn = pointCounter("#twos", 2, twosRolls);
  if (isFilledIn) {
    twosRolls = false;
  }
});

//THREES
document.querySelector("#threes").addEventListener("click", function () {
  var isFilledIn = pointCounter("#threes", 3, threesRolls);
  if (isFilledIn) {
    threesRolls = false;
  }
});

//FOURS
document.querySelector("#fours").addEventListener("click", function () {
  var isFilledIn = pointCounter("#fours", 4, foursRolls);
  if (isFilledIn) {
    foursRolls = false;
  }
});

//FIVES
document.querySelector("#fives").addEventListener("click", function () {
  var isFilledIn = pointCounter("#fives", 5, fivesRolls);
  if (isFilledIn) {
    fivesRolls = false;
  }
});

//SIXES
document.querySelector("#sixes").addEventListener("click", function () {
  var isFilledIn = pointCounter("#sixes", 6, sixesRolls);
  if (isFilledIn) {
    sixesRolls = false;
  }
});

// CALCULATE TOTAL TOP
function CalcTotalTop() {
  document.querySelector("#top-total-1").innerHTML = totalTop;
  if (totalTop >= 63) {
    document.querySelector("#bonus").innerHTML = 35;
    totalTopHalf += 35;
  }
  document.querySelector("#top-total-2").innerHTML = totalTopHalf;
  document.querySelector("#bottom-total-top").innerHTML = totalTopHalf;
  CalcGameTotal();
}

// =========================
// ADD SCORE TO BOTTOM HALF
// =========================
var totalBottomHalf = 0;

var toak = true,
  foak = true,
  fh = true,
  ss = true,
  bs = true,
  score = true,
  chance = true;

// THREE OF A KIND
document.querySelector("#toak").addEventListener("click", function () {
  if (toak) {
    rolls.forEach((element) => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });
    for (var i = 1; i <= 6; i++) {
      if (elementCounts[i] >= 3 && !canRoll) {
        var toakTotal = 0;
        for (var x = 0; x < 5; x++) {
          toakTotal += rolls[x];
        }
        document.querySelector("#toak").innerHTML = toakTotal;
        toak = false;
        totalBottomHalf += toakTotal;
        CalcTotalBottom();
      } else if (toak && !canRoll) {
        document.querySelector("#toak").innerHTML = "-";
      }
    }
    NextRound();
  }
});

// FOUR OF A KIND
document.querySelector("#foak").addEventListener("click", function () {
  if (foak) {
    rolls.forEach((element) => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });
    for (var i = 1; i <= 6; i++) {
      if (elementCounts[i] >= 4 && !canRoll) {
        var foakTotal = 0;
        for (var x = 0; x < 5; x++) {
          foakTotal += rolls[x];
        }
        document.querySelector("#foak").innerHTML = foakTotal;
        foak = false;
        totalBottomHalf += foakTotal;
        CalcTotalBottom();
      } else if (foak && !canRoll) {
        document.querySelector("#foak").innerHTML = "-";
      }
    }
    NextRound();
  }
});

// FULL HOUSE
document.querySelector("#fh").addEventListener("click", function () {
  if (fh) {
    var fhBig = false;
    var fhSmall = false;

    rolls.forEach((element) => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });
    for (var i = 0; i <= 6; i++) {
      if (elementCounts[i] == 3 && !canRoll) {
        fhBig = true;
      }
    }
    for (var x = 0; x <= 6; x++) {
      if (elementCounts[x] == 2 && !canRoll) {
        fhSmall = true;
      }
    }
    if (fhBig && fhSmall) {
      var fhPoints = 25;
      document.querySelector("#fh").innerHTML = fhPoints;
      fh = false;
      NextRound();
      totalBottomHalf += fhPoints;
      CalcTotalBottom();
    } else if (!canRoll) {
      document.querySelector("#fh").innerHTML = "-";
      NextRound();
      fh = false;
    }
  }
});

// SMALL STRAIGHT
document.querySelector("#ss").addEventListener("click", function () {
  if (ss) {
    rolls.forEach((element) => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });
    if (
      (elementCounts[1] >= 1 &&
        elementCounts[2] >= 1 &&
        elementCounts[3] >= 1 &&
        elementCounts[4] >= 1 &&
        !canRoll) ||
      (elementCounts[2] >= 1 &&
        elementCounts[5] >= 1 &&
        elementCounts[3] >= 1 &&
        elementCounts[4] >= 1 &&
        !canRoll) ||
      (elementCounts[5] >= 1 &&
        elementCounts[6] >= 1 &&
        elementCounts[3] >= 1 &&
        elementCounts[4] >= 1 &&
        !canRoll)
    ) {
      var ssPoints = 30;
      document.querySelector("#ss").innerHTML = ssPoints;
      ss = false;
      NextRound();
      totalBottomHalf += ssPoints;
      CalcTotalBottom();
    } else if (!canRoll) {
      document.querySelector("#ss").innerHTML = "-";
      NextRound();
      ss = false;
    }
  }
});

// BIG STRAIGHT
document.querySelector("#bs").addEventListener("click", function () {
  if (bs) {
    var bsMid = rolls.forEach((element) => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });
    if (
      (elementCounts[1] >= 1 &&
        elementCounts[2] >= 1 &&
        elementCounts[3] >= 1 &&
        elementCounts[4] >= 1 &&
        elementCounts[5] >= 1 &&
        !canRoll) ||
      (elementCounts[6] >= 1 &&
        elementCounts[2] >= 1 &&
        elementCounts[3] >= 1 &&
        elementCounts[4] >= 1 &&
        elementCounts[5] >= 1 &&
        !canRoll)
    ) {
      var bsPoints = 40;
      document.querySelector("#bs").innerHTML = bsPoints;
      bs = false;
      NextRound();
      totalBottomHalf += bsPoints;
      CalcTotalBottom();
    } else if (!canRoll) {
      document.querySelector("#bs").innerHTML = "-";
      NextRound();
      bs = false;
    }
  }
});

// SCORE
document.querySelector("#score").addEventListener("click", function () {
  if (score) {
    rolls.forEach((element) => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });
    for (var i = 1; i <= 6; i++) {
      if (elementCounts[i] == 5 && !canRoll) {
        var scorePoints = 50;
        document.querySelector("#score").innerHTML = scorePoints;
        score = false;
        totalBottomHalf += scorePoints;
        CalcTotalBottom();
      } else if (score && !canRoll) {
        document.querySelector("#score").innerHTML = "-";
      }
    }
    NextRound();
  }
});

// CHANCE
document.querySelector("#chance").addEventListener("click", function () {
  if (chance && !canRoll) {
    var chancePoints = 0;
    for (var i = 0; i < 5; i++) {
      chancePoints += rolls[i];
    }
    document.querySelector("#chance").innerHTML = chancePoints;
    chance = false;
    NextRound();
    totalBottomHalf += chancePoints;
    CalcTotalBottom();
  }
});

// CALCULATE BOTTOM HALF
function CalcTotalBottom() {
  document.querySelector("#bottom-total-bottom").innerHTML = totalBottomHalf;
  CalcGameTotal();
}

// =========================
// CALCULATE TOTAL
// =========================

function CalcGameTotal() {
  gameTotal = totalTopHalf + totalBottomHalf;
  document.querySelector("#total").innerHTML = gameTotal;
}

// =========================
// RESTART GAME
// =========================
document.querySelector(".new-btn").addEventListener("click", function () {
  document.querySelector(".dice-1").src = "dice/die-1.png";
  document.querySelector(".dice-2").src = "dice/die-1.png";
  document.querySelector(".dice-3").src = "dice/die-1.png";
  document.querySelector(".dice-4").src = "dice/die-1.png";
  document.querySelector(".dice-5").src = "dice/die-1.png";
  document.querySelector(".rolls-left").innerHTML = 0;
  document.querySelector("#ones").innerHTML = "";
  document.querySelector("#twos").innerHTML = "";
  document.querySelector("#threes").innerHTML = "";
  document.querySelector("#fours").innerHTML = "";
  document.querySelector("#fives").innerHTML = "";
  document.querySelector("#sixes").innerHTML = "";
  document.querySelector("#top-total-1").innerHTML = "0";
  document.querySelector("#bonus").innerHTML = "0";
  document.querySelector("#top-total-2").innerHTML = "0";
  document.querySelector("#toak").innerHTML = "";
  document.querySelector("#foak").innerHTML = "";
  document.querySelector("#fh").innerHTML = "";
  document.querySelector("#ss").innerHTML = "";
  document.querySelector("#bs").innerHTML = "";
  document.querySelector("#score").innerHTML = "";
  document.querySelector("#chance").innerHTML = "";
  document.querySelector("#bottom-total-bottom").innerHTML = "0";
  document.querySelector("#bottom-total-top").innerHTML = "0";
  document.querySelector("#total").innerHTML = "0";
  onesRolls = true;
  twosRolls = true;
  threesRolls = true;
  foursRolls = true;
  fivesRolls = true;
  sixesRolls = true;
  toak = true;
  foak = true;
  fh = true;
  ss = true;
  bs = true;
  score = true;
  chance = true;
  toakTotal = 0;
  foakTotal = 0;
  chancePoints = 0;
  totalTop = 0;
  totalTopHalf = 0;
  totalBottomHalf = 0;
  rerolls = 0;
  canRoll = true;
  elementCounts = {};
  rolls = [];
});
