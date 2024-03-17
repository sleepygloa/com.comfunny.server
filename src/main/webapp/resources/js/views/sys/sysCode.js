var SysCodeApp = function () {
	'use strict';

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    const proCd = 'PC0003';
	const proNm = 'sysCode';
    const apiUrl = '/api/sys/code';

	// [El]그룹코드 그리드
    const $HGrid = $('#sysCodeHGrid');
    const $DGrid = $('#sysCodeDGrid');

	// [Data]그룹코드 유형 콤보박스 데이터
	let gridcodeGrp;
    let gridYn;
    let gridUseYn;

    return {
        init: function () {

            gridcodeGrp = WMSUtil.fnCombo.grid_selectBox('sysCodeHType', 'SC0001');
            gridYn      = WMSUtil.fnCombo.grid('YN');
            gridUseYn   = WMSUtil.fnCombo.grid('USE_YN');
            WMSUtil.fnCombo.selectBox('sysCodeUseYn', 'USE_YN');

            fnEvents();

        	fnListH();

            fnListD();
	    }

    };

    //이벤트
    function fnEvents(){

    	//엔터이벤트
    	$('#sysCodecodeGrpCd').keydown(function(e){
    		if(e.keyCode == 9 || e.keyCode == 13){
    			fnHSearch();
    		}
    	})

    	//그룹코드
        $('#sysCodeHSearchBtn').click(function(){
            //그리드 수정 여부 체크
            if(fnModCheck($HGrid)){
                fnHSearch();
            }
        });
        $('#sysCodeHAddBtn').click(function(){
            fnHAdd();
        });
    	$('#sysCodeHSaveBtn').click(function(){
    		fnHSave();
    	});
    	$('#sysCodeHDelBtn').click(function(){
    	    fnHDel();
    	});
        //코드
        $('#sysCodeDAddBtn').click(function(){
            fnDAdd();
        });
    	$('#sysCodeDSaveBtn').click(function(){
    		fnDSave();
    	});
    	$('#sysCodeDDelBtn').click(function(){
    	    fnDDel();
    	});
    }

    //헤더 그리드 초기화
    function fnListH() {
		$HGrid.paragonGrid({
			url          : apiUrl + '/selectCodeGrpList',
			height       : '208',
//			rowNum       : 15,
			rowEditable  : true,
			sortable     : true,
            cellEditable : false,
            multiselect  : true,
			colModel     : [
    		          {editable: true, name:'CODE_GRP_CD', 	align:'center', required:true, disabled:true},
    		          {editable: true, name:'CODE_GRP_NM', 	align:'center'},
    		          {editable: true, name:'CODE_GRP_DESC',	width:300},
    		          {editable: true, name:'CODE_GRP_TP',	align:'center',
    		        	  edittype:'select', formatter:'select', editoptions: { value:gridcodeGrp, }
    		          },
    		          {editable: true, name:'SYS_YN', align:'center',
    		        	  edittype:'select', formatter:'select', editoptions: { value: gridYn, }
    		          },
    		          {editable: true, name:'USE_YN', align:'center',
    		        	  edittype:'select', formatter:'select', editoptions: { value: gridUseYn, }
    		          },
    		          {editable:false, name:'IN_USER_ID', 		align:'center'},
    		          {editable:false, name:'IN_DT', 			align:'center',sortable:false}
	          ],
			// caption  : '공통코드 그룹 목록',
	        domainId	: "COMM_CODE_GRP_LIST",
			pager    : '#sysCodeHGridNavi',
			//로우 선택식 호출함수 [연속 호출 안함]
			onSelectRowEvent : function(currRowData, prevRowData) {
				//로우선택시 공통코드 목록 조회
				var codeGrpCd = currRowData.CODE_GRP_CD
				if(codeGrpCd != ''){
	                $DGrid.paragonGridSearch(JSON.stringify({ 'codeGrpCd' : codeGrpCd }));
				}else{
				    $DGrid.paragonGridReload();
				}
			}
		});
    }

    //공통코드 그리드 초기화
    function fnListD(){
		$DGrid.paragonGrid({
        	url            : apiUrl + '/selectCodeList',
			rowEditable    : true,
			height         : '208',
            multiselect    : true,
            firstData      : false,
            rowspan : true,
            colModel       : [
                {editable:false, name:'CODE_GRP_CD', 	align:'center', rowspan:true},
                {editable: true, name:'CODE_CD', 		align:'center', required : true},
                {editable: true, name:'CODE_NM', 		align:'center'},
                {editable: true, name:'CODE_DESC', 		align:'left'},
                {editable: true, name:'CODE_ORDER', 	    align:'center',width:100},
                {editable: true, name:'CODE_OTHER1', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER2', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER3', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER4', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER5', 	align:'center',width:100},
                {editable: true, name:'USE_YN', 		align:'center', width:'100px', fixed :true,
                	edittype:'select', formatter:'select', editoptions: { value: gridUseYn, }
        		},
                {editable:false, name:'IN_USER_ID', 	align:'center'},
                {editable:false, name:'IN_DT', 			align:'center',sortable:false}
            ],
//            caption : '공통코드 목록',
            domainId	: "COMM_CODE_LIST",
            pager   : '#sysCodeGridNavi',
        });
	}



    //[Fn] 그룹코드 검색 조건 조회
    function fnHSearch(){

        var data = {
            codeGrpCd   : $('#sysCodeHCd').val(),
            codeGrpType   : $('#sysCodeHType').val(),
            codeGrpNm     : $('#sysCodeHNm').val(),
            useYn           : $('#sysCodeHUseYn option:selected').val()
        };
        //그리드 조회
        $HGrid.paragonGridSearch(data);
    }


    //[Fn] 그룹코드 검색 조건 조회
    function fnDSearch(){

        var rowData = {
            codeGrpCd : 'CODE_GRP_CD',
        };

        //1. 체크된 리스트.
        var jsonData = $HGrid.getSelectedData(rowData);
        $DGrid.paragonGridSearch(JSON.stringify({ 'codeGrpCd' : jsonData[0].codeGrpCd }));
    }

    function fnHAdd(){
        $HGrid.paragonGridAddRow();
    }

    //[Fn]그룹코드 수정된 내용저장
    //[Fn] Grid Save Data Row. (제품관리 flag: 1 )
    function fnHSave() {
        //저장버튼 이벤트 로직 수행.
        var saveUrl = apiUrl + '/saveCodeGrp';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
                modFlag       : 'MOD_FLAG',
                codeGrpCd     : 'CODE_GRP_CD',
                codeGrpNm     : 'CODE_GRP_NM',
                codeGrpDesc   : 'CODE_GRP_DESC',
                codeGrpType   : 'CODE_GRP_TP',
                sysYn         : 'SYS_YN',
                useYn         : 'USE_YN'
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
            var codeGrpCd = $HGrid.getRowData(idx).CODE_GRP_CD;
            if(rowFlag != 'UPDATE' && rowFlag != 'INSERT') continue;
                // Util.alert('MSG_COM_VAL_058', codeGrpCd);

            if(!codeGrpCd){//그룹코드 검사
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
            var saveUrl = apiUrl + '/deleteCodeGrp';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var rowData = {
                modFlag: 'MOD_FLAG',
                codeGrpCd: 'CODE_GRP_CD'
            };

            //1. 체크된 리스트.
            var jsonData = $HGrid.getJsonData('dt_data', rowData);
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
                // $HGrid.paragonGridReload();
                fnHSearch();
            })
        }
    }

    //[Fn] 공통코드 행추가
    function fnDAdd() {
        var rowid= $HGrid.jqGrid('getGridParam','selrow');
        //그룹코드 선택행 데이터
        var lastRowData = $HGrid.getRowData( rowid );
        //그룹코드 선택행 데이터 CODE_GRP_CD
        var codeGrpCd = lastRowData.CODE_GRP_CD;
        var modFlag = lastRowData.MOD_FLAG;

        //행추가시 기본값세팅 addData,  행추가 하기전 실행 함수 :startCallBack
        $DGrid.paragonGridAddRow({
            addData : {'CODE_GRP_CD':codeGrpCd},
            startCallBack : function(){

                if(rowid === null){
                    Util.alert('MSG_SYS_VAL_001'); //코드그룹을 선택해주세요.
                    return false;
                }else if(codeGrpCd == '' || modFlag == 'INSERT'){
                    Util.alert('MSG_SYS_VAL_002'); //코드 그룹을 저장해주세요.
                    return false;
                }
                return true;
            }
        });

    }
    //[Fn] 공통코드 수정된 내용저장
    //[Fn] Grid Save Data Row. (제품관리 flag: 3 )
    function fnDSave() {

        //저장버튼 이벤트 로직 수행.
        var saveUrl = apiUrl + '/saveCode';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
                modFlag      : 'MOD_FLAG',
                codeGrpCd    : 'CODE_GRP_CD',
                codeCd       : 'CODE_CD',
                codeNm       : 'CODE_NM',
                codeDesc     : 'CODE_DESC',
                codeOrder     : 'CODE_ORDER',
                codeOther1   : 'CODE_OTHER1',
                codeOther2   : 'CODE_OTHER2',
                codeOther3   : 'CODE_OTHER3',
                codeOther4   : 'CODE_OTHER4',
                codeOther5   : 'CODE_OTHER5',
                useYn        : 'USE_YN'
        };

        var jsonData = $DGrid.getSelectedJsonDataChk('dt_data', rowData, $DGrid);

        //null Check
        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        //Require Check
        var ids = $DGrid.getGridParam('selarrrow');
        for(var i = 0; i < ids.length; i++){
            var idx = ids[i];
            var rowFlag = $DGrid.getRowData(idx).MOD_FLAG;
            var codeCd = $DGrid.getRowData(idx).CODE_CD;
            var codeOrder = $DGrid.getRowData(idx).CODE_ORDER;

            if(!codeCd){//그룹코드 검사
                Util.alert('MSG_SYS_ERR_003'); //공통코드 항목은 필수입력입니다.
                return false;
            }

            //공통코드순번 숫자만 입력
            if(!WMSUtil.validation.reg_num(codeOrder)) {
                Util.alert('MSG_COM_VAL_038'); //숫자만 입력하실 수 있습니다.
                return false;
            }

        }

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            // $DGrid.paragonGridReload();
            fnDSearch();
    	})
    }


    //[Fn]코드 삭제
    //[Fn] Grid Delete Data Row. (제품관리 flag: 3 )
    function fnDDel() {

        var addFlag = $DGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = apiUrl + '/deleteCode';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var rowData = {
                modFlag : 'MOD_FLAG',
                codeGrpCd : 'CODE_GRP_CD',
                codeCd : 'CODE_CD'
            };

            //1. 체크된 리스트.
            var jsonData = $DGrid.getJsonData('dt_data', rowData);

            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
                // $DGrid.paragonGridReload();
                fnDSearch();
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
	SysCodeApp.init();
});
