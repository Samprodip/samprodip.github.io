/*playing algorithm*/
/*playing algorithm*/
const playlist = document.querySelector('#playlist');
const player = document.querySelector('#player');
const songName = document.querySelector('#song-name');
const pageTitle = document.querySelector('title');

let currentSongIndex = localStorage.getItem('currentSongIndex') || 0;
let isPlaying = false;

function playSong(songIndex) {
  const song = playlist.querySelectorAll('.song')[songIndex];
  const src = song.getAttribute('data-src');
  
  songName.textContent = song.textContent;
  pageTitle.textContent = song.textContent + " - Playing Now";
  player.src = src;
  player.currentTime = localStorage.getItem('currentTime') || 0; // resume from the stored time position
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

  // store the current song index and time position in localStorage
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

player.addEventListener('ended', () => {
  const nextSongIndex = (currentSongIndex + 1) % playlist.querySelectorAll('.song').length;
  playSong(nextSongIndex);
});

// check if there is a stored song index and resume playing the song
if (localStorage.getItem('currentSongIndex')) {
  playSong(currentSongIndex);
}

/*Sticky Header*/
window.addEventListener("scroll", function(){
var header = document.querySelector("header");
header.classList.toggle("sticky", window.scrollY > 0);
}); 


/*Sticky Header*/
window.addEventListener("scroll", function(){
var header = document.querySelector("header");
header.classList.toggle("sticky", window.scrollY > 0);
});
