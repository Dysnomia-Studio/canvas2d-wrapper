import ColoredCanvasObject from './ColoredCanvasObject';

export default class Circle extends ColoredCanvasObject {
	/**
	 * Represents a Rectangle that will be created on the canvas.
	 *
	 * @param      {string|number}  id 		Identifier (used in click callback)
	 * @param      {number}			x       Left coordinate of circle center in canvas
	 * @param      {number}			y       Top coordinate of circle center in canvas
	 * @param      {number}  		radius  Circle radius in canvas
	 * @param      {string}      	fill 	DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.fillStyle
	 * @param      {string}      	stroke 	DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.strokeStyle
	 * @param      {number}      	zIndex 	Stack order of the element
	 */
	constructor({ id, x, y, radius, fill, stroke, zIndex }) {
		super(id, x, y, fill, stroke, zIndex);

		this.radius = radius;
	}
}

