import calcTileSize from '../functions/calcTileSize';

import inCircle from './inCircle';
import inPoly from './inPoly';
import inRect from './inRect';

export default function collideElement(e, elements, left, top, tileSize, zoom) {
	const localTileSize = calcTileSize(tileSize, zoom);

	const validElements = [];

	for(const element of elements) {
		const x = element.x * localTileSize;
		const y = element.y * localTileSize;

		switch(element.constructorName) {
			case 'Rect':
			case 'CanvasImage':
				if(inRect(element, x, y, left, top, localTileSize)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
					});
				}
				break;
			case 'Circle':
				if(inCircle(element, x, y, left, top, localTileSize)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
					});
				}
				break;
			case 'Polygon':
				if(inPoly(element, x, y, left, top, localTileSize)) {
					validElements.push({
						id: element.id,
						element,
						originalEvent: e,
					});
				}
				break;
		}
	}

	if(validElements.length === 0) {
		return null;
	}

	if(validElements.length === 1) {
		return validElements[0];
	}

	validElements.sort((a, b) => {
		if(a.zIndex > b.zIndex) {
			return 1;
		}

		if(a.zIndex < b.zIndex) {
			return -1;
		}

		if(a.id > b.id) {
			return 1;
		}

		if(a.id < b.id) {
			return -1;
		}

		return 0;
	});

	return validElements[validElements.length - 1];
}