import Position2D from '../types/Position2D';
import pointInCircle from './pointInCircle';

export default function pointOnLinePath(points: Position2D[], lineWidth: number, pointX: number, pointY: number, tileSize: number = 1) {
	const radius = lineWidth / 2;

	// Starting point in Circle
	if (pointInCircle(
		points[0].x * tileSize,
		points[0].y * tileSize,
		radius * tileSize,
		pointX,
		pointY
	)) {
		return true;
	}

	// Ending point in Circle
	if (pointInCircle(
		points[points.length - 1].x * tileSize,
		points[points.length - 1].y * tileSize,
		radius * tileSize,
		pointX,
		pointY
	)) {
		return true;
	}

	// Line collision
	for (let i = 1; i < points.length; i++) {
		const from = {
			x: points[i - 1].x * tileSize,
			y: points[i - 1].y * tileSize
		};

		const to = {
			x: points[i].x * tileSize,
			y: points[i].y * tileSize
		};

		// Line length
		const diffX = from.x - to.x;
		const diffY = from.y - to.y;
		const length = Math.sqrt((diffX * diffX) + (diffY * diffY));

		// Dot product of the line and Circle
		const dot = (((pointX - from.x) * (to.x - from.x)) + ((pointY - from.y) * (to.y - from.y))) / Math.pow(length, 2);
		if (dot < 0 || dot > 1) { // Outside of the line, skip
			continue;
		}

		// Closest point on the line
		const point = {
			x: from.x + (dot * (to.x - from.x)),
			y: from.y + (dot * (to.y - from.y)),
		};

		if (pointInCircle(
			point.x,
			point.y,
			radius * tileSize,
			pointX,
			pointY
		)) {
			return true;
		}
	}

	// Curves collision
	// TODO, since not needed for now

	return false;
}
