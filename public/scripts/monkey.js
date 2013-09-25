/*基础框架 方法集合库
  取名猴子js 因为猴子聪明好动
  Papa ：kevin14
*/
define(['jquery'], function($) {
		var Monkey = {
			drag: function(obj, position, target, offset, func) {
				func = func || $.noop;
				target = $(target || obj);
				position = position || window;
				offset = offset || {
					x: 0,
					y: 0
				};
				return obj.css("cursor", "move").bind("mousedown.drag", function(e) {
					e.preventDefault();
					e.stopPropagation();
					//if (e.which && (e.which != 1)) return;
					//if (e.originalEvent.mouseHandled) { return; }
					if (document.defaultView) {
						var _top = document.defaultView.getComputedStyle(target[0], null).getPropertyValue("top");
						var _left = document.defaultView.getComputedStyle(target[0], null).getPropertyValue("left");
					} else {
						if (target[0].currentStyle) {
							var _top = target.css("top");
							var _left = target.css("left");
						}
					}
					var width = target.outerWidth(),
						height = target.outerHeight();
					if (position === window) {
						position = $.browser.msie6 ? document.body : window;
						var mainW = $(position).width() - offset.x,
							mainH = $(position).height() - offset.y;
					} else {
						var mainW = $(position).outerWidth() - offset.x,
							mainH = $(position).outerHeight() - offset.y;
					}
					target.posX = e.pageX - parseInt(_left);
					target.posY = e.pageY - parseInt(_top);
					if (target[0].setCapture) target[0].setCapture();
					else if (window.captureEvents) window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
					$(document).unbind(".drag").bind("mousemove.drag", function(e) {
						var posX = e.pageX - target.posX,
							posY = e.pageY - target.posY;
						target.css({
							left: function() {
								if (posX > 0 && posX + width < mainW)
									return posX;
								else if (posX <= 0)
									return offset.x;
								else if (posX + width >= mainW)
									return mainW - width
							},
							top: function() {
								if (posY > 0 && posY + height < mainH)
									return posY;
								else if (posY <= 0)
									return offset.y;
								else if (posY + height >= mainH)
									return mainH - height;
							}
						});
						func(_top, _left, width, height, posY, posX);
					}).bind("mouseup.drag", function(e) {
						if (target[0].releaseCapture) target[0].releaseCapture();
						else if (window.releaseEvents) window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
						$(this).unbind(".drag");
					});
				});
			}
		}
	return Monkey;
})