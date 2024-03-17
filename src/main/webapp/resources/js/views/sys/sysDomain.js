var SysDomainApp = function () {
	'use strict';

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PC0005';
	const proNm = 'sysDomain';
    const apiUrl = '/api/sys/domain';

	// [El]그룹코드 그리드
    const $HGrid = $('#sysDomainHGrid');

	// [Data]그룹코드 유형 콤보박스 데이터
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
    	$('#sysDomainDomainId').keydown(function(e){
    		if(e.keyCode == 9 || e.keyCode == 13){
    			fnHSearch();
    		}
    	})

    	//그룹코드
        $('#sysDomainHSearchBtn').click(function(){
            //그리드 수정 여부 체크
            if(fnModCheck($HGrid)){
                fnHSearch();
            }
        });
        $('#sysDomainHAddBtn').click(function(){
            fnHAdd();
        });
    	$('#sysDomainHSaveBtn').click(function(){
    		fnHSave();
    	});
    	$('#sysDomainHDelBtn').click(function(){
    	    fnHDel();
    	});
    }

    //헤더 그리드 초기화
    function fnListH() {
		$HGrid.paragonGrid({
			url          : apiUrl + '/selectDomainList',
			height       : '596',
//			rowNum       : 15,
			rowEditable  : true,
			sortable     : true,
            cellEditable : false,
            multiselect  : true,
			colModel     : [
    		          {editable: true, name:'DOMAIN_ID', 	align:'center', required:true, disabled:true},
    		          {editable: true, name:'KO_NM', 	    align:'left'},
    		          {editable: true, name:'EN_NM',	    align:'left'},
    		          {editable: true, name:'VI_NM',	    align:'left'},
	          ],
			// caption  : '공통코드 그룹 목록',
	        domainId	: "DOMAIN_LIST",
			pager    : '#sysDomainHGridNavi',
			//로우 선택식 호출함수 [연속 호출 안함]
			onSelectRowEvent : function(currRowData, prevRowData) {
			}
		});
    }

    //[Fn] 그룹코드 검색 조건 조회
    function fnHSearch(){

        var data = {
            domainId   : $('#sysDomainDomainId').val(),
        };
        //그리드 조회
        $HGrid.paragonGridSearch(data);
    }


    function fnHAdd(){
        $HGrid.paragonGridAddRow();
    }

    //[Fn]그룹코드 수정된 내용저장
    //[Fn] Grid Save Data Row. (제품관리 flag: 1 )
    function fnHSave() {
        //저장버튼 이벤트 로직 수행.
        var saveUrl = apiUrl + '/saveDomain';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
                modFlag     : 'MOD_FLAG',
                domainId    : 'DOMAIN_ID',
                koNm        : 'KO_NM',
                enNm        : 'EN_NM',
                viNm        : 'VI_NM',
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
            var domainId = $HGrid.getRowData(idx).DOMAIN_ID;
            if(rowFlag != 'UPDATE' && rowFlag != 'INSERT') continue;
                // Util.alert('MSG_COM_VAL_058', codeGrpCd);

            if(!domainId){//그룹코드 검사
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
            var saveUrl = apiUrl + '/deleteDomain';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var rowData = {
                modFlag: 'MOD_FLAG',
                domainId: 'DOMAIN_ID'
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
	SysDomainApp.init();
});
