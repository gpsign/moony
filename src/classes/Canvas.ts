import { Size } from "../types";
import Entity from "./Entity";

export default class Canvas implements Size {
  canvas: HTMLCanvasElement;
  p: CanvasRenderingContext2D;
  width: number;
  height: number;
  entities: Entity[];

  static create() {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    const screenHeight = screen.availHeight - 300;
    canvas.height = screenHeight;
    canvas.width = screenHeight / 1.77;
    document.body.appendChild(canvas);
    return canvas;
  }

  constructor() {
    const canvas =
      document.querySelector<HTMLCanvasElement>("#canvas") ?? Canvas.create();
    this.canvas = canvas;
    this.p = canvas.getContext("2d")!;

    this.entities = [];

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  clear() {
    this.p.clearRect(0, 0, this.width, this.height);
    this.p.fillStyle = "black";
    this.p.fillRect(0, 0, this.width, this.height);
  }

  renderEntity(entity: Entity) {
    entity.onLoop(this);
    this.p.fillStyle = entity.color;
    this.p.fillRect(entity.x, entity.y, entity.width, entity.height);
  }

  render() {
    this.clear();
    this.entities.forEach((e) => {
      this.renderEntity(e);
    });
  }

  outOfBounds(entity: Entity) {
    return (
      entity.right < 0 ||
      entity.left > this.width ||
      entity.bottom < 0 ||
      entity.top > this.height
    );
  }

  static init() {
    const canvas = new Canvas();

    return canvas;
  }
}
