export default class CanvasObject {
	id: string;
	x: number;
	y: number;
	draggable?: boolean;
	hasCollisions?: boolean;
	['z-index']?: number;
	fill?: string; // Always undefined here but needed for typescript to work with renderCanvas() sorting
	stroke?: string; // Always undefined here but needed for typescript to work with renderCanvas() sorting

	constructor(
		id: string,
		x: number,
		y: number,
		zIndex?: number,
		draggable?: boolean,
		hasCollisions?: boolean
	) {
		this.id = id;
		this.x = x;
		this.y = y;
		this['z-index'] = zIndex;
		this.draggable = draggable;
		this.hasCollisions = hasCollisions;
	}

	set zIndex(zIndex: number) {
		this['z-index'] = zIndex;
	}

	get zIndex(): number {
		return this['z-index'] || 0;
	}

	get constructorName(): string {
		return 'CanvasObject';
	}
}
