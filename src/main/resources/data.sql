
INSERT INTO AUTHORITY (AUTHORITY_NAME) VALUES ('ROLE_ADMIN');
INSERT INTO AUTHORITY (AUTHORITY_NAME) VALUES ('ROLE_USER');

INSERT INTO USER (BIZ_CD, USER_ID, ACTIVATED, NICKNAME, PASSWORD, USERNAME, USE_YN, DEL_YN, PWD_FAIL_CNT) VALUES ('COMFUNNY_DEVELOPERS', 'admin', true, 'admin', '$2a$10$BBo5fJRjkL1ZubOSIww9Re9hFAR8B0FSkxf05IEKd.lo1sQBHAT52', 'admin', 'Y', 'N', 0);
INSERT INTO USER_AUTHORITY (USER_ID, BIZ_CD, AUTHORITY_NAME) VALUES ('admin', 'COMFUNNY_DEVELOPERS', 'ROLE_ADMIN');
INSERT INTO USER_TOKEN (USER_ID, ACCESS_TOKEN, ACCESS_TOKEN_DT, REFRESH_TOKEN, REFRESH_TOKEN_DT) VALUES ('admin', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY2NzExMDk3OCwiZXhwIjoxNjY3MTEyNzc4LCJhdXRoIjoiIn0.L5YaQw2i-gWWzy419_htt_EKfPtiPyXwyxeWGDCsYic_AegbLgozq_5mGTeSvmqtkmRuJnz7_PUQnm_6mqYe5Q', null, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY2NzExMDk3OCwiZXhwIjoxNjczMzQwNjc4LCJhdXRoIjoiIn0.NeKCXYF1OOeiII7TCA0FjfY15h4eEU9Y7KN3XfRDNpbEyX7vgwZelyHdmZTurok2PzR4FfV13JtLB15lNkoMJQ', null);

-- INSERT INTO tb_sy_auth (AUTH_SEQ, AUTH_NM, AUTH_DESC) VALUES (1, '시스템관리자', '시스템관리자, 모든권한');
-- INSERT INTO tb_sy_auth (AUTH_SEQ, AUTH_NM, AUTH_DESC) VALUES (2, '회사관리자', '회사관리자, 모든 사용권한');
-- INSERT INTO tb_sy_auth (AUTH_SEQ, AUTH_NM, AUTH_DESC) VALUES (3, '일반사용자', '일반사용자, 모든권한');
--INSERT INTO user_cnn_log (user_id,biz_cd,dc_cd,client_cd,login_os,lang_cd,country_cd,in_user_id,up_user_id,in_dt,up_dt) VALUES
--    ('admin','COMFUNNY_DEVELOPERS',NULL,NULL,'web','ko','KR','admin','admin',NULL,'2023-01-18 09:40:32');


INSERT INTO tb_ms_biz (biz_cd,biz_nm,biz_snm,ceo,biz_no,zip,addr,detail_addr,induty,biz_cnd,tel,fax,etc_tp1,etc_tp2,etc_no1,etc_no2,use_yn,in_dt,in_user_id,up_dt,up_user_id,ext_col1,ext_col2,ext_col3,ext_col4,ext_col5) VALUES
	 ('COMFUNNY_DEVELOPERS','컴퍼니디벨로퍼','컴디','김선호','12345678901','15002','경기 시흥시 인선길 63',NULL,NULL,NULL,'01033593878',NULL,'3','4','1','2','Y','2022-07-18 15:52:57.0',NULL,'2022-07-18 15:52:57.0',NULL,NULL,NULL,NULL,NULL,NULL);










