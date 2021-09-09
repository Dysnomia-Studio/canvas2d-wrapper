import ColoredCanvasObject from './ColoredCanvasObject';

export default class Rect extends ColoredCanvasObject {
	/**
	 * Represents a Rectangle that will be created on the canvas.
	 *
	 * @param      {string|number}  id 		Identifier (used in click callback)
	 * @param      {number}			x       Left coordinate of top-left corner of rectangle in canvas
	 * @param      {number}			y       Top coordinate of top-left corner of rectangle in canvas
	 * @param      {number}  		width   Rectangle width in canvas
	 * @param      {number}  		height  Rectangle height in canvas
	 * @param      {string}      	fill 	DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.fillStyle
	 * @param      {string}      	stroke 	DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.strokeStyle
	 * @param      {number}      	zIndex 	Stack order of the element
	 */
	constructor({ id, x, y, width, height, fill, stroke, zIndex, draggable }) {
		super(id, x, y, fill, stroke, zIndex, draggable);

		this.width = width;
		this.height = height;
	}

	get constructorName() {
		return 'Rect';
	}
}
