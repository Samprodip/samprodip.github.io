/*playing algorithm*/
const playlist = document.querySelector('#playlist');
const player = document.querySelector('#player');
const songName = document.querySelector('#song-name');
const pageTitle = document.querySelector('title');

playlist.addEventListener('click', event => {
  const currentSong = playlist.querySelector('.current-song');
  currentSong.classList.remove('current-song');
  const song = event.target;
  song.classList.add('current-song');
  const src = song.getAttribute('data-src');
  player.src = src;
  player.play();
  songName.textContent = song.textContent;
  pageTitle.textContent = song.textContent + " - Playing Now";
});

player.addEventListener('ended', () => {
  const currentSong = playlist.querySelector('.current-song');
  currentSong.classList.remove('current-song');
  const nextSong = currentSong.nextElementSibling;
  if (nextSong) {
    nextSong.classList.add('current-song');
    nextSong.click();
  }
});



/*player hide and show*/
/*const playerr = document.querySelector('#player');
const gifi = document.querySelector('#footer');

    playerr.addEventListener('play', event => {
      gifi.style.display = 'block';
    });

    playerr.addEventListener('pause', event => {
      gifi.style.display = 'none';
    });
*/
window.addEventListener("scroll", function(){
var header = document.querySelector("header");
header.classList.toggle("sticky", window.scrollY > 0);
})

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 67 && event.ctrlKey) { // Ctrl+C
    event.preventDefault();
  } else if (event.keyCode == 85 && event.ctrlKey) { // Ctrl+U
    event.preventDefault();
  } else if (event.keyCode == 123) { // F12
    event.preventDefault();
  }
}, false);



