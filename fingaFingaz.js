/**
* touch finga fingaz
* adding basic touch jams
* props to sprky0 for his hand in the codes
*/
;(function($, W) {

	'use strict';

	/**
	 * for AMD, don't redefine this!  (need to maintain globals and plugins)
	 */
	if (W.fingaFingaz)
		return;
	
	$ = $;
	
	var fingaFingaz = (function() {
	
		var FF = {
				inited : false,
				start : {x : 0, y : 0},
				prevPos : {x : 0, y : 0},
				pos : {x : 0, y : 0},
				step : {x : 0, y : 0},
				dist : {x : 0, y : 0},
				startTime : 0,
				endTime : 0,
				duration : 0,
				firstTouch : true,
				threshold : 75, // tap vs swipe/drag
				speed : 0,
				fingers : 1,
				tap : false,
				swipe : false,
				swipeH : false, // false, left, right
				swipeV : false, // false, up, down
				scollTimer : undefined
			},
			D = document,
			supportsTouch = !!('ontouchstart' in W) || !!('onmsgesturechange' in W),
			polyfilled = ('msPointerEnabled' in W.navigator) && !D.implementation.hasFeature("Event","4.0"),
			init, touchStarter, touchMover, touchEnder, getZoom, gestureStarter, gestureEnder,
			swipeup, swiperight, swipedown, swipeleft,
			swipeUpHandler, swipeRightHandler, swipeDownHandler, swipeLeftHandler, polyfill;
				
		FF.getCoords = function(e) {
	
			return { x : e.pageX !== undefined ? e.pageX : e.originalEvent.pageX, y : e.pageY !== undefined ? e.pageY : e.originalEvent.pageY };
			
		}; //
		FF.trigger = function(e, ev) {

			D.dispatchEvent(ev);
			if($ !== undefined)
				$(e.target).trigger(ev.type);
						
		}; //
		FF.init = function($) {
			
			if(FF.inited) return;
			FF.inited = true;
				
			if(!supportsTouch || !D.addEventListener) return;
							
			// add listeners and custom events ...
			D.addEventListener("touchstart", touchStarter, false);
			D.addEventListener("touchmove", touchMover, false);
			D.addEventListener("touchend", touchEnder, false);
			D.addEventListener('gesturestart', gestureStarter, false);
			D.addEventListener('gestureend', gestureEnder, false);
			
			if(W.navigator.msPointerEnabled) {
				
				D.addEventListener("MSPointerDown", touchStarter, false);
				D.addEventListener("MSPointerMove", touchMover, false);
				D.addEventListener("MSPointerUp", touchEnder, false);
							
			}
			
			// swipes ...
			if(polyfilled)
				polyfill();
			
			swipeup = new CustomEvent('swipeup');
			swiperight = new CustomEvent('swiperight');
			swipedown = new CustomEvent('swipedown'); 
			swipeleft = new CustomEvent('swipeleft');
			D.addEventListener('swipeup', swipeUpHandler, false);
			D.addEventListener('swiperight', swipeRightHandler, false);
			D.addEventListener('swipedown', swipeDownHandler, false);
			D.addEventListener('swipeleft', swipeLeftHandler, false);
			
			// add to jq
			$ = $ !== undefined ? $ : W.jQuery;
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
			return W.outerWidth / W.innerWidth; 
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
				
				CustomEvent.prototype = W.Event.prototype;
				W.CustomEvent = CustomEvent;
			})();
					
		}
		
		return FF;
		
	})();
	
	/**
	 * Apply the ikelos function to the supplied scope (window)
	 */
	W.fingaFingaz = fingaFingaz;

})(jQuery || $, window);

/**
 * Expose fingaFingaz as an AMD
 */
if (typeof define === "function") {
	define("fingaFingaz", [], function () { return fingaFingaz; } );
}