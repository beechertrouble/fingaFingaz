fingaFingaz
===========

Touch Finga-Fingaz adds some event listeners and custom events and whatnot to browsers that support touch.
minified is 3kb


Usage
===========
- add the js
- init like so : <code>var _FF = fingaFingaz.init();</code>
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

- note: for ie9 & 10 you'll have to add the css property of <code>-ms-touch-action</code> to things.
	- none || auto || pan-x || pan-y ...
