import ColoredCanvasObject from './ColoredCanvasObject';

export default class LinePath extends ColoredCanvasObject {
	/**
	 * Represents a Line Path that will be created on the canvas.
	 *
	 * @param      {string|number}  id 		Identifier (used in click callback)
	 * @param      {number}			points  Array of coordinates {x, y} of the polygon points
	 * @param      {string}      	stroke 	DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.strokeStyle
	 * @param      {number}      	zIndex 	Stack order of the element
	 * @param 	   {number} 		lineWidth Width of the stroked line
	 */
	constructor({ id, lineWidth, points, stroke, zIndex }) {
		super(id, points[0].x, points[0].y, 'none', stroke, zIndex, false);

		this.points = points;
		this.lineWidth = lineWidth;
	}

	get constructorName() {
		return 'LinePath';
	}
}
