export default function renderRect(context, element, left, top, localTileSize) {
	if(element.fill) {
		context.fillRect(
			left + element.x * localTileSize,
			top + element.y * localTileSize,
			element.width * localTileSize,
			element.height * localTileSize,
		);
	}

	if(element.stroke) {
		context.strokeRect(
			left + element.x * localTileSize,
			top + element.y * localTileSize,
			element.width * localTileSize,
			element.height * localTileSize,
		);
	}
}
