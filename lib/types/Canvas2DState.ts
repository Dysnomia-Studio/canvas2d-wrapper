type Canvas2DState = {
	boundingClientRect?: DOMRect,
	canvas?: HTMLCanvasElement,
	context?: CanvasRenderingContext2D,
	minimapBoundingClientRect?: DOMRect,
	minimapCanvas?: HTMLCanvasElement,
	minimapContext?: CanvasRenderingContext2D,
	width: number,
	height: number,
	left: number,
	top: number,
	zoom: number,
	prevX: number | null,
	prevY: number | null,
};

export default Canvas2DState;
