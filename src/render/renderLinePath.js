export default function renderLinePath(context, element, left, top, localTileSize) {
	const defaultLineWidth = context.lineWidth;
	context.beginPath();

	context.moveTo(
		left + element.points[0].x * localTileSize,
		top + element.points[0].y * localTileSize,
	);

	for (let i = 0; i < element.points.length; i++) {
		context.lineTo(
			left + element.points[i].x * localTileSize,
			top + element.points[i].y * localTileSize,
		);
	}

	context.lineWidth = element.lineWidth;
	context.stroke();

	context.lineWidth = defaultLineWidth;
}
