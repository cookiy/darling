
/*
 功能模块拖拽功能
 */
$(document).ready(function(){
    // Toggle Single Portlet
    $('a.toggle').click(function(){
        $(this).parent('div').next('div').toggle();
        return false;
    });
    
    // Invert All Portlets
    $('a#all_invert').click(function(){
        $('div.portlet_content').toggle();
        return false;
    });
    
    // Expand All Portlets
    $('a#all_expand').click(function(){
        $('div.portlet_content:hidden').show();
        return false;
    });
    
    // Collapse All Portlets
    $('a#all_collapse').click(function(){
        $('div.portlet_content:visible').hide();
        return false;
    });
    
    // Open All Portlets
    $('a#all_open').click(function(){
        $('div.portlet:hidden').show();
        $('a#all_open:visible').hide();
        $('a#all_close:hidden').show();
        return false;
    });
    
    // Close All Portlets
    $('a#all_close').click(function(){
        $('div.portlet:visible').hide();
        $('a#all_close:visible').hide();
        $('a#all_open:hidden').show();
        return false;
    });
    
    // Controls Drag + Drop
    $('#columns td').Sortable({
        accept: 'portlet',
        helperclass: 'sort_placeholder',
        opacity: 0.7,
        tolerance: 'intersect'
    });
});


/*
 更换模板功能
 */
var i, objCSS, cssname;
objCSS = document.getElementById("CSSC");

/*
 上面定义的 i为CSS文件后缀前的名称字符串,在这个实例中它的值分1和2两种情况
 objCSS则为前面提到的CSS连接语句的对象.
 */
function change(i){
    setCookie('cssname', i, 365);
    objCSS.setAttribute("href", "css/" + i + ".css");
}

/*
 以上为函数change(i),它的职能是当有事件触发这个函数时,
 设置浏览器cookie中cssname的值为i,
 并且该cookie过期时间为365天(具体的设置过程使用了函数setCookie).
 并给objCSS对象加上了属性href,它的值为i.css
 */
function checkStyle(){
    cssname = getCookie('cssname');
    if (cssname != null) {
        objCSS.setAttribute("href", cssname + ".css");
    }
}

/*
 checkStyle()这个函数在页面加载的时候就执行,
 其目的就是判断当前是否存在cookie保存的样式信息,有的话就直接设置所保存的样式.
 达成这个目的使用到了getCookie函数,当返回的结果不为null的时候就执行设置样式的代码.
 */
function setCookie(c_name, value, expiredays){
    var exdate = new Date();
    exdate.setDate(expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate);
}

/*
 setCookie函数就起到保存信息的作用,里面包含了三个参数:
 c_name用来指定是保存名为什么的cookie,并依据这个名称来做以后的调用
 value就是这个cookie实际要保存的值
 sepiredays是设置过期的时间,
 在这里它还做了一个判断,如果不写这个过期的时间就表示不进行保存
 */
function getCookie(c_name){
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) 
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return null
}

/*

 这就是对现有cookie做判断的函数,为null就返回一个null,

 不为null就返回指定cookie的值

 */

