//언어팩로드시작
init();
//개별페이지작동시작
function pageView(){
	console.log("이제부턴 제가 작동됩니다.");
	
	//시퀀스값불러오기
	var loadSeqParam = {auth_seq:seq};
	var loadSeq = loadJSON = $.ajax({
		url: protocalURL + "/adminSetting/auth/getAuth",
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
	$.when(loadSeq).done(whenDo);
	function whenDo(){
//		console.log("작동!!");
		console.log(setSeq)
//		console.log(seq)

		$("#auth_name").val(setSeq["AUTH_NAME"]);

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
				auth_seq: seq,
				auth_name: $("#auth_name").val()
			};
			
			//오류값체크
			//권한명미입력
			if(param["auth_name"] == ""){
				alert(languageJSON["alertMsg"]["#auth_name"]);
				$("#auth_name").focus();
				parent.loader.hide();
				return false;
			}

			//서버전달
			console.log("계정권한수정전달변수▼");
			console.log(JSON.stringify(param))
			$.ajax({
				url: protocalURL + "/adminSetting/auth/update",
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