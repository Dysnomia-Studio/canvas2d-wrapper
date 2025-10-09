import collideElement from '../collisions/collideElement';
import CanvasObject from '../shapes/CanvasObject';
import Canvas2DState from '../types/Canvas2DState';
import CollideElementResultItem from '../types/CollideElementResultItem';
import Position2D from '../types/Position2D';
import computeEventPositions from './computeEventPositions';

const LEFT_BUTTON = 1;
let selectedObject: CollideElementResultItem | null = null;
const UNSELECT_TIMEOUT_MS = 300;

export default function mouseMove(
	event: React.PointerEvent,
	elements: CanvasObject[],
	tileSize: number,
	props: Canvas2DState,
	setProps: React.Dispatch<React.SetStateAction<Canvas2DState>>,
	lockXAxis: boolean,
	lockYAxis: boolean,
	dragObjects: boolean,
	onElementMoved?: (obj: CollideElementResultItem, x: number, y: number) => void,
	onHover?: (obj: CollideElementResultItem | null, pos: Position2D) => void,
) {
	const newProps = {
		...props,
	};

	const {
		left,
		top,
		posOnMap
	} = computeEventPositions(props, event, tileSize);

	if (event.nativeEvent.buttons === LEFT_BUTTON && !!props.prevX) {
		let moved = false;
		if (dragObjects) {
			if (selectedObject === null) {
				selectedObject = collideElement(event.nativeEvent, elements, left, top, tileSize, props.zoom);
			}

			if (selectedObject !== null && (selectedObject.element as any).draggable) {
				selectedObject.element!.x = (-props.left - props.deltaLeft) + (event.clientX - props.boundingClientRect!.left) - ((selectedObject.element as any).width ?? 0) / 2;
				selectedObject.element!.y = (-props.top - props.deltaLeft) + (event.clientY - props.boundingClientRect!.top) - ((selectedObject.element as any).height ?? 0) / 2;

				moved = true;

				if (onElementMoved) {
					onElementMoved(
						selectedObject,
						(event.screenX - props.prevX!),
						(event.screenY - props.prevY!),
					);
				}

				if (onHover) {
					onHover(null, posOnMap);
				}
			}
		}

		if (!moved) {
			// Lock Axis
			if (!lockXAxis) {
				newProps.left += (event.screenX - props.prevX!);
			}

			if (!lockYAxis) {
				newProps.top += (event.screenY - props.prevY!);
			}
		}

		if (event.nativeEvent.pointerType !== 'mouse') {
			setTimeout(() => {
				selectedObject = null;
				setProps({
					...newProps,
					prevX: null,
					prevY: null,
				});
			}, UNSELECT_TIMEOUT_MS);
		}
	} else {
		if (onHover) {
			onHover(collideElement(event.nativeEvent, elements, left, top, tileSize, props.zoom), posOnMap);
		}

		selectedObject = null;
	}

	setProps({
		...newProps,
		prevX: event.screenX,
		prevY: event.screenY,
	});
}
