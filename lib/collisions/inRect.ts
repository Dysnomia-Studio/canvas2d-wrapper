import Rect from "../shapes/Rect";

export default function inRect(element: Rect, x: number, y: number, left: number, top: number, localTileSize: number, rotation?: number) {
	const width = element.width * localTileSize;
	const height = element.height * localTileSize;

	let rotatedLeft = left;
	let rotatedTop = top;
	if (rotation) {
		const centerX = x + width / 2;
		const centerY = y + height / 2;

		rotatedLeft = centerX + (left - centerX) * Math.cos(-rotation) - (top - centerY) * Math.sin(-rotation)
		rotatedTop = centerY + (top - centerY) * Math.cos(-rotation) + (left - centerX) * Math.sin(-rotation)
	}

	return (x <= rotatedLeft && rotatedLeft <= (x + width) && y <= rotatedTop && rotatedTop <= (y + height));
}