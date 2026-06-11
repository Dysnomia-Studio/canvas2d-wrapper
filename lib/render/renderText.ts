import Text from "../shapes/Text";

export default function renderText(context: CanvasRenderingContext2D, element: Text, left: number, top: number, localTileSize: number) {
	const positionX = left + element.x * localTileSize;
	const positionY = top + element.y * localTileSize;

	context.font = element.font ?? '16px arial';

	if (element.fill) {
		context.fillText(
			element.text,
			positionX,
			positionY,
			element.maxWidth
		);
	}

	if (element.stroke) {
		context.strokeText(
			element.text,
			positionX,
			positionY,
			element.maxWidth
		);
	}
}
