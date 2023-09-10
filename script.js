const playlist = document.querySelector('#playlist');
const player = document.querySelector('#player');
const songName = document.querySelector('#song-name');
const pageTitle = document.querySelector('title');

let currentSongIndex = localStorage.getItem('currentSongIndex') || 0;
let isPlaying = false;
let repeatMode = false;
let shuffleMode = false;

//player
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

//getting total number of songs
function getTotalSongs() {
  const playlist = document.getElementById("playlist");
  const songs = playlist.getElementsByTagName("li");
  return songs.length;
}
var totalSongs = getTotalSongs();

//modes and default
player.addEventListener('ended', () => {
  if (repeatMode) {
    playSong(currentSongIndex);
  }
  else if (shuffleMode){
    const shuffleSongIndex = Math.floor((Math.random() * totalSongs) + 1);
    playSong(shuffleSongIndex);
  }
  else {
    const nextSongIndex = (currentSongIndex + 1) % playlist.childElementCount;
    playSong(nextSongIndex);
  }
});

//repeat
const repeatButton = document.querySelector('#repeat-btn');
repeatButton.addEventListener('click', () => {
  repeatMode = !repeatMode;
  if (repeatMode) {
    repeatButton.classList.add('active');
    document.getElementById("repeat-btn").style.color="rgb(0, 162, 255";
    if (shuffleButton.classList.contains("active")) {
      shuffleButton.classList.remove("active");
    }
    if(shuffleMode){
      shuffleMode = !shuffleMode
      document.getElementById("shuffle-btn").style.color="rgba(241,243,244,255)";
    }  
  }
  else {
    repeatButton.classList.remove('active');
    document.getElementById("repeat-btn").style.color="rgba(241,243,244,255)";
  }
});

//next and prev
function prevSong(){
  if(shuffleMode){
    const shuffleSongIndex = Math.floor((Math.random() * totalSongs) + 1);
    playSong(shuffleSongIndex);
  }
  else{  
    const prevSongIndex = (currentSongIndex - 1) % playlist.childElementCount;
    playSong(prevSongIndex);
  }  
}

function nextSong(){
  if(shuffleMode){
    const shuffleSongIndex = Math.floor((Math.random() * totalSongs) + 1);
    playSong(shuffleSongIndex);
  }
  else{
    const nextSongIndex = (currentSongIndex + 1) % playlist.childElementCount;
    playSong(nextSongIndex);
  }
}

const prevButton = document.querySelector('#prev-btn')
prevButton.addEventListener('click', () => {
  prevSong();
});
const nextButton = document.querySelector('#next-btn')
nextButton.addEventListener('click', () => {
  nextSong()
});


//play and pause
const playPause = document.querySelector('#playpause')
playPause.addEventListener('click', () => {
  if(player.paused == true){
    player.play();
  }
  else{
    player.pause();
  }
});
player.addEventListener("play", function() {
  playPause.src = "css/images/pause.svg";
});

player.addEventListener("pause", function() {
  playPause.src = "css/images/play.svg";
});

//time updates
const currentTime = document.getElementById("currentTime");
const totalDuration = document.getElementById("totalDuration");

player.addEventListener("timeupdate", function() {
  // Display current time
  const currentTimeValue = player.currentTime;
  const minutes = Math.floor(currentTimeValue / 60);
  const seconds = Math.floor(currentTimeValue % 60);
  currentTime.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const remainingTimeValue = player.duration - currentTimeValue;
  const remainingMinutes = Math.floor(remainingTimeValue / 60);
  const remainingSeconds = Math.floor(remainingTimeValue % 60);
  totalDuration.innerHTML = `-${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
});
// check if there is a stored song index and resume playing the song
if (localStorage.getItem('currentSongIndex')) {
  playSong(currentSongIndex);
}  
//key binds
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    if (isPlaying) {
      player.pause();
      playPause.src = "css/images/play.svg";
    } 
    else {
      player.play();
      playPause.src = "css/images/pause.svg";
    }
  } 
  else if (event.code === 'ArrowRight') {
    nextSong();
  } 
  else if (event.code === 'ArrowLeft') {
    prevSong();
  }
});
//shuffle
const shuffleButton = document.querySelector('#shuffle-btn');
shuffleButton.addEventListener('click', () => {
  shuffleMode = !shuffleMode;
  if (shuffleMode) {
    shuffleButton.classList.add('active');
    document.getElementById("shuffle-btn").style.color="rgb(0, 162, 255";
    if (repeatButton.classList.contains("active")) {
      repeatButton.classList.remove("active");
    }
    if(repeatMode){  
      repeatMode = !repeatMode
      document.getElementById("repeat-btn").style.color="rgba(241,243,244,255)";
    }  
  } else {
    shuffleButton.classList.remove('active');
    document.getElementById("shuffle-btn").style.color="rgba(241,243,244,255)";
  }
});
//seek
var music = document.getElementById('player')
var progessed = document.getElementById('progessed')
var progess_bar = document.getElementById('progess_bar')

music.ontimeupdate = function(e){
  progessed.style.width = Math.floor(music.currentTime*100/music.duration)+"%";
}
progess_bar.onclick = function(e){
  music.currentTime = ((e.offsetX/progess_bar.offsetWidth) * music.duration)
}

//Sticky Header
window.addEventListener("scroll", function(){
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Check if the website is already open in another window or tab
if (document.cookie.split(';').some(function(item) {
  return item.trim().indexOf('websiteOpen=') == 0;
})) {
alert('Another instance of the website is already open.');
// Redirect to another page or perform any other action
window.location.href = 'about:home'; // Replace with your desired URL
} else {
// Set a cookie to indicate that the website is open
document.cookie = 'websiteOpen=true; path=/';

// Remove the cookie when the user closes the window or tab
window.addEventListener('beforeunload', function() {
  document.cookie = 'websiteOpen=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});
}


/*
//to prevent context menu
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(event) {
  if (event.keyCode == 123) { // F12 key
    return false;
  }
  else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Ctrl+Shift+I
    return false;
  }
};
*/
/*
//loading of song

// Hide the loading overlay by default
document.addEventListener("DOMContentLoaded", function () {
  var loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.opacity = "0";
  loadingOverlay.style.pointerEvents = "none";
});

// Show the loading overlay when a song or next/previous button is clicked
var songs = document.querySelectorAll(".song");
//var nextButton = document.getElementById("next-button");
//var prevButton = document.getElementById("prev-button");

songs.forEach(function (song) {
  song.addEventListener("click", showLoadingOverlay);
});

nextButton.addEventListener("click", showLoadingOverlay);
prevButton.addEventListener("click", showLoadingOverlay);

function showLoadingOverlay() {
  var loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.opacity = "1";
  loadingOverlay.style.pointerEvents = "auto";

  // Simulating the music loading with setTimeout
  setTimeout(function () {
    loadingOverlay.style.opacity = "0";
    loadingOverlay.style.pointerEvents = "none";
  }, 2500); // Adjust the time to match the actual loading time
}*/
