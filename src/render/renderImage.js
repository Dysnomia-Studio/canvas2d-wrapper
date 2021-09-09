window.__canvas2dWrapper__ = __canvas2dWrapper__ || {};
window.__canvas2dWrapper__.imgCache = __canvas2dWrapper__.imgCache || {};

export default function renderImage(context, element, left, top, localTileSize) {
	if(!__canvas2dWrapper__.imgCache[element.src]) {
		__canvas2dWrapper__.imgCache[element.src] = new Image();
		__canvas2dWrapper__.imgCache[element.src].src = element.src;
	}

	if(!element.sx) {
		context.drawImage(
			__canvas2dWrapper__.imgCache[element.src],
			left + element.x * localTileSize,
			top + element.y * localTileSize,
			element.width * localTileSize,
			element.height * localTileSize
		);
	} else {
		context.drawImage(
			__canvas2dWrapper__.imgCache[element.src],
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
