/*-------------- Constants -------------*/
const startBtn = document.getElementById("startBtn");
const cups = document.querySelectorAll(".cup");
const ball = document.getElementById("ball");
const roundEl = document.getElementById("Round");
const highscoreEl = document.getElementById("Highscore");
const POS = [15, 50, 85]
/*---------- Variables (state) ---------*/
let round = 1;
let highscore = 0;
let ballCupId = 1;
let isShuffling = false;
let layout = [0, 1, 2]


/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/
function render() {
    cups.forEach(cup => {
        const cupId = Number(cup.id);
        const posIndex = layout.indexOf(cupId);
        cup.style.order = posIndex;    //flex order
    });
    const ballPosIndex = layout.indexOf(ballCupId);
    ball.style.left = POS[ballPosIndex] + "%";
}
function init() {
round = 1;
ballCupId = 1;
isShuffling = false;
ball.classList.remove("hide")
render();
}

function shuffleCups() {
  if (isShuffling) return;
  isShuffling = true;

  let steps = 5; 
  let i = 0;

  let shuffleInterval = setInterval(() => {
    let pos1 = Math.floor(Math.random() * 3);
    let pos2 = Math.floor(Math.random() * 3);

    if (pos1 !== pos2) {
     [layout[pos1], layout[pos2]] = [layout[pos2], layout[pos1]];
     render();
    }

    i++;
    if (i >= steps) {
      clearInterval(shuffleInterval);
      isShuffling = false;
    }
  }, 800);
}

function checkChoice(clickedIndex) {

  const clickedCupId = Number(cups[clickedIndex].id);
  const correct = (clickedCupId === ballCupId);

  if (correct) {
    round++;
    if (round > highscore) highscore = round; 
  } else {
    round = 1;
  }

  if (roundEl) roundEl.textContent = round;
  if (highscoreEl) highscoreEl.textContent = highscore;

  
  ballCupId = 1;
  layout = [0,1,2];
  render();
  setTimeout(() => shuffleCups(), 400);
}

/*----------- Event Listeners ----------*/
startBtn.addEventListener("click", () => {
    if (!isShuffling) {
        shuffleCups();
    }
});

cups.forEach((cup, index) => {
    cup.addEventListener("click",() => {
        if (!isShuffling) {
            checkChoice(index);
        }
    });
});
window.addEventListener("load", init);



