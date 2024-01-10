// "use strict";

const container = document.createElement("div");
document.body.appendChild(container);
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(4, 1fr)";
container.style.justifyItems = "center";
document.body.style.backgroundColor = "#999";

const inputBtnContainer = document.createElement("div");
document.body.appendChild(inputBtnContainer);
inputBtnContainer.style.position = "absolute";
inputBtnContainer.style.top = "0";
inputBtnContainer.style.left = "45%";
inputBtnContainer.style.display = "flex";
inputBtnContainer.style.justifyContent = "center";
inputBtnContainer.style.marginTop = "20px";

const button = document.createElement("button");
button.textContent = "Show";
button.style.borderRadius = "50px";
button.style.padding = "10px 50px";
button.style.backgroundColor = "#38220f";
button.style.color = "#fff";
button.style.fontWeight = "700";

const input = document.createElement("input");
input.style.borderRadius = "50px";
inputBtnContainer.append(input, button);

// const image = document.createElement("img");
// container.append(input, button);

const getMovie = async (ev) => {
  ev.preventDefault();
  const inputValue = input.value.trim();

  const result = await fetch(
    `http://www.omdbapi.com/?apikey=8ba5d06d&s=${inputValue}`
  );
  console.log(result);

  const data = await result.json();
  console.log(data);

  if (result.status === 404) {
    const infoElement = document.createElement("h2");
    infoElement.textContent = "Movie not found";
    container.append(infoElement);
  } else {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
      card.remove();
    });

    if (Array.isArray(data.Search)) {
      data.Search.map((movie) => {
        const card = document.createElement("div");
        card.style.marginTop = "50px";
        card.className = "card";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.alignItems = "center";

        const moviePic = document.createElement("img");
        moviePic.src = movie.Poster;
        moviePic.alt = movie.Title;
        moviePic.style.marginBottom = "0";
        moviePic.style.marginTop = "50px";

        const title = document.createElement("h3");
        title.textContent = movie.Title;
        title.style.marginBottom = "0";

        const info = document.createElement("p");
        info.textContent = movie.Year;

        card.appendChild(moviePic);
        card.appendChild(title);
        card.appendChild(info);
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
