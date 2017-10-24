//언어팩로드시작
init();
//개별페이지작동시작
function pageView(){
//	console.log("이제부턴 제가 작동됩니다.");
	
	//상위메뉴리스트불러오기
	var loadParentMenu = $.ajax({
		url: protocalURL + "/adminSetting/menu/get",
		contentType:"text",
		data: {param: JSON.stringify({depth:1})},
		method:"GET"
	}).then(loadParentMenuSuccess, loadProtocalFail);

	//상위메뉴리스트불러오기성공
	function loadParentMenuSuccess(callback){
		callback = JSON.parse(callback);
//		console.log(callback);

		if(callback["result"] == 1){
			//에러
			alert("[Error]\n" + JSON.stringify(callback["msg"]));
	
			//로더비활성화
			parent.loader.hide();
			return false;
		} else{
			//정상작동

			//상위메뉴선택렌더링
			var container = $("#prt_menu");
			var str = '';
			for(var i=0; i<callback["data"].length; i++){
				str += '<option value=' + callback["data"][i]["MENU_SEQ"] + '>' + callback["data"][i]["MENU_NAME"] + '</option>';
			}
			container.append(str);
		}
	}

	//URL선택불러오기
	var loadJSONURL = $.ajax({
		url: "/setting/lang/" + sessionStorage["langType"] + "/common/menuData.json",
		contentType:"text",
		method:"GET"
	}).then(loadURLSuccess, loadJsonFail);

	//URL선택불러오기성공
	function loadURLSuccess(callback){
//		console.log("menuData.json로딩완료▼")
//		console.log(callback)

		//메뉴렌더링
		var container = $("#url");
		var str = '';
		for(var i=0; i<callback["menu"].length; i++){
			str += '<option value="' + callback["menu"][i]["url"] + '">' + callback["menu"][i]["menuName"] + '(' + callback["menu"][i]["url"] + ')</option>'
		}
		container.html(str);
	}
	
	//시퀀스값불러오기
	var loadSeqParam = {menu_seq:seq};
	var loadSeq = loadJSON = $.ajax({
		url: protocalURL + "/adminSetting/menu/getMenu",
		contentType:"application/json",
		data: {param: JSON.stringify(loadSeqParam)},
		method:"GET"
	}).then(loadSeqSuccess, loadProtocalFail);

	//시퀀스값불러오기성공
	var setSeq;
	function loadSeqSuccess(callback){
		callback = JSON.parse(callback);
//		console.log(callback)

		if(callback["result"] == 1){
			//에러
			alert("[Error]\n" + JSON.stringify(callback["msg"]));
			
			//로더비활성화
			parent.loader.hide();
			return false;
		} else{
			setSeq = callback["data"]["0"];
		}
	}

	//상위메뉴리스트불러오기, URL선택불러오기,시퀀스값불러오기 동기화되면 실행
	$.when(loadParentMenu, loadJSONURL, loadSeq).done(whenDo);
	function whenDo(){
//		console.log("작동!!");
//		console.log(setSeq)
//		console.log(seq)

		$("#depth").val(setSeq["DEPTH"]);
		$("#menu_name").val(setSeq["MENU_NAME"]);
		$("#ord").val(setSeq["ORD"]);
		$("#prt_menu").val(setSeq["PRT_MENU"]);
		$("#url").val(setSeq["URL"]);

		//버튼갱신
		btnsRefesh();

		//로더비활성화
		parent.loader.hide();
	}

	//버튼갱신
	function btnsRefesh(){
		//수정완료버튼
		var modifyBtn = $("#modifyBtn");
		modifyBtn.unbind("click").bind("click", function(e){
			e.preventDefault();
			
			//로더활성화
			parent.loader.show();
			
			//전달변수
			var param = {
				menu_seq: seq,
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
//			console.log("메뉴수정전달변수▼");
//			console.log(JSON.stringify(param))
			$.ajax({
				url: protocalURL + "/adminSetting/menu/update",
				contentType:"application/json",
				data: JSON.stringify({param: param}),
				method:"POST",
				error: loadProtocalFail,
				success:function(callback){
					callback = JSON.parse(callback);
//					console.log(callback)

					if(callback["result"] == 1){
						//에러
						alert("[Error]\n" + JSON.stringify(callback["msg"]));
				
						//로더비활성화
						parent.loader.hide();
						return false;
					} else{
						//정상작동
						alertMsgPrint("modify");
					}
				}
			});
		});
	}
}