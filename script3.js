// "use strict";
document.body.style.backgroundColor = "#4c4c4c";

const btnInputContainer = document.createElement("div");
document.body.appendChild(btnInputContainer);

const container = document.createElement("div");
document.body.appendChild(container);
container.style.display = "grid";
container.style.gap = "50px";
container.style.gridTemplateColumns = "repeat(3, 1fr)";

let input = document.createElement("input");
input.type = "text";
input.placeholder = "Search art";

const button = document.createElement("button");
button.textContent = "Get Art";
btnInputContainer.append(input, button);
button.style.borderRadius = "50px";
button.style.padding = "10px 50px";
button.style.backgroundColor = "#795C32";
button.style.color = "#fff";
button.style.fontWeight = "700";

const getArt = async (ev) => {
  // ev.preventDefault();
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
        card.style.marginTop = "25px";
        card.style.backgroundColor = "#ddc";
        card.style.border = "solid 5vmin #eee";
        card.style.borderBottomColor = "#fff";
        card.style.borderLeftColor = "#eee";
        card.style.borderRadius = "2px";
        card.style.borderRightColor = "#eee";
        card.style.borderTopColor = "#ddd";
        card.style.boxShadow =
          "0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25)";
        card.style.boxSizing = "border-box";
        card.style.display = "inline-block";
        // card.style.margin = "10vh 10vw";
        card.style.height = "80vh";
        card.style.padding = "8vmin";
        card.style.position = "relative";
        card.style.textAlign = "center";

        // card.style.marginTop = "50px";
        card.style.padding = "50px";
        card.className = "card";
        card.style.flexDirection = "column";
        card.style.alignItems = "center";
        card.style.justifyContent = "center";

        const artPic = document.createElement("img");
        artPic.src = art.images.web.url;
        artPic.alt = art.title;
        artPic.style.width = "35vh";
        artPic.style.marginBottom = "0";
        //
        artPic.style.border = "solid 2px";
        artPic.style.borderLeftColor = "#eed";
        artPic.style.borderbottomColor = "#ffe";
        artPic.style.borderTopColor = "#ccb";
        artPic.style.borderRightColor = "#eed";
        // artPic.style.maxHeight = "100%";
        // artPic.style.maxWidth = "100%";
        //

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
button.addEventListener("click", getArt);
getArt();
