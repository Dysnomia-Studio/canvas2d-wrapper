import Canvas2D from './Canvas2D';

import preloadImages from './functions/preloadImages';

import useGamepad from './hooks/useGamepad';
import useKeyboard from './hooks/useKeyboard';
import useMousePosition from './hooks/useMousePosition';
import useWindowDimensions from './hooks/useWindowDimensions';

import CanvasImage from './shapes/CanvasImage';
import CanvasObject from './shapes/CanvasObject';
import Circle from './shapes/Circle';
import LinePath from './shapes/LinePath';
import Polygon from './shapes/Polygon';
import Rect from './shapes/Rect';

declare global {
	var __canvas2dWrapper__: {
		imgCache: {
			[key: string]: HTMLImageElement
		}
	};
}

export {
	Canvas2D, CanvasImage,
	CanvasObject,
	Circle,
	LinePath,
	Polygon, preloadImages, Rect, useGamepad,
	useKeyboard,
	useMousePosition,
	useWindowDimensions
};

