//* ========================
//File: modernizr-tests.js
//Author: Raphael Oliveira
//======================== */


/* modernizr-test_position_fixed_ios.js
			* https://gist.github.com/wheresrhys/5160401
			* Custom Tests using Modernizr's addTest API
			*/

			/* iOS
			* There may be times when we need a quick way to reference whether iOS is in play or not.
			* While a primative means, will be helpful for that.
			*/
Modernizr.addTest('ipad', function() {
	return !!navigator.userAgent.match(/iPad/i);
});

Modernizr.addTest('iphone', function() {
	return !!navigator.userAgent.match(/iPhone/i);
});

Modernizr.addTest('ipod', function() {
	return !!navigator.userAgent.match(/iPod/i);
});

Modernizr.addTest('appleios', function() {
	return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
});

Modernizr.addTest('android', function() {
	return !!navigator.userAgent.match(/Android/i);
});

/* CSS position:fixed -- Not supported in older IE browsers, nor on Apple's iOS 5 devices and Androids. Actually the token example on the Modernizr docs. http://www.modernizr.com/docs/ */
Modernizr.addTest('csspositionfixed', function() {

	/* Uh-oh. iOS < 5 would return a false positive here. as Android 2.2 - If it's about to return true, we'll explicitly test for known iOS & Android User Agent strings."UA Sniffing is bad practice" you say. Agreeable, but sadly this feature has made it to Modernizr's list of undectables, so we're reduced to having to use this. */

	navigator.userAgent.match(/OS (\d)/i);
	if (Modernizr.appleios && RegExp.$1 < 5) {
		return false;
	}

	navigator.userAgent.match(/Android (\d+)\.(\d)/i);
	if (Modernizr.android && (RegExp.$1 <= 2 && RegExp.$2 < 3)) {
		return false;
	}

	var test = document.createElement('div'),
		control = test.cloneNode(false),
		fake = false,
		root = document.body || (function() {
			fake = true;
			return document.documentElement.appendChild(document.createElement('body'));
		}());

	var oldCssText = root.style.cssText;
	root.style.cssText = 'padding:0;margin:0';
	test.style.cssText = 'position:fixed;top:42px';
	root.appendChild(test);
	root.appendChild(control);
	var ret = test.offsetTop !== control.offsetTop;

	root.removeChild(test);
	root.removeChild(control);
	root.style.cssText = oldCssText;
	if (fake) {
		document.documentElement.removeChild(root);
	}

	return ret;
});