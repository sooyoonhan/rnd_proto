//언어팩로드시작
init();
//개별페이지작동시작
function pageView(){
//	console.log("이제부턴 제가 작동됩니다.");
	console.log(languageJSON)
		console.log(sFolder)
}










////로더활성화
//parent.loader.show();
//
////그리드헤더
//var gridHeader;
////그리드컨테이너
//var container = $("#gridTable");
//
////URL경로파서
//var urlParser = location.href;
//urlParser = urlParser.split("/");
//
//var keyLength = urlParser.length;			//파서길이
//var sFolder = urlParser[keyLength-2];
//var nation = sessionStorage["langType"];
//
////변수제거
//urlParser = null;
//keyLength = null;
//
////불러올grid언어팩파일경로
//var gridUrl = "/setting/lang/" + nation + "/common/gridTitle.json";
//
////버튼언어팩적용
//$.getJSON(
//	gridUrl,
//	function(callback){
//		//console.log(callback);
//		
//		//gridTitle변수저장
//		if(callback[sFolder] != undefined){
//			gridHeader = callback[sFolder];
//		}
//	}
//);
//
////초기메뉴리스트불러오기
//getMenuList(function(lang, error) {
//	//에러체크
//	if(error) {
//		alert(error);
//
//		//로더비활성화
//		parent.loader.hide();
//		return false;
//	}
//
//	//전체메뉴리스트가져오기완료
//	//console.log(lang);
//
//	//결과렌더링
//	lenderGrid(lang);
//}, false);
//
////결과렌더링
//function lenderGrid(callback){
//	console.log(callback);
//
//	var str = '';
//
//	str += '<tr>';
//	for(var i=0; i<gridHeader.length; i++){
//		str += '<th scope="col">' + gridHeader[i] + '</th>';
//	}
//	str += '</tr>';
//
//	for(i=0; i<callback.length; i++){
//		str += '<tr>';
//			str += '<td>' + callback[i]["MENU_SEQ"] + '</td>';
//			str += '<td>' + callback[i]["DEPTH"] + '</td>';
//			str += '<td>' + callback[i]["menuName"] + '</td>';
//			str += '<td>' + callback[i]["PRT_MENU"] + '</td>';
//			str += '<td>' + callback[i]["ORD"] + '</td>';
//			str += '<td><a href="modify.html?seq=' + callback[i]["MENU_SEQ"] + '" class="btn orangeBtn">수정</a></td>';
//		str += '</tr>';
//	}
//
//	container.html(str);
//
//	//로더비성화
//	parent.loader.hide();
//}
//
////검색하기클릭
//var searchBtn = $("#searchBtn");
//searchBtn.on("click", function(e){
//	e.preventDefault();
//
//	var searchText = $("#menu_name").val();
//	searchMenuNameList(searchText,function(lang, error) {
//		//에러체크
//		if(error) {
//			alert(error);
//
//			//로더비활성화
//			parent.loader.hide();
//			return false;
//		}
//
//		//결과렌더링
//		lenderGrid(lang);
//	}, false);
//})