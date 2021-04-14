
export function isMobile() {
	// return /iPhone|iPad|iPod|Android|BlackBerry|BB10/i.test(navigator.userAgent);
	return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
}

export function isTablet() {
	const userAgent = navigator.userAgent.toLowerCase();
	return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
		userAgent
	);
}

export function isIOS() {
	return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isAndroid() {
	return /Android/i.test(navigator.userAgent);
}

export function isMacOS() {
	return /Mac/i.test(navigator.appVersion) && !isIOS();
}

export function isWindows() {
	return /Win/i.test(navigator.appVersion);
}

export function isLinux() {
	return /Linux/i.test(navigator.appVersion);
}

export function isHTTPS() {
	return document.location.protocol === 'https:';
}

export function createElement(type, classNames, content) {
	type = type || 'div';
	const el = document.createElement(type);
	if (classNames) {
		classNames.forEach((name) => {
			el.classList.add(name);
		});
	}
	if (content) el.innerHTML = content;
	return el;
}

export function normalize(value, min, max) {
	return (value - min) / (max - min);
}

export function lerp(norm, min, max) {
	return (max - min) * norm + min;
}

export function smoothstep(min, max, value) {
	const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
	return x * x * (3 - 2 * x);
}

export function map(value, sourceMin, sourceMax, destMin, destMax) {
	return lerp(normalize(value, sourceMin, sourceMax), destMin, destMax);
}

export function clamp(value, min, max) {
	return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

export function loop(value, min, max) {
	return value < min ? max : value > max ? min : value;
}

export function randomInt(min, max) {
	return Math.floor(min + Math.random() * (max - min + 1));
}

export function isArray(arg) {
	return Object.prototype.toString.call(arg) === '[object Array]';
}

export function shuffleArray(array) {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export function isOpera() {
	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	return !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
}

export function isFirefox() {
	// Firefox 1.0+
	return typeof InstallTrigger !== 'undefined';
}

export function isSafari() {
	// At least Safari 3+: '[object HTMLElementConstructor]'
	return navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
}

export function isChrome() {
	// return !!window.chrome && !isOpera();
	return !!navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
}

export function isIE() {
	// At least IE6
	return false || !!document.documentMode;
}

export function getChromeVersion() {
	const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	return raw ? parseInt(raw[2], 10) : false;
}

export function dispatchEvent(eventName, config) {
	config = config || null;

	let event;

	if (!isIE()) {
		event = new CustomEvent(eventName, {
			detail: config,
		});
		document.dispatchEvent(event);
	} else {
		event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, true, false, config);
		document.dispatchEvent(event);
	}
}