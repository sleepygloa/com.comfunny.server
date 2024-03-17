function inRunScheduleJob(id) {
    var data = {
        "scheSeq"	: id,
        "useYn"		: "Y"
    }
    $.ajax({
        url 		: "/ctrl/settings/system/scheduler/start",
        data 		: JSON.stringify(data),
        contentType	: 'application/json; charset=utf-8',
        success 	: function(data) {
            if(data.stsCd == 100){
                alert(data.msgTxt);
                $('#sysSchedulerSearchBtn').trigger('click');
//    				$HGrid.trigger("reloadGrid");
            }else{
                alert(data.msgTxt);
                return false;
            }
//    			App.prcsEnd();
        }
    });
}
//[In] 스케줄러 중지
function inStopScheduleJob(id) {
    var data = {
        "scheSeq"	: id,
        "useYn"		: "N"
    }
    $.ajax({
        url 		: "/ctrl/settings/system/scheduler/stop",
        data 		: JSON.stringify(data),
        contentType	: 'application/json; charset=utf-8',
        success 	: function(data) {
            if(data.stsCd == 100){
                alert(data.msgTxt);
                $('#sysSchedulerSearchBtn').trigger('click');
//    				$HGrid.trigger("reloadGrid");
            }else{
                alert(data.msgTxt);
                return false;
            }
            App.prcsEnd();
        }
    });
}
var SysSchedulerApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

        // [El]프로그램 그리드
    var $HGrid = $("#sysSchedulerHGrid");
    const proCd = 'PC0005';
    const proNm = 'sysScheduler';
    const apiUrl = '/api/sys/scheduler';

    // [Data]그룹코드 유형 콤보박스 데이터
    let gridUseYn;

    return {
        init: function () {

            gridUseYn   = WMSUtil.fnCombo.grid('USE_YN');

            fnEvents();

            //스케줄관리 Grid생성
            fnListH();
            //스케줄관리 Event
        }
    };

    //[Fn] 이벤트
    function fnEvents(){


        //검색버튼
        $("#sysSchedulerSearchBtn").click(function(){
            //그리드 수정 여부 체크
            if(fnModCheck($HGrid)){
                fnHSearch();
            }
        });
        //행추가버튼
        $("#sysSchedulerAddRowBtn").click(function(){
            $HGrid.paragonGridAddRow();
        });
        //저장버튼
        $("#sysSchedulerSaveRowBtn").click(function(){
            fnSave();
        });
        //행삭제버튼
        $("#sysSchedulerDelRowBtn").click(function(){
            fnDel();
        });
        //엑셀버튼
        $("#sysSchedulerExcelBtn").click(function(){
            $HGrid.downloadExcel();
        });

    }

    /********************************************************************
     * 스케줄러 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0005
     * 작성자  : Kim Jin Ho
     * 수정내역:
     ********************************************************************/
    //[Fn] grid 스케줄러 목록
    function fnListH(){
        $HGrid.paragonGrid({
            url				: apiUrl + '/selectSchedulerList',
//			componentId: "CP0005",
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
            rowClickFocus	: true,
            height			: '596',
            colModel		: [
                {align:"center",editable: true, name:'SCHE_SEQ',width:100,hidden:true},
                {align:"center",editable: true, name:'SCHE_NM',width:100, required : true},//키는 아니지만, 필수입력
                {align:"left",editable: true, name:'SCHE_DESC'},
                {align:"left",editable: true, name:'SCHE_CLASS_PATH', width:"250px"},
                {align:"center",editable: true, name:'SCHE_SEC',width:"100px"},
                {align:"center",editable: true, name:'SCHE_MIN',width:"100px"},
                {align:"center",editable: true, name:'SCHE_HOUR',width:"100px"},
                {align:"center",editable: true, name:'SCHE_DAY',width:"100px"},
                {align:"center",editable: true, name:'SCHE_MONTH',width:"100px"},
                {align:"center",editable: true, name:'SCHE_YEAR',width:"100px"},
                //{align:"center",name:'USE_YN',width:50},
                {editable: true,name:'USE_YN',align:'center', width:"100px",
                    edittype:'select',formatter:'select',editoptions: {value: gridUseYn,},
                },
                {align:"center",name:'IN_USER_ID',width:100},
                {align:"center",name:'IN_DT', width:100},
                {align:"center",name:'EVENT',editable: false,width:140,
                    formatter:inMakeActionButtion}
            ],
            pager			: "#sysSchedulerHGridNavi",
//            caption			: "스케줄 목록",
            domainId		: 'SCHE_LIST'
        });


//		//[In] 스케줄러 실행/중지 버튼생성
//		function inMakeActionButtion(cellvalue, options, rowObject) {
//            var reLoadButton = '<button class="btn btn-danger btn-xs m-r-5 stop-btn" value="'+(rowObject.SCHE_SEQ)+'" >중지</button>'
//            var runButton = '<button class="btn btn-primary btn-xs run-btn" value="'+(rowObject.SCHE_SEQ)+'" >실행</button>'
//            return reLoadButton+runButton;
//		}
//		//스케줄러 중지버튼 Event
//		$HGrid.find('.stop-btn').off().live('click', function (e) {
//			alert($(this).val());
//			e.stopPropagation();
//            inStopScheduleJob($(this).val())
//         });
//		//스케줄러 실행버튼 Event
//        $HGrid.find('.run-btn').off().live('click', function (e) {
//        	e.stopPropagation();
//        	inRunScheduleJob($(this).val())
//        });

    }



    //[Fn] 스케줄러 검색
    function fnHSearch(){
        //그리드 수정 여부 체크
        var data = {
            // useYn 		: $("#schedulerUseYn").val(),
            schedulerNm : $("#sysSchedulerName").val()
        };
        $HGrid.paragonGridSearch(data);
    }

    //[In] 스케줄러 실행/중지 버튼생성
    function inMakeActionButtion(cellvalue, options, rowObject) {
//        var reLoadButton = '<button class="btn btn-danger btn-xs m-r-5 stop-btn" value="'+(rowObject.SCHE_SEQ)+'" )">중지</button>'
//        var runButton = '<button class="btn btn-primary btn-xs run-btn" value="'+(rowObject.SCHE_SEQ)+'" >실행</button>'
        var reLoadButton = '<button class="btn btn-danger btn-xs m-r-5 stop-btn" value="'+(rowObject.SCHE_SEQ)+'" onclick="inStopScheduleJob('+(rowObject.SCHE_SEQ)+')">STOP</button>'
        var runButton = '<button class="btn btn-primary btn-xs run-btn" value="'+(rowObject.SCHE_SEQ)+'" onclick="inRunScheduleJob('+(rowObject.SCHE_SEQ)+')">START</button>'
        return reLoadButton+runButton;
    }

