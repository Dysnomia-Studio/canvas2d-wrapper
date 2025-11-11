export default function pointInRectangle(
	rectangleX: number, rectangleY: number, 
	rectangleWidth: number, rectangleHeight: number,
	pointX: number, pointY: number,
	rotation?: number
) {
	let rotatedLeft = pointX;
	let rotatedTop = pointY;
	if (rotation) {
		const centerX = rectangleX + rectangleWidth / 2;
		const centerY = rectangleY + rectangleHeight / 2;

		rotatedLeft = centerX + (pointX - centerX) * Math.cos(-rotation) - (pointY - centerY) * Math.sin(-rotation)
		rotatedTop = centerY + (pointY - centerY) * Math.cos(-rotation) + (pointX - centerX) * Math.sin(-rotation)
	}

	return (rectangleX <= rotatedLeft && rotatedLeft <= (rectangleX + rectangleWidth) && rectangleY <= rotatedTop && rotatedTop <= (rectangleY + rectangleHeight));
}