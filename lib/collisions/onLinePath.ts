import LinePath from '../shapes/LinePath';
import inCircle from './inCircle';

export default function onLinePath(element: LinePath, left: number, top: number, localTileSize: number) {
	const radius = element.lineWidth;

	// Starting point in Circle
	if (inCircle(
		{ radius },
		element.points[0].x * localTileSize,
		element.points[0].y * localTileSize,
		left,
		top,
		localTileSize
	)) {
		return true;
	}

	// Ending point in Circle
	if (inCircle(
		{ radius },
		element.points[element.points.length - 1].x * localTileSize,
		element.points[element.points.length - 1].y * localTileSize,
		left,
		top,
		localTileSize
	)) {
		return true;
	}


	// Line collision
	for (let i = 1; i < element.points.length; i++) {
		const from = {
			x: element.points[i - 1].x * localTileSize,
			y: element.points[i - 1].y * localTileSize
		};

		const to = {
			x: element.points[i].x * localTileSize,
			y: element.points[i].y * localTileSize
		};

		// Line length
		const diffX = from.x - to.x;
		const diffY = from.y - to.y;
		const length = Math.sqrt((diffX * diffX) + (diffY * diffY));

		// Dot product of the line and Circle
		const dot = (((left - from.x) * (to.x - from.x)) + ((top - from.y) * (to.y - from.y))) / Math.pow(length, 2);

		// Closest point on the line
		const point = {
			x: from.x + (dot * (to.x - from.x)),
			y: from.y + (dot * (to.y - from.y)),
		};

		if (inCircle(
			{ radius },
			point.x,
			point.y,
			left,
			top,
			localTileSize
		)) {
			return true;
		}
	}

	// Curves collision
	// TODO, since not needed for now

	return false;
}
