const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loading-spinner");

let photosArray = [];

// Helper Function to setAttribute on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes.key);
  }
}

// Create elements for links and photos, Add to DOM
function displayPhotos() {
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
    // Put <img> inside <a> and put <a> inside image-container
    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
}

// Unsplash API
const count = 10;
const apiKey = `bf6fu_cnLU-SjP03cehYFj7rTHV-PxM4kTFQ4ec-yKA`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    console.log(photosArray);
  } catch (error) {
    console.log("Oops! We hit a rock.. ", error);
  }
}

// on Load
// getPhotos();
