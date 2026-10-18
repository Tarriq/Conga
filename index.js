const outerContainer = document.querySelector(".outerContainer");
const innerContainer = document.querySelector(".innerContainer");
const button = document.querySelector("button");
const song = new Audio("Conga.mp3");

button.addEventListener("click", () => {
  button.remove();
  song.play();
  document.title = "Conga!";

  randomColorLoop();
  delay(showContainer, 300);
  delay(createRandomSlimes, 1000);
});

function randomColorLoop() {
  setInterval(() => {
    const randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
    outerContainer.style.backgroundColor = `#${randomColor1}`;
    innerContainer.style.backgroundColor = `#${randomColor2}`;
  }, 500);
}

function showContainer() {
  outerContainer.style.scale = 1;
  outerContainer.style.opacity = 1;
}

function createRandomSlimes() {
  setInterval(() => {
    const direction = Math.floor(Math.random() * 2 + 1);
    const slime = document.createElement("img");
    slime.classList.add("slime");
    slime.src = "party-dancing.gif";

    const screenWidthCoefficient = window.innerWidth / 360;

    const minDuration = 1;
    const maxDuration = 1.5;
    const minSize = 10;
    const maxSize = 40;

    const duration =
      (minDuration + Math.random() * (maxDuration - minDuration)) *
      screenWidthCoefficient;
    const width = minSize + Math.random() * (maxSize - minSize);

    const imageWidth = (window.innerHeight * width) / 100;
    const imageHeight = (imageWidth * 290) / 321;
    const maxTop = Math.max(0, outerContainer.clientHeight - imageHeight);
    const randomTop = Math.random() * maxTop;

    slime.style.animationName = direction === 1 ? "slideRight" : "slideLeft";
    slime.style.opacity = Math.random();
    slime.style.width = `${imageWidth}px`;
    slime.style.top = `${randomTop}px`;
    slime.style.animationDuration = `${duration}s`;
    outerContainer.append(slime);

    setTimeout(() => slime.remove(), duration * 1000);
  }, 400);
}

function delay(fn, delay) {
  setTimeout(() => fn(), delay);
}
