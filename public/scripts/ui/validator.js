/*
	validator.js
	验证控件
	author：kevin14
	data:2013/7/12
*/
define(['jquery', 'underscore'], function($, _) {

	var Validator = {
		//初始化
		//method代表异步 填1代表异步 0代表普通
		//tipStyle 1代表 默认提示 2代表 使用提示框插件的提示
		init: function(options, submitBtn, tipStyle, method) {
			//data 异步使用 json
			this.ancyData = [];
			//提交方法 异步提交和普通提交
			this.mtd = method;
			//验证数据data
			this.validatorData = [];
			//验证叠加器
			this.validatorNum = 0;
			//验证成功叠加器
			this.validatorCount = 0;
			//tip 的样式
			this.tipStyle = tipStyle;
			//ajax success 的开关
			this.ajaxSuccess = true;
			this.switcher = true;
			this.submitBtn = $("#" + submitBtn);
			// this.validateBox = [];
			this.opt = $.extend({}, options); //options是一个键值对 key 是 id  value 是验证的类型
			this._load();
			return this;
		},
		//添加数据
		_insertData: function(key, val) {
			this.ancyData[key] = val;
		},
		//这里开始注册事件
		_load: function() {
			var self = this;
			for (var key in self.opt) {
				self.validatorNum += 1;
				(function() {
					var eachkey = key;
					self._getEls(eachkey).bind('blur', function(e) {
						self._patterns($(this), $(this).val(), self.opt[eachkey]);
					})
				})();
			}
			//提交
			this.submitBtn.click(function() {
				return self._submit();
			})
			//this.submitBtn.bind('click',self._submit());
		},
		//判断方法
		_patterns: function($, val, type) {
			var self = this,
				result = true;
			var patten = function(val, type) {
				var tip = true;
				// 判断如果type是数组
				if (_.isArray(type)) {
					switch (type[0]) {
						case 'number':
							tip = self._number(val, type[1]);
							break;
						case 'string':
							tip = self._string(val, type[1]);
							break;
						case 'username':
							tip = self._username(val, type[1], type[2]);
							break;
						default:
							break;
					}
				};
				//判断type是string 执行switch
				switch (type) {
					case 'email':
						tip = self._email(val);
						break;
					case 'tel':
						tip = self._tel(val);
						break;
					case 'mobile':
						tip = self._mobile(val);
						break;
					case 'number':
						tip = self._number(val);
						break;
					case 'string':
						tip = self._string(val);
						break;
					case 'notEmpty':
						tip = self._empty(val);
						break;
					case 'date':
						tip = self._date(val);
						break;
					case 'password':
						tip = self._password(val);
						break;
					default:
						break;
				}
				return tip;
			}
			for (var i = 0; i < val.length; i++) {
				code = val.charCodeAt(i); //获取当前字符的unicode编码
				if (code >= 65281 && code <= 65373 || code == 12288) //在这个unicode编码范围中的是所有的英文字母已经各种字符
				{
					return self._setNormalTip($, "请使用半角字符");
				}
			}

			//判断如果是对象 若是对象的话 肯定是多重判断
			if (Object.prototype.toString.call(type) === "[object Object]") {
				var clength = type.condition.length;
				if (type.method == "strict") { //严格 代表所有条件都需要遵循
					for (var i = 0; i < clength; i++) {
						var patten_result = patten(val, type.condition[i]);
						if (typeof(patten_result) != "boolean") {
							result = patten_result;
						};
					}
				} else if (type.method == 'comfort') { //宽松 代表所有条件遵循一个即可
					for (var i = 0; i < clength; i++) {
						var patten_result = patten(val, type.condition[i]);
						if (typeof patten_result === "boolean" && patten_result) {
							result = true;
							break;
						} else {
							result = patten_result;
						}
					}
				};
				return self._setNormalTip($,result);

			};
			result = patten(val, type);
			self._setNormalTip($, result);
		},
		//验证username 不能有除了_-之外的符号
		_username: function(val, condition, type) {
			if (type == 1 && !/^[\u4E00-\u9FA5a-zA-Z0-9\-\_]*$/.test(val)) {
				return "不合法字符";
			} else if (type == 2 && !/^[a-zA-Z0-9\-\_]*$/.test(val)) {
				return "不能出现中文或不合法字符";
			} else if (type == 3 && !/^[\u4E00-\u9FA5\-\_]*$/.test(val)) {
				return "不能出现English或不合法字符";
			};

			if (typeof(condition) == 'undefined') {
				return true;
			}
			return (val.length > condition[0] && val.length < condition[1]) ? true : "长度必须大于" + condition[0] + "并且小于" + condition[1];
		},
		//验证Tel
		_tel: function(val) {
			return /^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/.test(val) ? true : "电话号码格式错误";
		},
		//验证Mobile
		_mobile: function(val) {
			return /^1[3-9]\d{9}$/.test(val) ? true : "手机号码格式错误";
		},
		//验证Email
		_email: function(val) {
			return /^(?:[a-z0-9]+[_\-+.]?)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+\.)+([a-z]{2,})+$/i.test(val) ? true : "电子邮件格式错误";
		},
		//验证number
		_number: function(val, condition) {
			if (typeof(condition) == 'undefined') {
				return /^\-?(?:[1-9]\d*|0)(?:[.]\d)?$/.test(val) ? true : "number type wrong";
			}
			//假设对number有大小限制的情况下进行判断
			if (/^\-?(?:[1-9]\d*|0)(?:[.]\d)?$/.test(val)) {
				if (parseFloat(val) < condition[1] && parseFloat(val) > condition[0]) {
					return true;
				} else {
					return "数字必须大于" + condition[0] + "并且小于" + condition[1];
				}
			} else {
				return "数字格式错误";
			}
		},
		//checkBox 
		_checkbox: function() {
			return true;
		},
		//password 目前只支持非空验证 其他的自定义吧
		_password: function(val) {
			return val.length && !/^\s+$/.test(val) ? true : "密码不能为空";
		},
		//非空验证
		_empty: function(val) {
			return val.length && !/^\s+$/.test(val) ? true : "内容不能为空";
		},
		//return jquery对象
		_getEls: function(els) {
			return $("#" + els);
		},
		//判断字符串长度 并且过滤掉字符串中的不合法字符
		_string: function(val, condition) {
			//过滤什么字符自定义
			if (typeof(condition) == 'undefined') {
				//这里过滤
				return true;
			}
			return (val.length > condition[0] && val.length < condition[1]) ? true : "长度必须大于" + condition[0] + "并且小于" + condition[1];
		},
		//判断是否格式为日期格式
		// 仅支持 8 种类型的 day
		// 20120409 | 2012-04-09 | 2012/04/09 | 2012.04.09 | 以上各种无 0 的状况
		_date: function(val) {
			return /^([1-2]\d{3})([-/.]?)+([0-1][0-2])([-/.]?)+([0-3][0-9])$/.test(val) ? true : "日期格式出错";
		},
		//url方法自定义 因为对限制的需求不一样
		_url: function(val) {
			return true;
		},
		//判断是否可提交 这个方法会判断所有表单的结果是否是正确的 可以异步提交 多一个参数
		_submit: function() {
			var self = this;
			if (!this.ajaxSuccess) {
				return false;
			}

			//this.mtd == 1 代表 异步提交
			if (this.mtd != 0) {
				if (this.validatorCount != this.validatorNum) {
					this._showError();
					return false;
				} else {
					//提交 ajax
					this.ajaxSuccess = false;
					var request = $.ajax({
						type: "POST",
						url: this.mtd,
						data: this.ancyData
					})
					request.done(function() {
						// alert(1);
						alert("成功！");
						self.ajaxSuccess = true;
					})
					request.fail(function() {
						// alert(1);
						alert("失败！");
						self.ajaxSuccess = true;
					})
					return false;
				}
			} else {
				if (this.validatorCount != this.validatorNum) {
					// console.log("还不能提交嫩恩恩额")
					this._showError();
					return false;
				} else {
					// console.log("可以提交了。。。")
				}
			}
		},
		//设置tip种类 这里的tip是指初始化的时候就会出现的tip
		tipSet: function(options) {
			var opt = $.extend({}, options || {});
			for (var key in opt) {
				if (opt[key][0] == 1) {
					this._getEls(key).parent().append("<div class='popover poor-tip-right validator-tips'><div class='arrow'></div><span class='help-inline'>" + opt[key][1] + "</span></div>");
				};
			}
		},
		//设置报错tip
		_setNormalTip: function($, val) {
			// $.next().remove();
			$.parent().find(".validator-tips").remove();
			if (this.tipStyle == 1) {
				if (typeof(val) == 'boolean' && val) {
					if (jQuery.inArray($.attr('id'), this.validatorData) == -1) {
						this.validatorCount += 1;
						this.validatorData.push($.attr('id'));
					}
					this.ancyData[$.attr('id')] = $.val();
					// this.switcher = false;
					$.parent().append("<div class='validator-alerts-success validator-tips'><span class='ico-alerts'></span><span class='help-inline'>正确</span><div>");
					$.parent().parent().removeClass("control-group-error").removeClass("error").addClass("control-group-success success")

				} else {
					if (jQuery.inArray($.attr('id'), this.validatorData) != -1) {
						this.validatorCount -= 1;
						this.validatorData.splice(jQuery.inArray($.attr('id'), this.validatorData), 1);
					};
					this.ancyData[$.attr('id')] = "";
					// this.switcher = true;
					$.parent().append("<div class='validator-alerts-error validator-tips'><span class='ico-alerts'></span><span class='help-inline'>" + val + "</span></div>");
					$.parent().parent().removeClass("control-group-success").removeClass("success").addClass("control-group-error error")
				}
			} else if (this.tipStyle == 2) {
				//your code here
			};
		},
		//点击submit跳出所有报错信息
		_showError: function() {
			var error = [];
			for (var key in this.opt) {
				error.push(key);
			}
			for (var key in this.opt) {
				for (var dataKey in this.ancyData) {
					if (dataKey == key && this.ancyData[dataKey] != "") {
						error.splice($.inArray(dataKey, error), 1);
					}
				}
			}
			for (var i = 0; i < error.length; i++) {
				var input = this._getEls(error[i]);
				input.blur();
			}
		}
	}

	return Validator;
})