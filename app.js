const API_KEY = "563492ad6f91700001000001d448a99e8e6342cb8777d11872134b98";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-button");
let searchValue;

async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=20",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: API_KEY,
      },
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `
    <img src="${photo.src.medium}"> </img>
    <h4><a href="${photo.photographer_url}">${photo.photographer} </a></h4>`;
    gallery.appendChild(galleryImage);
  });
}

// async function searchPhotos() {

// }

curatedPhotos();
