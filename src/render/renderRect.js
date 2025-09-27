export default function renderRect(context, element, left, top, localTileSize) {
	const positionX = left + element.x * localTileSize;
	const positionY = top + element.y * localTileSize;
	const width = element.width * localTileSize;
	const height = element.height * localTileSize;

	if (element.rotation) {
		context.save();
		context.translate(positionX + width / 2, positionY + height / 2);
		context.rotate(element.rotation);

		if (element.fill) {
			context.fillRect(
				-width / 2,
				-width / 2,
				width,
				height,
			);
		}

		if (element.stroke) {
			context.strokeRect(
				-width / 2,
				-width / 2,
				width,
				height,
			);
		}

		context.restore();
	} else {

		if (element.fill) {
			context.fillRect(
				positionX,
				positionY,
				width,
				height,
			);
		}

		if (element.stroke) {
			context.strokeRect(
				positionX,
				positionY,
				width,
				height,
			);
		}
	}
}
