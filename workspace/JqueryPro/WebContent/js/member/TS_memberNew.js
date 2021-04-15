/**
 * 
 */


var loginId = "";

$(document).ready(function() {
	
	initSelect();
	
	// 취미,직업, 기념일코드 세팅
//	initLikeSelect();
//	initJobSelect();
//	initMemorialSelect();

	// 이메일 수신동의 default 세팅(N)
	$("#recvEmail_N").prop("checked",true);
	
	// 우편번호찾기 화면-시 세팅
//	initCitySelect();
});
	// 취미코드 조회해서 세팅
function initSelect(){
	var strId= [];
//	var param;
//	param ={"flag" : "init"};
	$.ajax({
		url : "/JqueryPro/CodeServlet"
		,type : "post"
//		,data : param
	,dataType : "json"
	,success : function(data) {
		console.log(data);
//		makeSelect(data);
		alert("성공");
	}
	,error : function(xhr) {
		console.error(xhr);
		alert("오류");
	}
	});
	
}

function makeSelect(data){
	var strId;
	var idx;
	for(i=0; i<data.length; i++){
//	data[i].get("value") : 그룹 코드 번호
//	data[i].get("name") : 그룹 코드 이름    e.g.취미코드
//	"취미코드".indexOf("코드") : 2
//	"취미코드".substr(0,2)
		
		$.ajax({
			url : "/JqueryPro/CodeServlet"
			,type : "post"
//			,data : {
//				"groupCode" : data[i].get("groupCode")
//			}
			,dataType : "json"
			,success : function(data) {
				console.log(data);
//				makemakeSelect(data);
//				alert("성공");
			}
			,error : function(xhr) {
				console.error(xhr);
				alert("오류");
			}
		});
	};
}
function makemakeSelect(data){
	var strHtml = "";
	
	for (i = 0; i < data.length; i++) {
		
		if(data[i].get("groupCodeName").indexOf("코드")!= -1){
			idx = data[i].get("groupCodeName").indexOf("코드");
			strId = data[i].get("groupCodeName").substr(0,idx);
		} else {
			idx = data[i].get("groupCodeName").indexOf("유형");
			strId = data[i].get("groupCodeName").substr(0,idx);
		}	
		
		strHtml += "<option value=" 
				+ cnt 
				+ ">" + data[i].codeName
				+ "</option>";
		if(i!=data.length-1){
			if(data[i].get("groupCode")!=data[i-1].get("groupCode")){
				// ☆   
			}
		}
		
	}
	 		console.log(strHtml);
//	if($("select").attr("title").equlas(strId)){
//		$("select").attr("title").html(strHtml);
//	}
}

// DB에서 중복검사 수행
function checkId() {
	var memId = $("#memId").val();
	alert(memId);
	// 빈값 확인
	if (isEmpty(memId)) {
//		console.log(memId);
		alert("ID 값이 입력되지 않았습니댜");
		$("#memId").focus();
		return;
	}
	 // 		유효성 검사 - 영어소문자와 숫자로 구성, 3글자 이상 10글지 이하
	 		var regExp = /^[a-z0-9]{3,10}$/;
//	 		console.log(regExp);
	 		if (!regExp.test(memId)) {
	 			alert("ID값이 유효하지 않습니다");
	 			$("#memId").focus();
	 			return;
	 		}
	// DB에서 중복검사 수행
	
	$.ajax({
		url : "/JqueryPro/MemberServlet",
		type : "post",
		data : {
			'memId' : memId,
			'flag' : 'CHKID'
		},
		dataType : "json",
		success : function(data) {
//			console.log(data);
//			console.log(data.resultCnt);
			// 				console.log(typeof data.resultCnt); // String
			if (data.resultCnt == 0) {
				alert("사용가능!!");
			} else {
				alert("중복!!");
			}
		},
		error : function(xhr) {
			console.error(xhr);
		}
	});
}

function initCitySelect(){
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
//		,data : {
//			"groupCode" : "A01"
//		} 
	,dataType : "json",
	success : function(data) {
		console.log(data);
		makeSidoSelect(data);
		alert("성공");
	}
	,error : function(xhr) {
		console.error(xhr);
		alert("오류");
	}
	});
}

function makeSidoSelect(data){
	// 방법1)
	var strHtml = "<option value=''>선택하세요</option>";
	for (i = 0; i < data.length; i++) {
		strHtml += "<option value=" 
				+ data[i].value 
				+ ">" 
				+ data[i].sido
				+ "</option>";
	}
	console.log(strHtml);
	$("#Sido").html(strHtml);
	// 방법2)
	//setGugun();
	// 방법3)
	//트리거로 Change호출
}

function makeGugunSelect(data){
	if($("#Sido").val()!=''){
		$("#Gugun").prop("disabled", false);
	}
	var strHtml = "<option value=''>선택하세요</option>";
	for (i = 0; i < data.length; i++) {
		strHtml += "<option value=" 
				+ data[i].value 
				+ ">" 
				+ data[i].gugun
				+ "</option>";
	}
	console.log(strHtml);
	$("#Gugun").html(strHtml);

}

function makeDongSelect(data){
	if($("#Gugun").val()!=''){
		$("#Dong").prop("disabled", false);
	}
	var strHtml = "<option value=''>선택하세요</option>";
	for (i = 0; i < data.length; i++) {
		strHtml += "<option value=" 
				+ data[i].value 
				+ ">" 
				+ data[i].dong
				+ "</option>";
	}
	console.log(strHtml);
	$("#Dong").html(strHtml);
}
function makeZipSelect(data){
	var strHtml = "<option value=''>선택하세요</option>";
	for (i = 0; i < data.length; i++) {
		strHtml += "<option value=" 
				+ data[i].value 
				+ ">" 
				+ data[i].dong
				+ "</option>";
	}
	console.log(strHtml);
//	$("#Dong").html(strHtml);
}
function setGugun(){
	var param;
	param = {"sido" : $("#Sido").val()
			,"flag" : "GUGUN"
			};
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
	,dataType : "json"
	,success : function(data) {
		console.log(data);
		makeGugunSelect(data);
//		alert("성공");
	}
	,error : function(xhr) {
		console.error(xhr);
		alert("오류");
	}
	});
}

function setDong(){
	var param;
	param = {"sido" : $("#Sido").val()
			,"gugun" : $("#Gugun").val()
			,"flag" : "DONG"
			};
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
	,dataType : "json",
	success : function(data) {
		console.log(data);
		makeDongSelect(data);
//		alert("성공");
	}
	,error : function(xhr) {
		console.error(xhr);
		alert("오류");
	}
	});
}

function setZip(){
	var param;
	param = {"sido" : $("#Sido").val()
			,"gugun" : $("#Gugun").val()
			,"dong" : $("#Dong").val()
			,"flag" : "ZIP"
			};
	
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
	,dataType : "json",
	success : function(data) {
		console.log(data);
		makeZipSelect(data);
//		alert("성공");
	}
	,error : function(xhr) {
		console.error(xhr);
		alert("오류");
	}
	});
}