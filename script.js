const playlist = document.querySelector('#playlist');
const player = document.querySelector('#player');
const songName = document.querySelector('#song-name');
const pageTitle = document.querySelector('title');

let currentSongIndex = localStorage.getItem('currentSongIndex') || 0;
let isPlaying = false;
let repeatMode = false;

function playSong(songIndex) {
  const song = playlist.querySelectorAll('.song')[songIndex];
  const src = song.getAttribute('data-src');
  
  songName.textContent = song.textContent;
  pageTitle.textContent = song.textContent + " - Playing Now";
  player.src = src;
  player.currentTime = localStorage.getItem('currentTime') || 0; // resume from the stored time needs to be fixed
  player.play();

  playlist.querySelectorAll('.song').forEach((song, index) => {
    if (index === songIndex) {
      song.classList.add('current-song');
    } else {
      song.classList.remove('current-song');
    }
  });

  currentSongIndex = songIndex;
  isPlaying = true;

// storing the song index and time
  localStorage.setItem('currentSongIndex', currentSongIndex);
  localStorage.setItem('currentTime', player.currentTime);
}

playlist.addEventListener('click', event => {
  const song = event.target.closest('.song');
  if (song) {
    const songIndex = Array.from(playlist.querySelectorAll('.song')).indexOf(song);
    playSong(songIndex);
  }
});

//repeat

player.addEventListener('ended', () => {
  if (repeatMode) {
    playSong(currentSongIndex);
  } else {
    const nextSongIndex = (currentSongIndex + 1) % playlist.childElementCount;
    playSong(nextSongIndex);
  }
});

const repeatButton = document.querySelector('#repeat-btn');
repeatButton.addEventListener('click', () => {
  repeatMode = !repeatMode;
  if (repeatMode) {
    repeatButton.classList.add('active');
    document.getElementById("repeat-btn").style.color="rgb(0, 162, 255";
  } else {
    repeatButton.classList.remove('active');
    document.getElementById("repeat-btn").style.color="rgba(241,243,244,255)";
  }
});

//next and prev
const prevButton = document.querySelector('#prev-btn')
prevButton.addEventListener('click', () => {
  const prevSongIndex = (currentSongIndex - 1) % playlist.childElementCount;
    playSong(prevSongIndex);
});

const nextButton = document.querySelector('#next-btn')
nextButton.addEventListener('click', () => {
  const nextSongIndex = (currentSongIndex + 1) % playlist.childElementCount;
    playSong(nextSongIndex);
});


// playing the last played song on page load
playSong(currentSongIndex);

// check if there is a stored song index and resume playing the song
if (localStorage.getItem('currentSongIndex')) {
  playSong(currentSongIndex);
}

//Sticky Header
window.addEventListener("scroll", function(){
var header = document.querySelector("header");
header.classList.toggle("sticky", window.scrollY > 0);
}); 