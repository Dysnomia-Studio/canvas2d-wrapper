import calcTileSize from '../functions/calcTileSize';
import CanvasImage from '../shapes/CanvasImage';
import CanvasObject from '../shapes/CanvasObject';
import Circle from '../shapes/Circle';
import LinePath from '../shapes/LinePath';
import Polygon from '../shapes/Polygon';
import CollideElementResultItem from '../types/CollideElementResultItem';
import pointInCircle from './pointInCircle';
import pointInPolygon from './pointInPolygon';
import pointInRectangle from './pointInRectangle';
import pointOnLinePath from './pointOnLinePath';

export default function collideElement(e: Event, elements: CanvasObject[], left: number, top: number, tileSize: number, zoom: number): CollideElementResultItem | null {
	const localTileSize = calcTileSize(tileSize, zoom);

	const validElements: CollideElementResultItem[] = [];

	for (const element of elements) {
		if (!element.hasCollisions) {
			continue;
		}

		const x = element.x * localTileSize;
		const y = element.y * localTileSize;

		switch (element.constructorName) {
			case 'Rect':
			case 'CanvasImage':
				const image = element as CanvasImage;
				if (pointInRectangle(
					x, y, image.width * localTileSize, image.height * localTileSize,
					left, top, 
					image.rotation
				)) {
					validElements.push({
						id: image.id,
						element,
						originalEvent: e,
						posOnMap: { x: image.x, y: image.y }
					});
				}
				break;
			case 'Circle':
				if (pointInCircle(x, y, (element as Circle).radius * localTileSize, left, top)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
						posOnMap: { x: element.x, y: element.y }
					});
				}
				break;
			case 'Polygon':
				if (pointInPolygon((element as Polygon).points, left, top, localTileSize)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
						posOnMap: { x: element.x, y: element.y }
					});
				}
				break;
			case 'LinePath':
				const lpElement = element as LinePath;
				if (pointOnLinePath(lpElement.points, lpElement.lineWidth, left, top, localTileSize)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
						posOnMap: { x: element.x, y: element.y }
					});
				}
				break;
		}
	}

	if (validElements.length === 0) {
		return null;
	}

	if (validElements.length === 1) {
		return validElements[0];
	}

	validElements.sort((a, b) => {
		if (a.element!.zIndex > b.element!.zIndex) {
			return -1;
		}

		if (a.element!.zIndex < b.element!.zIndex) {
			return 1;
		}

		if (a.id! > b.id!) {
			return 1;
		}

		if (a.id! < b.id!) {
			return -1;
		}

		return 0;
	});

	return validElements[0];
}