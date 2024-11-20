import { Area } from "../types";
import Canvas from "./Canvas";

export default class Entity implements Area {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string = "pink";

  constructor(id: string, props: Area) {
    this.id = id;
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
  }

  onLoop(_canvas: Canvas) {}

  collides(entity: Entity) {
    if (!this || !entity || this.id == entity.id) {
      return false;
    }



    return (
      this.left < entity.right &&
      this.right > entity.left &&
      this.top < entity.bottom &&
      this.bottom > entity.top
    );
  }

  get bottom() {
    return this.y + this.height;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get left() {
    return this.x;
  }
}
