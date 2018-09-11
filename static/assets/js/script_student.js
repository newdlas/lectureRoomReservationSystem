var myNumber = "20000001";
$(document).ready(function(){
	var fullDate = new Date();
	var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
	var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + fullDate.getDate();
	$('#todayvalue').val(currentDate);
	
	
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
        }).appendTo( "#one div.inner #datastu" );
        
        $( "<ul/>", {
	      "data-role": "listview",
	      "data-inset": "true",
	      "class": "item-box ul-listview ui-listview-inset ui-corner-all ui-shadow",
          html: items.join( "" )
        }).appendTo( "#noticestu" );
	});
	
	var sendUserId={
		"학번": myNumber,
		"dummy": "123123"
	};
	$.ajax({
        url: "http://202.31.201.108/getMyNumber",
        type: "POST",
        ContentType : "application/json; charset=utf-8",
        data : JSON.stringify(sendUserId),
        dataType : "json"
        
    });
	
    $.getJSON( "http://202.31.201.108/myReservation", function( data ) {
	    var items = [];
	    $.each( data, function( key, val ) {
		    var strArray = val.toString().split(',');
		    items.push('<li>'
				+'<a href="#myresvdetail" onclick="myresvdetail(\''+val+'\');">'
				+'<span class="daily-resv-time">'+strArray[0]+'</span> <span class="daily-resv-time">['+strArray[1]+'~'+strArray[2]+']</span> '
				+'<br />'
				+'<span class="daily-resv-class">'+strArray[6]+'</span> '
				+'<br />'
				+'<span class="daily-resv-1"> 예약자: 송지성</span> <span class="daily-resv-2"> 연락처: 010-9187-2126</span>'
				+'<span class="daily-resv-1" style="padding-right: 24px;"> 인원: '+strArray[3]+'명</span> <span class="daily-resv-2"> 사유: '+strArray[4]+'</span>	'
				+'<span class="ui-li-count condition" >'+strArray[5]+'</span>'			
				+'</a>'						
			+'</li>');
	    });
	    
	    $( "<ul/>", {
	      "data-role": "listview",
	      "data-inset": "true",
	      "class": "item-box-s ui-listview ui-listview-inset ui-corner-all ui-shadow",
          html: items.join( "" )
        }).appendTo( "#myresv" );
        
	});
    
    /**/
	
	
	
	
	
});

function requestReservation(){
   var sendData = { 
        "강의실": $('#classroom').val().toString(),
        "인원": $('#usingnum').val().toString(),
        "날짜": $('#todayvalue').val().toString(),
        "시작시간": $('#starttime').val().toString(),
        "종료시간": $('#finishtime').val().toString(),
        "목적": "스터디",
        "단체": $('#usingteam').val().toString(),
        "학번": $('#usernumber').val().toString(),
        "설명": $('#explainfield').val().toString()
   };
   $.ajax({
        url: "http://202.31.201.108/reservationAdd",
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

function myresvdetail(val){
	var strArray = val.toString().split(',');
	$('#myresvdetail section').remove();
	$('<section>'
			+'<h4 class="bul-header-margin">　 - 송지성 님의 예약 신청</h4>	'
			+'<form id="detailinfo" method="post" action="#">'
			+'	<div>'
			+'		<ul data-role="listview" data-inset="true" class="item-box">'
			+'			<li class="ui-field-contain">'
			+'				<label>이름</label> <input value="송지성" />'
			+'				<label>학번</label> <input value="'+myNumber+'" />'
			+'				<label>사용장소</label> <input value='+strArray[6]+' readonly/>'
			+'				<label>사용날짜</label> <input value='+strArray[0]+' readonly/>'
			+'				<label>사용시간</label> <input value='+strArray[1]+'~'+strArray[2]+' readonly/>'
			+'				<label>사용인원</label> <input value="'+strArray[3]+'명" readonly/>'
			+'				<label>행사설명</label> <input value='+strArray[4]+' readonly/>'
			+'				<label>승인여부</label> <input value='+strArray[5]+' readonly/>'
			+'			</li>'
			+'		</ul>'
					
			+'		<ul class="actions btn-center">'
			+'			<li><a href="#myresv" class="button special" data-rel="dialog">확인</a></li>'
			+'		</ul>	'
								
			+'	</div>'
			+'</form>'
		+'</section>'
	).appendTo('#myresvdetail');
}
