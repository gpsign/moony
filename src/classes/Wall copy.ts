import { Area } from "../types";
import Canvas from "./Canvas";
import Entity from "./Entity";

export default class Trigger extends Entity {
  constructor(props: Area) {
    super("trigger", props);
    this.color = "red";
  }

  onLoop(_canvas: Canvas): void {
    this.y += 5;
  }
}
