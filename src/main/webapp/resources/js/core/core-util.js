//https://jh-tr.tistory.com/52


(function($) {
    //ajax 세팅
    $.ajaxSetup({
        global: false,
        timeout: 30000,
        contentType: 'application/json; charset=utf-8',
        dataType : "json",
        type : "POST",
        beforeSend : function(xhr){
            xhr.setRequestHeader("AjaxType", "TTONO");
            xhr.setRequestHeader("proCd", "PC0001");
        }
    });

    //엔터이벤트
    $.fn.enterEvent = function(data) {
        $(this).keydown(function(event) {
            if (event.keyCode == 13) {
                data.callBack($(this).val());
            }
        });
    }

    //1000 단위 콤마처리
    String.prototype.comma = function() {
//      var temp = this.replace(/\,/g, "");
        temp = (this == "") ? "" : (parseInt(this.replace(/\,/g, "")) + "");
        var zeroDel = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return zeroDel;
    };
    //1000단위 콤마 제거
    String.prototype.uncomma = function() {
        var temp = this.replace(/\,/g, "");
        return temp;
    };

    //Camel 처리
    String.prototype.strCamel = function() {
        return this.toLowerCase().replace(/(\_[a-z])/g, function(arg){
            return arg.toUpperCase().replace('_','');
        });
    };


    //금액을 한글로 변경
    Number.prototype.chgMoneyToKor = function() {
        if (this == 0){
            return '영';
        }
        var phonemic = [ '', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구' ];
        var unit = [ '', '', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억',
                '백억', '천억', '조', '십조', '백조' ];
        var ret = '';
        var part = new Array();
        for (var x = 0; x < String(this).length; x++)
            part[x] = String(this).substring(x, x + 1);
        for (var i = 0, cnt = String(this).length; cnt > 0; --cnt, ++i) {
            p = phonemic[part[i]];
            p += (p) ? (cnt > 4 && phonemic[part[i + 1]]) ? unit[cnt].substring(0, 1) : unit[cnt] : '';
            ret += p;
        }
        return ret;
    };

    //오늘날짜 구하기, mon(-1 : 1달전 , 4 : 4달후)
    function getLocalDate(mon) {
        if(mon == "" || mon === null || mon === undefined){
            mon = 0;
        }
        var now = new Date();
        now.setMonth(now.getMonth() + mon);
        var year = now.getFullYear();
        var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0'
                + (now.getMonth() + 1);
        var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();

        return year + '-' + mon + '-' + day;
    }
    //모든 공백제거
    String.prototype.alltrim = function() {
        var temp = this.replace(/\ /g, "");
        return temp;
    };

    //금액만 입력가능
    $.fn.onlyMoney = function() {
        $(this).keydown(function(event) {
                if ((event.keyCode >= 48 && event.keyCode <= 57)
                        || event.keyCode == 9 || event.keyCode == 8
//                      || event.keyCode == 65 //ctrl+a
//                      || event.keyCode == 67 //ctrl+c
//                      || event.keyCode == 86 //ctrl+v
                        || (event.keyCode >= 96 && event.keyCode <= 105)
                        || (event.keyCode >= 37 && event.keyCode <= 40)
                        || (event.keyCode == 189 || event.keyCode == 109)) {
                    event.returnValue = true;
                } else if (event.keyCode == 13) {
                    event.keyCode = 9;
                } else {
                    event.preventDefault ? event.preventDefault()
                            : event.returnValue = false;
                }
            }).keyup(function() {
            var num = $(this).val().uncomma();
            $(this).val(num.toString().comma());
        });
    };
    //숫자만 입력가능
    $.fn.onlyNumber = function() {
        $(this).keydown(function(event) {
            if ((event.keyCode >= 48 && event.keyCode <= 57)
                    || event.keyCode == 9 || event.keyCode == 8|| event.keyCode == 13
                    || event.keyCode == 46
//                  || event.keyCode == 65 // TODO ctrl+a 컨트롤키 부분 확인
//                  || event.keyCode == 67 //ctrl+c
//                  || event.keyCode == 86 //ctrl+v
                    || (event.keyCode >= 96 && event.keyCode <= 105)
                    || (event.keyCode >= 37 && event.keyCode <= 40)) {
                event.returnValue = true;
            } else {
                event.preventDefault ? event.preventDefault()  : event.returnValue = false;
            }
        });
    };
    //소수만 입력가능
    $.fn.onlyFloat = function() {
        $(this).keydown(function(event) {
            if ((event.keyCode >= 48 && event.keyCode <= 57)
                    || event.keyCode == 9
                    || event.keyCode == 8
//                  || event.keyCode == 65 //ctrl+a
//                  || event.keyCode == 67 //ctrl+c
//                  || event.keyCode == 86 //ctrl+v
                    || (event.keyCode >= 96 && event.keyCode <= 105)
                    || (event.keyCode >= 37 && event.keyCode <= 40)
                    || (event.keyCode == 189 || event.keyCode == 109)
                    || (event.keyCode == 110 || event.keyCode == 190)) {
                if (($(this).val().length == 0 && (event.keyCode == 110 || event.keyCode == 190))
                        || ($(this).val().indexOf(".") > 0 && (event.keyCode == 110 || event.keyCode == 190))) {
                    // alert("소수점이 이미 입력되었거나 처음 임력됨");
                    event.preventDefault ? event.preventDefault(): event.returnValue = false;
                } else {
                    event.returnValue = true;
                }
            } else if (event.keyCode == 13) {
                event.keyCode = 9;
            } else {
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }
        });
    };
    //파일사이즈 표시
    Number.prototype.fileSizeFormat = function() {

        var size = 0;
        var unit = "Byte";
        if (this < 999) {
            size = this;
        } else if (this < 999999) {
            size = this/1024;
            if ((size % 1) != 0) {
                size = size.toFixed(1);
            }
            unit = " KB";
        } else if (this < 999999999) {
            size = this/(1024*1024);
            if ((size % 1) != 0) {
                if (size < 100) {
                    size = size.toFixed(1);
                } else {
                    size = size.toFixed(0);
                }
                ;
            }
            unit = " MB";
        } else if (this < 999999999999) {
            size = this/(1024*1024*1024);
            if ((size % 1) != 0) {
                size = size.toFixed(2);
            }
            unit = " GB";
        } else if (this < 999999999999999) {
            size = this/(1024*1024*1024*1024);
            if ((size % 1) != 0) {
                size = size.toFixed(2);
            }
            unit = " TB";
        }
        return size + unit;
    };

}(jQuery));

var CoreSession;
var CoreDomain;
var CoreMessage;
var Util = function () {
    "use strict";
    return {
        //세션데이터 조회
        SessionInit: function () {
            $.ajax({
                url : "/api/sys/comm/getSession",
                type : "GET",
                async: false,
                cache: false,
                success : function(result) {
                    CoreSession = '';
                    CoreSession =  result;
                    CoreSession['toast'] = true;
                }, fail : function(){
                	// window.location.href="/"
                }, error : function(){
                	// window.location.href="/"
                }
            });
        },

        //도메인 조회
        DomainInit: function () {
            $.ajax({
                url : "/api/sys/domain/getCoreDomain",
                type : "GET",
                async: false,
                success : function(result) {
                    // console.log('getDomain', result);
                    CoreDomain = '';
                    CoreDomain =  result.dt_domain;
                }, fail : function(){
                    // window.location.href="/"
                }, error : function(){
                    // window.location.href="/"
                }
            });
        },
        //도메인 조회
        MessageInit: function () {
            $.ajax({
                url : "/api/sys/message/getCoreMessage",
                type : "GET",
                async: false,
                success : function(result) {
                    // console.log('getMessage', result);
                    CoreMessage = '';
                    CoreMessage =  result.dt_message;
                }, fail : function(){
                    // window.location.href="/"
                }, error : function(){
                    // window.location.href="/"
                }
            });
        },
        //OS 체크
		CheckOs: function () {
        	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

        	if (mobile) {
        		// 유저에이전트를 불러와서 OS를 구분합니다.
        		var userAgent = navigator.userAgent.toLowerCase();
        		Util.setServerLog(userAgent);
        		if (userAgent.search("android") > -1){
        			return "android";
        		}else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)|| (userAgent.search("ipad") > -1)){
        			return "ios";
        		}else{
        			return "web";
        		}
        	} else {
        		return "web";
        	}
		},
        //TODO 버전체크 이거 쓰려나
		CheckAndVer: function () {
			var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

			if (mobile) {
				var userAgent = navigator.userAgent.toLowerCase();
				Util.setServerLog(userAgent);
				if (userAgent.search("android 4.") > -1){
					return false;
				}else{
					return true;
				}
			} else {
				return true;
			}
		},
        //서버로그남기기
		setServerLog: function (data) {
			$.ajax({
	    		url : "/api/sys/comm/log",
	    		type : "POST",
	    		data :{
	    			data : data,
	    		},
	    		cache : false,
	    		success : function(result) {
	    		}
	    	});
		},
        //세션불러오기
        getSession: function () {
            return CoreSession;
        },
        //알림창 공통
        alertAjax : function(sendData, flag){
            if(flag == null){
            }else if(flag == 'alert'){
                if(CoreMessage != null && CoreMessage[sendData.msgCd]){
                    alert(CoreMessage[sendData.msgCd]);
                }else{
                    alert(sendData.msgCd);
                }
            }else if(flag == 'confirm'){
                var returnVal;
                if(CoreMessage != null && CoreMessage[sendData.msgCd]){
                    returnVal = CoreMessage[sendData.msgCd];
                }else{
                    returnVal = sendData.msgCd
                }
                return returnVal;
            }
        },
        alert: function (msgCd, addMsg) {
            if(!msgCd){
                alert(msgCd);
                return;
            }
            var sendData = {
                    msgCd   : msgCd
                ,   addMsg  : addMsg
            }
            Util.alertAjax(sendData, 'alert');

        },
        alertCode: function (msgCd, codeGrpCd, codeOther) {
            if(!msgCd){
                alert(msgCd);
                return;
            }
            var sendData = {
                    msgCd   : msgCd
                ,   codeGrpCd : codeGrpCd
                ,   codeOther    : codeOther
            }
            Util.alertAjax(sendData, 'alert');

        },
        confirm: function (msgCd) {
            if(!msgCd){
                alert(msgCd);
                return;
            }

            var sendData = {
                    msgCd   : msgCd
            }
            return Util.alertAjax(sendData, 'confirm');
        },
        //콤보박스 만들기
       MakeSelectOptions: function (El,json,select,first) {
            if(first){
                El.html("");
                var option = $("<option value='' />");
                option.text(first)
                El.append(option);
            }
            for (var i = 0; i < json.length; i++) {
                var thisValue = json[i].VALUE;
                var thisName = json[i].NAME;
                var option = $("<option>", {value: thisValue,selected:select == thisValue});
                option.text(thisName)
                El.append(option);
            }
        },

        //콤보박스 만들기
        MakeGridOptions: function (json,firstOption) {
            var txt = "" ;
            if(firstOption || firstOption== ""){
                 txt = ":"+firstOption+";" ;
            }
            for (var i = 0; i < json.length; i++) {
                if(i > 0){
                    txt +=";";
                }
                txt +=json[i].VALUE+":"+json[i].NAME;

            }
            return txt;
        }
    };
}();
