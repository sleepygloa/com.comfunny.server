<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="page-container" class="page-sidebar-fixed page-header-fixed" style="overflow-x:hidden">
<%--	<div id="header" class="header navbar navbar-default navbar-fixed-top">--%>
<%--		<div class="container-fluid">--%>
<%--			<div class="navbar-header">--%>
<%--				<a class="navbar-toggle btn"  data-click="sidebar-toggled">--%>
<%--					<i class="fa fa-bars fa-2x"></i>--%>
<%--				</a>--%>
<%--				<a id="navCaption" >--%>
<%--				</a>--%>
<%--				<a id="navHome"  class="navbar-home btn" >--%>
<%--					<i class="fa fa-home fa-2x"></i>--%>
<%--				</a>--%>

<%--			</div>--%>
<%--			<ul class="nav navbar-nav navbar-right col-xsm-hidden">--%>
<%--				<li class="dropdown navbar-user">--%>
<%--					<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">--%>
<%--						<!-- <img src="/img/user-13.jpg" alt="" /> -->--%>
<%--						<span class="hidden-xs" id="mainUserNm">${sessionScope.s_userNm} ${sessionScope.s_userPositionNm}</span> <b class="caret"></b>--%>
<%--					</a>--%>
<%--				</li>--%>
<%--			</ul>--%>
<%--		</div>--%>
<%--	</div>--%>

	<div class="sidebar">
		<div data-scrollbar="true" id="leftMenu"  data-height="100%" style="margin-top:0px;">
		</div>
	</div>
<!-- Main 화면 -->
	<div id="content" class="content">
		<div id="tabs" class="panel panel-inverse panel-with-tabs main-tab"></div>
	</div>
<!-- 끝 -->
	<a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i class="fa fa-angle-up"></i></a>
</div>

<div id="ajax-loader" class="hide">
	<div  class="fade in"><span class="spinner"></span></div>
</div>

<div id="customModal" class="customModalInit">

</div>

<script src="/js/views/main/mainContent.js"></script>
