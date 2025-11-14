import Position2D from '../types/Position2D.ts';

export default function getLineLength(from: Position2D, to: Position2D): number {
	const xDiff = to.x - from.x;
	const yDiff = to.y - from.y;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
}
