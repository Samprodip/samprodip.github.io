// Get the search input element and the list of albums
const searchInput = document.getElementById('search-input');
const albumList = document.querySelectorAll('.album-col');

// Function to filter the album list based on the search query
function filterAlbums(query) {
  albumList.forEach(album => {
    const albumTitle = album.querySelector('h2').textContent.toLowerCase();
    if (albumTitle.includes(query.toLowerCase())) {
      album.style.display = 'flex';
    } else {
      album.style.display = 'none';
    }
  });
}

// Add an event listener to the search input
searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.trim();
  filterAlbums(searchQuery);
});

// Add an event listener to the search form to prevent default form submission behavior
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', e => {
  e.preventDefault();
});

//sticky header
window.addEventListener("scroll", function(){
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//popup 
const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookieBannerDisplayed", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("cookieBannerDisplayed")) {
    cookieContainer.classList.add("active");
  }
}, 10);

// Check if the website is already open in another window or tab
if (sessionStorage.getItem('isWebsiteOpen')) {
  alert('Another instance of the website is already open.');
  // Redirect to another page or perform any other action
  window.location.href = 'https://example.com'; // Replace with your desired URL
} else {
  // Set a flag indicating that the website is open
  sessionStorage.setItem('isWebsiteOpen', true);

  // Remove the flag when the user closes the window or tab
  window.addEventListener('beforeunload', function() {
    sessionStorage.removeItem('isWebsiteOpen');
  });
}

