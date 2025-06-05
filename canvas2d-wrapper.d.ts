declare module "canvas2d-wrapper" {
	export type Position2D = {
		x: number,
		y: number
	};

	export type Surface2D = {
		x: number,
		y: number,
		width: number,
		height: number
	};

	export type Canvas2DEventCallbackParams = {
		id: string | null,
		element: CanvasObject | null,
		originalEvent: Event,
		posOnMap: Position2D
	};

	// React component
	export type Canvas2DProps = {
		width: number,
		height: number,
		trackMouseMove?: boolean,
		minZoom?: number,
		maxZoom?: number,
		tileSize?: number,
		onClick: ({ id, element, originalEvent }: Canvas2DEventCallbackParams) => void,
		onRightClick?: ({ id, element, originalEvent }: Canvas2DEventCallbackParams) => void,
		onHover?: ({ id, element, originalEvent }?: Canvas2DEventCallbackParams | null, position: Position2D | undefined) => void,
		onElementMoved?: (element: CanvasObject, x: number, y: number) => void,
		onWheel?: (e: Event) => void,
		onFrame: () => CanvasObject[],
		lockXAxis?: boolean,
		lockYAxis?: boolean,
		smoothingQuality?: string,
		dragObjects?: boolean,
		deltaLeft?: number,
		deltaTop?: number,
		// Additional props
		id: string,
		className?: string,
		showMinimap?: boolean,
		minimapWidth?: number,
		minimapHeight?: number,
		minimapFilter?: (e: CanvasObject) => boolean,
	};

	export function Canvas2D(props: Canvas2DProps);

	// Shapes
	export class CanvasObject {
		constructor(
			id: string,
			x: number,
			y: number,
			zIndex?: number,
			draggable?: boolean,
			hasCollisions?: boolean
		);

		get constructorName(): string;

		get zIndex(): number;

		set zIndex(zIndex: number);

		id: string;
		x: number;
		y: number;
		draggable: boolean | undefined;
		hasCollisions: boolean | undefined;
	}

	export class ColoredCanvasObject extends CanvasObject {
		constructor(
			id: string,
			x: number,
			y: number,
			width: number,
			height: number,
			fill?: string,
			stroke?: string,
			zIndex?: number,
			draggable?: boolean,
			hasCollisions?: boolean
		);

		fill: string | undefined;
		stroke: string | undefined;
	}

	export class CanvasImage extends ColoredCanvasObject {
		constructor({ id, x, y, width, height, src, zIndex, draggable }: {
			id: string,
			x: number,
			y: number,
			width: number,
			height: number,
			src: string,
			zIndex?: number,
			draggable?: boolean,
			hasCollisions?: boolean
		});

		crop(sx: number, swidth: number, sheight: number);

		src: string;
		width: number;
		height: number;
	}

	export class Circle extends ColoredCanvasObject {
		constructor({ id, x, y, radius, fill, stroke, zIndex, draggable }: {
			id: string,
			x: number,
			y: number,
			radius: number,
			fill?: string,
			stroke?: string,
			zIndex?: number,
			draggable?: boolean,
			hasCollisions?: boolean
		});

		radius: number;
	}

	export class LinePath extends ColoredCanvasObject {
		constructor({ id, points, stroke, zIndex }: {
			id: string,
			lineWidth: number,
			points: Position2D[],
			stroke: string,
			zIndex?: number,
			smoothCorners?: boolean,
			smoothCornersRadius?: number,
			hasCollisions?: boolean
		});

		points: Position2D[];
		lineWidth: number;
		smoothCorners?: boolean;
		smoothCornersRadius?: number;
	}

	export class Polygon extends ColoredCanvasObject {
		constructor({ id, points, width, height, src, zIndex, draggable }: {
			id: string,
			points: Position2D[],
			fill?: string,
			stroke?: string,
			zIndex?: number,
			draggable?: boolean,
			hasCollisions?: boolean
		});

		points: Position2D[];
	}

	export class Rect extends ColoredCanvasObject {
		constructor({ id, x, y, width, height, src, zIndex, draggable }: {
			id: string,
			x: number,
			y: number,
			width: number,
			height: number,
			fill?: string,
			stroke?: string,
			zIndex?: number,
			draggable?: boolean,
			hasCollisions?: boolean
		});

		width: number;
		height: number;
	}

	// Functions
	export function preloadImages(images: string[]): void;

	// Hooks
	export function useGamepad(): { [id: string]: string };
	export function useKeyboard(): { [id: string]: string };
	export function useMousePosition(): {
		x: number | null,
		y: number | null,
	};
	export function useWindowDimensions(): {
		width: number,
		height: number,
	};
}