import CanvasObject from "../shapes/CanvasObject";

export default function sortElements(elements: CanvasObject[]) {
	elements.sort((a, b) => {
		if (a.zIndex !== b.zIndex) {
			return a.zIndex - b.zIndex;
		}

		if (a.fill === b.fill && a.stroke && b.stroke) {
			if (a.stroke === b.stroke) {
				return 0;
			}

			if (a.stroke < b.stroke) {
				return 1;
			}

			return -1;
		}

		if (a.fill && b.fill) {
			if (a.fill < b.fill) {
				return 1;
			}

			if (a.fill > b.fill) {
				return -1;
			}
		}

		return 0;
	});

	return elements;
}
