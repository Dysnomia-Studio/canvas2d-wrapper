export default function inCircle(element, x, y, left, top, localTileSize) {
	const distance = (
		(x - left) * (x - left) +
		(y - top) * (element.y - top)
	);

	if(distance <= ((element.radius * localTileSize) * (element.radius * localTileSize))) {
		return {
			id: element.id,
			element,
			originalEvent: e,
		};
	}
}