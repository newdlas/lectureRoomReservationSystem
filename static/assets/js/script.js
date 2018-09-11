var ID="ID1234"
$(document).ready(function(){
	$.getJSON( "http://202.31.201.108/notice", function( data ) {
	    var items = [];
	    $.each( data, function( key, val ) {
	      var strArray = val.toString().split(',');
	      items.push( "<li><a href='#noticedetail' onclick='noticedetail(\""+val+"\")' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + strArray[3] + "</a></li>" );
	      //alert("key:" + key + " val : " + val);
	    });
	    
	    $( "<ul/>", {
	      "data-role": "listview",
	      "data-inset": "true",
	      "class": "item-box ul-listview ui-listview ui-listview-inset ui-corner-all ui-shadow",
          html: items.join( "" )
        }).appendTo( "#one div.inner #data" );
        
        $( "<ul/>", {
	      "data-role": "listview",
	      "data-inset": "true",
	      "class": "item-box ul-listview ui-listview ui-listview-inset ui-corner-all ui-shadow",
          html: items.join( "" )
        }).appendTo( "#notice" );
	});
	
	$.getJSON( "http://202.31.201.108/theDay", function( data ) {
	    var itemsMain = [];
	    var itemsToday = [];
	    $.each( data, function( key, val ) {
	      var strArray = val.toString().split(',');
	      itemsMain.push( "<li><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>[" + strArray[0] + "] "+ strArray[2] +" "+ strArray[4]+"~"+strArray[5]+"</a></li>" );
	      itemsToday.push(
	      	"<li>"  
					+ "<a href='#todayresvdetail' onclick='todayreservdetail(\""+val+"\");'>"
					+ "<span class='daily-resv-time'>" + strArray[7] + "</span> <span class='daily-resv-time'>[" + strArray[4] + "~" + strArray[5] + "]</span> "
					+ "<br />"
					+ "<span class='daily-resv-class'>" + strArray[2] + "</span>" 
					+ "<br />"
					+ "<span class='daily-resv-1'> 예약자: " + strArray[0] + "</span> <span class='daily-resv-2'> 연락처: " + strArray[1] + "</span>"
					+ "<span class='daily-resv-1' style='padding-right: 24px;'> 인원: " + strArray[6] + "명</span> <span class='daily-resv-2'> 사유: " + strArray[3] + "</span>"				
					+ "</a></li>"
			);
	      //alert("key:" + key + " val : " + val);
	    });
	    
	    $( "<ul/>", {
	      "class": "alt ui-listview ui-listview-inset ui-corner-all ui-shadow",
	      "data-role": "listview",
	      "data-inset": "true",
          html: itemsMain.join( "" )
        }).appendTo( "#two div.inner #todayhome" );
        
        $( "<ul/>", {
	      "class": "item-box-date",
	      "data-role": "listview",
	      "data-inset": "true",
          html: itemsToday.join( "" )
        }).appendTo( "#todayresv" );
	});
	
	$.getJSON( "http://202.31.201.108/lactureView", function( data ) {
	    var items = [];
	    $.each( data, function( key, val ) {
	      var strArray = val.toString().split(',');
	      items.push( 
	      	"<li>"
				+"<a href='#manageroomdetail' onclick='manageroomdetail(\""+val+"\")'>"
				+"<span class='daily-resv-time'>"+strArray[0]+"</span>"
				+"<span class='daily-resv-1'>정원: "+strArray[2]+"명</span>"
				+"</a>"
				+"<a href='#updatetimetable'>강의시간표 수정</a>"	
			+"</li>"
	      );
	    });
	    
	    $( "<ol/>", {
	      "data-role": "listview",
	      "data-inset": "true",
	      "data-filter": "true",
	      "class":"item-box",
          html: items.join( "" )
        }).appendTo( "#manageroom #buildingD" );
        
	});
	
	$.getJSON( "http://202.31.201.108/standBy", function( data ) {
	    var itemsMain = [];
	    var itemsWait = [];
	    //var itemsDetail = [];
	    $.each( data, function( key, val ) {
	      var strArray = val.toString().split(',');
	      itemsMain.push( "<li><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>[" + strArray[0] + "] "+ strArray[1] +" "+ strArray[4]+"~"+strArray[5]+"</a></li>" );
	      itemsWait.push(
	      	"<li>"  
					+ "<a href='#awaitingapprovaldetail' onclick='resvdetail(\""+val+"\");'>"
					+ "<span class='daily-resv-time'>" + strArray[3] + "</span> <span class='daily-resv-time'>[" + strArray[4] + "~" + strArray[5] + "]</span> "
					+ "<br />"
					+ "<span class='daily-resv-class'>" + strArray[1] + "</span>" 
					+ "<br />"
					+ "<span class='daily-resv-1'> 예약자: " + strArray[0] + "</span> "
					+ "<span class='daily-resv-1' style='padding-right: 24px;'> 인원: " + strArray[6] + "명</span> <span class='daily-resv-2'> 사유: " + strArray[7] + "</span>"				
					+ "</a></li>"
			);
	    
	    });
	    
	    
	    
	    $( "<ul/>", {
	      "class": "alt ui-listview ui-listview-inset ui-corner-all ui-shadow",
	      "data-role": "listview",
	      "data-inset": "true",
          html: itemsMain.join( "" )
        }).appendTo( "#two div.inner article.alt #listhome" );
        
        $( "<ul/>", {
	      "class": "item-box",
	      "data-role": "listview",
	      "data-inset": "true",
          html: itemsWait.join( "" )
        }).appendTo( "#awaitingapproval" );
        
	});
	
	$.getJSON( "http://202.31.201.108/digital_time", function( data ) {
	    var items = [];
	    $.each( data, function( key, val ) {
	      var strArray = val.toString().split(',');
	      items.push( 
	      	"<tr>"
			+"<td>" + strArray[0] + "</td>"
			+"<td>" + strArray[1] + "</td>"
			+"<td>" + strArray[2] + "명</td>"
			+"<td><a href='#updatetimetable' class='button alt'>수정</a></td>"
			+"</tr>"
	      );
	    });
	    
	    $( "<tbody/>", {
          html: items.join( "" )
        }).appendTo( "#timetablelist table" );
        
	});
	
	
	
});

function resvdetail(val){
	//alert(val);
	var strArray = val.toString().split(',');
	$('#awaitingapprovaldetail section').remove();
	$('<section>'
			+'<h4 class="bul-header-margin">　 - 송지성 님의 예약 신청</h4>	'
			+'<form id="detailinfo" method="post" action="#">'
			+'	<div>'
			+'		<ul data-role="listview" data-inset="true" class="item-box">'
			+'			<li class="ui-field-contain">'
			+'				<label>이름</label> <input value="송지성" />'
			+'				<label>학번</label> <input value='+strArray[0]+' readonly/>'
			+'				<label>사용장소</label> <input value='+strArray[1]+' readonly/>'
			+'				<label>사용날짜</label> <input value='+strArray[3]+' readonly/>'
			+'				<label>사용시간</label> <input value='+strArray[4]+'~'+strArray[5]+' readonly/>'
			+'				<label>사용인원</label> <input value='+strArray[6]+' readonly/>'
			+'				<label>주관단체</label> <input value='+strArray[2]+' readonly/>'
			+'				<label>연락처</label> <input value="010-9187-2126" readonly/>'
			+'				<label>행사설명</label> <textarea name="descript" rows="5" readonly>'+strArray[7]+'</textarea>'
			+'			</li>'
			+'		</ul>'
					
			+'		<ul class="actions btn-center">'
			+'			<li><a href="#approveresv" onclick="permission(\''+val+'\');" class="button special" data-rel="dialog">승 인</a></li>'
			+'			<li><a href="#rejectresv" onclick="reject(\''+val+'\');" class="button" data-rel="dialog">승인거절</a></li>'
			+'		</ul>	'
								
			+'	</div>'
			+'</form>'
		+'</section>'
	).appendTo('#awaitingapprovaldetail');

	return false;
}

function todayreservdetail(val){
	var strArray = val.toString().split(',');
	$('#awaitingapprovaldetail section').remove();
	$('<section>'
			+'<h4 class="bul-header-margin">　 - 송지성 님의 예약 신청</h4>	'
			+'<form id="detailinfo" method="post" action="#">'
			+'	<div>'
			+'		<ul data-role="listview" data-inset="true" class="item-box">'
			+'			<li class="ui-field-contain">'
			+'				<label>이름</label> <input value='+strArray[0]+' />'
			+'				<label>사용장소</label> <input value='+strArray[2]+' readonly/>'
			+'				<label>사용날짜</label> <input value='+strArray[7]+' readonly/>'
			+'				<label>사용시간</label> <input value='+strArray[4]+'~'+strArray[5]+' readonly/>'
			+'				<label>사용인원</label> <input value='+strArray[6]+' readonly/>'
			+'				<label>연락처</label> <input value="010-9187-2126" readonly/>'
			+'			</li>'
			+'		</ul>'
					
			+'		<ul class="actions btn-center">'
			+'			<li><a href="#todayresv" class="button special" data-rel="dialog">확인</a></li>'
			+'		</ul>	'
								
			+'	</div>'
			+'</form>'
		+'</section>'
	).appendTo('#todayresvdetail');
}

function permission(val){
	var strArray = val.toString().split(',');
	var sendData = { 
            "학번": strArray[0].toString(),
	        "시작시간": strArray[4].toString(),
	        "종료시간": strArray[5].toString(),
	        "강의실": strArray[1].toString()
    };
    $.ajax({
        url: "http://202.31.201.108/permission",
        type: "POST",
        ContentType : "application/json; charset=utf-8",
        data : JSON.stringify(sendData),
    });
}

function reject(val){
	var strArray = val.toString().split(',');
	var sendData = { 
            "학번": strArray[0].toString(),
	        "시작시간": strArray[4].toString(),
	        "종료시간": strArray[5].toString(),
	        "강의실": strArray[1].toString()
    };
    $.ajax({
        url: "http://202.31.201.108/refuse",
        type: "POST",
        ContentType : "application/json; charset=utf-8",
        data : JSON.stringify(sendData),
    });
}

function noticedetail(val){
	var strArray = val.toString().split(',');
	$('#noticedetail form').remove();
	$('<form method="post" action="#">'
		+'<div class="field half first">'
			+'<label for="name">작성자</label>'
			+'<input type="text" name="name" id="name" value="'+strArray[2]+'" readonly/>'
		+'</div>'
		+'<div class="field half">'
			+'<label for="date">작성일</label>'
			+'<input type="text" name="date" id="date" value="'+strArray[5]+'" readonly/>'
		+'</div>'
		+'<div class="field">'
			+'<label for="title">제목</label>'
			+'<input name="title" id="title" value="'+strArray[3]+'" readonly />'
		+'</div>'
		+'<div class="field">'
			+'<label for="content">Message</label>'
			+'<textarea name="content" id="content" rows="6" readonly> '+strArray[4]+' </textarea>'
				+'</div>'
				+'<ul class="actions btn-center">'
			+'<li><a href="#notice" class="button special">확 인</a></li>'
		+'</ul>	'
	+'</form>').appendTo('#noticedetail');
}

function applynotice(){
	var sendData = { 
		"계정": ID,
        "작성자": $("#writer").val().toString(),
        "제목": $("#title").val().toString(),
        "내용": $("#content").val().toString()
     };
     $.ajax({
        url: "http://202.31.201.108/noticeAdd",
        type: "POST",
        ContentType : "application/json; charset=utf-8",
        data : JSON.stringify(sendData),
     });
}

function manageroomdetail(val){
	var strArray = val.toString().split(',');
	$('#manageroomdetail section').remove();
	$('<section>'
		+'<h4 class="bul-header-margin">　 - 강의실 관리</h4>	'
		+'<form method="post" action="#">'
		+'	<div>						'
		+'		<ul data-role="listview" data-inset="true" class="item-box">'
		+'			<li class="ui-field-contain">'
		+'				<label>건물</label> <input value="디지털관" readonly/>'
		+'				<label>호실</label> <input style="text-transform: uppercase;" value="'+strArray[0]+'" readonly/>'
		+'				<label>위치</label> <input value="'+strArray[1]+'"readonly/>'
		+'				<label>정원</label> <input value="'+strArray[2]+'명"readonly/>'
		+'				<label>기자재</label> <input value="전자교탁 : '+strArray[3]+' 프로젝터 : '+strArray[4]+' 음향 : '+strArray[5]+' 학생용PC : '+strArray[6]+'"readonly/>		'		
		+'				<label>좌석형태</label> <input value="'+strArray[7]+'석"readonly/>'
		+'				<label>강의시간표</label> <a href="#updatetimetable" style="width: 180px">강의시간표 관리</a>'
		+'			</li>'
		+'		</ul>						'
		+'		<ul class="actions btn-center">'
		+'			<li><a href="#updateroom" type="submit" class="button special">수 정</a></li>'
		+'			<li><a href="#deleteroom" type="submit" class="button" data-rel="dialog">삭 제</a></li>'
		+'			<li><a href="#manageroom" class="button alt">돌아가기</a></li>'
		+'		</ul>									'
		+'	</div>'
		+'</form>'
	+'</section>'	
	).appendTo("#manageroomdetail");
}

function submitroom(){
	var proPC = "";
	var projector = "";
	var sound = "";
	var studPC = "";
	var type = "";
	if ($('#proPC').is(":checked")) {
	  	proPC="y";
	}
	else{
		proPC="n";
	}
	
	if ($('#projector').is(":checked")) {
	  	projector="y";
	}
	else{
		projector="n";
	}
	
	if ($('#sound').is(":checked")) {
	  	sound="y";
	}
	else{
		sound="n";
	}
	
	if ($('#studPC').is(":checked")) {
	  	studPC="y";
	}
	else{
		studPC="n";
	}
	
	if ($('#pc').is(":checked")) {
	  	type="일반";
	}
	if ($('#normal').is(":checked")) {
	  	type="계단";
	}
	
	var sendData = { 
    	"호실": $('#lacturenumber').val().toString(),
    	"이름": $('#lacturename').val().toString(),
    	"위치": $('#lactureposition').val().toString(),
    	"정원": $('#lacturelimit').val().toString(),
    	"전자교탁" : proPC,
    	"프로젝터" : projector,
    	"음향시설" : sound,
    	"학생용컴퓨터" : studPC,
    	"형식" : type
  	};
   $.ajax({
        url: "http://202.31.201.108/classroomAdd",
        type: "POST",
        ContentType : "application/json; charset=utf-8",
        data : JSON.stringify(sendData),
    });
}
