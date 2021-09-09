import collideElement from '../collisions/collideElement';

export default function elementClick(e, elements, tileSize, state) {
	const left = -state.left + e.pageX - e.target.offsetLeft;
	const top = -state.top + e.pageY - e.target.offsetTop;

	const clickedElement = collideElement(e, elements, left, top, tileSize, state.zoom);
	if(clickedElement !== null) {
		return clickedElement;
	}

	return {
		id: null,
		element: null,
		originalEvent: e,
	};
}
