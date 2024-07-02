<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="wms.st.MvMapper">

	<!-- 깨끗한나라 - 재고이동 조회(존재유무 확인) ============================================================================ -->
	<select id="selectMvHdExst" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT DISTINCT MVNO
			   FROM ST_MVHD
			 WHERE DC = #{dc}
                  AND BIZ = #{biz}
                  AND CLIENT = #{client}
                  AND REFTP = 'RC_RCPTHD'
                  AND REFVAL1 = #{rcptno}
                  AND STAT = '51'
		]]>	   		   
	</select>
	
	<!-- 깨끗한나라 - 재고이동 조회 -->
	<select id="selectMvHd" parameterType="map" resultType="egovMap">
        <![CDATA[
            SELECT MVNO
                       , DC
                       , BIZ
                       , CLIENT
                       , MVTP
                       , MVTY
                       , DEALDE
                       , PLANDE
                       , MVDE
                       , MVDESC
                       , GRPNO
                       , CUST
                       , CUSTTP
                       , FRSYS
                       , TOSYS
                       , WORKODR
                       , PRIORT
                       , CHRGDEPT
                       , MGR
                       , TRSTAT
                       , STAT
                       , REFTP
                       , REFVAL1
                       , REFVAL2
                       , REFVAL3
                       , ERPSLIPDE
                       , ERPSLIPNO
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

			   FROM ST_MVHD
			 WHERE MVNO =#{mvno} 
                  AND DC = #{dc}
                  AND BIZ = #{biz}
                  AND STAT = '51'
		]]>	   		   
	</select>

	<!-- 깨끗한나라 - 재고이동 생성 -->
	<insert id="insertMvHd" parameterType="map" >
        <![CDATA[
			INSERT 
                INTO ST_MVHD (MVNO, DC, BIZ, CLIENT, MVTP, MVTY, DEALDE, PLANDE, MVDE, FRSYS,
                                        TOSYS, TRSTAT, STAT, REFTP, REFVAL1, 
                                        RGSDE, RGSUSR, UPDDE, UPDUSR )
           VALUES (#{mvno}
                        , #{dc}
                        , #{biz}
                        , #{client}
                        , #{mvtp}
                        , #{mvty}
                        , CONVERT (char(8), getDate(), 112)
                        , CONVERT (char(8), getDate(), 112)
                        , CONVERT (char(8), getDate(), 112)
                        , #{frsys}
            
                        , #{tosys}
                        , #{trstat}
                        , #{stat}
                        , #{reftp}
                        , #{refval1}

                        , getDate()
                        , #{updusr}
                        , getDate()
                        , #{updusr}  )
		]]>
	</insert>
	
	
	<!-- 깨끗한나라 - 재고이동 수정 -->
	<update id="updateMvHd" parameterType="map">
           UPDATE ST_MVHD
              SET UPDDE  = GETDATE()
                , UPDUSR = #{updusr}
                 <if test="stat != null and stat !=''">
                 , STAT   = #{stat}
                 </if>
            WHERE 1=1
              AND MVNO   = #{mvno}
              AND DC     = #{dc}
              AND BIZ    = #{biz}
              AND CLIENT = #{client}
	</update>
	
	<!-- 깨끗한나라 - 재고이동품목 조회(존재유무 확인) ============================================================================ -->
	<select id="selectMvDtExst" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT DISTINCT MVSN
			   FROM ST_MVDT
			 WHERE DC = #{dc}
                  AND BIZ = #{biz}
                  AND CLIENT = #{client}
                  AND REFVAL1 = #{rcptsn}
                  AND MVNO = #{mvno}
                  AND STAT = '51'
		]]>	   		   
	</select>
	
	<!-- 깨끗한나라 - 재고이동품목 조회 -->
	<select id="selectMvDt" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT MVNO
                       , MVSN
                       , BIZ
                       , DC
                       , SKU
                       , CLIENT
                       , PACKUNIT
                       , UOM
                       , UOS
                       , PLANQTY
                       , ORDRQTY
                       , RSLTQTY
                       , WT
                       , TRSTAT
                       , STAT
                       , REFVAL1
                       , REFVAL2
                       , ERPSLIPSN
                       , FRERPWH
                       , TOERPWH
                       , RCPTDE
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
                       , EXTCOL06
                       , EXTCOL07
                       , EXTCOL08
                       , EXTCOL09
                       , EXTCOL10

			   FROM ST_MVDT
			 WHERE MVNO = #{mvno}
			      AND MVSN = #{mvsn}
                  AND BIZ = #{biz}
                  AND DC = #{dc}
                  AND STAT = '51'
		]]>	   		   
	</select>

	<!-- 깨끗한나라 - 재고이동품목 순번 생성 -->		
	<select id="selectMvSnSeq" parameterType="map" resultType="int">
       <![CDATA[
                 SELECT ISNULL((MAX(MVSN) + 1), 1) AS MVSN
                   FROM ST_MVDT
                 WHERE DC = #{dc}
                      AND BIZ= #{biz}
                      AND MVNO = #{mvno}
		]]>	   		   
	</select>
		
	<!-- 깨끗한나라 - 재고이동품목 생성 -->
	<insert id="insertMvDt" parameterType="map" >
        <![CDATA[
			INSERT
                INTO ST_MVDT (MVNO, MVSN, DC, BIZ, CLIENT, SKU, PACKUNIT, UOM, UOS, PLANQTY,
                                        ORDRQTY, RSLTQTY, WT, TRSTAT, STAT, REFVAL1, RCPTDE, RGSDE, RGSUSR, UPDDE, 
                                        UPDUSR)
           VALUES (#{mvno}
                        , #{mvsn}
                        , #{dc}
                        , #{biz}
                        , #{client}
                        , #{sku}
                        , #{packunit}
                        , #{uom}
                        , #{uos}
                        , #{planqty}
                        
                        , #{ordrqty}
                        , #{rsltqty}
                        , #{wt}
                        , #{trstat}
                        , #{stat}
                        , #{refval1}
                        , #{rcptde}
                        , getDate()
                        , #{updusr}
                        , getDate()
                        
                        , #{updusr} )
		]]> 
	</insert>
	
	<!-- 깨끗한나라 - 재고이동품목 수정 -->
	<update id="updateMvDt" parameterType="map">
            UPDATE ST_MVDT
               SET UPDDE  = GETDATE()
                 , UPDUSR = #{updusr}
                 <if test="stat != null and stat !=''">
                 , STAT   = #{stat}
                 </if>
             WHERE MVNO   = #{mvno}
               AND MVSN   = #{mvsn}
               AND DC     = #{dc}
               AND BIZ    = #{biz}
	</update>
	

	<!-- 깨끗한나라 - 재고이동지시 조회 ============================================================================ -->
	<select id="selectMvOrdr" parameterType="map" resultType="egovMap">
        <![CDATA[
				SELECT A.PLANDE
                           , C.ORDRNO
                           , C.ORDRSN
                           , C.DC
                           , C.BIZ
                           , C.SRCORDRSN
                           , C.MVNO
                           , C.MVSN
                           , C.CLIENT
                           , C.SKU
                           , C.PACKUNIT
                           , C.GRAD
                           , C.FRLOT
                           , C.FRPLTID
                           , C.FRCASEID
                           , C.FREAID
                           , C.FRLOC
                           , C.TOLOT
                           , C.TOPLTID
                           , C.TOCASEID
                           , C.TOEAID
                           , C.TOLOC
                           , C.UOS
                           , C.ORDRQTY
                           , C.WT
                           , C.ORDRPORT
                           , C.MSGTY
                           , C.RGSTP
                           , C.TRDT
                           , C.ERRCD
                           , C.ERRMSG
                           , C.TRSTAT
                           , C.STAT
                           , C.REFVAL1
                           , C.REFVAL2
                           , C.RGSDE
                           , C.RGSUSR
                           , C.UPDDE
                           , C.UPDUSR
                           , C.EXTCOL01
                           , C.EXTCOL02
                           , C.EXTCOL03
                           , C.EXTCOL04
                           , C.EXTCOL05

                   FROM ST_MVHD A
                           , ST_MVDT B
                           , ST_MVORDR C
                 WHERE A.MVNO = B.MVNO
                      AND A.DC = B.DC
                      AND A.BIZ = B.BIZ
				
                      AND B.MVNO = C.MVNO
                      AND B.MVSN = C.MVSN
                      AND B.DC = C.DC
                      AND B.BIZ = C.BIZ
				
                      AND A.BIZ = #{biz}
                      AND A.DC = #{dc}
                      AND A.REFTP = 'RC_RCPTHD'
                      AND A.REFVAL1 = #{rcptno}
                      AND A.STAT != '99'
				
                      AND B.REFVAL1 = CONVERT(NUMERIC, #{rcptsn})
                      AND B.STAT != '99'
				
                      AND C.REFVAL1 = CONVERT(NUMERIC, #{asgnno})
                      AND C.STAT = '51'
		]]>	   		   
	</select>

	<!-- 깨끗한나라 - 재고이동지시 조회 (입고적치) -->
	<select id="selectMvOrdrForPutw" parameterType="map" resultType="egovMap">
        <![CDATA[
				SELECT A.PLANDE
				           , A.MVTP
				           , A.MVTY
				           , A.REFVAL1 AS RCPTNO
				           , B.REFVAL1 AS RCPTSN
				           , A.MVDE
				           
                           , C.ORDRNO
                           , C.ORDRSN
                           , C.DC
                           , C.BIZ
                           , C.SRCORDRSN
                           , C.MVNO
                           , C.MVSN
                           , C.CLIENT
                           , C.SKU
                           , C.PACKUNIT
                           , C.GRAD
                           , C.FRLOT
                           , C.FRPLTID
                           , C.FRCASEID
                           , C.FREAID
                           , C.FRLOC
						   , DA.AREA					AS FRAREA
                           , C.TOLOT
                           , C.TOPLTID
                           , C.TOCASEID
                           , C.TOEAID
                           , C.TOLOC
                           , C.UOS
                           , C.ORDRQTY
                           , C.WT
                           , C.ORDRPORT
                           , C.MSGTY
                           , C.RGSTP
                           , C.TRDT
                           , C.ERRCD
                           , C.ERRMSG
                           , C.TRSTAT
                           , C.STAT
                           , C.REFVAL1		AS ASGNNO
                           , C.REFVAL2
                           , C.RGSDE
                           , C.RGSUSR
                           , C.UPDDE
                           , C.UPDUSR
                           , C.EXTCOL01
                           , C.EXTCOL02
                           , C.EXTCOL03
                           , C.EXTCOL04
                           , C.EXTCOL05
                           , ISNULL(DL.EXTCOL01, 'N') AS LOCEXTCOL01

                   FROM ST_MVHD A
                           , ST_MVDT B
                           , ST_MVORDR C LEFT OUTER JOIN SD_LOC DL ON C.FRLOC = DL.LOC
						                                                                       AND C.DC = DL.DC
																                               AND C.BIZ = DL.BIZ
						   , SD_ZONE DZ
						   , SD_AREA DA
                 WHERE A.MVNO = B.MVNO
                      AND A.DC = B.DC
                      AND A.BIZ = B.BIZ
				
                      AND B.MVNO = C.MVNO
                      AND B.MVSN = C.MVSN
                      AND B.DC = C.DC
                      AND B.BIZ = C.BIZ
                      
                      AND DL.ZONE = DZ.ZONE
					  AND DL.DC = DZ.DC
					  AND DL.BIZ = DZ.BIZ

					  AND DZ.AREA = DA.AREA
					  AND DZ.DC = DA.DC
					  AND DZ.BIZ = DA.BIZ
				
                      AND A.BIZ = #{biz}
                      AND A.DC = #{dc}
                      AND A.REFTP = 'RC_RCPTHD'
                      AND A.REFVAL1 = #{rcptno}
                      AND A.STAT != '99'
				
                      AND B.REFVAL1 = CONVERT(NUMERIC, #{rcptsn})
                      AND B.STAT != '99'
				
                      AND C.REFVAL1 =  #{asgnno}
                      AND C.STAT = '51'
		]]>	   		   
	</select>
	
	<!-- 깨끗한나라 - 재고이동지시 조회 (이동지시취소) -->
	<select id="selectMvOrdrForMvOrdrCncl" parameterType="map" resultType="egovMap">
        <![CDATA[
				SELECT A.PLANDE
				           , A.MVTP
				           , A.MVTY
				           , A.REFVAL1 AS RCPTNO
				           , B.REFVAL1 AS RCPTSN
				           , A.REFTP   AS HDREFTP
				           , A.REFVAL1 AS HDREFVAL1
                           , C.ORDRNO
                           , C.ORDRSN
                           , C.DC
                           , C.BIZ
                           , C.SRCORDRSN
                           , C.MVNO
                           , C.MVSN
                           , C.CLIENT
                           , C.SKU
                           , C.PACKUNIT
                           , C.GRAD
                           , C.FRLOT
                           , C.FRPLTID
                           , C.FRCASEID
                           , C.FREAID
                           , C.FRLOC
						   , DA.AREA					AS FRAREA
                           , C.TOLOT
                           , C.TOPLTID
                           , C.TOCASEID
                           , C.TOEAID
                           , C.TOLOC
                           , C.UOS
                           , C.ORDRQTY
                           , C.WT
                           , C.ORDRPORT
                           , C.MSGTY
                           , C.RGSTP
                           , C.TRDT
                           , C.ERRCD
                           , C.ERRMSG
                           , C.TRSTAT
                           , C.STAT
                           , C.REFVAL1		AS ASGNNO
                           , C.REFVAL2
                           , C.RGSDE
                           , C.RGSUSR
                           , C.UPDDE
                           , C.UPDUSR
                           , C.EXTCOL01
                           , C.EXTCOL02
                           , C.EXTCOL03
                           , C.EXTCOL04
                           , C.EXTCOL05

                   FROM ST_MVHD A
                           , ST_MVDT B
                           , ST_MVORDR C LEFT OUTER JOIN SD_LOC DL ON C.FRLOC = DL.LOC
						                                                                       AND C.DC = DL.DC
																                               AND C.BIZ = DL.BIZ
						   , SD_ZONE DZ
						   , SD_AREA DA
                 WHERE A.MVNO = B.MVNO
                      AND A.DC = B.DC
                      AND A.BIZ = B.BIZ
				
                      AND B.MVNO = C.MVNO
                      AND B.MVSN = C.MVSN
                      AND B.DC = C.DC
                      AND B.BIZ = C.BIZ
                      
                      AND DL.ZONE = DZ.ZONE
					  AND DL.DC = DZ.DC
					  AND DL.BIZ = DZ.BIZ

					  AND DZ.AREA = DA.AREA
					  AND DZ.DC = DA.DC
					  AND DZ.BIZ = DA.BIZ
				
                      AND A.BIZ = #{biz}
                      AND A.DC = #{dc}
                      AND A.STAT != '99'
				
                      AND B.STAT != '99'
				
                      AND C.ORDRNO = #{ordrno}
                      AND C.ORDRSN = #{ordrsn}
                      AND C.STAT = '51'
		]]>	   		   
	</select>
		
	<!-- 깨끗한나라 - 재고이동지시 생성 -->
	<insert id="insertMvOrdr" parameterType="map" >
    	<selectKey resultType="Integer" keyProperty="ordrsn" order="BEFORE">
    		<![CDATA[
	    		SELECT ISNULL(MAX(ORDRSN) + 1, 1) AS ordrsn 
				  FROM ST_MVORDR
				 WHERE DC = #{dc}
				   AND BIZ= #{biz}
				   AND ORDRNO = #{ordrno}
			]]>
    	</selectKey>
	
        <![CDATA[
			INSERT 
                INTO ST_MVORDR (ORDRNO, ORDRSN, DC, BIZ, CLIENT, MVNO, MVSN, SKU, PACKUNIT, GRAD,
                                            FRLOC, FRLOT, FRPLTID, FRCASEID, FREAID, TOLOC, TOLOT, TOPLTID, TOCASEID, TOEAID,
                                            UOS, ORDRQTY, WT, TRSTAT, STAT, REFVAL1, REFVAL2, RGSDE, RGSUSR, UPDDE,
                                            UPDUSR)
           VALUES ( #{ordrno}
                        , #{ordrsn}
                        , #{dc}
                        , #{biz}
                        , #{client}
                        , #{mvno}
                        , #{mvsn}
                        , #{sku}
                        , #{packunit}
                        , #{grad}
                        
                        , #{frloc}
                        , #{frlot}
                        , #{frpltid}
                        , #{frcaseid}
                        , #{freaid}
                        , #{toloc}
                        , #{tolot}
                        , #{topltid}
                        , #{tocaseid}
                        , #{toeaid}
                        
                        , #{uos}
                        , #{ordrqty}
                        , #{wt}
                        , #{trstat}
                        , #{stat}
                        , #{refval1}
                        , #{refval2}
                        , getDate()
                        , #{updusr}
                        , getDate()
                        
                        , #{updusr} )
		]]>
	</insert>

	<!-- 깨끗한나라 - 재고이동지시 Loc 수정 -->
	<update id="updateMvOrdrLoc" parameterType="map">
            UPDATE ST_MVORDR
               SET UPDDE  = GETDATE()
                 , UPDUSR = #{updusr}
                 <if test="frloc != null and frloc !=''">
                 , FRLOC  = #{frloc}
                 </if>
                 <if test="toloc != null and toloc !=''">
                 , TOLOC  = #{toloc}
                 </if>
             WHERE ORDRNO = #{ordrno}
               AND ORDRSN = #{ordrsn}
               AND DC     = #{dc}
               AND BIZ    = #{biz}
	</update>

	<!-- 깨끗한나라 - 재고이동지시 상태 수정 -->
	<update id="updateMvOrdrStat" parameterType="map">
            UPDATE ST_MVORDR
               SET UPDDE  = GETDATE()
                 , UPDUSR = #{updusr}
                 <if test="stat != null and stat !=''">
                 , STAT   = #{stat}
                 </if>
             WHERE ORDRNO = #{ordrno}
               AND ORDRSN = #{ordrsn}
               AND DC     = #{dc}
               AND BIZ    = #{biz}
	</update>
	
	<!-- 깨끗한나라 - PDA - 재고이동지시 상태 수정 -->
	<select id="selectPdaMv" parameterType="map" resultType="egovMap">
		<![CDATA[
           SELECT HD.BIZ
                , HD.DC
                , HD.CLIENT
                , HD.MVNO
                , DT.MVSN
                , ORDR.ORDRNO
                , ORDR.ORDRSN
                , HD.REFVAL1   AS RCPTNO
                , DT.REFVAL1   AS RCPTSN
                , ORDR.REFVAL1 AS ASGNNO
                , HD.PLANDE
                , HD.PLANDE    AS MVDE
                , HD.MVTP
                , HD.MVTY
                , ORDR.FRPLTID
                , ORDR.FRCASEID
                , ORDR.FREAID
                , ORDR.FRLOT
                , ORDR.TOPLTID
                , ORDR.TOCASEID
                , ORDR.TOEAID
                , ORDR.TOLOT
                , ORDR.FRLOC
                , ORDR.TOLOC
                , ORDR.SKU
                , ORDR.GRAD
                , ORDR.PACKUNIT
                , HD.STAT
                , DT.STAT
                , ORDR.STAT
             FROM ST_MVHD HD
             JOIN ST_MVDT DT
               ON HD.BIZ = DT.BIZ
              AND HD.DC  = DT.DC
              AND HD.CLIENT = DT.CLIENT
              AND HD.MVNO   = DT.MVNO
             JOIN ST_MVORDR ORDR
               ON DT.BIZ    = ORDR.BIZ
              AND DT.DC     = ORDR.DC
              AND DT.CLIENT = ORDR.CLIENT
              AND DT.MVNO   = ORDR.MVNO
              AND DT.MVSN   = ORDR.MVSN
            WHERE 1=1
              AND ORDR.TOEAID = #{eaid}
              AND ORDR.BIZ    = #{biz}
              AND ORDR.DC     = #{dc}
              AND ORDR.CLIENT = #{client}
              AND ORDR.STAT   NOT IN ('99')  
		]]>
	</select>
	
	<!-- 깨끗한나라 - PDA - 재고이동지시 상태 수정 -->
	<update id="deletePdaMvRslt" parameterType="map">
		<![CDATA[
      DELETE FROM ST_MVRSLT
            WHERE 1=1
              AND MVNO   = #{mvno}
              AND MVSN   = #{mvsn}
              AND ORDRNO = #{ordrno}
              AND ORDRSN = #{ordrsn}
              AND DC     = #{dc}
              AND BIZ    = #{biz}
              AND CLIENT = #{client}
		]]>
	</update>
	
	<!-- 깨끗한나라 - PDA - 재고이동지시 상태 수정 -->
	<update id="updatePdaMvOrdr" parameterType="map">
		<![CDATA[
           UPDATE ST_MVORDR
              SET STAT   = #{stat}
                , UPDDE  = GETDATE()
                , UPDUSR = #{updusr}
            WHERE 1=1
              AND ORDRNO = #{ordrno}
              AND ORDRSN = #{ordrsn}
              AND DC     = #{dc}
              AND BIZ    = #{biz}
              AND CLIENT = #{client}
		]]>
	</update>
	
	<!-- 깨끗한나라 - PDA - 재고품목 상태 수정 -->
	<select id="selectPdaMvDt" parameterType="map" resultType="egovMap">
		<![CDATA[
           SELECT *
             FROM ST_MVDT
            WHERE 1=1
              AND MVNO   = ${mvno}
              AND DC     = #{dc}
              AND BIZ    = #{biz}
              AND CLIENT = #{client}
		]]>
	</select>
	
	<!-- 깨끗한나라 - PDA - 재고품목 상태 수정 -->
	<update id="updatePdaMvDt" parameterType="map">
		<![CDATA[
           UPDATE ST_MVDT
              SET STAT   = #{stat}
                , UPDDE  = GETDATE()
                , UPDUSR = #{updusr}
            WHERE MVNO   = #{mvno}
              AND MVSN   = #{mvsn}
              AND DC     = #{dc}
              AND BIZ    = #{biz}
              AND CLIENT = #{client}
		]]>
	</update>

	<!-- 깨끗한나라 - PDA - 재고전표 상태 수정 -->
	<update id="updatePdaMvHd" parameterType="map">
		<![CDATA[
           UPDATE ST_MVHD
              SET STAT   = #{stat}
                , UPDDE  = GETDATE()
                , UPDUSR = #{updusr}
            WHERE MVNO   = #{mvno}
              AND DC     = #{dc}
              AND BIZ    = #{biz}
              AND CLIENT = #{client}
		]]>
	</update>
	
	<!-- 깨끗한나라 - PDA - 현위치 수정 -->
	<update id="updateMvOrdrFrLoc" parameterType="map">
		<![CDATA[
           UPDATE ST_MVORDR
              SET FRLOC  = #{frloc}
                , UPDDE  = GETDATE()
                , UPDUSR = #{updusr}
            WHERE 1=1
              AND ORDRNO = #{ordrno}
              AND ORDRSN = #{ordrsn}
              AND DC     = #{dc}
              AND BIZ    = #{biz}
              AND CLIENT = #{client}
		]]>
	</update>
	
	<!-- 깨끗한나라 재고이동결과 입력 ============================================================================-->
    <insert id="insertMvRslt" parameterType="map">
    	<selectKey resultType="Integer" keyProperty="rsltsn" order="BEFORE">
    		<![CDATA[
	    		SELECT ISNULL(MAX(RSLTSN) + 1, 1) AS rsltsn 
				  FROM ST_MVRSLT
				 WHERE DC = #{dc}
				   AND BIZ= #{biz}
				   AND RSLTNO = #{rsltno}
			]]>
    	</selectKey>
    	
		<![CDATA[
			INSERT
              INTO ST_MVRSLT (RSLTNO, RSLTSN, DC, BIZ, MVNO, MVSN, ORDRNO, ORDRSN, CLIENT, SKU, 
                                          PACKUNIT, GRAD, LOT, CASEID, EAID, FRPLTID, FRLOC, TOPLTID, TOLOC, UOS, 
                                          RSLTQTY, WT, WORKPORT, ODERLBLID, MSGTY, RGSTP, TRDT, ERRCD, ERRMSG, TRSTAT,
                                          RSLTAPLYN, RGSDE, RGSUSR, UPDDE, UPDUSR, EXTCOL01, EXTCOL02, EXTCOL03, EXTCOL04, EXTCOL05)
			VALUES (#{rsltno}
                  , #{rsltsn}
                  , #{dc}
                  , #{biz}
                  , #{mvno}
                  , #{mvsn}
                  , #{ordrno}
                  , #{ordrsn}
                  , #{client}
                  , #{sku}
                  
                  , #{packunit}
                  , #{grad}
                  , #{lot}
                  , #{caseid}
                  , #{eaid}
                  , #{frpltid}
                  , #{frloc}
                  , #{topltid}
                  , #{toloc}
                  , #{uos}
                  
                  , #{rsltqty}
                  , #{wt}
                  , #{workport}
                  , '*'
                  , #{msgty}
                  , #{rgstp}
                  , CONVERT(DATETIME, #{trdt}, 112)
                  , #{errcd}
                  , #{errmsg}
                  , 0

                  , 'Y'
                  , GETDATE()
                  , #{rgsusr}
                  , GETDATE()
                  , #{updusr}
                  , #{extcol01}
                  , #{extcol02}
                  , #{extcol03}
                  , #{extcol04}
                  , #{extcol05})
  		]]>
    </insert>

   	<!-- 깨끗한나라 - 재고이동결과 생성 (RSLTNO, RSLTSN 생성 x)  -->
    <insert id="insertMvRsltForEcs" parameterType="map">  	
		<![CDATA[
			INSERT
              INTO ST_MVRSLT (RSLTNO, RSLTSN, DC, BIZ, MVNO, MVSN, ORDRNO, ORDRSN, CLIENT, SKU, 
                                          PACKUNIT, GRAD, LOT, CASEID, EAID, FRPLTID, FRLOC, TOPLTID, TOLOC, UOS, 
                                          RSLTQTY, WT, WORKPORT, ODERLBLID, MSGTY, RGSTP, TRDT, ERRCD, ERRMSG, TRSTAT,
                                          RSLTAPLYN, RGSDE, RGSUSR, UPDDE, UPDUSR, EXTCOL01, EXTCOL02, EXTCOL03, EXTCOL04, EXTCOL05)
			VALUES (#{rsltno}
                  , #{rsltsn}
                  , #{dc}
                  , #{biz}
                  , #{mvno}
                  , #{mvsn}
                  , #{ordrno}
                  , #{ordrsn}
                  , #{client}
                  , #{sku}
                  
                  , #{packunit}
                  , #{grad}
                  , #{lot}
                  , #{caseid}
                  , #{eaid}
                  , #{frpltid}
                  , #{frloc}
                  , #{topltid}
                  , #{toloc}
                  , #{uos}
                  
                  , #{rsltqty}
                  , #{wt}             
                  , #{workport}
                  , #{oderlblid}
                  , #{msgty}
                  , #{rgstp}
                  , CONVERT(DATETIME, #{trdt}, 112)
                  , #{errcd}
                  , #{errmsg}
                  , #{trstat}
                  
                  , 'Y'
                  , GETDATE()
                  , #{rgsusr}
                  , GETDATE()
                  , #{updusr}
                  , #{extcol01}
                  , #{extcol02}
                  , #{extcol03}
                  , #{extcol04}
                  , #{extcol05})
  		]]>
    </insert>
    

	<!-- 깨끗한나라 - 입고번호로 만들어진 이동지시전표,상세,배정 밸런스 확인 ============================================================================ -->
	<select id="selectMvForInspCompList" parameterType="map" resultType="int">
        <![CDATA[
			SELECT COUNT(*)
			  FROM OD_ODERHD A
			  JOIN OD_ODERDT B
			    ON A.BIZ     = B.BIZ
			   AND A.DC      = B.DC
			   AND A.CLIENT  = B.CLIENT
			   AND A.ODERNO  = B.ODERNO
			  JOIN OD_ODERASGN C
			    ON A.BIZ     = C.BIZ
			   AND A.DC      = C.DC
			   AND A.CLIENT  = C.CLIENT
			   AND A.ODERNO  = C.ODERNO
			 WHERE A.BIZ     = #{biz}
			   AND A.DC      = #{dc}
			   AND A.CLIENT  = #{client}
			   AND A.REFTP   = 'RC_RCPTHD'
			   AND A.REFVAL1 = #{rcptno}
			   AND B.REFVAL1 = #{rcptsn}
			   AND C.REFVAL1 = #{asgnno}
		]]>
	</select>

	<!-- 깨끗한나라 - 이동결과 조회 ============================================================================ -->
	<select id="selectMvRsltList" parameterType="map" resultType="egovMap">
        <![CDATA[
            SELECT A.MVDE																/* 이동일 */
                       , A.MVTP																/* 이동구분 */
                       , G.DUTYNM						AS MVTPNM					/* 이동구분명 */
                       , A.MVTY																/* 이동유형 */
                       , H.CDNM							AS MVTYNM					/* 이동유형명 */
                       , A.FRSYS																/* From */
                       , A.TOSYS																/* To */
                       , C.SKU																	/* 품목 */
                       , C.FREAID																/* 밀롤번호 */
                       , C.FRLOT																/* 밀롤LOT ID */
                       , E.LOTATRB01					AS PAPKND					/* 지종 */
                       , (SELECT CDNM FROM SD_CD WHERE BIZ = E.BIZ AND CD = E.LOTATRB01 AND CDGRP = 'PapKndTp') 	 AS PAPKNDNM		/* 지종명 */
                       , E.LOTATRB02					AS AVGWT						/* 평량 */
                       , F.EXTCOL08						AS RLBT						/* 지폭 */
                       , F.EXTCOL09						AS RLRLBT					/* 실지폭 */
                       , F.EXTCOL06						AS RSLTLT					/* 실적권치수(m) */
                       , F.EXTCOL07						AS RSLTWT					/* 실적중량(kg) */
                       , XA.AREANM						AS FROMAREA				/* FR지역명 */
                       , C.FRLOC							AS FROMLOC				/* FR위치 */
                       , XL.LOCNM						AS FROMLOCNM			/* FR위치명 */
                       , YA.AREANM						AS RCMDAREA				/* 권장지역 */
                       , C.TOLOC							AS RCMDLOC				/* 권장위치 */
                       , YL.LOCNM						AS RCMDLOCNM			/* 권장위치명 */
                       , ZA.AREANM						AS TOAREA					/* TO지역명 */	
                       , D.TOLOC							AS TOLOC						/* TO위치 */
                       , ZL.LOCNM						AS TOLOCNM				/* TO위치명 */
                       , C.STAT																	/* 상태 */
                       , (SELECT CDNM FROM SD_CD WHERE BIZ = C.BIZ AND CD = C.STAT AND CDGRP = 'MvStat') 	AS STATNM		/* 상태명 */
                       , A.REFTP																/* 참조구분 */
                       , (SELECT CDNM FROM SD_CD WHERE BIZ = C.BIZ AND CD = A.REFTP AND CDGRP = 'RefTp') 	AS REFTPNM		/* 참조구분명 */
                       , (CASE WHEN (A.REFVAL1 = '*' OR B.REFVAL1 = '*' OR C.REFVAL1 = '*') THEN '*'
                                     ELSE (A.REFVAL1 + '.' + FORMAT(CONVERT(int, B.REFVAL1), '00000') + '.' + C.REFVAL1)
			              END)																																	AS REFVAL1		/* 참조값 */
                       , (C.MVNO + '.' + CONVERT(VARCHAR(20), FORMAT(C.MVSN, '00000'))) 									AS MVNO			/* 이동번호 */
                       , (C.ORDRNO + '.' + CONVERT(VARCHAR(20), FORMAT(C.ORDRSN, '00000'))) 							AS ORDRNO		/* 지시번호 */
                       , C.RGSDE								AS SNDTRDT					/* 송신일 */
                       , (D.RSLTNO + '.' + CONVERT(VARCHAR(20), FORMAT(D.RSLTSN, '00000'))) 								AS RSLTNO		/* 결과번호 */
                       , D.RGSDE								AS RCVTRDT					/* 수신일 */
                       
                       , D.ERRMSG															/* 에러메시지 */
                       , A.MVNO																/* 이동번호 */
                       , A.BIZ
                       , A.DC
                       , A.CLIENT

               FROM ST_MVHD A
                       , ST_MVDT B
                       , ST_MVORDR C LEFT OUTER JOIN ST_MVRSLT D ON C.ORDRNO = D.ORDRNO
                                                                                               AND C.ORDRSN = D.ORDRSN
                                                                                               AND C.DC = D.DC
                                                                                               AND C.BIZ = D.BIZ
                                               LEFT OUTER JOIN SD_LOC ZL ON D.TOLOC = ZL.LOC
                                                                                           AND D.DC = ZL.DC
                                                                                           AND D.BIZ = ZL.BIZ
                                               LEFT OUTER JOIN SD_ZONE ZZ ON ZL.ZONE = ZZ.ZONE
                                                                                             AND ZL.BIZ = ZZ.BIZ
                                                                                             AND ZL.DC = ZZ.DC
                                               LEFT OUTER JOIN SD_AREA ZA ON ZZ.AREA = ZA.AREA
                                                                                             AND ZZ.BIZ = ZA.BIZ
                                                                                             AND ZZ.DC = ZA.DC
                       , ST_LOT E
                       , ST_EA F
                       
                       , SD_BIZDUTY G 
                       , SD_CD H
                       
					   , SD_LOC XL
                       , SD_ZONE XZ
                       , SD_AREA XA
					   , SD_LOC YL
                       , SD_ZONE YZ
                       , SD_AREA YA

             WHERE A.MVNO = B.MVNO
			      AND A.DC = B.DC
				  AND A.BIZ = B.BIZ

				  AND B.MVNO = C.MVNO
				  AND B.MVSN = C.MVSN
				  AND B.DC = C.DC
				  AND B.BIZ = C.BIZ

                  AND C.FRLOT = E.LOT
                  AND C.BIZ = E.BIZ

                  AND C.FREAID = F.EAID
                  AND C.BIZ = F.BIZ
                  
                  AND A.MVTP = G.DUTYCD
                  AND A.BIZ = G.BIZ
                  AND G.DUTYTY = 'MOVE'
                  
                  AND A.MVTY = H.CD
                  AND A.BIZ = H.BIZ
                  AND H.CDGRP = 'MvTy'

                  AND C.FRLOC = XL.LOC
                  AND C.DC = XL.DC
                  AND C.BIZ = XL.BIZ

                  AND XL.ZONE = XZ.ZONE
                  AND XL.BIZ = XZ.BIZ
                  AND XL.DC = XZ.DC
                    
                  AND XZ.AREA = XA.AREA
                  AND XZ.BIZ = XA.BIZ
                  AND XZ.DC = XA.DC

                  AND C.TOLOC = YL.LOC
                  AND C.DC = YL.DC
                  AND C.BIZ = YL.BIZ
                  
                  AND YL.ZONE = YZ.ZONE
                  AND YL.BIZ = YZ.BIZ
                  AND YL.DC = YZ.DC
                    
                  AND YZ.AREA = YA.AREA
                  AND YZ.BIZ = YA.BIZ
                  AND YZ.DC = YA.DC

		]]>
    	<if test="fromde != null and fromde != '' and tode != null and tode != ''">
                  AND A.MVDE BETWEEN #{fromde} AND #{tode} 
		</if>
		<if test="stat == 'all'" >
                  AND A.STAT != '99'
                  AND B.STAT != '99'
                  AND C.STAT != '99' 
		</if>
		<if test="stat != null and stat !='' and stat != 'all'">
                  AND C.STAT = #{stat}
		</if>
		<if test="mvtp != null and mvtp !=''">
                  AND A.MVTP = #{mvtp}
		</if>
		<if test="mvty != null and mvty !=''">
                  AND A.MVTY = #{mvty}
		</if>
		<if test="millrollno != null and millrollno !=''">
                  AND C.FREAID = #{millrollno}
		</if>
        <![CDATA[
        	 ORDER BY A.MVDE DESC, C.MVNO DESC
     	]]>
	</select>

	<!-- 깨끗한나라 - 이동등록 조회 ============================================================================ -->
	<select id="selectMvRegList" parameterType="map" resultType="egovMap">
        <![CDATA[
            SELECT EA.AREA																	/* 보관지역 */
                       , EA.AREANM																/* 보관지역명 */
                       , EZ.ZONENM																/* 보관구역 */
                       , A.LOC																		/* 적치위치(From) */
                       , EL.LOCNM																/* 적치위치(From)명 */
                       , A.SKU																		/* 품목 */
                       , A.EAID																		/* 밀롤번호 */
                       , A.LOT																		/* 밀롤LOT ID */
                       , C.LOTATRB01						AS PAPKND					/* 지종 */
                       , (SELECT CDNM FROM SD_CD WHERE BIZ = C.BIZ AND CD = C.LOTATRB01 AND CDGRP = 'PapKndTp') 	 AS PAPKNDNM		/* 지종명 */
                       , C.LOTATRB02 						AS AVGWT						/* 평량 */
                       , B.EXTCOL08							AS RLBT						/* 지폭 */
                       , B.EXTCOL09							AS RLRLBT					/* 실지폭 */
                       , B.EXTCOL06							AS RSLTLT					/* 실적권치수(m) */
                       , B.EXTCOL07							AS RSLTWT					/* 실적중량(kg) */
                       , B.EXTCOL10							AS PRODDE					/* 생산일 */
                       , C.WRKUSR																/* 작업자 */
                       , C.LOTATRB04 						AS STD							/* 규격 */
                       , B.EXTCOL02	 						AS MAEQTY					/* 속당매수 */
                       , C.LOTATRB07						AS PACKTP					/* 포장타입 */
                       , C.LOTATRB08						AS CUST						/* 거래처 */
                       , C.EXTCOL02  						AS SONO 						/* 판매번호 */ 
                       , C.EXTCOL04   						AS ORDRDESC	   			/* 지시사항 */
                       , C.EXTCOL05 						AS RM							/* 비고 */
                       
                       , A.BIZ
                       , A.DC
                       , A.CLIENT 
                       
               FROM ST_STOK A
                       , ST_EA B
                       , ST_LOT C
                       , SD_SKU D
                       , SD_LOC EL
                       , SD_ZONE EZ
                       , SD_AREA EA
                       
             WHERE A.EAID = B.EAID
                  AND A.BIZ = B.BIZ 

                  AND A.LOT = C.LOT
                  AND A.BIZ = C.BIZ
                   
                  AND A.SKU = D.SKU
                  AND A.BIZ = D.BIZ
                  AND A.CLIENT = D.CLIENT
                  
                  AND A.LOC = EL.LOC
                  AND A.DC = EL.DC
                  AND A.BIZ = EL.BIZ
                   
                  AND EL.ZONE = EZ.ZONE
                  AND EL.DC = EZ.DC
                  AND EL.BIZ = EZ.BIZ
                   
                  AND EZ.AREA = EA.AREA
                  AND EZ.DC = EA.DC
                  AND EZ.BIZ = EA.BIZ
                  
                  AND (A.STOKQTY - A.ALLCQTY) > 0 		-- 가용재고 조회
		]]>
		<if test="strgarea != null and strgarea !=''">
                  AND EA.AREA = #{strgarea}
		</if>
		<if test="papknd != null and papknd !=''">
                  AND C.LOTATRB01 = #{papknd}
		</if>
		<if test="avgwt != null and avgwt !=''">
                  AND C.LOTATRB02 = #{avgwt}
		</if>
		<if test="rlbt != null and rlbt !=''">
                  AND B.EXTCOL08	 = #{rlbt}
		</if>	
		<if test="rllt != null and rllt !=''">
                  AND C.LOTATRB02 = #{rllt}
		</if>
		<if test="millrollno != null and millrollno !=''">
                  AND A.EAID = #{millrollno}
		</if> 
	</select>
	
	
	<!-- 깨끗한나라 - 커터창고 권장위치 조회 펑션 -->
	<select id="selectRcptResrvationCutter" statementType="CALLABLE" resultType="egovMap">
		SELECT WMS.SP_GET_B_RCMD_LOC (#{mlbrcd}, #{zone}) AS RCMDLOC
	</select>
	
	<!-- 깨끗한나라 - 밀롤창고 권장위치 조회 펑션 -->
	<select id="selectRcptResrvationMillRollFn" statementType="CALLABLE" resultType="egovMap">
		SELECT WMS.FN_GET_A_RCMD_LOC (#{mlbrcd}, #{mvty}, #{imsi}, #{frlocnum}, #{tolocnum}, #{rereq}) AS RCMDLOC
	</select>
	
	<!-- 깨끗한나라 - 밀롤창고 권장위치 조회 프로시저 -->
	<select id="selectRcptResrvationMillRollProcedure" statementType="CALLABLE" resultType="egovMap">
		{ 
		  call WMS.SP_GET_A_RCMD_LOC 
		  (
		    #{mlbrcd}, #{mvty}, #{imsi}, #{frlocnum}, #{tolocnum}, #{rereq}, 
		    #{rcmdloc, mode=OUT, jdbcType=VARCHAR}
		   )
        }
	</select>
	
	<!-- 깨끗한나라 - 입고예약 프로시저-->
	<select id="excMvOrdrForRcptReservationProcedure" statementType="CALLABLE" resultType="egovMap">
		{ call WMS.SP_RCPT_RESERVATION (#{mlbrcd}, #{mvty}, #{rcmdloc})
         }
	</select>
	
	<!-- 깨끗한나라 - 밀롤창고 입출고 통계  ============================================================================ -->
	<!-- 일별통계 -->
	<select id="selectMvDailyStats" parameterType="map" resultType="egovMap">
        <![CDATA[
			WITH MV AS (
				SELECT A.MVDE
		             , CASE WHEN LEFT(A.MVTY, 1) = 'I' THEN 1 /* 입고 */
		                    ELSE 0 END RCPTCNT
		             , CASE WHEN LEFT(A.MVTY, 1) = 'O' THEN 1 /* 출고 */
		                    ELSE 0 END ODERCNT
		             , CASE WHEN LEFT(A.MVTY, 1) = 'M' THEN 1 /* 이동 */
		                    ELSE 0 END MVCNT
		                    
		          FROM ST_MVHD A JOIN ST_MVRSLT B ON B.MVNO = A.MVNO
		           AND B.DC = A.DC
		           AND B.BIZ = A.BIZ
		           AND A.MVTP = 'M61' /* 재고이동 */
		           AND A.MVDE BETWEEN #{stmvde} AND #{edmvde}
		]]>
		<if test="mvty == 'all'">
		           AND ( 
		           		  ( (A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%' )
		               OR ( (A.MVTY = 'O10' OR A.MVTY = 'O12') AND FRLOC LIKE 'A%' )
		               OR ( (A.MVTY = 'O30' OR A.MVTY = 'M21' OR A.MVTY = 'M23') AND (FRLOC LIKE 'A%' AND TOLOC LIKE 'A%') ) 
		               )
		</if>
		<if test="mvty == 'rcpt'">
		           AND ( (A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%' )
		</if>
		<if test="mvty == 'oder'">
		           AND ( (A.MVTY = 'O10' OR A.MVTY = 'O12') AND FRLOC LIKE 'A%' )
		</if>
		<if test="mvty == 'move'">
		           AND ( (A.MVTY = 'O30' OR A.MVTY = 'M21' OR A.MVTY = 'M23') AND (FRLOC LIKE 'A%' AND TOLOC LIKE 'A%') )
		</if>
        <![CDATA[
			)
			SELECT A.MVDE
				 , SUBSTRING(MVDE,1,4) +'-'+ SUBSTRING(MVDE,5,2) +'-'+ SUBSTRING(MVDE,7,2) AS 일자
		]]>
		<if test="mvty == 'all'">
				 , ISNULL(A.RCPTCNT, 0) AS 입고량
				 , ISNULL(A.ODERCNT, 0) AS 출고량
				 , ISNULL(A.MVCNT, 0) AS 이동량
		</if>
		<if test="mvty == 'rcpt'">
				 , ISNULL(A.RCPTCNT, 0) AS 입고량
		</if>
		<if test="mvty == 'oder'">
				 , ISNULL(A.ODERCNT, 0) AS 출고량
		</if>
		<if test="mvty == 'move'">
				 , ISNULL(A.MVCNT, 0) AS 이동량
		</if>
        <![CDATA[
  			 FROM (SELECT MVDE
						, SUM(RCPTCNT) AS RCPTCNT
						, SUM(ODERCNT) AS ODERCNT
						, SUM(MVCNT) AS MVCNT 
					 FROM MV
					GROUP BY MVDE) A
			ORDER BY A.MVDE
		]]>
	</select>

	<!-- 시간별통계 -->
	<select id="selectMvHourlyStats" parameterType="map" resultType="egovMap">
        <![CDATA[
			WITH MV AS (
				SELECT DATEPART(HOUR, A.RGSDE) AS HOUR
				
		             , CASE WHEN A.MVTY = 'I10' THEN 1 /* 입고적치 */
		                    ELSE 0 END I10CNT
		             , CASE WHEN A.MVTY = 'I12' THEN 1 /* 실사재입고 */
		                    ELSE 0 END I12CNT
		             , CASE WHEN A.MVTY = 'O10' THEN 1 /* 출고피킹 */
		                    ELSE 0 END O10CNT
		             , CASE WHEN A.MVTY = 'O12' THEN 1 /* 실사출고 */
		                    ELSE 0 END O12CNT
		             , CASE WHEN A.MVTY = 'O30' THEN 1 /* 사전피킹 */
		                    ELSE 0 END O30CNT
		             , CASE WHEN A.MVTY = 'M21' THEN 1 /* 설비내이동 */
		                    ELSE 0 END M21CNT
		             , CASE WHEN A.MVTY = 'M23' THEN 1 /* 사전피킹취소 */
		                    ELSE 0 END M23CNT
		                   
		          FROM ST_MVHD A JOIN ST_MVRSLT B ON B.MVNO = A.MVNO
		           AND B.DC = A.DC
		           AND B.BIZ = A.BIZ
		           AND A.MVTP = 'M61' /* 재고이동 */
		           AND A.MVDE BETWEEN #{stmvde} AND #{edmvde}
		]]>
		<if test="mvty == 'all'">
		           AND ( 
		           		  ( (A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%' )
		               OR ( (A.MVTY = 'O10' OR A.MVTY = 'O12') AND FRLOC LIKE 'A%' )
		               OR ( (A.MVTY = 'O30' OR A.MVTY = 'M21' OR A.MVTY = 'M23') AND (FRLOC LIKE 'A%' AND TOLOC LIKE 'A%') ) 
		               )
		</if>
		<if test="mvty == 'rcpt'">
		           AND ( (A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%' )
		</if>
		<if test="mvty == 'oder'">
		           AND ( (A.MVTY = 'O10' OR A.MVTY = 'O12') AND FRLOC LIKE 'A%' )
		</if>
		<if test="mvty == 'move'">
		           AND ( (A.MVTY = 'O30' OR A.MVTY = 'M21' OR A.MVTY = 'M23') AND (FRLOC LIKE 'A%' AND TOLOC LIKE 'A%') )
		</if>
        <![CDATA[
			), HH AS (
				SELECT 1 AS HOUR
				UNION SELECT 2
				UNION SELECT 3
				UNION SELECT 4
				UNION SELECT 5
				UNION SELECT 6
				UNION SELECT 7
				UNION SELECT 8
				UNION SELECT 9
				UNION SELECT 10
				UNION SELECT 11
				UNION SELECT 12
				UNION SELECT 13
				UNION SELECT 14
				UNION SELECT 15
				UNION SELECT 16
				UNION SELECT 17
				UNION SELECT 18
				UNION SELECT 19
				UNION SELECT 20
				UNION SELECT 21
				UNION SELECT 22
				UNION SELECT 23
				UNION SELECT 24
			)
			SELECT A.HOUR AS 시간
		]]>
		<if test="mvty == 'all'">
				 , ISNULL(B.I10CNT, 0) AS 입고적치
				 , ISNULL(B.I12CNT, 0) AS 실사재입고
				 , ISNULL(B.O10CNT, 0) AS 출고피킹
				 , ISNULL(B.O12CNT, 0) AS 실사출고
				 , ISNULL(B.O30CNT, 0) AS 사전피킹
				 , ISNULL(B.M21CNT, 0) AS 설비내이동
				 , ISNULL(B.M23CNT, 0) AS 사전피킹취소
		</if>
		<if test="mvty == 'rcpt'">
				 , ISNULL(B.I10CNT, 0) AS 입고적치
				 , ISNULL(B.I12CNT, 0) AS 실사재입고
		</if>
		<if test="mvty == 'oder'">
				 , ISNULL(B.O10CNT, 0) AS 출고피킹
				 , ISNULL(B.O12CNT, 0) AS 실사출고
		</if>
		<if test="mvty == 'move'">
				 , ISNULL(B.O30CNT, 0) AS 사전피킹
				 , ISNULL(B.M21CNT, 0) AS 설비내이동
				 , ISNULL(B.M23CNT, 0) AS 사전피킹취소
		</if>
        <![CDATA[
  			 FROM HH A
  			 	  LEFT OUTER JOIN (SELECT HOUR
					  			 	    , SUM(I10CNT) AS I10CNT
					  			 	    , SUM(I12CNT) AS I12CNT
					  			 	    , SUM(O10CNT) AS O10CNT 
					  			 	    , SUM(O12CNT) AS O12CNT 
					  			 	    , SUM(O30CNT) AS O30CNT 
					  			 	    , SUM(M21CNT) AS M21CNT 
					  			 	    , SUM(M23CNT) AS M23CNT 
					  			 	 FROM MV
					  			 	GROUP BY HOUR) B ON A.HOUR = B.HOUR
			ORDER BY A.HOUR
		]]>
	</select>

	<!-- 유형별통계  -->
	<select id="selectMvStatsByType" parameterType="map" resultType="egovMap">
        <![CDATA[
			WITH MV AS (
				SELECT A.MVTY

		             , CASE WHEN LEFT(A.MVTY, 1) = 'I' THEN 1 /* 입고 */
		                    ELSE 0 END RCPTCNT
		             , CASE WHEN LEFT(A.MVTY, 1) = 'O' THEN 1 /* 출고 */
		                    ELSE 0 END ODERCNT
		             , CASE WHEN LEFT(A.MVTY, 1) = 'M' THEN 1 /* 이동 */
		                    ELSE 0 END MVCNT
		                    
		          FROM ST_MVHD A JOIN ST_MVRSLT B ON B.MVNO = A.MVNO
		           AND B.DC = A.DC
		           AND B.BIZ = A.BIZ
		           AND A.MVTP = 'M61' /* 재고이동 */
		           AND A.MVDE BETWEEN #{stmvde} AND #{edmvde}
		]]>
		<if test="mvty == 'all'">
		           AND ( 
		           		  ( (A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%' )
		               OR ( (A.MVTY = 'O10' OR A.MVTY = 'O12') AND FRLOC LIKE 'A%' )
		               OR ( (A.MVTY = 'O30' OR A.MVTY = 'M21' OR A.MVTY = 'M23') AND (FRLOC LIKE 'A%' AND TOLOC LIKE 'A%') ) 
		               )
		</if>
		<if test="mvty == 'rcpt'">
		           AND ( (A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%' )
		</if>
		<if test="mvty == 'oder'">
		           AND ( (A.MVTY = 'O10' OR A.MVTY = 'O12') AND FRLOC LIKE 'A%' )
		</if>
		<if test="mvty == 'move'">
		           AND ( (A.MVTY = 'O30' OR A.MVTY = 'M21' OR A.MVTY = 'M23') AND (FRLOC LIKE 'A%' AND TOLOC LIKE 'A%') )
		</if>
        <![CDATA[
			)
			SELECT (SELECT CDNM FROM SD_CD WHERE CDGRP = 'MVTY' AND CD = MV.MVTY) AS MVTY
				 , COUNT(MVTY) AS CNT

  			 FROM MV
  			GROUP BY MVTY
		]]>
	</select>

	<!-- 요일별통계-->
	<select id="selectMvStatsByDay" parameterType="map" resultType="egovMap">
        <![CDATA[
			WITH MV AS (
				SELECT DATEPART(DW, A.RGSDE) AS WEEK
		             , CASE WHEN A.MVTY = 'I10' THEN 1 /* 입고적치 */
		                    ELSE 0 END I10CNT
		             , CASE WHEN A.MVTY = 'I12' THEN 1 /* 실사재입고 */
		                    ELSE 0 END I12CNT
		             , CASE WHEN A.MVTY = 'O10' THEN 1 /* 출고피킹 */
		                    ELSE 0 END O10CNT
		             , CASE WHEN A.MVTY = 'O12' THEN 1 /* 실사출고 */
		                    ELSE 0 END O12CNT
		             , CASE WHEN A.MVTY = 'O30' THEN 1 /* 사전피킹 */
		                    ELSE 0 END O30CNT
		             , CASE WHEN A.MVTY = 'M21' THEN 1 /* 설비내이동 */
		                    ELSE 0 END M21CNT
		             , CASE WHEN A.MVTY = 'M23' THEN 1 /* 사전피킹취소 */
		                    ELSE 0 END M23CNT

		          FROM ST_MVHD A JOIN ST_MVRSLT B ON B.MVNO = A.MVNO
		           AND B.DC = A.DC
		           AND B.BIZ = A.BIZ
		           AND A.MVTP = 'M61' /* 재고이동 */
		           AND A.MVDE BETWEEN #{stmvde} AND #{edmvde}
		]]>
		<if test="mvty == 'all'">
		           AND ( 
		           		  ( (A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%' )
		               OR ( (A.MVTY = 'O10' OR A.MVTY = 'O12') AND FRLOC LIKE 'A%' )
		               OR ( (A.MVTY = 'O30' OR A.MVTY = 'M21' OR A.MVTY = 'M23') AND (FRLOC LIKE 'A%' AND TOLOC LIKE 'A%') ) 
		               )
		</if>
		<if test="mvty == 'rcpt'">
		           AND ( (A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%' )
		</if>
		<if test="mvty == 'oder'">
		           AND ( (A.MVTY = 'O10' OR A.MVTY = 'O12') AND FRLOC LIKE 'A%' )
		</if>
		<if test="mvty == 'move'">
		           AND ( (A.MVTY = 'O30' OR A.MVTY = 'M21' OR A.MVTY = 'M23') AND (FRLOC LIKE 'A%' AND TOLOC LIKE 'A%') )
		</if>
        <![CDATA[
			), WK AS (
				SELECT 1 AS WEEK, '일' AS WEEKNM 
				UNION SELECT 2, '월' 
				UNION SELECT 3, '화'
				UNION SELECT 4, '수'
				UNION SELECT 5, '목'
				UNION SELECT 6, '금'
				UNION SELECT 7, '토'
			)
			SELECT A.WEEKNM AS 요일
		]]>
		<if test="mvty == 'all'">
				 , ISNULL(B.I10CNT, 0) AS 입고적치
				 , ISNULL(B.I12CNT, 0) AS 실사재입고
				 , ISNULL(B.O10CNT, 0) AS 출고피킹
				 , ISNULL(B.O12CNT, 0) AS 실사출고
				 , ISNULL(B.O30CNT, 0) AS 사전피킹
				 , ISNULL(B.M21CNT, 0) AS 설비내이동
				 , ISNULL(B.M23CNT, 0) AS 사전피킹취소
		</if>
		<if test="mvty == 'rcpt'">
				 , ISNULL(B.I10CNT, 0) AS 입고적치
				 , ISNULL(B.I12CNT, 0) AS 실사재입고
		</if>
		<if test="mvty == 'oder'">
				 , ISNULL(B.O10CNT, 0) AS 출고피킹
				 , ISNULL(B.O12CNT, 0) AS 실사출고
		</if>
		<if test="mvty == 'move'">
				 , ISNULL(B.O30CNT, 0) AS 사전피킹
				 , ISNULL(B.M21CNT, 0) AS 설비내이동
				 , ISNULL(B.M23CNT, 0) AS 사전피킹취소
		</if>
        <![CDATA[
  			 FROM WK A
  			 	  LEFT OUTER JOIN (SELECT WEEK
					  			 	    , SUM(I10CNT) AS I10CNT
					  			 	    , SUM(I12CNT) AS I12CNT
					  			 	    , SUM(O10CNT) AS O10CNT 
					  			 	    , SUM(O12CNT) AS O12CNT 
					  			 	    , SUM(O30CNT) AS O30CNT 
					  			 	    , SUM(M21CNT) AS M21CNT 
					  			 	    , SUM(M23CNT) AS M23CNT 
					  			 	 FROM MV
					  			 	GROUP BY WEEK) B ON A.WEEK = B.WEEK
			ORDER BY A.WEEK
		]]>
	</select>

	<!-- 깨끗한나라 - 밀롤창고 위치별 입출고 빈도  ============================================================================ -->
	<select id="selectLocxMvList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT LOC
			     , COUNT(LOC) AS MVCNT
			     
			  FROM (
			  		SELECT 
		]]>
		<if test="mvty == 'rcpt'">
			  			   B.TOLOC AS LOC
		</if>
		<if test="mvty == 'oder'">
			  			   B.FRLOC AS LOC
		</if>
        <![CDATA[
			          FROM ST_MVHD A 
			          	   JOIN ST_MVRSLT B ON B.MVNO = A.MVNO
								           AND B.DC = A.DC
								           AND B.BIZ = A.BIZ 
								           AND A.MVTP = 'M61'	/* 재고이동 */
								           AND A.MVDE BETWEEN #{stmvde} AND #{edmvde}
										   AND ( 
		]]>
		<if test="mvty == 'rcpt'">
										   		  /* 입고적치(I10), 실사재입고(I12) to Loc */
										   		 ((A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%')
			<if test='mvyn == "Y"'>
												OR
												  /* 입고에서 이동포함 */
												 ((A.MVTY = 'M21' OR A.MVTY = 'M23') AND TOLOC LIKE 'A%')
			</if>
		</if>

		<if test="mvty == 'oder'">
												  /* 출고피킹(O10), 실사출고(O12), 사전피킹(O30) from Loc */
												 ((A.MVTY = 'O10' OR A.MVTY = 'O12' OR A.MVTY = 'O30') AND FRLOC LIKE 'A%') 
			<if test='mvyn == "Y"'>
												OR
												  /* 입고에서 이동포함 */
												 ((A.MVTY = 'M21' OR A.MVTY = 'M23') AND TOLOC LIKE 'A%')
			</if>
		</if>
        <![CDATA[
										   )		
			  ) MV
			  
			 WHERE LOC <> 'A0000'
			 GROUP BY LOC
			 ORDER BY MVCNT DESC
		]]>
	</select>

	<select id="selectLocxMvPivot" parameterType="map" resultType="egovMap">
        <![CDATA[
			DECLARE @PIVOT_COLS NVARCHAR(MAX)
			DECLARE @EXE_QUERY  NVARCHAR(MAX) 
			DECLARE @BIZ     	NVARCHAR(MAX)
			DECLARE @DC     	NVARCHAR(MAX)
			DECLARE @STMVDE     NVARCHAR(MAX)
			DECLARE @EDMVDE     NVARCHAR(MAX)
						
			SET @BIZ = #{biz}
			SET @DC= #{dc}
			SET @STMVDE= #{stmvde}
			SET @EDMVDE= #{edmvde}
			
			SET @PIVOT_COLS = ''
									  
			SELECT @PIVOT_COLS = @PIVOT_COLS + '[' + LOC + '],' FROM ( SELECT DISTINCT LOC FROM SD_LOC WHERE DC = #{dc} AND ZONE = 'A1') AS LOC
									
			SET @PIVOT_COLS = LEFT(@PIVOT_COLS, LEN(@PIVOT_COLS) - 1)

			SET @EXE_QUERY = 'SELECT *
								FROM (
										SELECT
		]]>
		<if test="mvty == 'rcpt'">
											   B.TOLOC AS LOC
		</if>
		<if test="mvty == 'oder'">
											   B.FRLOC AS LOC
		</if>
        <![CDATA[
										  FROM ST_MVHD A 
						          	   		   JOIN ST_MVRSLT B ON B.MVNO = A.MVNO
											           		   AND B.DC = A.DC
											           		   AND B.BIZ = A.BIZ 
											           		   AND A.MVTP = ''M61''	/* 재고이동 */
											           		   AND A.MVDE BETWEEN '+ @STMVDE +' AND '+ @EDMVDE +'
													   		   AND ( 
		]]>
		<if test="mvty == 'rcpt'">
															   		  /* 입고적치(I10), 실사재입고(I12) to Loc */
															   		 ((A.MVTY = ''I10'' OR A.MVTY = ''I12'') AND TOLOC LIKE ''A%'')
			<if test='mvyn == "Y"'>
																	OR
																	  /* 입고에서 이동포함 */
																	 ((A.MVTY = ''M21'' OR A.MVTY = ''M23'') AND TOLOC LIKE ''A%'')
			</if>
		</if>

		<if test="mvty == 'oder'">
																	  /* 출고피킹(O10), 실사출고(O12), 사전피킹(O30) from Loc */
																	 ((A.MVTY = ''O10'' OR A.MVTY = ''O12'' OR A.MVTY = ''O30'') AND FRLOC LIKE ''A%'') 
			<if test='mvyn == "Y"'>
																	OR
																	  /* 입고에서 이동포함 */
																	 ((A.MVTY = ''M21'' OR A.MVTY = ''M23'') AND TOLOC LIKE ''A%'')
			</if>
		</if>
        <![CDATA[
													   		   )
								) AS RESULT
								
								PIVOT ( COUNT(LOC) FOR LOC IN ('+@PIVOT_COLS+') ) AS PIVOT_RESULT'

			EXECUTE sp_executesql @EXE_QUERY
		]]>
	</select>

	<!-- 위치별 일별통계 -->
	<select id="selectLocxMvDailyStats" parameterType="map" resultType="egovMap">
        <![CDATA[
			WITH MV AS (
				SELECT A.MVDE

		             , CASE WHEN A.MVTY = 'I10' THEN 1 /* 입고적치 */
		                    ELSE 0 END I10CNT
		             , CASE WHEN A.MVTY = 'I12' THEN 1 /* 실사재입고 */
		                    ELSE 0 END I12CNT
		             , CASE WHEN A.MVTY = 'O10' THEN 1 /* 출고피킹 */
		                    ELSE 0 END O10CNT
		             , CASE WHEN A.MVTY = 'O12' THEN 1 /* 실사출고 */
		                    ELSE 0 END O12CNT
		             , CASE WHEN A.MVTY = 'O30' THEN 1 /* 사전피킹 */
		                    ELSE 0 END O30CNT
		             , CASE WHEN A.MVTY = 'M21' THEN 1 /* 설비내이동 */
		                    ELSE 0 END M21CNT
		             , CASE WHEN A.MVTY = 'M23' THEN 1 /* 사전피킹취소 */
		                    ELSE 0 END M23CNT
		                    
		          FROM ST_MVHD A 
		          	   JOIN ST_MVRSLT B ON B.MVNO = A.MVNO
							           AND B.DC = A.DC
							           AND B.BIZ = A.BIZ
							           AND A.MVTP = 'M61' /* 재고이동 */
		           					   AND (
		]]>
		<if test="mvty == 'rcpt'">
								   		  /* 입고적치(I10), 실사재입고(I12) to Loc */
								   		 ((A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%')
			<if test='mvyn == "Y"'>
										OR
										  /* 입고에서 이동포함 */
										 ((A.MVTY = 'M21' OR A.MVTY = 'M23') AND TOLOC LIKE 'A%')
			</if>
		</if>

		<if test="mvty == 'oder'">
										  /* 출고피킹(O10), 실사출고(O12), 사전피킹(O30) from Loc */
										 ((A.MVTY = 'O10' OR A.MVTY = 'O12' OR A.MVTY = 'O30') AND FRLOC LIKE 'A%') 
			<if test='mvyn == "Y"'>
										OR
										  /* 입고에서 이동포함 */
										 ((A.MVTY = 'M21' OR A.MVTY = 'M23') AND TOLOC LIKE 'A%')
			</if>
		</if>
        <![CDATA[
		           					   )
			)
			SELECT A.MVDE
				 , SUBSTRING(MVDE,1,4) +'-'+ SUBSTRING(MVDE,5,2) +'-'+ SUBSTRING(MVDE,7,2) AS 일자
		]]>
		<if test="mvty == 'rcpt'">
				 , ISNULL(A.I10CNT, 0) AS 입고적치
				 , ISNULL(A.I12CNT, 0) AS 실사재입고
		</if>
		<if test="mvty == 'oder'">
				 , ISNULL(A.O10CNT, 0) AS 출고피킹
				 , ISNULL(A.O12CNT, 0) AS 실사출고
				 , ISNULL(A.O30CNT, 0) AS 사전피킹
		</if>
		<if test='mvyn == "Y"'>
				 , ISNULL(A.M21CNT, 0) AS 설비내이동
				 , ISNULL(A.M23CNT, 0) AS 사전피킹취소
		</if>
        <![CDATA[
  			 FROM (SELECT MVDE
	  			 	    , SUM(I10CNT) AS I10CNT
	  			 	    , SUM(I12CNT) AS I12CNT
	  			 	    , SUM(O10CNT) AS O10CNT 
	  			 	    , SUM(O12CNT) AS O12CNT 
	  			 	    , SUM(O30CNT) AS O30CNT 
	  			 	    , SUM(M21CNT) AS M21CNT 
	  			 	    , SUM(M23CNT) AS M23CNT 
					 FROM MV
					GROUP BY MVDE) A
			ORDER BY A.MVDE
		]]>
	</select>

	<!-- 깨끗한나라 - 밀롤창고 품목별 입출고 빈도  ============================================================================ -->
	<select id="selectSkuxMvList" parameterType="map" resultType="egovMap">
        <![CDATA[
			SELECT SKU
			     , PAPKND
			     , PAPKNDNM
			     , AVGWT
			     , AVGWTNM
			     , RLBTNM
			     , RSLTLTNM
			     , SUM(RCPTCNT) AS RCPTCNT
			     , SUM(ODERCNT) AS ODERCNT
			     
			  FROM (SELECT B.SKU
			             , C.LOTATRB01 AS PAPKND /* 지종 */
			             , (SELECT CDNM
			                  FROM SD_CD
			                 WHERE BIZ = A.BIZ
			                   AND CD = C.LOTATRB01
			                   AND CDGRP = 'PAPKNDTP') AS PAPKNDNM /* 지종명 */
			             , C.LOTATRB02 AS AVGWT /* 평량 */
			             , (SELECT CDNM
			                  FROM SD_CD
			                 WHERE BIZ = A.BIZ
			                   AND CD = C.LOTATRB02
			                   AND CDGRP = 'AVGWTTP') AS AVGWTNM /* 평량명 */
			             , D.EXTCOL08 AS RLBT /* 지폭(MM) */
			             , (SELECT CDNM
			                  FROM SD_CD
			                 WHERE CDGRP='RLBTTP'
			                   AND D.EXTCOL08 BETWEEN EXTCOL01 AND EXTCOL02) AS RLBTNM
			             , D.EXTCOL06 AS RSLTLT /* 실적권치수(M), 지장 */
			             , (SELECT CDNM
			                  FROM SD_CD
			                 WHERE CDGRP='RLLTTP'
			                   AND D.EXTCOL06 BETWEEN EXTCOL01 AND EXTCOL02) AS RSLTLTNM
			             , CASE WHEN LEFT(A.MVTY, 1) = 'I' THEN 1 /* 입고 */
			                    ELSE 0 END AS RCPTCNT
			             , CASE WHEN LEFT(A.MVTY, 1) = 'O' THEN 1 /* 출고 */
			                    ELSE 0 END AS ODERCNT
			          FROM ST_MVHD A 
			          	   JOIN ST_MVRSLT B ON B.MVNO = A.MVNO
								           AND B.DC = A.DC
								           AND B.BIZ = A.BIZ 
								           AND A.MVTP = 'M61'	/* 재고이동 */
										   AND A.MVDE BETWEEN #{stmvde} AND #{edmvde}
										   AND ( 
										   		  /* 입고적치(I10), 실사재입고(I12) to Loc */
										   		 ((A.MVTY = 'I10' OR A.MVTY = 'I12') AND TOLOC LIKE 'A%')
												OR 
												  /* 출고피킹(O10), 실사출고(O12), 사전피킹(O30) from Loc */
												 ((A.MVTY = 'O10' OR A.MVTY = 'O12' OR A.MVTY = 'O30') AND FRLOC LIKE 'A%') 
											   )
			               JOIN ST_LOT C ON C.LOT = B.LOT
			           					AND C.BIZ = B.BIZ 
		]]>
		<if test="papknd != null and papknd != ''">
			           					AND C.LOTATRB01 = #{papknd}
		</if>
		<if test="avgwt != null and avgwt != ''">
			           					AND C.LOTATRB02 = #{avgwt}
		</if>
        <![CDATA[
			               JOIN ST_EA D ON D.EAID = B.EAID
			           				   AND D.BIZ = B.BIZ) MV
			           
			 GROUP BY SKU, PAPKND, PAPKNDNM, AVGWT, AVGWTNM, RLBTNM, RSLTLTNM
			 ORDER BY PAPKNDNM, AVGWT, RLBTNM, RSLTLTNM
		]]>
	</select>
</mapper>