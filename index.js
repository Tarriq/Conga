const outerContainer = document.querySelector(".outerContainer");
const innerContainer = document.querySelector(".innerContainer");
const button = document.querySelector("button");
const song = new Audio("Conga.mp3");

const imgURLs = [
    "https://i.ibb.co/VQ47tk9/pic1.png",
    "https://i.ibb.co/94BzBKd/pic2.png",
    "https://i.ibb.co/80TZT5S/pic3.png",
    "https://i.ibb.co/hDfs5vc/pic4.png",
];

let currentImageIndex = 0;


song.addEventListener('canplay', () => preloadImages())

button.addEventListener("click", () => {
    button.remove();
    song.play();
    document.title = "Conga!";

    randomColorLoop()
    animateImages()
    delay(showContainer, 300);
    delay(createRandomSlimes, 1000);
});

async function preloadImages() {
    for (const url of imgURLs) {
        await new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
        });
    }
    button.removeAttribute("hidden");
}

function randomColorLoop() {
    setInterval(() => {
        const randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
        const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
        outerContainer.style.backgroundColor = "#" + randomColor1;
        innerContainer.style.backgroundColor = "#" + randomColor2;
    }, 500);
}

function showContainer() {
    outerContainer.style.scale = 1;
    outerContainer.style.opacity = 1
}

function animateImages() {
    setInterval(() => {
        currentImageIndex = currentImageIndex < 3 ? currentImageIndex + 1 : 0;
        const slimes = document.querySelectorAll(".slime");
        slimes.forEach((slime) => (slime.src = imgURLs[currentImageIndex]));
    }, 90);
}

function createRandomSlimes() {
    setInterval(() => {
        const direction = Math.floor(Math.random() * 2 + 1);
        const slime = document.createElement("img");
        slime.classList.add("slime");

        const minDuration = 0.7;
        const maxDuration = 1.5;
        const minSize = 10;
        const maxSize = 40;

        const duration =
            minDuration + Math.random() * (maxDuration - minDuration);
        const width = minSize + Math.random() * (maxSize - minSize);

        const maxTop = (window.innerHeight - width) / 10;
        const randomTop = Math.random() * maxTop;

        slime.style.animationName = direction === 1 ? "slideRight" : "slideLeft";
        slime.style.opacity = Math.random();
        slime.style.width = width + "vh";
        slime.style.top = randomTop + "%";
        slime.style.animationDuration = duration + "s";

        outerContainer.append(slime);

        setTimeout(() => slime.remove(), duration * 1000);
    }, 400);
}

function delay(fn, delay) {
    setTimeout(() => fn(), delay);
}