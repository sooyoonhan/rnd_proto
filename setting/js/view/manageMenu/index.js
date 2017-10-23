//언어팩로드시작
init();
//개별페이지작동시작
function pageView(){
	console.log("이제부턴 제가 작동됩니다.");

	//메뉴리스트불러오기
	loadMenuList();
	function loadMenuList(){
		$.getJSON(
			"/setting/lang/" + sessionStorage["langType"] + "/common/menuData.json",
			function(callback){
				console.log("menuData.json로딩완료▼")
				console.log(callback)
				
				//메뉴렌더링
				var container = $("#url");
				var str = '';
				for(var i=0; i<callback["menu"].length; i++){
					str += '<option value="' + callback["menu"][i]["url"] + '">' + callback["menu"][i]["menuName"] + '(' + callback["menu"][i]["url"] + ')</option>'
				}
				container.html(str);

				//버튼갱신
				btnsRefesh();

				//로더비활성화
				parent.loader.hide();
			}
		);
	}

	//버튼갱신
	function btnsRefesh(){
		//생성완료버튼
		var insertBtn = $("#insertBtn");
		insertBtn.unbind("click").bind("click", function(e){
			e.preventDefault();

			//로더활성화
			parent.loader.show();
			
			//전달변수
			var param = {
				menu_name: $("#menu_name").val(),
				url: $("#url").val(),
				depth: $("#depth").val(),
				ord: $("#ord").val(),
				prt_menu: $("#prt_menu").val(),
			};
			
			//노출순서갱신
			if(param.ord == ""){
				param.ord = 1;
			}

			//오류값체크
			//메뉴명미입력
			if(param["menu_name"] == ""){
				alert(languageJSON["alertMsg"]["#menu_name"]);
				$("#menu_name").focus();
				parent.loader.hide();
				return false;
			}

			//서버전달
			console.log("메뉴등록전달변수▼");
			console.log(JSON.stringify(param))
			$.ajax({
				url: protocalURL + "/adminSetting/menu/set",
				contentType:"application/json",
				data: JSON.stringify({param: param}),
				method:"POST",
				success:function(callback){
					callback = JSON.parse(callback);
					console.log(callback)

					if(callback["result"] == 1){
						//에러
						alert("[Error]\n" + JSON.stringify(callback["msg"]));
				
						//로더비활성화
						parent.loader.hide();
						return false;
					} else{
						//정상작동
						alertMsgPrint("insert");
					}
				}
			});
		});
	}
}