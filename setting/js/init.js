//언어팩저장용변수
var languageJSON = {};

//URL경로파서
var urlParser = location.href;
urlParser = urlParser.split("/");
var keyLength = urlParser.length;			//파서길이
var sFolder = urlParser[keyLength-2];		//메뉴폴더명
var keyTemp = urlParser[keyLength-1];			
keyTemp = keyTemp.split("?seq=");
var key = keyTemp[0];						//뷰페이지번역할페이지파일명
var seq = keyTemp[1];						//조회시퀀스
//변수제거
urlParser = null;
keyLength = null;
keyTemp = null;

//초기화
function init(){
	//로딩바활성화
	parent.loader.show();

	//언어세션체크
	var nation = sessionStorage["langType"];	//국가코드
	if(typeof nation === "undefined"){
		alert("세션이 없습니다.");
		parent.location.href = "/index.html";
	}

	//불러올JSON변수불러오기
	var loadJsonArr = new Array();
	var urlRoot = "/setting/lang/" + nation;
	loadJsonArr[0] = urlRoot + "/common/btns.json";					//버튼언어팩
	loadJsonArr[1] = urlRoot + "/view/" + sFolder + "/lang.json";	//View언어팩
	loadJsonArr[2] = urlRoot + "/common/alertMsg.json";				//메세지언어팩
	loadJsonArr[3] = urlRoot + "/common/gridTitle.json";			//그리드컬럼언어팩
	
	//JSON호출
	var json0 = $.getJSON(
		loadJsonArr[0],
		function(callback){
//			console.log(this.url + " loadJSON 콜백완료▼")
//			console.log(callback)

			//언어팩저장변수추가
			languageJSON["btns"] = callback;
		}
	);
	var json1 = $.getJSON(
		loadJsonArr[1],
		function(callback){
//			console.log(this.url + " loadJSON 콜백완료▼")
//			console.log(callback)

			//언어팩저장변수추가
			languageJSON["lang"] = callback;
		}
	);
	var json2 = $.getJSON(
		loadJsonArr[2],
		function(callback){
//			console.log(this.url + " loadJSON 콜백완료▼")
//			console.log(callback)

			//언어팩저장변수추가
			languageJSON["alertMsg"] = callback;
		}
	);
	var json3 = $.getJSON(
		loadJsonArr[3],
		function(callback){
//			console.log(this.url + " loadJSON 콜백완료▼")
//			console.log(callback)

			//언어팩저장변수추가
			languageJSON["gridTitle"] = callback;
		}
	);

	//JSON동기화
	$.when(json0, json1, json2, json3).done(languageApply);

	//언어팩적용
	function languageApply(){
		console.log("모든JSON파일로드완료됨.");
		console.log("언어팩적용시작");
		console.log(languageJSON);

		//버튼치환
		var keyArr = Object.keys(languageJSON["btns"]);
		for(var i=0; i<keyArr.length; i++){
			$("#" + keyArr[i]).html(languageJSON["btns"][keyArr[i]]);
		}

		//현재페이지언어팩JSON
		var keyJSON = languageJSON["lang"][key];
		
		//서브타이틀디폴트셋팅
		if(typeof keyJSON["subTitle"] == "undefined"){
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

//프로토콜호출실패
function loadProtocalFail(err){
	alert("Protocal Call Error");
	
	//로더비활성화
	parent.loader.hide();
	return false;
}

//json불러오기실패
function loadJsonFail(err){
	alert("json Load Error");
	
	//로더비활성화
	parent.loader.hide();
	return false;
}