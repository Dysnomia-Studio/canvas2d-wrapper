const LEFT_BUTTON = 1;

export default function mouseMove(event, props, setProps) {
	const newProps = {
		...props,
	};

	if(event.nativeEvent.which === LEFT_BUTTON && !!props.prevX) {
		newProps.left += (event.screenX - props.prevX);
		newProps.top += (event.screenY - props.prevY);
	}

	setProps({
		...newProps,
		prevX: event.screenX,
		prevY: event.screenY,
	});
}
