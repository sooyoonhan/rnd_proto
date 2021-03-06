//언어팩로드시작
init();
//개별페이지작동시작
function pageView(){
//	console.log("이제부턴 제가 작동됩니다.");

	//로더비활성화
	parent.loader.hide();

	//생성완료클릭
	var insertBtn = $("#insertBtn");
	insertBtn.on("click", function(e){
		e.preventDefault();

		//로더활성화
		parent.loader.show();
		
		//전달변수
		var param = {
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
//		console.log("계정권한생성전달변수▼");
//		console.log(JSON.stringify(param))
		$.ajax({
			url: protocalURL + "/adminSetting/auth/set",
			contentType:"application/json",
			data: JSON.stringify({param: param}),
			method:"POST",
			error: loadProtocalFail,
			success:function(callback){
				callback = JSON.parse(callback);
//				console.log(callback)

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
	})
}