import collideElement from '../collisions/collideElement';
import CanvasObject from '../shapes/CanvasObject';
import Canvas2DState from '../types/Canvas2DState';
import CollideElementResultItem from '../types/CollideElementResultItem';
import computeEventPositions from './computeEventPositions';

export default function elementClick(e: React.MouseEvent, elements: CanvasObject[], tileSize: number, state: Canvas2DState, hasMovedMouse: boolean): CollideElementResultItem {
	const {
		left,
		top,
		posOnMap
	} = computeEventPositions(state, e.nativeEvent, tileSize);

	const clickedElement = collideElement(e.nativeEvent, elements, left, top, posOnMap, tileSize, state.zoom);
	if (clickedElement !== null) {
		return {
			...clickedElement,
			hasMovedMouse
		};
	}

	return {
		id: null,
		element: null,
		originalEvent: e.nativeEvent,
		posOnMap,
		hasMovedMouse,
	} satisfies CollideElementResultItem;
}
