//로더
var loader = $("#loader");
loader.hide();

//언어셀렉트
var language = $("#language");

////언어팩로드
language.val(sessionStorage.getItem('langType') !== null ? sessionStorage.getItem('langType') : 'ko');
//getLang('menuname', function(lang, error){
//	//세션내용
//	console.log(sessionStorage);
//	
//	//에러체크
//	if(error){
//		alert(error);
//
//		//로더비활성화
//		loader.hide();
//		return false;
//	}
//
//	//언어팩로드완료
//	console.log(lang);
//
//	//로더비활성화
//	loader.hide();
//}, true);

//언어팩변경
language.on("change", function(e){
	e.preventDefault();

	sessionStorage.setItem('langType',$(this).val());
	location.reload();
});

//전체 메뉴 리스트 가져오기
getMenu(function(lang, error) {

	if(error) {
		alert(error);
		return false;
	}

//	alert(lang);

}, true);


//네비게이션
var bMenu = $("nav > ul > li > a");		//대메뉴
var sMenuCon = $("nav > ul > li ul");	//소메뉴컨테이너
var sMenu = $("nav > ul > li ul a");	//소메뉴
var container = $("[name=contents]");	//화면표시Iframe
var navigation = $("#navigation");		//네비게이션
//대메뉴클릭
bMenu.on("click", function(e){
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
sMenu.on("click", function(e){
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
loginBtn.on("click", function(e){
	e.preventDefault();

	location.href = "body.html";
});