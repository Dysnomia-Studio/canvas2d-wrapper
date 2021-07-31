const LEFT_BUTTON = 1;

export default function mouseMove(event, props, setProps, lockXAxis, lockYAxis) {
	const newProps = {
		...props,
	};

	if(event.nativeEvent.which === LEFT_BUTTON && !!props.prevX) {
		if(!lockXAxis) {
			newProps.left += (event.screenX - props.prevX);
		}

		if(!lockYAxis) {
			newProps.top += (event.screenY - props.prevY);
		}
	}

	setProps({
		...newProps,
		prevX: event.screenX,
		prevY: event.screenY,
	});
}
