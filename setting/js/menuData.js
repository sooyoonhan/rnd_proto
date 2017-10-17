/*
	langFolder : 언어파일이 위치한 폴더명
	callback : 콜백 함수 ( 결과값, 에러)
	isJson : json 형태로 받을지 유무 ( 디폴트 true)
				true(json),false(object)   
	
*/

function getMenu(callBack,isJson)
{
	isJson = typeof isJson !== 'undefined' ? isJson : true; //디폴트값 설정
	
	var path = "setting/lang/";
	
	path += sessionStorage.getItem('langType') !== null ? sessionStorage.getItem('langType') : 'ko';
	
	var langName = path + "/common/menuData.json"; //최종 호출 경로 설정
	
	$.getJSON(langName) //언어파일 불러오기
		.done(function(result) { //성공
			if(result === null)
			{
				callBack(null,'not Lang');
			}
			
			if(isJson)
				callBack(JSON.stringify(result),null);
			else
				callBack(result,null);
		})
		.fail(function(jqxhr,textStatus,error) { //실패
			var err = "menuData "+' '+error ;
			callBack(null,err);
		});
	
}
