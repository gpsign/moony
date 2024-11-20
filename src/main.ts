import Canvas from "./classes/Canvas";
import { Random } from "./classes/Random";
import { Rocket } from "./classes/Rocket";
import Wall from "./classes/Wall";
import Trigger from "./classes/Trigger";
import { config } from "./config";
import "./style.css";

const canvas = Canvas.init();

const middleX = canvas.width / 2;

let max = Number(localStorage.getItem("highscore"));
let count = 0;

const highscore = document.getElementById("counter");

if (highscore && max != 0) {
  highscore.innerHTML = "High Score: " + max;
}

function setCounter() {
  const h1 = document.getElementById("counter");
  if (!h1) return;
  h1.innerText = String(count);
}

const triggerWidth = canvas.width / 3;
const size = triggerWidth / 4;

class Obstacle {
  triggered = false;

  constructor() {
    this.generate();
  }

  generate() {
    this.triggered = false;
    canvas.entities = canvas.entities.filter((e) => e.id == "rocket");

    const triggerX = Random.get(size, canvas.width - (triggerWidth + size));
    const trigger = new Trigger({
      x: triggerX,
      y: -size,
      width: triggerWidth,
      height: size,
    });
    const leftWall = new Wall({
      x: 0,
      y: -size,
      width: triggerX,
      height: size,
    });
    const rightWall = new Wall({
      x: trigger.right,
      y: -size,
      width: canvas.width - trigger.right,
      height: size,
    });

    leftWall.onLoop = () => {
      leftWall.y += canvas.height / 150;
      canvas.entities.forEach((e) => {
        if (leftWall.collides(e)) {
          location.reload();
        }
      });
    };

    rightWall.onLoop = () => {
      rightWall.y += canvas.height / 150;
      canvas.entities.forEach((e) => {
        if (rightWall.collides(e)) {
          location.reload();
        }
      });
    };

    trigger.onLoop = () => {
      trigger.y += canvas.height / 150;

      if (canvas.outOfBounds(trigger)) {
        count++;
        setCounter();
        if (count > max) {
          max = count;
          localStorage.setItem("highscore", String(count));
        }
        this.generate();
      }
    };

    canvas.entities.push(trigger, leftWall, rightWall);

    return { trigger, rightWall, leftWall };
  }
}

canvas.entities.push(
  new Rocket({
    x: middleX,
    y: canvas.height - size * 2.5,
    width: size,
    height: size,
  })
);

new Obstacle().generate();

const btn = document.createElement("button");
let interval: number;
btn.innerHTML = "Start";
btn.addEventListener("click", () => {
  const c = document.querySelector<HTMLCanvasElement>("#canvas");
  c?.focus();
  setCounter();
  btn.style.display = "none";
  if (interval) {
    location.reload();
  }
  btn.innerHTML = "Stop";
  interval = setInterval(() => {
    canvas.render();
  }, 1000 / config.FPS);
});
document.body.appendChild(btn);
