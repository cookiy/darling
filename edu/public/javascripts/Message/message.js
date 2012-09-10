//左侧分组的事件
var createhtml = function() {
    //载入所有分组 val -- 分组名称  num -- 分组数量 初始化为0
    this.load = function (id, val, num) {
        var html = "";
        html += "<li id='" + id + "' title='" + val + "' class='group-item logClass group' name='group_other'>";
        html += "<a class='group-name' href='javascript:void(0)'><span name='gName'>" + val + "</span><span class='count'>[" + num + "]</span></a>";
        html += "<span class='group-edit-del' style='display: block;'><a class='icons icon-group-edit' title='编辑分组' href='javascript:void(0)' onclick='EditGroupClick(this);'></a><a onclick='DeleteGroupClick(this);' class='icons icon-group-del' title='删除分组' href='javascript:void(0)'></a></span>";
        html += "<span class='edit-label' style='display:none'><input type='text' class='edit-text' name='groupNameInput' /></span>";
        html += "<span class='group-sure-cancel' style='display:none'><a class='icons icon-group-sure' title='确认'onclick='SaveGroupClick(this);' href ='javascript:void(0)'></a><a class='icons icon-group-cancel' title='取消编辑' onclick='CancelGroupClick(this);' href ='javascript:void(0)'></a></span>";
        html += "</li>";
        $("#groupList").append($(html));
    }

    //添加新的分组
    this.add = function () {
        var html = "";
        html += "<li class='group-item logClass group' name='group_other'>";
        html += "<a class='group-name' href='javascript:void(0)'><span name='gName'></span><span class='count'>[" + 0 + "]</span></a>";
        html += "<span class='group-edit-del' style='display: none;'><a class='icons icon-group-edit' title='编辑分组' href='javascript:void(0)' onclick='EditGroupClick(this);'></a><a onclick='DeleteGroupClick(this);' class='icons icon-group-del' title='删除分组' href='javascript:void(0)'></a></span>";
        html += "<span class='edit-label' style='display:block'><input type='text' class='edit-text' name='groupNameInput' /></span>";
        html += "<span class='group-sure-cancel' style='display:block'><a class='icons icon-group-sure' title='确认'onclick='SaveGroupClick(this);' href ='javascript:void(0)'></a><a class='icons icon-group-cancel' title='取消编辑' onclick='CancelGroupClick(this);' href ='javascript:void(0)'></a></span>";
        html += "</li>";
        $("#groupList").append($(html));
    }
}

//dialog
var CusDialog = function () {
    this.showdialog = function (title, tag) {
        var html = "<div id='divconfirm' style='display: block; z-index: 1007; outline: 0px none; height: auto; width: 400px; top: 107.5px; left: 519px;' class='ui-dialog ui-widget ui-widget-content ui-corner-all confirm-warn ui-draggable' tabindex='-1' role='dialog' aria-labelledby='ui-dialog-title-1'><div class='ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix'><span class='ui-dialog-title' id='ui-dialog-title-1'>&nbsp;</span><a href='#' class='ui-dialog-titlebar-close ui-corner-all' role='button'><span id='divdialogClose' class='ui-icon ui-icon-closethick' onclick='divdialoghide();'>close</span></a></div><div class='ui-dialog-content ui-widget-content' style='width: auto; min-height: 38px; height: auto;' scrolltop='0' scrollleft='0'><div class='dialog-del-status'>" + title + "</div></div><div class='ui-dialog-buttonpane ui-widget-content ui-helper-clearfix'><div class='ui-dialog-buttonset'><button type='button' class='btn-sure' id='divdialogAjaxSend'>确    定</button><button type='button' class='btn-cancel' onclick='divdialoghide();'>取 消</button></div></div></div>";
        $("body").append($(html));
        $("#divdialogAjaxSend").click(function () {
            if (tag == "") {
                divdialoghide();
            }
            else {
                ajaxSend(tag);
                divdialoghide();   
            }
        })
    }
}

function divdialoghide() {
    $("#divconfirm").remove();
}

function ajaxSend(tag) {
    alert("Ajaxtag is " + tag + " and send ajax request....");
//    $.ajax({
//        type: "post",
//        async: false,
//        url: "../xxx",
//        data: {},
//        success: function (data) {

//        },
//        failure: function (errorCode, errorMessage) {
//            if (errorCode == -1) {
//                alert(errorMessage);
//                return false;
//            }
//            else {
//                alert(errorMessage);
//                result = false;
//            }
//        }
//    });
}


