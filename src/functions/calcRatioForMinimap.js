export default function calcRatioForMinimap(elements, width, height, minimapWidth, minimapHeight, tileSize) {
	const elementsX = elements.map((e) => {
		if (Array.isArray(e.points)) {
			return e.points.map(p => p.x * tileSize);
		}

		return [e.x * tileSize];
	}).flat();
	const minX = Math.min(...elementsX);
	const maxX = Math.max(...elementsX);
	width = Math.max(2 * maxX, -2 * minX, width);

	const elementsY = elements.map((e) => {
		if (Array.isArray(e.points)) {
			return e.points.map(p => p.y * tileSize);
		}

		return [e.y * tileSize];
	}).flat();
	const minY = Math.min(...elementsY);
	const maxY = Math.max(...elementsY);
	height = Math.max(2 * maxY, -2 * minY, height);

	const ratio = Math.max(width / minimapWidth, height / minimapHeight);

	return ratio;
}
