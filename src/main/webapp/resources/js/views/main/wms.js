/**
 * 장치 높이.
 * */
var deviceHeight = window.innerHeight;
var deviceWidth = window.innerWeight;
var modalDeviceHeight = window.innerHeight - 50;

/**
 * 말로는 뒤로가기 안되게 하는 버튼이라는데..
 * */
window.onpageshow = function(event) {
    if (event.persisted) {
        document.location.reload();
    }
};

//
//$(document).on('mouseover', 'input', function(){
//	console.log($(this));
//});
//function closeLayer( obj ) {
//	$(obj).parent().parent().hide();
//}
//$(document).on('mouseover', 'input', function(e){
//	console.log($(this));
//	var sWidth = window.innerWidth;
//	var sHeight = window.innerHeight;
//
//	var oWidth = $('.popupLayer').width();
//	var oHeight = $('.popupLayer').height();
//
//	// 레이어가 나타날 위치를 셋팅한다.
//	var divLeft = e.clientX + 10;
//	var divTop = e.clientY + 5;
//
//	// 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
//	if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
//	if( divTop + oHeight > sHeight ) divTop -= oHeight;
//
//	// 레이어 위치를 바꾸었더니 상단기준점(0,0) 밖으로 벗어난다면 상단기준점(0,0)에 배치하자.
//	if( divLeft < 0 ) divLeft = 0;
//	if( divTop < 0 ) divTop = 0;
//
//	$('.popupLayer').css({
//		"top": divTop,
//		"left": divLeft,
//		"position": "absolute"
//	}).show();
//});

//$('input').on('mouseover', function(){
//	console.log($(this));
//});


/**
 * Toast API Default Setting
 * Color : success(green), info(blue), warning(yellow), error(red)
 * positionClass[위치] = Top-Right, Bottom-Right, Bottom-Left, Top-Left, Top-Full-Width, Bottom-Full-Width, Top-center, Bottom-Center
 * */
//toastr.options = {
//		  "closeButton": false,
//		  "debug": false,
//		  "newestOnTop": false,
//		  "progressBar": false,
//		  "positionClass": "toast-Top-Full-Width",
//		  "preventDuplicates": true,
//		  "onclick": null,
//		  "showDuration": "300",
//		  "hideDuration": "1000",
//		  "timeOut": 0,
//		  "extendedTimeOut": 0,
//		  "showEasing": "swing",
//		  "hideEasing": "linear",
//		  "showMethod": "fadeIn",
//		  "hideMethod": "fadeOut",
//		  "tapToDismiss": false
//		}

/**
 * input 포커스 상태일 때, 제일 상단으로 화면이동,
 * 키보드가 가려지는 문제 해결하기 위함.
 * */


/**
 * jqGrid 너비 동적 변환
 * Web Browser (수동) 창 동적 변환시 그리드 너비 동적 변환
 * TODO. 미개발.
 * */
function resizeJqGridWidth(id){

   // window에 resize 이벤트를 바인딩 한다.
   $(window).bind('resize', function() {

   var resizeWidth = $('#'+id+'GridGrp').width();
       // 그리드의 width 초기화
       $('#' + id + 'Grid').setGridWidth( resizeWidth, true);

       // 그리드의 width를 div 에 맞춰서 적용
       $('#' + id + 'Grid').setGridWidth( resizeWidth , true); //Resized to new width as per window.

    }).trigger('resize');
}

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};




String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


