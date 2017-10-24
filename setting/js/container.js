//로더
var loader = $("#loader");

//언어셀렉트
var language = $("#language");

//권한(나중에 세션값에서 가져와야함)
var rights = 1;

//언어팩변경
language.val(sessionStorage.getItem('langType') !== null ? sessionStorage.getItem('langType') : 'ko');
language.on("change", function(e){
	e.preventDefault();

	sessionStorage.setItem('langType',$(this).val());
	location.reload();
});

//console.log("현재 설정된 언어팩: " + language.val());

//권한별메뉴목록불러오기
getMenuList(rights);
function getMenuList(varRights){
	var param = {
		auth_seq: varRights
	};
	
	//서버전달
//	console.log("권한별메뉴목록불러오기▼");
//	console.log(JSON.stringify(param));

	$.ajax({
		url: "http://106.241.53.172:3000/adminSetting/authMenu/getMenu",
		contentType:"application/json",
		data: {param:JSON.stringify(param)},
		method:"GET",
		error: function(){
		   alert('Error loading XML document');
		},
		success:function(callback){
			//console.log(callback);

			//메뉴렌더링
			lenderMenu(callback);
		}
	});
}

//메뉴렌더링
function lenderMenu(getMenuCallback){
	getMenuCallback = JSON.parse(getMenuCallback);
//	console.log(getMenuCallback);
	
	//getMenuCallback배열재정립
	var mainMenu = {};

	//대메뉴추출
	mainMenu["menu"] = getMenuCallback["data"].filter(function(value){
		return value.DEPTH === 1;
	});

	//메뉴데이터오브젝트생성
	var menuData = mainMenu["menu"];

	//현재메뉴에하위메뉴만들기
	getMenuCallback["data"].forEach(function(val, i){
		//현재대메뉴에하위메뉴들추출
		const subMenuData = getMenuCallback["data"].filter(function(value){
			return value.DEPTH === 2 && value.PRT_MENU === val.MENU_SEQ;
		});

		if(subMenuData.length){
			menuData[i]["subMenu"] = subMenuData;
		}
	});

	console.log(mainMenu)

	
	//네비게이션컨테이너
	var container = $("nav > ul");

	var str = '';
	var bigMenu = mainMenu["menu"];

	for(var i=0; i<bigMenu.length; i++){
		str += '<li>';
			//대메뉴렌더링
			str += '<a href="' + bigMenu[i]["url"] + '">';
				str += '<span>' + bigMenu[i]["MENU_NAME"] + '</span>';
				str += '<i class="fa fa-angle-down" aria-hidden="true"></i>';
			str += '</a>';
			//서브메뉴렌더링
			var subMenu = bigMenu[i]["subMenu"];
			if(subMenu != undefined){
				//서브메뉴있음
				str += '<ul>';
					for(var j=0; j<subMenu.length; j++){
						str += '<li>';
							str += '<a href="' + subMenu[j]["URL"] + '" target="contents">';
								str += '<i class="fa fa-caret-right" aria-hidden="true"></i> ';
								str += '<span>' + subMenu[j]["MENU_NAME"] + '</span>';
							str += '</a>';
						str += '</li>';
					}
				str += '</ul>';
			}
		str += '<li>';
	}

	//렌더링
//	container.html(str);
	container.append(str);

	//로더비활성화
	loader.hide();

	//버튼갱신
	btnsRefesh();
}

//버튼갱신
function btnsRefesh(){
	//네비게이션
	var bMenu = $("nav > ul > li > a");		//대메뉴
	var sMenuCon = $("nav > ul > li ul");	//소메뉴컨테이너
	var sMenu = $("nav > ul > li ul a");	//소메뉴
	var container = $("[name=contents]");	//화면표시Iframe
	var navigation = $("#navigation");		//네비게이션
	//대메뉴클릭
	bMenu.unbind("click").bind("click", function(e){
		e.preventDefault();

		//클래스핸들링
		bMenu.parent().removeClass("ov");
		sMenu.removeClass("ov");
		$(this).parent().addClass("ov");

		//부모텍스트
		var parentText = $(this).find("span").text();


		//하위메뉴유무에따른작동
		var isBool = $(this).next().is("ul");
		if(isBool){
			//하위메뉴있음
			var target = $(this).next().find("a").eq(0);
			target.addClass("ov");
			container.attr("src", target.attr("href"));

			//자식텍스트
			var subText = target.find("span").text();

			//네비게이션갱신
			var str = 'MAIN ';
			str += '<i class="fa fa-angle-right" aria-hidden="true"></i> ' + parentText;
			str += '<i class="fa fa-angle-right" aria-hidden="true"></i> ' + subText;
			navigation.html(str);

		} else{
			//하위메뉴없음
			container.attr("src", $(this).attr("href"));

			//네비게이션갱신
			var str = 'MAIN ';
			str += '<i class="fa fa-angle-right" aria-hidden="true"></i> ' + parentText;
			navigation.html(str);
		}
	});
	//소메뉴클릭작동
	sMenu.unbind("click").bind("click", function(e){
		//클래스핸들링
		sMenu.removeClass("ov");
		$(this).addClass("ov");

		//네비게이션갱신
		//부모텍스트
		var parentText = $(this).parent().parent().parent().find("span").eq(0).text();
		//자식텍스트
		var subText = $(this).find("span").text();
		var str = 'MAIN ';
		str += '<i class="fa fa-angle-right" aria-hidden="true"></i> ' + parentText;
		str += '<i class="fa fa-angle-right" aria-hidden="true"></i> ' + subText;
		navigation.html(str);
	});
}




/*
이 밑쪽으로는 로그인에서만 이용되는 기능입니다.
*/

//로그인버튼클릭
var loginBtn = $("#loginBtn");
loginBtn.unbind("click").bind("click", function(e){
	e.preventDefault();

	location.href = "body.html";
});