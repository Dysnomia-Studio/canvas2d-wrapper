const imgCache = {};

export default function renderImage(context, element, left, top, localTileSize) {
	if(!imgCache[element.src]) {
		imgCache[element.src] = new Image();
		imgCache[element.src].src = element.src;
	}

	if(!element.sx) {
		context.drawImage(
			imgCache[element.src],
			left + element.x * localTileSize,
			top + element.y * localTileSize,
			element.width * localTileSize,
			element.height * localTileSize
		);
	} else {
		context.drawImage(
			imgCache[element.src],
			element.sx,
			element.sy,
			element.swidth,
			element.sheight,
			left + element.x * localTileSize,
			top + element.y * localTileSize,
			element.width * localTileSize,
			element.height * localTileSize
		);
	}
}
