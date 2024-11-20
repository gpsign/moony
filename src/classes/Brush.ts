import { Point, PointProps } from "../types";

export class Brush implements Point {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
  }

  go(...props: PointProps) {
    if (props.length === 1) {
      this.x = props[0].x;
      this.y = props[0].y;
    } else {
      this.x = props[0];
      this.y = props[1];
    }
  }
}
