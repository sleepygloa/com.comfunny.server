This XML file does not appear to have any style information associated with it. The document tree is shown below.
<mapper namespace="wms.st.IbMapper">
<!--  관련테이블
	
	ST_IB : 수불

	 -->
<!--  수불원장 조회  -->
<select id="selectSkuxIbList" parameterType="map" resultType="egovMap">
<![CDATA[ WITH IB AS ( SELECT RANK() OVER(PARTITION BY A.SKU ORDER BY A.IBDE, A.IBSN) AS RANK , COUNT(*) OVER(PARTITION BY A.SKU) AS CNT , A.* FROM ST_IB A WHERE A.BIZ = #{biz} AND A.DC = #{dc} AND A.CLIENT = #{client} AND A.IBDE BETWEEN #{stibde} AND #{edibde}) SELECT B.SKUCTGR , MAX(C.CDNM) AS SKUCTGRNM , B.SKU , B.SKUNM , B.STD1 , B.WT , B.HG , SUM(CASE WHEN RANK = 1 THEN (CASE WHEN #{stat} = 1 THEN A.EXTCOL01 WHEN #{stat} = 2 THEN A.BSESTOKQTY ELSE A.BSESTOKWT END) ELSE 0 END) AS BSESTOKQTY , SUM(CASE WHEN #{stat} = 1 THEN A.EXTCOL02 WHEN #{stat} = 2 THEN A.RCPTQTY ELSE A.RCPTWT END) AS RCPTQTY , SUM(CASE WHEN #{stat} = 1 THEN A.EXTCOL03 WHEN #{stat} = 2 THEN A.ODERQTY ELSE A.ODERWT END) AS ODERQTY , SUM(CASE WHEN RANK = CNT THEN (CASE WHEN #{stat} = 1 THEN A.EXTCOL05 WHEN #{stat} = 2 THEN A.ENDSTOKQTY ELSE A.ENDSTOKWT END) ELSE 0 END) AS ENDSTOKQTY FROM IB A , SD_SKU B , SD_CD C WHERE A.SKU = B.SKU AND A.CLIENT = B.CLIENT AND A.BIZ = B.BIZ AND A.BIZ = C.BIZ AND C.CDGRP = 'PapKndTp' AND C.CD = B.SKUCTGR AND A.BIZ = #{biz} AND A.DC = #{dc} AND A.CLIENT = #{client} AND A.IBDE BETWEEN #{stibde} AND #{edibde} ]]>
<if test="papkndtp != null and papkndtp != ''"> AND B.SKUCTGR = #{papkndtp} </if>
<if test="sku != null and sku !=''"> AND B.SKU = #{sku} </if>
<if test="avgwttp != null and avgwttp !=''"> AND B.WT = #{avgwttp} </if>
<![CDATA[ GROUP BY B.BIZ, B.CLIENT, B.SKUCTGR, B.SKU, B.SKUNM, B.STD1, B.WT, B.HG ORDER BY B.SKU ]]>
</select>
<!--  수불원장 상세조회  -->
<select id="selectSkuxIbDtList" parameterType="map" resultType="egovMap">
<![CDATA[ SELECT A.IBDE , (SELECT CDNM FROM SD_CD WHERE CDGRP='DutyTy' AND CD = A.DUTYTY AND BIZ=A.BIZ) AS DUTYTY , (SELECT DUTYNM FROM SD_BIZDUTY WHERE DUTYTY = A.DUTYTY AND DUTYCD = A.DUTYCD AND BIZ = A.BIZ) AS DUTYCD , A.CUST , A.CUSTTP , ISNULL((SELECT CUSTNM FROM SD_CUST WHERE CUST = A.CUST AND CUSTTP = A.CUSTTP AND CLIENT = A.CLIENT AND BIZ = A.BIZ), A.CUST) AS CUSTNM , (CASE WHEN #{stat} = 1 THEN A.EXTCOL01 WHEN #{stat} = 2 THEN A.BSESTOKQTY ELSE A.BSESTOKWT END) AS BSESTOKQTY , (CASE WHEN #{stat} = 1 THEN A.EXTCOL02 WHEN #{stat} = 2 THEN A.RCPTQTY ELSE A.RCPTWT END) AS RCPTQTY , (CASE WHEN #{stat} = 1 THEN A.EXTCOL03 WHEN #{stat} = 2 THEN A.ODERQTY ELSE A.ODERWT END) AS ODERQTY , (CASE WHEN #{stat} = 1 THEN A.EXTCOL05 WHEN #{stat} = 2 THEN A.ENDSTOKQTY ELSE A.ENDSTOKWT END) AS ENDSTOKQTY , A.REFTP , A.REFVAL1 FROM ST_IB A WHERE A.BIZ = #{biz} AND A.DC = #{dc} AND A.CLIENT = #{client} AND A.SKU = #{sku} AND A.IBDE BETWEEN #{stibde} AND #{edibde} ORDER BY A.IBDE, A.IBSN ]]>
</select>
<!--  수불부 조회   -->
<select id="selectIbList" parameterType="map" resultType="egovMap">
<![CDATA[ WITH IB AS ( SELECT RANK() OVER(PARTITION BY A.SKU ORDER BY A.IBDE, A.IBSN) AS RANK , COUNT(*) OVER(PARTITION BY A.SKU) AS CNT , A.* FROM ST_IB A WHERE A.BIZ = #{biz} AND A.DC = #{dc} AND A.CLIENT = #{client} AND A.IBDE BETWEEN #{stibde} AND #{edibde}) SELECT B.SKUCTGR , MAX(C.CDNM) AS SKUCTGRNM , B.SKU , B.SKUNM , B.HG , B.WT , SUM(CASE WHEN RANK = 1 THEN ( CASE WHEN #{stat} = 1 THEN A.EXTCOL01 WHEN #{stat} = 2 THEN A.BSESTOKQTY ELSE A.BSESTOKWT END ) ELSE 0 END) AS BSESTOKQTY /* 기초재고 */ , SUM(CASE WHEN DUTYCD = 'R11' THEN ( CASE WHEN #{stat} = 1 THEN A.EXTCOL02 WHEN #{stat} = 2 THEN A.RCPTQTY ELSE A.RCPTWT END ) ELSE 0 END) AS R11QTY /* 생산입고 */ , SUM(CASE WHEN DUTYCD = 'R91' THEN ( CASE WHEN #{stat} = 1 THEN A.EXTCOL04 WHEN #{stat} = 2 THEN A.RCPTQTY ELSE A.RCPTWT END ) ELSE 0 END) AS R91QTY /* 조정입고 */ , SUM(CASE WHEN DUTYCD = 'O11' THEN ( CASE WHEN #{stat} = 1 THEN A.EXTCOL03 WHEN #{stat} = 2 THEN A.ODERQTY ELSE A.ODERWT END ) ELSE 0 END) AS O11QTY /* 생산출고 */ , SUM(CASE WHEN DUTYCD = 'O21' THEN ( CASE WHEN #{stat} = 1 THEN A.EXTCOL03 WHEN #{stat} = 2 THEN A.ODERQTY ELSE A.ODERWT END ) ELSE 0 END) AS O21QTY /* 판매출고 */ , SUM(CASE WHEN DUTYCD = 'O91' THEN ( CASE WHEN #{stat} = 1 THEN A.EXTCOL04 WHEN #{stat} = 2 THEN A.ODERQTY ELSE A.ODERWT END ) ELSE 0 END) AS O91QTY /* 조정출고 */ , SUM(CASE WHEN RANK = CNT THEN ( CASE WHEN #{stat} = 1 THEN A.EXTCOL05 WHEN #{stat} = 2 THEN A.ENDSTOKQTY ELSE A.ENDSTOKWT END ) ELSE 0 END) AS ENDSTOKQTY /* 기말재고 */ FROM IB A , SD_SKU B , SD_CD C WHERE A.SKU = B.SKU AND A.CLIENT = B.CLIENT AND A.BIZ = B.BIZ AND A.BIZ = C.BIZ AND C.CDGRP = 'PapKndTp' AND C.CD = B.SKUCTGR AND A.BIZ = #{biz} AND A.DC = #{dc} AND A.CLIENT = #{client} AND A.IBDE BETWEEN #{stibde} AND #{edibde} ]]>
<if test="papkndtp != null and papkndtp != ''"> AND B.SKUCTGR = #{papkndtp} </if>
<if test="sku != null and sku !=''"> AND B.SKU = #{sku} </if>
<if test="avgwttp != null and avgwttp !=''"> AND B.WT = #{avgwttp} </if>
GROUP BY B.BIZ, B.CLIENT, B.SKUCTGR, B.SKU, B.SKUNM, B.WT, B.HG ORDER BY B.SKU
</select>
<!--  거래처구분 조회 ============================================================================  -->
<select id="selectCusttp" parameterType="map" resultType="egovMap">
<![CDATA[ SELECT CUSTTP FROM SD_CUST WHERE CUST = #{cust} AND CLIENT = #{client} AND BIZ = #{biz} ]]>
</select>
<!--  깨끗한나라 - 일수불 조회  -->
<select id="selectIb" parameterType="map" resultType="egovMap">
<![CDATA[ SELECT IBDE , SKU , CLIENT , DC , BIZ FROM ST_IB WHERE IBDE = #{ibde} AND SKU = #{sku} AND CLIENT = #{client} AND DC = #{dc} AND BIZ = #{biz} AND DUTYTY = #{dutyty} AND DUTYCD = #{dutycd} AND CUST = #{cust} AND CUSTTP = #{custtp} AND REFTP = #{reftp} AND REFVAL1 = #{refval1} AND REFVAL2 = #{refval2} ]]>
</select>
<!--  깨끗한나라 - 기초재고량(BSESTOKQTY), 기초재고중량, 기초재고량(EXTCOL01) 조회  -->
<select id="selectBsestokqty" parameterType="map" resultType="egovMap">
<![CDATA[ SELECT ENDSTOKQTY AS BSESTOKQTY , ENDSTOKWT AS BSESTOKWT , EXTCOL05 AS EXTCOL01 FROM ST_IB A , ( SELECT SA.IBDE , MAX(SA.IBSN) AS IBSN , SA.SKU , SA.CLIENT , SA.DC , SA.BIZ FROM ST_IB SA ,( SELECT MAX(IBDE) AS IBDE, SKU, CLIENT, DC, BIZ FROM ST_IB WHERE BIZ = #{biz} AND CLIENT = #{client} AND DC = #{dc} AND IBDE <= #{ibde} AND SKU = #{sku} GROUP BY SKU, CLIENT, DC, BIZ ) SB WHERE SA.IBDE = SB.IBDE AND SA.SKU = SB.SKU AND SA.CLIENT = SB.CLIENT AND SA.DC = SB.DC AND SA.BIZ = SB.BIZ GROUP BY SA.IBDE, SA.SKU, SA.CLIENT, SA.DC, SA.BIZ ) B WHERE A.IBDE = B.IBDE AND A.IBSN = B.IBSN AND A.SKU = B.SKU AND A.CLIENT = B.CLIENT AND A.DC = B.DC AND A.BIZ = B.BIZ ]]>
</select>
<!--  깨끗한나라 - 일수불 생성   -->
<insert id="insertIbDe" parameterType="map">
<selectKey resultType="Integer" keyProperty="ibsn" order="BEFORE">
<![CDATA[ SELECT ISNULL(MAX(IBSN) + 1, 1) AS IBSN FROM ST_IB WHERE IBDE = #{ibde} AND SKU = #{sku} AND CLIENT = #{client} AND DC = #{dc} AND BIZ = #{biz} ]]>
</selectKey>
<![CDATA[ INSERT INTO ST_IB ( IBDE, IBSN, SKU, CLIENT, DC, BIZ , DUTYTY, DUTYCD, CUST, CUSTTP , BSESTOKQTY, BSESTOKWT, RCPTQTY, RCPTWT, ODERQTY, ODERWT, ADJSQTY, ADJSWT, ENDSTOKQTY, ENDSTOKWT , REFTP, REFVAL1, REFVAL2, RGSDE, RGSUSR, EXTCOL01, EXTCOL02, EXTCOL03, EXTCOL04, EXTCOL05 ) VALUES ( #{ibde} , #{ibsn} , #{sku} , #{client} , #{dc} , #{biz} , #{dutyty} , #{dutycd} , #{cust} , #{custtp} , ISNULL(CONVERT(NUMERIC(20,5), #{bsestokqty}), 0) , ISNULL(CONVERT(NUMERIC(9,2), #{bsestokwt}), 0) , ISNULL(CONVERT(NUMERIC(20,5), #{rcptqty}), 0) , ISNULL(CONVERT(NUMERIC(9,2), #{rcptwt}), 0) , ISNULL(CONVERT(NUMERIC(20,5), #{oderqty}), 0) , ISNULL(CONVERT(NUMERIC(9,2), #{oderwt}), 0) , ISNULL(CONVERT(NUMERIC(20,5), #{adjsqty}), 0) , ISNULL(CONVERT(NUMERIC(9,2), #{adjswt}), 0) , (ISNULL(CONVERT(NUMERIC(20,5), #{bsestokqty}), 0) + ISNULL(CONVERT(NUMERIC(20,5), #{rcptqty}), 0) - ISNULL(CONVERT(NUMERIC(20,5), #{oderqty}), 0) + ISNULL(CONVERT(NUMERIC(20,5), #{adjsqty}), 0)) , (ISNULL(CONVERT(NUMERIC(9,2), #{bsestokwt}), 0) + ISNULL(CONVERT(NUMERIC(9,2), #{rcptwt}), 0) - ISNULL(CONVERT(NUMERIC(9,2), #{oderwt}), 0) + ISNULL(CONVERT(NUMERIC(9,2), #{adjswt}), 0)) , #{reftp} , #{refval1} , #{refval2} , getDate() , #{rgsusr} , ISNULL(CONVERT(NUMERIC(20,5), #{extcol01}), 0) , ISNULL(CONVERT(NUMERIC(20,5), #{extcol02}), 1) , ISNULL(CONVERT(NUMERIC(20,5), #{extcol03}), 0) , ISNULL(CONVERT(NUMERIC(20,5), #{extcol04}), 0) , (ISNULL(CONVERT(NUMERIC(20,5), #{extcol01}), 0) + ISNULL(CONVERT(NUMERIC(20,5), #{extcol02}), 1) - ISNULL(CONVERT(NUMERIC(20,5), #{extcol03}), 0) + ISNULL(CONVERT(NUMERIC(20,5), #{extcol04}), 0)) ) ]]>
</insert>
<!--  일수불 수정  -->
<update id="updateIbDe" parameterType="map">
<![CDATA[ UPDATE ST_IB SET RCPTQTY = RCPTQTY + ISNULL(#{rcptqty}, 0) , ODERQTY = ODERQTY + ISNULL(#{oderqty}, 0) , ADJSQTY = ADJSQTY + ISNULL(#{adjsqty}, 0) , ENDSTOKQTY = ENDSTOKQTY + (ISNULL(#{rcptqty}, 0) - ISNULL(#{oderqty}, 0) + ISNULL(#{adjsqty}, 0)) WHERE IBDE = #{ibde} AND IBSN = #{ibsn} AND SKU = #{sku} AND CLIENT = #{client} AND DC = #{dc} AND BIZ = #{biz} ]]>
</update>
<!--  과거 수불일의 경우 이후 날짜의 기초 및 기말 데이터 수정  -->
<update id="updateIbDeAfterDateAll" parameterType="map">
<![CDATA[ UPDATE ST_IB SET BSESTOKQTY = BSESTOKQTY + (ISNULL(#{rcptqty}, 0) - ISNULL(#{oderqty}, 0) + ISNULL(#{adjsqty}, 0)) , ENDSTOKQTY = ENDSTOKQTY + (ISNULL(#{rcptqty}, 0) - ISNULL(#{oderqty}, 0) + ISNULL(#{adjsqty}, 0)) WHERE ((IBDE = #{ibde} AND IBSN > #{ibsn} ) OR ( IBDE > #{ibde} )) AND SKU = #{sku} AND CLIENT = #{client} AND DC = #{dc} AND BIZ = #{biz} ]]>
</update>
</mapper>