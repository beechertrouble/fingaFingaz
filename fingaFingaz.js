/**
* touch finga fingaz
* adding basic touch jams
* props to sprky0 for his hand in the codes
*/

var fingaFingaz = new function() {
	
	var FF = this,
		d = document,
		polyfilled = !document.implementation.hasFeature("CustomEvent","4.0"),
		supportsTouch = !!('ontouchstart' in window) || !!('onmsgesturechange' in window),
		init, touchStarter, touchMover, touchEnder, getZoom, gestureStarter, gestureEnder,
		swipeup, swiperight, swipedown, swipeleft,
		swipeUpHandler, swipeRightHandler, swipeDownHandler, swipeLeftHandler, polyfill;

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
	
	this.getCoords = function(e) {

		return { x : e.pageX !== undefined ? e.pageX : e.originalEvent.pageX, y : e.pageY !== undefined ? e.pageY : e.originalEvent.pageY };
		
	}; //
	this.trigger = function(e, ev) {
			
		d.dispatchEvent(ev);
		if($ !== undefined)
			$(e.target).trigger(ev.type);
					
	}; //
	this.init = function($) {
			
		if(!supportsTouch || !document.addEventListener) return;
		
		$('body').append('supportsTouch<br/>');
				
		// add listeners and custom events ...
		d.addEventListener("touchstart", touchStarter, false);
		d.addEventListener("touchmove", touchMover, false);
		d.addEventListener("touchend", touchEnder, false);
		d.addEventListener('gesturestart', gestureStarter, false);
		d.addEventListener('gestureend', gestureEnder, false);
		
		if(window.navigator.msPointerEnabled) {
			
			d.addEventListener("MSPointerDown", touchStarter, false);
			d.addEventListener("MSPointerMove", touchMover, false);
			d.addEventListener("MSPointerUp", touchEnder, false);
			
			$('body').append('point events<br/>');
			
		}
		
		// swipes ...
		if(polyfilled)
			polyfill();
		
		swipeup = new CustomEvent('swipeup');
		swiperight = new CustomEvent('swiperight');
		swipedown = new CustomEvent('swipedown'); 
		swipeleft = new CustomEvent('swipeleft');
		d.addEventListener('swipeup', swipeUpHandler, false);
		d.addEventListener('swiperight', swipeRightHandler, false);
		d.addEventListener('swipedown', swipeDownHandler, false);
		d.addEventListener('swipeleft', swipeLeftHandler, false);
		
		// add to jq
		$ = $ !== undefined ? $ : window.jQuery;
		if($ !== undefined)
			$.event.props.push(['touchstart', 'touchmove', 'touchend', 'gesturestart', 'gestureend', 'swipeup', 'swiperight', 'swipedown', 'swipeleft']);
					
		return FF;
			
	};
	//
	touchStarter = function(e) {
		
		if(polyfilled && e.pointerType != 'touch') return;
		
		var c = FF.getCoords(e);
		
		FF.fingers = 1;
		FF.start.y = c.y;
		FF.start.x = c.x;
		FF.prevPos.y = FF.start.y * 1;	
		FF.prevPos.x = FF.start.x * 1;	
		FF.pos.y = FF.start.y * 1;	
		FF.pos.x = FF.start.x * 1;	
		FF.startTime = new Date().getTime();
								
	} //
	touchMover = function(e) {
				
		if(polyfilled && e.pointerType != 'touch') return;
		
		var c = FF.getCoords(e);
		
		if(c.y === undefined) return true;		

		FF.pos.y = c.y;	
		FF.pos.x = c.x;
		FF.step.y = FF.prevPos.y - FF.pos.y;
		FF.step.x = FF.prevPos.x - FF.pos.x;
		FF.prevPos.y = FF.pos.y * 1;
		FF.prevPos.x = FF.pos.x * 1;
		
	} //
	touchEnder = function(e) {
		
		if(polyfilled && e.pointerType != 'touch') return;
		
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
				if(FF.swipeH == 'left') {
					FF.trigger(e, swipeleft);
				}
				if(FF.swipeH == 'right')
					FF.trigger(e, swiperight);
			} else {
				FF.swipeH = false;
			}
			if(Math.abs(FF.dist.y) > FF.threshold) {
				FF.swipeV = FF.dist.y > 0 ? 'up' : 'down';
				if(FF.swipeV == 'up')
					FF.trigger(e, swipeup);
				if(FF.swipeV == 'down')
					FF.trigger(e, swipedown);
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
	polyfill = function() {
		
		(function () {
			function CustomEvent( event, params ) {
				params = params || { bubbles: true, cancelable: false, detail: undefined };
				var evt = document.createEvent( 'CustomEvent' );
				evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
				return evt;
			};
			
			CustomEvent.prototype = window.Event.prototype;
			window.CustomEvent = CustomEvent;
		})();
				
	}
		
};