fingaFingaz
===========

Touch Finga-Fingaz adds some event listeners and custom events and whatnot to browsers that support touch.
minified is 3kb


Usage
===========
- add the js
- init like so : <code>var _FF = fingaFingaz();</code>
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
	<code>$("#thing").on("swipeleft", function(){ console.log('swiped left'); });</code>
