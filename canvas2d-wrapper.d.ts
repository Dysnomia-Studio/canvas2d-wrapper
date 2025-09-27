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
			hasCollisions?: boolean,
			rotation?: number,
		});

		crop(sx: number, swidth: number, sheight: number);

		src: string;
		width: number;
		height: number;
		rotation?: number;
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
			hasCollisions?: boolean,
			rotation?: number,
		});

		width: number;
		height: number;
		rotation?: number;
	}

	// Functions
	export function preloadImages(images: string[]): void;

	// Hooks
	export function useGamepad(): Gamepad;
	export function useKeyboard(): { [id: string]: string };
	export function useMousePosition(): {
		x: number | null,
		y: number | null,
	};
	export function useWindowDimensions(): {
		width: number,
		height: number,
	};



	// Gamepad
	/**
	 * Represents a single gamepad device.
	 */
	interface Gamepad {
		/** Unique identifier for the controller (usually the model name). */
		readonly id: string;

		/** Index of the gamepad in the array returned by getGamepads(). */
		readonly index: number;

		/** True if the gamepad is currently connected. */
		readonly connected: boolean;

		/** Timestamp (in milliseconds) of the last update. */
		readonly timestamp: number;

		/** Mapping type – typically "standard" or an empty string for custom layouts. */
		readonly mapping: string;

		/** Array of button states (pressed, touched, value). */
		readonly buttons: readonly GamepadButton[];

		/** Array of axis values ranging from -1.0 to +1.0. */
		readonly axes: readonly number[];

		/** Optional pose information (e.g., for VR controllers). */
		readonly pose?: GamepadPose | null;

		/** Optional haptic actuators (vibration). */
		readonly hapticActuators?: readonly GamepadHapticActuator[] | null;
	}

	/**
	 * Represents a single button on a gamepad.
	 */
	interface GamepadButton {
		/** Normalized pressure (0.0–1.0). */
		readonly value: number;

		/** True if the button is currently pressed. */
		readonly pressed: boolean;

		/** True if the button is being touched (may be same as pressed). */
		readonly touched: boolean;
	}

	/**
	 * Pose information for motion‑tracking controllers.
	 */
	interface GamepadPose {
		/** Position vector `[x, y, z]` in meters (if available). */
		readonly position?: readonly number[] | null;

		/** Linear velocity `[vx, vy, vz]` in m/s (if available). */
		readonly linearVelocity?: readonly number[] | null;

		/** Linear acceleration `[ax, ay, az]` in m/s² (if available). */
		readonly linearAcceleration?: readonly number[] | null;

		/** Orientation quaternion `[x, y, z, w]` (if available). */
		readonly orientation?: readonly number[] | null;

		/** Angular velocity `[wx, wy, wz]` in rad/s (if available). */
		readonly angularVelocity?: readonly number[] | null;

		/** Angular acceleration `[αx, αy, αz]` in rad/s² (if available). */
		readonly angularAcceleration?: readonly number[] | null;

		/** Indicates whether the pose data is reliable. */
		readonly hasOrientation: boolean;
		readonly hasPosition: boolean;
	}

	/**
	 * Haptic actuator for vibration feedback.
	 */
	interface GamepadHapticActuator {
		/** The type of actuator (e.g., "vibration"). */
		readonly type: string;

		/** Duration in milliseconds, strong magnitude (0–1), and optional weak magnitude. */
		pulse(duration: number, strongMagnitude: number, weakMagnitude?: number): Promise<boolean>;
	}
}