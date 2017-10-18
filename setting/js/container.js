//로더
var loader = $("#loader");

//언어셀렉트
var language = $("#language");

//언어팩변경
language.val(sessionStorage.getItem('langType') !== null ? sessionStorage.getItem('langType') : 'ko');
language.on("change", function(e){
	e.preventDefault();

	sessionStorage.setItem('langType',$(this).val());
	location.reload();
});

//전체메뉴리스트가져오기
getMenu(function(lang, error) {
	//에러체크
	if(error) {
		alert(error);

		//로더비활성화
		loader.hide();
		return false;
	}

	//전체메뉴리스트가져오기완료
	//console.log(lang);

	//메뉴렌더링
	lenderMenu(lang);
}, false);

getMenuLangList(function(lang, error) {
	//에러체크
	if(error) {
		alert(error);

		//로더비활성화
		loader.hide();
		return false;
	}

	//전체메뉴리스트가져오기완료
	//console.log(lang);

	//메뉴렌더링
	//lenderMenu(lang);
}, false);

//메뉴렌더링
function lenderMenu(getMenuCallback){
	//console.log(getMenuCallback);
	
	//네비게이션컨테이너
	var container = $("nav > ul");

	var str = '';
	var bigMenu = getMenuCallback["menu"];

	for(var i=0; i<bigMenu.length; i++){
		str += '<li>';
			//대메뉴렌더링
			str += '<a href="' + bigMenu[i]["url"] + '">';
				str += '<span>' + bigMenu[i]["menuName"] + '</span>';
				str += '<i class="fa fa-angle-down" aria-hidden="true"></i>';
			str += '</a>';
			//서브메뉴렌더링
			var subMenu = bigMenu[i]["subMenu"];
			if(subMenu != undefined){
				//서브메뉴있음
				str += '<ul>';
					for(var j=0; j<subMenu.length; j++){
						str += '<li>';
							str += '<a href="' + subMenu[j]["url"] + '" target="contents">';
								str += '<i class="fa fa-caret-right" aria-hidden="true"></i> ';
								str += '<span>' + subMenu[j]["menuName"] + '</span>';
							str += '</a>';
						str += '</li>';
					}
				str += '</ul>';
			}
		str += '<li>';
	}

	//렌더링
	container.html(str);

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


	//로그인버튼클릭
	var loginBtn = $("#loginBtn");
	loginBtn.unbind("click").bind("click", function(e){
		e.preventDefault();

		location.href = "body.html";
	});
}