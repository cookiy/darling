
	jQuery(document).ready(function(){
	$(".e-userbtn").click(function(){
	usesyn._ajax();
 	});
	var data = {};
	data.content = $("input:checked").val(); 
	var usesyn = {};
	usesyn._ajax = function(){
 	jQuery.ajax({
 	type: "POST",
	url: this.$obj().attr("action"),
	data: data,
	dataType: 'json',
	beforeSend: function(){nwWaiting();},
	success: function(json){
	if (json.error) {
		nwAlert(json.errorText);
	} else {
		nwMessage('发布成功');
	}}, 
	error: function() {
		nwAlert();
	}
 });
 }
 });
	
	

