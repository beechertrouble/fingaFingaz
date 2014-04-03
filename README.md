fingaFingaz
===========

Touch Finga-Fingaz adds some event listeners and custom events and whatnot to browsers that support touch.
minified is 3kb


Usage
===========
- add the js
- access via global fingaFingaz
- enjoy the new events :
	- touchstart
	- touchmove
	- touchend
	- gesturestart
	- gestureend
	- swipeUp
	- swipeRight
	- swipeDown
	- swipeLeft
- the above events are auto registered with jQuery so you can do like :
	<code>$("#thing").on("swipeLeft", function(){ console.log('swiped left'); });</code>
