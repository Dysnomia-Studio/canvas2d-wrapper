import collideElement from '../collisions/collideElement';

const LEFT_BUTTON = 1;
let selectedObject = null;

export default function mouseMove(event, elements, tileSize, props, setProps, lockXAxis, lockYAxis, dragObjects, onElementMoved) {
	const newProps = {
		...props,
	};

	const left = -props.left + event.pageX - event.target.offsetLeft;
	const top = -props.top + event.pageY - event.target.offsetTop;

	if(event.nativeEvent.buttons === LEFT_BUTTON && !!props.prevX) {
		let moved = false;
		if(dragObjects) {
			if(selectedObject === null) {
				selectedObject = collideElement(event, elements, left, top, tileSize, props.zoom);
			}

			if(selectedObject !== null && selectedObject.element.draggable) {
				selectedObject.element.x = (-props.left) + (event.clientX - props.boundingClientRect.left) - selectedObject.element.width / 2;
				selectedObject.element.y = (-props.top) + (event.clientY - props.boundingClientRect.top) - selectedObject.element.height / 2;

				moved = true;

				if(onElementMoved) {
					onElementMoved(
						selectedObject,
						(event.screenX - props.prevX),
						(event.screenY - props.prevY),
					);
				}
			}
		}

		if(!moved) {
			if(!lockXAxis) {
				newProps.left += (event.screenX - props.prevX);
			}

			if(!lockYAxis) {
				newProps.top += (event.screenY - props.prevY);
			}
		}
	} else {
		selectedObject = null;
	}

	setProps({
		...newProps,
		prevX: event.screenX,
		prevY: event.screenY,
	});
}
