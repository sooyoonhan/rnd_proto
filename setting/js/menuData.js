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
			
			//권한에 맵핑된 메뉴 데이터 가져오기 
			getAuthMenu(1, function(data,error) {
				if(error)
				{
					alert(error);
					return false;
				}

				if(data)
				{
					mappingMenuData(data,result,function(menuData) {
						console.log(JSON.stringify(menuData));
					});
				}

			});


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

//권한별 메뉴정보 가져오기 
function getAuthMenu(auth_seqVal, callBack) {
	
	const jsonArg = { param:{ auth_seq:auth_seqVal } };
	
	var param = JSON.stringify(jsonArg);
	
	$.ajax({
		url:"http://106.241.53.172:3000/adminSetting/authMenu/getMenu",
		contentType:"application/json",
		//datatype:"json",
		data:param,
		method:"POST",
		error: function(){
			   alert('Error loading XML document');
			},
		success:function(result){
			try {

					callBack(result);
					
			}
			catch(e) {

				callBack(null,e);

			}
		}
	});
}

//권할별 메뉴 데이터와 언어 메뉴 데이터 맵핑 작업
function mappingMenuData(authMenu, langMenuData, callBack) {
	var mainMenu = {};
	
	const result = JSON.parse(authMenu);

	//대메뉴 추출
	mainMenu.menu = result.data.filter(function(value) {
		return value.DEPTH === 1;
	});

	//메뉴 데이터 오브젝트 생성
	var MenuData = {};
	//메뉴 데이터에 menu Array 생성
	MenuData.menu = []; 

	//대메뉴 반복돌리기
	mainMenu.menu.forEach( function(val,i) {
		
		//대메뉴 언어데이터 검색
		const mainMenuLang = langMenuData.menu.filter(function(value) {
			return value.seq === val.MENU_SEQ;
		});

		//대메뉴 언어 데이터 있는지 체크
		if(mainMenuLang.length == 0)
			return;

		//있으면 대메뉴 언어 데이터 추가
		MenuData.menu.push(mainMenuLang[0]);

		//현재 대메뉴에 하위 메뉴들을 추출 
		const subMenuData = result.data.filter(function(value) {
				
				return value.DEPTH === 2 && value.PRT_MENU === val.MENU_SEQ;
		});

		//하위 메뉴 Array 생성
		var subMenu = [];
		
		//하위 메뉴 반복 돌리기
		subMenuData.forEach( function(subVal, subi){
			
			//하위 메뉴 언어 데이터 검색
			const subMenuLang =  langMenuData.menu.filter(function(value) {
				return value.seq === subVal.MENU_SEQ;
			});

			//하위 메뉴 언어 데이터 있는지 체크 후 있으면 추가
			if(subMenuLang.length)
				subMenu.push(subMenuLang[0]);
		
		});

		//맵핑 과정에서 있는 메뉴들만 하위 메뉴로 등록
		if(subMenu.length)
			MenuData.menu[i]['subMenu'] = subMenu; //대메뉴 밑에 하위 메뉴로 삽입
			
	});

	//console.log(JSON.stringify(MenuData.menu));

	callBack(MenuData);
}