
KISSY.ready(function(S){
	var DOM = S.DOM, 
		Event = S.Event,
		UA =S.UA,
		win=window, SCROLL='scroll',RESIZE = 'resize';

	S.app('HomeApp');

	/*
	配置参数：
	1. srcAttr:替代 src的属性名
	2. renderTo:应用到得模块ID
	3. placeholder:图片src指向的默认图片，可以是loading图标，可以是一像素的透明图片
	4. autoLoad:加载是否自动完成（滚动条、窗口大小改变）
	*/
	HomeApp.groupLazyLoad = function(config){
		if(!config.renderTo)
			throw 'please config the id of group ';
		var _self = this,
			conf = S.merge({autoLoad:true},config),
			lazyloadImgs =[];
			
		_self.conf = conf;
		//标示图片延迟加载代替src的属性名
		_self.ATTR_LAZYLOAD = conf.srcAttr || 'data-ks-lazyload'; 
		//延迟加载的图片集合
		_self.lazyloadImgs = lazyloadImgs;
		_self._wrapper = S.one('#'+conf.renderTo);;
	};
	S.augment(HomeApp.groupLazyLoad,S.EventTarget);
	S.augment(HomeApp.groupLazyLoad,{
		APPEND_WINDOW_HEIGHT : 200,
		//ATTR_LAZYLOAD:'data-ks-lazyload',
		loaded : false,
		//该区块是否在用户可视区域内
		_isInView : function(){
			var _self =this,
				container =_self._wrapper,
				off = DOM.offset(container),
				height = container.height(),
				offTop = off.top,
				viewportHeight = DOM.viewportHeight(),
				scrollTop = DOM.scrollTop(),
				offEnd = offTop + height,
				viewEnd = scrollTop + viewportHeight;
			if((offTop >= scrollTop && offTop <= viewEnd)||(offTop <= scrollTop && offEnd >=scrollTop)||(offTop >= viewEnd && offTop <= viewEnd + _self.APPEND_WINDOW_HEIGHT))
				return true;
			//if((offTop <= scrollTop && scrollTop < (offTop + height))||(offTop > (scrollTop - _self.APPEND_WINDOW_HEIGHT) && offTop <(scrollTop + viewportHeight)) )
			//	return true;
			return false;
		},
		//初始化事件
		_initEvent:function(){
			var timer,_self=this;
			Event.on(win,SCROLL,loader);
			Event.on(win,RESIZE,loader);
			function loader() {
                if (timer) return;
                timer = S.later(function() {
                    loadItems();
                    timer = null;
                }, 100); // 0.1s 内，用户感觉流畅
            }
			 // 加载延迟项
            function loadItems() {
				if(!_self.loaded){
					if(_self._isInView()){
						_self.loaded = true;
						_self.loadImgs();
					}
				}else{
                    Event.remove(win, SCROLL, loader);
                    Event.remove(win, RESIZE, loader);
                }
            }
		},
		//初始化
		initLazyLoad :function(){
			var _self =this,
				imgs = S.all('img','#'+_self.conf.renderTo);
			S.each(imgs,function(img) {
				var dataSrc = img.getAttribute(_self.ATTR_LAZYLOAD),
					placeholder = _self.conf.placeholder;	
				if(dataSrc){
					if(placeholder){
						img.src = placeholder;
					}
					_self.lazyloadImgs.push(img);
				}
			});
			if(_self.conf.autoLoad ===false)
				return;
			if(_self._isInView()){
				_self.loadImgs();
			}else{
				_self._initEvent();
			}
		},
		//加载所有延迟加载的图片
		loadImgs : function(){
			var _self =this;
			S.each(_self.lazyloadImgs,function(img){
				_self._loadImgSrc(img);
			});
			_self.lazyloadImgs.splice(0);
			_self.fire('afterLoad',_self);
		},
		//加载一个图片
		_loadImgSrc : function(img){
			var _self =this;/**/
				dataSrc = img.getAttribute(_self.ATTR_LAZYLOAD),
				imgEl = S.one(img),
				imgContainer = imgEl.parent();
			if(dataSrc && img.src!=dataSrc){
				img.onload = function(){
					if(UA.ie==6 || UA.ie ==7){
						var containerWidth = imgContainer.width();
						if(containerWidth > imgEl.width()){
							imgEl.width(containerWidth);
							imgEl.height(imgContainer.height());
						}
					}
					img.onload =null;
				};
				img.src = dataSrc;
				img.removeAttribute(_self.ATTR_LAZYLOAD);
			}
		}
		
	});

});
