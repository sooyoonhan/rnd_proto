//로더활성화
//parent.loader.show();
//console.log(gridHeaderArr)

//초기메뉴리스트불러오기
getMenuList(function(lang, error) {
	//에러체크
	if(error) {
		alert(error);

		//로더비활성화
		parent.loader.hide();
		return false;
	}

	//전체메뉴리스트가져오기완료
	//console.log(lang);

	//결과렌더링
	lenderGrid(lang);
}, false);

//결과렌더링
function lenderGrid(callback){
	console.log(callback);

	var container = $("#gridTable");
	var str = '';
	for(var i=0; i<gridHeaderArr.length; i++){
	
	}
}









//메뉴 관리 리스트 
//getMenuList(function(lang, error) {
//	//에러체크
//	if(error) {
//		alert(error);
//
//		//로더비활성화
//		loader.hide();
//		return false;
//	}
//
//	//전체메뉴리스트가져오기완료
//	console.log(lang);
//
//	//메뉴렌더링
//	//lenderMenu(lang);
//}, false);




//메뉴 관리 검색
//searchMenuNameList("관리자",function(lang, error) {
//	//에러체크
//	if(error) {
//		alert(error);
//
//		//로더비활성화
//		loader.hide();
//		return false;
//	}
//
//	//전체메뉴리스트가져오기완료
//	alert(lang);
//
//	//메뉴렌더링
//	//lenderMenu(lang);
//})