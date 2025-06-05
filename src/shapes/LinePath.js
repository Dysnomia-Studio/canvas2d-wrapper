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
	 * @param 	   {number} 		smoothCorners  Should we have smooth corners ?
	 * @param 	   {number} 		smoothCornersRadius  Radius of smoothed corners
	 * @param      {boolean}      	hasCollisions 	Does the object have collisions ?
	 */
	constructor({ id, lineWidth, points, stroke, zIndex, smoothCorners, smoothCornersRadius, hasCollisions }) {
		super(id, points[0].x, points[0].y, 'none', stroke, zIndex, false, hasCollisions);

		this.points = points;
		this.lineWidth = lineWidth;
		this.smoothCorners = smoothCorners;
		this.smoothCornersRadius = smoothCornersRadius;
	}

	get constructorName() {
		return 'LinePath';
	}
}
