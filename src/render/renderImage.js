window.__canvas2dWrapper__ = {};
window.__canvas2dWrapper__.imgCache = {};

export default function renderImage(context, element, left, top, localTileSize) {
	if (!__canvas2dWrapper__.imgCache[element.src]) {
		__canvas2dWrapper__.imgCache[element.src] = new Image();
		__canvas2dWrapper__.imgCache[element.src].src = element.src;
	}

	const positionX = left + element.x * localTileSize;
	const positionY = top + element.y * localTileSize;
	const width = element.width * localTileSize;
	const height = element.height * localTileSize;


	if (element.rotation) {
		context.save();
		context.translate(positionX + width / 2, positionY + height / 2);
		context.rotate(element.rotation);

		if (!element.sx) {
			context.drawImage(
				__canvas2dWrapper__.imgCache[element.src],
				-width / 2,
				-height / 2,
				width,
				height
			);
		} else {
			context.drawImage(
				__canvas2dWrapper__.imgCache[element.src],
				element.sx,
				element.sy,
				element.swidth,
				element.sheight,
				-element.swidth / 2,
				-element.sheight / 2,
				width,
				height
			);
		}

		context.restore();
	} else {
		if (!element.sx) {
			context.drawImage(
				__canvas2dWrapper__.imgCache[element.src],
				positionX,
				positionY,
				width,
				height
			);
		} else {
			context.drawImage(
				__canvas2dWrapper__.imgCache[element.src],
				element.sx,
				element.sy,
				element.swidth,
				element.sheight,
				positionX,
				positionY,
				width,
				height
			);
		}
	}
}
