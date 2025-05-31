export default function renderLinePath(
	context,
	element,
	left,
	top,
	localTileSize
) {
	const defaultLineWidth = context.lineWidth;
	const points = element.points.map((p) => ({
		x: left + p.x * localTileSize,
		y: top + p.y * localTileSize,
	}));

	if (points.length < 2) return;

	context.beginPath();
	context.moveTo(points[0].x, points[0].y);

	if (element.smoothCorners) {
		for (let i = 1; i < points.length - 1; i++) {
			const prev = points[i - 1];
			const curr = points[i];
			const next = points[i + 1];

			// Direction vectors
			const dx1 = curr.x - prev.x;
			const dy1 = curr.y - prev.y;
			const dx2 = next.x - curr.x;
			const dy2 = next.y - curr.y;

			// Lengths
			const len1 = Math.hypot(dx1, dy1);
			const len2 = Math.hypot(dx2, dy2);

			// Offsets for corner rounding
			const offset1X = (dx1 / len1) * element.smoothCornersRadius;
			const offset1Y = (dy1 / len1) * element.smoothCornersRadius;
			const offset2X = (dx2 / len2) * element.smoothCornersRadius;
			const offset2Y = (dy2 / len2) * element.smoothCornersRadius;

			const cornerStart = {
				x: curr.x - offset1X,
				y: curr.y - offset1Y,
			};
			const cornerEnd = {
				x: curr.x + offset2X,
				y: curr.y + offset2Y,
			};

			context.lineTo(cornerStart.x, cornerStart.y);
			context.quadraticCurveTo(curr.x, curr.y, cornerEnd.x, cornerEnd.y);
		}

		// Final segment
		context.lineTo(points[points.length - 1].x, points[points.length - 1].y);
	} else {
		// Straight line version
		for (let i = 1; i < points.length; i++) {
			context.lineTo(points[i].x, points[i].y);
		}
	}

	context.lineWidth = element.lineWidth;
	context.stroke();
	context.lineWidth = defaultLineWidth;
}