//function addClientCdChangeEvent(id, secondInputArr){
//    var inputClientCd = $("#" + id + "Cd");
//    var inputClientNm = $("#" + id + "Nm");
//    var tempInputCd;
//    var tempInputNm;
//    inputClientCd.on('change', function(e){
//        var jsonObject = {
//                "searchClientCd" : inputClientCd.val()
//               };
//        var jsonStr = JSON.stringify(jsonObject);
//
//        if(inputClientCd.val().trim().length != 0){
//            //App.prcsStart();
//            $.ajax({
//                url: '/ctrl/common/clientDirectSearch',
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    //검색결과 하나
//                    if(dataCheck.length == 1) {
//                        console.log(dataCheck);
//                        inputClientCd.val(dataCheck[0].CLIENT_CD);
//                        inputClientNm.val(dataCheck[0].CLIENT_NM);
//                    //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
//                    }else if(dataCheck.length != 1 && $("modalClientPopup").length == 0){
//                        PopApp.paragonOpenPopup({
//                            ajaxUrl: "/ctrl/common/clientPopup",
//                            data : {clientCd : inputClientCd.val()},
//                            id: "modalClientPopup",
//                            width: "550",
//                            btnName: "수정",
//                            domainId: "PWMCM105Q_P1",
//                            onload: function(modal) {
//                                // 팝업화면 클릭 시 code, name.
//                                var callBack = {
//                                    "CLIENT_CD": id + "Cd", // "", "text box id"
//                                    "CLIENT_NM": id + "Nm"
//                                };
//                                App.setElIds(callBack);
//                                modal.show();
//                            }
//                        });
//                    }
//                }
//            });
//        }else{
//            inputClientNm.val("");
//        }
//        for(var index in secondInputArr){
//            tempInputCd = $("#" + secondInputArr[index] + "Cd");
//            tempInputNm = $("#" + secondInputArr[index] + "Nm");
//            tempInputCd.val("");
//            tempInputNm.val("");
//        }
//    });
//}
//
//function addDistributionCenterCdChangeEvent(id){
//    var inputDcCd = $("#" + id + "Cd");
//    var inputDcNm = $("#" + id + "Nm");
//    var tempInputCd;
//    var tempInputNm;
//    inputDcCd.on('change', function(e){
//        var jsonObject = {
//                dcCd : inputDcCd.val()
//        };
//        var jsonStr = JSON.stringify(jsonObject);
//
//        if(inputDcCd.val().trim().length != 0){
//            //App.prcsStart();
//            $.ajax({
//                url: '/ctrl/common/listDcPop',
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    //검색결과 하나
//                    if(dataCheck.length == 1) {
//                        console.log(dataCheck);
//                        inputDcCd.val(dataCheck[0].DC_CD);
//                        inputDcNm.val(dataCheck[0].DC_NM);
//                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
//                    }else if(dataCheck.length != 1 && $("modalDcPopup").length == 0){
//                        PopApp.paragonOpenPopup({
//                            ajaxUrl: "/ctrl/common/dcPopup",
//                            data : {dcCd : inputDcCd.val()},
//                            id: "modalDcPopup",
//                            width: "550",
//                            btnName: "수정",
//                            domainId: "PWMCM101Q_P1",
//                            onload: function(modal) {
//                                modal.show();
//                            },
//                            callback:function(rowData){
//                                $('#' +  id + "Cd").val(rowData.DC_CD);
//                                $('#' + id + "Nm").val(rowData.DC_NM);
//                            }
//                        });
//                    }
//                }
//            });
//        }else{
//            inputDcNm.val("");
//        }
//    });
//}
//// 구역코드
//function addAreaCdChangeEvent(id){
//    var inputAreaCd = $("#" + id + "Cd");
//    var inputAreaNm = $("#" + id + "Nm");
//    var tempInputCd;
//    var tempInputNm;
//    inputAreaCd.on('change', function(e){
//        var jsonObject = {
//                areaCd : inputAreaCd.val()
//        };
//        var jsonStr = JSON.stringify(jsonObject);
//
//        if(inputAreaCd.val().trim().length != 0){
//            //App.prcsStart();
//            $.ajax({
//                url: '/ctrl/common/listAreaPop',
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                domainId : "PWMCM102Q_P1",
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    //검색결과 하나
//                    if(dataCheck.length == 1) {
//                        console.log(dataCheck);
//                        inputAreaCd.val(dataCheck[0].AREA_CD);
//                        inputAreaNm.val(dataCheck[0].AREA_NM);
//                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
//                    }else if(dataCheck.length != 1 && $("modalAreaPopup").length == 0){
//                        PopApp.paragonOpenPopup({
//                            ajaxUrl: "/ctrl/common/areaPopup",
//                            data : {areaCd : inputAreaCd.val()},
//                            id: "modalAreaPopup",
//                            width: "550",
//                            btnName: "수정",
//                            domainId: "PWMCM102Q_P1",
//                            onload: function(modal) {
//                                modal.show();
//                            },
//                            callback:function(rowData){
//                                $('#' +  id + "Cd").val(rowData.AREA_CD);
//                                $('#' + id + "Nm").val(rowData.AREA_NM);
//                            }
//                        });
//                    }
//                }
//            });
//        }else{
//            inputAreaNm.val("");
//        }
//    });
//}
//
//function addZoneCdChangeEvent(id){
//    var inputZoneCd = $("#" + id + "Cd");
//    var inputZoneNm = $("#" + id + "Nm");
//    var tempInputCd;
//    var tempInputNm;
//    inputZoneCd.on('change', function(e){
//        var jsonObject = {
//                zoneCd : $("#" + id + "Cd").val()
//        };
//        var jsonStr = JSON.stringify(jsonObject);
//
//        if(inputZoneCd.val().trim().length != 0){
//            //App.prcsStart();
//            $.ajax({
//                url: '/ctrl/common/listZonePop',
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                domainId : "PWMCM103Q_P1",
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    //검색결과 하나
//                    if(dataCheck.length == 1) {
//                        console.log(dataCheck);
//                        inputZoneCd.val(dataCheck[0].ZONE_CD);
//                        inputZoneNm.val(dataCheck[0].ZONE_NM);
//                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
//                    }else if(dataCheck.length != 1 && $("modalZonePopup").length == 0){
//                        PopApp.paragonOpenPopup({
//                            ajaxUrl: "/ctrl/common/zonePopup",
//                            data : {zoneCd : inputZoneCd.val()},
//                            id: "modalZonePopup",
//                            width: "550",
//                            btnName: "수정",
//                            domainId: "PWMCM103Q_P1",
//                            onload: function(modal) {
//                                modal.show();
//                            },
//                            callback:function(rowData){
//                                $('#' +  id + "Cd").val(rowData.ZONE_CD);
//                                $('#' + id + "Nm").val(rowData.ZONE_NM);
//                            }
//                        });
//                    }
//                }
//            });
//        }else{
//            inputZoneNm.val("");
//        }
//    });
//}
//
////규격
//function addSpecCdChangeEvent(id){
//    var inputSpecCd = $("#" + id + "Cd");
//    var inputSpecNm = $("#" + id + "Nm");
//    var tempInputCd;
//    var tempInputNm;
//    inputSpecCd.on('change', function(e){
//        var jsonObject = {
//                specCd : $("#" + id + "Cd").val()
//        };
//        var jsonStr = JSON.stringify(jsonObject);
//
//        if(inputSpecCd.val().trim().length != 0){
//            //App.prcsStart();
//            $.ajax({
//                url: '/ctrl/common/listSpecPop',
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    //검색결과 하나
//                    if(dataCheck.length == 1) {
//                        console.log(dataCheck);
//                        inputSpecCd.val(dataCheck[0].SPEC_CD);
//                        inputSpecNm.val(dataCheck[0].SPEC_NM);
//                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
//                    }else if(dataCheck.length != 1 && $("modalSpecPopup").length == 0){
//                        PopApp.paragonOpenPopup({
//                            ajaxUrl: "/ctrl/common/specPop",
//                            data : {specCd : inputSpecCd.val()},
//                            id: "modalSpecPopup",
//                            width: "550",
//                            btnName: "수정",
//                            domainId: "PWMMS109E_P1",
//                            onload: function(modal) {
//                                modal.show();
//                            },
//                            callback:function(rowData){
//                                $('#' +  id + "Cd").val(rowData.SPEC_CD);
//                                $('#' + id + "Nm").val(rowData.SPEC_NM);
//                            }
//                        });
//                    }
//                }
//            });
//        }else{
//            inputSpecNm.val("");
//        }
//    });
//}
//function addItemCdChangeEvent(id, client){
//    var inputItemCd = $("#" + id + "Cd");
//    var inputItemNm = $("#" + id + "Nm");
//    var tempInputCd;
//    var tempInputNm;
//    inputItemCd.on('change', function(e){
//        var jsonObject = {
//                itemCd : inputItemCd.val(),
//                paramCd : inputItemCd.val(),
//                clientCd : $("#" + client + "Cd").val()
//        };
//        var jsonStr = JSON.stringify(jsonObject);
//        if(inputItemCd.val().trim().length != 0){
//            //App.prcsStart();
//            $.ajax({
//                url: '/ctrl/common/listItemPop',
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    console.log(dataCheck);
//                    //검색결과 하나
//                    if(dataCheck.length == 1) {
//                        console.log(dataCheck);
//                        inputItemCd.val(dataCheck[0].ITEM_CD);
//                        inputItemNm.val(dataCheck[0].ITEM_DETAIL_NM);
//                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
//                    }else if(dataCheck.length != 1 && $("modalItemPopup").length == 0){
//                        PopApp.paragonOpenPopup({
//                            ajaxUrl: "/ctrl/common/itemPop",
//                            data : jsonObject,
//                            id: "modalItemPopup",
//                            width: "550",
//                            btnName: "수정",
//                            domainId: "PWMMS109E_P1",
//                            onload: function(modal) {
//                                // 팝업화면 클릭 시 code, name.
//                                var callBack = {
//                                    "ITEM_CD": id + "Cd", // "", "text box id"
//                                    "ITEM_NM": id + "Nm"
//                                };
//                                App.setElIds(callBack);
//                                modal.show();
//                            },
//                            callback:function(rowData){
//                                $('#' +  id + "Cd").val(rowData.ITEM_CD);
//                                $('#' + id + "Nm").val(rowData.ITEM_DETAIL_NM);
//                            }
//                        });
//                    }
//                }
//            });
//        }else{
//            inputItemNm.val("");
//        }
//    });
//}
//
//function addLocCdChangeEvent(id){
//    var inputLocCd = $("#" + id + "Cd");
//    var inputLocNm = $("#" + id + "Nm");
//    var tempInputCd;
//    var tempInputNm;
//    inputLocCd.on('change', function(e){
//        var jsonObject = {
//                paramCd : inputLocCd.val(),
//        };
//        var jsonStr = JSON.stringify(jsonObject);
//        if(inputLocCd.val().trim().length != 0){
//            //App.prcsStart();
//            $.ajax({
//                url: '/ctrl/common/listLocPop',
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    console.log(dataCheck);
//                    //검색결과 하나
//                    if(dataCheck.length == 1) {
//                        console.log(dataCheck);
//                        inputLocCd.val(dataCheck[0].LOC_CD);
//                        inputLocNm.val(dataCheck[0].LOC_NM);
//                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
//                    }else if(dataCheck.length != 1 && $("modalLocPopup").length == 0){
//                        PopApp.paragonOpenPopup({
//                            ajaxUrl: "/ctrl/common/locPopup",
//                            data : jsonObject,
//                            id: "modalLocPopup",
//                            width: "550",
//                            btnName: "수정",
//                            domainId: "PWMCM104Q_P1",
//
//                            onload: function(modal) {
//                                // 팝업화면 클릭 시 code, name.
//                                var callBack = {
//                                    "LOC_CD": id + "Cd", // "", "text box id"
//                                    "LOC_NM": id + "Nm"
//                                };
//                                App.setElIds(callBack);
//                                modal.show();
//                            },
//                            callback:function(rowData){
//                                $('#' +  id + "Cd").val(rowData.LOC_CD);
//                                $('#' + id + "Nm").val(rowData.LOC_NM);
//                            }
//                        });
//                    }
//                }
//            });
//        }else{
//            inputLocNm.val("");
//        }
//    });
//}
////권역
//
////권역
//function addDomainCdChangeEvent(id, dcCd){
//    var inputDomainCd = $("#" + id + "Cd");
//    var inputDomainNm = $("#" + id + "Nm");
//    var tempInputCd;
//    var tempInputNm;
//    inputDomainCd.on('change', function(e){
//        var jsonObject = {
//                doaminCd : $("#" + id + "Cd").val(),
//                dcCd : dcCd
//        };
//        var jsonStr = JSON.stringify(jsonObject);
//
//        if(inputDomainCd.val().trim().length != 0){
//            //App.prcsStart();
//            $.ajax({
//                url: '/ctrl/common/listDomainPop',
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    //검색결과 하나
//                    if(dataCheck.length == 1) {
//                        console.log(dataCheck);
//                        inputDomainCd.val(dataCheck[0].DOMAIN_CD);
//                        inputDomainNm.val(dataCheck[0].DOMAIN_DETAIL_NM);
//                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
//                    }else if(dataCheck.length != 1 && $("modalDomainPopup").length == 0){
//                        PopApp.paragonOpenPopup({
//                            ajaxUrl: "/ctrl/common/domainPop",
//                            data : jsonObject,
//                            id: "modalDomainPopup",
//                            width: "550",
//                            btnName: "수정",
//                            domainId: "PWMCM116Q_P1",
//                            onload: function(modal) {
//                                modal.show();
//                            },
//                            callback:function(rowData){
//                                $('#' +  id + "Cd").val(rowData.DOMAIN_CD);
//                                $('#' + id + "Nm").val(rowData.DOMAIN_DETAIL_NM);
//                            }
//                        });
//                    }
//                }
//            });
//        }else{
//            inputDomainNm.val("");
//        }
//    });
//}
//
//var checkFlag = true;
//var url;
//var popUrl;
//var popId;
//var popDomainId;
//var jsonStr;
//var callBack;
//function setAjaxParam(client, target, flag){
//    var inputClientCd = $("#" + client + "Cd");
//    var inputClientNm = $("#" + client + "Nm");
//    var targetCd = $("#" + target + "Cd");
//    var targetNm = $("#" + target + "Nm");
//    var jsonObject;
//
//    if("SUPPLIER" == flag){
//        jsonObject = {
//                "searchClientCd" : inputClientCd.val(),
//                "searchSupplierCd" : targetCd.val()
//        };
//        callBack = function(data){
//            $("#" + target + "Cd").val(data.SUPPLIER_CD);
//            $("#" + target + "Nm").val(data.SUPPLIER_NM);
//
//        };
////        callBack ={
////                "SUPPLIER_CD" :target + "Cd",
////                "SUPPLIER_NM" :target + "Nm"
////        };
//        url = "/ctrl/common/supplierDirectSearch";
//        popUrl = "/ctrl/common/supplierPop";
//        popId = "modalSupplierPopup";
//        popDomainId = "PWMCM106Q_P1";
//        errMsg = "해당 구매처는 존재하지 않습니다.";
//    }else if("STORE" == flag){
//        jsonObject = {
//                "searchClientCd" : inputClientCd.val(),
//                "searchStoreCd" : targetCd.val()
//        };
//        callBack = function(data){
//            $("#" + target + "Cd").val(data.STORE_CD);
//            $("#" + target + "Nm").val(data.STORE_NM);
//
//        };
////        callBack ={
////                "STORE_CD" :target + "Cd",
////                "STORE_NM" :target + "Nm"
////        };
//        url = "/ctrl/common/storeDirectSearch";
//        popUrl = "/ctrl/common/storePop";
//        popId = "modalStorePopup";
//        popDomainId = "PWMCM107Q_P1";
//        errMsg = "해당 배송처는 존재하지 않습니다.";
//    }else if("SET_ITEM" == flag){
//        jsonObject = {
//                "searchClientCd" : inputClientCd.val(),
//                "searchSetItemCd" : targetCd.val()
//        };
//        callBack = function(data){
//            $("#" + target + "Cd").val(data.SET_ITEM_CD);
//            $("#" + target + "Nm").val(data.SET_ITEM_NM);
//
//        };
////        {
////                "SET_ITEM_CD" :target + "Cd",
////                "SET_ITEM_NM" :target + "Nm"
////        };
//        url = "/ctrl/common/setItemDirectSearch";
//        popUrl = "/ctrl/common/setItemPop";
//        popId = "modalSetItemPopup";
//        popDomainId = "PWMCM112Q_P1";
//        errMsg = "해당 세트아이템은 존재하지 않습니다.";
//    }else if("ITEM" == flag){
//        jsonObject = {
//                "searchClientCd" : inputClientCd.val(),
//                "searchItemCd" : targetCd.val()
//        };
//        callBack = function(data){
//            $("#" + target + "Cd").val(data.ITEM_CD);
//            $("#" + target + "Nm").val(data.ITEM_NM);
//
//        };
////        callBack ={
////                "ITEM_CD" :target + "Cd",
////                "ITEM_NM" :target + "Nm"
////        };
//        url = "/ctrl/common/itemDirectSearch";
//        popUrl = "/ctrl/common/itemPop";
//        popId = "modalItemPopup";
//        popDomainId = "PWMCM111Q_P1";
//        errMsg = "해당 아이템은 존재하지 않습니다.";
//    }
//    jsonStr = JSON.stringify(jsonObject);
//
//}
//function addCdChangeEvent(client, secondInput, flag){
//    var inputClientCd = $("#" + client + "Cd");
//    var inputClientNm = $("#" + client + "Nm");
//    var secondCd = $("#" + secondInput + "Cd");
//    var secondNm = $("#" + secondInput + "Nm");
//    var cdKey = flag+"_CD";
//    var nmKey = flag+"_NM"
////    var errMsg;
//
//    secondCd.on('change', function(e){
//        setAjaxParam(client, secondInput, flag);
//        //입력값이 있는 경우
//
//        if(secondCd.val().trim().length != 0){
//            $.ajax({
//                url: url,
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    //결과가 하나일때
//                    if(dataCheck.length == 1){
//                        secondCd.val(dataCheck[0].CD);
//                        secondNm.val(dataCheck[0].CD_NM);
//                    //결과가 하나가 아닐때
//                    }else{
//                        //focusout 과 중복 발생 하지 않도록 설정되는 플래그
//                        if(checkFlag){
//                            checkFlag = false;
//                            PopApp.paragonOpenPopup({
//                                ajaxUrl : popUrl,
//                                id : popId,
//                                width : '550',
//                                domainId : popDomainId,
//                                data: { paramCd : secondCd.val(), clientCd : inputClientCd.val() },
//                                onload : function(modal) {
////                                    App.setElIds(callBack);
//                                    modal.show();
//                                },
//                                callback : callBack
//                            });
//                        }
//                    }
//                }
//            });
//        //입력값이 있는 경우
//        }else{
//            secondNm.val("");
//            secondCd.val("");
//        }
//    });
//
//    secondCd.bind('focusout', function(e){
//        setAjaxParam(client, secondInput, flag);
//        if(secondCd.val().trim().length != 0){
//            $.ajax({
//                url: url,
//                type : "POST",
//                datatype : 'JSON',
//                contentType : 'application/json;  charset=utf-8',
//                data : jsonStr,
//                success:function(data){
//                    //App.prcsEnd();
//                    var dataCheck = data.dt_grid;
//                    if(dataCheck.length == 1){
//                        secondCd.val(dataCheck[0].CD);
//                        secondNm.val(dataCheck[0].CD_NM);
//                    }else{
//                        if(checkFlag && $(popDomainId) == null){
//                            PopApp.paragonOpenPopup({
//                                ajaxUrl : popUrl,
//                                id : popId,
//                                width : '550',
//                                domainId : popDomainId,
//                                data: { paramCd : secondCd.val(), clientCd : inputClientCd.val() },
//                                onload : function(modal) {
//                                    App.setElIds(callBack);
//                                    modal.show();
//                                }
//                            });
//                        }else{
//                            checkFlag = true;
//                        }
//                    }
//                }
//            });
//        }else{
//            secondNm.val("");
//            secondCd.val("");
//        }
//    });
//}
//
////코드 삭제 시 이름 제거 이벤트
//function addClearEvent(id){
//    var inputCd = $("#" + id + "Cd");
//    var inputNm = $("#" + id + "Nm");
//    inputCd.on('change', function(e){
//        if(inputCd.val().trim().length == 0){
//            inputNm.val('');
//        }
//    });
//}
//
///********************************************************************
// * JQGrid AddRow 시  *_BOX_QTY, *_EA_QTY DEFAULT 0 입력
// * Since   : 2017-10-12
// * 작성자  : Kim Seon Ho
// * 수정내역:
// ********************************************************************/
//function fnAddRowQtyDefault(inputGrid){
//    var idx = inputGrid.getRowData(); //선택한 Row 정보
//    var ids = inputGrid.jqGrid('getDataIDs'); //JQGrid INDEX값
//    var count = 0;
//
//    if(ids.length <= 0){
//        return false;
//    }else{
//        for (var i = 0; i < ids.length; i++) {
//            var rowdata = inputGrid.getRowData(ids[i]);
//            if($("input[id$=_QTY]")){
//                $("input[id$=_QTY]").val(0);
//            }
//        }
//    }
//}

