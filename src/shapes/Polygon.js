import ColoredCanvasObject from './ColoredCanvasObject';

export default class Polygon extends ColoredCanvasObject {
	/**
	 * Represents a Rectangle that will be created on the canvas.
	 *
	 * @param      {string|number}  id 		Identifier (used in click callback)
	 * @param      {number}			points  Array of coordinates {x, y} of the polygon points
	 * @param      {string}      	fill 	DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.fillStyle
	 * @param      {string}      	stroke 	DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.strokeStyle
	 * @param      {number}      	zIndex 	Stack order of the element
	 * @param      {boolean}      	hasCollisions 	Does the object have collisions ?
	 */
	constructor({ id, points, fill, stroke, zIndex, draggable, hasCollisions }) {
		super(id, points[0].x, points[0].y, fill, stroke, zIndex, draggable, hasCollisions);

		this.points = points;
	}

	get constructorName() {
		return 'Polygon';
	}
}
