var sysMenuApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
	const proCd = 'PC0006';
	const proNm = 'sysMenu';
	const apiUrl = '/api/sys/menu';

	// [El]메뉴 트리 그리드
	const $HGrid = $("#sysMenuHGrid");

	let pdaYnComboJson;
	let gridComboUseYn;
	let gridUseYn;

	var gridData = [];

	return {
        init: function () {

        	gridComboUseYn = WMSUtil.fnCombo.grid_selectBox('sysMenuPdaUseYN', 'USE_YN');
			gridUseYn = WMSUtil.fnCombo.grid('USE_YN');

        	fnEvents();

			// fnInit();

			fnList();
	    },
	    // initPopup: function () {
	    // 	//메뉴 등록수정 POPUP창 Event
	    // 	fnNewPopupEvent();
	    // }
    };

    //이벤트
    function fnEvents(){

    	//조회
    	$('#sysMenuSearchBtn').click(function(){
			fnList();
    	});

    	//메뉴등록 버튼
    	$("#sysMenuAddBtn").click(function(){
    		fnHAdd();
    	});

    	//저장버튼
    	$("#sysMenuSaveBtn").click(function(){
    		fnHSave();
    	});
    	//행삭제버튼
    	$("#sysMenuDelBtn").click(function(){
			fnHDelete();

    	});
    }

	function fnInit() {
		App.prcsStart();
		$.ajax({
			url      : apiUrl + "/listMenu",
			dataType : 'json',
			type     : 'POST',
			cache    : false,
			contentType : 'application/json; charset=utf-8',
			success  : function(data) {
				if(data.dt_grid != undefined){
					gridData = data.dt_grid;
					fnList();
				}
			}
		});
		App.prcsEnd();
	}

	/** 조회버튼클릭 */
    function fnHSearch(){
		var data = {
		};
		//그리드 조회
		$HGrid.paragonGridSearch(data);
		// fnInit();
    }

	/** 그리드 조회 */
    function fnList(){
		$HGrid.paragonGrid({
			url: apiUrl + '/listMenu',
//			countable        : false,
			componentId: "CP0010",
//			pageable         : false,
			sortable: false,
			rowEditable: true,
			height: '628',
			// datatype : 'local', data : gridData,
			colModel: [
				{editable: false, name: 'ROW_ID', hidden: true},
				{editable: false, name: 'MENU_SEQ', hidden: true, key: true},
				{editable: false, name: "MENU_PARENT_SEQ", hidden: true},
				{editable: true, name: 'MENU_NM', width: 200},
				{editable: true, name: 'PRO_CD', align: "center", width: 80},
				// {editable:true, 	name:'MENU_NM', 				align:"center",width:100},
				{editable: true, name: 'CALL_URL', width: 150},
				{editable: true, name: 'MENU_SIMP_NM', align: "center", width: 100},
				{editable: true, name: 'MENU_EN_NM', align: "center", width: 100},
				{
					editable: true, name: 'MENU_ICO', width: 80, formatter: inMakeMenuIcon,
					edittype: "custom",
					editoptions: {
						custom_value: inGetIconElValue,
						custom_element: inCreateIconEl
					}
				},
				{editable: true, name: 'MENU_ORDER', align: "center", width: 50},
				{editable: true, name: 'DOMAIN_ID', align: "center", width: 80},
				{
					editable: true, name: 'PDA_USE_YN', align: "center", width: "100px", fixed: true,
					edittype: 'select', formatter: 'select', editoptions: {value: gridComboUseYn}
				},
				{
					editable: true, name: 'FAVOR_YN', align: "center", width: 50,
					edittype: 'select', formatter: 'select', editoptions: {value: gridComboUseYn}
				},
				{
					editable: true, name: 'USE_YN', align: "center", width: 50,
					edittype: 'select', formatter: 'select', editoptions: {value: gridComboUseYn}
				},
			],
//            gridResize :null,		//[TODO 테트트 필요함]
//            height:"auto",			//[TODO 테트트 필요함] 그리드 사이즈 조정 불가
//            caption			: "메뉴 목록",
			domainId: 'MENU_LIST',
			treeGrid: true,
			ExpandColumn: "MENU_NM",
			treedatatype: "json",
			treeGridModel: "adjacency",
			treeReader: {
				parent_id_field: "MENU_PARENT_SEQ",
				level_field: "LEVEL",
				leaf_field: "ISLEAF",
				expanded_field: "expanded",
				loaded: "UI_ICON"
			},
			onSelectRow : function(a,b,c,d){
				console.log(a,b,c,d)
			}
			// footerrow		: true,
			// userDataOnFooter: true,
		})

		//[In]  Icon UI 생성
		function inMakeMenuIcon(value, options, rowObject) {
			value = (value === null) ? "" :value ;
        	var div =$("<div/>");
			var iconEl = $("<i/>");
			var iconTxt = $("<label/>");
			iconEl.addClass("fa "+value);
			iconTxt.text(value);
			iconTxt.addClass("ico-label");
			iconTxt.css("text-indent",10);
			div.append(iconEl).append(iconTxt);

            return div.html();
		}
		//[In]  Icon 값 get
		function inGetIconElValue(elem, oper, value) {
			if (oper === "get") {
				return $(elem).val();
			}
		}
		//[In]  Icon input 박스 생성
		function inCreateIconEl(elem, editOptions) {
			var div =$("<div/>");
			div.html(elem);
			var value = div.find(".ico-label").text();
			return $("<input>", {value:value });
		}
	}

	function fnHAdd(){

// 		var pop = PopApp.coreOpenPopup({
// 			ajaxUrl		: apiUrl + '/newPop',
// 			id			: 'menuNewPopUp',
// 			width		: '50',
// 			minWidth	: '700',
// 			btnName		: "저장",
// 			visible		:  true, //기본값 false :바로 활성화  TODO 사용설명서 명시해야함
// //    		title 		: "메뉴 등록",
// 			domainId	: 'MENU_ADD_BTN',
// 			onload		: function(){
// 				//POPUP창 이벤트 실행
// 				sysMenuApp.initPopup();
// 				var rowid= $HGrid.jqGrid('getGridParam','selrow');
// 				var selectBox = $("#popMenuParentSeq");
// 				if(rowid != null){
// 					var lastRowData = $systemMenuGrid.getRowData( rowid );
// 					var menuSeq = lastRowData.MENU_SEQ;
// 					var menuNm = lastRowData.MENU_NM;
// 					var option = $("<option>", {value: menuSeq , selected: true });
// 					option.text(menuNm)
// 					selectBox.append(option);
//
// 				}
// 			}
// 		});

		var rowId = $HGrid.getGridParam("selrow");
		if(rowId == null) return;
		var rowData = $HGrid.getRowData(rowId);
		var addRowData =
		{
			"ROW_ID" : ($HGrid.getDataIDs().length + 1),
			"MENU_PARENT_SEQ" : rowData.MENU_SEQ,
			"MENU_SEQ" : "",
			"MENU_NM" : "",
			"PRO_CD" : "",
			"CAL_URL" : "",
			"MENU_SIMP_NM" : "",
			"MENU_EN_NM" : "",
			"MENU_ICO" : "",
			"MENU_ORDER" : "",
			"DOMAIN_ID" : "",
			"PDA_USE_YN" : "",
			"USE_YN" : "",
			"LEVEL" : Number(rowData.LEVEL) + 1,
			"ISLEAF" : "UI_ICON",
			"expanded": true,
			"position" : "after" //first, last, before, after
		}
		$HGrid.paragonGridInsertRow(addRowData)
	}

	//[Fn]그룹코드 수정된 내용저장
	//[Fn] Grid Save Data Row. (제품관리 flag: 1 )
	function fnHSave() {
		//저장버튼 이벤트 로직 수행.
		var saveUrl = apiUrl + '/saveMenu';
		var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
		var rowData = {
			modFlag 		: 'MOD_FLAG',
			menuSeq			: 'MENU_SEQ',
			menuParentSeq 	: 'MENU_PARENT_SEQ',
			menuNm			: 'MENU_NM',
			proCd			: 'PRO_CD',
			callUrl			: 'CALL_URL',
			menuSimpNm		: 'MENU_SIMP_NM',
			menuEnNm 		: 'MENU_EN_NM',
			menuIco			: 'MENU_ICO',
			menuOrder 		: 'MENU_ORDER',
			domainId		: 'DOMAIN_ID',
			pdaUseYn		: 'PDA_USE_YN',
			favorYn			: 'FAVOR_YN',
			useYn			: 'USE_YN',
		};
		var jsonData = $HGrid.getJsonData('dt_data', rowData);

		//null Check
		if (!jsonData){
			Util.alert('MSG_COM_VAL_057'); // 선택된 행이 없습니다.
			return;
		}

		var rowId = $HGrid.getGridParam("selrow");
		var rowData = $HGrid.getRowData(rowId);

		//Require Check
		var rowFlag = rowData.MOD_FLAG;
		if(rowFlag == 'UPDATE' && rowFlag == 'INSERT'){
			if(rowData.menuNm){
				Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
				return false;
			}
			if(rowData.domainId){
				Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
				return false;
			}
			if(rowData.menuOrder){
				Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
				return false;
			}
		}

		//ajax Event.
		WMSUtil.ajax(jsonData, saveUrl, msg, function(){
			// $HGrid.paragonGridReload();
			fnList();
		})
	}


	//[Fn]그룹코드 삭제
	//[Fn] Grid Delete Data Row. (제품관리 flag: 1 )
	function fnHDelete() {

		var addFlag = $HGrid.paragonGridSelectedDeleteData();

		if (addFlag === false) {
			//삭제버튼 이벤트 로직 수행.
			var saveUrl = apiUrl + '/deleteMenu';
			var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
			var rowData = {
				modFlag: 'MOD_FLAG',
				menuSeq: 'MENU_SEQ',
				menuParentSeq : 'MENU_PARENT_SEQ'
			};

			//1. 체크된 리스트.
			var jsonData = $HGrid.getJsonData('dt_data', rowData);
			WMSUtil.ajax(jsonData, saveUrl, msg, function(){
				// $HGrid.paragonGridReload();
				fnList();
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
	sysMenuApp.init();
});
