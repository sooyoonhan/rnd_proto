//로더활성화
//parent.loader.show();

//그리드헤더
var gridHeader;

//URL경로파서
var urlParser = location.href;
urlParser = urlParser.split("/");

var keyLength = urlParser.length;			//파서길이
var sFolder = urlParser[keyLength-2];
var nation = sessionStorage["langType"];

//변수제거
urlParser = null;
keyLength = null;

//불러올grid언어팩파일경로
var gridUrl = "/setting/lang/" + nation + "/common/gridTitle.json";

//버튼언어팩적용
$.getJSON(
	gridUrl,
	function(callback){
		//console.log(callback);
		
		//gridTitle변수저장
		gridHeader = callback[sFolder];
	}
);

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
	console.log(callback[0])

	var container = $("#gridTable");
	var str = '';

	str += '<tr>';
	for(var i=0; i<gridHeader.length; i++){
		str += '<th scope="col">' + gridHeader[i] + '</th>';
	}
	str += '</tr>';

	for(i=0; i<callback.length; i++){
		str += '<tr>';
			str += '<td>' + callback[i]["MENU_SEQ"] + '</td>';
			str += '<td>' + callback[i]["DEPTH"] + '</td>';
			str += '<td>' + callback[i]["menuName"] + '</td>';
			str += '<td>' + callback[i]["PRT_MENU"] + '</td>';
			str += '<td>' + callback[i]["ORD"] + '</td>';
			str += '<td><a href="modify.html?seq=' + callback[i]["MENU_SEQ"] + '" class="btn orangeBtn">수정</a></td>';
		str += '</tr>';
	}

	container.html(str);
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