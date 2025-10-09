import Canvas2DState from "../types/Canvas2DState";

const WHEEL_DELTA = 0.05;

export default function mouseWheel(event: React.WheelEvent, props: Canvas2DState, setProps: React.Dispatch<React.SetStateAction<Canvas2DState>>, minZoom: number, maxZoom: number) {
	let zoom = props.zoom;
	if (event.deltaY < 0) {
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
