<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<%@ include file="../inc/common.jsp"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
	<jsp:include page="../inc/head.jsp"/>
	<script src="/js/paragon/paragon-popup.js"></script>
</head>
<body class="pace-top" >>
	<div id="page-loader" class="fade in"><span class="spinner"></span></div>

	<div class="login-cover">
	    <div id="login-cover-img" class="login-cover-image"><img data-id="login-cover-image" alt="" /></div>
	    <div class="login-cover-bg"></div>
	</div>
	<div id="page-container" class="fade">
        <div class="login login-v2" data-pageload-addclass="animated fadeIn">
            <div class="login-content">
				<div class="form-group m-b-20">
                    <div class="brand">
                        <span class="logo"></span> 안녕하세요
                        <small>또노 프로젝트입니다.</small>
                    </div>
                    <div class="icon">
                        <i class="fa fa-sign-in"></i>
                    </div>
				</div>
                <div class="form-group m-b-20">
                    <input id="loginUserId" type="text" class="form-control input-lg login-input" placeholder="아이디를 입력해주세요" autocomplete="off" value=""/>
                </div>
                <div class="form-group m-b-20">
                    <input id="loginUserPwd" type="password" class="form-control input-lg login-input" placeholder="비밀번호를 입력해주세요" autocomplete="off" value=""/>
                </div>
                <div class="checkbox m-b-20">
                    <label>
                        <input type="checkbox" id="keepId" /> Remember your ID
                    </label>
                </div>
                <div class="login-buttons">
                    <button id="loginBtn" type="button" class="btn btn-block btn-lg">LOGIN</button>
                </div>
            </div>
        </div>
	</div>
	<script src="/js/views/login/login.js"></script>
</body>
</html>
