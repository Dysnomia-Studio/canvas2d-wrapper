window.__canvas2dWrapper__ = __canvas2dWrapper__ || {};
window.__canvas2dWrapper__.imgCache = __canvas2dWrapper__.imgCache || {};

export default function preloadImages(images) {
	for(const image of images) {
		__canvas2dWrapper__.imgCache[image] = new Image();
		__canvas2dWrapper__.imgCache[image].src = image;
	}
}