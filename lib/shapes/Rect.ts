import ColoredCanvasObject from './ColoredCanvasObject';

export default class Rect extends ColoredCanvasObject {
	width: number;
	height: number;
	rotation?: number;
	
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
	 * @param      {boolean}      	hasCollisions 	Does the object have collisions ?
	 * @param      {number}      	rotation The rotation in radians
	 */
	constructor({ id, x, y, width, height, fill, stroke, zIndex, draggable, hasCollisions, rotation }: {
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
	}) {
		super(id, x, y, fill, stroke, zIndex, draggable, hasCollisions);

		this.width = width;
		this.height = height;
		this.rotation = rotation;
	}

	get constructorName() {
		return 'Rect';
	}
}
