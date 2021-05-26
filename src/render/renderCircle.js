export default function renderCircle(context, element, left, top, localTileSize) {
	context.beginPath();

	context.arc(
		left + element.x * localTileSize,
		top + element.y * localTileSize,
		element.radius * localTileSize,
		0,
		2 * Math.PI
	);

	if(element.fill) {
		context.fill();
	}
	if(element.stroke) {
		context.stroke();
	}
}
