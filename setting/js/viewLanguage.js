$(function(){
	//URL경로파서
	var urlParser = location.href;
	urlParser = urlParser.split("/");
	
	var keyLength = urlParser.length;			//파서길이
	var sFolder = urlParser[keyLength-2];
	var key = urlParser[keyLength-1];
	var nation = sessionStorage["langType"];

	//변수제거
	urlParser = null;
	keyLength = null;

	//불러올버튼언어팩파일경로
	var btnUrl = "/setting/lang/" + nation + "/common/btns.json";
	//버튼언어팩적용
	$.getJSON(
		btnUrl,
		function(callback){
			//console.log(callback);

			//각배열별키값셋팅
			var keyArr = Object.keys(callback);
			
			//버튼
			for(var i=0; i<keyArr.length; i++){
				$("#" + keyArr[i]).html(callback[keyArr[i]]);
			}
		}
	);


	//불러올언어팩파일경로
	var url = "/setting/lang/" + nation + "/view/" + sFolder + "/lang.json";
	//언어팩적용
	$.getJSON(
		url,
		function(callback){
			//console.log(callback)
			
			//현재페이지언어팩JSON
			var keyJSON = callback[key];

			//컬럼치환용배열
			var columnArr = new Array();
			
			//Placeholder치환용배열
			var pHolderArr = new Array();

			//SELECT치환용배열
			var selectArr = new Array();
			
			//GridHeader디폴트셋틍
			if(keyJSON["gridTable"] === undefined){
				keyJSON["gridTable"] = 0;
			}

			//서브타이틀디폴트셋틍
			if(keyJSON["subTitle"] === undefined){
				keyJSON["subTitle"] = 0;
			}

			//각배열별키값셋팅
			var keyArr = Object.keys(callback[key]);
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

			//치환시작
			//타이틀
			$(".titleBig").html(keyJSON["titleBig"]);

			//텝메뉴
			var tabMenu = $("#tabMenu a");
			for(i=0; i<tabMenu.length; i++){
				tabMenu.eq(i).html(callback["tabMenu"][i]);
			}

			//컬럼명
			for(i=0; i<columnArr.length; i++){
				$("[for=" + columnArr[i] + "] span").html(keyJSON["COL_" + columnArr[i]]);
			}

			//Placeholder
			for(i=0; i<pHolderArr.length; i++){
				$("#" + pHolderArr[i]).attr("placeholder", keyJSON["PH_" + pHolderArr[i]]);
			}
			
			//SELECT
			for(i=0; i<selectArr.length; i++){
				for(var j=0; j<keyJSON["SEL_" + selectArr[i]].length; j++){
					$("#" + selectArr[i] + " option").eq(j).html(keyJSON["SEL_" + selectArr[i]][j]);
				}
			}

			//GridHeader
			for(i=0; i<keyJSON["gridTable"].length; i++){
				$("#gridTable tr").eq(0).find("th").eq(i).html(keyJSON["gridTable"][i]);
			}

			//서브타이틀
			for(i=0; i<keyJSON["subTitle"].length; i++){
				$(".subTitle").eq(i).html(keyJSON["subTitle"][i]);
			}

			//검색폼라벨여백자동조정
			labelPaddingChange();
		}
	);
})