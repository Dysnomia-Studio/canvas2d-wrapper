import calcTileSize from '../functions/calcTileSize';

import inCircle from '../collisions/inCircle';
import inPoly from '../collisions/inPoly';
import inRect from '../collisions/inRect';

export default function elementClick(e, elements, tileSize, state) {
	const left = -state.left + e.pageX - e.target.offsetLeft;
	const top = -state.top + e.pageY - e.target.offsetTop;

	const localTileSize = calcTileSize(tileSize, state.zoom);

	for(const element of elements) {
		const x = element.x * localTileSize;
		const y = element.y * localTileSize;

		switch(element.constructor.name) {
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

	return {
		id: null,
		element: null,
		originalEvent: e,
	};
}
