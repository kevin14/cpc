define(['jquery'], function($) {
	var Selector = {
		init: function(options) {
			this.opt = $.extend(true, {
				layer: 1,
				search_bar: 0, //0代表没有搜索框
				selector_title: "级联选择菜单",
				selector_width: 200,
				drag: true,
				selector_detial_title: [],
				remember_data: [],
				auto_remember_switch: true,
				callback: function() {
					return false;
				}
			}, options || {});
			this.auto_remember_data = this.opt.defaultData.split(",");
			this.kSelector_data = [];
			this._drawSelector();
			return this;
		},
		_drawSelector: function() {
			var i = 0,
				_html = "",
				self = this;
			$("body").append('<div id="kSelector"><div class="selector_title">' + this.opt.selector_title + '</div><div class="selector_info_text"></div><ul class="selector_ul clearfix"></ul><span class="kSelector_close">x</span></div>')

			for (var i; i < this.opt.layer; i++) {
				$(".selector_ul").append('<li class="kSelector_inner"><div class="detial_title">' + this.opt.selector_detial_title[i] + '</div></li>');
			}
			$(".kSelector_inner").css({
				width: this.opt.selector_width + "px"
			})

			this.kSelector = $("#kSelector");
			this.kSelector.append('<div style="text-align:center;"><span class="kSelector_submit btn btn-primary">确定</span></div>')

			this.kSelector_submit = $(".kSelector_submit");
			this.kSelector_info_text = $(".selector_info_text");
			this.kSelector_ul = $("#kSelector .selector_ul");
			this.kSelector_close = this.kSelector.find(".kSelector_close");

			if (this.opt.search_bar > 0) {
				this.kSelector_ul.find("li:eq(" + (this.opt.search_bar - 1) + ") .detial_title").after('<input type="text" placeholder="在结果中检索" class="kSelector_search input-txt span2 search-query" >')
				this.kSelector_search = $(".kSelector_search");
				this._searchReg();
			};

			this.kSelector.css({
				'margin-left': -$("#kSelector").outerWidth() / 2 + "px"
			})

			this._regEvent();
			this._getData(1);
		},
		_getData: function(layer_count) {
			var self = this;
			if (typeof this.opt.data === "string") { //如果是string 执行ajax方法 若不是 读本地数据 哇咔咔 太天才了
				$.ajax({
					url: self.opt.data,
					type: "get",
					dataType: "json",
					data: {
						layer: layer_count
					},
					success: function(data) {
						self._render(layer_count, data);
					},
					error: function(e) {
					}
				})
			} else {//本地数据
				// 束手无策。。。
			}
		},
		_render: function(layer_count, data) {
			var self = this;
			this.kSelector_ul.find("li:gt(" + (layer_count - 2) + ")").each(function() {
				$(this).find('a').remove()
			});
			self.kSelector_info_text.html();
			for (var i = 0; i < data.length; i++) {
				this.kSelector_ul.find("li:eq(" + (layer_count - 1) + ")").append('<a kSelector-data=' + data[i].code + '>' + data[i].name + '</a>');
			}

			/*临时绑定click方法*/
			this.kSelector_ul.find("li:eq(" + (layer_count - 1) + ") a").bind('click', function() {
				$(this).parent().find('a').removeClass('selector_on');
				$(this).addClass('selector_on');
				self._setInfoTitle(layer_count);
				self._getData(layer_count + 1);
			}).bind('dblclick',function(){
				self.kSelector_submit.click();
			})

			/*执行autoremember方法*/
			if (this.opt.defaultData != "" && this.opt.auto_remember_switch) {
				this._autoRemember(layer_count - 1);
			};
		},
		_setInfoTitle: function(layer_count) {
			var info_text = "";
			for (var i = 0; i < layer_count; i++) {
				info_text += this.kSelector_ul.find("li:eq(" + i + ") a.selector_on").html() + "-";
			}
			info_text = info_text.substring(0, info_text.length - 1);
			this.kSelector_info_text.html(info_text);

			if (layer_count == this.opt.layer) {
				return false;
			};
		},
		destory: function() {
			this.kSelector.remove();
		},
		_regEvent: function(layer_count) {
			var self = this;
			this.kSelector_close.bind('click', function() {
				self.destory();
			})
			this.kSelector_submit.bind('click', function() {
				self.kSelector_data = [];
				var li_length = self.kSelector_ul.find("li").length;
				for (var i = 0; i < li_length; i++) {
					var code_data = self.kSelector_ul.find("li:eq(" + i + ") a.selector_on").attr("kSelector-data");
					self.kSelector_data.push({
						code: code_data,
						value: self.kSelector_ul.find("li:eq(" + i + ") a.selector_on").html()
					})
					self.opt.remember_data.push(code_data);
				}
				self.opt.remember_data = self.opt.remember_data.join(",");
				self.opt.callback(self.kSelector_data, self.opt.remember_data);
				self.destory();
			})
		},
		_searchReg: function() {
			var self = this,
				reg = "";
			this.kSelector_search.bind('keydown', function(e) {
				setTimeout(function() {
					reg = new RegExp("(" + self.kSelector_search.val() + ")", "i");
					self.kSelector_ul.find("li:eq(" + (self.opt.search_bar - 1) + ") a").each(function() {
						if (reg.test($(this).html())) {
							$(this).parent().find('a').removeClass('selector_on');
							$(this).addClass("selector_on");
							$(this).insertAfter(self.kSelector_search);
							self._setInfoTitle(self.opt.search_bar);
							return false;
						};
					})
				}, 0)
			})
		},
		_autoRemember: function(i) {
			var self = this;
			this.kSelector_ul.find("li:eq(" + i + ") a").each(function() {
				if ($(this).attr("kSelector-data") == self.auto_remember_data[i]) {
					$(this).click();
				};
			})
			if (i == this.opt.layer - 1) {
				this.opt.auto_remember_switch = false;
			};
		}
	}
	return Selector;
})