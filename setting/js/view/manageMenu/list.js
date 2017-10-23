//언어팩로드시작
init();
//개별페이지작동시작
function pageView(){
//	console.log("이제부턴 제가 작동됩니다.");

	//그리드컨테이너
	var container = $("#gridTable");

	//그리드불러오기
	function loadGrid(page, pageSize, searchText){
		//searchText디폴트설정
		if(typeof searchText === "undefined"){
			searchText = '';
		}
		console.log(languageJSON)

		//로더활성화
		parent.loader.show();
			
		//전달변수
		var param = {
			page: page,
			pageSize: pageSize,
		};

		//서버전달
		console.log("메뉴목록불러오기전달변수▼");
		console.log(JSON.stringify(param))
		$.ajax({
			url: protocalURL + "/adminSetting/menu/list",
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
					//alertMsgPrint("insert");
				}
			}
		});
	};
	loadGrid(1, 20);







	//초기메뉴리스트불러오기
	getMenuList(function(lang, error) {
		//에러체크
		if(error) {
			alert(error);

			//로더비활성화
			parent.loader.hide();
			return false;
		}

		//전체메뉴리스트가져오기완료
		//console.log(lang);

		//결과렌더링
		lenderGrid(lang);
	}, false);

	//결과렌더링
	function lenderGrid(callback){
//		console.log("검색결과콜백▼");
//		console.log(callback);

		var str = '';
		str += '<tr>';
		for(var i=0; i<languageJSON["gridTitle"][sFolder].length; i++){
			str += '<th scope="col">' + languageJSON["gridTitle"][sFolder][i] + '</th>';
		}
		str += '</tr>';

		for(i=0; i<callback.length; i++){
			str += '<tr>';
				str += '<td>' + callback[i]["MENU_SEQ"] + '</td>';
				str += '<td>' + callback[i]["DEPTH"] + '</td>';
				str += '<td>' + callback[i]["menuName"] + '</td>';
				str += '<td>' + callback[i]["PRT_MENU"] + '</td>';
				str += '<td>' + callback[i]["ORD"] + '</td>';
				str += '<td><a href="modify.html?seq=' + callback[i]["MENU_SEQ"] + '" class="btn orangeBtn">수정</a></td>';
			str += '</tr>';
		}

		container.html(str);

		//로더비성화
		parent.loader.hide();
	}

	//검색하기클릭
	var searchBtn = $("#searchBtn");
	searchBtn.on("click", function(e){
		e.preventDefault();

		//로더활성화
		parent.loader.show();

		var searchText = $("#menu_name").val();
		searchMenuNameList(searchText,function(lang, error) {
			//에러체크
			if(error) {
				alert(error);

				//로더비활성화
				parent.loader.hide();
				return false;
			}

			//결과렌더링
			lenderGrid(lang);
		}, false);
	})
}