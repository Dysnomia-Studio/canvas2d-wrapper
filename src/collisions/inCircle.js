export default function inCircle(element, x, y, left, top, localTileSize) {
	const distance = (
		(x - left) * (x - left) +
		(y - top) * (y - top)
	);

	return (distance <= ((element.radius * localTileSize) * (element.radius * localTileSize)));
}