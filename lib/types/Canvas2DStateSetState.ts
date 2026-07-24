import Canvas2DState from "./Canvas2DState";

export type Canvas2DStateSetState = (callback: (oldValue: Canvas2DState) => Canvas2DState) => void;
