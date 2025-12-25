function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const createCell = (cell) => {
  cell.style.width = "80px";
  cell.style.height = "80px";
  cell.style.boxSizing = "border-box";
  cell.style.border = "1px solid #ccc";
  cell.style.position = "absolute";
};
const createCharacter = (type) => {
  const cell = document.createElement("div");
  const img = document.createElement("img");
  img.style.width = "100%";
  img.style.height = "100%";
  cell.appendChild(img);
  createCell(cell);
  return cell;
};
const STEP = 80;
const game = {
  instructions: async function () {
    // moveForward
    //moveBackward
    // moveDown
    // moveUp
    await this.moveForward();
  },
  obstaclePositions: [
    { top: 2 * STEP, left: 2 * STEP },
    { top: 4 * STEP, left: 5 * STEP },
    { top: 6 * STEP, left: 3 * STEP },
    { top: 1 * STEP, left: 7 * STEP },
    { top: 5 * STEP, left: 1 * STEP },
    { top: 6 * STEP, left: 7 * STEP },
  ],
  container: null,
  score: 0,
  hero: {
    cell: undefined,
    top: 0,
    left: 0,
  },
  villain: {
    cell: undefined,
    top: 0,
    left: 0,
  },
  gameOver: function (status) {
    this.setGameText("You lost, try again!");
    this.hero.cell.style.display = "none";
  },
  //   setVillainPosition: function (cell) {
  //     console.log("Setting villain position");
  //     console.log("Math.random()", Math.random() * 10);
  //     console.log(
  //       "Math.floor(Math.random() * 10)",
  //       Math.floor(Math.random() * 10)
  //     );
  //     const top = (Math.floor(Math.random() * 10) + 1) * STEP;
  //     const left = (Math.floor(Math.random() * 10) + 1) * STEP;
  //     cell.style.left = `${left}px`;
  //     cell.style.top = `${top}px`;
  //     this.villain = {
  //       cell,
  //       top,
  //       left,
  //     };
  //   },
  checkCollision: function () {
    this.obstaclePositions.forEach((obstacle) => {
      if (this.hero.top === obstacle.top && this.hero.left === obstacle.left) {
        console.log("Collision with obstacle!");
        this.gameOver("lost");
      }
    });

    if (
      this.hero.top < 0 ||
      this.hero.top >= 800 ||
      this.hero.left < 0 ||
      this.hero.left >= 800
    ) {
      console.log("Out of bounds: top");
      this.gameOver("lost");
    }
    if (
      this.hero.top === this.villain.top &&
      this.hero.left === this.villain.left
    ) {
      console.log("Collision with villain!");
      this.score += 1;
      this.setGameText("You lost!");
    }
  },
  setGameText: function (text) {
    const title = document.getElementById("game-title");
    title.innerText = text;
  },
  moveBackward: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        const left = this.hero.left - STEP;
        this.hero.cell.style.left = `${left}px`;
        this.hero.left = left;
        this.checkCollision();
        resolve();
      }, 500);
    });
  },
  moveForward: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        const left = this.hero.left + STEP;
        this.hero.cell.style.left = `${left}px`;
        this.hero.left = left;
        this.checkCollision();
        resolve();
      }, 500);
    });
  },
  moveDown: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        const top = this.hero.top + STEP;
        this.hero.cell.style.top = `${top}px`;
        this.hero.top = top;
        this.checkCollision();
        resolve();
      }, 500);
    });
  },
  moveUp: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        const top = this.hero.top - STEP;
        this.hero.cell.style.top = `${top}px`;
        this.hero.top = top;
        this.checkCollision();
        resolve();
      }, 500);
    });
  },
  createHero: function () {
    const top = 0;
    const left = 0;
    heroCell = createCharacter();
    img = heroCell.firstElementChild;
    img.src = "/assets/hero-character.svg";
    heroCell.style.backgroundColor = "blue";
    heroCell.style.left = `${left}px`;
    heroCell.style.top = `${top}px`;
    this.container.appendChild(heroCell);
    this.hero = {
      cell: heroCell,
      top,
      left,
    };
    this.instructions();
  },
  createVillain: function () {
    const top = 7 * STEP;
    const left = 8 * STEP;
    villainCell = createCharacter();
    img = villainCell.firstElementChild;
    img.src = "/assets/villain-character.svg";
    villainCell.style.backgroundColor = "red";
    villainCell.style.left = `${left}px`;
    villainCell.style.top = `${top}px`;
    // this.setVillainPosition(villainCell);
    this.container.appendChild(villainCell);
    this.villain = {
      cell: villainCell,
      top,
      left,
    };
  },
  initCharacters: function () {
    this.createVillain(this.container);
    this.createHero(this.container);
  },
  initObstacles: function () {
    this.obstaclePositions.forEach((pos) => {
      const obstacleCell = createCharacter();
      obstacleCell.firstElementChild.src = "/assets/bomb.svg";
      obstacleCell.style.backgroundColor = "gray";
      obstacleCell.style.left = `${pos.left}px`;
      obstacleCell.style.top = `${pos.top}px`;
      this.container.appendChild(obstacleCell);
    });
  },
  setupGameContainer: function () {
    this.setGameText("batman vs joker");
    this.container = document.getElementById("game-container");
    // create a 80px by 80px grid within the container
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement("div");
        createCell(cell);
        cell.style.left = `${col * 80}px`;
        cell.style.top = `${row * 80}px`;
        this.container.appendChild(cell);
      }
    }
    this.initCharacters(this.container);
    this.initObstacles();
  },
  init: function () {
    this.setupGameContainer();
  },
};
document.addEventListener("DOMContentLoaded", game.init.bind(game));
