/*
	AutoComplete.js
	自动完成控件
	author：kevin14
	data:2013/7/12
	TODO:高亮显示
*/
define(['jquery', 'underscore'], function($, _) {
	var AutoComplete = {
		init: function(options) {
			this.opt = $.extend({}, options || {})
			this.blank = null;
			this.searchInput = this._getEls(this.opt.id);
			this.removeSwitch = true;
			this.tipRemoveSwitch = true;
			this.searchInputSource;
			this.chooseIndex = -1;
			this._load();
			return this;
		},
		//这里开始注册事件
		_load: function() {
			var self = this;
			this.categoryList = [];
			$("body").append("<div class='autocomplete'><div class='searchBox clearfix'><ul class='result-list dropdown-menu dropdown-menu-search clearfix'></ul></div></div>");
			this.autocomplete = $(".autocomplete");
			$.each(self.opt.config.category, function(index, item) {
				self.categoryList.push(item);
				$(".result-list").append("<li class='category no-select' id='" + item + "'>搜索\“<span class='notice'>" + item + "</span>\”</li>");
			})
			// $(".searchBox").after("<div class='quickSearchTip'><form action='#'><input id='quickSearch' type='text'/></form></div>")
			$(".autocomplete").css({
				'width': self.searchInput.css("width"),
				'top': self.searchInput.offset().top + self.searchInput.height() + 10 + "px",
				'left': self.searchInput.offset().left + "px"
			});
			this._reg();
		},
		//Key Code List
		_keyCode: {
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38
		},
		//regit事件
		_reg: function() {
			var self = this,
				// quickSearch = $("#quickSearch"),
				removeSwitch = false,
				KEYS = this._keyCode;

			// quickSearch.bind('blur', function() {
			// 	self.removeSwitch = true;
			// 	if (self.tipRemoveSwitch) {
			// 		self._removeLi();
			// 	};
			// }).bind('focus', function() {
			// 	self.tipRemoveSwitch = true;
			// })

			self.searchInput
				.bind('keydown', function(e) {
					if (e.keyCode == KEYS.UP || e.keyCode == KEYS.DOWN) {
						if (self.autocomplete.css('visibility') == "visible") {
							self._keyChoose(e);
						};
						return false;
					} else {
						// if (e.keyCode >= 48 && e.keyCode <= 111 || e.keyCode>=186 && e.keyCode <= 192 || e.keyCode>=219 && e.keyCode <= 222 || e.keyCode == KEYS.SPACE || e.keyCode == KEYS.BACKSPACE || e.keyCode == KEYS.DELETE) {
						self._ajax();
					};
				})
				.bind('click', function() {
					self._ajax();
				})
				.bind('blur', function() {
					if (self.removeSwitch) {
						self._removeLi();
					};
				}).bind('focus', function() {
					self.tipRemoveSwitch = false;
				})
		},
		_removeLi: function() {
			var self = this;
			$(".result-list li").remove();
			$.each(self.categoryList, function(index, item) {
				$(".result-list").append("<li class='category no-select' id='" + item + "'>搜索\“<span class='notice'>" + item + "</span>\”</li>");
			})
			self.autocomplete.css('visibility', 'hidden');
		},
		//方向键选择内容
		_keyChoose: function(e) {
			var self = this;
			var list = $(".result-list li");
			var length = list.length;
			$(".result-list li").removeClass("hover");
			if (e.keyCode == this._keyCode.UP) {
				this.chooseIndex--;
				if (this.chooseIndex < 0) {
					this.chooseIndex = length;
				}
				list.eq(this.chooseIndex).addClass("hover");
				this.searchInput.val(list.eq(this.chooseIndex).find(".content").html())
			} else if (e.keyCode == this._keyCode.DOWN) {
				this.chooseIndex++;
				if (this.chooseIndex > length) {
					this.chooseIndex = 0;
				};
				list.eq(this.chooseIndex).addClass("hover");
				this.searchInput.val(list.eq(this.chooseIndex).find(".content").html())
			}
			if (this.chooseIndex == length || list.eq(this.chooseIndex).hasClass("category")) {
				this.searchInput.val(this.searchInputSource);
			};
		},
		//ajax开始请求
		_ajax: function() {
			var self = this;
			setTimeout(function() {
				self.searchInputSource = self.searchInput.val();
				if (self.searchInput.val().match(/^\s*$/)) {
					self._removeLi();
					return true;
				};
				console.log(self.searchInput.val())
				var request = $.ajax({
					type: "GET",
					dataType: "json",
					url: self.opt.url,
					data: self.searchInput.val()
				})
				request.success(function(data) {
					self.autocomplete.css('visibility', 'visible');
					self._insert(data);
					data = self.blank;
				})
				request.error(function(e) {
					console.log(e)
				})
			}, 0)
		},
		//insert li 插入结果内容集
		_insert: function(result) {
			var self = this;
			self._removeLi();
			this.autocomplete.css('visibility', 'visible');
			var length = result.length;
			if (!length) {
				//如果数组长度为0 那么取消
				this.autocomplete.css('visibility', 'hidden');
			};
			var orderList = self.categoryList;
			$.each(result, function(index, item) {
				for (var i = 0; i < self.categoryList.length; i++) {
					if (item.category == self.categoryList[i]) {
						orderList = _.without(orderList,item.category);
						$("#" + item.category).after("<li><span class='pic'>" + (self.opt.config.pic ? item.pic : '') + "</span><span class='content'>" + item.label + "</span><span class='count'>" + (self.opt.config.count ? item.count : '') + "</span></li>")
					}
				}
			})
			if (orderList.length>0) {
				for(var i = 0;i<orderList.length;i++){
					$("#"+orderList[i]).appendTo($(".result-list"));
				}
			};

			$(".searchBox .result-list li").css('width', this.searchInput.css("width"));

			this._listReg();
		},
		//注册列表的事件
		_listReg: function() {
			var self = this;
			var mousedown;
			var lista = $(".searchBox .result-list li");
			// 	quickSearch = $(".quickSearchTip");
			// quickSearch.bind("mousedown", function(e) {
			// 	return false;
			// });
			// quickSearch.find("input").bind("click", function() {
			// 	self.removeSwitch = false;
			// 	$(this).focus();
			// });

			this.autocomplete.bind('mouseenter', function(e) {
				self.searchInput.unbind('blur');
				self.searchInput.bind('blur', function(e) {
					return false;
				});
			}).bind('mouseleave', function(e) {
				self.searchInput.unbind('blur');
				self.searchInput.bind('blur', function(e) {
					if (self.removeSwitch) {
						self._removeLi();
					};
				});
			})

			lista
				.bind('mousedown', function(e) {
					mousedown = e.target;
					return false;
				})
				.bind('mouseup', function(e) {
					if (e.target != mousedown) {
						return false;
					};
					self.searchInput.val($(this).find(".content").html());
					self.autocomplete.css('visibility', 'hidden');
					self.searchInput.parent().submit();
					$(".result-list li").remove();
				})
				.bind('mouseover', function(e) {
					self.searchInput.focus();
					if (self.searchInput.get(0).setSelectionRange) {
						self.searchInput.get(0).setSelectionRange(self.searchInput.val().length, self.searchInput.val().length);
					} else if (self.searchInput.get(0).createTextRange) {
						var input = self.searchInput.get(0).createTextRange();
						input.collapse(false);
						input.select();
					}
					self.removeSwitch = true;
					lista.removeClass("hover");
					$(this).addClass('hover');
					self.chooseIndex = $(this).parent().index();
				})
				.bind('mouseout', function() {
					$(this).removeClass('hover');
				})
		},
		//return jquery对象
		_getEls: function(els) {
			return $("#" + els);
		}
	}
	return AutoComplete;
})