#fingaFingaz

Touch Finga-Fingaz adds some event listeners and custom events and whatnot to browsers that support touch.
minified is ~8kb. Props to the incomparable [sprky0](https://github.com/sprky0) for his contributions.


###USAGE
- add the js
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
```
$("#thing").on("swipeleft", function(e){ 
	console.log('swiped left'); 
});
```
- you can find the object at `window.fingaFingaz` 
- or - for AMD, we're defined as 'fingaFingaz'

###NOTES: 
- for ie9 & 10 you'll have to add the css property of <code>-ms-touch-action</code> to things.
	- <code>-ms-touch-action: auto | none | [ pan-x || pan-y ] | manipulation;</code>
	- more info [https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
	-  auto : The user agent may determine any permitted touch behaviors, such as panning and zooming manipulations of the viewport, for touches that begin on the element.
	- none : Touches that begin on the element must not trigger default touch behaviors.
	- pan-x : The user agent may consider touches that begin on the element only for the purposes of horizontally scrolling the element's nearest ancestor with horizontally scrollable content.
	- pan-y : The user agent may consider touches that begin on the element only for the purposes of vertically scrolling the element's nearest ancestor with vertically scrollable content.
	- manipulation : The user agent may consider touches that begin on the element only for the purposes of scrolling and continuous zooming. Any additional behaviors supported by auto are out of scope for this specification. 
