export default function inRect(element, x, y, left, top, localTileSize) {
	const width = element.width * localTileSize;
	const height = element.height * localTileSize;

	if(x <= left && left <= (x + width) && y <= top && top <= (y + height)) {
		return {
			id: element.id,
			element,
			originalEvent: e,
		};
	}
}