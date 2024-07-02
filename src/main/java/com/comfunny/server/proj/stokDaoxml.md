<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="wms.st.StokMapper">
	<!-- 관련테이블

	ST_STOK : 재고
	ST_LOT : LOT
	ST_EA : EA
	-->
	
	<!-- 깨끗한나라 - ST_ STOK 조회 ================================================================================-->
	<select id="selectStok" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT LOT
					  , PLTID
					  , CASEID
					  , EAID
					  , SKU
					  , PACKUNIT
					  , LOC
					  , GRAD
					  , CLIENT
					  , DC
					  , BIZ
					  , PLANQTY
					  , INSPQTY
					  , STOKQTY
					  , RESVQTY
					  , ALLCQTY
					  , PICKQTY
					  , LOADQTY
					  , ODERQTY
					  , TRNSQTY
					  , WT
					  , EXTCOL01
					  , EXTCOL02
					  , EXTCOL03
					  , EXTCOL04
					  , EXTCOL05
			  FROM ST_STOK
			WHERE LOT = #{lot}
			     AND PLTID = #{pltid}
			     AND CASEID = #{caseid}
			     AND EAID = #{eaid}
			     AND SKU = #{sku}
			     AND PACKUNIT = #{packunit}
			     AND LOC = #{loc}
			     AND GRAD = #{grad}
			     AND CLIENT = #{client}
			     AND DC = #{dc}
			     AND BIZ = #{biz}
        ]]>
	</select>
	
	<!-- 깨끗한나라 - ST_ STOK 조회 (임시이동정보수신) -->
	<select id="selectStokForRcvTmprMove" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT STOK.LOT
			          , STOK.LOT																						AS FRLOT
			          , STOK.LOT																						AS TOLOT
					  , STOK.PLTID 
					  , STOK.PLTID 																					AS FRPLTID
					  , STOK.PLTID 																					AS TOPLTID
					  , STOK.CASEID
					  , STOK.CASEID																				AS FRCASEID
					  , STOK.CASEID																				AS TOCASEID
					  , STOK.EAID
					  , STOK.EAID																						AS FREAID
					  , STOK.EAID																						AS TOEAID
					  , STOK.SKU
					  , STOK.PACKUNIT
					  , STOK.LOC																						AS FRLOC
					  , LOC.ZONE
					  , ZONE.AREA
					  , STOK.GRAD 
					  , STOK.CLIENT
					  , STOK.DC
					  , STOK.BIZ
					  , STOK.PLANQTY
					  , STOK.INSPQTY
					  , STOK.STOKQTY
					  , STOK.RESVQTY
					  , STOK.ALLCQTY
					  , STOK.PICKQTY
					  , STOK.LOADQTY
					  , STOK.ODERQTY
					  , STOK.TRNSQTY
					  , STOK.WT
					  , STOK.EXTCOL01
					  , STOK.EXTCOL02
					  , STOK.EXTCOL03
					  , STOK.EXTCOL04
					  , STOK.EXTCOL05
					  
					  , CONVERT (char(8), getDate(), 112)													AS RCPTDE
					  , CONVERT (char(8), getDate(), 112)													AS PLANDE 
					  , SKU.UOM
					  , EA.EXTCOL06																				AS EAPLANQTY
					  
			  FROM ST_STOK 	STOK
			          , ST_EA 		EA
			          , SD_SKU 	SKU
			          , SD_LOC	LOC
			          , SD_ZONE 	ZONE
			  
			WHERE STOK.EAID = EA.EAID
			     AND STOK.BIZ = EA.BIZ
			
			     AND STOK.SKU = SKU.SKU
			     AND STOK.BIZ = SKU.BIZ
			     AND STOK.CLIENT = SKU.CLIENT     
			
				 AND STOK.LOC = LOC.LOC
				 AND STOK.DC = LOC.DC
				 AND STOK.BIZ = LOC.BIZ
				 
				 AND LOC.ZONE = ZONE.ZONE
				 AND LOC.DC = ZONE.DC
				 AND LOC.BIZ = ZONE.BIZ
				 
			     AND STOK.DC = #{dc} 
			     AND STOK.BIZ = #{biz}
			     AND STOK.CLIENT = #{client}
			     AND STOK.EAID = #{eaid}
			     AND STOK.STOKQTY > 0
        ]]>
	</select>
	    
    <!-- 깨끗한나라 - ST_STOK 생성  -->
	<insert id="insertStok" parameterType="map">
		<![CDATA[
				INSERT 
				    INTO ST_STOK(LOT, PLTID, CASEID, EAID, SKU, PACKUNIT, LOC, GRAD, CLIENT, DC, BIZ, 
				                          PLANQTY, INSPQTY, STOKQTY, RESVQTY, ALLCQTY, PICKQTY, LOADQTY, ODERQTY, TRNSQTY, 
				                          WT, EXTCOL01, EXTCOL02, EXTCOL03, EXTCOL04, EXTCOL05)
				SELECT LOT
					      ,  PLTID
					      ,  CASEID
					      ,  EAID
					      ,  SKU
					      ,  PACKUNIT
					      ,  INSPLOC
					      ,  GRAD
					      ,  CLIENT
					      ,  DC
					      ,  BIZ
					      ,  0
					      ,  0
					      ,  1
					      ,  0
					      ,  0
					      ,  0
					      ,  0
					      ,  0
					      ,  0
					      ,  0
					      ,  0
					      ,  0
					      ,  0
					      ,  NULL
					      ,  NULL
				   FROM RC_RCPTASGN
				WHERE RCPTNO=#{rcptno}
					 AND RCPTSN=#{rcptsn}
					 AND ASGNNO=#{asgnno}
				     AND DC=#{dc}
				     AND BIZ=#{biz}
		]]>
    </insert>

    <!--  깨끗한나라 - ST_STOK 수정  -->
	<update id="updateStok" parameterType="map">
		<![CDATA[
				UPDATE ST_STOK
				   	  SET STOKQTY = STOKQTY+1
				 WHERE LOT = #{lot}
					  AND PLTID = #{pltid}
					  AND CASEID = #{caseid}
				 	  AND EAID = #{eaid}
					  AND SKU = #{sku}
					  AND PACKUNIT = #{packunit}
					  AND LOC = #{loc}
					  AND GRAD = #{grad}
					  AND CLIENT = #{client}
					  AND DC = #{dc}
					  AND BIZ = #{biz}
		]]>
    </update>


	<!-- 깨끗한나라 - ST_ LOT 조회 ================================================================================-->
	<select id="selectLot" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT LOT
			     	   , BIZ
			     	   , SRCLOT
			     	   , DC
			     	   , RCPTDE
			     	   , RCPTNO
			     	   , RCPTSN
			     	   , CLIENT
			     	   , SKU
			     	   , MFRDE
			     	   , VLDDE
			     	   , MTRDE
			     	   , MFRNO
			     	   , MFRNAT
			     	   , MAKR
			     	   , MFRFCTR
			     	   , MFRLINE
			     	   , WRKTEM
			     	   , WRKUSR
			     	   , SPCUST
			     	   , SPCUSTTP
			     	   , LOTATRB01
			     	   , LOTATRB02
			     	   , LOTATRB03
			     	   , LOTATRB04
			     	   , LOTATRB05
			     	   , LOTATRB06
			     	   , LOTATRB07
			     	   , LOTATRB08
			     	   , LOTATRB09
			     	   , LOTATRB10
			     	   , WORKNO
			     	   , WORKPC
			     	   , RGSDE
			     	   , RGSUSR
			     	   , UPDDE
			     	   , UPDUSR
			     	   , EXTCOL01
			     	   , EXTCOL02
			     	   , EXTCOL03
			     	   , EXTCOL04
			     	   , EXTCOL05
			   FROM ST_LOT
			 WHERE BIZ = #{biz}
			      AND LOT =#{lot}
        ]]>
	</select>

	<!--  깨끗한나라 - ST_LOT 생성  -->
    <insert id="insertLot" parameterType="egovMap" >
		<![CDATA[
				INSERT 
				    INTO ST_LOT 
				SELECT MFRNO					/* LOT */
						   , BIZ						/* BIZ */
						   , '*'						/* SRCLOT */
						   , DC						/* DC */
						   , RCPTDE				/* RCPTDE */
						   , RCPTNO				/* RCPTNO */
						   , RCPTSN				/* RCPTSN */
						   , CLIENT					/* CLIENT */
						   , SKU						/* SKU */
						   , MFRDE					/* MFRDE */
						   , VLDDE					/* VLDDE */
						   , MTRDE					/* MTRDE */
						   , MFRNO				/* MFRNO */
						   , MFRNAT				/* MFRNAT */
						   , MAKR					/* MAKR */
						   , MFRFCTR				/* MFRFCTR */
						   , MFRLINE				/* MFRLINE */
						   , WRKTEM 				/* WRKTEM */
						   , WRKUSR 				/* WRKUSR */
						   , SPCUST 				/* SPCUST */
						   , SPCUSTTP			/* SPCUSTTP */
						   , LOTATRB01			/* LOTATRB01 */
						   , LOTATRB02			/* LOTATRB02 */
						   , LOTATRB03			/* LOTATRB03 */
						   , LOTATRB04			/* LOTATRB04 */
						   , LOTATRB05			/* LOTATRB05 */
						   , LOTATRB06			/* LOTATRB06 */
						   , LOTATRB07			/* LOTATRB07 */
						   , LOTATRB08			/* LOTATRB08 */
						   , LOTATRB09			/* LOTATRB09 */
						   , LOTATRB10			/* LOTATRB10 */
						   , '*'						/* WORKNO */
						   , WORKPC				/* WORKPC */
						   , GETDATE()			/* RGSDE */
						   , RGSUSR				/* RGSUSR */
						   , GETDATE()			/* UPDDE */
						   , UPDUSR				/* UPDUSR */
						   , EXTCOL01			/* EXTCOL01 */
						   , EXTCOL02			/* EXTCOL02 */
						   , EXTCOL03			/* EXTCOL03 */
						   , EXTCOL04			/* EXTCOL04 */
						   , EXTCOL05			/* EXTCOL05 */
				  FROM RC_RCPTDT
				WHERE RCPTNO=#{rcptno}
				     AND RCPTSN=#{rcptsn}
				     AND DC=#{dc}
				     AND BIZ=#{biz}
		]]>
    </insert>
    
	<!--  깨끗한나라 - ST_LOT 수정  -->
	<update id="updateLot" parameterType="map">
		<![CDATA[
				UPDATE ST_LOT
				   	  SET SRCLOT='*'
					 	   , DC = #{dc}
					 	   , RCPTDE = #{rcptde}
					 	   , RCPTNO = #{rcptno}
					 	   , RCPTSN = #{rcptsn}
					 	   , CLIENT = #{client}
					 	   , SKU = #{sku}
					 	   , MFRDE = #{mfrde}
					 	   , VLDDE = #{vldde}
					 	   , MTRDE = #{mtrde}
					 	   , MFRNO = #{mfrno}
					 	   , MFRNAT = #{mfrnat}
					 	   , MAKR = #{makr}
					 	   , MFRFCTR = #{mfrfctr}
					 	   , MFRLINE = #{mfrline}
					 	   , WRKTEM = #{wrktem}
					 	   , WRKUSR = #{wrkusr}
					 	   , SPCUST = #{spcust}
					 	   , SPCUSTTP = #{spcusttp}
					 	   , LOTATRB01 = #{lotatrb01}
					 	   , LOTATRB02 = #{lotatrb02}
					 	   , LOTATRB03 = #{lotatrb03}
					 	   , LOTATRB04 = #{lotatrb04}
					 	   , LOTATRB05 = #{lotatrb05}
					 	   , LOTATRB06 = #{lotatrb06}
					 	   , LOTATRB07 = #{lotatrb07}
					 	   , LOTATRB08 = #{lotatrb08}
					 	   , LOTATRB09 = #{lotatrb09}
					 	   , LOTATRB10 = #{lotatrb10}
					 	   , WORKNO = '*'
					 	   , WORKPC = #{workpc}
					 	   , UPDDE = GETDATE()
					 	   , UPDUSR = #{updusr}
					 	   , EXTCOL01 = #{extcol01}
					 	   , EXTCOL02 = #{extcol02}
					 	   , EXTCOL03 = #{extcol03}
					 	   , EXTCOL04 = #{extcol04}
					 	   , EXTCOL05 = #{extcol05}

				 WHERE LOT=#{lot}
				      AND BIZ=#{biz}
		]]>
    </update>
    
 	<!-- 깨끗한나라 - ST_ EA 조회 ================================================================================-->
	<select id="selectEa" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT EAID
			     	   , BIZ
			     	   , LOT
			     	   , CASEID
			     	   , SRCCASEID
			     	   , SN
			     	   , DSUSEYN
			     	   , RGSDE
			     	   , RGSUSR
			     	   , UPDDE
			     	   , UPDUSR
			     	   , EXTCOL01
			     	   , EXTCOL02
			     	   , EXTCOL03
			     	   , EXTCOL04
			     	   , EXTCOL05
			     	   , EXTCOL06
			     	   , EXTCOL07
			     	   , EXTCOL08
			     	   , EXTCOL09
			     	   , EXTCOL10
			   FROM ST_EA
			 WHERE EAID = #{eaid}
			      AND BIZ =#{biz}
        ]]>
	</select>
	  
    <!--  깨끗한나라 - ST_EA 생성  -->
    <insert id="insertEa" parameterType="egovMap" >
		<![CDATA[
				INSERT 
				    INTO ST_EA 
				SELECT EAID						/* EAID */
						  , BIZ						/* BIZ */
					      , LOT						/* LOT */
						  , CASEID					/* CASEID */
						  , '*'							/* SRCCASEID */
						  , '*'							/* SN */
						  , 'N'						/* DSUSEYN */
						  , GETDATE()			/* RGSDE */
						  , RGSUSR				/* RGSUSR */
						  , GETDATE()			/* UPDDE */
						  , UPDUSR				/* UPDUSR */
						  , EXTCOL01				/* EXTCOL01 */
						  , EXTCOL02				/* EXTCOL02 */
						  , EXTCOL03				/* EXTCOL03 */
						  , EXTCOL04				/* EXTCOL04 */
						  , EXTCOL05				/* EXTCOL05 */
						  , RCPTQTY				/* EXTCOL06 */
						  , WT						/* EXTCOL07 */
						  , EXTCOL08				/* EXTCOL08 */
						  , EXTCOL09				/* EXTCOL09 */
						  , EXTCOL10				/* EXTCOL10 */
						  , FLOOR((785.48 * (RCPTQTY * RCPTQTY - 334.8 * 334.8) * #{thick} / 10000000))
			      FROM RC_RCPTASGN
				WHERE RCPTNO=#{rcptno}
					 AND RCPTSN=#{rcptsn}
					 AND ASGNNO=#{asgnno}
				     AND DC=#{dc}
				     AND BIZ=#{biz}
		]]>
    </insert>
    
    <!--  깨끗한나라 - ST_EA 수정  -->
	<update id="updateEa" parameterType="map">
		<![CDATA[
				UPDATE ST_EA
					  SET LOT=#{lot}
						   , CASEID = #{caseid}
						   , SRCCASEID = '*'
						   , SN = '*'
						   , DSUSEYN = 'N'
						   , UPDDE = GETDATE()
						   , UPDUSR = #{updusr}
						   , EXTCOL01 = #{extcol01}
						   , EXTCOL02 = #{extcol02}
						   , EXTCOL03 = #{extcol03}
						   , EXTCOL04 = #{extcol04}
						   , EXTCOL05 = #{extcol05}
						   , EXTCOL06 = #{rcptqty}
						   , EXTCOL07 = #{wt}
						   , EXTCOL08 = #{extcol08}
						   , EXTCOL09 = #{extcol09}
						   , EXTCOL10 = #{extcol10}
						   , EXTCOL11 = FLOOR((785.48 * (#{rcptqty} * #{rcptqty} - 334.8 * 334.8) * #{thick} / 10000000))
					
					WHERE EAID=#{eaid}
						AND BIZ=#{biz}
		]]>
    </update>

    <!-- (전략) 재고입력 -->
	<insert id="insertStokxStg" parameterType="map">
		<![CDATA[
			INSERT
			  INTO ST_STOK (LOT, PLTID, CASEID, EAID, SKU, PACKUNIT, LOC, GRAD, CLIENT, DC, BIZ, PLANQTY, INSPQTY, STOKQTY, RESVQTY, ALLCQTY, PICKQTY, LOADQTY, ODERQTY, TRNSQTY
						  , EXTCOL01, EXTCOL02, EXTCOL03, EXTCOL04, EXTCOL05)
			VALUES (#{lot}
			             , #{pltid}
			             , #{caseid}
			             , #{eaid}
			             , #{sku}
			             , #{packunit}
			             , #{loc}
			             , #{grad}
			             , #{client}
			             , #{dc}
			             , #{biz}
			             , #{qty} * ISNULL(#{stokplanqtysgn}, 0)
			             , #{qty} * ISNULL(#{stokinspqtysgn}, 0)
			             , #{qty} * ISNULL(#{stokstokqtysgn}, 0)
			             , #{qty} * ISNULL(#{stokresvqtysgn}, 0)
			             , #{qty} * ISNULL(#{stokallcqtysgn}, 0)
			             , #{qty} * ISNULL(#{stokpickqtysgn}, 0)
			             , #{qty} * ISNULL(#{stokloadqtysgn}, 0)
			             , #{qty} * ISNULL(#{stokoderqtysgn}, 0)
			             , #{qty} * ISNULL(#{stoktrnsqtysgn}, 0)
			             , CASE WHEN #{stokstokqtysgn} IS NOT NULL AND #{stokstokqtysgn} = '1' AND CHARINDEX('A', #{loc}) = 1  THEN (SELECT COUNT(*)+1 FROM ST_STOK WHERE LOC = #{loc}) ELSE 0 END
			             , 0
			             , 0
			             , CASE WHEN #{stokstokqtysgn} IS NOT NULL AND #{stokstokqtysgn} = '1' THEN CONVERT(CHAR(19), getDate(), 120) ELSE  #{extcol04} END
			             , #{extcol05})
		]]>
    </insert>
    	
	<!-- (전략) 재고수정 -->
	<update id="updateStokxStg" parameterType="map">
		<![CDATA[
			UPDATE ST_STOK
			   SET PLANQTY = PLANQTY + (#{qty} * ISNULL(#{stokplanqtysgn}, 0))
			     , INSPQTY = INSPQTY + (#{qty} * ISNULL(#{stokinspqtysgn}, 0))
			     , STOKQTY = STOKQTY + (#{qty} * ISNULL(#{stokstokqtysgn}, 0))
			     , RESVQTY = RESVQTY + (#{qty} * ISNULL(#{stokresvqtysgn}, 0))
			     , ALLCQTY = ALLCQTY + (#{qty} * ISNULL(#{stokallcqtysgn}, 0))
			     , PICKQTY = PICKQTY + (#{qty} * ISNULL(#{stokpickqtysgn}, 0))
			     , LOADQTY = LOADQTY + (#{qty} * ISNULL(#{stokloadqtysgn}, 0))
			     , ODERQTY = ODERQTY + (#{qty} * ISNULL(#{stokoderqtysgn}, 0))
			     , TRNSQTY = TRNSQTY + (#{qty} * ISNULL(#{stoktrnsqtysgn}, 0))
		]]>
			     , EXTCOL01 = CASE WHEN #{stokstokqtysgn} IS NOT NULL AND #{stokstokqtysgn} = '1' AND CHARINDEX('A', #{loc}) = 1  THEN (SELECT COUNT(*)+1 FROM ST_STOK WHERE LOC = #{loc} AND STOKQTY > 0) ELSE 0 END
			     , EXTCOL04 = CASE WHEN #{stokstokqtysgn} IS NOT NULL AND #{stokstokqtysgn} = '1' THEN CONVERT(CHAR(19), getDate(), 120) ELSE EXTCOL04 END
			     
        <![CDATA[			     
			 WHERE LOT = #{lot}
			   AND PLTID = #{pltid}
			   AND CASEID = #{caseid}
			   AND EAID = #{eaid}
			   AND SKU = #{sku}
			   AND PACKUNIT = #{packunit}
			   AND LOC = #{loc}
			   AND CLIENT = #{client}
			   AND DC = #{dc}
			   AND BIZ = #{biz}
		]]>
    </update>
    
    <!-- 이동완료 대상조회 ======================================================================================== -->
	<select id="selectStokForMvComptList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT A.LOT
			     , A.PLTID AS FRPLTID
			     , A.PLTID AS TOPLTID
			     , A.CASEID
			     , A.EAID
			     , A.PACKUNIT
			     , A.GRAD
			     , A.CLIENT
			     , A.DC
			     , A.BIZ
			     , A.STOKQTY
			     , A.STOKQTY - (A.RESVQTY + A.ALLCQTY + A.PICKQTY + A.LOADQTY) AS CANSTOKQTY /*가용재고*/
			     , B.RCPTDE
			     , C.SKU
			     , C.SKUNM
			     , D.LOC AS FRLOC
			     , D.LOCNM AS FRLOCNM
			     
			  FROM ST_STOK A
			     , ST_LOT B
			     , SD_SKU C
			     , SD_LOC D
			     , SD_ZONE E
			     
			 WHERE A.LOT = B.LOT
			   AND A.BIZ = B.BIZ
			   AND A.SKU = C.SKU
			   AND A.CLIENT = C.CLIENT
			   AND A.BIZ = C.BIZ
			   AND A.LOC = D.LOC
			   AND A.DC = D.DC
			   AND A.BIZ = D.BIZ
			   AND D.ZONE = E.ZONE
			   AND D.DC = E.DC
			   AND D.BIZ = E.BIZ
			   AND A.STOKQTY > 0
			   AND A.BIZ = #{biz}
			   AND A.DC = #{dc}
			   AND A.CLIENT = #{client}
		]]>
		<if test="sku != null and sku !=''">
			   AND A.SKU = #{sku}
		</if>
		<if test="lot != null and lot !=''">
			   AND A.LOT = #{lot}
		</if>
		<if test="pltid != null and pltid !=''">
			   AND A.PLTID = #{pltid}
		</if>
		<if test="loc != null and loc !=''">
			   AND D.LOC = #{loc}
		</if>
		<if test="zone != null and zone !=''">
			   AND E.ZONE = #{zone}
		</if>
			 ORDER BY A.SKU, A.LOT, A.PLTID, A.LOC
	</select>

    <!-- 깨끗한나라 - 품목별 재고 조회 ======================================================================================== -->
	<select id="selectSkuxStokList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT SKU																							/* 품목 */
			           , PAPKND																					/* 지종 */
			           , (SELECT CDNM 
			                 FROM SD_CD 
			                WHERE BIZ=X.BIZ 
			                     AND CD=X.PAPKND 
			                     AND CDGRP='PaPKndTp') 				AS PAPKNDNM				/* 지종명 */
			           , AVGWT																						/* 평량 */
			           , RLBT																						/* 지폭(mm) */
			           , STOKQTY																					/* 재고량 */
			           , ALLCQTY																					/* 할당량 */
			           , CANSTOKQTY																			/* 가용량 */
			  FROM (SELECT BIZ
			  						, SKU
								    , SKUCTGR 								AS PAPKND
								    , WT 											AS AVGWT
								    , HG 											AS RLBT
								    , SUM(STOKQTY) 						AS STOKQTY
								    , SUM(ALLCQTY) 						AS ALLCQTY
								    , SUM(STOKQTY - ALLCQTY) 	AS CANSTOKQTY
					 	    FROM (SELECT A.BIZ
										          , A.SKU
										          , B.SKUCTGR
										          , B.WT
										          , B.HG
										          , (CASE WHEN A.STOKQTY > 0 THEN (CASE WHEN #{qtytype} = 'roll' THEN A.STOKQTY		--ROLL
													   															    WHEN #{qtytype} = 'mt' THEN C.EXTCOL06	--실적권치수
													  															    WHEN #{qtytype} = 'wt' THEN C.EXTCOL07		--중량
												   	   													  END) 
							 								  ELSE 0
						 							  END) AS STOKQTY
										          , (CASE WHEN A.ALLCQTY > 0 THEN (CASE WHEN #{qtytype} = 'roll' THEN A.ALLCQTY		--ROLL
													   															   WHEN #{qtytype} = 'mt' THEN C.EXTCOL06	    --실적권치수
													  															   WHEN #{qtytype} = 'wt' THEN C.EXTCOL07		--중량
												   	   													  END) 
							 								  ELSE 0
						 							  END) AS ALLCQTY
							          	    FROM ST_STOK A
							             			, SD_SKU B
					             					, ST_EA C
					         WHERE A.SKU = B.SKU
					           	  AND A.CLIENT = B.CLIENT
					           	  AND A.BIZ = B.BIZ
					           	  
					           	  AND A.EAID = C.EAID
					           	  AND A.BIZ = C.BIZ
					           
					           	  AND A.DC = #{dc}
					           	  AND A.CLIENT = #{client}
					           	  AND A.BIZ = #{biz}
					           	  
					           	  AND A.STOKQTY > 0
		]]>
		<if test="papknd != null and papknd != ''">
                                  AND B.SKUCTGR = #{papknd}
		</if>
		<if test="avgwt != null and avgwt != ''">
                                  AND B.WT = #{avgwt}
		</if>
		<if test="sku != null and sku !=''">
                                  AND A.SKU = #{sku}
		</if>

		<![CDATA[ 
							           ) A
                              GROUP BY BIZ, SKU, SKUCTGR, WT, HG
					    ) X
			   ORDER BY SKU
        ]]>
	</select>
	
	    <!-- 깨끗한나라 - 품목별 재고 - 상세재고 조회 -->
	<select id="selectSkuxStokDtList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT A.EAID															/* 밀롤번호 */		
				       , A.LOT															/* 밀롤LOT ID */
					   , E.RCPTDE													/* 입고일 */
					   , D.EXTCOL09						AS RLRLBT			/* 실지폭 */
					   , E.EXTCOL04 					AS STD					/* 규격 */
					   , D.EXTCOL02						AS MAEQTY			/* 속당매수 */
					   , D.EXTCOL03						AS SOKQTY			/* 속수 */
					   , D.EXTCOL06						AS RSLTLT			/* 실적권치수(m) */
					   , D.EXTCOL07						AS RSLTWT			/* 실적중량(kg) */
					   , H.AREANM													/* 적치지역 */
					   , F.LOCNM														/* 적치위치 */
					   , A.EXTCOL01						AS PUTWSTD			/* 적치단 */
					   , A.EXTCOL04 					AS PUTWTIME		/* 적치시간 */
					   , I.DUTYNM						 	AS MVTP				/* 이동구분 */
					   , J.CDNM 							AS MVTY				/* 이동유형 */

               FROM ST_STOK A LEFT OUTER JOIN ST_MVORDR B ON A.LOT = B.FRLOT
                                                                                          AND A.PLTID = B.FRPLTID
                                                                                          AND A.CASEID = B.FRCASEID
                                                                                          AND A.SKU = B.SKU
                                                                                          AND A.PACKUNIT = B.PACKUNIT
                                                                                          AND A.LOC = B.FRLOC
                                                                                          AND A.GRAD = B.GRAD
                                                                                          AND A.CLIENT = B.CLIENT
                                                                                          AND A.DC = B.DC
                                                                                          AND A.BIZ = B.BIZ
                                                                                          AND B.STAT = '51'
                                           LEFT OUTER JOIN ST_MVHD C ON B.MVNO = C.MVNO
                                                                                       AND B.DC = C.DC
                                                                                       AND B.BIZ = C.BIZ
                                           LEFT OUTER JOIN SD_BIZDUTY I ON C.MVTP = I.DUTYCD
                                                                                       AND C.BIZ = I.BIZ
                                                                                       AND I.DUTYTY = 'MOVE'
                                           LEFT OUTER JOIN SD_CD J ON C.MVTY = J.CD
                                                                                       AND C.BIZ = J.BIZ
                                                                                       AND J.CDGRP = 'MvTy'
				     , ST_EA D
				     , ST_LOT E
				     , SD_LOC F
					 , SD_ZONE G
					 , SD_AREA H
					 
					 , SD_SKU K
				
				 WHERE A.EAID = D.EAID
				   AND A.BIZ = D.BIZ
				
				   AND A.LOT = E.LOT
				   AND A.BIZ = E.BIZ
				
				   AND A.BIZ =  F.BIZ
				   AND A.DC = F.DC
				   AND A.LOC = F.LOC
				
				   AND F.ZONE = G.ZONE
				   AND F.DC = G.DC
				   AND F.BIZ = G.BIZ
				
				   AND G.AREA = H.AREA
				   AND G.DC = H.DC
				   AND G.BIZ = H.BIZ
				
				   AND A.SKU = K.SKU
				   AND A.CLIENT = K.CLIENT
				   AND A.BIZ = K.BIZ
				
				   AND A.DC = #{dc}
				   AND A.CLIENT = #{client}
				   AND A.BIZ = #{biz}
				   AND A.STOKQTY > 0 
		]]>
		<if test="sku != null and sku !=''">
			           AND A.SKU = #{sku}
		</if>
		<if test="loc != null and loc !=''">
				       AND F.LOC = #{loc}
		</if>
		<if test="zone != null and zone !=''">
				       AND G.ZONE = #{zone}
		</if>
		<if test="area != null and area !=''">
				       AND H.AREA = #{area}
		</if>
		<if test="papknd != null and papknd !=''">
				       AND K.SKUCTGR = #{papknd}
		</if>
		<if test="avgwt != null and avgwt !=''">
				       AND K.WT = #{avgwt}
		</if>
		ORDER BY A.EAID
	</select>

	<!-- 깨끗한나라 - 속성별 재고 조회 -->
	<select id="selectAtrbxStokList" parameterType="map" resultType="egovMap">
        <![CDATA[
            SELECT K.SKU																				/* 품목 */
                       , A.EAID																				/* 밀롤번호 */
                       , A.LOT																				/* 밀롤LOT ID */
                       , K.SKUCTGR									ASPAPKND					/* 지종 */
                       , (SELECT CDNM 
                             FROM SD_CD 
                           WHERE BIZ=K.BIZ 
                                AND CD=K.SKUCTGR 
                                AND CDGRP='PaPKndTp') 		AS PAPKNDNM				/* 지종명 */
                       , K.WT 											AS AVGWT						/* 평량 */
                       , E.RCPTDE																		/* 입고일 */
                       , K.HG											AS RLBT						/* 지폭 */
                       , D.EXTCOL09									AS RLRLBT					/* 실지폭 */
                       , D.EXTCOL06									AS RSLTLT					/* 실적권치수(m) */
                       , D.EXTCOL07									AS RSLTWT					/* 실적중량(kg) */
                       , H.AREANM																		/* 적치지역 */
                       , F.LOCNM																			/* 적치위치 */
                       , A.EXTCOL01 								AS PUTWSTD					/* 적치단 */
                       , A.EXTCOL04 								AS PUTWTIME				/* 적치시간 */
                       , I.DUTYNM 									AS MVTP						/* 이동구분 */
                       , J.CDNM 										AS MVTY						/* 이동유형 */
                       , E.LOTATRB04 								AS STD							/* 규격 */
                       , D.EXTCOL01 								AS REAM						/* Ream/Pallet(R) */
                       , D.EXTCOL04 								AS SEQ							/* SEQ */
                       , D.EXTCOL02 								AS MAEQTY					/* 속당매수 */
                       , D.EXTCOL03 								AS SOKQTY					/* 속수 */
                       , E.LOTATRB05								AS JRMC						/* J/R호기 */
                       , E.MFRLINE									AS MRMC						/* M/R호기 */
                       , E.LOTATRB06								AS SLTMC						/* 재단호기 */
                       , E.LOTATRB07								AS PACKTP					/* 포장타입 */
                       , E.LOTATRB08								AS CUST						/* 거래처 */
                       , E.EXTCOL01 								AS RLBTSN					/* 지폭순번 */
                       , D.EXTCOL10									AS PRODDE					/* 생산일 */
                       , E.WRKTEM																		/* 반 */
                       , E.WRKUSR																		/* 작업자 */
                       , E.EXTCOL02 								AS SONO						/* 판매번호 */
                       , E.EXTCOL04 								AS ORDRDESC				/* 지시사항 */
                       , E.EXTCOL05 								AS RM							/* 비고 */

               FROM ST_STOK A LEFT OUTER JOIN ST_MVORDR B ON A.LOT = B.FRLOT
                                                                                          AND A.PLTID = B.FRPLTID
                                                                                          AND A.CASEID = B.FRCASEID
                                                                                          AND A.SKU = B.SKU
                                                                                          AND A.PACKUNIT = B.PACKUNIT
                                                                                          AND A.LOC = B.FRLOC
                                                                                          AND A.GRAD = B.GRAD
                                                                                          AND A.CLIENT = B.CLIENT
                                                                                          AND A.DC = B.DC
                                                                                          AND A.BIZ = B.BIZ
                                                                                          AND B.STAT = '51'
                                           LEFT OUTER JOIN ST_MVHD C ON B.MVNO = C.MVNO
                                                                                       AND B.DC = C.DC
                                                                                       AND B.BIZ = C.BIZ
                                           LEFT OUTER JOIN SD_BIZDUTY I ON C.MVTP = I.DUTYCD
                                                                                       AND C.BIZ = I.BIZ
                                                                                       AND I.DUTYTY = 'MOVE'
                                           LEFT OUTER JOIN SD_CD J ON C.MVTY = J.CD
                                                                                       AND C.BIZ = J.BIZ
                                                                                       AND J.CDGRP = 'MvTy'
                       , ST_EA D
                       , ST_LOT E
                       , SD_LOC F
                       , SD_ZONE G
                       , SD_AREA H

                       , SD_SKU K
 
             WHERE A.EAID = D.EAID
                  AND A.BIZ = D.BIZ
  
                  AND A.LOT = E.LOT
                  AND A.BIZ = E.BIZ
  
                  AND A.BIZ =  F.BIZ
                  AND A.DC = F.DC
                  AND A.LOC = F.LOC
  
                  AND F.ZONE = G.ZONE
                  AND F.DC = G.DC
                  AND F.BIZ = G.BIZ
  
                  AND G.AREA = H.AREA
                  AND G.DC = H.DC
                  AND G.BIZ = H.BIZ
                  
                  AND A.SKU = K.SKU
                  AND A.CLIENT = K.CLIENT
                  AND A.BIZ = K.BIZ
                  
                  AND A.DC = #{dc}
                  AND A.CLIENT = #{client}
                  AND A.BIZ = #{biz}
                  AND A.STOKQTY > 0
		]]>
		<if test="eaid != null and eaid !=''">
                  AND A.EAID LIKE + '%' +  UPPER(#{eaid}) + '%' 
		</if>
		<if test="lot != null and lot !=''">
                  AND A.LOT LIKE + '%' +  UPPER(#{lot}) + '%'
		</if>
		<if test="papknd != null and papknd != ''">
                  AND K.SKUCTGR = #{papknd}
		</if>
		<if test="avgwt != null and avgwt !=''">
                  AND K.WT = #{avgwt}
		</if>
		<if test="sku != null and sku !=''">
                  AND K.SKU = #{sku}
		</if>
		<if test="rcptde != null and rcptde !=''">
                  AND E.RCPTDE = #{rcptde}
		</if>
		<![CDATA[ 
			  ORDER BY SKU
        ]]>
    </select>
	
	<!-- 깨끗한나라 - 위치별 재고 조회 -->
	<select id="selectLocxStokList" parameterType="map" resultType="egovMap">
		<![CDATA[
			SELECT AREA
					   , AREANM
					   , ZONE
					   , ZONENM
					   , LOC
					   , LOCNM
					   , SKU
					   , PAPKND																				/* 지종 */
					   , (SELECT CDNM 
                             FROM SD_CD 
                           WHERE BIZ=X.BIZ 
                                AND CD=X.PAPKND 
                                AND CDGRP='PaPKndTp') 				AS PAPKNDNM			/* 지종명  */
					   , AVGWT																					/* 평량 */
					   , RLBT																					/* 지폭(mm) */
					   , PLANQTY																				/* 예정량 */
					   , STOKQTY																				/* 재고량 */
					   , ALLCQTY																				/* 할당량 */		
					   , CANSTOKQTY																		/* 가용량 */

			   FROM (SELECT BIZ
			  			 			 , AREA
			  			 			 , AREANM
			  			 			 , ZONE
			  			 			 , ZONENM
			  			 			 , LOC
			  			 			 , LOCNM
			  			 			 , SKU
			  			 			 , SKUCTGR 								AS PAPKND
			  			 			 , WT 										AS AVGWT
			  			 			 , HG 										AS RLBT
			  			 			 , SUM(PLANQTY) 						AS PLANQTY
			  			 			 , SUM(STOKQTY) 						AS STOKQTY
			  			 			 , SUM(ALLCQTY) 						AS ALLCQTY 
			  			 			 , SUM(STOKQTY-ALLCQTY) 		AS CANSTOKQTY

					  		 FROM (SELECT A.BIZ
								 				   , F.AREA
								 				   , F.AREANM
								 				   , E.ZONE
								 				   , E.ZONENM
								 				   , A.LOC
								 				   , D.LOCNM
								 				   , A.SKU
								 				   , B.SKUCTGR	--지종
								 				   , B.WT			--평량
								 				   , B.HG			--지폭
								 				   , (CASE WHEN A.PLANQTY > 0 THEN (CASE WHEN #{qtytype}='roll' THEN A.PLANQTY		--ROLL
													   	                                                          WHEN #{qtytype}='mt' THEN C.EXTCOL06	--실적권치수
													   	                                                          WHEN #{qtytype}='wt' THEN C.EXTCOL07		--중량
													   	                                                  END) 
													   	        ELSE 0
						                               END) AS PLANQTY
								 				   , (CASE WHEN A.STOKQTY > 0 THEN (CASE WHEN #{qtytype}='roll' THEN A.STOKQTY		--ROLL
													   	                                                          WHEN #{qtytype}='mt' THEN C.EXTCOL06	--실적권치수
													   	                                                          WHEN #{qtytype}='wt' THEN C.EXTCOL07		--중량
													   	                                                  END) 
													   	        ELSE 0
						                               END) AS STOKQTY
								 				   , (CASE WHEN A.ALLCQTY > 0 THEN (CASE WHEN #{qtytype}='roll' THEN A.ALLCQTY		--ROLL
													   	                                                          WHEN #{qtytype}='mt' THEN C.EXTCOL06	--실적권치수
													   	                                                          WHEN #{qtytype}='wt' THEN C.EXTCOL07		--중량
													   	                                                 END) 
													   	        ELSE 0
						                               END) AS ALLCQTY
 
                                           FROM ST_STOK A
                                                   , SD_SKU B
                                                   , ST_EA C
                                                   , SD_LOC D
                                                   , SD_ZONE E
                                                   , SD_AREA F

                                         WHERE A.SKU = B.SKU
                                              AND A.CLIENT = B.CLIENT
                                              AND A.BIZ = B.BIZ
					           	  
                                              AND A.EAID = C.EAID
                                              AND A.BIZ = C.BIZ

                                              AND A.BIZ = D.BIZ
                                              AND A.DC = D.DC
                                              AND A.LOC = D.LOC
				
                                              AND D.ZONE = E.ZONE
                                              AND D.DC = E.DC
                                              AND D.BIZ = E.BIZ
				
                                              AND E.AREA = F.AREA
                                              AND E.DC = F.DC
                                              AND E.BIZ = F.BIZ
							   
                                              AND A.DC = #{dc} 
                                              AND A.CLIENT = #{client}
                                              AND A.BIZ = #{biz}
                                              AND (A.STOKQTY > 0 OR A.PLANQTY > 0)
		]]>
		<if test="loc != null and loc !=''">
                                             AND D.LOC = #{loc}
		</if>
		<if test="zone != null and zone !=''">
                                             AND E.ZONE = #{zone}
		</if>
		<if test="area != null and area !=''">
                                             AND F.AREA = #{area}
		</if>
		<![CDATA[
                                                  ) A	 
		                                 GROUP BY BIZ, AREA, AREANM, ZONE, ZONENM, LOC, LOCNM, SKU, SKUCTGR, WT, HG
                                       ) X
                              ORDER BY AREA, ZONE, LOC, SKU
		]]>
	</select>
	
    <!-- 깨끗한나라 - 위치별 재고 - 상세재고 조회 -->
	<select id="selectLocxStokDtList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT A.EAID															/* 밀롤번호 */		
				       , A.LOT															/* 밀롤LOT ID */
					   , E.RCPTDE													/* 입고일 */
					   , D.EXTCOL09						AS RLRLBT			/* 실지폭 */
					   , E.EXTCOL04 					AS STD					/* 규격 */
					   , D.EXTCOL02						AS MAEQTY			/* 속당매수 */
					   , D.EXTCOL03						AS SOKQTY			/* 속수 */
					   , D.EXTCOL06						AS RSLTLT			/* 실적권치수(m) */
					   , D.EXTCOL07						AS RSLTWT			/* 실적중량(kg) */
					   , H.AREANM													/* 적치지역 */
					   , F.LOCNM														/* 적치위치 */
					   , A.EXTCOL01						AS PUTWSTD			/* 적치단 */
					   , A.EXTCOL04 					AS PUTWTIME		/* 적치시간 */
					   , I.DUTYNM						 	AS MVTP				/* 이동구분 */
					   , J.CDNM 							AS MVTY				/* 이동유형 */
					   , (CASE WHEN A.PLANQTY > 0 THEN '입고예정'
					              WHEN (A.PLANQTY = 0 AND A.ALLCQTY = 0) THEN '보관'
					              WHEN A.ALLCQTY > 0 THEN '작업중'
					       END) AS STOKSTAT									/* 재고상태 */

               FROM ST_STOK A LEFT OUTER JOIN ST_MVORDR B ON A.LOT = B.FRLOT
                                                                                          AND A.PLTID = B.FRPLTID
                                                                                          AND A.CASEID = B.FRCASEID
                                                                                          AND A.SKU = B.SKU
                                                                                          AND A.PACKUNIT = B.PACKUNIT
                                                                                          AND A.LOC = B.FRLOC
                                                                                          AND A.GRAD = B.GRAD
                                                                                          AND A.CLIENT = B.CLIENT
                                                                                          AND A.DC = B.DC
                                                                                          AND A.BIZ = B.BIZ
                                                                                          AND B.STAT = '51'
                                           LEFT OUTER JOIN ST_MVHD C ON B.MVNO = C.MVNO
                                                                                       AND B.DC = C.DC
                                                                                       AND B.BIZ = C.BIZ
                                           LEFT OUTER JOIN SD_BIZDUTY I ON C.MVTP = I.DUTYCD
                                                                                       AND C.BIZ = I.BIZ
                                                                                       AND I.DUTYTY = 'MOVE'
                                           LEFT OUTER JOIN SD_CD J ON C.MVTY = J.CD
                                                                                       AND C.BIZ = J.BIZ
                                                                                       AND J.CDGRP = 'MvTy'
				     , ST_EA D
				     , ST_LOT E
				     , SD_LOC F
					 , SD_ZONE G
					 , SD_AREA H
					 
					 , SD_SKU K
				
				 WHERE A.EAID = D.EAID
				   AND A.BIZ = D.BIZ
				
				   AND A.LOT = E.LOT
				   AND A.BIZ = E.BIZ
				
				   AND A.BIZ =  F.BIZ
				   AND A.DC = F.DC
				   AND A.LOC = F.LOC
				
				   AND F.ZONE = G.ZONE
				   AND F.DC = G.DC
				   AND F.BIZ = G.BIZ
				
				   AND G.AREA = H.AREA
				   AND G.DC = H.DC
				   AND G.BIZ = H.BIZ
				
				   AND A.SKU = K.SKU
				   AND A.CLIENT = K.CLIENT
				   AND A.BIZ = K.BIZ
				
				   AND A.DC = #{dc}
				   AND A.CLIENT = #{client}
				   AND A.BIZ = #{biz}
				   AND (A.STOKQTY > 0 OR A.PLANQTY > 0)
		]]>
		<if test="sku != null and sku !=''">
			           AND A.SKU = #{sku}
		</if>
		<if test="loc != null and loc !=''">
				       AND F.LOC = #{loc}
		</if>
		<if test="zone != null and zone !=''">
				       AND G.ZONE = #{zone}
		</if>
		<if test="area != null and area !=''">
				       AND H.AREA = #{area}
		</if>
		<if test="papknd != null and papknd !=''">
				       AND K.SKUCTGR = #{papknd}
		</if>
		<if test="avgwt != null and avgwt !=''">
				       AND K.WT = #{avgwt}
		</if>
	</select>

	<!-- 작업정보 조회 -->
	<select id="selectWorkInfoList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT A.ODERNO	AS WORKNO
			     , A.ODERTP	AS WORKTP
			     , CASE WHEN A.SOCUST = A.DVCUST THEN
			       (SELECT CUSTNM FROM SD_CUST WHERE CUST = A.SOCUST AND CUSTTP = A.SOCUSTTP AND CLIENT = A.CLIENT AND BIZ = A.BIZ)
			       ELSE
                   (SELECT CUSTNM FROM SD_CUST WHERE CUST = A.SOCUST AND CUSTTP = A.SOCUSTTP AND CLIENT = A.CLIENT AND BIZ = A.BIZ)
                   + '/' +	 (SELECT CUSTNM FROM SD_CUST WHERE CUST = A.DVCUST AND CUSTTP = A.DVCUSTTP AND CLIENT = A.CLIENT AND BIZ = A.BIZ)
                   END AS WORKDESC
                  , SUM(B.ALLCQTY) AS WORKQTY
                  , C.MFRNO
			      , C.RCPTDE
			      , C.VLDDE
			      , B.GRAD
			      , C.LOTATRB10
			  FROM OD_ODERHD A
			     , OD_ODERASGN B
			     , ST_LOT C
			 WHERE A.ODERNO = B.ODERNO
			   AND A.DC = B.DC
			   AND A.BIZ = B.BIZ
			   AND A.CLIENT = B.CLIENT
			   AND B.TOLOT = C.LOT
   			   AND B.BIZ = C.BIZ
			   AND B.STAT IN ('10', '20', '25')
			   AND C.RCPTDE BETWEEN #{strcptde} AND #{edrcptde}
			   AND EXISTS (SELECT DC, BIZ, CLIENT, GRAD, LOT
                                      FROM (SELECT S.DC
														   , S.BIZ
														   , S.CLIENT
														   , S.LOT
														   , S.GRAD /* 등급 */
                                              		FROM ST_STOK S
														   , ST_LOT L
                                             	  WHERE S.LOT = L.LOT
		                                               AND S.BIZ = L.BIZ
		                                               AND (S.ALLCQTY > 0 OR S.PICKQTY > 0)
		                                               AND S.DC = #{dc}
		                                               AND S.CLIENT = #{client}
		                                               AND S.BIZ = #{biz}
		]]>
		<if test="sku != null and sku !=''">
                                            		   AND S.SKU = #{sku}
		</if>
		<if test="mfrno != null and mfrno !=''">
			                             		       AND L.MFRNO = #{mfrno}
		</if>
		<if test="rcptde != null and rcptde !=''">
			                                		   AND L.RCPTDE = #{rcptde}
		</if>
		<if test="vldde != null and vldde !=''">
			                                 		   AND L.VLDDE = #{vldde}
		</if>
		<if test="spcust != null and spcust != ''">
			                          		           AND L.SPCUST = #{spcust}
		</if>
		<![CDATA[ 
			                         		 GROUP BY S.DC, S.BIZ, S.CLIENT, S.LOT, S.GRAD) X
								   WHERE B.DC = X.DC
										AND B.BIZ = X.BIZ
										AND B.CLIENT = X.CLIENT
										AND B.GRAD = X.GRAD
										AND B.TOLOT = X.LOT
			                                                     )
			 GROUP BY A.ODERNO, A.ODERTP, A.SOCUST, A.SOCUSTTP, A.DVCUST, A.DVCUSTTP, A.CLIENT, A.BIZ, C.MFRNO, C.RCPTDE, C.VLDDE, B.GRAD, C.LOTATRB10
        ]]>
	</select>

	<!-- 창고별 재고 조회 -->
	<select id="selectDcxStokList" parameterType="map" resultType="egovMap">
		<![CDATA[
			SELECT DC
                 , DCNM
			     , SKU
			     , SKUNM
			     , SKUCTGR
			     , SKUCTGRNM
			     
		]]>
		<if test="type != null and type =='stokqty'">
				 , SUM(CASE WHEN DC = 'HJPHS' THEN STOKQTY ELSE 0 END) AS HJPHSQTY

                 , SUM(STOKQTY) AS SUMQTY
		</if>
		<if test="type != null and type =='canstokqty'">
				 , SUM(CASE WHEN DC = 'HJPHS' THEN STOKQTY - (ALLCQTY + PICKQTY + RTNQTY + INQRQTY) ELSE 0 END) AS HJPHSQTY

                 , SUM(STOKQTY - (ALLCQTY + PICKQTY + RTNQTY + INQRQTY)) AS SUMQTY
		</if>
		<![CDATA[ 
			  FROM (SELECT A.DC
			             , (SELECT DCNM FROM SD_DC WHERE BIZ = A.BIZ AND DC = A.DC) AS DCNM
			             , A.CLIENT
			             , A.SKU
			             , B.SKUNM
			             , B.SKUCTGR
			             , ISNULL(C.SKUCTGRNM, B.SKUCTGR) AS SKUCTGRNM
			             , A.STOKQTY
			             , A.ALLCQTY
			             , A.PICKQTY
			             , CASE WHEN A.GRAD = 'R0' THEN A.STOKQTY ELSE 0 END AS RTNQTY
			             , A.RESVQTY AS INQRQTY
			             
			          FROM ST_STOK A
			             , SD_SKU B LEFT OUTER JOIN SD_SKUCTGR C ON B.SKUCTGR = C.SKUCTGR
			           AND B.CLIENT = C.CLIENT
			           AND B.BIZ = C.BIZ
			         WHERE A.SKU = B.SKU
			           AND A.CLIENT = B.CLIENT
			           AND A.BIZ = B.BIZ
			           
			           AND A.CLIENT = #{client}
			           AND A.BIZ = #{biz}) A
			 WHERE 1=1
		]]>
		<if test="skuctgr != null and skuctgr !=''">
			   AND A.SKUCTGR = #{skuctgr}
		</if>
		<if test="sku != null and sku !=''">
			   AND A.SKU = #{sku}
		</if>
		<![CDATA[
			 GROUP BY DC, DCNM, SKU, SKUNM, SKUCTGR, SKUCTGRNM
			 ORDER BY SKUCTGR, SKU
        ]]>
	</select>
	
	<!-- 물류기기재고 목록조회 ======================================================================================== -->
	<select id="selectLgmtStokHdList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT A.CUST
			     , A.CUSTTP
			     , A.CLIENT
			     , A.DC
			     , A.BIZ
			     , A.SKU
			     , (SELECT CUSTNM FROM SD_CUST WHERE CUST = A.CUST AND CUSTTP = A.CUSTTP AND CLIENT = A.CLIENT AND BIZ = A.BIZ) AS CUSTNM
			     , SUM(A.STOKQTY) AS STOKQTY
			     
			  FROM ST_LGMTSTOK A
			 WHERE STOKQTY > 0
			   AND A.CLIENT = #{client}
			   AND A.DC = #{dc}
			   AND A.BIZ = #{biz}
		]]>
		<if test="cust != null and cust != ''">
			   AND A.CUST = #{cust}
		</if>
		     GROUP BY A.CUST, A.CUSTTP, A.CLIENT, A.DC, A.BIZ, A.SKU
	</select>
	
	<!-- 물류기기조정 목록조회 -->
	<select id="selectLgmtStokDtList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT WHDVNO
			     , REFVAL1
			     , WHDVDE

			  FROM ST_LGMTWHDV
			     
			 WHERE CLIENT = #{client}
			   AND DC = #{dc}
			   AND BIZ = #{biz}
			   AND CUST = #{cust}
			   AND CUSTTP = #{custtp}
			   AND SKU = #{sku}
			   
			 ORDER BY WHDVNO, REFVAL1, WHDVDE
		]]>
	</select>
	
	

	<!-- 깨끗한나라 - PDA 재고이동 조회 ================================================================================-->
	<select id="selectPdaMillrollScanForMv" parameterType="map" resultType="egovMap">
        <![CDATA[
           SELECT ST.BIZ
                , ST.DC
                , ST.CLIENT
                , ST.LOT
                , ST.PLTID
                , ST.CASEID
                , ST.EAID
                , ST.SKU
                , ST.PACKUNIT
                , ST.GRAD
                , ST.UOM
                , MV.UOS
                , ST.LOTATRB01
                , ST.LOTATRB01NM           AS LOTATRB01NM
                , ST.LOTATRB02
                , ST.EXTCOL06
                , ST.EXTCOL06              AS PLANQTY        -- 실적권치수, 지시전표의 수량(실적권치수) 값으로 사용
                , ST.EXTCOL06              AS RSLTQTY        -- (ST_MVRSLT 사용용도)
                , ST.EXTCOL07
                , ST.EXTCOL07              AS WT             -- 실적중량, 지시전표의 중량(실적중량) 값으로 사용
                , ST.EXTCOL09
                , ST.LOTATRB04
                , ST.EXTCOL01
                , ST.EXTCOL02
                , ST.EXTCOL03
                , ST.LOTATRB08
                , ST.EXTCOL10
                , ST.LOT
                , MV.ORDRNO
                , MV.ORDRSN
                , MV.MVNO
                , MV.MVSN
                , ISNULL(MV.PLANDE, CONVERT (char(8), getDate(), 112)) AS PLANDE
                , ISNULL(MV.PLANDE, CONVERT (char(8), getDate(), 112)) AS RCPTDE
                , ST.PLANQTY               AS ST_PLANQTY    -- 재고_예정량
                , ST.STOKQTY               AS ST_STOKQTY    -- 재고_재고량
                , ST.ALLCQTY               AS ST_ALLCQTY    -- 재고_할당량
                , ST.WT                    AS ST_WT         -- 재고_중량
                , ST.FRAREA                AS FRAREA        -- 현재지역
                , ST.FRAREANM              AS FRAREANM      -- 현재지역명  
                , ST.LOT                   AS FRLOT
                , ST.PLTID                 AS FRPLTID
                , ST.CASEID                AS FRCASEID
                , ST.EAID                  AS FREAID
                , ST.FRLOC                 AS FRLOC         -- 현재위치
                , ST.FRLOCNM               AS FRLOCNM       -- 현재위치명
                , ST.LOT                   AS TOLOT
                , ST.PLTID                 AS TOPLTID
                , ST.CASEID                AS TOCASEID
                , ST.EAID                  AS TOEAID
                , MV.TOAREA                AS RCMDAREA      -- 권장지역
                , MV.TOLOC                 AS RCMDLOC       -- 권장위치
                , MV.TOLOCNM               AS RCMDLOCNM     -- 권장위치명
                , MV.MVTY                  AS MVTY          -- 이동유형
                , MV.MVTYNM                AS MVTYNM        -- 이동유형명
                , ISNULL(MV.HDREFTP, 'None')   AS HDREFTP
                , ISNULL(MV.HDREFVAL1, '*')   AS HDREFVAL1
                , ISNULL(MV.DTREFVAL1, '*')   AS DTREFVAL1
                , ISNULL(MV.ORDRREFVAL1, '*')   AS ORDRREFVAL1
                , ISNULL(MV.ORDRREFVAL2, '*')   AS ORDRREFVAL2
                , ISNULL(MV.TOLOCEXTCOL01, 'N') AS RCMDLOCEXTCOL01 -- 권장위치 자동처리여부
              FROM (
                    SELECT ST.BIZ
                         , ST.DC
                         , ST.CLIENT
                         , ST.PLTID                 AS PLTID
                         , ST.CASEID                AS CASEID
                         , ST.EAID                  AS EAID          -- 밀롤NO
                         , ST.SKU                   AS SKU
                         , ST.PACKUNIT              AS PACKUNIT
                         , ST.GRAD                  AS GRAD
                         , SKU.UOM
                         , LOT.LOTATRB01            AS LOTATRB01     -- 지종, S12
                         , CD2.CDNM                 AS LOTATRB01NM   -- 지종, S12
                         , LOT.LOTATRB02            AS LOTATRB02     -- 평량, 350,300,450...
                         , EA.EXTCOL06              AS EXTCOL06      -- 실적권치수
                         , EA.EXTCOL07              AS EXTCOL07      -- 실적중량
                         , ISNULL(EA.EXTCOL09, 0)   AS EXTCOL09      -- 실지폭
                         , LOT.LOTATRB04            AS LOTATRB04     -- 규격
                         , EA.EXTCOL01              AS EXTCOL01      -- REAM/PALLET
                         , EA.EXTCOL02              AS EXTCOL02      -- 속당매수(EA)
                         , EA.EXTCOL03              AS EXTCOL03      -- 속수
                         , LOT.LOTATRB08            AS LOTATRB08     -- 거래처
                         , EA.EXTCOL10              AS EXTCOL10      -- 생산일
                         , ST.LOT                   AS LOT           -- 밀롤LOTID
                         , ST.PLANQTY               AS PLANQTY
                         , ST.STOKQTY               AS STOKQTY
                         , ST.ALLCQTY               AS ALLCQTY
                         , ST.WT
                         , ST.PLTID                 AS FRPLTID
                         , ST.LOC                   AS FRLOC
                         , FRLOC.LOCNM              AS FRLOCNM
                         , FRZONE.ZONE              AS FRZONE
                         , FRZONE.ZONENM            AS FRZONENM
                         , FRZONE.AREA              AS FRAREA
                         , FRAREA.AREANM            AS FRAREANM
                         , LOT.RCPTNO
                         , LOT.RCPTSN
                      FROM ST_STOK ST
                      JOIN ST_LOT LOT
                        ON ST.BIZ        = LOT.BIZ
                       AND ST.DC         = LOT.DC 
                       AND ST.CLIENT     = LOT.CLIENT 
                       AND ST.LOT        = LOT.LOT 
                      JOIN ST_EA EA
                        ON ST.BIZ        = EA.BIZ 
                       AND ST.EAID       = EA.EAID
                      JOIN SD_SKU SKU
                        ON LOT.BIZ       = SKU.BIZ
                       AND LOT.CLIENT    = SKU.CLIENT
                       AND LOT.SKU       = SKU.SKU
                      JOIN SD_CD CD2
                        ON CD2.CDGRP     = 'PapKndTp'
                       AND CD2.CD        = LOT.LOTATRB01
                      JOIN SD_LOC FRLOC
                        ON ST.LOC        = FRLOC.LOC
                      JOIN SD_ZONE FRZONE
                        ON FRLOC.ZONE    = FRZONE.ZONE
                      JOIN SD_AREA FRAREA
                        ON FRZONE.AREA   = FRAREA.AREA
                     WHERE ST.EAID       = EA.EAID
                       AND ST.BIZ        = #{biz}
                       AND ST.DC         = #{dc}
                       AND ST.CLIENT     = #{client} 
                       AND ST.EAID       = #{eaid}
                       AND ST.STOKQTY >= 1
                   ) ST
         LEFT JOIN (
                    SELECT HD.MVNO
                         , DT.MVSN
                         , ORDR.ORDRNO
                         , ORDR.ORDRSN
                         , HD.PLANDE
                         , HD.MVTP
                         , HD.MVTY
                         , CD.CDNM                  AS MVTYNM
                         , ORDR.FRLOT
                         , ORDR.TOLOT
                         , ORDR.FRPLTID
                         , ORDR.TOPLTID
                         , ORDR.FRCASEID
                         , ORDR.TOCASEID
                         , ORDR.FREAID
                         , ORDR.TOEAID
                         , ORDR.FRLOC
                         , ORDR.TOLOC
                         , TOLOC.LOCNM              AS TOLOCNM
                         , TOAREA.AREA              AS TOAREA
                         , ORDR.UOS
                         , TOZONE.ZONE              AS TOZONE
                         , TOZONE.ZONENM            AS TOZONENM
                         , TOZONE.AREA              AS FRAREA
                         , TOAREA.AREANM            AS FRAREANM
                         , HD.REFTP                 AS HDREFTP
                         , HD.REFVAL1               AS HDREFVAL1
                         , DT.REFVAL1               AS DTREFVAL1
                         , ORDR.REFVAL1             AS ORDRREFVAL1
                         , ORDR.REFVAL2             AS ORDRREFVAL2
                         , TOLOC.EXTCOL01           AS TOLOCEXTCOL01
                      FROM ST_MVHD HD
                      JOIN ST_MVDT DT
                        ON HD.BIZ      = DT.BIZ
                       AND HD.DC       = DT.DC
                       AND HD.CLIENT   = DT.CLIENT
                       AND HD.MVNO     = DT.MVNO
                      JOIN ST_MVORDR ORDR
                        ON DT.BIZ      = ORDR.BIZ
                       AND DT.DC       = ORDR.DC
                       AND DT.CLIENT   = ORDR.CLIENT
                       AND DT.MVNO     = ORDR.MVNO
                       AND DT.MVSN     = ORDR.MVSN
                      JOIN SD_CD CD
                        ON CD.CDGRP    = 'mvty'
                       AND CD.CD       = HD.MVTY
                      JOIN SD_LOC TOLOC
                        ON ORDR.TOLOC  = TOLOC.LOC
                      JOIN SD_ZONE TOZONE
                        ON TOLOC.ZONE  = TOZONE.ZONE
                      JOIN SD_AREA TOAREA
                        ON TOZONE.AREA = TOAREA.AREA
                     WHERE HD.STAT    != '99'
                       AND DT.STAT    != '99'
                       AND ORDR.STAT  != '99'
                       AND ORDR.STAT  != '50'
                       AND ORDR.BIZ    = #{biz}
                       AND ORDR.DC     = #{dc}
                       AND ORDR.CLIENT = #{client} 
                       AND ORDR.FREAID = #{eaid}
                   ) MV
                ON ST.EAID       = MV.FREAID
        ]]>
	</select>
	

	<!-- 깨끗한나라 - PDA 재고이동, 로케이션 존재 확인 ================================================================================-->
	<select id="selectPdaCheckLoc" parameterType="map" resultType="int">
        <![CDATA[
           SELECT COUNT(*) AS CNT
             FROM SD_LOC
            WHERE LOC = #{loc}
        ]]>
	</select>
	
	<!-- 깨끗한나라 - PDA 재고이동, 권장위치 조회 ================================================================================-->
	<select id="selectPdaRcmdLoc" parameterType="map" resultType="egovMap">
        <![CDATA[
           SELECT ST.EAID                  AS EAID          -- 밀롤NO
                , LOT.LOTATRB01            AS LOTATRB01     -- 지종, S12
                , LOT.LOTATRB02            AS LOTATRB02     -- 평량, 350,300,450...
                , EA.EXTCOL06              AS EXTCOL06      -- 실적권치수
                , ISNULL(EA.EXTCOL09, 0)   AS EXTCOL09      -- 실지폭
                , LOT.LOTATRB04            AS LOTATRB04     -- 규격
                , EA.EXTCOL01              AS EXTCOL01      -- REAM/PALLET
                , EA.EXTCOL02              AS EXTCOL02      -- 속당매수(EA)
                , EA.EXTCOL03              AS EXTCOL03      -- 속수
                , LOT.LOTATRB08            AS LOTATRB08     -- 거래처
                , EA.EXTCOL10              AS EXTCOL10      -- 생산일
                , ST.LOT                   AS LOT           -- 밀롤LOTID
                , ORDR.ORDRNO              AS ORDRNO        -- 판매번호
                , FRZONE.ZONE              AS FRZONE        -- 현재지역
                , FRZONE.ZONENM            AS FRZONENM      -- 현재지역명
                , FRLOC.LOC                AS FRLOC         -- 현재위치
                , FRLOC.LOCNM              AS FRLOCNM       -- 현재위치명
                , ORDR.TOLOC               AS TOLOC         -- 이동위치
                , TOLOC.LOCNM              AS TOLOCNM       -- 이동위치명
                , HD.MVTY                  AS MVTY          -- 이동유형
                , CD.CDNM                  AS MVTYNM        -- 이동유형명
                , TOZONE.ZONE              AS TOZONE        -- 현재지역
                , TOZONE.ZONENM            AS TOZONENM      -- 현재지역명
              FROM ST_STOK ST
              JOIN ST_LOT LOT
                ON ST.BIZ        = LOT.BIZ
               AND ST.DC         = LOT.DC 
               AND ST.CLIENT     = LOT.CLIENT 
               AND ST.LOT        = LOT.LOT 
              JOIN ST_EA EA
                ON ST.BIZ        = EA.BIZ 
               AND ST.EAID       = EA.EAID
              JOIN ST_MVORDR ORDR
                ON EA.EAID       = ORDR.FREAID
               AND ORDR.STAT    != '99'
              JOIN ST_MVHD HD
                ON ORDR.MVNO     = HD.MVNO
              AND HD.STAT       != '99'
              JOIN SD_CD CD
                ON CD.CDGRP      = 'mvty'
               AND CD.CD         = HD.MVTY
              JOIN SD_LOC FRLOC
                ON ORDR.FRLOC    = FRLOC.LOC
              JOIN SD_LOC TOLOC
                ON ORDR.TOLOC    = TOLOC.LOC
              JOIN SD_ZONE FRZONE
                ON FRLOC.ZONE    = FRZONE.ZONE
              JOIN SD_ZONE TOZONE
                ON TOLOC.ZONE    = TOZONE.ZONE
             WHERE ST.BIZ        = #{biz}
               AND ST.DC         = #{dc}
               AND ST.CLIENT     = #{client}
               AND (ST.STOKQTY >= 1 OR ST.PLANQTY >= 1)
               AND ST.EAID       = #{millrollno}
        ]]>
	</select>

</mapper>