import Canvas2DState from "../types/Canvas2DState";

const WHEEL_DELTA = 0.05;

export default function mouseWheel(event: React.WheelEvent, setState: React.Dispatch<React.SetStateAction<Canvas2DState>>, minZoom: number, maxZoom: number) {
	setState((currState) => {
		let zoom = currState.zoom;
		if (event.deltaY < 0) {
			zoom += WHEEL_DELTA;
		} else if (event.deltaY > 0) {
			zoom -= WHEEL_DELTA;
		}

		zoom = Math.max(zoom, minZoom);
		zoom = Math.min(zoom, maxZoom);

		return {
			...currState,
			zoom,
		};
	})
}
