import calcTileSize from '../functions/calcTileSize';

export default function elementClick(e, elements, tileSize, state) {
	const left = -state.left + e.pageX - e.target.offsetLeft;
	const top = -state.top + e.pageY - e.target.offsetTop;

	const localTileSize = calcTileSize(tileSize, state.zoom);

	for(const element of elements) {
		const x = element.x * localTileSize;
		const y = element.y * localTileSize;

		if(element.type === 'rect') {
			const width = element.width * localTileSize;
			const height = element.height * localTileSize;

			if(x <= left && left <= (x + width) && y <= top && top <= (y + height)) {
				return {
					id: element.id,
					element,
					originalEvent: e,
				};
			}
		} else if(element.type === 'cicle') {
			const distance = (x - left) * (x - left) + (y - top) * (element.y - top);

			if(distance <= element.radius) {
				return {
					id: element.id,
					element,
					originalEvent: e,
				};
			}
		}
	}

	return {
		id: null,
		element: null,
		originalEvent: e,
	};
}
