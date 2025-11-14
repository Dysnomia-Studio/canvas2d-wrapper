import Position2D from '../types/Position2D';

export default function segmentAngle(from: Position2D, to: Position2D): number {
	const dx = to.x - from.x;
	const dy = to.y - from.y;

	// Guard against a zero‑length segment (direction undefined)
	if (dx === 0 && dy === 0) {
		return 0;
	}

	return Math.atan2(dy, dx) + Math.PI / 2;
}
