const images = [
  "images/stating work.png",
  "images/reminder.png",
  "images/focused.png",
  "images/plan mode.png",
  "images/modern life.png"
];

let index = 0;

const slideImage = document.getElementById("slideImage");

slideImage.src = images[index];

const slider = setInterval(() => {

  index++;

  if(index >= images.length){

    clearInterval(slider);

    return;
  }

  slideImage.src = images[index];

}, 3000);
