type Canvas2DState = {
	boundingClientRect?: DOMRect,
	canvas?: HTMLCanvasElement,
	context?: CanvasRenderingContext2D,
	minimapBoundingClientRect?: DOMRect,
	minimapCanvas?: HTMLCanvasElement,
	minimapContext?: CanvasRenderingContext2D,
	left: number,
	top: number,
	width: number,
	height: number,
	zoom: number,
	deltaTop: number,
	deltaLeft: number,
	prevX: number | null,
	prevY: number | null,
};

export default Canvas2DState;
