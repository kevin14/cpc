/*
 * Tips控件
 * Author：kevin14
 */
define(['jquery'], function($) {
	var Tips = {
		init: function(tipsGroup) {
			this.tipsGroup = $.extend({}, tipsGroup);
			this._render();
		},
		_render: function() {
			var _html = "",
				tip_elt, ui_tip;
			var tooltip = '<div style="position:absolute;display:none;" class="tooltip tooltip-in ui-tips"><div class="tooltip-inner ui-tips-content"></div><div class="tooltip-arrow"></div></div>';
			var popover = '<div style="position:absolute;display:none;" class="popover popover2 ui-tips"><div class="arrow arrow2"></div><h3 class="popover-title"><button type="button" class="close" data-dismiss="modal">×</button></h3><div class="popover-content"><p></p></div></div>';
			for (var tip in this.tipsGroup) {
				switch (this.tipsGroup[tip][1]) {
					case 'tooltip':
						_html = tooltip;
						break;
					case 'popover':
						_html = popover;
						break;
					default:
						_html = tooltip;
				}
				tip_elt = this._getEls(tip);
				tip_elt.parent().css('position', 'relative');
				tip_elt.after(_html);
				ui_tip = tip_elt.next();
				ui_tip.addClass(this.tipsGroup[tip][1] + '-' + this.tipsGroup[tip][0]);
				ui_tip.find('.ui-tips-content').html(this.tipsGroup[tip][4]);

				var elt_width = tip_elt.outerWidth(),
					elt_height = tip_elt.outerHeight(),
					elt_top = tip_elt[0].offsetTop,
					elt_left = tip_elt[0].offsetLeft,
					tip_width = ui_tip.outerWidth(),
					tip_height = ui_tip.outerHeight();


				switch (this.tipsGroup[tip][0]) {
					case 'right':
						ui_tip.css({
							top: elt_top + elt_height / 2 - tip_height / 2+this.tipsGroup[tip][3] + "px",
							left: elt_width +this.tipsGroup[tip][2]+ "px"
						})
						break;
					case 'left':
						ui_tip.css({
							top: elt_top + elt_height / 2 - tip_height / 2+this.tipsGroup[tip][3] + "px",
							left: -tip_width +this.tipsGroup[tip][2]+ "px"
						})
						break;
					case 'top':
						ui_tip.css({
							top: elt_top - tip_height+this.tipsGroup[tip][3] + "px",
							left: elt_width/2 - tip_width/2 +this.tipsGroup[tip][2]+ "px"
						})
						break;
					case 'bottom':
						ui_tip.css({
							top: elt_top + elt_height+this.tipsGroup[tip][3] + "px",
							left: elt_width/2 - tip_width/2 +this.tipsGroup[tip][2]+ "px"
						})
						break;
					default:
						ui_tip.css({
							top: elt_top + elt_height / 2 - tip_height / 2+this.tipsGroup[tip][3] + "px",
							left: elt_width +this.tipsGroup[tip][2]+ "px"
						})
				}

			}
		},
		_getEls: function(tclass) {
			return $("." + tclass);
		},
		tShow: function(tclass) {
			$("."+tclass).next().show();
		},
		tHide: function(tclass) {
			$("."+tclass).next().hide();
		}
	}
	return Tips;
})