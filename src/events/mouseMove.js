import collideElement from '../collisions/collideElement';
import computeEventPositions from './computeEventPositions';

const LEFT_BUTTON = 1;
let selectedObject = null;
let unselectTimeoutId = 0;
const UNSELECT_TIMEOUT_MS = 300;

export default function mouseMove(event, elements, tileSize, props, setProps, lockXAxis, lockYAxis, dragObjects, onElementMoved, onHover) {
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
				selectedObject = collideElement(event, elements, left, top, tileSize, props.zoom);
			}

			if (selectedObject !== null && selectedObject.element.draggable) {
				selectedObject.element.x = (-props.left - props.deltaLeft) + (event.clientX - props.boundingClientRect.left) - selectedObject.element.width / 2;
				selectedObject.element.y = (-props.top - props.deltaLeft) + (event.clientY - props.boundingClientRect.top) - selectedObject.element.height / 2;

				moved = true;

				if (onElementMoved) {
					onElementMoved(
						selectedObject,
						(event.screenX - props.prevX),
						(event.screenY - props.prevY),
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
				newProps.left += (event.screenX - props.prevX);
			}

			if (!lockYAxis) {
				newProps.top += (event.screenY - props.prevY);
			}
		}

		if (event.nativeEvent.pointerType !== 'mouse') {
			unselectTimeoutId = setTimeout(() => {
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
			onHover(collideElement(event, elements, left, top, tileSize, props.zoom), posOnMap);
		}

		selectedObject = null;
	}

	setProps({
		...newProps,
		prevX: event.screenX,
		prevY: event.screenY,
	});
}
