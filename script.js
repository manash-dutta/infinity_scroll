const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loading-spinner");

let photosArray = [];
let loadingComplete = false;
let imagesLoaded = 0;
let totalImagesLoaded = 0;

// Unsplash API
const count = 30;
const apiKey = `bf6fu_cnLU-SjP03cehYFj7rTHV-PxM4kTFQ4ec-yKA`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imagesLoadedFromApi() {
  imagesLoaded++;
  if (imagesLoaded === totalImagesLoaded) {
    loadingComplete = true;
    loadingSpinner.hidden = true;
  }
}

// Helper Function to setAttribute on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImagesLoaded = photosArray.length;
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const anchor = document.createElement("a");
    setAttributes(anchor, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> to add photos
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener to check when images are loaded
    img.addEventListener("load", imagesLoadedFromApi);
    // Put <img> inside <a> and put <a> inside image-container
    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("Oops! We hit a rock.. ", error);
  }
}

// Check to see if scroll has reached the bottom of the page and load more photos.
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    loadingComplete
  ) {
    loadingComplete = false;
    getPhotos();
  }
});

// on Load
getPhotos();
