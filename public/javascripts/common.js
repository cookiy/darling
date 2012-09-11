$(function () {
    $.datepicker.regional['zh-CN'] = {
        clearText: '清除',
        clearStatus: '清除已选日期',
        closeText: '关闭',
        closeStatus: '不改变当前选择',
        prevText: '&lt;上月',
        prevStatus: '显示上月',
        nextText: '下月&gt;',
        nextStatus: '显示下月',
        currentText: '今天',
        currentStatus: '显示本月',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthStatus: '选择月份',
        yearStatus: '选择年份',
        weekHeader: '周',
        weekStatus: '年内周次',
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayStatus: '设置 DD 为一周起始',
        dateStatus: '选择 m月 d日, DD',
        dateFormat: 'yy-mm-dd',   //日期格式化形式

        firstDay: 0,
        initStatus: '请选择日期',

        isRTL: false
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

//截取字符串
function cutStr(str, num) {
    var temp = "";
    if (str == "") {
        return "";
    }
    if (str.length > num) {
        temp = str.substring(0, num) + "...";
    }
    else {
        temp = str;
    }
    return temp;
}

//字符串过长的换行问题
function DealWithToolTipString(str, strcutlength) {
    if(str.length < strcutlength)
    {
        return str;
    }

    var length = str.length;
    var count = length / strcutlength;
    var temparr = new Array();

    if (count.toString().indexOf('.') == -1) {
        count = count;
        for (var i = 0; i < count; i++) {
            temparr.push(str.substring(i * strcutlength, (i + 1) * strcutlength));
        }
    }
    else {
        count = parseInt(count) + 1;
        for (var i = 0; i < count; i++) {
            temparr.push(str.substring(i * strcutlength, (i + 1) * strcutlength));
        }
    }

    var result = "";
    for (var i = 0; i < temparr.length; i++) {
        result += temparr[i] + "<br/>";
    }
    return result;
}

//时间转换
function ChangeDate(val) {
    var res = "";
    if (val == null || val == "null") {
        res = "";
    } else {
        var d = new Date(val);
        d = d.toLocaleDateString();
        d = d.replace('年', '-').replace('月', '-').replace('日', '');
        var arr = d.split('-');
        var yy = arr[0];
        var mm = arr[1];
        var dd = arr[2];
        if (parseInt(mm) < 10) {
            mm = "0" + mm;
        }
        if (parseInt(dd) < 10) {
            dd = "0" + dd;
        }
        res = yy + "-" + mm + "-" + dd;
    }
    return res;
}