import CanvasObject from "../shapes/CanvasObject";
import LinePath from "../shapes/LinePath";
import Polygon from "../shapes/Polygon";

export default function calcRatioForMinimap(elements: CanvasObject[], width: number, height: number, minimapWidth: number, minimapHeight: number, tileSize: number) {
	const elementsX = elements.flatMap((e) => {
		const eWithPoints = e as Polygon & LinePath;
		if (Array.isArray(eWithPoints.points)) {
			return eWithPoints.points.map(p => p.x * tileSize);
		}

		return [e.x * tileSize];
	});
	const minX = Math.min(...elementsX);
	const maxX = Math.max(...elementsX);
	width = Math.max(2 * maxX, -2 * minX, width);

	const elementsY = elements.flatMap((e) => {
		const eWithPoints = e as Polygon & LinePath;
		if (Array.isArray(eWithPoints.points)) {
			return eWithPoints.points.map(p => p.y * tileSize);
		}

		return [e.y * tileSize];
	});
	const minY = Math.min(...elementsY);
	const maxY = Math.max(...elementsY);
	height = Math.max(2 * maxY, -2 * minY, height);

	return Math.max(width / minimapWidth, height / minimapHeight);
}
