/*playing algorithm*/
const playlist = document.querySelector('#playlist');
const player = document.querySelector('#player');
const songName = document.querySelector('#song-name');

playlist.addEventListener('click', event => {
  const song = event.target;
  const src = song.getAttribute('data-src');
  player.src = src;
  player.play();
  songName.textContent = song.textContent;
});

player.addEventListener('ended', () => {
  const currentSong = playlist.querySelector('.current-song');
  const nextSong = currentSong.nextElementSibling;
  if (nextSong) {
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