//操作checkbox
var ControlCheckBox= function(obj, arr) {
    //全选
    this.CheckAll = function () {
        $(obj).click(function () {
            if (this.checked) {
                for (var i = 0; i < arr.length; i++) {
                    $(arr[i]).get(0).checked = true;
                }
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    $(arr[i]).get(0).checked = false;
                }
            }
        })
    }

    //单个选中
    this.CheckOne = function () {
        for (var i = 0; i < arr.length; i++) {
            $(arr[i]).click(function () {
                var count = 0;
                for (var i = 0; i < arr.length; i++) {
                    if ($(arr[i]).get(0).checked == true) {
                        count++;
                    }
                }
                if (count == arr.length) {
                    $(obj).get(0).checked = true;
                }
                else {
                    $(obj).get(0).checked = false;
                }

                if (this.checked == false) {
                    $(obj).get(0).checked = false;
                }
            })
        }
    }

    //反选
    this.ReCheckAll = function (obj1) {
        $(obj1).click(function () {
            if (this.checked) {
                for (var i = 0; i < arr.length; i++) {
                    if ($(arr[i]).get(0).checked) {
                        $(arr[i]).get(0).checked = false;
                    }
                    else {
                        $(arr[i]).get(0).checked = true;
                    }
                }
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    if ($(arr[i]).get(0).checked == false) {
                        $(arr[i]).get(0).checked = true;
                    }
                    else {
                        $(arr[i]).get(0).checked = false;
                    }
                }
            }
        })
    }
}

//编辑分组
function EditGroupClick(obj) {
    $(obj).parent().next().css("display", "block");
    $(obj).parent().next().next().css("display", "block");
    $(obj).parent().next().children().val($(obj).parent().parent().attr("title"));
    $(obj).parent().parent().attr("class", "group-item logClass group selected edit-status");
    $(obj).parent().css("display", "none");
}

//删除分组
function DeleteGroupClick(obj) {
    var divdialog = new CusDialog();
    divdialog.showdialog("确认要删除选中的分组?", "deleteuserperson");
}

//保存分组
function SaveGroupClick(obj) {
    alert("send data to server and ajax success");
    CancelGroupClick($(obj).next());
    //ajax请求成功后 赋值给li一个id和title
    $(obj).parent().parent().attr("id", "testID").attr("title", $(obj).parent().prev().children().val());
    $("#HFVAL").val($(obj).parent().prev().children().val());
    //设置展示span里面的值
    $(obj).parent().prev().prev().prev().children().each(function (i) {
        if (i == 0) {
            $(this).html($("#HFVAL").val());
        }
    })
}

//取消编辑分组
function CancelGroupClick(obj) {
    $(obj).parent().parent().attr("class", "group-item logClass group selected");
    $(obj).parent().prev().prev().css("display", "block");
    $(obj).parent().prev().css("display", "none");
    $(obj).parent().css("display", "none");
}


//load首页右侧联系人事件
function userpageload() {
    var tbodyhtml = "";
    for (var i = 0; i < userId.length; i++) {
        tbodyhtml += "<tr class='ui-selectee'>";
        tbodyhtml += "<td class='o-h'><i class='icons icon-grippy'></i></td>";
        tbodyhtml += "<td><input type='checkbox' name='checkone' /></td>";
        tbodyhtml += "<td><a id='" + userId[i] + "' href='javascript:void(0)' name='contact_Detail' class='logClass view' onclick='editUser(this);'>" + userName[i] + "</a></td>";
        tbodyhtml += "<td>" + userPhone[i] + "</td>";
        tbodyhtml += "<td>" + userCompany[i] + "</td>";
        tbodyhtml += "<td>" + userDepartment[i] + "</td>";
        tbodyhtml += "</tr>";
    }
    $("#contactsBody").append($(tbodyhtml));
}

//编辑联系人
function editUser(obj) {
    $("#contactsList").css("display", "none");
    $("#contactEditTwo").css("display", "block");
    $("#userListBox").css("display", "block");
    CreateEditUserList();
}

//load编辑联系人的右侧联系人
function CreateEditUserList() {
    $("#uluserlist").children().each(function () {
        $(this).remove();
    })
    var html = "";
    for (var i = 0; i < edituserId.length; i++) {
        if (i == 0) {
            html += "<li class='selected' id='" + edituserId[i] + "' tagGroup='" + edituserGroup[i] + "' tagPhone='" + edituserPhoneNum[i] + "' tagCompany='" + edituserCompany[i] + "' tagDepartment='" + edituserDepartment[i] + "'>" + edituserName[i] + "</li>";
        } else {
            html += "<li id='" + edituserId[i] + "' tagGroup='" + edituserGroup[i] + "' tagPhone='" + edituserPhoneNum[i] + "' tagCompany='" + edituserCompany[i] + "' tagDepartment='" + edituserDepartment[i] + "'>" + edituserName[i] + "</li>";
        }
    }
    $("#uluserlist").append($(html));
}