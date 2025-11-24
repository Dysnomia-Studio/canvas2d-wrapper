import Position2D from "../types/Position2D";

export default function lineWithLine(
	aOrigin : Position2D, aDestination : Position2D,
	bOrigin: Position2D, bDestination : Position2D
) : Position2D | null {
    var a_dx = aDestination.x - aOrigin.x;
    var a_dy = aDestination.y - aOrigin.y;
    var b_dx = bDestination.x - bOrigin.x;
    var b_dy = bDestination.y - bOrigin.y;
    var s = (-a_dy * (aOrigin.x - bOrigin.x) + a_dx * (aOrigin.y - bOrigin.y)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (aOrigin.y - bOrigin.y) - b_dy * (aOrigin.x - bOrigin.x)) / (-b_dx * a_dy + a_dx * b_dy);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1) ? { x: aOrigin.x + t * a_dx, y: aOrigin.y + t * a_dy} : null;
}
