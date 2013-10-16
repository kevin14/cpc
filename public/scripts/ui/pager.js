define([
	'jquery'
], function($) {
	var pagePanel = {
		callback: function() {
			return false;
		},
		init: function(config, count, callback) {
			//define global attrs
			this.callback = callback;
			this.box = $(config.box);
			this.plastic = true;//一次性销毁装置
			this.opt = $.extend({
				curId: 1, //设置当前Id的全局变量
				next_text: "下一页",
				prev_text: "上一页",
				pageCount: 5, //每页出现的信息数目
				pageAmount: 20 //表示 分页出现的个数
			}, config || {});

			//计算出最大分页数
			var totolCount = Math.ceil(count / this.opt.pageCount);

			var _html = [];
			_html.push("<div class='pagePanel'>")
			_html.push("<span class='pageTxt'>共<span>" + count + "</span>个产品</span>");
			_html.push("<a id='prev'>" + this.opt.prev_text + "</a>");
			_html.push("<a style='display:none' class='firstPage'>1</a>");
			_html.push("<span style='display:none' class='pageEllipsisPrev'>...</span><div class='numbtns'>");
			for (var i = this.opt.curId; i < this.opt.pageAmount + this.opt.curId; i++) {
				_html.push("<a class='nums' id='page" + i + "'>" + i + "</a>");
			}
			_html.push("</div><span class='pageEllipsisNext'>...</span>");
			_html.push("<a class='lastPage' id='page" + totolCount + "'>" + totolCount + "</a>");
			_html.push("<a id='next'>" + this.opt.next_text + "</a>");
			_html.push("</div>");

			//draw panel here
			this.box.append(_html.join(""));
			this.pagePanelBox = this.box.find(".pagePanel");
			this.refreshPanel(count, this.opt.curId);

		},
		//刷新panel 主要控制视觉变化
		refreshPanel: function(count, pageId) {
			//计算出最大分页数
			var totolCount = Math.ceil(count / this.opt.pageCount),
				b_prev = this.pagePanelBox.find("#prev"),
				b_next = this.pagePanelBox.find("#next"),
				b_lastPage = this.pagePanelBox.find(".lastPage"),
				b_firstPage = this.pagePanelBox.find(".firstPage"),
				ellipsis_prev = this.pagePanelBox.find("span.pageEllipsisPrev"),
				ellipsis_next = this.pagePanelBox.find("span.pageEllipsisNext"),
				num_last_id = Number(this.pagePanelBox.find(".nums:last").attr('id').substring(4)),
				num_first_id = Number(this.pagePanelBox.find(".nums:first").attr('id').substring(4)),
				animateNum = Math.floor(this.opt.pageAmount / 2),
				b_nums = this.pagePanelBox.find(".nums"),
				self = this;

			var change_panel = function(direction) { //direction 变化panel的方向 right是向右增加 left想左增加 first第一页 last最后一页
				if (direction == "right" && num_last_id == self.opt.curId && self.opt.curId < totolCount) {
					var _html = [];
					for (var i = self.opt.curId + 1; i < self.opt.curId + 1 + animateNum && i <= totolCount; i++) {
						_html.push("<a class='nums' id='page" + i + "'>" + i + "</a>")
					}
					$("#page" + self.opt.curId).after(_html.join(""));
					$(".nums:lt(" + animateNum + ")").remove();
				};
				if (direction == "left" && num_first_id == self.opt.curId && self.opt.curId > 1) {
					var _html = [];
					for (var i = self.opt.curId - 1; i >= self.opt.curId - animateNum && i > 0; i--) {
						_html.unshift("<a class='nums' id='page" + i + "'>" + i + "</a>")
					}
					$("#page" + self.opt.curId).before(_html.join(""));
					$(".nums:gt(" + (self.opt.pageAmount - 1) + ")").remove();
				};
				if (direction == "first") {
					var _html = [];
					b_nums.remove();
					for (var i = 1; i <= self.opt.pageAmount; i++) {
						_html.push("<a class='nums' id='page" + i + "'>" + i + "</a>")
					}
					$(".numbtns").append(_html.join(""));
				};
				if (direction == "last") {
					var _html = [];
					b_nums.remove();
					for (var i = totolCount - self.opt.pageAmount; i <= totolCount; i++) {
						_html.push("<a class='nums' id='page" + i + "'>" + i + "</a>")
					}
					$(".numbtns").append(_html.join(""));
				};
				b_nums = self.pagePanelBox.find(".nums");
				num_first_id = Number(self.pagePanelBox.find(".nums:first").attr('id').substring(4));
			}

			var filter = function() {
				b_nums.each(function() {
					$(this).removeClass("pageCur");
				})
				//判断上一个按钮出现的情况
				if (pageId == 1) {
					b_prev.css('display', 'none');
				} else {
					b_prev.css('display', 'inline-block');
				}
				//判断下一个按钮出现的情况
				if (pageId == totolCount) {
					b_next.css("display", "none");
				} else {
					b_next.css('display', 'inline-block');
				}
				//判断末页出现的情况
				if (num_last_id == totolCount) {
					b_lastPage.css("display", "none");
				} else {
					b_lastPage.css("display", "inline-block");
				}
				//判断后面的省略号出现的情况
				if (num_last_id == (totolCount - 1) || num_last_id == totolCount) {
					ellipsis_next.css("display", "none");
				} else {
					ellipsis_next.css("display", "inline");
				}
				//判断前面的省略号出现的情况
				if (num_first_id <=2) {
					ellipsis_prev.css("display", "none");
				} else {
					ellipsis_prev.css("display", "inline");
				}
				//判断首页出现的情况
				if (num_first_id == 1) {
					b_firstPage.css("display", "none");
				} else {
					b_firstPage.css("display", "inline-block");
				}
				//判断如果总页数少于pageAmount的话 那么只显示总页数个分页
				if (Math.ceil(count / self.opt.pageCount) < self.opt.pageAmount) {
					$(".nums:gt(" + (Math.ceil(count / self.opt.pageCount) - 1) + ")").remove()
					b_lastPage.css("display", "none");
					ellipsis_next.css("display", "none");
				};
				if (count <= self.opt.pageCount) {
					self.box.find(".pagePanel").css("display", "none");
				};
			}

			var regEvent = function() {
				//这里bind click事件
				b_nums.unbind().bind('click', function() {
					var btn_id_index = Number($(this).attr('id').substring(4));
					self.opt.curId = btn_id_index;
					if (btn_id_index == num_last_id) {
						change_panel("right");
					} else if (btn_id_index == num_first_id) {
						change_panel("left");
					}
					self.refreshPanel(count, self.opt.curId);
				})
				b_firstPage.unbind().bind('click', function() {
					self.opt.curId = 1;
					change_panel("first");
					self.refreshPanel(count, self.opt.curId)
				})
				b_lastPage.unbind().bind('click', function() {
					self.opt.curId = totolCount;
					change_panel("last");
					self.refreshPanel(count, self.opt.curId)
				})
				b_prev.unbind().bind('click', function() {
					self.opt.curId--;
					if (self.opt.curId == num_first_id) {
						change_panel("left")
					};
					self.refreshPanel(count, self.opt.curId)
				})
				b_next.unbind().bind('click', function() {
					self.opt.curId++;
					if (self.opt.curId == num_last_id) {
						change_panel("right")
					};
					self.refreshPanel(count, self.opt.curId)
				})
			}

			filter();
			regEvent();
			if (this.plastic&&this.opt.curId!=1) {
				this.plastic = false;
				change_panel("left");
				filter();
				regEvent();
			}
			$("#page" + self.opt.curId).addClass("pageCur");
			this.callback(this.opt.curId, this); //回调

		}
	}
	return pagePanel;
})