//    //[In] 스케줄러 실행
//    function inRunScheduleJob(id) {
//    	alert('1')
//    	var data = {
//    			"scheSeq"	: id,
//    			"useYn"		: "Y"
//    	}
//    	$.ajax({
//    		url 		: "/ctrl/settings/system/scheduler/start",
//    		data 		: JSON.stringify(data),
//    		contentType	: 'application/json; charset=utf-8',
//    		success 	: function(data) {
//    			if(data.stsCd == 100){
//    				alert(data.msgTxt);
//    				$HGrid.trigger("reloadGrid");
//    			}else{
//    				alert(data.msgTxt);
//    				return false;
//    			}
//    		}
//    	});
//    }
//    //[In] 스케줄러 중지
//    function inStopScheduleJob(id) {
//    	alert('2')
//    	var data = {
//    			"scheSeq"	: id,
//    			"useYn"		: "N"
//    	}
//    	$.ajax({
//    		url 		: "/ctrl/settings/system/scheduler/stop",
//    		data 		: JSON.stringify(data),
//    		contentType	: 'application/json; charset=utf-8',
//    		success 	: function(data) {
//    			if(data.stsCd == 100){
//    				alert(data.msgTxt);
//    				$HGrid.trigger("reloadGrid");
//    			}else{
//    				alert(data.msgTxt);
//    				return false;
//    			}
//    		}
//    	});
//    }

    //[Fn] 그리드 수정 여부 체크
    function fnModCheck(){
        return $HGrid.paragonGridModConfirm(Util.confirm("MSG_COM_CFM_009").msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    //[Fn] 라디오 값 get/set
    function getRadioElValue(elem, oper, value) {
        if (oper === "set") {
            var radioButton = $(elem).find("input:radio[value='" + value + "']");
            if (radioButton.length > 0) {
                radioButton.prop("checked", true);
            }
        }
        if (oper === "get") {
            return $(elem).find("input:radio:checked").val();
        }
    }

    //[Fn] 수정된 내용저장
    function fnSave() {

        var saveUrl = apiUrl + '/saveScheduler';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
            modFlag		   : "MOD_FLAG" ,
            scheSeq        : "SCHE_SEQ",
            scheNm         : "SCHE_NM",
            scheDesc       : "SCHE_DESC",
            scheClass_path : "SCHE_CLASS_PATH",
            scheSec        : "SCHE_SEC",
            scheMin        : "SCHE_MIN",
            scheHour       : "SCHE_HOUR",
            scheDay        : "SCHE_DAY",
            scheMonth      : "SCHE_MONTH",
            scheYear       : "SCHE_YEAR",
            useYn          : "USE_YN"
        }

        var jsonData = $HGrid.getSelectedJsonDataChk("dt_data",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); // 선택된 행이 없습니다.
            return;
        }

        var ids = $HGrid.getGridParam("selarrrow");
        for(var i = 0 ; i < ids.length ; i++){
            var flag = 0;
            var rowData = $HGrid.getRowData(ids[i]);
            flag = rowData.MOD_FLAG;
            if(flag != "UPDATE" && flag != "INSERT"){
                alert("[ " + $HGrid.getRowData(ids[i]).SCHE_NM + " ] 스케줄러는 변경 된 값이 없습니다.");
                return false;
            }

            if(rowData.SCHE_SEQ   != "?"
                && rowData.SCHE_MIN   != "?"
                && rowData.SCHE_HOUR  != "?"
                && rowData.SCHE_DAY   != "?"
                && rowData.SCHE_MONTH != "?"
                && rowData.SCHE_YEAR  != "?"){
                alert('값중에 하나는 ? 가 있어야 합니다.');
                return false;
            }
        }

        if(!fnValidate()) return false;

        if(flag == "INSERT"){
            if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?
        }else if(flag == "UPDATE"){
            if (!confirm((Util.confirm('MSG_COM_CFM_002')).msgTxt)) return; //수정하시겠습니까?
        }

        return;
        App.prcsStart();
        $.ajax({
            url      : apiUrl + "/saveScheduler",
            data     : jsonData,
            dataType : 'json',
            type     : 'POST',
            cache    : false,
            contentType : 'application/json; charset=utf-8',
            success : function(data) {
                if(data == 200){
                    alert("처리되었습니다.");
                    fnListH();
                }else{
                    return false;
                }
            }
        });
        App.prcsEnd();
    }

    function fnValidate(){

        var ids = $HGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_sysSchedulerGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $HGrid.getRowData(ids[i]);

                if(rowdata.SCHE_NM.trim().length == 0 ){
                    Util.alert('MSG_SYS_ERR_009'); //스케줄 항목은 필수입력입니다.
                    return false;
                }
            }
        }
        return true;
    }

    //그리드 수정 여부 체크
    function fnModCheck(){
        return $HGrid.paragonGridModConfirm(Util.confirm("MSG_COM_CFM_009").msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    function fnDel(){
        var checkFlag = $HGrid.paragonGridCheckedDeleteData();
        console.log(checkFlag);
        if(checkFlag === false){
            if(!confirm(Util.confirm("MSG_COM_CFM_001").msgTxt)) return false; //삭제하시겠습니까?

            var rowData = {
                scheSeq:"SCHE_SEQ"
            }
            var chkData = $HGrid.getSelectedJsonData("dt_scheduler", rowData);

            App.prcsStart();
            $.ajax({
                url : "/ctrl/settings/system/scheduler/deleteScheduler",
                data :chkData,
                type : "POST",
                dataType : "json",
                contentType: 'application/json; charset=utf-8',
                cache: false,
                success : function(data) {
                    //App.prcsEnd();
                    if(data.stsCd == "999"){
                        alert(data.msgTxt);
                    }else{
                        alert(data.msgTxt);
                        $HGrid.paragonGridReload();
                    }
                }
            });
        }
    }



}();

$(document).ready(function() {
    SysSchedulerApp.init();
});
