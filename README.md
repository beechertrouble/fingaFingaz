#fingaFingaz

Touch Finga-Fingaz adds some event listeners and custom events and whatnot to browsers that support touch.
minified is ~8kb. Props to the incomparable [sprky0](https://github.com/sprky0) for his contributions.


###Usage
- add the js
- init like so : <code>var _FF = fingaFingaz.init();</code>
- or - for AMD, we're defined as 'fingaFingaz'
- enjoy the new events :
	- swipeup
	- swiperight
	- swipedown
	- swipeleft
- also : 
	- touchstart
	- touchmove
	- touchend
	- gesturestart
	- gestureend
- all above events are auto registered with jQuery so you can do like :
	```javascript
	$("#thing").on("swipeleft", function(){ 
		console.log('swiped left'); 
	});
	```

###notes: 
- for ie9 & 10 you'll have to add the css property of <code>-ms-touch-action</code> to things.
	- <code>-ms-touch-action: none || auto || pan-x || pan-y;</code>
	- more info [https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
