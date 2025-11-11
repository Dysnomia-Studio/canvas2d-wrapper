import Position2D from "../types/Position2D";

export default function pointInPolygon(points: Position2D[], pointX: number, pointY: number, tileSize: number = 1) {
	let counter = false;

	for (let i = 0; i < points.length; i++) {
		const iX = points[i].x * tileSize;
		const iY = points[i].y * tileSize;

		// The mouse is exactly at a polygon point
		if (pointX === iX && pointY === iY) {
			return true;
		}

		let j = i + 1;
		if (j >= points.length) {
			j = 0;
		}

		const jX = points[j].x * tileSize;
		const jY = points[j].y * tileSize;

		if ((iY > pointY) !== (jY > pointY)) {
			const slope = (pointX - iX) * (jY - iY) - (jX - iX) * (pointY - iY);

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
