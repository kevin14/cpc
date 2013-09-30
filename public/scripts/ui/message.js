define(['jquery'],function ($){
	
	var Message = {
	//初始化
	init: function(options) {
		this.opt = $.extend({
			//队列
			objQueen: [],
			//显示位置
			position: "",
			//设置
			config: null,
			//偏差值
			posX: -10,
			//偏差值
			posY: -10,
			//总高度
			allHeight: 0,
			//延迟多少毫秒
			delayTime: 8000,
			//回调方法
			callback:function(){}
			
		}, options || {});
		this._config = $.extend({}, this.config);
		this._init();

		return this;
	},
	
	//装载
	_init: function() {
		var _this = this;
		var msgSideClass = "ul.message-box";
		if (this.opt.position == "left") {
			msgSideClass+=" message-box-left";
		};
		_this.opt.objQueen = [];//防止别人初始化队列
		var _html = [];
	    // _html.push("<ul class='message-box'></ul>") 
	    _html.push("<ul class='message-box ");
		_html.push(msgSideClass);
		_html.push("'></ul>");
		$('body').append(_html.join(""));
	},
	
	//通知框
	notify: function(options){
		var _this = this;
		var opt = $.extend({}, options||{});
		if (opt.content.link) {
			var cntLink =  opt.content.link;
			cntLink.match(/^http:\/\//)?cntLink:cntLink="http://"+cntLink;
		}

		var _html = [];
		_html.push("<li id='message_")
		_html.push(_this.opt.objQueen.length)
		_html.push("'><div class='message'>")
		_html.push("<div class='message-img'>")
		_html.push("<span>")
		_html.push(_this.opt.objQueen.length+1)
		_html.push("</span>")
		_html.push("</div>")
		_html.push("<div class='message-content'>")
		_html.push("<p> <span class='message-username'>")
		_html.push(opt.content.title)
		_html.push("</span><a class='mail' href='mailto:")
		_html.push(opt.content.mailLink)
		_html.push("'>&lt;")
		_html.push(opt.content.mailLink)
		_html.push("&gt;</a></p>")
		_html.push("<p class='content'>")
		_html.push(opt.content.brief)
		_html.push("</p><p>")
		_html.push("<a class='linkTitle' target='_blank' href='")
		_html.push(cntLink)
		_html.push("'>")
		_html.push(opt.content.linkTitle)
		_html.push("</a></p><div class='btns'><span class='btn btn-mini cancel'>取消</span>&nbsp;<span class='btn btn-important btn-mini confirm'>确定</span></div></div><div class='message-close'>×</div>")
		_html.push("</div></li>")
		if($("ul.message-box").children().length > 0){
			$("ul.message-box li:first-child").before(_html.join(""));
		}
		else
		{
			$("ul.message-box").append(_html.join(""));
		}
		var msgObj = $("li#message_"+_this.opt.objQueen.length);
		_this.opt.objQueen.push(msgObj);
		this._regEvent(msgObj);
	},
	//自定义方法
	myMessage:function(html){
		var _this = this;
		var _html = [];
		_html.push("<li id='message_")
		_html.push(_this.opt.objQueen.length)
		_html.push("'><div class='message'>")
		_html.push("<div class='message-img'>")
		_html.push("<span>")
		_html.push(_this.opt.objQueen.length+1)
		_html.push("</span>")
		_html.push("</div>")
		_html.push("<div class='message-content'>")
		_html.push(html);
		_html.push("</div><div class='message-close'>×</div>")
		_html.push("</div></li>")
		if($("ul.message-box").children().length > 0){
			$("ul.message-box li:first-child").before(_html.join(""));
		}
		else
		{
			$("ul.message-box").append(_html.join(""));
		}
		var msgObj = $("li#message_"+_this.opt.objQueen.length);
		_this.opt.objQueen.push(msgObj);
		this._regEvent(msgObj);
	},
	//注册事件
	_regEvent:function(obj){
		var _this = this;
		var ClsBtn = obj.find("div.message-close,span.cancel"),
			CfmBtn = obj.find("span.confirm");
		//关闭事件
		ClsBtn.bind("click",function(e){
			_this._close(obj)
			//ClsBtn.parents("li").remove();
		})


		var index = -1;
		for(var i = 0,il=this.opt.objQueen.length;i<il;i++){
			if (this.opt.objQueen[i] == obj) {
				index = i;
			};
		}
		// CfmBtn.bind("click",_this.opt.callback);
		CfmBtn.bind("click",function(){
			_this.opt.callback(index);
		})
		
		obj.delay(_this.opt.delayTime).css({
			 "opacity": 1
		}).animate({
				 "opacity": 0
            }, 500, function () {
              _this._close(obj);
			  //移除事件
			  ClsBtn.unbind("click");
        })
	},
	_close:function(obj){
		var index = -1;
		for(var i = 0,il=this.opt.objQueen.length;i<il;i++){
			if (this.opt.objQueen[i] == obj) {
				index = i;
			};
		}
		this.opt.objQueen.splice(index,1)		
		obj.remove();
	}
}
	
	return Message;
})