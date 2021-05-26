export default class CanvasObject {
	constructor(id, x, y) {
		this.id = id;
		this.x = x;
		this.y = y;
	}

	set zIndex(index) {
		this['z-index'] = index;
	}

	get zIndex() {
		return this['z-index'] || 0;
	}
}
