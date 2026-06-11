import ColoredCanvasObject from './ColoredCanvasObject';

export default class Text extends ColoredCanvasObject {
	text: string;
	maxWidth?: number;
	font?: string;

	/**
	 * Represents an Image that will be created on the canvas.
	 * Note: a cache to prevent too much loading is implemented, you can create as much
	 * images as you want of the same source without any performance issue.
	 *
	 * @param      {string|number}  id 				Identifier (used in click callback)
	 * @param      {number}			x       		Left coordinate of top-left corner of picture in canvas
	 * @param      {number}			y       		Top coordinate of top-left corner of picture in canvas
	 * @param      {number}  		text    		Text to show
	 * @param      {number}  		maxWidth  		Maximum width of this text
	 * @param      {number}  		font  			Text font
	 * @param      {string}      	fill 			DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.fillStyle
	 * @param      {string}      	stroke 			DOMString, CanvasGradient or CanvsPattern representing what should be put in CanvasRenderingContext2D.strokeStyle
	 * @param      {number}      	zIndex 			Stack order of the element
	 * @param      {boolean}      	hasCollisions 	Does the object have collisions ?
	 * @param      {number}      	rotation 		The rotation in radians
	 */
	constructor({ id, x, y, text, maxWidth, font, fill, stroke, zIndex, draggable, hasCollisions }: {
		id: string,
		x: number,
		y: number,
		text: string,
		maxWidth?: number,
		font?: string,
		fill?: string,
		stroke?: string,
		zIndex?: number,
		draggable?: boolean,
		hasCollisions?: boolean,
		rotation?: number,
	}) {
		super(id, x, y, fill, stroke, zIndex, draggable, hasCollisions);

		this.text = text;
		this.maxWidth = maxWidth;
		this.font = font;
	}

	get constructorName(): string {
		return 'Text';
	}
}
