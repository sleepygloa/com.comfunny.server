var SysUserClientApp = function () {
	'use strict';

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PC0005';
	const proNm = 'sysUserClient';
    const apiUrl = '/api/sys/userClient';

	// [El]그룹코드 그리드
    const $HGrid = $('#sysUserClientHGrid');
    let gridUser;
    let gridClient;
    let gridUseYn;

    return {
        init: function () {

            gridUseYn   = WMSUtil.fnCombo.grid('USE_YN');

            fnEvents();

        	fnListH();

	    }

    };

    //이벤트
    function fnEvents(){

    	//엔터이벤트
    	$('#sysUserClientUserId').keydown(function(e){
    		if(e.keyCode == 9 || e.keyCode == 13){
    			fnHSearch();
    		}
    	})

    	//그룹코드
        $('#sysUserClientHSearchBtn').click(function(){
            // if(fnModCheck())
                fnHSearch();
        });
        $('#sysUserClientHAddBtn').click(function(){
            fnHAdd();
        });
        $('#sysUserClientHSaveBtn').click(function(){
            fnHSave();
        });
        $('#sysUserClientHDelBtn').click(function(){
            fnHDel();
        });

        //조회
        fnSearchUser();

        fnSearchClient();
    }

    //사용자 조회
    function fnSearchUser(){
        App.prcsStart();
        $.ajax({
            url : apiUrl + "/selectUserList",
            contentType: "application/json; charset=UTF-8",
            type : "POST",
            dataType : "json",
            async : false,
            cache : false,
            success : function(result) {
                gridUser = Util.MakeGridOptions(result);
            }
        });
        App.prcsEnd();

    }

    //고객사 조회
    function fnSearchClient(){
        App.prcsStart();
        $.ajax({
            url : apiUrl + "/selectClientList",
            contentType: "application/json; charset=UTF-8",
            type : "POST",
            dataType : "json",
            async : false,
            cache : false,
            success : function(result) {
                gridClient = Util.MakeGridOptions(result);
            }
        });
        App.prcsEnd();
    }

    //헤더 그리드 초기화
    function fnListH() {
		$HGrid.paragonGrid({
			url          : apiUrl + '/selectUserClientList',
			height       : '596',
//			rowNum       : 15,
			rowEditable  : true,
			sortable     : true,
            cellEditable : false,
            multiselect  : true,
			colModel     : [
                {editable: false, name:'BIZ_CD', 	    align:'center'},
                {editable: true, name:'USER_ID',       align:'center',
                    edittype:'select', formatter:'select', editoptions: { value:gridUser, }
                },
                {editable: true, name:'CLIENT_CD',         align:'center',
                    edittype:'select', formatter:'select', editoptions: { value:gridClient, }
                },
                {editable: true, name:'ORDR',          align:'center'},
                {editable: true, name:'RMRK',          align:'center'},
                {editable: true,  name:'USE_YN',        align:'center',
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn, }
                },
                {editable: false, name:'IN_USER_ID',	align:'center'},
                {editable: false, name:'IN_DT',	        align:'center'},
	          ],
			// caption  : '공통코드 그룹 목록',
	        domainId	: "USER_LIST",
			pager    : '#sysUserClientHGridNavi',
			//로우 선택식 호출함수 [연속 호출 안함]
			onSelectRowEvent : function(currRowData, prevRowData) {
			}
		});
    }

    //[Fn] 그룹코드 검색 조건 조회
    function fnHSearch(){
        var data = {
            userId   : $('#sysUserClientUserId').val(),
        };
        //그리드 조회
        $HGrid.paragonGridSearch(data);
    }



    function fnHAdd(){
        $HGrid.paragonGridAddRow({
            addData : {
                "BIZ_CD" 	: CoreSession.s_bizCd
            }
        });
    }

    //[Fn]그룹코드 수정된 내용저장
    //[Fn] Grid Save Data Row. (제품관리 flag: 1 )
    function fnHSave() {
        //저장버튼 이벤트 로직 수행.
        var saveUrl = apiUrl + '/saveUserClient';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
            modFlag     : 'MOD_FLAG',
            bizCd       : 'BIZ_CD',
            userId      : 'USER_ID',
            clientCd        : 'CLIENT_CD',

            ordr        : 'ORDR',
            rmrk        : 'RMRK',
            useYn       : 'USE_YN',
        };

        var jsonData = $HGrid.getSelectedJsonDataChk('dt_data', rowData, $HGrid);

        //null Check
        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); // 선택된 행이 없습니다.
            return;
        }

        //Require Check
        var ids = $HGrid.getGridParam('selarrrow');
        for(var idx in ids){
            var rowFlag = $HGrid.getRowData(idx).MOD_FLAG;
            var userId = $HGrid.getRowData(idx).USER_ID;
            var clientCd = $HGrid.getRowData(idx).CLIENT_CD;
            var ordr = $HGrid.getRowData(idx).ORDR;
            if(rowFlag != 'UPDATE' && rowFlag != 'INSERT') continue;
            // Util.alert('MSG_COM_VAL_058', codeGrpCd);

            if(!userId){//사용자ID 검사
                Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
                return false;
            }
            if(!clientCd){//고객사 검사
                Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
                return false;
            }
            if(!ordr){//순번 검사
                Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
                return false;
            }
        }

        //ajax Event.
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            // $HGrid.paragonGridReload();
            fnHSearch();
        })
    }


    //[Fn]그룹코드 삭제
    //[Fn] Grid Delete Data Row. (제품관리 flag: 1 )
    function fnHDel() {

        var addFlag = $HGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = apiUrl + '/deleteUserClient';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var rowData = {
                modFlag: 'MOD_FLAG',
                bizCd   : 'BIZ_CD',
                userId  : 'USER_ID',
                clientCd    : 'CLIENT_CD'
            };

            //1. 체크된 리스트.
            var jsonData = $HGrid.getJsonData('dt_data', rowData);
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
                // $HGrid.paragonGridReload();
                fnHSearch();
            })
        }
    }
    //[Fn] 코드명 가져오기 자동완성
    //[Fn 공통] 그리드 수정 여부 체크
    function fnModCheck(grid){
        return grid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

}();

$(document).ready(function() {
	SysUserClientApp.init();
});
