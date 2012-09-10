// ============================
// �ڸǲ����Ӧ�� nwApp.overLayer
// ���������Ӧ�� nwApp.popDialog
// ============================
(function($) {
	if (!$) return false;
	if (!$.nwApp) $.nwApp = {};
	if (!$.nwApp.overLayer) $.nwApp.overLayer = {};
	if (!$.nwApp.popDialog) $.nwApp.popDialog = {};
	window.nwolayer = $.nwApp.overLayer;
	window.nwdialog = $.nwApp.popDialog;
	// ----------------------------
	// �ڸǲ㷽�� nwApp.overLayer
	// ----------------------------
	$.nwApp.overLayer.id = 'nw-overlayer';
	$.nwApp.overLayer.status = false;
	// ��ʾ�ڸǲ�
	$.nwApp.overLayer.showLayer = function(op) {
		if (this.status) return false;
		op = (typeof(op)!='undefined')?op:0.5;
		if ($('#'+this.id).length==0) $('body').append('<div id="'+this.id+'"></div>');
		$('#'+this.id).css({filter:('alpha(opacity='+op*100+')'),opacity:op});
		this.setSize();
		this.status = true;
	};
	// �ر��ڸǲ�
	$.nwApp.overLayer.hideLayer = function() {
		if (this.status) $('#'+this.id).hide();
		this.status = false;
	};
	// �����ڸǲ��С
	$.nwApp.overLayer.setSize = function() {
	//	$('#'+this.id).css({ width:(($(window).width()<$(document).width())?($(document).width()+'px'):'100%'), height:$(document).height()+'px'}).show();
		$('#'+this.id).css({ width:'100%', height:$(document).height()+'px'}).show();
	};
	// ����Ӧ��Ļ�����ڸǲ��С
	$.nwApp.overLayer.resize = function() {
		if (this.status) { $('#'+this.id).hide(); this.setSize(); }
	};
	// ----------------------------
	// ���������� nwApp.popDialog
	// ----------------------------
	$.nwApp.popDialog.id = 'nw-popdialog';
	$.nwApp.popDialog.status = false;
	$.nwApp.popDialog.resizeStatus = false;
	$.nwApp.popDialog.timeoutId = 0;
	// �رյ�����ʱ�ص�����
	$.nwApp.popDialog.closeCallback = null;
	// �򿪵�����
	$.nwApp.popDialog.open = function(options) {
		var _this = this;
		$.nwApp.overLayer.showLayer(options.op);
		if ($('#'+this.id).length==0) {
			var pdhtml = '<div id="'+this.id+'">';
			pdhtml += '<div class="pdb-title"><h4></h4><span onclick="nwdialog.close();" title="�ر�"></span></div>';
			pdhtml += '<div class="pdb-content"></div>';
			pdhtml += '</div>';
			$('body').append(pdhtml);
		}
		if (!options.notitle)
		{
			$(".pdb-title").show();
		}
		else
		{
			$(".pdb-title").hide();
		}
		if (!options.notitle) $('#'+this.id+' .pdb-title h4').html(options.title);
		switch(options.mode||'text') {
			case 'url':
				$('#'+this.id+' .pdb-content').ajaxStart(function() {
					$(this).html(options.content.loading||'loading...');
				});
				$.ajax({
					type:options.content.type||'get',
					url:options.content.url,
					data:options.content.param||'',
					error:function() {
						$('#'+_this.id+' .pdb-content').html(options.content.error||'error...');
					},
					success:function(html) {
						$('#'+_this.id+' .pdb-content').html(html);
					}
				});
				break;
			case 'text':
				$('#'+this.id+' .pdb-content').html(options.content);
				break;
			case 'id':
				$('#'+this.id+' .pdb-content').children().hide();
				$('#'+options.id).appendTo('#'+this.id+' .pdb-content');
				$('#'+options.id).show();
				break;
			case 'iframe':
				$('#'+this.id+' .pdb-content').html('<iframe src="'+options.url+'" width="100%" height="'+(options.height-30)+'px" scrolling="auto" frameborder="0" marginheight="0" marginwidth="0"></iframe>');
				break;
		}
		$('#'+this.id).css({width:options.width,height:options.height}).removeClass().addClass(this.id).addClass(options.css||'').show();
		this.status = true;
		this.resizeStatus = true;
		this.resize();
		if (options.callback) options.callback();
		if (options.closeFunction) this.closeCallback = options.closeFunction;
	};
	// ���������
	$.nwApp.popDialog.setTitle = function(title) {
		$('#'+this.id+' .pdb-title h4').html(title);
	};
	// ���������
	$.nwApp.popDialog.setContent = function(content) {
		$('#'+this.id+' .pdb-content').html(content);
	};
	// �򿪵�����ҳ��
	$.nwApp.popDialog.pop = function(title, url, width, height, callback) {
		this.open({ mode:'iframe', title:title, url:url, width:width, height:height, callback:callback });
		return false;
	};
	// ��ȷ�Ͽ�
	$.nwApp.popDialog.confirm = function(message, callback, width, height) {
		var btnId = 'btn_'+ (new Date()).getTime();
		var content = '<div class="tc pd10 mgt10 f14">'+ message +'</div>';
		content += '<div class="tc"><a class="btn-normal" id="'+ btnId +'"><em>ȷ��</em></a><span class="sep">&nbsp;</span><a class="pointer" onclick="nwdialog.close();">ȡ��</a></div>';
		this.open({ mode:'text', notitle:true, content:content, width:width||300, height:height||100 });
		$('#'+btnId).click(function() {	callback(); });
	};
	// �����ѿ�
	$.nwApp.popDialog.alert = function(message, width, height, callback) {
		var content = '<div class="tc pd10 mgt10 f14">'+ message +'</div>';
		content += '<div class="tc"><a class="btn-normal" onclick="nwdialog.close();"><em>�ر�</em></a></div>';
		this.open({ mode:'text', notitle:true, content:content, width:width||300, height:height||100, closeFunction:callback });
	};
	// ��ʾ�ȴ���Ϣ
	$.nwApp.popDialog.showWaiting = function(message) {
		this.setContent('<div class="tc mgt30 f14"><img src="'+ naliWorld.staticImagePath +'indicator.gif" /> '+ message +'</div>');			
	};
	// ��ʾ��������Ϣ
	$.nwApp.popDialog.showMessage = function(message,isSuccess,closeCallback) {
		var isSuccess = isSuccess || false;
		var color = isSuccess ? "fgreen" : "fred";
		this.setContent('<div class="tc mgt30"><p class="'+color+' fbold f14">'+ message +'</p><p class="mgt5"><a class="btn-normal" onclick="nwdialog.close();"><em>�ر�</em></a></p></div>');
		if(closeCallback)
		{
			this.closeCallback = closeCallback;
		}
	};
	// ��ʾ��������Ϣ
	$.nwApp.popDialog.message = function(message) {
		this.setContent('<div style="margin:20px">'+ message +'<p class="mgt5 tc"><a class="btn-normal" onclick="nwdialog.close();"><em>ȷ��</em></a></p></div>');
	};
	// ���������С
	$.nwApp.popDialog.resize = function() {
		if (this.status && this.resizeStatus) {
			var _left = ($(window).width() - $('#'+this.id).width())/2;
			var _top = ($(window).height() - $('#'+this.id).height())/2;
			$('#'+this.id).css({
				left: ($(document).scrollLeft() + ((_left>20)?_left:20)) +'px',
				top: ($(document).scrollTop() + ((_top>20)?_top:20)) +'px'
			});
		}
	};
	// �رյ�����
	$.nwApp.popDialog.close = function(callback) {
		if (this.status) $('#'+this.id).hide();
		$.nwApp.overLayer.hideLayer();
		this.status = false;
		if (this.closeCallback) {
			this.closeCallback();
			this.closeCallback = null;
		}
		if(callback)
		{
			callback();
		}
	};
	// ����Ӧ�������λ��
	$(window).resize(function() {
		$.nwApp.overLayer.resize();
		$.nwApp.popDialog.resize();
	});
	$(window).scroll(function() {
	//	$.nwApp.popDialog.resize();
	});
	// ----------------------------
})(jQuery);

