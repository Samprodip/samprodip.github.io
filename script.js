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

