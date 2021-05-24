export default function mouseWheel(event, props, setProps, minZoom, maxZoom) {
	const oldWidth = props.width;
	const oldHeight = props.height;

	const oldZoom = props.zoom;
	let zoom = props.zoom;
	if(event.deltaY < 0) {
		zoom += 0.05;
	} else {
		zoom -= 0.05;
	}

	zoom = Math.max(zoom, minZoom);
	zoom = Math.min(zoom, maxZoom);

	/** TODO: zoom on mouse **/

	setProps({
		...props,
		zoom,
	});
}
