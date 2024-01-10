// "use strict";

const container = document.createElement("div");
document.body.appendChild(container);

const button = document.createElement("button");
button.textContent = "Show";
button.style.position = "absolute";
button.style.left = "130px";
button.style.top = "350px";
container.append(button);
button.style.borderRadius = "50px";
button.style.padding = "10px 50px";
button.style.backgroundColor = "#38220f";
button.style.color = "#fff";
button.style.fontWeight = "700";

const image = document.createElement("img");
container.append(image);

image.style.width = "400px";
image.style.height = "400px";
image.style.display = "flex";
image.style.objectFit = "cover";

const getPhoto = async () => {
  const result = await fetch("https://dog.ceo/api/breeds/image/random/1");
  console.log(result);

  const data = await result.json();
  console.log(data);

  const imageUrl = data.message[0];
  image.src = imageUrl;

  container.appendChild(image);
  image.style.position = "relative";
  image.style.zIndex = "-1";
};

button.addEventListener("click", getPhoto);
