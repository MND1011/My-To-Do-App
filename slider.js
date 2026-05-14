const images = [
  "images/slide1.png",
  "images/slide2.png",
  "images/slide3.png"
];

let index = 0;

setInterval(() => {

  index = (index + 1) % images.length;

  document.getElementById("slideImage").src = images[index];

}, 3000);
