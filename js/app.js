/*-------------------------------- Constants --------------------------------*/
const startBtn    = document.getElementById("startBtn");
const table       = document.getElementById("table");
const cups        = Array.from(document.querySelectorAll(".cup"));
const ball        = document.getElementById("ball");
const roundEl     = document.getElementById("Round");
const highscoreEl = document.getElementById("Highscore");
const POS = [15, 50, 85];   //cups positions on table
const statusEl    = document.getElementById("status");

/*---------------------------- Variables (state) ----------------------------*/
let layout      = [0, 1, 2]; 
let ballCupId   = 1;        //ball always under this cup
let isShuffling = false;
let round       = 1;
let highscore   = 0;
let isGameOver  = false;

/*---------------------------- Functions ----------------------------*/
function wait(ms){
   return new Promise(r => setTimeout(r, ms));
   }

function getCupElById(id){ 
  return document.getElementById(String(id)); 
}

function cssTimeToMs(v){
  v = v.trim();
  return v.endsWith('ms') ? parseFloat(v) : parseFloat(v) * 1000;
}
const speedVar = getComputedStyle(document.documentElement).getPropertyValue('--speed') || '300ms';
const SPEED_MS = cssTimeToMs(speedVar);


function render() {
  cups.forEach((cup) => {
    const id = Number(cup.id);
    const posIndex = layout.indexOf(id);
    if (posIndex === -1) return;
    cup.style.left = POS[posIndex] + '%';
  });

  const bIndex = layout.indexOf(ballCupId);
  if (bIndex !== -1) ball.style.left = POS[bIndex] + '%';
}

//cups animation function
function setLift(el, on){
  if (!el) return;
  if (on) {
    el.classList.add('lift');
    el.classList.remove('drop-bounce');
  } else {
    el.classList.remove('lift');
  }
}

async function revealBall(){
  const cup = document.getElementById(String(ballCupId));
  if (!cup) return;
  setLift(cup, true);
  ball.style.zIndex = '3';
  ball.style.opacity = '1';
  await wait(800);
  setLift(cup, false);
  ball.style.zIndex = '1';
  await wait(200);
}

// swap two cups together
async function animateSwap(i, j){
  const idA = layout[i];
  const idB = layout[j];
  const cupA = getCupElById(idA);
  const cupB = getCupElById(idB);

  
  setLift(cupA, true);
  setLift(cupB, true);
  await wait(Math.min(120, SPEED_MS * 0.15));

 
  [layout[i], layout[j]] = [layout[j], layout[i]];

  render();
  await wait(SPEED_MS);
  setLift(cupA, false);
  setLift(cupB, false);
  await wait(100);
}


async function shuffleCupsAnimated(steps = 8){
  if (isShuffling) return;
  isShuffling = true;
  ball.style.opacity = '0';
  startBtn.disabled = true;
  cups.forEach(c => c.style.pointerEvents = 'none');
  let last = -1;
  for (let t = 0; t < steps; t++){
    let i = Math.floor(Math.random() * 3);
    if (i === last) i = (i + 1) % 3;
    let j = Math.random() < 0.5 ? i - 1 : i + 1;
    if (j < 0) j = 1;
    if (j > 2) j = 1;

    await animateSwap(i, j);
    last = j;
    await wait(40);
  }

 
  startBtn.disabled = false;
  cups.forEach(c => c.style.pointerEvents = '');
  ball.style.opacity = '1';
  isShuffling = false;
}


function checkChoice(clickedIndex){
  if (isShuffling || isGameOver) return;
  const clickedCupId = Number(cups[clickedIndex].id);
  const correct = (clickedCupId === ballCupId);
  if (correct) {
    round++;
    if (round > highscore) highscore = round;
    roundEl.textContent = round;
    highscoreEl.textContent = highscore;
    ballCupId = 1;
    layout = cups.map(c => Number(c.id));
    render();
    setTimeout(() => { revealBall().then(() => shuffleCupsAnimated(8)); }, 200);
  } else {
    isGameOver = true;
    statusEl.textContent = "You lost!";
    statusEl.classList.remove("hidden");
    startBtn.textContent = "Restart";
    ball.style.opacity = '1';
    cups.forEach(c => c.style.pointerEvents = 'none');
  }
}


/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener("click", () => {
  if (isShuffling) return;
  if (isGameOver) {
    isGameOver = false;
    statusEl.classList.add("hidden");
    startBtn.textContent = "Start";
    cups.forEach(c => c.style.pointerEvents = '');
    round = 1;
    roundEl.textContent = round;
    ballCupId = 1;
    layout = cups.map(c => Number(c.id));
    render();
  }
  revealBall().then(() => shuffleCupsAnimated(8));
});

cups.forEach((cup, index) => {
  cup.addEventListener("click", () => checkChoice(index));
});

window.addEventListener("load", () => {
  layout = cups.map(c => Number(c.id));
  ballCupId = 1;
  round = 1;
  highscore = 0;
  roundEl.textContent = round;
  highscoreEl.textContent = highscore;
  render();
});

