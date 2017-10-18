/*
	langFolder : 언어파일이 위치한 폴더명
	callback : 콜백 함수 ( 결과값, 에러)
	isJson : json 형태로 받을지 유무 ( 디폴트 true)
				true(json),false(object)   
	
*/

//화면에 보여질 메뉴 정보 가져오기
function getMenu(callBack,isJson) {
	isJson = typeof isJson !== 'undefined' ? isJson : true; //디폴트값 설정
	
	
	getMenuJson(function(result,error) {
		if(error) {
			callBack(null,error);
			return false;
		}

		getAuthMenu(1, function(data,error) {
				if(error)
				{
					alert(error);
					return false;
				}

				if(data)
				{
					mappingMenuData(data,result,function(menuData) {

						if(isJson)
							callBack(JSON.stringify(menuData),null);
						else
							callBack(menuData,null);

					});
				}

			});

	});

}

//특정 depth의 메뉴 언어 리스트 가져오기
function getDepthMenuList(depth,callBack,isJson) {
	isJson = typeof isJson !== 'undefined' ? isJson : true; //디폴트값 설정

	getMenuJson(function(result,error) {
		if(error) {
			callBack(null,error);
			return false;
		}

		getDepthMenu(depth, function(data,error) {
				if(error)
				{
					alert(error);
					return false;
				}

				if(data)
				{
					mappingMenuLang(data,result,function(menuData) {

						if(isJson)
							callBack(JSON.stringify(menuData),null);
						else
							callBack(menuData,null);

					});
				}

			});

	});
}

//메뉴 언어 리스트 가져오기 
function getMenuLangList(callBack,isJson) {
	isJson = typeof isJson !== 'undefined' ? isJson : true; //디폴트값 설정
	
	
	getMenuJson(function(result,error) {
		if(error) {
			callBack(null,error);
			return false;
		}

	
		if(isJson)
			callBack(JSON.stringify(result),null);
		else
			callBack(result,null);

				
	});

}

//지정한 depth의 메뉴 리스트 가져오기 
function getDepthMenu(depth_val, callBack) {
	
	const jsonArg = { param:{ depth:depth_val } };
	
	var param = JSON.stringify(jsonArg);
	
	$.ajax({
		url:"http://106.241.53.172:3000/adminSetting/menu/get",
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

	if(result == null) {
		callBack(null);
		return;
	}

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

//메뉴데이터와 메뉴 언어 데이터 맵핑
function mappingMenuLang(menu, langMenu, callBack) {
	var menuData = [];
	
	const result = JSON.parse(menu);

	if(result == null) {
		callBack(null);
		return;
	}

	result.data.forEach(function(val,i) {

		const menuLang = langMenu.menu.filter(function(value) {
				return value.seq === val.MENU_SEQ;
		});
		
		if(menuLang.length)
			menuData.push(menuLang[0]);

	});

	callBack(menuData);
}

//menuData.json에서 메뉴 데이터 가져오기
function getMenuJson(callBack)
{
	var path = "setting/lang/";
	
	path += sessionStorage.getItem('langType') !== null ? sessionStorage.getItem('langType') : 'ko';
	
	var langName = path + "/common/menuData.json"; //최종 호출 경로 설정
	
	$.getJSON(langName) //언어파일 불러오기
		.done(function(result) { //성공
			if(result === null)
			{
				callBack(null,'not Lang');
				return;
			}
			
				callBack(result,null);
		})
		.fail(function(jqxhr,textStatus,error) { //실패
			var err = "menuData "+' '+error ;
			callBack(null,err);
		});
}