import calcTileSize from '../functions/calcTileSize';

import inCircle from './inCircle';
import inPoly from './inPoly';
import inRect from './inRect';
import onLinePath from './onLinePath';

export default function collideElement(e, elements, left, top, tileSize, zoom) {
	const localTileSize = calcTileSize(tileSize, zoom);

	const validElements = [];

	for (const element of elements) {
		if (!element.hasCollisions) {
			continue;
		}

		const x = element.x * localTileSize;
		const y = element.y * localTileSize;

		switch (element.constructorName) {
			case 'Rect':
			case 'CanvasImage':
				if (inRect(element, x, y, left, top, localTileSize, element.rotation)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
						posOnMap: { x: element.x, y: element.y }
					});
				}
				break;
			case 'Circle':
				if (inCircle(element, x, y, left, top, localTileSize)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
						posOnMap: { x: element.x, y: element.y }
					});
				}
				break;
			case 'Polygon':
				if (inPoly(element, x, y, left, top, localTileSize)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
						posOnMap: { x: element.x, y: element.y }
					});
				}
				break;
			case 'LinePath':
				if (onLinePath(element, left, top, localTileSize)) {
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
		if (a.element.zIndex > b.element.zIndex) {
			return -1;
		}

		if (a.element.zIndex < b.element.zIndex) {
			return 1;
		}

		if (a.id > b.id) {
			return 1;
		}

		if (a.id < b.id) {
			return -1;
		}

		return 0;
	});

	return validElements[0];
}