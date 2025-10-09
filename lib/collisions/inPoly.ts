import Polygon from "../shapes/Polygon";

export default function inPoly(element: Polygon, _x: number, y: number, mouseX: number, mouseY: number, localTileSize: number) {
	const j = element.points.length - 1;
	let counter = false;

	for (let i = 0; i < element.points.length; i++) {
		const iX = element.points[i].x * localTileSize;
		const iY = element.points[i].y * localTileSize;

		// The mouse is exactly at a polygon point
		if (mouseX === iX && mouseY === iY) {
			return true;
		}

		const jX = element.points[j].x * localTileSize;
		const jY = element.points[j].y * localTileSize;

		if ((iY > y) !== (jY > y)) {
			const slope = (mouseX - iX) * (jY - iY) - (jX - iX) * (mouseY - iY);

			// On the boundary
			if (slope === 0) {
				return true;
			}

			// Alternate, odd count = inside, even count = outside
			if ((slope < 0) !== (jY < iY)) {
				counter = !counter;
			}
		}
	}

	return counter;
}
