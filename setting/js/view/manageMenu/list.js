//언어팩로드시작
init();
//개별페이지작동시작
function pageView(){
	console.log("이제부턴 제가 작동됩니다.");
	
	//그리드불러오기
	loadGrid(1, 1);
	function loadGrid(page, pageSize, searchText){
		//searchText디폴트설정
		if(typeof searchText === "undefined"){
			searchText = '';
		}
		//console.log(languageJSON)

		//로더활성화
		parent.loader.show();
			
		//전달변수
		var param = {
			page: page,
			pageSize: pageSize,
		};

		//서버전달
//		console.log("메뉴목록불러오기전달변수▼");
//		console.log(JSON.stringify(param))
		$.ajax({
			url: protocalURL + "/adminSetting/menu/list",
			contentType:"application/json",
			data: JSON.stringify({param: param}),
			method:"POST",
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
					//그리드렌더링
					lenderGrid(callback, page, pageSize);
				}
			}
		});
	};
	
	//그리드렌더링
	function lenderGrid(gridData, page, pageSize){
		console.log(gridData);
		console.log(languageJSON)

		var container = $("#gridTable");
		var str = '';
		str += '<tr>';
			for(var i=0; i<languageJSON["gridTitle"][sFolder].length; i++){
				str += '<th scope="col">' + languageJSON["gridTitle"][sFolder][i] + '</th>';
			}
		str += '</tr>';
		
		for(i=0; i<gridData["data"]["rows"].length; i++){
			str += '<tr>';
				str += '<td>' + gridData["data"]["rows"][i]["MENU_SEQ"] + '</td>';
				str += '<td>' + gridData["data"]["rows"][i]["DEPTH"] + '</td>';
				str += '<td>' + gridData["data"]["rows"][i]["MENU_NAME"] + '</td>';
				str += '<td>' + gridData["data"]["rows"][i]["PRT_MENU"] + '</td>';
				str += '<td>' + gridData["data"]["rows"][i]["ORD"] + '</td>';
				str += '<td><a href="modify.html?seq=' + gridData["data"]["rows"][i]["MENU_SEQ"] + '" class="btn orangeBtn">수정</a></td>';
			str += '</tr>';
		}
		
		container.html(str);

		//페이지랜더링
		var paging = $(".gridPage ul");											//페이지표시컨테이너
		var page_num = 5;														//페이지표시갯수
		var view_num = pageSize;												//페이지당 표시갯수

		var total_page = Math.ceil(gridData["data"]["records"] / view_num);		//총페이지수

		var total_block = Math.ceil(total_page / page_num);						//총블록
		var block = Math.ceil(page / page_num);									//현재블록
		var first = (block-1) * page_num;										//페이지블록의 시작하는 첫페이지
		var last = block * page_num;											//페이지블록의 끝페이지
		str = '';
		
		if(block >= total_block){
			last = total_page;
		};
		
		if(block > 1){
			//첫페이지
			str += '<li><a href="#" class="firstBtn" data-page="1">First</a></li>';
		};
		
		if(page > 1){
			go_page = Number(page) - 1;
			str += '<li><a href="#" class="prevBtn" data-page="' + go_page + '">Prev</a></li>';
		};
		
		for(i=first+1; i<=last; i++){
			if(i == page){
				str += '<li><a href="#" class="ov" data-page="' + i + '">' + i + '</a></li>';
			} else{
				str += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>';
			}
		};
		
		if(total_page > page){
			go_page = Number(page) + 1;
			str += '<li><a href="#" class="nextBtn" data-page="' + go_page + '">Next</a></li>';
		};
		
		if(block < total_block){
			str += '<li><a href="#" class="lastBtn" data-page="' + total_page + '">Last</a></li>';
		};
		
		//페이지렌더링
		paging.html(str);

		//버튼갱신
		btnsRefesh();
		
		//로더비활성화
		parent.loader.hide();
	}

	//버튼갱신
	function btnsRefesh(){
		//그리드페이지버튼클릭
		var gridPageBtn = $(".gridPage a");
		gridPageBtn.unbind("click").bind("click", function(e){
			e.preventDefault();

			loadGrid($(this).attr("data-page"), 1);
		})

		//검색하기클릭
		var searchBtn = $("#searchBtn");
		searchBtn.on("click", function(e){
			e.preventDefault();

//			//로더활성화
//			parent.loader.show();
//
//			var searchText = $("#menu_name").val();
//			searchMenuNameList(searchText,function(lang, error) {
//				//에러체크
//				if(error) {
//					alert(error);
//
//					//로더비활성화
//					parent.loader.hide();
//					return false;
//				}
//
//				//결과렌더링
//				lenderGrid(lang);
//			}, false);
		})
	}
}