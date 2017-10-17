//검색폼라벨여백자동조정
function labelPaddingChange(){
	var li = $("#searchForm li");
	var label = $("#searchForm li label");

	for(var i=0; i<label.length; i++){
		var labelWidth = label.eq(i).width();
		var tempCss = labelWidth + 5 + "px";
		li.eq(i).css("paddingLeft", tempCss);
	}
}