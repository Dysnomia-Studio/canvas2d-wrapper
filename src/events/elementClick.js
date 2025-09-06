import collideElement from '../collisions/collideElement';
import computeEventPositions from './computeEventPositions';

export default function elementClick(e, elements, tileSize, state) {
	const {
		left,
		top,
		posOnMap
	} = computeEventPositions(state, e, tileSize);

	const clickedElement = collideElement(e, elements, left, top, tileSize, state.zoom);
	if (clickedElement !== null) {
		return clickedElement;
	}

	return {
		id: null,
		element: null,
		originalEvent: e,
		posOnMap
	};
}
