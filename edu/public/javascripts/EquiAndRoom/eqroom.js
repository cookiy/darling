/**************************************设备登记*******************************************/
var datasource = [{id:'1', name: '白板',count:'01', tag: '1', user: '小张', returndate: '2012-8-1'}, {id:'2', name: '黑板',count:'02', tag: '0', user: '', returndate: ''}];
var persons = [{ name: '小张', id: '1' }, { name: '小x', id: '2' }, { name: '小s', id: '3' }, { name: '小w', id: '4'}];

function loadData(data){
    var html ="";
    for (var i = 0; i < data.length; i++) {
    html += "<li id='" + data[i].id + "'>";
    html += "<em>" + data[i].count + "</em>";
    html += "<div tag='eqname' class='left'>" + data[i].name + "</div>";
    html += "<div class='right'>";
    html += "<p tag='show'><b>状态：</b><i class='color_black'>" + ChangeTagToValue(data[i].tag) + "</i></p>";
    html += "<p tag='show'><b>使用人：</b>" + data[i].user + "</p>";
    html += "<p tag='show'><b>归还时间：</b>" + data[i].returndate + "</p>";
    html += "<p style='display:none'><b>状态：</b>";
    html += "<select tag='seltag'><option value='0'>闲置</option><option value='1'>使用中</option></select>";
    html += "</p>";
    html += "<p style='display:none'><b>使用人：</b>";
    html += "<select tag='seluser'></select>";
    html += "</p>";
    html += "<p style='display:none'><b>归还时间：</b>";
    html += "<input type='text' class='dateinput' tag='pickdate' value='" + data[i].returndate + "'/>";
    html += "</p>";
    html += "</div>";
    html += "<a href='javascript:void(0);' class='edit' onclick='EditClick(this);'></a>";
    html += "<a href='javascript:void(0);' class='save' onclick='SaveClick(this);'></a>";
    html += "<a href='javascript:void(0);' class='del' onclick='DelClick(this)'></a>";
    html += "</li>";
    }
return html;
}

function LoadEslecter(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
    html += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
    }
return html;
}

function ChangeTagToValue(tag) {
    if (tag == "1") {
    return "使用中";
    }
if (tag == "0") {
    return "闲置";
    }
else {
    return "";
    }
}

//编辑事件
function EditClick(obj) {
    //填充使用人
    $(obj).parent().children().find("select[tag=seluser]").append($(LoadEslecter(persons)));
    $(obj).parent().children().find("p").each(function (i) {
    if (i <= 2) {
    $(this).css("display", "none");
    }
else {
    $(this).css("display", "block");
    }
})
$(obj).parent().children().find("input[type=text]").focus(function () {
    WdatePicker({ isShowWeek: true, onpicked: function () { }, dateFmt: 'yyyy-MM-dd ' });
})
}

//保存事件
function SaveClick(obj,tag) {
    if ($(obj).parent().children().find("p[tag=show]").eq(0).css("display") == "block") {
    alert("请先编辑在保存!!");
    return;
    }
    var savedata = { id: '', name: '', tag: '', user: '', returndate: '' };
    savedata.id = $(obj).parent().attr("id");
    savedata.name = $(obj).parent().children().find("div[tag=eqname]").html();
    savedata.tag = $(obj).parent().children().find("select[tag=seltag]").val();
    savedata.user = $(obj).parent().children().find("select[tag=seluser] option:selected").text();
    savedata.returndate = $(obj).parent().children().find("input[type=text]").val();
    if (tag=="shebei") {
        //重新load
        $("#ul1 li").each(function () {
            $(this).remove();
        })
        $("#ul1").append($(loadData(datasource)));
    }
    if(tag=="huiyishi"){
        $("#ul1 li").each(function () {
            $(this).remove();
        })
        $("#ul1").append($(loadData(datasource)));
    }
}

//删除事件
function DelClick(obj,tag) {
    if(tag=="shebei"){
        if (window.confirm("请确认是否删除?")) {
            var data = { id: $(obj).parent().attr("id"), ran: Math.random() };
            var temp = $(obj).parent().remove();
        }
    }
    if(tag=="huiyishi"){
        if (window.confirm("请确认是否删除?")) {
            var data = { id: $(obj).parent().attr("id"), ran: Math.random() };
            var temp = $(obj).parent().remove();
        }
    }
}

$("#ul1").append($(loadData(datasource)));

//添加新设备
function Addequiment(tag) {
    if(tag=="shebei")
    {
        var data = { name: $("#txt_name").val(), ran: Math.random() };
        //send ajax request
    }
    if(tag=="huiyishi")
    {
        var data = { name: $("#txt_name").val(), ran: Math.random() };
        //send ajax request
    }

}
/**************************************设备登记*******************************************/
