export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Area extends Point, Size {}

export type PointProps = [Point] | [number, number];
