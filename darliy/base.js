(function($, win, doc, undefined){

	//澹版槑鍛藉悕绌洪棿
	$ = {};

	$.browser = {
		/*@cc_on @if (@_jscript)
			msie: doc.documentMode || (doc.compatMode == "CSS1Compat" ? "XMLHttpRequest" in window ? 7 : 6 : 5)
		@else @*/
			gecko: win.netscape && navigator.product == "Gecko" ? navigator.buildID : false,
			opera: win.opera ? opera.version() : false,
			webkit: !!win.WebKitPoint
		/*@end @*/
	};

	$.each = function( obj, fun ){
		if(obj.length >= 0 ){
			for( var i = 0; i< obj.length; i++ ){
				if(fun.call(obj[i], i) == false){
					return;
				}
			}
		}else{
			for( var key in obj ){
				if(fun.call(obj[key], key) == false){
					return;
				}
			}
		}
	}

	$.nameFix = {
		//IE浣跨敤锛屽叾浠栦娇鐢╡.style.styleFloat
		//鍏朵粬娴忚鍣ㄤ娇鐢╡.style.cssFloat
		"float": $.browser.msie < 9 ? "styleFloat" : "cssFloat"
	}

	if($.browser.msie < 8){
		$.nameFix = {
			"class": "className",
			"for": "htmlFor"
		};
	}else if($.browser.gecko){
		$.nameFix["mousewhee"] = "DOMMouseScroll";
		$.nameFix["innerText"] = "textContent";
	}

	$.attr = function(elm, name, val){
		name = $.nameFix[name] || name;
		if(val == undefined){
			return elm[name] || elm.getAttribute(name);
		}else{
			elm[name] = val;
			elm.setAttribute(name, val);
			return elm;
		}
	}

	$.getClass = function(elm){
		return $.attr(elm, "class") || "";
	}
	$.addClass = function(elm, name){
		return $.attr(elm, "class", $.getClass(elm) + " " + name );;
	}

	$.delClass = function(elm, name){
		return $.attr(elm, "class", $.getClass(elm).replace(new RegExp( "\\s*\\b" + name + "\\b", "g" ), ""));
	}

	$.findPos = function(obj) {
		var curleft = obj.offsetLeft || 0;
		var curtop = obj.offsetTop || 0;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
		return {x:curleft,y:curtop};
	}

	if (!doc.getElementsByClassName){
		//涓篸ocument娣诲姞getElementsByClassName鏂规硶
		doc.getElementsByClassName = function(selector){
			return this.querySelectorAll( "." + selector );
		}
		//涓篍lement鐨勫師鍨嬫坊鍔爂etElementsByClassName鏂规硶
		if(win.Element){
			Element.prototype.getElementsByClassName = doc.getElementsByClassName;
		}
	}

	/*@cc_on @if (@_jscript)
		if($.browser.msie < 9){
			$.eventFix = function(elm){
				if(elm.addEventListener == undefined){
					elm.addEventListener = function (eventType, fun) {
						var me = this;
						me.attachEvent("on" + eventType, function() {
							//鑾峰緱鏍囧噯鐨別vent
							var e = win.event;
							e.charCode = (e.type == 'keypress') ? e.keyCode: 0;
							e.eventPhase = 2;
							e.isChar = (e.charCode > 0);
							e.pageX = doc.documentElement.scrollLeft + e.clientX;
							e.pageY = doc.documentElement.scrollLeft + e.clientY;
							e.preventDefault = function() {
								e.returnValue = false;
							};
							if (e.type == 'mouseout') { 
								e.relatedTarget = e.toElement;
							} else if (e.type == 'mouseover') {
								e.relatedTarget = e.fromElement;
							}
							e.stopPropagation = function() {
								e.cancelBubble = true;
							};
							e.target = e.srcElement;
							e.timeStamp = (new Date()).getTime();
							return fun.call(me, e);
						});
					}
				}
				return elm;
			}

			//涓篒E鐨剋indow瀵硅薄娣诲姞W3C鏍囧噯鏂规硶getComputedStyle
			//璇ユ柟娉曠敤浜庤幏鍙栧璞＄殑鎺ㄦ紨鏍峰紡
			win.getComputedStyle = function(elm){
				return elm.currentStyle;
			}

			//涓篒E鐨刣ocument瀵硅薄娣诲姞W3C鏍囧噯灞炴€efaultView
			doc.defaultView = window;

			//涓篸ocument瀵硅薄娣诲姞addEventListener鏂规硶
			$.eventFix(doc);

			//HTML5
			//doc.writeln('<!鈥揫if lt IE 9]><script src="'+location.protocol+'//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]鈥�>');

			if($.browser.msie < 8){

				//淇敼涓€涓猠lement锛屼娇鍏舵煇涓柟娉曡繑鍥炵殑瀵硅薄鑾峰緱鏂版爣鍑�
				$.queryFunFix = function(elm, fun){
					var oldFun = elm[fun];
					elm[fun] = function(args){
						try{
							return $.domFix(oldFun.apply(this, arguments));
						}catch(ex){
							return $.domFix(oldFun(args));
						}
					}
				}

				$.queryFix = function(elm){
					if(!elm.querySelectorAll){
						//涓篹lm瀵硅薄娣诲姞querySelectorAll鏂规硶
						elm.querySelectorAll = function( selector ){
							$.addClass(this, "querySelectorAll");
							var rest = doc.querySelectorAll( ".querySelectorAll " + selector );
							$.delClass(this, "querySelectorAll");
							return rest;
						}
						//涓篹lm瀵硅薄娣诲姞getElementsByClassName鏂规硶
						elm.getElementsByClassName = doc.getElementsByClassName;

						//涓篹lm瀵硅薄娣诲姞querySelector鏂规硶
						elm.querySelector = doc.querySelector;

						//淇敼elm瀵硅薄鐨刧etElementById鏂规硶锛屼娇鍏惰幏寰楃殑瀵硅薄绗﹀悎鏂版爣鍑�
						$.queryFunFix(elm, "getElementById");

					}
					return elm;
				}

				$.domFix = function(elm){
					if(elm.parentNode){
						$.eventFix($.queryFix(elm.parentNode));
					}
					return $.eventFix($.queryFix(elm));;
				}

				//淇敼document瀵硅薄鐨刢reateElement鏂规硶锛屼娇鍏剁敓鎴愮殑瀵硅薄绗﹀悎鏂版爣鍑�
				$.queryFunFix(doc, "createElement");

				//淇敼document瀵硅薄鐨刧etElementById鏂规硶锛屼娇鍏剁敓鎴愮殑瀵硅薄绗﹀悎鏂版爣鍑�
				$.queryFunFix(doc, "getElementById");

				//涓篸ocument瀵硅薄娣诲姞querySelector鏂规硶
				doc.querySelector = function( selector ){
					return this.querySelectorAll( selector )[0];
				}

				//涓篸ocument瀵硅薄娣诲姞querySelectorAll鏂规硶
				doc.querySelectorAll = function( selector ){
					var style = doc.createStyleSheet(),
						elms = [];
					style.addRule(selector, "query:querySelectorAll");
					$.each(this.all, function(){
						if (this.currentStyle.query == "querySelectorAll") {
							elms[elms.length] = $.domFix(this);
						}
					});
					style.owningElement.parentNode.removeChild(style.owningElement);
					return elms;
				}

				$.domFix(doc.documentElement);
				doc.attachEvent("onreadystatechange", function (e){
					$.domFix(doc.body);
				});

				//淇IE鑳屾櫙缂撳瓨闂
				doc.execCommand("BackgroundImageCache", false, true);

				//灞忚斀鎶ラ敊
				win.onerror=function(ex){
					return true;
				};
			} else {
				//涓篍lement鐨勫師鍨嬫坊鍔燼ddEventListener鏂规硶
				$.eventFix(Element.prototype);
			}
		}
	/*@end @*/
	
	document.realy = function(fun){
		if(/loaded|complete/.test(doc.readyState)){
			fun($);
		} else if($.browser.msie < 9){
			var timer = setInterval(function () {
				try {
					doc.body.doScroll('left');
					clearInterval(timer);
					fun($);
				} catch(exp) {};
			},0);
		} else {
			document.addEventListener("DOMContentLoaded", function(){fun($);}, false);
		}
	};
	window.gucong = $;

})(window.gucong, window, document);