import Circle from "../shapes/Circle";

export default function renderCircle(context: CanvasRenderingContext2D, element: Circle, left: number, top: number, localTileSize: number) {
	context.beginPath();

	context.arc(
		left + element.x * localTileSize,
		top + element.y * localTileSize,
		element.radius * localTileSize,
		0,
		2 * Math.PI
	);

	if (element.fill) {
		context.fill();
	}
	if (element.stroke) {
		context.stroke();
	}
}
