export default function inCircle(element: { radius: number }, x: number, y: number, left: number, top: number, localTileSize: number) {
	const distance = (
		(x - left) * (x - left) +
		(y - top) * (y - top)
	);

	return (distance <= ((element.radius * localTileSize) * (element.radius * localTileSize)));
}
