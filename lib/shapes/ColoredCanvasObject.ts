import CanvasObject from './CanvasObject';

export default class ColoredCanvasObject extends CanvasObject {
	fill?: string;
	stroke?: string;

	constructor(
		id: string,
		x: number,
		y: number,
		fill?: string,
		stroke?: string,
		zIndex?: number,
		draggable?: boolean,
		hasCollisions?: boolean
	) {
		super(id, x, y, zIndex, draggable, hasCollisions);

		this.fill = fill;
		this.stroke = stroke;
	}

	get constructorName() {
		return 'ColoredCanvasObject';
	}
}