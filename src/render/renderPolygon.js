export default function renderRect(context, element, left, top, localTileSize) {
	context.beginPath();

	context.moveTo(
		left + element.points[0].x * localTileSize,
		top + element.points[0].y * localTileSize,
	);

	for(let i = 0; i < element.points.length; i++) {
		context.lineTo(
			left + element.points[i].x * localTileSize,
			top + element.points[i].y * localTileSize,
		);
	}

	context.lineTo(
		left + element.points[0].x * localTileSize,
		top + element.points[0].y * localTileSize,
	);

	if(element.fill) {
		context.fill();
	}
	if(element.stroke) {
		context.stroke();
	}
}
