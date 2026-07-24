import { WheelEvent } from "react";
import calcTileSize from "../functions/calcTileSize";
import Canvas2DState from "../types/Canvas2DState";
import { Canvas2DStateSetState } from "../types/Canvas2DStateSetState";

const WHEEL_DELTA = 0.05;

function computeNewInternalOffsets(currState: Canvas2DState, event: WheelEvent<Element>, baseTileSize: number, previousZoom: number, zoom: number) {
	const oldTileSize = calcTileSize(baseTileSize, previousZoom);
	const newTileSize = calcTileSize(baseTileSize, zoom);

	// Screen space old offsets
	const offsetX = currState.left;
	const offsetY = currState.top;

	// Mouse to world space
	const worldX = (event.clientX - offsetX) / oldTileSize;
	const worldY = (event.clientY - offsetY) / oldTileSize;

	// Screen space new offsets
	const newXOffset = event.clientX - worldX * newTileSize;
	const newYOffset = event.clientY - worldY * newTileSize;

	return { 
		left: newXOffset,
		top: newYOffset
	};
}

export default function mouseWheel(event: React.WheelEvent, setState: Canvas2DStateSetState, minZoom: number, maxZoom: number, baseTileSize: number) {
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
