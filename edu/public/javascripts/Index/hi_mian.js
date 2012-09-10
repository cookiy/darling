
$(document).ready(function () {

    var ToolBar = $('#leftBar'),
	    Coverlayer = $('#startingCover'),
		ConterLayer = $('#restart')

    //隐藏loading
    Coverlayer.fadeOut();
    ConterLayer.fadeIn();

    //动画显示工具栏
    ToolBar.animate({
        opacity: 1,
        left: '0'
    }, 1000, function () {
        // Animation complete.
    });

    //	//局部刷新方法
    //	function getDesktopWrapper(){   
    //            $.ajax({   
    //                type:"post",     
    //                url:"desktop_list.html",   
    //                success:function(msg){   
    //                    $("#desktopWrapper").html(msg);   
    //					adddeskside();
    //                },   
    //                error:function(){   
    //                    alert("wrong");   
    //                }   
    //            });   
    //       }   

    function adddeskside() {
        //滑屏
        $('#desktopWrapper').carousel({
            slider: '.hi_pageslider',
            slide: '.buttonItemList',
            addNav: true,
            addPagination: true,
            speed: 500 // ms.
        });

        //桌面功能图标移动
        $("#buttonList1, #buttonList2").dragsort({
            dragSelector: "div.appbutton",
            dragBetween: true,
            dragEnd: saveOrder,
            placeHolderTemplate: "<div class='app_mini placeHolder'></div>"
        });

        function saveOrder() {
            ListMoveAuto();
        }

    }


    function ListMoveAuto() {

        var $leftList = $('#buttonList1'),
			    $leftend = $('#buttonList1 div:last'),
				$rightList = $('#buttonList2'),
				$rightend = $('#buttonList2 div:last'),
				$rightFrist = $('#buttonList2 div:first'),
			    leftListY = $leftList.offset().top + 590,
			    leftendY = $leftend.offset().top + 55,
			    rightendY = $rightend.offset().top + 55,
				Lnumlist = $('#buttonList1 div').length - 2,
				$righSecond = $('#buttonList2 div:eq(1)');


        if (leftendY >= leftListY && $leftend.not('.app_mini')) {
            $leftend.prependTo('#buttonList2');
        }

        if (leftendY >= leftListY && $leftend.not('.app_big')) {
            $leftend.prependTo('#buttonList2');
            $("#buttonList1 div").eq(Lnumlist).not('.app_big').prependTo('#buttonList2');
        }

        if (rightendY >= leftListY && $rightFrist.not('.app_big')) {
            $rightFrist.appendTo('#buttonList1');
            $righSecond.not('.app_big').appendTo('#buttonList1');
            alert($("#buttonList2 div").attr("id"));
        }

        if (rightendY >= leftListY && $rightFrist.not('.app_mini')) {
            $rightFrist.appendTo('#buttonList1');
        }

        SaveListNum();

    }

    function SaveListNum() {

        var data = $("#buttonList2 div , #buttonList1 div").map(function () {
            return $(this).attr("id");
        }).get();
        $("input[name=list1SortOrder]").val(data.join("|"));
    };

    //执行初始值
    //getDesktopWrapper();

    /*--weclome--*/
    //	art.dialog.open('weclome.html',{title: 'Weclome !'});

    //首页小幻灯
    //$("div.carousel").scrollable({ circular: true, mousewheel: true }).navigator().autoscroll({ interval: 3000 });
    setTimeout(funtime, 0);

    function funtime() {
        $('#big_logo').slideUp();
        $('#timeTool').slideDown();
    }


});
    