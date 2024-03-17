var SysMessageApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

	const proCd = 'PC0005';
	const proNm = 'sysMessage';
	const apiUrl = '/api/sys/message';

    // [El]프로그램 그리드
    var $HGrid = $("#sysMessageHGrid");


    return {
        init: function () {

        	fnEvents();

        	fnList();

        }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	$('#sysMessageSearchBtn').click(function(){
    		fnSearch();
    	});

    	$('#sysMessageMsgCd').keydown(function(e){
    		if(e.keyCode == 13){
    			fnSearch();
    		}
    	})

    	$('#sysMessageMsgTxt').keydown(function(e){
    		if(e.keyCode == 13){
    			fnSearch();
    		}
    	})

    	//행 추가
    	$('#sysMessageAddRowBtn').click(function(){
    		$HGrid.paragonGridAddRow();
    	});

    	//행 수정
    	$('#sysMessageSaveBtn').click(function(){
    		fnSave();
    	});

    	//엑셀 다운로드
    	$('#sysMessageExcelBtn').click(function(){
    		$HGrid.downloadExcel();
    	});
    }

    function fnSearch(){
    	var msgCd = $('#sysMessageMsgCd').val().trim().replace(/\s/g, " ") .split(' ');
    	var msgTxt = $('#sysMessageMsgTxt').val().trim().replace(/\s/g, " ") .split(' ');

    	var sendData = {};
    	sendData.length = 0;

    	for(var i = 0; i < msgCd.length; i++){
    		var strCd = "msgCd_"+i;
    		sendData[strCd] = msgCd[i];
    	}

    	for(var i = 0; i < msgTxt.length; i++){
    		var strTxt = "msgTxt_"+i;
    		sendData[strTxt] = msgTxt[i];
    	}

    	$HGrid.paragonGridSearch(sendData);
    }

    function fnSave(){
		 var data = {
		         msgCd : "MSG_CD",
		         ko    : "KO",
		         en    : "EN",
		         vi    : "VI"
		 }

    	var jsonData = $HGrid.getSelectedJsonData("dt_data", data);
    	var jsonObject = JSON.parse(jsonData);
    	var sendData = {
    			"dt_data" 		: jsonObject.dt_data,
    			"codeGroupCd"	: "SC0013",
    			"arr"			: ['ko', 'en', 'vi']
    	}

    	if(!jsonData){
    		Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
    		return false;
    	}
    	App.prcsStart();
        $.ajax({
            url 	 : apiUrl + '/saveMessage',
			data     : jsonData,
			dataType : 'json',
			type     : 'POST',
			cache    : false,
			contentType : 'application/json; charset=utf-8',
            success 	: function(result) {
				if(data == 200){
					alert("처리되었습니다.");
					fnList();
				}else{
					return false;
				}
            }
        });
    }

    //[Fn] grid 도메인관리 목록
    function fnList(){
        $HGrid.paragonGrid({
            url				: apiUrl + '/selectMessageList',
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
            height			: '596',
            rowNum			: 1000,
            colModel		: [
                {editable: true,	name:'MSG_CD',  align:"center", width:"200px"},
                {editable: true,	name:'KO',  	align:"center", width:"300px"},
                {editable: true,	name:'EN',  	align:"center", width:"300px"},
                {editable: true,	name:'VI',  	align:"center", width:"300px"}
            ],
            pager		: "#sysMessageGridNavi",
            domainId 	: "MESSAGE_LIST",
        });
    }



}();

$(document).ready(function() {
    SysMessageApp.init();
});