/**
 * 프로젝트 내 사용되는 붙여넣기 키, 마우스 이벤트 처리
 * 1. 그리드내 허용범위(지정한 maxlength이상 입력되는 값 처리)
 * */
var ctrlDown = false,
ctrlKey = 17,
cmdKey = 91,
vKey = 86,
cKey = 67;

$(document).keydown(function(e) {
    if (e.keyCode == ctrlKey && e.keyCode == cKey && e.keyCode == vKey) e.trigger('keyup');
}).keyup(function(e) {
    if (e.keyCode == ctrlKey && e.keyCode == cKey && e.keyCode == vKey) e.trigger('keyup');
});
$('input').bind('input paste', function(){$(this).trigger('keyup');});
/* 끝 */

/**
 * 프로그램, 팝업 프로그램의 고유 아이디 찾기 및 반환
 * 1. 하드코딩 제거 (프로그램명, 탭명 ex) $('#main-tab-id-123').val() )
 * 2. Grid 내 Label 의 Domain Value (한글명) 이용
 * 3. 열려있는(활성화, 포커스) Tab 안에서만 (적용하기) 공통으로 사용되는 Attr(el, class) 을 Customizing.
 * */
/* 탭 아이디 찾기 */
function fnFindTabId($this){
    return $('#'+$this.closest('div[id^=main-tab-id-]').prop('id'));
}
/* 탭 아이디의  span 명 찾기 */
function fnFindTabsSpanText($this, domainId){
    return $('#'+$this.closest('div[id^=main-tab-id-]').prop('id')).find($('span[data-domain-id='+domainId+']')).text();
}
/* 팝업 아이디의 span 명 찾기 */
function fnFindPopupSpanText($this, domainId){
    return $this.find($('span[data-domain-id='+domainId+']')).text();
}

/**
 * 바이트수 반환
 * 1. 유효성검사(validation) 으로 사용 할 text의 byte 확인
 *
 * @param el : tag jquery object
 * @returns {Number}
 *
 * --> grid, 프로그램 로딩시 사용되는 소스에 포함되어함.
 */
function getByteLength(str){
    var len = 0;
    for(var i = 0 ; i < str.length; i++){
        (str.charCodeAt(i) > 255) ? len += 3 : len++;
    }
    return len;
}

function gridTextLengthLimit(el, e, limit){
    var text = $(el).val();
    var textByte = getByteLength(text);
    if(textByte > limit){
        e.preventDefault();
        e.stopPropagation();
        do{
            text = text.substr(0, text.length-1);
            textByte = getByteLength(text);
        }while(textByte > limit);
        $(el).val(text);
        $(el).trigger('blur').trigger('focus');
        return false;
    }
    return true;
}
function gridIntLengthLimit(el, e, limit){
    var number = $(el).val();
    var numberStr = number.toString();
    var flag = number.indexOf(".");

    if(flag == 0){//float
    }else if(flag == -1){//int
        e.preventDefault();
        e.stopPropagation();
        if(number.length > limit){
            do{
                number = parseInt(numberStr.substr(0, numberStr.length-1));
            }while(number.length > limit);
            $(el).val(number);
            $(el).trigger('blur').trigger('focus');
        }
    }
}

