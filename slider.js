const images = [
  "images/stating work.svg",
  "images/reminder.svg",
  "images/focused.svg",
  "images/plan mode.svg",
  "images/modern life.svg"
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
