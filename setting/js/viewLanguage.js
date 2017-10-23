//언어팩저장용변수
var languageJSON = {};

//로드체크용변수
var loadCheckVar = 0;

//URL경로파서
var urlParser = location.href;
urlParser = urlParser.split("/");

var keyLength = urlParser.length;			//파서길이
var sFolder = urlParser[keyLength-2];		//메뉴폴더명
var keyTemp = urlParser[keyLength-1];			
keyTemp = keyTemp.split("?seq=");
var key = keyTemp[0];								//뷰페이지번역할페이지파일명
var seq = keyTemp[1];							//조회시퀀스
var nation = sessionStorage["langType"];	//국가코드

//변수제거
urlParser = null;
keyLength = null;
keyTemp = null;

//언어팩초기화
function init(){
	//로딩바활성화
	parent.loader.show();

	//불러올버튼언어팩파일경로
	var jsonURL = "/setting/lang/" + nation + "/common/btns.json";

	//버튼언어팩변수저장
	$.getJSON(
		jsonURL,
		function(callback){
//			console.log("btns.json LOAD완료▼");
//			console.log(callback);

			//언어팩저장변수추가
			languageJSON["btns"] = callback;

			//로딩완료알림
			initLoadCheck();
		}
	);
	
	//불러올언어팩파일경로
	jsonURL = "/setting/lang/" + nation + "/view/" + sFolder + "/lang.json";

	//버튼언어팩변수저장
	$.getJSON(
		jsonURL,
		function(callback){
//			console.log("lang.json LOAD완료▼");
//			console.log(callback);

			//언어팩저장변수추가
			languageJSON["lang"] = callback;

			//로딩완료알림
			initLoadCheck();
		}
	);

	//불러올언어팩파일경로
	jsonURL = "/setting/lang/" + nation + "/common/alertMsg.json";

	//버튼언어팩변수저장
	$.getJSON(
		jsonURL,
		function(callback){
//			console.log("alertMsg.json LOAD완료▼");
//			console.log(callback);

			//언어팩저장변수추가
			languageJSON["alertMsg"] = callback;

			//로딩완료알림
			initLoadCheck();
		}
	);

	//불러올언어팩파일경로
	jsonURL = "/setting/lang/" + nation + "/common/gridTitle.json";

	//버튼언어팩변수저장
	$.getJSON(
		jsonURL,
		function(callback){
//			console.log("gridTitle.json LOAD완료▼");
//			console.log(callback);

			//언어팩저장변수추가
			languageJSON["gridTitle"] = callback;

			//로딩완료알림
			initLoadCheck();
		}
	);
}

//로딩완료알림
function initLoadCheck(){
	loadCheckVar++;

	//JSON로드완료후언어팩적용
	if(loadCheckVar >= 4){
		languageApply();
	}
}

//언어팩적용
function languageApply(){
	//console.log(언어팩저장용변수▼)
	//console.log(languageJSON)

	//버튼치환
	var keyArr = Object.keys(languageJSON["btns"]);
	for(var i=0; i<keyArr.length; i++){
		$("#" + keyArr[i]).html(languageJSON["btns"][keyArr[i]]);
	}

	//현재페이지언어팩JSON
	var keyJSON = languageJSON["lang"][key];

	//서브타이틀디폴트셋팅
	if(typeof keyJSON["subTitle"] === "undefined"){
		keyJSON["subTitle"] = [];
	}

	//컬럼치환용배열
	var columnArr = new Array();
	//Placeholder치환용배열
	var pHolderArr = new Array();
	//SELECT치환용배열
	var selectArr = new Array();
	//각배열별키값셋팅
	var keyArr = Object.keys(keyJSON);
	for(var i=0; i<keyArr.length; i++){
		//컬럼치환용
		if(keyArr[i].substr(0,4) == "COL_"){
			columnArr.push(keyArr[i].substr(4));
		}
		
		//Placeholder치환용배열
		if(keyArr[i].substr(0,3) == "PH_"){
			pHolderArr.push(keyArr[i].substr(3));
		}
		
		//SELECT치환용배열
		if(keyArr[i].substr(0,4) == "SEL_"){
			selectArr.push(keyArr[i].substr(4));
		}
	}

	//타이틀치환
	$(".titleBig").html(keyJSON["titleBig"]);

	//텝메뉴치환
	var tabMenu = $("#tabMenu a");
	for(i=0; i<tabMenu.length; i++){
		tabMenu.eq(i).html(languageJSON["lang"]["tabMenu"][i]);
	}

	//컬럼명치환
	for(i=0; i<columnArr.length; i++){
		$("[for=" + columnArr[i] + "] span").html(keyJSON["COL_" + columnArr[i]]);
	}

	//Placeholder치환
	for(i=0; i<pHolderArr.length; i++){
		$("#" + pHolderArr[i]).attr("placeholder", keyJSON["PH_" + pHolderArr[i]]);
	}
	
	//SELECT치환
	for(i=0; i<selectArr.length; i++){
		for(var j=0; j<keyJSON["SEL_" + selectArr[i]].length; j++){
			$("#" + selectArr[i] + " option").eq(j).html(keyJSON["SEL_" + selectArr[i]][j]);
		}
	}

	//서브타이틀치환
	for(i=0; i<keyJSON["subTitle"].length; i++){
		$(".subTitle").eq(i).html(keyJSON["subTitle"][i]);
	}

	//검색폼라벨여백자동조정
	var li = $("#searchForm li");
	var label = $("#searchForm li label");
	for(var i=0; i<label.length; i++){
		var labelWidth = label.eq(i).width();
		var tempCss = labelWidth + 5 + "px";
		li.eq(i).css("paddingLeft", tempCss);
	}

	//개별페이지작동시작
	pageView();
}

//alert매세지호출
function alertMsgPrint(key){
	alert(languageJSON["alertMsg"][key]);

	//로더활성화
	parent.loader.hide();

	//페이지갱신
	location.reload();
	return false;
}