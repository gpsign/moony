import { Area } from "../types";
import Canvas from "./Canvas";
import Entity from "./Entity";

export class Rocket extends Entity {
  type: string;
  dir: -1 | 1;
  triggered = false;

  constructor(props: Area) {
    super("rocket", props);

    this.type = "player";
    this.color = "blue";
    this.dir = -1;

    window.addEventListener("keydown", (e) => {
      if (e.key != "e") {
        return;
      }

      this.dir *= -1;
    });

    window.addEventListener("touchend", () => {
      this.dir *= -1;
    });
  }

  onLoop(_canvas: Canvas) {
    this.x += this.dir * (_canvas.height / 150);
    if (_canvas.outOfBounds(this) && !this.triggered) {
      this.triggered = true;
      window.location.reload();
    }
  }
}
