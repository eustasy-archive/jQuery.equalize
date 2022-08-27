/**
 * @author denim2x <https://github.com/denim2x>
 *
 * This file is a fork of jQuery.equalize for Vanilla JS
 */

/*global equalize*/

(function (exports, augment, $) {
	'use strict'
	augment(Array, ['forEach'])

	/**
	 * This function is (almost) exactly the same
	 * as in jQuery.equalize (modulo a few tweaks)
	 */
	exports.equalize = function (group, equalize) {
		group = group || '.group'
		equalize = equalize || '.equalize'
		$(group).each(function () {
			var highestBox = 0

			$(equalize, this).
				css('height', 'auto').
				each(function () {
					if ($(this).innerHeight() > highestBox) {
						highestBox = $(this).innerHeight()
					}
				}).
				innerHeight(highestBox)
		})
	}

	// When the page has loaded
	$(window).on('DOMContentLoaded', function () {
		var resizeTimeout
		equalize() // Run the function

		// And every time the window is resized
		$(window).on('resize', function () {
			if (resizeTimeout) return

			// Will execute at a rate of 15fps
			resizeTimeout = setTimeout(function() {
				resizeTimeout = null
				equalize() // Run again
			}, 66)
		})
	})

})(window,
/**
 * Augment Class with some of its prototype
 */
function augment (Class, keys) {
	'use strict'
	var slice = Array.prototype.slice
	keys.forEach(function (key) {
		var method = Class.prototype[key]
		Class[key] = function () {
			var args = slice.call(arguments, 1)
			method.apply(arguments[0], args)
		}
	})
}, window.jQuery ||
/**
 * Here comes a teeny-tiny jQuery shim (just because
 * it seemed more convenient to have one handy instead
 * of having to fiddle with the raw thing).
 * PS: It could also be moved in a separate script and
 * included before this one.
 */
function jQuery (sel, ctx) {
	'use strict'
	switch (typeof sel) {
		case 'string':
			ctx = ctx || document
			sel = ctx.querySelectorAll(sel)
			return {
				css: function (key, val) {
					Array.forEach(sel, function each (item) {
						item.style[key] = val
					})
					return this
				},
				each: function (callback) {
					Array.forEach(sel, function each (item, index) {
						callback.call(item, index, item)
					})
					return this
				},
				innerHeight: function (val) {
					Array.forEach(sel, function each (item) {
						item.style.height = val + 'px'
					})
					return this
				},
			}

		case 'object':
			if (sel == null) {
				throw 'Bad usage of $ - the first argument is null'
			}
			return {
				innerHeight: function () {
					return sel.clientHeight
				},
				on: function (event, handler) {
					sel.addEventListener(event, handler)
					return this
				},
			}

		case 'undefined':
			throw 'Bad usage of $ - nothing given as first argument'

		default:
			throw "$ doesn't currently work on a " + (typeof sel)
	}
})
