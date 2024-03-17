<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<style>
.pdaSettingHeaderBtnGrp{
	float:left;
	margin-bottom:20px;
	z-index:10;
	text-align:center;
	vertical-align:center;

}

</style>

	<div id="pdaSettingContainer" class="container" >
		<div id="pdaSettingHeaderGrp" class="col-xs-w100">

			<div id="pdaSettingToggleGrp" class="col-xs-w100">
				<div id="pdaSettingSettingView" class="form-control col-xs-w50 pdaSettingHeaderBtnGrp" data-domain-id="SETTING"></div>
				<div id="pdaSettingUserPasswdView" class="form-control col-xs-w50 pdaSettingHeaderBtnGrp" data-domain-id="USER_PW_CHG"></div>
			</div>

			<form class="form-inline" onsubmit="return false;">
<!-- 환경설정 일때만 보임 -->
				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group pdaSettingSetting">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="DC"></span>
						<select id="pdaSettingDcCd" class="form-control input-sm"></select>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group pdaSettingSetting">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="CLIENT"></span>
						<select id="pdaSettingClientCd" class="form-control input-sm"></select>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group pdaSettingSetting">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="WORK_YMD"></span>
						<div id="pdaSettingWorkYmdDatePikcer" class="col-xs-w100 input-group-sm date">
							<input id="pdaSettingWorkYmd" type="text" class="form-control input-sm" />
							<div class="input-group-btn">
							  	<button  type="button" class="btn btn-sm btn-primary " id="pdaSettingWorkYmdBtn" >
							  		<i class="fa fa-calendar"></i>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group pdaSettingSetting">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="LANG"></span>
						<select id="pdaSettingLang" class="form-control input-sm"></select>
					</div>
				</div>

<!-- 				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="FONT"></span>
						<div class="form-border">
							<label class="input-group-addon radio-inline col-xs-w30">
								<input type="radio" id="RadomainFontSizeS" value="S" name="RadomainFontSize" > <span data-domain-id="SMALL" ></span>
							</label>
							<label class="input-group-addon radio-inline col-xs-w30">
								<input type="radio" id="RadomainFontSizeM" value="M" name="RadomainFontSize"> <span data-domain-id="MIDDLE" ></span>
							</label>
							<label class="input-group-addon radio-inline col-xs-w30">
								<input type="radio" id="RadomainFontSizeL" value="L" name="RadomainFontSize"> <span data-domain-id="LARGE" ></span>
							</label>
						</div>
					</div>
				</div> -->

<!--  환경설정 일때만 보임 끝 -->
<!--  사용자 비밀번호 변경일때만 보임 -->
<!--  사용자 비밀번호 변경일때만 보임끝 -->

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group pdaSettingPw" style="display:none;">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="CURR_PW"></span>
						<input id="pdaSettingCurrPw" type="password" class="form-control input-sm" autocomplete="new-password"  />
						<!-- <span class="col-xs-w100">현재</span> -->
					</div>
				</div>

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group pdaSettingPw" style="display:none;">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="NEW_PW"></span>
						<input id="pdaSettingNewPw" type="password" class="form-control input-sm" autocomplete="new-password"  />
						<!-- <span id="pdaSettingNewPwValid" class="input-group-addon" style="display:none;"><i class="fa fa-check"></i></span> -->
						<!-- <span id="pdaSettingNewPwInValid" class="input-group-addon" style="display:none;"><i class="fa fa-times"></i></span> -->
					</div>
				</div>

<!-- 				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="NEW_PW_ERR">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
						<span id="pdaSettingNewPwConfValid" class="input-group-addon" style="display:none;"><i class="fa fa-check"></i></span>
						<span id="pdaSettingNewPwConfInValid" class="input-group-addon" style="display:none;"><i class="fa fa-times"></i></span>
					</div>
				</div> -->

				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group pdaSettingPw" style="display:none;">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="NEW_PW_CONF"></span>
						<input id="pdaSettingNewPwConf" type="password" class="form-control input-sm"  autocomplete="new-password"  />
					</div>
				</div>

<!-- 				<div class="col-xs-w100 col-sm-w50 col-md-w33f3 form-group" style="display:none;">
					<div class="input-group input-group-sm col-xs-w100">
						<span class="input-group-addon col-xs-w30" data-domain-id="NEW_PW_CONF_ERR">비밀번호를 확인해주세요</span>
					</div>
				</div> -->

			</form>
		</div>

		<div id="pdaSettingGridGrp" class="col-xs-w100">
		</div>

		<div id="pdaSettingBtnGrp" class="col-xs-w100 pda-bottom-group">

			<!--  환경설정 일때만 보임 -->
			<button id="pdaSettingSaveBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary pdaSettingSetting">
				<i data-domain-id="SAVE_BTN" > </i>
			</button>
			<!--  환경설정 일때만 보임 끝 -->
			<!--  사용자 비밀번호 변경일때만 보임 -->
			<button id="pdaSettingPwSaveBtn" type="button" class="col-xs-w100 btn btn-sm btn-primary pdaSettingPw" style="display:none;">
				<i data-domain-id="SAVE_BTN" > </i>
			</button>
			<!--  사용자 비밀번호 변경일때만 보임끝 -->
		</div>

	</div>

	<!-- end page container -->
	<script src="/js/views/pda/setting/pdaSetting.js"></script>
