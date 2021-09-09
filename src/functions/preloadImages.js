export default function preloadImages(images) {
	for(const image of images) {
		__canvas2dWrapper__.imgCache[image] = new Image();
		__canvas2dWrapper__.imgCache[image].src = image;
	}
}