const WHEEL_DELTA = 0.05;

export default function mouseWheel(event, props, setProps, minZoom, maxZoom) {
	let zoom = props.zoom;
	if(event.deltaY < 0) {
		zoom += WHEEL_DELTA;
	} else {
		zoom -= WHEEL_DELTA;
	}

	zoom = Math.max(zoom, minZoom);
	zoom = Math.min(zoom, maxZoom);

	/** TODO: zoom on mouse **/

	setProps({
		...props,
		zoom,
	});
}
