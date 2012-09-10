
KISSY.ready(function(S){
	var DOM = S.DOM, 
		Event = S.Event,
		UA =S.UA,
		win=window, SCROLL='scroll',RESIZE = 'resize';

	S.app('HomeApp');

	/*
	���ò�����
	1. srcAttr:��� src��������
	2. renderTo:Ӧ�õ���ģ��ID
	3. placeholder:ͼƬsrcָ���Ĭ��ͼƬ��������loadingͼ�꣬������һ���ص�͸��ͼƬ
	4. autoLoad:�����Ƿ��Զ���ɣ������������ڴ�С�ı䣩
	*/
	HomeApp.groupLazyLoad = function(config){
		if(!config.renderTo)
			throw 'please config the id of group ';
		var _self = this,
			conf = S.merge({autoLoad:true},config),
			lazyloadImgs =[];
			
		_self.conf = conf;
		//��ʾͼƬ�ӳټ��ش���src��������
		_self.ATTR_LAZYLOAD = conf.srcAttr || 'data-ks-lazyload'; 
		//�ӳټ��ص�ͼƬ����
		_self.lazyloadImgs = lazyloadImgs;
		_self._wrapper = S.one('#'+conf.renderTo);;
	};
	S.augment(HomeApp.groupLazyLoad,S.EventTarget);
	S.augment(HomeApp.groupLazyLoad,{
		APPEND_WINDOW_HEIGHT : 200,
		//ATTR_LAZYLOAD:'data-ks-lazyload',
		loaded : false,
		//�������Ƿ����û�����������
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
		//��ʼ���¼�
		_initEvent:function(){
			var timer,_self=this;
			Event.on(win,SCROLL,loader);
			Event.on(win,RESIZE,loader);
			function loader() {
                if (timer) return;
                timer = S.later(function() {
                    loadItems();
                    timer = null;
                }, 100); // 0.1s �ڣ��û��о�����
            }
			 // �����ӳ���
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
		//��ʼ��
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
		//���������ӳټ��ص�ͼƬ
		loadImgs : function(){
			var _self =this;
			S.each(_self.lazyloadImgs,function(img){
				_self._loadImgSrc(img);
			});
			_self.lazyloadImgs.splice(0);
			_self.fire('afterLoad',_self);
		},
		//����һ��ͼƬ
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
