export default class CanvasObject {
	constructor(id, x, y, zIndex, draggable, hasCollisions) {
		this.id = id;
		this.x = x;
		this.y = y;
		this['z-index'] = zIndex;
		this.draggable = draggable;
		this.hasCollisions = hasCollisions;
	}

	set zIndex(zIndex) {
		this['z-index'] = zIndex;
	}

	get zIndex() {
		return this['z-index'] || 0;
	}

	get constructorName() {
		return 'CanvasObject';
	}
}
