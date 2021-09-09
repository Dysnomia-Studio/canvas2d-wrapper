import collideElement from '../collisions/collideElement';

const LEFT_BUTTON = 1;

export default function mouseMove(event, elements, tileSize, props, setProps, lockXAxis, lockYAxis, dragObjects) {
	const newProps = {
		...props,
	};

	const left = -props.left + event.pageX - event.target.offsetLeft;
	const top = -props.top + event.pageY - event.target.offsetTop;

	if(event.nativeEvent.buttons === LEFT_BUTTON && !!props.prevX) {
		let moved = false;
		if(dragObjects) {
			const clickedElement = collideElement(event, elements, left, top, tileSize, props.zoom);

			if(clickedElement !== null && clickedElement.element.draggable) {
				clickedElement.element.x = (-props.left) + (event.clientX - props.boundingClientRect.left) - clickedElement.element.width / 2;
				clickedElement.element.y = (-props.top) + (event.clientY - props.boundingClientRect.top) - clickedElement.element.height / 2;

				moved = true;
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
	}

	setProps({
		...newProps,
		prevX: event.screenX,
		prevY: event.screenY,
	});
}
