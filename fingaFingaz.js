/**
* touch finga fingaz
* adding basic touch jams
* props to sprky0 for his hand in the codes
*/
var fingaFingaz = (function() {
	
	var FF = this,
		supportsTouch = !!('ontouchstart' in window) || !!('onmsgesturechange' in window),
		init, touchStarter, touchMover, touchEnder, getZoom, gestureStarter, gestureEnder,
		swipe, swipeHandler, swipeUp, swipeUpHandler, swipeRight, swipeRightHandler, swipeDown, swipeDownHandler, swipeLeft, swipeLeftHandler;

	FF.start = {x : 0, y : 0};
	FF.prevPos = {x : 0, y : 0};
	FF.pos = {x : 0, y : 0};
	FF.step = {x : 0, y : 0};
	FF.dist = {x : 0, y : 0};
	FF.speed = {x : 0, y : 0};
	FF.startTime = 0;
	FF.endTime = 0;
	FF.duration = 0;
	FF.firstTouch = true;
	FF.threshold = 75; // tap vs swipe/drag
	FF.speed = 0;
	FF.fingers = 1;
	FF.tap = false;
	FF.swipe = false;
	FF.swipeH = false; // false, left, right
	FF.swipeV = false; // false, up, down
	FF.scollTimer = undefined;

	init = function() {
			
		if(!supportsTouch || !document.addEventListener) return;
		
		// add listeners and custom events ...
		document.addEventListener("touchstart", touchStarter, false);
		document.addEventListener("touchmove", touchMover, false);
		document.addEventListener("touchend", touchEnder, false);
		document.addEventListener('gesturestart', gestureStarter, false);
		document.addEventListener('gestureend', gestureEnder, false);
		
		// swipes ...
		swipe = new Event('swipe');
		swipeUp = new Event('swipeUp');
		swipeRight = new Event('swipeRight');
		swipeDown = new Event('swipeDown'); 
		swipeLeft = new Event('swipeLeft');
		document.addEventListener('swipe', swipeHandler, false);
		document.addEventListener('swipeUp', swipeUpHandler, false);
		document.addEventListener('swipeRight', swipeRightHandler, false);
		document.addEventListener('swipeDown', swipeDownHandler, false);
		document.addEventListener('swipeLeft', swipeLeftHandler, false);
		
		// add to jq
		if(window.jQuery !== undefined) {
			jQuery.event.props.push('touchstart');
			jQuery.event.props.push('touchmove');
			jQuery.event.props.push('touchend');
			jQuery.event.props.push('gesturestart');
			jQuery.event.props.push('gestureend');
			jQuery.event.props.push('swipe');
			jQuery.event.props.push('swipeUp');
			jQuery.event.props.push('swipeRight');
			jQuery.event.props.push('swipeDown');
			jQuery.event.props.push('swipeLeft');
		}
			
	};
	//
	touchStarter = function(e) {
		
		//e.preventDefault();	
		FF.fingers = 1;
		FF.start.y = e.pageY;
		FF.start.x = e.pageX;
		FF.prevPos.y = FF.start.y * 1;	
		FF.prevPos.x = FF.start.x * 1;	
		FF.pos.y = FF.start.y * 1;	
		FF.pos.x = FF.start.x * 1;	
		FF.startTime = new Date().getTime();
		FF.targetClass = e.target.className;
		
	} //
	touchMover = function(e) {

		// if(FF.fingers < 2 && getZoom() <= 1) e.preventDefault();
		if(e.pageY === undefined) return true;		

		FF.pos.y = e.pageY;	
		FF.pos.x = e.pageX;

		FF.step.y = FF.prevPos.y - FF.pos.y;
		FF.step.x = FF.prevPos.x - FF.pos.x;
		FF.prevPos.y = FF.pos.y * 1;
		FF.prevPos.x = FF.pos.x * 1;

	} //
	touchEnder = function(e) {
		
		FF.endTime = new Date().getTime();
		FF.duration = FF.endTime - FF.startTime;

		// e.preventDefault();
		// single finger jams				
		if(FF.fingers < 2) { 

			if(FF.firstTouch)
				FF.firstTouch = false;

			// distance
			FF.dist.y = FF.start.y - FF.pos.y;
			FF.dist.x = FF.start.x - FF.pos.x;

			// swipe / tap
			FF.tap = Math.abs(FF.dist.x) > FF.threshold && Math.abs(FF.dist.y) > FF.threshold ? true : false;
			FF.swipe = FF.tap ? false : true;
			
			// swipe
			if(Math.abs(FF.dist.x) > FF.threshold) {
				FF.swipeH = FF.dist.x > 0 ? 'left' : 'right';
				document.dispatchEvent(swipe);
				if(FF.swipeH == 'left')
					document.dispatchEvent(swipeLeft);
				if(FF.swipeH == 'right')
					document.dispatchEvent(swipeRight);
			} else {
				FF.swipeH = false;
			}
			if(Math.abs(FF.dist.y) > FF.threshold) {
				FF.swipeV = FF.dist.y > 0 ? 'up' : 'down';
				document.dispatchEvent(swipe);
				if(FF.swipeV == 'up')
					document.dispatchEvent(swipeUp);
				if(FF.swipeV == 'down')
					document.dispatchEvent(swipeDown);
			} else {
				FF.swipeV = false;
			}

		}

		/* reset	
		FF.pos.y = 0;
		FF.pos.x = 0;
		*/
		
	} //
	getZoom = function() { 
		return window.outerWidth / window.innerWidth; 
	} //
	gestureStarter = function(e) {
		FF.fingers = 2;
	} //
	gestureEnder = function(e) {
		FF.fingers = 2;
	} //
	swipeHandler = function(e) {
		//console.log('swipe', e);
	} //
	swipeUpHandler = function(e) {
		//console.log('swipeUp');
	} //
	swipeRightHandler = function(e) {
		//console.log('swipeRight');
	} // 
	swipeDownHandler = function(e) {
		//console.log('swipeDown');
	} //
	swipeLeftHandler = function(e) {
		//console.log('swipeLeft');
	} //
	
	// do it ...
	init();
	return this;

})();