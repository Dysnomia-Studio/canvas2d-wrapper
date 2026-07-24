import { WheelEvent } from "react";
import calcTileSize from "../functions/calcTileSize";
import Canvas2DState from "../types/Canvas2DState";

const WHEEL_DELTA = 0.05;

function computeNewInternalOffsets(currState: Canvas2DState, event: WheelEvent<Element>, baseTileSize: number, previousZoom: number, zoom: number) {
	const oldTileSize = calcTileSize(baseTileSize, previousZoom);
	const newTileSize = calcTileSize(baseTileSize, zoom);

	// Screen space old offsets
	const offsetX = currState.left + currState.deltaLeft;
	const offsetY = currState.top + currState.deltaTop;

	// Mouse to world space
	const worldX = (event.clientX - offsetX) / oldTileSize;
	const worldY = (event.clientY - offsetY) / oldTileSize;

	// Screen space new offsets
	const newXOffset = event.clientX - worldX * newTileSize;
	const newYOffset = event.clientY - worldY * newTileSize;

	return { 
		left: newXOffset - currState.deltaLeft,
		top: newYOffset - currState.deltaTop
	};
}

export default function mouseWheel(event: React.WheelEvent, setState: React.Dispatch<React.SetStateAction<Canvas2DState>>, minZoom: number, maxZoom: number, baseTileSize: number) {
	setState((currState) => {
		let zoom = currState.zoom;
		const previousZoom = zoom;
		if (event.deltaY < 0) {
			zoom += WHEEL_DELTA;
		} else if (event.deltaY > 0) {
			zoom -= WHEEL_DELTA;
		}

		zoom = Math.max(zoom, minZoom);
		zoom = Math.min(zoom, maxZoom);
		
		const { left, top } = computeNewInternalOffsets(currState, event, baseTileSize, previousZoom, zoom);

		return {
			...currState,
			left,
			top,
			zoom,
		};
	})
}
