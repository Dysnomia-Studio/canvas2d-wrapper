import CanvasObject from './CanvasObject';

export default class CanvasImage extends CanvasObject {
	/**
	 * Represents an Image that will be created on the canvas.
	 * Note: a cache to prevent too much loading is implemented, you can create as much
	 * images as you want of the same source without any performance issue.
	 *
	 * @param      {string|number}  id 		Identifier (used in click callback)
	 * @param      {number}			x       Left coordinate of top-left corner of picture in canvas
	 * @param      {number}			y       Top coordinate of top-left corner of picture in canvas
	 * @param      {number}  		width   Picture width in canvas
	 * @param      {number}  		height  Picture height in canvas
	 * @param      {string}      	src 	Image source link
	 * @param      {number}      	zIndex 	Stack order of the element
	 */
	constructor({ id, x, y, width, height, src, zIndex, draggable }) {
		super(id, x, y, zIndex, draggable);

		this.width = width;
		this.height = height;
		this.src = src;
	}

	crop(x, y, width, height) {
		this.sx = sx;
		this.sy = sx;
		this.swidth = swidth;
		this.sheight = sheight;
	}

	get constructorName() {
		return 'CanvasImage';
	}
}
