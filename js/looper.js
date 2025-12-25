const items = [
  "Head",
  "Shoulders",
  "Knees",
  "Head",
  "Shoulders",
  "Knees",
  "Head",
  "Shoulders",
  "Knees",
  "Cup",
];
const colors = ["green", "red"];
let index = 0;
const c = () => {
  const div = document.getElementById("text");
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomIndexColor = Math.floor(Math.random() * items.length);
    div.textContent = items[randomIndex];
    div.style.color = colors[randomIndexColor];
    div.style.fontSize = "80px";
  }, 800);
};

document.addEventListener("DOMContentLoaded", () => {
  c();
});
