import calcTileSize from '../functions/calcTileSize';

const imgCache = {};

export default function renderCanvas(
	context,
	width,
	height,
	elements,
	tileSize,
	state,
) {
	const left = state.left;
	const top = state.top;

	let prevFillStyle = '';
	let prevStrokeStyle = '';

	const localTileSize = calcTileSize(tileSize, state.zoom);

	context.clearRect(0, 0, width, height);

	for(const element of elements) {
		if(
			element.fill !== prevFillStyle &&
			typeof element.fill !== 'undefined'
		) {
			context.fillStyle = element.fill;
			prevFillStyle = element.fill;
		}

		if(
			element.stroke !== prevStrokeStyle &&
			typeof element.stroke !== 'undefined'
		) {
			context.strokeStyle = element.stroke;
			prevStrokeStyle = element.stroke;
		}

		switch(element.type) {
			case 'rect':
				if(element.fill) {
					context.fillRect(
						left + element.x * localTileSize,
						top + element.y * localTileSize,
						element.width * localTileSize,
						element.height * localTileSize,
					);
				}
				if(element.stroke) {
					context.strokeRect(
						left + element.x * localTileSize,
						top + element.y * localTileSize,
						element.width * localTileSize,
						element.height * localTileSize,
					);
				}
				break;
			case 'circle':
				context.beginPath();
				context.arc(
					left + element.x * localTileSize,
					top + element.y * localTileSize,
					element.radius * localTileSize,
					0,
					2 * Math.PI
				);

				if(element.fill) {
					context.fill();
				}
				if(element.stroke) {
					context.stroke();
				}
				break;
			case 'image':
				if(!imgCache[element.src]) {
					imgCache[element.src] = new Image(element.src);
				}

				imgCache[element.src].addEventListener('load', () => {
					context.drawImage(imgCache[element.src],
						left + element.x * localTileSize,
						top + element.y * localTileSize,
						element.width * localTileSize,
						element.height * localTileSize
					);
				});
				break;
			default:
				throw new Error('Unsupported shape type:', element.type);
		}
	}
}
