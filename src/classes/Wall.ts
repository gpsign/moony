import { Area } from "../types";
import Canvas from "./Canvas";
import Entity from "./Entity";

export default class Wall extends Entity {
  constructor(props: Area) {
    super("wall", props);
    this.color = "gray";
  }

  onLoop(_canvas: Canvas): void {
    this.y += _canvas.height / 150;
  }
}
