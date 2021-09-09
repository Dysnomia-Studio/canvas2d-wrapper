import calcTileSize from '../functions/calcTileSize';

import inCircle from './inCircle';
import inPoly from './inPoly';
import inRect from './inRect';

export default function collideElement(e, elements, left, top, tileSize, zoom) {
	const localTileSize = calcTileSize(tileSize, zoom);

	for(const element of elements) {
		const x = element.x * localTileSize;
		const y = element.y * localTileSize;

		switch(element.constructorName) {
			case 'Rect':
			case 'CanvasImage':
				if(inRect(element, x, y, left, top, localTileSize)) {
					return {
						id: element.id,
						element,
						originalEvent: e,
					};
				}
				break;
			case 'Circle':
				if(inCircle(element, x, y, left, top, localTileSize)) {
					return {
						id: element.id,
						element,
						originalEvent: e,
					};
				}
				break;
			case 'Polygon':
				if(inPoly(element, x, y, left, top, localTileSize)) {
					return {
						id: element.id,
						element,
						originalEvent: e,
					};
				}
				break;
		}
	}

	return null;
}