/**
 * WMS 공통 함수
 *
 * 1. web, 2. com, 3. pwa(pdaWebApp), 4. pwv(pdaWebView)
 *
 * */
var WMSUtil = function(){
	"use strict";

    return {
    	/**
    	 * PWA Chrome Guide Setting.
    	 * https://developers.google.com/web/progressive-web-apps/checklist
    	 * */
    	webAppInit : function(){
    		//When tapped, inputs aren't obscured by the on screen keyboard
//    		$('.form-scrollTop').click(function(e){
//    			console.log($(this).is(':focus'));
//    				$(this)[0].scrollIntoView();
//    		});
//    		$('input').keydown(function(e){
//    			if(e.keyCode == 13){
//
//    			}
//    		})
//    		$('.form-scrollTop').is(':focus').function(){
//    			$(this)[0].scrollIntoView();
//    		});
    	},

    	//grid 자동 높이, 너비 조정
    	pwaGridDynamicArea : function(id){

    		deviceHeight = window.innerHeight;
    		deviceWidth = window.innerWeight;
    		modalDeviceHeight = deviceHeight - 50;
    		/**
    		 * 영역이 모달인지 아닌지 확인
    		 * */
        	var modalLength = $('.modal-body').length;
    		/**
    		 * [설명]
    		 * PDA 화면은 전체 div[id$=container] 안
    		 * div[id$=HeaderGrp], div[id$=GridGrp], div[id$=BtnGrp] 으로 나뉨
    		 * container - headerGrp - btnGrp(있을때) = gridGrp + @ = gridGrp(최종)
    		 * @ = div요소의 padding과 요소간 간격을 계산
    		 * */
        	var paddingPx = $('.tab-content.main-tab').css('padding');
        	var padding = paddingPx.split('px')[0]; //패딩 기준이 됨 5px

            var containerH = document.getElementById(id + 'Container').getBoundingClientRect().height;
            var hGrp 		= $('#'+id+'HeaderGrp');
            var bGrp 		= $('#'+id+'BtnGrp');
            var hGrid 		= $('#'+id+'HGrid_wrap');
            var gridGrp 	= $('#'+ id + 'Container > div[id$=Grid_wrap]').length;
            var hGrpHeight 	= ((hGrp.length != 0) 	? document.getElementById(id + 'HeaderGrp').getBoundingClientRect().height : 0); //form-group 에 m-b = 5 존재
            var bGrpHeight	= ((bGrp.length != 0) 	? $('#'+ id + 'BtnGrp').css('height').split('px')[0] : 0); //30 : 0
            var hGridHeight = ((hGrid.length != 0) 	? $('.ui-jqgrid-hdiv').css('height').split('px')[0] : 0);

            var hGridCaptionHeight = (($('#' + id + 'HGrid_caption').text() != '') ?
            		$('.ui-jqgrid-titlebar').css('height').split('px')[0] : 0);

			/**
             * calH 계산된 높이
             * 50 = Page Header 높이, Modal Header 높이
             * padding = Page Header 와 Page Body 간 사이여백, Page Body padding-top
             * 생략 = HeaderGrp 과 GridGrp 간 여백
             * hGridCaptionHeight = Grid 캡션 영역
             * hGridHeight = Grid Column Header (thead) 높이
             * padding = 그룹간 여백, 값은 Container 여백과 동일하게 저장됨.
             * */
        	var calH = deviceHeight - 50 - (hGrpHeight != 0? padding : 0) - hGrpHeight - 0 - hGridCaptionHeight - hGridHeight - padding - bGrpHeight - padding;
        	var calW = "100%";

        	//팝업아닌, 부모창
        	if(modalLength == 0){
        		if(gridGrp == 1){
    				$('#' + id + 'HGrid').jqGrid('setGridHeight', calH);
    				$('#' + id + 'HGrid_wrap').css('margin-bottom', paddingPx);
        		}else if(gridGrp == 2){
        			calH = (calH - hGridHeight - (padding*2)) / gridGrp;
    				$('#' + id + 'HGrid').jqGrid('setGridHeight', calH);
    				$('#' + id + 'HGrid_wrap').css('margin-bottom', paddingPx);
        			$('#' + id + 'DGrid').jqGrid('setGridHeight', calH);
        			$('#' + id + 'DGrid_wrap').css('margin-bottom', paddingPx);
        		}else{
        	    	$('#'+ id +'HeaderGrp').css('height', deviceHeight - 50 - padding - bGrpHeight - padding +'px');
        		}
        	//팝업창
        	}else{
        		//그리드 1개존재
        		if(gridGrp == 1){
        			$('#' + id + 'HGrid').jqGrid('setGridHeight', calH);
    				$('#' + id + 'HGrid_wrap').css('margin-bottom', paddingPx);
        		//그리드 2개 존재
        		}else if(gridGrp == 2){
        			calH = (calH - hGridHeight - (padding*2)) / gridGrp;
    				$('#' + id + 'HGrid').jqGrid('setGridHeight', calH);
    				$('#' + id + 'HGrid_wrap').css('margin-bottom', paddingPx);
        			$('#' + id + 'DGrid').jqGrid('setGridHeight', calH);
        			$('#' + id + 'DGrid_wrap').css('margin-bottom', paddingPx);
        		}else{
        			$('.modal-body').css('height', modalDeviceHeight+'px');
        	    	$('#'+ id +'HeaderGrp').css('height', modalDeviceHeight - bGrpHeight - padding - padding +'px')
        	    							.css('overflow-y', 'scroll');
        		}
        	}

    	},
        //#보안 #암호
        RSAgetKey : function() {
            var returnData = undefined;
            $.ajax({
                url : "/ctrl/sign/getKey",
                type : "POST",
                dataType : "json",
                async    : false,
                success : function(data){
                    returnData = data;

                },
                error : function(e, x, o){
                    alert(e +": "+x+": "+o);
                }
            });
            return returnData;
        },
        //[Fn] 스크립트 암호키 생성
        generateKey : function() {
            var time = new Date().getTime();
            var random = Math.floor(65536*Math.random());
            return (time*random).toString();
        },
        encryptTEA : function (k, text) {
            //[Fn] TEA키 암호화
            return Tea.encrypt(text, k);
        },
        //[Fn] RSA 암호화
        encryptRSA : function (m, e, text){
            var rsa = new RSAKey();
            rsa.setPublic(m, e);
            return rsa.encrypt(text);
        },
        getEKey : function (data){
            var gKey = WMSUtil.generateKey();
            var RSAkey = WMSUtil.RSAgetKey();

            var rData = {};
            $.each(data, function(key, value){
                rData[key] = WMSUtil.encryptTEA(gKey, value);
            })

            var RSAdata = WMSUtil.RSAgetKey();
            var eKey = WMSUtil.encryptRSA(RSAdata.publicKeyM, RSAdata.publicKeyE, gKey);

            rData["eKey"] = eKey;
            return rData;
        },
        //레포트 PDF 실행
        fnReport : function(rData){
        	//변수저장
        	var reportGrid		= ''; //그리드명
        	var reportUrl		= ''; //ajax 호출 URL
        	var reportKey		= ''; //키로 사용할 명(No)
        	var reportProgSt	= ''; //유효성체크할 진행상태명
        	var reportProgCd	= ''; //진행상태 코드
        	var reportProgFlag	= true; //유효성검사 유/무 플래그
        	var reportMsgTxtPositive = true; //true : ~상태만 출력가능합니다. false : ~상태가 아닙니다.
        	var reportErrMsgCd	= 'MSG_INRI_ERR_013';
        	var reportData		= ''; //검색조건 Data
        	var reportAddData	= '';
        	var reportPrintDriver	= '';
        	var reportPopYn 		= undefined;

			// 변수 초기화
			if (rData.grid == undefined) {
				alert('The Grid is not existed.');
				return false;
			}
			if (rData.url == undefined) {
				alert('The Data Url is not existed.');
				return false;
			}
			if (rData.key == undefined) {
				alert('The Data Key is not existed.');
				return false;
			}
//			if (rData.progCd == undefined) {
//				reportProgFlag = false;
//
//			}
//			if (rData.progSt == undefined) {
//				alert('The Data Progress Statement is not existed.');
//				return false;
//			}
			if (rData.errMsgCd == undefined) {
				alert('The Error Message Code is not existed.');
				return false;
			}
			if (rData.data == undefined) {
				alert('The Data is not existed.');
				return false;
			}
    		reportGrid 				= rData.grid;
    		reportUrl 				= rData.url;
    		reportKey 				= rData.key;
    		reportProgCd 			= rData.progCd;
    		reportProgSt 			= rData.progSt;
    		reportProgFlag 			= rData.progFlag;
    		reportMsgTxtPositive 	= rData.msgPositive;
    		reportErrMsgCd 			= rData.errMsgCd;
    		reportData 				= rData.data;
    		reportAddData 			= rData.addData;
    		reportPrintDriver		= rData.s_printDriver;
			reportPopYn 			= rData.popYn;

        	/**
        	 * 유효성 검사.
        	 * */
        	//선택한 행 List
        	var selId = reportGrid.getGridParam("selarrrow");

            //선택한 행 개수 확인
        	if(selId.length == 0){
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                return false;
            }

        	//프로그램별 레포트 출력시 WMS 진행 상태 확인
        	if(reportProgFlag){
                var errKey = "";
                var cnt = 0;

                //key 진행상태 유효성 검사
                $.each(selId, function (i, v) {  //row의 index와 JQGrid INDEX 비교
                    if(reportGrid.getRowData(v)[reportProgSt] != reportProgCd){ //INDEX의 입고진행상태확인
                         if(cnt != 0) errKey += ", ";
                         errKey += (reportGrid.getRowData(v))[reportKey];
                         cnt++;
                    }
                });

                if(cnt > 0){ //진행 상태가 맞지 않을 때
                    Util.alert(reportErrMsgCd, errKey); //예) 입고번호 [ {0} ]은 입하예정상태가 아닙니다.
                    return false;
                }
        	}

        	var sendData = {
        			dt_data		: jsonObject.dt_data,
        			fileName	: reportUrl.split('/')[1],
        			proCd		: reportAddData.proCd,
        			type		: reportAddData.type,
        			s_printDriver : reportPrintDriver
//        			labels		: labels
        	}


//			 App.prcsStart();
			rData["sendData"] = sendData;

        	var data = {
        			dt_data		: jsonObject.dt_data,
        			fileName	: reportUrl.split('/')[1],
        			proCd		: reportAddData.proCd,
        			type		: reportAddData.type,
        			s_printDriver : reportPrintDriver
//        			labels		: labels
        	}
        	var sendData = {
        			dt_data		: jsonObject.dt_data,
        			fileName	: reportUrl.split('/')[1],
        			proCd		: reportAddData.proCd,
        			type		: reportAddData.type,
        			s_printDriver : reportPrintDriver
//        			labels		: labels
        	}


//			 App.prcsStart();
			rData["sendData"] = sendData;
        },
		fnReportPrint : function(rData) {
			App.prcsStart();
			$.ajax({
				url 		: '/ctrl/common/report' + rData.url,
				data 		: JSON.stringify(rData.sendData),
				type 		: "POST",
				datatype 	: "JSON",
				cache 		: false,
				contentType : 'application/json; charset=utf-8',
				success 	: function(result) {
					if (result.stsCd == 100) {
						alert(result.msgTxt);
						return false;
					} else {
						// PDF
						if (rData.sendData.type == 'PDF') {
							var newPopReport = window.open("about:blank");
							newPopReport.location.href = result.fileName;

							// CMD
						} else {

						}
					}
					App.prcsEnd();
				},
				complete : function() {
					App.prcsEnd();
				},
				error : function() {
					alert('레포트 출력 중 에러가 발생하였습니다. 관리자에게 문의하세요');
					App.prcsEnd();
				}
			});
		},
        //자동검색 기능
        fnAutoSearch : function(){

        },

        fnDateSetting : {
            //yyyy-mm-dd -> yyyyMMdd
        	//1. data 미존재 시 ''반환
        	//2. data 존재 유효성검사
        	//3. 유효성검사 pass 시 data형식으로 변환
            yyyymmdd : function(data){
            	if(!data) return '';
                var reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
                if(!reg.test(data)) {
                    alert('날짜형식에 맞게 입력해주세요.');
                    return data;
                }
                var str = new Date(data).format('yyyyMMdd').trim();
                return str;
            },
            yymmdd : function(data){
            	if(!data) return '';
                var reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
                if(!reg.test(data)) {
                    alert('날짜형식에 맞게 입력해주세요.');
                    return data;
                }
                var str = new Date(data).format('yyMMdd').trim();
                return str;
            },
            //yyyy-mm-dd -> MMddyyyy
            mmddyyyy : function(data){
            	if(!data) return '';
            	var reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
                if(!reg.test(data)) {
                    alert('날짜형식에 맞게 입력해주세요.');
                    return data;
                }
                var str = new Date(data).format('MMddyyyy').trim();
                return str;
            },
            //yyyy-mm-dd -> MMddyy
            mmddyy : function(data){
            	if(!data) return '';
                var reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
                if(!reg.test(data)) {
                    alert('날짜형식에 맞게 입력해주세요.');
                    return data;
                }
                var str = new Date(data).format('MMddyy').trim();
                return str;
            },
            //yyyy-mm-dd -> MMdd
            mmdd : function(data){
            	if(!data) return '';
            	var reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
                if(!reg.test(data)) {
                    alert('날짜형식에 맞게 입력해주세요.');
                    return data;
                }
                var str = new Date(data).format('MMdd').trim();
                return str;
            },
            //yyyy-mm-dd -> yyyyMMdd hhmmss
            yyyymmddhhmmss : function(data){
            	if(!data) return '';
//            	var reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
//                if(!reg.test(data)) {
//                    alert('날짜형식에 맞게 입력해주세요.');
//                    return data;
//                }
                var str = new Date(data).format('yyyyMMdd hhmmss').trim();
                return str;
            },
            //yyyy-mm-dd -> yyyyMMdd hhmmss
            yyyy_mm_dd : function(data){
            	if(!data) return '';
            	var newDate = '';
            	var reg = /[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyyMMdd;
                if(!reg.test(data)) {
                    return data;
                    //CRUD 일때 alert함. 현재는 Data그대로 사용
                }else{
                	var yyyy = data.substring(0, 4);
                	var mm = data.substring(4, 6);
                	var dd = data.substring(6, 8);
                	newDate = [yyyy, mm, dd].join('-');
                }

                var str = new Date(newDate).format('yyyy-MM-dd').trim();
                return str;
            },
			// hh24:mi, hh24mi -> hh24mi
			hh24mi : function(data) {
				if(data == ''){
					return data;
				}
				var str = data.split(":");

				// '' 일때
				if (str.length <= 0) {

					// : 존재
				} else if (str.length > 1) {
					var hh24dd = str[0] + str[1];
					return hh24dd;
					// :없음
				} else if (str.length == 1) {
					var hh24 = str[0].substr(0, 2);
					var dd = str[0].substr(2, 2);

					var hh24dd = hh24 + dd;
					return hh24dd;
				}
			}
        },
        fnTagYmdSetting : function(t, d, f){ // programCommonName, Default Value : YN, From~To: Yn
    		$('#' + t + 'S' + 'Hid').change(function(){
            	$('#'+t+'Fr').val($(this).val());
            });
    		if(d){
    			$('#'+t + 'S').datepicker("setDate", new Date()).css('margin-left', '-3px').css('margin-top', '-3px;');
    		}else{
    			$('#'+t + 'S').datepicker().css('margin-left', '-3px').css('margin-top', '-3px;');
    		}
            $('#'+t+'Fr').on('blur change', function(){
                var reg = /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
                var reg2 = /([0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyyMMdd;
                if($(this).val() != '' && reg2.test($(this).val())){
                	$(this).val(WMSUtil.fnDateSetting.yyyy_mm_dd($(this).val()));
                }else if($(this).val() != '' && !reg.test($(this).val())) {
                    alert('날짜형식에 맞게 입력해주세요.');
                    $(this).val('').focus();
                    return false;
                }
            });

            if(f){
        		$('#' + t + 'E' + 'Hid').change(function(){
                	$('#'+t+'To').val($(this).val());
                    var reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
                    if(!reg.test($('#'+t+'Fr').val())) {
                        alert('날짜형식에 맞게 입력해주세요.');
                        return $('#'+t+'To').empty();
                    }
                });
        		if(d){
        			$('#'+t + 'E').datepicker("setDate", new Date()).css('margin-left', '-3px').css('margin-top', '-3px;');
        		}else{
        			$('#'+t + 'E').datepicker().css('margin-left', '-3px').css('margin-top', '-3px;');
        		}
                $('#'+t+'To').on('blur change', function(){
                    var reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyy-MM-dd;
                    var reg2 = /([0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/; //yyyyMMdd;
                    if($(this).val() != '' && reg2.test($(this).val())){
                    	$(this).val(WMSUtil.fnDateSetting.yyyy_mm_dd($(this).val()));
                    }else if($(this).val() != '' && !reg.test($(this).val())) {
                        alert('날짜형식에 맞게 입력해주세요.');
                        $(this).val('').focus();
                        return false;
                    }
                });
            }
        },
        fnCheckData : {
            locCd : function(data){
                var rData = true; //returnData
                $.ajax({
                    url      : "/ctrl/common/check/getCheckLocCnt",
                    type     : "POST",
                    dataType : "json",
                    data     : data,
                    async    : false,
                    cache    : false,
                    success  : function(result){
                        if(result.stsCd == 500){
                            alert(result.msgTxt);
                            rData = false;
                        }
                    }
                })
                return rData;
            }
        },

        fnCombo : {
        	//공통코드 콤보박스
			grid : function(groupCd, order) {
				var comboJson = null;

				$.ajax({
					url : "/api/sys/code/getCodeListForSelectBox",
					data : JSON.stringify({
                        'codeGrpCd' : groupCd,
                        'order' : order
                    }),
                    contentType: "application/json; charset=UTF-8",
					type : "POST",
					dataType : "json",
					async : false,
					cache : false,
					success : function(result) {
						comboJson = Util.MakeGridOptions(result);
					}
				});
				return comboJson;
			},
            selectBox : function(comEl, groupCd, selectCd, dis, first){
                $.ajax({
                    url      : "/api/sys/code/getCodeListForSelectBox",
                    data     : JSON.stringify({'codeGrpCd':groupCd}),
                    type     : "POST",
                    contentType: "application/json; charset=UTF-8",
                    dataType : "json",
                    async	 : false,
//                    cache    : false,
                    success  : function(result) {
//                    	$('#' + comEl).empty();
//                        if(selectCd == undefined){
                        	Util.MakeSelectOptions($('#' + comEl), result, selectCd, first);
//                        }else{
//                        	Util.MakeSelectOptions($('#' + comEl), result, selectCd, first);
//                        }
                        if(dis != undefined && dis){
                        	$('#' + comEl).attr('disabled', true);
                        }
                    }
                });
            },
            grid_selectBox : function(comEl, groupCd, selectCd, dis, first) {
                let comboJson = null;
                $.ajax({
                    url      : "/api/sys/code/getCodeListForSelectBox",
                    data     : JSON.stringify({'codeGrpCd'	: groupCd}),
                    type     : "POST",
                    contentType: "application/json; charset=UTF-8",
                    dataType : "json",
                    async	 : false,
                    acache    : false,
                    success  : function(result) {
                        console.log(result);
//                    	$('#' + comEl).empty();
                        comboJson = Util.MakeGridOptions(result);
//                        if(selectCd == undefined){
                        	Util.MakeSelectOptions($('#' + comEl), result, selectCd, first);
//                        }else{
//                        	Util.MakeSelectOptions($('#' + comEl), result, selectCd);
//                        }
                        if(dis != undefined && dis){
                        	$('#' + comEl).attr('disabled', true);
                        }
                    }
                });
                return comboJson;
            },
            grid_selectBox_range : function(comEl, groupCd, range, other) {
                let comboJson = null;
                $.ajax({
                    url      : "/api/sys/code/listCodeGroupRangeSelect",
                    data     : JSON.stringify({
                        'codeGrpCd'	: groupCd,
                        'range'		: range,
                        'other'		: other
                    }),
                    type     : "POST",
                    contentType: "application/json; charset=UTF-8",
                    dataType : "json",
                    async	 : false,
                    cache    : false,
                    success  : function(result) {
                    	$('#' + comEl).empty();
                        comboJson = Util.MakeGridOptions(result);
                    	Util.MakeSelectOptions($('#' + comEl), result);
                    }
                });
                return comboJson;
            },
			selectBox_range : function(comEl, groupCd, range, other) {
				$.ajax({
					url : "/api/sys/code/listCodeGroupRangeSelect",
					data : JSON.stringify({
                        'codeGrpCd' : groupCd,
                        'range' : range,
                        'other' : other
                    }),
					type : "POST",
					dataType : "json",
                    contentType: "application/json; charset=UTF-8",
					async : false,
					cache : false,
					success : function(result) {
						 $('#' + comEl).empty();
						Util.MakeSelectOptions($('#' + comEl), result);
					}
				});
			},
            //특정 콤보박스
            dcCd : function(comEl, selectCd){
            	var pdaUrl = '';
            	if(comEl.toUpperCase().indexOf('PDA') > -1){
            		pdaUrl = '/pda'
            	}

                $.ajax({
                    url 		: pdaUrl + "/ctrl/setting/getSelectDcCd",
                    type 		: "POST",
                    dataType 	: "json",
                    cache		: false,
                    async		: false,
                    success 	: function(result) {
                    	$('#' + comEl).empty();
                        Util.MakeSelectOptions($('#' + comEl), result, selectCd);
                    }
                });
            },
            clientCd : function(comEl, selectCd){
            	var pdaUrl = '';
            	if(comEl.toUpperCase().indexOf('PDA') > -1){
            		pdaUrl = '/pda'
            	}
                $.ajax({
                	url 		: pdaUrl + "/ctrl/setting/getSelectClientCd",
//                    url 		: "/ctrl/sign/getUserDcComboxList",
                    type 		: "POST",
                    dataType 	: "json",
                    cache		: false,
                    async		: false,
                    success 	: function(result) {
                    	$('#' + comEl).empty();
                        Util.MakeSelectOptions($('#' + comEl), result, selectCd);
                    }
                });
            },
        	itemClassLarge : function(large, middle, small, pda, blank) {
        		if(pda == undefined){
        			pda = '';
        		}
                $.ajax({
                	url			: pda+"/ctrl/common/listItemClassLarge",
                    type 		: "POST",
                    data     	: {
                    		largeClassCd		: $('#' + large).val(),
                        	middleClassCd		: $('#' + middle).val(),
                        	smallClassCd		: $('#' + small).val()
                        	},
                    dataType 	: "json",
                    cache		: false,
                    async		: false,
                    success 	: function(result) {
                    	Util.MakeSelectOptions($('#' + large), result);

                    	if(middle != undefined){
                    		WMSUtil.fnCombo.itemClassMiddle(large, middle, small, pda);
							$('#' + large).change(function() {

								if (blank == 'Y') {
									//중분류 초기화
									$('#' + middle).empty()
//									.append('<option value="" data-domain-id="MIDDLE_CLASS_CD"></option>');
									//소분류 초기화
									$('#' + small).empty()
//									.append('<option value="" data-domain-id="SMALL_CLASS_CD"></option>');
								} else {
									//중분류 초기화
									$('#' + middle).empty().append('<option value="" data-domain-id="MIDDLE_CLASS_CD"></option>');
									//소분류 초기화
									$('#' + small).empty().append('<option value="" data-domain-id="SMALL_CLASS_CD"></option>');
								}

								if($(this).val() == ''){
								}else{
									WMSUtil.fnCombo.itemClassMiddle(large,middle,small,pda,blank);
								}
							});
                    	}
                    }
                });
            },
        	itemClassMiddle : function(large, middle, small,pda,blank) {
        		if(pda == undefined){
        			pda = '';
        		}
				$.ajax({
					url : pda+"/ctrl/common/listItemClassMiddle",
					type : "POST",
					data : {
                		largeClassCd		: $('#' + large).val(),
                    	middleClassCd		: $('#' + middle).val(),
                    	smallClassCd		: $('#' + small).val()
					},
					dataType : "json",
					cache : false,
					async : false,
					success : function(result) {
						Util.MakeSelectOptions($('#' + middle), result);

						if (small != undefined) {
							WMSUtil.fnCombo.itemClassSmall(large,middle, small,pda);
							$('#' + middle).change(function() {
								if (blank == 'Y') {
									//소분류 초기화
									$('#' + small).empty()
	//								.append('<option value="" data-domain-id="SMALL_CLASS_CD"></option>');
								} else {
									//소분류 초기화
									$('#' + small).empty().append('<option value="" data-domain-id="SMALL_CLASS_CD"></option>');
								}
								if($(this).val() == ''){
								}else{
									WMSUtil.fnCombo.itemClassSmall(large,middle,small,pda);
								}
							});
						}
					}
				});
            },
			itemClassSmall : function(large, middle, small,pda) {
        		if(pda == undefined){
        			pda = '';
        		}
				$.ajax({
					url : pda+"/ctrl/common/listItemClassSmall",
					type : "POST",
					data : {
                		largeClassCd		: $('#' + large).val(),
                    	middleClassCd		: $('#' + middle).val(),
                    	smallClassCd		: $('#' + small).val()
					},
					dataType : "json",
					cache : false,
					async : false,
					success : function(result) {
						Util.MakeSelectOptions($('#' + small), result);

					}
				});
			},
            /**
             * 오리온 특화
             * */
        	prodDept : function(comEl, groupCd, other1, selectCd, first){
        		var comboJson = null;
                $.ajax({
                    url 		: "/ctrl/common/listProdDeptDt",
                    type 		: "POST",
                    data     	: {
                    	codeGrpCd : groupCd,
                    	other1		: other1,
                    	other2		: ''
                    		},
                    dataType 	: "json",
                    cache		: false,
                    async		: false,
                    success 	: function(result) {
                        comboJson = Util.MakeGridOptions(result);
//                        if(selectCd == undefined){
                        	Util.MakeSelectOptions($('#' + comEl), result, selectCd, first);
//                        }else{
//                        	Util.MakeSelectOptions($('#' + comEl), result, selectCd);
//                        }
//                        if(dis != undefined && dis){
//                        	$('#' + comEl).attr('disabled', true);
//                        }
                    }
                });
                return comboJson;
            },
        	prodLine : function(comEl, groupCd, other1, selectCd, first){
        		var comboJson = null;
                $.ajax({
                    url 		: "/ctrl/common/listProdLineDt",
                    type 		: "POST",
                    data     	: {
                    		codeGrpCd : groupCd,
                        	other1		: other1
                        	},
                    dataType 	: "json",
                    cache		: false,
                    async		: false,
                    success 	: function(result) {
                        comboJson = Util.MakeGridOptions(result);
//                        if(selectCd == undefined){
//                        $('#'+comEl).empty().append('<option value="" data-domain-id=""></option>');
                        	Util.MakeSelectOptions($('#' + comEl), result, selectCd, first);
//                        }else{
//                        	Util.MakeSelectOptions($('#' + comEl), result, selectCd);
//                        }
//                        if(dis != undefined && dis){
//                        	$('#' + comEl).attr('disabled', true);
//                        }
                    }
                });
                return comboJson;
            },
        },
        validation : {
          //숫자만 존재
            reg_num : function (val){
                var reg = /^[0-9]*$/g;
                if(!reg.test(val)){
                    return false;
                }
                return true;
            }
        },
        popup :{//1.comEl = element, 2.thisVal = boolean, 3. clientCdVal = clientCd.val
        	client : function(comEl, thisVal){
        		var thisCd 	= '';
        		if(thisVal) thisCd  = $('#'+comEl+'Cd').val();
                PopApp.coreOpenPopup({
                    ajaxUrl 	: '/ctrl/common/clientPopup',
                    id 			: 'modalClientPopup',
                    width 		: '550',
                    domainId	: "PWMCM105Q_P1",
                    data		: {clientCd: thisCd},
                    visible		: true,
                    onload 		: function(modal) {
                        var callBack ={
                                "CLIENT_CD" : comEl + "Cd",
                                "CLIENT_NM" : comEl + "Nm",
                        };
                        App.setElIds(callBack);
                        modal.show();
                    }
                });
        	},
        	supplier : function(comEl, thisVal, client){
        		var thisCd 	= '';
        		if(thisVal) thisCd = $('#'+comEl+'Cd').val();
        		PopApp.coreOpenPopup({
                    ajaxUrl  : '/ctrl/common/supplierPop',
                    id 		 : 'modalSupplierPopup',
                    width 	 : '550',
                    domainId :"PWMCM106Q_P1",
                    async	 : false,
                    data	 : {
                    	clientCd	: $('#'+client+'Cd').val(),
                    	supplierCd	: thisCd
                	},
                    visible	 : true,
                    onload 	 : function(modal) {
                        var callBack ={
                                "SUPPLIER_CD" : comEl + "Cd",
                                "SUPPLIER_NM" : comEl + "Nm"
                        };
                        App.setElIds(callBack);
                        modal.show();
                    }
                });
        	},
        	store : function(comEl, thisVal, client){
        		var thisCd 	= '';
        		if(thisVal) thisCd = $('#'+comEl+'Cd').val();
        		PopApp.coreOpenPopup({
                    ajaxUrl  : '/ctrl/common/storePop',
                    id 		 : 'modalStorePopup',
                    width 	 : '550',
                    domainId :"PWMMS107E_P2",
                    data	 : {
                    	clientCd 	: $('#'+client+'Cd').val(),
                    	storeCd 	: thisCd
                	},
                    visible	 : true,
                    onload 	 : function(modal) {
                        var callBack ={
                                "STORE_CD" : comEl + "Cd",
                                "STORE_NM" : comEl + "Nm"
                        };
                        App.setElIds(callBack);
                        modal.show();
                    }
                });
        	},
        	rstore : function(comEl, thisVal, client){
        		var thisCd 	= '';
        		if(thisVal) thisCd = $('#'+comEl+'Cd').val();
        		PopApp.coreOpenPopup({
                    ajaxUrl  : '/ctrl/common/rStorePop',
                    id 		 : 'modalRStorePopup',
                    width 	 : '550',
                    domainId :"PWMMS107E_P3",
                    data	 : {
                    	clientCd 	: $('#'+client+'Cd').val(),
                    	storeCd 	: thisCd
                	},
                    visible	 : true,
                    onload 	 : function(modal) {
                        var callBack ={
                                "RSTORE_CD" : comEl + "Cd",
                                "RSTORE_NM" : comEl + "Nm"
                        };
                        App.setElIds(callBack);
                        modal.show();
                    }
                });
        	},
        	item : function(comEl, thisVal, client){
        		var thisCd 	= '';
        		if(thisVal) thisCd  = $('#'+comEl+'Cd').val();
                PopApp.coreOpenPopup({
                    ajaxUrl 	: '/ctrl/common/itemPop',
                    id 			: 'modalItemPopup',
                    width 		: '550',
                    domainId	: "PWMCM111Q_P1",
                    data		: {
                    	clientCd 	: $('#'+client+'Cd').val(),
                    	itemCd		: thisCd.trim()
                	},
                    visible		: true,
                    onload 		: function(modal) {
                        var callBack ={
                                "ITEM_CD" : comEl + "Cd",
                                "ITEM_NM" : comEl + "Nm",
                        };
                        App.setElIds(callBack);
                        modal.show();
                    }
                });
        	},
        	rtxNo : function(comEl, thisVal, data){
        		var thisCd 	= '';
        		if(thisVal) thisCd  = $('#'+comEl+'Cd').val();
                PopApp.coreOpenPopup({
                    ajaxUrl 	: '/ctrl/common/rtxNoPop',
                    id 			: 'modalRtxNoPopup',
                    width 		: '550',
                    domainId	: 'PWMIF101Q_P1',
                    data		: {
                    	rtxNo		: thisCd,
                    	clientCd	: data.clientCd,
                    	rtxObjCd	: data.rtxObjCd,
                    	rtxMappNo	: data.rtxMappNo,
                    	receiveYmd	: data.receiveYmd,
                    	dynamicTableName : data.dynamicTableName
                	},
                    visible		: true,
                    onload 		: function(modal) {
                        var callBack ={
                                "RTX_NO" : "rtxNo",
                                "FILE_NM" : "fileNm",
                        };
                        App.setElIds(callBack);
                        modal.show();
                    }
                });
        	},
        	printerDriver : function(data){
        		console.log(data);
                PopApp.coreOpenPopup({
                    ajaxUrl 	: '/ctrl/common/printDriverPop',
                    id 			: 'modalPrintDriverPop',
                    width 		: '550',
                    domainId	: 'PWMCM119Q_P1',
                    data		: data,
                    visible		: true,
                    onload 		: function(modal) {
                        modal.show();
                    }
                });
        	},
        	countryCd : function(comEl, thisVal, data){
        		var thisCd 	= '';
        		if(thisVal) thisCd  = $('#'+comEl+'Cd').val();
                PopApp.coreOpenPopup({
                    ajaxUrl 	: '/ctrl/common/pdaCountryPop',
                    id 			: 'modalCountryPopup',
                    width 		: '550',
                    domainId	: 'PWMIF101Q_P1',
                    visible		: true,
                    onload 		: function(modal) {
                        var callBack ={
                        		"COUNTRY_CD" : comEl + "Cd",
                                "COUNTRY"	 : comEl + "Nm",
                        };
                        App.setElIds(callBack);
                        modal.show();
                    }
                });
        	},
    		// pallet : function(comEl, f){
    		// PopApp.paragonOpenPopup({
    		// ajaxUrl : "/ctrl/common/palletPop",
    		// id : "modalPalletPopup",
    		// width : "550",
    		// btnName : "수정",
    		// domainId : "PWMCM114Q_P1",
    		// onload : function(modal) {
    		// modal.show();
    		// },
    		// callback : function(data){
    		// $ibPutwDGrid.setCell("PLT_ID",data.PLT_ID,rowid);
    		// }
    		// });
    		// }
    		},
    	// function End

    		changePop : function(proNm, id){


    			//자신 El
    			//- CD/NM 일때
    			var inputCd = $("#" + proNm + id + "Cd");
    			var inputNm = $("#" + proNm + id + "Nm");
    			//- CD/NM 플래그. 아래에 if 분기 에 사용
    			var inputCdFlag = true;

    			//- CD/NM 아닐때
    			if(inputCd.length == 0){
    				inputCdFlag = false;
    				inputCd = $("#" + proNm + id);

    				//그래도 없다면
    				//그리드의 rowId 값 저장.
    				if(inputCd.length == 0){
    					inputCd = id;
    				}
    			}else if(inputCd.length > 1){
    				console.log("모호함");
    			}

    			//URL
    			var searchUrl = '';

    			//무엇을 조회하는지 확인하는 로직
    			var toUpperId = id.toUpperCase();
    			if(toUpperId.indexOf("CLIENT") != -1){
    				searchUrl = 'listClientPop';
    			}else if(toUpperId.indexOf("STORE") != -1){
    				searchUrl = 'listStorePop';
    			}else if(toUpperId.indexOf("SUPPLIER") != -1){
    				console.log("SUPPLIER");
    				searchUrl = 'listSupplierPop';
    			}else if(toUpperId.indexOf("ITEM") != -1){
    				searchUrl = 'listItemPop';
    			}else if(toUpperId.indexOf("AREA") != -1){
    				searchUrl = 'listAreaPop';
    			}else if(toUpperId.indexOf("LOC") != -1){
    				searchUrl = 'listLocPop';
    			}


    			var tempInputCd;
    			var tempInputNm;
    			inputCd.on('change', function(e) {

    				//고객사 El
    				var inputClientCd = '';
    				var inputClientNm = '';

    				//CD/NM 일때
    				if(inputCdFlag){
//    					if(data != undefined){
//    					if(data.client != ''){
    						inputClientCd = $("#" + proNm + "ClientCd");
    						inputClientNm = $("#" + proNm + "ClientNm");
//    					}
//    				}
    				}


    				//search Data Set
    				var jsonObject = {};

    				if(toUpperId.indexOf("CLIENT") != -1){
    					jsonObject["clientCd"] 	= inputCd.val();
    				}else if(toUpperId.indexOf("STORE") != -1){
    					jsonObject["storeCd"] 	= inputCd.val();
    					jsonObject["clientCd"] 	= inputClientCd.val();
    				}else if(toUpperId.indexOf("SUPPLIER") != -1){
    					jsonObject["supplierCd"]= inputCd.val();
    					jsonObject["clientCd"] 	= inputClientCd.val();
    				}else if(toUpperId.indexOf("ITEM") != -1){
    					jsonObject["itemCd"] 	= inputCd.val();
    					jsonObject["clientCd"] 	= inputClientCd.val();
    				}else if(toUpperId.indexOf("AREA") != -1){
    					jsonObject["areaCd"] 	= inputCd.val();
    					jsonObject["clientCd"] 	= inputClientCd.val();
    				}else if(toUpperId.indexOf("LOC") != -1){
    					jsonObject["locCd"] 	= inputCd.val();
    					jsonObject["clientCd"] 	= inputClientCd.val();
    				}

    				var jsonStr = JSON.stringify(jsonObject);

    				//2글자 이상일때만 조회
    				if (inputCd.val().trim().length > 1) {
    					// App.prcsStart();
    					$.ajax({
    						url 		: '/ctrl/common/' + searchUrl,
    						type 		: "POST",
    						datatype 	: 'JSON',
    						contentType : 'application/json;  charset=utf-8',
    						data 		: jsonStr,
    						success 	: function(data) {
    							// App.prcsEnd();
    							var dataCheck = data.dt_grid;
    							// 검색결과 하나
    							if (dataCheck.length == 1) {
    								//무엇을 조회하는지 확인하는 로직
    								if(toUpperId.indexOf("CLIENT") != -1){
    									inputCd.val(dataCheck[0].CLIENT_CD);
    									inputNm.val(dataCheck[0].CLIENT_NM);
    								}else if(toUpperId.indexOf("STORE") != -1){
    									inputCd.val(dataCheck[0].STORE_CD);
    									inputNm.val(dataCheck[0].STORE_NM);
    								}else if(toUpperId.indexOf("SUPPLIER") != -1){
    									inputCd.val(dataCheck[0].SUPPLIER_CD);
    									inputNm.val(dataCheck[0].SUPPLIER_NM);
    								}else if(toUpperId.indexOf("ITEM") != -1){
    									inputCd.val(dataCheck[0].ITEM_CD);
    									inputNm.val(dataCheck[0].ITEM_NM);
    								}else if(toUpperId.indexOf("AREA") != -1){
    									inputCd.val(dataCheck[0].AREA_CD);
    									inputNm.val(dataCheck[0].AREA_NM);
    								}else if(toUpperId.indexOf("LOC") != -1){
    									inputCd.val(dataCheck[0].LOC_CD);
    								}


    								// 검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
    							} else if (dataCheck.length != 1) {

    								//무엇을 조회하는지 확인하는 로직
    								if(toUpperId.indexOf("CLIENT") != -1){
    									WMSUtil.popup.client(proNm + id, jsonObject);
    								}else if(toUpperId.indexOf("STORE") != -1){
    									WMSUtil.popup.store(proNm + id, jsonObject);
    								}else if(toUpperId.indexOf("SUPPLIER") != -1){
    									WMSUtil.popup.supplier(proNm + id, jsonObject);
    								}else if(toUpperId.indexOf("ITEM") != -1){
    									WMSUtil.popup.item(proNm + id, jsonObject);
    								}else if(toUpperId.indexOf("AREA") != -1){
    									WMSUtil.popup.area(proNm + id, jsonObject);
    								}else if(toUpperId.indexOf("LOC") != -1){
    									WMSUtil.popup.loc(proNm + id, jsonObject);
    								}
    							}
    						}
    					});
    				} else {
    					inputCd.val("");
    					inputNm.val("");
    				}
    			});
    		},

    		//바코드 스캔시 읽을 문자열 길이
    		barcodeTextLength : function(text){


    			if(text.toUpperCase().indexOf('ITEM_BARCODE') > -1){
    				return 13;
    			}else if(text.toUpperCase().indexOf('BOX_BARCODE') > -1){
    				return 14;
    			}else if(text.toUpperCase().indexOf('IB') > -1){
    				return 10;
    			}else if(text.toUpperCase().indexOf('OB') > -1){
    				return 10;
    			}else if(text.toUpperCase().indexOf('ITEM') > -1){
    				return 7;
    			}else if(text.toUpperCase().indexOf('PLT') > -1){
    				return 12;
    			}else if(text.toUpperCase().indexOf('LOC') > -1){
    				return 6;
    			}else{
    				return false;
    			}
    		},
            ajax : function(jsonData, saveUrl, msg, callback, sucMsgFlag){
                //ajax 펑션 유효성검사
                if(saveUrl == undefined){
                    // alert('');
                    return false;
                }

                if(msg != false){
                    //cofirm Message
                    if (!confirm(Util.confirm(msg))) return;
                }

                //데이터 request 잇음. dt_grid
                // if(jsonData != undefined){
                    App.prcsStart();
                    $.ajax({
                        url      : saveUrl,
                        data     : jsonData,
                        dataType : 'json',
                        type     : 'POST',
                        cache    : false,
                        contentType : 'application/json; charset=utf-8',
                        success  : function(data) {
                            App.prcsEnd();
                            console.log(data);
                            //메세지 플래그가 없다면, false 라면
                            //실패처리는 메세지를 항상표시
                            if(data == 200){
                                if(sucMsgFlag) {
                                    alert("처리되었습니다.")
                                };
                                callback();
                            }else{
                                return false;
                            }
                        }
                    });
                    //데이터 request 없음.
    //             }else{
    //                 console.log('not data')
    //                 App.prcsStart();
    //                 $.ajax({
    //                     url      : saveUrl,
    // //		            data     : jsonData,
    //                     dataType : 'json',
    //                     type     : 'POST',
    //                     cache    : false,
    //                     contentType : 'application/json; charset=utf-8',
    //                     success  : function(data) {
    //
    //                         console.debug(data);
    //                         //메세지 플래그가 없다면, false 라면
    //                         //실패처리는 메세지를 항상표시
    //                         if(data.stsCd == 200){
    //                             if(sucMsgFlag) alert(data.msgTxt);
    //                             callback(data);
    //                         }else{
    //                             if(sucMsgFlag) alert(data.msgTxt);
    //                             return false;
    //                         }
    //                     }
    //                 });
    //             }


            },
    		gridFocus : {
    			success : function(){
    				return '#D6EBF5' //sky
    			},
    			error	: function(){
    				return '#FFDDDD' //red
    			},
    			init	: function(){
    				return '#ffffff' //white
    			},
    			caution	: function(){
    				return '#FFFF00' //yello
    			},
    			disabled : function(){
    				return '#e5e9ed' //gray
    			}
    		},
    		grid : {
    			fomatter : {

    				integerNotComma : function(value){
    					var commaValue = value;
    					var commaValueSplit = commaValue.split(',');
    					if(commaValueSplit.length > 1){
    						var notCommaValue = '';
    						for(var i = 0 ; i < commaValueSplit.length; i++){
    							notCommaValue += commaValueSplit[i];
    						}
    						return notCommaValue;
    					}else{
    						return commaValue;
    					}
    				},
    				integerComma : function(value){

    					//숫자 콤마 입력
                        var commaValue = ""+value;

                        // 문자열 길이가 3과 같거나 작은 경우 입력 값을 그대로 리턴
                        if (commaValue.length <= 3) {
                        	return commaValue;
                        }

                        //콤마가 있으면 리턴
                        if(commaValue.split(',').length > 1){
                        	return commaValue;
                        }

                    	//3단어씩 자를 반복 횟수 구하기
                    	var count = Math.floor((commaValue.length - 1) / 3);

                		//결과 값을 저정할 변수
                    	var result = "";

                    	//문자 뒤쪽에서 3개를 자르며 콤마(,) 추가
                    	for (var i = 0; i < count; i++) {

                			//마지막 문자(length)위치 - 3 을 하여 마지막인덱스부터 세번째 문자열 인덱스값 구하기
                    		var length = commaValue.length;
                    	  	var strCut = commaValue.substr(length - 3, length);
                    	  	//반복문을 통해 value 값은 뒤에서 부터 세자리씩 값이 리턴됨.

                    	  	//입력값 뒷쪽에서 3개의 문자열을 잘라낸 나머지 값으로 입력값 갱신
                    	  	commaValue = commaValue.slice(0, length - 3);

                    	  	//콤마(,) + 신규로 자른 문자열 + 기존 결과 값
                    	  	result = "," + strCut + result;
                    	}

                    	//마지막으로 루프를 돌고 남아 있을 입력값(value)을 최종 결과 앞에 추가
                    	result = commaValue + result;

                    	//최종값 리턴
                    	return result;
    				}
    			}
    		},
    		numberComma : function(num){
    			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    		},

    	}

    }();

    /*
     * VALIDATOR
     */
    // 영문 입력, CODE
    /*
     * function fnValiOnlyEng(el){ var check = /[^A-Za-z\s]/;
     * if(check.test($(el).val())){ Util.alert('MSG_COM_VAL_078'); //영문만 입력 할 수
     * 있습니다. $(el).val(''); return false; } return true; } //한글 제외 입력, CODE function
     * fnValiExHan(el){ var check = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]g/; if(check.test($(el).val())){
     * Util.alert('MSG_COM_VAL_079'); //영문과 숫자만 입력 할 수 있습니다. $(el).val(''); return
     * false; } return true; }
     *
     *
     *
     * //Null or '' 여부 function fnValiIsNull(el){ var check = ''; if($(el).val() ==
     * check){ return false; } return text; } //이메일형식 function fnValiEmail(el){ var
     * check =
     * /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
     * if(!check.test($(el).val())){ return false; } return true; } //전화번호 형식
     * function fnValiTel(el){ var check = /^\d{2,3}-\d{3,4}-\d{4}$/; // var check =
     * /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
     * if(!check.test($(el).val())){ return false; } return true; }
     */

