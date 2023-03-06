"use strict";

const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
const prevBtn = document.querySelector("#previous");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Eletric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric / Jacinto Design",
  },
];

// Check is  Playing ;
let isPlaying = false;

// Play Music
const playMusic = () => {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
};
// Pause Music
const pauseMusic = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// Update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length;
  }
  loadSong(songs[songIndex]);
  playMusic();
};

// Next Song
const nextSong = () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playMusic();
};

// On Load - Select First Song
loadSong(songs[0]);

const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update Progress bar Width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //  Calculate Display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay Switching duration Element to avoaid NaN

    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //  Calculate Display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      durationSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
  }
};

const keyPress = (e) => {
  if (e.keyCode === 39) {
    nextSong();
  }
  if (e.keyCode === 37) {
    prevSong();
  }
  if (e.keyCode === 32) {
    isPlaying ? pauseMusic() : playMusic();
  }
};

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
window.addEventListener("keydown", keyPress);
progressContainer.addEventListener("click", setProgressBar);
