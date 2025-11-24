import { Position2D } from "../main";

export default function normalOnLine(
	lineOrigin: Position2D,
	lineDestination: Position2D,
	clockwise: boolean = false
): Position2D | null {
	const dx = lineDestination.x - lineOrigin.x;
	const dy = lineDestination.y - lineOrigin.y;

	const len = Math.hypot(dx, dy);

	const ux = dx / len;
	const uy = dy / len;

	const nx = clockwise ? uy : -uy;
	const ny = clockwise ? -ux : ux;

	return { x: nx, y: ny };
}
