import CanvasObject from './CanvasObject';

export default class ColoredCanvasObject extends CanvasObject {
	constructor(id, x, y, fill, stroke, zIndex, draggable) {
		super(id, x, y, zIndex, draggable);

		this.fill = fill;
		this.stroke = stroke;
	}

	get constructorName() {
		return 'ColoredCanvasObject';
	}
}