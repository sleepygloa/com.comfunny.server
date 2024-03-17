<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page deferredSyntaxAllowedAsLiteral="true"%>

<jsp:include page="../inc/common.jsp" />

<meta charset="utf-8" />
<title>또노 프로젝트</title>
<meta name="description" content=""/>
<meta name="Author" content="TTONO" />
<meta name="viewport"  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

<meta http-equiv="Cache-Control" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta http-equiv="Pragma" content="no-cache"/>

<link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=">

<!-- ================== BEGIN BASE CSS STYLE ================== -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">
<link href="/js/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="/js/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link href="/css/animate.css" rel="stylesheet" />
<link href="/css/style.css" rel="stylesheet" />
<link href="/css/style-responsive.css" rel="stylesheet" />
<link href="/css/theme/default.css" rel="stylesheet" id="theme" />
<link href="/css/ui.jqgrid.css" rel="stylesheet" />
<link href="/js/plugins/flag-icon/css/flag-icon.css" rel="stylesheet" />

<link href="/js/plugins/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap-combobox/css/bootstrap-combobox.css" rel="stylesheet" />

<link href="/css/core-comm.css" rel="stylesheet" />
<link href="/css/core-jqgrid.css" rel="stylesheet" />
<link href="/css/core/core-theme-01.css" rel="stylesheet" />
<!-- ================== END BASE CSS STYLE ================== -->



<!-- ================== BEGIN BASE JS ================== -->
	<script src="/js/plugins/jquery/jquery-3.3.1.min.js"></script>
	<script src="/js/plugins/jquery/jquery-migrate-1.1.0.min.js"></script>
	<script src="/js/plugins/jquery-ui/ui/minified/jquery-ui.min.js"></script>
	<script src="/js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!--[if lt IE 9]>
		<script src="/crossbrowserjs/html5shiv.js"></script>
		<script src="/crossbrowserjs/respond.min.js"></script>
		<script src="/crossbrowserjs/excanvas.min.js"></script>
	<![endif]-->
	<script src="/js/plugins/jquery-hashchange/jquery.hashchange.min.js"></script>
	<script src="/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
	<script src="/js/plugins/jquery-cookie/jquery.cookie.js"></script>
	<script src="/js/plugins/bootstrap-combobox/js/bootstrap-combobox.js"></script>
	<!-- ================== END BASE JS ================== -->

	<!-- ================== BASE JS ================== -->
    <script src="/js/common/grid.locale-kr.js"></script>
    <script src="/js/common/jqgrid-ui.js"></script>
    <script src="/js/common/jqgrid.js"></script>
	<!-- ================== END BASE JS ================== -->

    <script src="/js/encryption/cipher/base64.js"></script>
    <script src="/js/encryption/cipher/jsbn.js"></script>
    <script src="/js/encryption/cipher/rsa.js"></script>
    <script src="/js/encryption/cipher/tea-block.js"></script>
    <script src="/js/encryption/cipher/utf8.js"></script>
	<script src="/js/views/main/wms.js"></script> <!-- WMS COMMON JS CODE -->

	<script src="/js/core/core-util.js"></script>
	<script src="/js/core/core-app.js"></script>
	<script src="/js/core/core-tabs.js"></script>
	<script src="/js/core/core-leftmenu.js"></script>
	<script src="/js/core/core-grid.js"></script>
	<script src="/js/core/core-popup.js"></script>
	<script src="/js/core/core-webapp.js"></script>
	<script src="/js/core/core-serviceWorker.js"></script>
	<script src="/js/core/core-mobile.js"></script>


	<script src="/js/plugins/gritter/js/jquery.gritter.js"></script>
	<script src="/js/plugins/sparkline/jquery.sparkline.js"></script>
	<script src="/js/plugins/jquery-jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
	<script src="/js/plugins/jquery-jvectormap/jquery-jvectormap-world-mill-en.js"></script>
	<script src="/js/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>

	<script>
	if('serviceWorker' in navigator) {
		  navigator.serviceWorker
		  .register('/js/core/core-serviceWorker.js')
		  .then(function() {
// 		    console.log("Service Worker registered successfully");
		  })
		  .catch(function() {
// 		    console.log("Service worker registration failed");
		  });
		}
	</script>

