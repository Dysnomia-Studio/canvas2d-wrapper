export default class CanvasObject {
	constructor(id, x, y, zIndex) {
		this.id = id;
		this.x = x;
		this.y = y;
		this['z-index'] = zIndex;
	}

	set zIndex(zIndex) {
		this['z-index'] = zIndex;
	}

	get zIndex() {
		return this['z-index'] || 0;
	}
}
