import CanvasObject from "../shapes/CanvasObject";
import Position2D from "./Position2D";

type CollideElementResultItem = {
	id: string | null,
	element: CanvasObject | null,
	originalEvent: Event,
	posOnMap: Position2D,
	hasMovedMouse?: boolean,
}

export default CollideElementResultItem;
