import Canvas2D from './Canvas2D';
import lineWithLine from './collisions/lineWithLine';
import pointInCircle from './collisions/pointInCircle';
import pointInPolygon from './collisions/pointInPolygon';
import pointInRectangle from './collisions/pointInRectangle';
import pointOnLinePath from './collisions/pointOnLinePath';
import preloadImages from './functions/preloadImages';
import useGamepad from './hooks/useGamepad';
import useKeyboard from './hooks/useKeyboard';
import useMousePosition from './hooks/useMousePosition';
import useWindowDimensions from './hooks/useWindowDimensions';
import getLineLength from './maths/getLineLength';
import normalOnLine from './maths/normalOnLine';
import segmentAngle from './maths/segmentAngle';
import CanvasImage from './shapes/CanvasImage';
import CanvasObject from './shapes/CanvasObject';
import Circle from './shapes/Circle';
import LinePath from './shapes/LinePath';
import Polygon from './shapes/Polygon';
import Rect from './shapes/Rect';
import Canvas2DProps from './types/Canvas2DProps';
import CollideElementResultItem from './types/CollideElementResultItem';
import Position2D from './types/Position2D';
import Surface2D from './types/Surface2D';

declare global {
	var __canvas2dWrapper__: {
		imgCache: {
			[key: string]: HTMLImageElement
		}
	};
}

// Main react element
export {
	Canvas2D
};
// Shapes
export {
	CanvasImage,
	CanvasObject,
	Circle,
	LinePath,
	Polygon,
	Rect
};
// Collision algorithms
export {
	lineWithLine,
	pointInCircle,
	pointInPolygon,
	pointInRectangle,
	pointOnLinePath
};
// Helpers
export {
	preloadImages
};
// Hooks
export {
	useGamepad,
	useKeyboard,
	useMousePosition,
	useWindowDimensions
};
// Maths
export {
	getLineLength,
	normalOnLine,
	segmentAngle
};
// Types
export {
	type Canvas2DProps,
	type CollideElementResultItem,
	type Position2D,
	type Surface2D
};