function OverLayer(){
	//���mark�������
	this.classes = function(){
		return OverLayer.mark;
	};
	//���mark���jquery����
	this.$obj = function(){
		return $("."+this.classes());
	};
	//TODO czy ��Ϊ���������û����ȡ�����Ĭ��ֵ��id��ò�Ҫ�̶���style����open�Ǳ�ͳһ�������ͳһ��Ϊ���캯��Ĳ������
	this.temp = '<div id="nw-overlayer" class="'+ this.classes() +'" style="opacity: 0.5; width: 100%; position:absolute;left:0;top:0;z-index:9998"></div>';
}
OverLayer.mark = "dOverLayer";
//�����Ҵ�
OverLayer.prototype.open = function(op) {
	var defaults = {
		'opacity': 0.5
    };
    var op = $.extend(defaults, op);
	if(this.$obj().size()){
		this.$obj().remove();
	}
	var html = this.temp;
	$("body").append(html);
	this.$obj().css({filter:('alpha(opacity='+op.opacity*100+')'), opacity:op.opacity});//TODO czy op����������û���õ���
	this.setSize();
};
//�رջҴ�
OverLayer.prototype.close = function(op) {
	this.$obj().remove();
};
//���ô��ڴ�С
OverLayer.prototype.setSize = function(){
	this.$obj().css({ width:'100%', height:$(document).height()+'px'}).show();
};

