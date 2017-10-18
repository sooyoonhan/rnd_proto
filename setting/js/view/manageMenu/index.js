//로더활성화
parent.loader.show();

//메뉴리스트불러오기
loadMenuList();
function loadMenuList(){
	$.getJSON(
		"/setting/lang/" + sessionStorage["langType"] + "/common/menuData.json",
		function(callback){
			//console.log(callback)
			
			//메뉴렌더링
			var container = $("#menu_name");
			var str = '';
			for(var i=0; i<callback["menu"].length; i++){
				str += '<option value="' + callback["menu"][i]["seq"] + '">' + callback["menu"][i]["menuName"] + '</option>'
			}
			container.html(str);

			//상위메뉴리스트불러오기
			getDepthMenuList(1, function(lang, error) {
				//에러체크
				if(error) {
					alert(error);

					//로더비활성화
					parent.loader.hide();
					return false;
				}

				//전체메뉴리스트가져오기완료
				//console.log(lang);

				//메뉴렌더링
				lenderParentMenu(lang);
			}, false);
		}
	);
}

//메뉴렌더링
function lenderParentMenu(lang){
	console.log(lang)
	
	//상위메뉴렌더링
	var container = $("#prt_menu");
	var str = '';
	str += '<option value="0">연결메뉴없음</option>';
	for(var i=0; i<lang.length; i++){
		str += '<option value="' + lang[i]["seq"] + '">' + lang[i]["menuName"] + '</option>';
	}
	container.html(str);

	//로더비활성화
	parent.loader.hide();

	//버튼갱신
	btnsRefesh();
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
			menu_seq: $("#menu_name").val(),
			depth: $("#depth").val(),
			prt_menu: $("#prt_menu").val(),
			ord: $("#ord").val()
		};
		
		//노출순서갱신
		if(param.ord == ""){
			param.ord = 1;
		}

		//서버전달
		console.log("메뉴등록전달변수▼");
		console.log(JSON.stringify(param))

		$.ajax({
			url: protocalURL + "/adminSetting/menu/set",
			contentType:"application/json",
			data: {"param": JSON.stringify(param)},
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


//		$.post(
//			protocalURL + "/adminSetting/menu/set",
//			{
//				param: JSON.stringify(param)
//			},
//			function(callback){
//				console.log(callback)
//
//				//로더비활성화
//				parent.loader.hide();
//			},
//			"json"
//		);
//		console.log(protocalURL)
	});
}