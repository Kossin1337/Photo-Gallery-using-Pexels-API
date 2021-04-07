const API_KEY = "563492ad6f91700001000001d448a99e8e6342cb8777d11872134b98";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const scrollBtn = document.getElementById("scroll-to-top");
let searchValue; // currently empty - will contain search value result

const moreButton = document.querySelector(".more-button");
let pagePhotos = 20; // stores the ammount of page photos to get
let page = 1;
let fetchLink;
let currentSearch;

/* NAVIGATION */
const navigationItems = document.querySelectorAll(".navbar-item");

navigationItems.forEach((navigationItem) => {
  navigationItem.addEventListener("click", () => {
    // console.log(navigationItem.textContent);
    currentSearch = navigationItem.textContent;
    searchPhotos(currentSearch);
  });
});

/* input event Listener */
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

/* scroll to top */
window.addEventListener("scroll", function () {
  scrollBtn.classList.toggle("active", window.scrollY > 500);
});
/* scroll back to top on click */
scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

/* load more content button */
moreButton.addEventListener("click", () => {
  loadMore();
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    // console.log(photo);
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `
    <div class="gallery-image" style="background-image: url(${photo.src.large});">
      <div class="image-info active">
        <h4 class="photographer"><a href="${photo.photographer_url}">${photo.photographer} </a></h4>
        <div class="info-wrapper">
          <a href="${photo.src.original}" class="download-img"><i class="fas fa-download"></i></a>
          <span class="like"><i class="far fa-heart"></i></span>
          <span class="img-resolution">${photo.width}x${photo.height}</span>
        </div> 
      </div>
    </div>
    `;
    gallery.appendChild(galleryImage);
  });
}

async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?per_page=${pagePhotos}`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  // if (querry.length === 0) query = piggies;
  clearImages();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=${pagePhotos}`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clearImages() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=${
      pagePhotos * page
    }`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=${
      pagePhotos * page
    }`;
  }
  const data = await fetchApi(fetchLink);
  clearImages();
  generatePictures(data);
}

curatedPhotos();
