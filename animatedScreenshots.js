/*
	WebPics Animated Plugin v1
	
	What it is:
		A plugin to animate screenshots within a div thus simulating a user scrolling the website.
	
	What it does:
		This plugin will add jQuery to the dom if not already added. Then proceed to attach itself to the dom elements you specify (per usage).
		
	Usage:
		$('.animatedScreenshots').animateScreenshot();

	Options:
		repeat: bool
		speed: number
		timeout: milliseconds
		
	Usage with Default Options:
		$('.animatedScreenshots').animateScreenshot({
			repeat: true,
			speed: 5000,
			timeout: 1000
		});
		
*/
if (typeof jQuery == 'undefined') {
	document.write('<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></' + 'script>');
}
if (typeof animatethis != 'function') {
	function animatethis(targetElement, speed, height, repeat, timeout) {
		var thisSS = $(targetElement);
		thisSS.animate({
			marginTop: "-=" + Math.abs(height) + 'px'
		}, {
			duration: speed,
			complete: function() {
				thisSS.animate({
					marginTop: "+=" + Math.abs(height) + 'px'
				}, {
					duration: speed,
					complete: function() {
						var imgHeight = thisSS.height();
						var visibleHeight = thisSS.parents().eq(0).css('padding-bottom');
						var visibleHeight = visibleHeight.split(',');
						var marginHeight = parseInt(parseInt(imgHeight) - parseInt(visibleHeight[0]));
						if (repeat) {
							setTimeout(function() {
								animatethis(thisSS, speed, marginHeight, repeat, timeout);
							}, timeout);
						}
					}
				});
			}
		});
	};
}
if (typeof addLoadEvent != 'function') {
	function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				func();
			}
		}
	}
}
$.fn.animateScreenshot = function(options) {
	$.fn.animateScreenshot.defaultOptions = {
		repeat: true,
		speed: 5000,
		timeout: 1000
	};
	options = $.extend({}, $.fn.animateScreenshot.defaultOptions, options);
	$(this).each(function() {
		$(this).on('load', function() {
			var thisSS = $(this);
			var imgHeight = thisSS.height();
			var visibleHeight = thisSS.parents().eq(0).css('padding-bottom');
			var visibleHeight = visibleHeight.split(',');
			var marginHeight = parseInt(parseInt(imgHeight) - parseInt(visibleHeight[0]));
			if(marginHeight > 0){
			setTimeout(function() {
				animatethis(thisSS, options.speed, marginHeight, options.repeat, options.timeout);
			}, 1);
			}
			else{
				console.log('AnimatedScreenshot Error: Picture is smaller than visible area');
			}
		});
	});
	return $(this);
};