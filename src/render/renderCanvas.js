export default function renderCanvas(context, width, height, elements, tileSize, state) {
	const left = state.left;
	const top = state.top;

	let prevFillStyle = '';
	let prevStrokeStyle = '';

	context.clearRect(0, 0, width, height);

	for(const element of elements) {
		if(element.fill !== prevFillStyle && typeof element.fill !== 'undefined') {
			context.fillStyle = element.fill;
			prevFillStyle = element.fill;
		}

		if(element.stroke !== prevStrokeStyle && typeof element.stroke !== 'undefined') {
			context.strokeStyle = element.stroke;
			prevStrokeStyle = element.stroke;
		}

		switch(element.type) {
			case 'rect':
				if(element.fill) {
					context.fillRect(left + element.x * tileSize, top + element.y * tileSize, element.width * tileSize, element.height * tileSize);
				}
				if(element.stroke) {
					context.fillRect(left + element.x * tileSize, top + element.y * tileSize, element.width * tileSize, element.height * tileSize);
				}
				break;
			case 'circle':
				if(element.fill) {
					context.fillCicle(left + element.x * tileSize, top + element.y * tileSize, element.radius * tileSize);
				}
				if(element.stroke) {
					context.strokeCicle(left + element.x * tileSize, top + element.y * tileSize, element.radius * tileSize);
				}
				break;
			default:
				throw new Error('Unsupported shape type:', element.type);
		}
	}
}
