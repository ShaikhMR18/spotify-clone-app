let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let audioElement = new Audio("./songs/0.mp3");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Salam-e-Ishq",
    filePath: "./songs/0.mp3",
    coverPath: "./images/download.jfif",
  },
  {
    songName: "Fade Away",
    filePath: "./songs/1.mp3",
    coverPath: "./images/download.jfif",
  },
  {
    songName: "Sathiya",
    filePath: "./songs/1.mp3",
    coverPath: "./images/download.jfif",
  },
];

songItems.forEach((elem, i) => {
  elem.getElementsByTagName("img")[0].src = songs[i].coverPath;
  elem.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});
// audioElement.play();
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((elm) => {
    elm.classList.remove("fa-pause");

    elm.classList.add("fa-play");
  });
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach((elm) => {
  elm.addEventListener("click", (e) => {
    makeAllPlays();

    songIndex = parseInt(e.target.id);
    e.target.classList.add("fa-pause");
    e.target.classList.remove("fa-play");
    audioElement.src = `./songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
  });
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `./songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;

  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `./songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});
