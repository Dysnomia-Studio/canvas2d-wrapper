import collideElement from '../collisions/collideElement';
import CanvasObject from '../shapes/CanvasObject';
import Canvas2DState from '../types/Canvas2DState';
import CollideElementResultItem from '../types/CollideElementResultItem';

export default function elementRightClick(e: MouseEvent, elements: CanvasObject[], tileSize: number, state: Canvas2DState): CollideElementResultItem {
	const left = -state.left - state.deltaLeft + e.pageX - (e.target as HTMLElement).offsetLeft;
	const top = -state.top - state.deltaTop + e.pageY - (e.target as HTMLElement).offsetTop;

	const clickedElement = collideElement(e, elements, left, top, tileSize, state.zoom);
	if (clickedElement !== null) {
		return clickedElement;
	}

	return {
		id: null,
		element: null,
		originalEvent: e,
		posOnMap: { x: Math.floor(left / tileSize / state.zoom), y: Math.floor(top / tileSize / state.zoom) }
	};
}
