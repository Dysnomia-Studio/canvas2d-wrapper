export default function pointInCircle(
	centerX: number, centerY: number, radius: number,
	pointX: number, pointY: number
) {
	const distance = (
		(centerX - pointX) * (centerX - pointX) +
		(centerY - pointY) * (centerY - pointY)
	);

	return (distance <= (radius * radius));
}
