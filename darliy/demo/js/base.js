
/*
 输入框Value显示JS
 */
/*
 DOM树载入完毕后触发
 */
$(document).ready(function(){
    /*
     input都加上idleField类
     */
    $('input[type="text"]').addClass("idleField");
    $('input[type="text"]').focus(function(){
        /*
         input空间的Value判断
         */
        $(this).removeClass("idleField").addClass("focusField");
        if (this.value == this.defaultValue) {
            this.value = '';
        }
        if (this.value != this.defaultValue) {
            this.select();
        }
    });
    $('input[type="text"]').blur(function(){
        $(this).removeClass("focusField").addClass("idleField");
        if ($.trim(this.value) == '') {
            this.value = (this.defaultValue ? this.defaultValue : '');
        }
    });
});
