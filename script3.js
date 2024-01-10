// "use strict";

const container = document.createElement("div");
document.body.appendChild(container);

let input = document.createElement("input");
input.type = "text";
input.placeholder = "Search art";

const button = document.createElement("button");
button.textContent = "Get Art";
container.append(input, button);
button.style.borderRadius = "50px";
button.style.padding = "10px 50px";
button.style.backgroundColor = "#38220f";
button.style.color = "#fff";
button.style.fontWeight = "700";

const getPhotos = async (ev) => {
  // ev.preventDefault();
  const result = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks?limit=20&has_image=1&q=${inputField.value}`
  );
  console.log(result);

  const data = await result.json();
  console.log(data);

  data.forEach((img) => {
    const photo = document.createElement("img");
    photo.src = img.urls.regular;
    photo.alt = photo.alt_description;
    container.appendChild(photo);
    photo.style.width = "25%";
  });
};

const getQueryPhotos = async (event) => {
  event.preventDefault();

  const inputValue = input.value.trim();
  console.log(inputValue);

  const result = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=${API}&query=${inputValue}&per_page=7`
  );
  console.log(result);

  const data = await result.json();
  console.log(data);

  if (data.results.length === 0) {
    const infoElement = document.createElement("h2");
    infoElement.textContent = "Data not found";
    container.appendChild(infoElement);
  } else {
    data.results.forEach((img) => {
      const photo = document.createElement("img");
      photo.className = "image";
      photo.src = img.urls.regular;
      photo.all = img.alt_description;
      photo.style.width = "250px";
      photo.style.objectFit = "cover";
      container.appendChild(photo);
    });
  }
};
button.addEventListener("click", getQueryPhotos);

getPhotos();
