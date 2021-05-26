export default function sortElements(elements) {
	elements.sort((a, b) => {
		if(a.zIndex !== b.zIndex) {
			return a.zIndex - b.zIndex;
		}

		if(a.fill === b.fill) {
			if(a.stroke === b.stroke) {
				return 0;
			}

			if(a.stroke < b.stroke) {
				return 1;
			}

			return -1;
		}

		if(a.fill < b.fill) {
			return 1;
		}

		return -1;
	});

	return elements;
}
