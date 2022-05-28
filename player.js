const playContainer = document.querySelector(".player-conatiner");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");

const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
console.log(cover);
const plays = ["90m", "nai", "proof"];
let playIndex = 0;

loadPlays(plays[playIndex]);

function loadPlays(plays) {
  console.log(plays, cover, "SEE");
  title.innerHTML = plays;
  audio.src = `player/${plays}.mp3`;
  cover.src = `images/${plays}.jpg`;
}

//  event listeners for our app
function pausePlay() {
  playContainer.classList.add("play");
  audio.play();
}
function playPlay() {
  playContainer.classList.remove("play");
  playBtn.innerHTML = "Pause";
  audio.pause();
}

// play button listener
playBtn.addEventListener("click", () => {
  const playing = playContainer.classList.contains("play");
  if (!playing) {
    pausePlay();
  } else {
    playPlay();
  }
});
// NEXT play function
// next button listener
function nextPlay() {
  console.log("clicked");
  playIndex++;
  if (playIndex > plays.length - 1) {
    playIndex = 0;
  }
  loadPlays(plays[playIndex]);
  pausePlay();
}
nextBtn.addEventListener("click", nextPlay);

//previos buttom
prevBtn.addEventListener("click", () => {
  console.log("clicked");
  playIndex--;
  if (playIndex < 0) {
    playIndex = plays.length - 1;
  }
  loadPlays(plays[playIndex]);
});
// for update progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressWidth = (currentTime / duration) * 100;
  progress.style.width = `${progressWidth}%`;
}
function setProgress(e) {
  let width = this.clientWidth;
  const clientx = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clientx / width) * duration;
}

// progress bar update
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextPlay);