function Dialog(type){
	this.type = type;
	//���mark�������
	this.classes = function(mark){
		return Dialog.mark + "_" + mark;//TODO czy ���������ʵ����΢��һ�¾Ϳ���ʵ�ֲ�ͬ�Ի������Լ�Ψһclass��Ч����һ��ҳ���Ͽ����ж���Ի���
	};
	//���mark���jquery����
	this.$obj = function(mark){
		return $("."+this.classes(mark));
	};
	//TODO czy ��Ϊ�����������Ϊ����ʽ����
	this.temp = {
		'dialog':'<div class="window_alert '+ this.classes("dialog") +'"></div>',
		'titleBar':'<div class="pdb-title '+ this.classes("titleBar") +'"><h4 class="'+ this.classes("title") +'"></h4><span class="'+ this.classes("close") +'" title="�ر�"></span></div>',
		'content':'<div class="content textcenter '+ this.classes("content") +'"></div>',
		'iframe': '<iframe src="{$url}" class="'+ this.classes("iframe") +'" width="100%" scrolling="auto" frameborder="0" marginheight="0" marginwidth="0"></iframe>',
		'caption':'<div class="'+ this.classes("caption") +'"></div>',
		'text':'<div class="'+ this.classes("text") +'"></div>',
		'btn':'<div class="mgt5 '+ this.classes("btns") +'"></div>',
		'btns' : {
			'true':'<a class="btn-normal '+ this.classes("confirm") +'"><em>ȷ��</em></a>',//TODO czy ������true����Ĺؼ���
			'cancel':'<a class="btn-normal '+ this.classes("close") +'"><em>ȡ��</em></a>',
			'close':'<a class="btn-normal '+ this.classes("close") +'" onclick="Dialog.close();"><em>�ر�</em></a>'
		}
	};
}
Dialog.mark = "dDialog";
//��������
Dialog.prototype.open = function(op) {//TODO czy op��Ϊ���캯��Ĳ����ƺ����һЩ������һЩ�߼�Ҳ������һ����ȥ���캯����
	var _this = this;
	clearTimeout(Dialog.timeoutId);
	if(!this.overLayer)
	{
		if(!op.noOverLayer)
		{
			this.overLayer = new OverLayer();
			this.overLayer.open();
		}
	}
	var html = "";
	if(!this.$obj("dialog").size())//TODO czy this.$obj("dialog").size()>0��˼�������
	{
		html = this.temp["dialog"];
		$("body").append(html);
	}
	this.$obj("dialog").width(op.width || 300);//TODO czy ��$obj("dialog")�����ֱ�����ַ�Ĵ��룬��ö���д�ɺ�����ʽ�ÿ�Щ,��$dialog()��$objs.dialog()
	//�����������
	if(op.titleBar || op.title)
	{
		if(!this.$obj("titleBar").size())//TODO czy ��4�п��Է�װһ������lazycheck
		{
			html = this.temp["titleBar"];
			this.$obj("dialog").append(html);
		}
		if(op.title)
		{
			this.$obj("title").text(op.title);
		}
		else
		{
			this.$obj("title").text("");
		}
	}
	else
	{
		this.$obj("titleBar").remove();
	}
	//����������
	if(!this.$obj("content").size())
	{
		html = this.temp["content"];
		this.$obj("dialog").append(html);
	}
	else
	{
		this.$obj("content").html("");
	}
	if(op.iframe)
	{
		html = this.temp["iframe"].replace(/\{\$url\}/g, op.iframe);
		this.$obj("content").removeClass("content").append(html);
		if(op.height)
		{
			this.$obj("iframe").attr("height", parseInt(op.height) - 36);
		}
	}
	if(op.caption)
	{
		html = this.temp["caption"];
		this.$obj("content").append(html);
		this.$obj("caption").html(op.caption);
		if(op.captionClass)
		{
			this.$obj("caption").addClass(op.captionClass);
		}
	}
	if(op.text)
	{
		html = this.temp["text"];
		this.$obj("content").append(html);
		this.$obj("text").html(op.text);
	}
	if(op.element)
	{
		$(op.element).appendTo(this.$obj("content"));
	}
	if(op.btns && op.btns.length)
	{
		html = this.temp["btn"];
		this.$obj("content").append(html);
		$.each( op.btns, function(i, n){
			html = _this.temp.btns[n];
			_this.$obj("btns").append(html);
			if(i < op.btns.length - 1)
			{
				_this.$obj("btns").children().eq(i).css("marginRight","5px");
			}
		});
	}
	if(op.autoClose)
	{
		Dialog.timeoutId = setTimeout(function() {
			_this.close(op.afterClose || function(){});
		}, op.autoCloseTime || 2000);//TODO czy op�ĸ���Ĭ��ֵ��ͳһ�ط�����һ��ͺã�����op������ҲһĿ��Ȼ
	}
	this.$obj("close").unbind();
	this.$obj("close").bind("click", function(){
		_this.close(op.afterClose || function(){});
	});
	this.$obj("confirm").bind("click", function(){
		op.callBack();
	});
	if(op.afterOpen)
	{
		op.afterOpen();
	}
	this.setSize();
};
//���ô��ڴ�С
Dialog.prototype.setSize = function(){
	var _left = ($(window).width() - this.$obj("dialog").width())/2;
	var _top = ($(window).height() - this.$obj("dialog").height())/2;
	this.$obj("dialog").css({
		left: ($(document).scrollLeft() + ((_left>20)?_left:20)) +'px',
		top: ($(document).scrollTop() + ((_top>20)?_top:20)) +'px'
	});	
};
//�رմ���
Dialog.prototype.close = function(callBack) {
	this.$obj("dialog").remove();
	if($(".dOverLayer").size())
	{
		$(".dOverLayer").remove();
	}
	if(callBack)
	{
		callBack();
	}
};
//�رմ���
Dialog.close  = function(callBack) {
	$(".dDialog_dialog").remove();
	if($(".dOverLayer").size())
	{
		$(".dOverLayer").remove();
	}
	if(callBack)
	{
		callBack();
	}
};
//�Զ���confirm��Ĭ�ϴ�ȷ�ϰ�ť���رհ�ť
window.nwConfirm = function(text, callBack, op){
	var defaults = {
		"width": 260,
        btns: ["true","cancel"]
    };
    var op = $.extend(defaults, op);
	var dialog = new Dialog();
	op.text = text;
	op.callBack = callBack;
	dialog.open(op);
};
//�Զ���alert��Ĭ�ϴ�رհ�ť
window.nwAlert = function(text, op){
	var defaults = {
		"captionClass": "",	
		"caption": text || "��������æ�����Ժ�����",
		"captionClass": "dialogError",
		"width": 260,	
        btns: ["close"]
    };
    var op = $.extend(defaults, op);
	var dialog = new Dialog();
	dialog.open(op);
};
//�Զ���message��Ĭ���Զ��ر�
window.nwMessage = function(caption, text, op){
	var defaults = {
		"autoClose": true,
		"autoCloseTime": 2000,
		"captionClass": "dialogSuccess",
		"width": 200,
		"caption": caption || '�����ɹ�'
    };
    var op = $.extend(defaults, op);
	var dialog = new Dialog();
	op.text = text;
	dialog.open(op);
};
//�Զ���nwWaiting
window.nwWaiting = function(text, op){
	var defaults = {
		"width": 220,
		"text": '<p class="fgreen f14 " style="height:16px; line-height:16px;"><img src="'+ naliWorld.staticImagePath +'indicator.gif" style="margin-right:5px;" />'+ (text || "������") +'</p>'
    };
    var op = $.extend(defaults, op);
	var dialog = new Dialog();
	dialog.open(op);
};
//�Զ���nwDialog
window.nwDialog = function(title, text, width, op){
	var defaults = {
		"title": title,
		"text": text,
		"width": width||300
    };
    var op = $.extend(defaults, op);
	var dialog = new Dialog();
	dialog.open(op);
};
//�Զ���nwWindow
window.nwWindow = function(title, url, width, height){
	var defaults = {
		"title": title,
		"iframe": url,
		"width": width || 460,
		"height": height ||300
    };
    var op = $.extend(defaults, op);
	var dialog = new Dialog();
	dialog.open(op);
};