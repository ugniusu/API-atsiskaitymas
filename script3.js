// "use strict";
const btnInputContainer = document.createElement("div");
document.body.appendChild(btnInputContainer);

const container = document.createElement("div");
document.body.appendChild(container);
container.style.display = "grid";
container.style.gap = "50px";
container.style.gridTemplateColumns = "repeat(4, 1fr)";

let input = document.createElement("input");
input.type = "text";
input.placeholder = "Search art";

const button = document.createElement("button");
button.textContent = "Get Art";
btnInputContainer.append(input, button);
button.style.borderRadius = "50px";
button.style.padding = "10px 50px";
button.style.backgroundColor = "#38220f";
button.style.color = "#fff";
button.style.fontWeight = "700";

const getMovie = async (ev) => {
  ev.preventDefault();
  const inputValue = input.value.trim();

  const result = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks?limit=10&has_image=1&q=${inputValue}`
  );
  console.log(result);

  const data = await result.json();
  console.log(data);

  if (result.status === 404) {
    const infoElement = document.createElement("h2");
    infoElement.textContent = "Art not found";
    container.append(infoElement);
  } else {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
      card.remove();
    });

    if (Array.isArray(data.data)) {
      data.data.map((art) => {
        const card = document.createElement("div");
        card.style.marginTop = "50px";
        card.className = "card";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.alignItems = "center";
        card.style.justifyContent = "center";
        card.style.border = "1px solid black";

        const artPic = document.createElement("img");
        artPic.src = art.images.web.url;
        artPic.alt = art.title;
        artPic.style.width = "50vh";
        artPic.style.marginBottom = "0";
        artPic.style.marginTop = "50px";

        const title = document.createElement("h3");
        title.textContent = art.title;
        title.style.marginBottom = "0";
        const artist = document.createElement("p");

        art.creators.forEach((author) => {
          console.log(author.description);
          artist.textContent = author.description;
        });

        const date = document.createElement("em");
        date.textContent = art.creation_date;

        // const info = document.createElement("p");
        // info.textContent = art.Year;

        card.appendChild(artPic);
        card.appendChild(title);
        card.appendChild(artist);
        card.appendChild(date);
        container.appendChild(card);
      });
    } else {
      const infoElement = document.createElement("h2");
      infoElement.textContent = "No movies found";
      container.append(infoElement);
    }
  }
};
button.addEventListener("click", getMovie);
getMovie();
