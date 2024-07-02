package com.comfunny.server.proj.ib.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.com.sd.service.LocDao;
import nlms.com.sy.service.EtcService;
import nlms.framework.exception.BizException;
import nlms.framework.util.ObjectUtil;
import nlms.wms.ecs.service.EcsDao;
import nlms.wms.ecs.service.EcsService;
import nlms.wms.od.service.PickService;
import nlms.wms.rc.service.PutwDao;
import nlms.wms.rc.service.PutwService;
import nlms.wms.rc.service.RcptDao;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("mvService")
public class MvService {

	@Resource(name = "mvDao")
	private MvDao mvDao;

	@Resource(name = "mvService")
	private MvService mvService;

	@Resource(name = "stokDao")
	private StokDao stokDao;
	
	@Resource(name = "stokService")
	private StokService stokService;
	
	@Resource(name = "etcService")
	private EtcService etcService;
	
	@Resource(name = "ecsService")
	private EcsService ecsService;
	
	@Resource(name = "putwService")
	private PutwService putwService;
	
	@Resource(name = "putwDao")
	private PutwDao putwDao;
	
	@Resource(name = "pickService")
	private PickService pickService;
	
	@Resource(name = "locDao")
	private LocDao locDao;
	
	@Resource(name = "rcptDao")
	private RcptDao rcptDao;
	
	@Resource(name = "ecsDao")
	private EcsDao ecsDao;
	
	/************************************************************************************
	 * 깨끗한나라 - 재고이동 생성
	 * 
	 * @param map
	 */
	public void saveMvHd(Map<String, Object> map) {
		
		String mvNo="";
	
		Map<String, Object> idMap = new HashMap<String, Object>();

    	idMap.put("biz", 	map.get("biz"));
		idMap.put("dc", 	map.get("dc"));
		idMap.put("client", map.get("client"));
		idMap.put("cntde",  map.get("plande"));
    	idMap.put("cnttp1", "ST_MVHD");
		idMap.put("cnttp2", "MVNO");
		idMap.put("cnttp3", "*");
		mvNo = etcService.saveCnt(idMap);	//채번
		map.put("mvno", mvNo);		
		
    	mvDao.insertMvHd(map);
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 재고이동품목 생성
	 * 
	 * @param map
	 */
	public void saveMvDt(Map<String, Object> map) {

		//이동순번 생성
		int mvSn = 1;
		mvSn = mvDao.selectMvSnSeq(map);
		map.put("mvsn", mvSn);
		
		mvDao.insertMvDt(map);
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 재고이동지시 생성
	 * 
	 * @param map
	 */
	public void saveMvOrdr(Map<String, Object> map) {

		String ordrno = "";
		
		//지시번호 생성
		Map<String, Object> idMap = new HashMap<String, Object>();
		
    	idMap.put("biz", 	map.get("biz"));
		idMap.put("dc", 	map.get("dc"));
		idMap.put("client", map.get("client"));
		idMap.put("cntde",  map.get("rcptde"));
    	idMap.put("cnttp1", "ST_MVORDR");
		idMap.put("cnttp2", "MVNO");
		idMap.put("cnttp3", "*");
		ordrno = etcService.saveCnt(idMap);	//채번
		
		map.put("ordrno", ordrno);
		
		mvDao.insertMvOrdr(map);
		
	}
	/************************************************************************************
	 * 깨끗한나라 - 재고이동지시 From 로케이션 수정(임의이동 및 BCR 이동)
	 * 
	 * @param map {biz, dc, ordrno, ordrsn, updusr, frloc, toloc, rcmdloc}
	 * loc 의 값은 던질때 명확히 선언해서 요청.
	 */
	public void updateMvOrdrLoc(Map<String, Object> map) {
		mvDao.updateMvOrdrLoc(map);
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 재고이동결과 생성
	 * 
	 * @param map
	 */
	public void saveMvRslt(Map<String, Object> map) {

		//채번 및 ID 부여 Map
		Map<String, Object> cntMap = new HashMap<String, Object>();
		cntMap.put("biz", (String) map.get("biz"));
		cntMap.put("dc", (String) map.get("dc"));
		cntMap.put("client", (String) map.get("client"));
		cntMap.put("cntde", (String) map.get("plande"));
		cntMap.put("cnttp1", "ST_MVRSLT");
		cntMap.put("cnttp2", "RSLTNO");
		cntMap.put("cnttp3", "*");
		
		String rsltNo = etcService.saveCnt(cntMap);
		map.put("rsltno", rsltNo);
		
		//깨끗한나라 default 값 설정
		map.put("uos", "None");
		map.put("ordrqty", map.get("planqty"));
		map.put("rsltqty", map.get("planqty"));
		setMvRsltTrStat(map); //필수값 : frloc, toloc
		
		mvDao.insertMvRslt(map);
	}
	
	/**
	 * 깨끗한나라 - 재고이동결과 생성 (RSLTNO, RSLTSN 생성 x) 
	 * 
	 * @param map
	 */
	public void saveMvRsltForEcs(Map<String, Object> map) {

		map.put("lot", map.get("frlot"));
		map.put("caseid", map.get("frcaseid"));

		//깨끗한나라 default 값 설정
//		map.put("rsltqty", "1");
map.put("trstat", "X");
map.put("rsltaplyn", "Y");
map.put("rgsusr", "ECS");
map.put("updusr", "ECS");

		if(map.get("oderlblid") == null) {
			map.put("oderlblid", "*");
		}
		mvDao.insertMvRsltForEcs(map);
	}

	/************************************************************************************
	 * 깨끗한나라 - [비즈니스로직]재고이동지시만 생성(51)
	 * 
	 * @param map
	 */
	public void procMvOrdr(Map<String, Object> map) {

		setMvHdSysTrStat(map); //송수산상태 변수처리를 위한 메서드 호출
		
		//커터창고, 밀롤창고 IF 문 처리용 변수
		String toarea = (String)map.get("toarea");
		String rcmdarea = (String)map.get("rcmdarea");
		
		/* ST_MVHD(재고이동) 생성, 이동번호 생성 */
		Map<String, Object> hdMap = new HashMap<String, Object>(); 
		hdMap.putAll(map);
		hdMap.put("frsys", "WCS");
		hdMap.put("workodr", "0");
		hdMap.put("priort", "99999"); //default
		hdMap.put("stat", "51"); 
		hdMap.put("reftp", (map.get("hdreftp") != null) ? map.get("hdreftp") : "None");
		hdMap.put("refval1", (map.get("hdrefval1") != null) ? map.get("hdrefval1") : "*");
		hdMap.put("plande", map.get("plande"));
		hdMap.put("updusr", map.get("updusr"));

		mvService.saveMvHd(hdMap);
		map.put("mvno", hdMap.get("mvno"));
		map.put("workodr", hdMap.get("workodr"));
		
		
		
		Map<String, Object> dtMap = new HashMap<String, Object>(); 
		/* ST_MVDT(재고이동품목) 생성, 이동순번 생성 */
		dtMap.putAll(map);
		dtMap.put("planqty", 0);
		dtMap.put("ordrqty", map.get("planqty"));		
		dtMap.put("rsltqty", 0);
		dtMap.put("refval1", (dtMap.get("dtrefval1") != null ? dtMap.get("dtrefval1") : "*"));
		dtMap.put("stat", "51");		
		dtMap.put("uos", "None");
		dtMap.put("uom", "None");
	
		mvService.saveMvDt(dtMap);
		map.put("mvsn", dtMap.get("mvsn"));
		
		Map<String, Object> asgnMap = new HashMap<String, Object>(); 
		/* ST_MVORDR(재고이동지시) 생성 */
		asgnMap.putAll(map);
		asgnMap.put("frloc", asgnMap.get("frloc"));
		asgnMap.put("frlot", asgnMap.get("lot"));
		asgnMap.put("frpltid", asgnMap.get("pltid"));
		asgnMap.put("frcaseid", asgnMap.get("caseid"));
		asgnMap.put("freaid", asgnMap.get("eaid"));
		asgnMap.put("toloc", asgnMap.get("toloc"));
		asgnMap.put("tolot", asgnMap.get("lot"));
		asgnMap.put("topltid", asgnMap.get("pltid"));
		asgnMap.put("tocaseid", asgnMap.get("caseid"));
		asgnMap.put("toeaid", asgnMap.get("eaid"));
		
		
		asgnMap.put("uos", "None");
		asgnMap.put("ordrqty", map.get("planqty"));
		asgnMap.put("wt", map.get("wt"));
		asgnMap.put("stat", "51");
		asgnMap.put("refval1", (asgnMap.get("ordrrefval1") != null ? asgnMap.get("ordrrefval1") : "*"));
		asgnMap.put("refval2", (asgnMap.get("ordrrefval2") != null ? asgnMap.get("ordrrefval2") : "*"));
		asgnMap.put("updusr", map.get("updusr"));
		asgnMap.put("rcptde", map.get("plande"));
		
		mvService.saveMvOrdr(asgnMap);
		map.put("ordrno", asgnMap.get("ordrno"));
		map.put("ordrsn", asgnMap.get("ordrsn"));
		
	}
	
	/************************************************************************************
	 * 깨끗한나라 - [비즈니스로직]재고이동지시 및 결과 생성(50)
	 * 
	 * @param map
	 */
	public void procMvOrdrCompt(Map<String, Object> map) {

		setMvHdSysTrStat(map); //송수산상태 변수처리를 위한 메서드 호출
		
		//커터창고, 밀롤창고 IF 문 처리용 변수
		String toarea = (String)map.get("toarea");
		String rcmdarea = (String)map.get("rcmdarea");
		
		/* ST_MVHD(재고이동) 생성, 이동번호 생성 */
		Map<String, Object> hdMap = new HashMap<String, Object>(); 
		hdMap.putAll(map);
		hdMap.put("workodr", "0");
		hdMap.put("priort", "99999"); //default
		hdMap.put("stat", "50"); 
		hdMap.put("reftp", (map.get("hdreftp") != null) ? map.get("hdreftp") : "None");
		hdMap.put("refval1", (map.get("hdrefval1") != null) ? map.get("hdrefval1") : "*");
		hdMap.put("plande", map.get("rcptde"));
		hdMap.put("updusr", map.get("updusr"));

		mvService.saveMvHd(hdMap);
		map.put("mvno", hdMap.get("mvno")); 
		
		
		Map<String, Object> dtMap = new HashMap<String, Object>(); 
		/* ST_MVDT(재고이동품목) 생성, 이동순번 생성 */
		dtMap.putAll(map);
		dtMap.put("planqty", 0);
		dtMap.put("ordrqty", map.get("planqty"));		
		dtMap.put("rsltqty", 0);
		dtMap.put("refval1", (dtMap.get("dtrefval1") != null ? dtMap.get("dtrefval1") : "*"));
		dtMap.put("stat", "50");		
		dtMap.put("uos", "None");
	
		mvService.saveMvDt(dtMap);
		map.put("mvsn", dtMap.get("mvsn"));
		
		Map<String, Object> asgnMap = new HashMap<String, Object>(); 
		/* ST_MVORDR(재고이동지시) 생성 */
		asgnMap.putAll(map);
		asgnMap.put("frloc", asgnMap.get("frloc"));
		asgnMap.put("frlot", asgnMap.get("lot"));
		asgnMap.put("frpltid", asgnMap.get("pltid"));
		asgnMap.put("frcaseid", asgnMap.get("caseid"));
		asgnMap.put("freaid", asgnMap.get("eaid"));
		asgnMap.put("toloc", asgnMap.get("toloc"));
		asgnMap.put("tolot", asgnMap.get("lot"));
		asgnMap.put("topltid", asgnMap.get("pltid"));
		asgnMap.put("tocaseid", asgnMap.get("caseid"));
		asgnMap.put("toeaid", asgnMap.get("eaid"));
		
		
		asgnMap.put("uos", "None");
		asgnMap.put("ordrqty", map.get("planqty"));
		asgnMap.put("wt", map.get("wt"));
		asgnMap.put("stat", "50");
		asgnMap.put("refval1", (asgnMap.get("ordrrefval1") != null ? asgnMap.get("ordrrefval1") : "*"));
		asgnMap.put("refval2", (asgnMap.get("ordrrefval2") != null ? asgnMap.get("ordrrefval2") : "*"));
		asgnMap.put("updusr", map.get("updusr"));
		asgnMap.put("rcptde", map.get("rcptde"));
		
		mvService.saveMvOrdr(asgnMap);
		map.put("ordrno", asgnMap.get("ordrno"));
		map.put("ordrsn", asgnMap.get("ordrsn"));
		
		//결과번호 있다면 [ECS채번]
		//         없다면 [WCS채번]  
		if(map.get("rsltno") == null) {
			saveMvRslt(map);
		}else {
			saveMvRsltForEcs(map);
		}
	}
	

	/************************************************************************************
	 * 깨끗한나라 - [비즈니스로직][IF 수신]재고이동지시 완료(50)
	 * 
	 * @param map
	 */
	public void procMvCompt(Map<String, Object> map) {
		map.put("stat", "50");
		map.put("updusr", "ECS");
		
		mvDao.updateMvHd(map);
		
		mvDao.updateMvDt(map);
		
		mvDao.updateMvOrdrStat(map);
		
		saveMvRsltForEcs(map);
	}	
	
	/************************************************************************************
	 * 깨끗한나라 - [비즈니스로직][IF 수신]재고이동지시취소 완료(99)
	 * 
	 * @param map
	 */
	public void procMvCnclCompt(Map<String, Object> map) {
		map.put("stat", "99");
		map.put("updusr", "ECS");
		
		mvDao.updateMvHd(map);
		
		mvDao.updateMvDt(map);
		
		mvDao.updateMvOrdrStat(map);
		
		//출고일 경우만
		if(map.get("workstat") != null && ((String)map.get("workstat")).equals("O")) saveMvRsltForEcs(map);
	}	
	
	/************************************************************************************
	 * 깨끗한나라 - 이동지시(입고예약)
	 * 
	 * @param map {eaid, client, dc, biz, mvtp, mvty}
	 * 이동지시와 별개로, 이동유형 관리를 하지 않기 때문에 method 새로 생성.
	 *  
	 */
	public String excMvOrdrForRcptReservation(Map<String, Object> map) {

		String mvtp = (String)map.get("mvtp");
		String mvty = (String)map.get("mvty");
		
		//1-1. 처리대상 확인
		List<EgovMap> resultMapList = stokDao.selectPdaMillrollScanForMv(map); //재고이동대상 조회
		if(!ObjectUtil.isNotNull(resultMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		map.putAll(resultMapList.get(0));
		
		//1-2. 권장 로케이션 확인
		List<EgovMap> list = rcptDao.selectRecommendLocMillrollList(map);
		if(list.size() == 0) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		Map<String, Object> frMap = new HashMap<String, Object>();
		frMap.put("lot", map.get("tolot"));
		frMap.put("pltid", map.get("topltid"));
		frMap.put("caseid", map.get("tocaseid"));
		frMap.put("eaid", map.get("toeaid"));
		frMap.put("sku", map.get("sku"));
		frMap.put("packunit", map.get("packunit"));
		frMap.put("loc", map.get("rcmdloc")); //*** 기존 MV 전표의 TOLOC AS RCMDLOC
		frMap.put("grad", map.get("grad"));
		frMap.put("client", map.get("client"));
		frMap.put("dc", map.get("dc"));
		frMap.put("biz", map.get("biz"));
		
		Map<String, Object> toMap = new HashMap<String, Object>();
		toMap.put("lot", map.get("tolot"));
		toMap.put("pltid", map.get("topltid"));
		toMap.put("caseid", map.get("tocaseid"));
		toMap.put("eaid", map.get("toeaid"));
		toMap.put("sku", map.get("sku"));
		toMap.put("packunit", map.get("packunit"));
		toMap.put("loc", list.get(0).get("loc")); //*** 권장로케이션 부분
		toMap.put("grad", map.get("grad"));
		toMap.put("client", map.get("client"));
		toMap.put("dc", map.get("dc"));
		toMap.put("biz", map.get("biz"));
		
		//2.재고변경
		//(toloc)
		frMap.put("stokplanqtysgn", -1); //예정량(-)
		frMap.put("qty", +1);
		stokService.saveMvStok(frMap);
		
		//(rcmdloc)
		toMap.put("stokplanqtysgn", 1); //예정량(+)
		toMap.put("qty", +1);
		stokService.saveMvStok(toMap);
		
		//권장로케이션 수정
		map.put("toloc", list.get(0).get("loc"));
		mvDao.updateMvOrdrLoc(map);
		
		//변경된 변수 저장
		map.put("frarea", resultMapList.get(0).get("frarea"));
		map.put("frloc", resultMapList.get(0).get("frloc"));
		map.put("toarea", list.get(0).get("area"));
		map.put("toloc", list.get(0).get("loc"));

		return "MSG001";	//정상적으로 처리되었습니다.
	}

	/************************************************************************************
	 * 깨끗한나라 - 이동지시(입고예약) - procedure
	 * 
	 * @param map {eaid, client, dc, biz, mvtp, mvty}
	 * 이동지시와 별개로, 이동유형 관리를 하지 않기 때문에 method 새로 생성.
	 *  
	 */
	public String excMvOrdrForRcptReservationProcedure(Map<String, Object> map) {

		mvDao.excMvOrdrForRcptReservationProcedure(map);

		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	
	/************************************************************************************
	 * 깨끗한나라 - 이동지시
	 * 
	 * @param map {eaid, client, dc, biz, mvtp, mvty}
	 *  
	 */
	public String excMvOrdr(Map<String, Object> map) {

		String mvtp = (String)map.get("mvtp");
		String mvty = (String)map.get("mvty");

//		Map<String, Object> returnMap = mvDao.selectPdaMv(map); //return : biz, dc, client, mvno, mvsn, ordrno, ordrsn, eaid, mvno, mvsn, asgnno....

		Map<String, Object> frMap = new HashMap<String, Object>();
		frMap.put("lot", map.get("frlot"));
		frMap.put("pltid", map.get("frpltid"));
		frMap.put("caseid", map.get("frcaseid"));
		frMap.put("eaid", map.get("freaid"));
		frMap.put("sku", map.get("sku"));
		frMap.put("packunit", map.get("packunit"));
		frMap.put("loc", map.get("frloc"));
		frMap.put("grad", map.get("grad"));
		frMap.put("client", map.get("client"));
		frMap.put("dc", map.get("dc"));
		frMap.put("biz", map.get("biz"));
		
		Map<String, Object> toMap = new HashMap<String, Object>();
		toMap.put("lot", map.get("tolot"));
		toMap.put("pltid", map.get("topltid"));
		toMap.put("caseid", map.get("tocaseid"));
		toMap.put("eaid", map.get("toeaid"));
		toMap.put("sku", map.get("sku"));
		toMap.put("packunit", map.get("packunit"));
		toMap.put("loc", map.get("toloc"));
		toMap.put("grad", map.get("grad"));
		toMap.put("client", map.get("client"));
		toMap.put("dc", map.get("dc"));
		toMap.put("biz", map.get("biz"));
		
		//2.재고변경
		frMap.put("stokallcqtysgn", 1); //할당량(+)
		frMap.put("qty", +1);
		stokService.saveMvStok(frMap);
		
		toMap.put("stokplanqtysgn", 1); //예정량(+)
		toMap.put("qty", +1);
		stokService.saveMvStok(toMap);

		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 이동지시 취소
	 * 
	 * @param map
	 */ 
	@SuppressWarnings("unchecked")
	public String saveMvOrdrCncl(List<Map<String, Object>> mapList) {
		
		for(int i=0 ; i<mapList.size() ; i++){
			
			String ordrNoSn = (String) mapList.get(i).get("ordrno");
			String ordrNo = ordrNoSn.split("\\.")[0];
			String ordrSn = ordrNoSn.split("\\.")[1];
			
			mapList.get(i).put("ordrno", ordrNo);
			mapList.get(i).put("ordrsn", ordrSn);
			
			//1. 이동취소 대상 재고이동지시 조회
			EgovMap mvOrdrMap = mvDao.selectMvOrdrForMvOrdrCncl(mapList.get(i));
			if(!ObjectUtil.isNotNull(mvOrdrMap)) throw new BizException("MSG006"); //BizException 이동지시정보가 존재하지 않습니다.
			
			String mvTp = (String) mvOrdrMap.get("mvtp");
			String mvTy = (String) mvOrdrMap.get("mvty");
			
			if(mvTp.equals("M61")) {
				if(mvTy.indexOf("I") > -1) {
					//0. 설비 작동 확인
					//밀롤창고에서 작업중입니다.
					mvOrdrMap.put("trstat", "1");
					List<EgovMap> data = ecsDao.selectRcptPlanInfoTrList(mvOrdrMap);
					if(ObjectUtil.isNotNull(data)) throw new BizException("MSG629");				
				}else if(mvTy.equals("O10")) {
//					mvOrdrMap.put("trstat", "1");
//					EgovMap oderPlanInfoMap = ecsDao.selectOderPlanInfoTr(mvOrdrMap);
//					if(ObjectUtil.isNotNull(oderPlanInfoMap)) throw new BizException("MSG629");

				}else if(mvTy.indexOf("M")>-1) {
					mvOrdrMap.put("trstat", "1");
					List<EgovMap> data = ecsDao.selectMovePlanInfoTrList(mvOrdrMap);
					if(ObjectUtil.isNotNull(data)) throw new BizException("MSG629");		
					
				}
			}

			
			//2. 재고이동지시 상태 갱신 (취소) update : stat = 99		
			mvOrdrMap.put("stat", "99");		//취소
			mvOrdrMap.put("updusr", mapList.get(i).get("updusr"));
			mvDao.updateMvOrdrStat(mvOrdrMap);
			
			//3. 이동지시 취소
			// excMvOrdrCncl param : [mvOrdrMap : eaid, client, dc, biz, mvtp, mvty]
			mvService.excMvOrdrCncl(mvOrdrMap);
			
			//3-3-1. TODO : 이동지시 취소 이후
			if(mvTp.equals("M61")) {
				if(mvTy.indexOf("I") > -1) {
					//밀롤창고에 대한 재고이동 작업지시의 취소(삭제)
					mvOrdrMap.put("eaid", mvOrdrMap.get("toeaid"));	//TODO eaid
					mvOrdrMap.put("mlbrcd", mvOrdrMap.get("toeaid"));	//TODO eaid
					mvOrdrMap.put("stat", "D");
					mvOrdrMap.put("ordrno", ordrNo);
					mvOrdrMap.put("ordrsn", ordrSn);
					ecsService.excRcptPlanInfoTr(mvOrdrMap); //S02-11 : 입고예정정보 송신					
				}else if(mvTy.equals("O10")) {
					ecsService.excOderPlanInfoTr(mvOrdrMap);  //S02-14 : 출고예정정보 송신
				}else if(mvTy.indexOf("M")>-1) {
					//밀롤창고에 대한 재고이동 작업지시의 취소(삭제)
					mvOrdrMap.put("eaid", mvOrdrMap.get("toeaid"));	//TODO eaid
					mvOrdrMap.put("mlbrcd", mvOrdrMap.get("toeaid"));	//TODO eaid
					mvOrdrMap.put("stat", "D");
					mvOrdrMap.put("ordrno", ordrNo);
					mvOrdrMap.put("ordrsn", ordrSn);
					ecsService.excMvPlanInfoTr(mvOrdrMap); //S02-16 : 이동예정정보 송신
					
				}
			}
			
			if(
				((String)mvOrdrMap.get("hdreftp")).equals("RC_RCPTHD") && !((String)mvOrdrMap.get("hdreftp")).equals("*")  //입고
					) {
				putwService.updateRcptAsgnForPutwOrdrCncl(mvOrdrMap);
			}
			//3-3-2. 작업지시의 취소
			
		}

		return "MSG001";	// 정상적으로 처리되었습니다.
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 이동지시 취소 && 이동 취소 && 출고취소
	 * 
	 * @param map {eaid, client, dc, biz, mvtp, mvty}
	 */
	public String excMvOrdrCncl(Map<String, Object> map) {
//		   밀롤 단위(RC_RCPTASGN) 적치지시 취소 처리
//		   - 권장위치 = *, 적치상태 = '작업예정'

		String mvtp = (String)map.get("mvtp");
		String mvty = (String)map.get("mvty");
		
		@SuppressWarnings("unchecked")
//		Map<String, Object> returnMap = mvDao.selectPdaMv(map); //return : biz, dc, client, mvno, mvsn, ordrno, ordrsn, eaid, mvno, mvsn, asgnno....

		Map<String, Object> frMap = new HashMap<String, Object>();
		frMap.put("lot", map.get("frlot"));
		frMap.put("pltid", map.get("frpltid"));
		frMap.put("caseid", map.get("frcaseid"));
		frMap.put("eaid", map.get("freaid"));
		frMap.put("sku", map.get("sku"));
		frMap.put("packunit", map.get("packunit"));
		frMap.put("loc", map.get("frloc"));
		frMap.put("grad", map.get("grad"));
		frMap.put("client", map.get("client"));
		frMap.put("dc", map.get("dc"));
		frMap.put("biz", map.get("biz"));
		
		Map<String, Object> toMap = new HashMap<String, Object>();
		toMap.put("lot", map.get("tolot"));
		toMap.put("pltid", map.get("topltid"));
		toMap.put("caseid", map.get("tocaseid"));
		toMap.put("eaid", map.get("toeaid"));
		toMap.put("sku", map.get("sku"));
		toMap.put("packunit", map.get("packunit"));
		toMap.put("loc", map.get("toloc"));
		toMap.put("grad", map.get("grad"));
		toMap.put("client", map.get("client"));
		toMap.put("dc", map.get("dc"));
		toMap.put("biz", map.get("biz"));
		
		//2.재고변경
		frMap.put("stokallcqtysgn", -1); //할당량(-)
		frMap.put("qty", 1);
		stokService.saveMvStok(frMap);
		
		//2.재고변경
		toMap.put("stokplanqtysgn", -1); //예정량(-)
		toMap.put("qty", 1);
		stokService.saveMvStok(toMap);
		
		//mvtp 에 의한 분기가 필요없어 보임.
//		if(mvtp.equals("M61")) {
//			
//			//2.재고변경
//			frMap.put("stokallcqtysgn", -1); //할당량(-)
//			frMap.put("qty", 1);
//			stokService.saveMvStok(frMap);
//			
//			//2.재고변경
//			toMap.put("stokplanqtysgn", -1); //예정량(-)
//			toMap.put("qty", 1);
//			stokService.saveMvStok(toMap);
//		   
//		}else if(mvtp.equals("M41")) {
//			
//			//2.재고변경
//			frMap.put("stokallcqtysgn", -1); //할당량(-)
//			frMap.put("qty", 1);
//			stokService.saveMvStok(frMap);
//			
//			//2.재고변경
//			toMap.put("stokplanqtysgn", -1); //예정량(-)
//			toMap.put("qty", 1);
//			stokService.saveMvStok(toMap);
//		   
//
//		}else {
//			
//		}
return "MSG001";	//정상적으로 처리되었습니다.
}

	/************************************************************************************
	 * 깨끗한나라 - 이동완료
	 * 
	 * @param map {eaid, client, dc, biz, mvtp, mvty, frarea, frloc, toloc, rcmdloc}
	 */
	public String excMvCompt(Map<String, Object> map) {
		
		//변수
		String mvty = (String)map.get("mvty");
		
		String frarea = (String)map.get("frarea");
		String frloc = (String)map.get("frloc"); //재고위치
		String toarea = (String)map.get("toarea");
		String toloc = (String)map.get("toloc"); //BCR 또는 PDA 스캔 toloc
		String rcmdarea = (String)map.get("rcmdarea");
		String rcmdloc = (String)map.get("rcmdloc"); //지시있을때의 toloc
		
		@SuppressWarnings("unchecked")
//		Map<String, Object> returnMap = mvDao.selectPdaMv(map); //param : biz, dc, client, eaid

		Map<String, Object> frMap = new HashMap<String, Object>();
		frMap.put("lot", map.get("frlot"));
		frMap.put("pltid", map.get("frpltid"));
		frMap.put("caseid", map.get("frcaseid"));
		frMap.put("eaid", map.get("freaid"));
		frMap.put("sku", map.get("sku"));
		frMap.put("packunit", map.get("packunit"));
		frMap.put("loc", map.get("frloc"));
		frMap.put("grad", map.get("grad"));
		frMap.put("client", map.get("client"));
		frMap.put("dc", map.get("dc"));
		frMap.put("biz", map.get("biz"));
		
		Map<String, Object> toMap = new HashMap<String, Object>();
		toMap.put("lot", map.get("tolot"));
		toMap.put("pltid", map.get("topltid"));
		toMap.put("caseid", map.get("tocaseid"));
		toMap.put("eaid", map.get("toeaid"));
		toMap.put("sku", map.get("sku"));
		toMap.put("packunit", map.get("packunit"));
		toMap.put("loc", map.get("toloc"));
		toMap.put("grad", map.get("grad"));
		toMap.put("client", map.get("client"));
		toMap.put("dc", map.get("dc"));
		toMap.put("biz", map.get("biz"));
		
		//CASE#1
		if(rcmdloc != null && frarea != null && toarea != null &&  "M".equals(frarea) && "M".equals(toarea) && mvty.indexOf("M") > -1) {
			//FR 재고변경
			frMap.put("stokallcqtysgn", -1); //할당량(-)
			frMap.put("stokstokqtysgn", -1); //재고량(-)
			frMap.put("qty", 1);
			stokService.saveMvStok(frMap);
			
			//TO 재고변경
			toMap.put("stokallcqtysgn", 1); //할당량(+)
			toMap.put("stokstokqtysgn", 1); //재고량(+)
			toMap.put("qty", 1);
			stokService.saveMvStok(toMap);
			
		//CASE#2
		}else if( (rcmdloc == null && "M".equals(frarea) && "M".equals(toarea) && mvty.indexOf("M") > -1) 
			   || (rcmdloc == null && "A".equals(frarea) && "A".equals(toarea) && "M21".equals(mvty)) 	//설비내 이동 
			   || (rcmdloc == null && "A".equals(frarea) && "M".equals(toarea) && "M21".equals(mvty))   //S15-20	임시이동출고	"밀롤창고 내('A1', 'A2' Zone) 임시이동오류로 3구간으로 출고처리- 이동결과.To = 3구간(M03)"	-	-				재고량(-)			재고량(+)	
			   ) {
			//FR 재고변경	
			frMap.put("stokstokqtysgn", -1); //재고량(-)
			frMap.put("qty", 1);
			stokService.saveMvStok(frMap);
			
			//TO 재고변경
			toMap.put("stokstokqtysgn", 1); //재고량(+)
			toMap.put("qty", 1);
			stokService.saveMvStok(toMap);
		//CASE#3 
		}else if(rcmdloc != null && rcmdloc.equals(toloc)
			 || ("A".equals(frarea) && "A".equals(toarea))
			 || ("M".equals(frarea) && "A".equals(toarea))
			 || ("M03".equals(toloc) && mvty.indexOf("O") > -1 ) //출고예정정보 수신
			 ) {

			//FR 재고변경
			frMap.put("stokallcqtysgn", -1); //할당량(-)
			frMap.put("stokstokqtysgn", -1); //재고량(-)
			frMap.put("qty", 1);
			stokService.saveMvStok(frMap);
			
			//TO 재고변경
			toMap.put("stokplanqtysgn", -1); //예정량(-)
			toMap.put("stokstokqtysgn", 1); //재고량(+)
			toMap.put("qty", 1);
			stokService.saveMvStok(toMap);
			
		//CASE #4
		}else {
			if(mvty.equals("M10")
			 || (("A".equals(rcmdarea) && "B".equals(toarea)))
			 || ("B".equals(rcmdarea) && "B".equals(toarea))) {
				
				//FR 재고변경
				frMap.put("stokstokqtysgn", -1); //재고량(-)
				frMap.put("qty", 1);
				stokService.saveMvStok(frMap);
				
				//TO 재고변경
				toMap.put("stokstokqtysgn", 1); //재고량(+)
				toMap.put("qty", 1);
				stokService.saveMvStok(toMap);
			}
		}
		System.out.println("@@@ MvService - excMvCompt - 이동완료 @@@@@@@@@@@@@@@@@");
		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 이동 출고 S15-19, 입고 취소 S15-16
	 * 
	 * @param map {eaid, client, dc, biz, mvtp, mvty}
	 */
	public String excMvOder(Map<String, Object> map) {
//		   밀롤 단위(RC_RCPTASGN) 적치지시 취소 처리
//		   - 권장위치 = *, 적치상태 = '작업예정'

		String mvtp = (String)map.get("mvtp");
		String mvty = (String)map.get("mvty");
		
		@SuppressWarnings("unchecked")
//		Map<String, Object> returnMap = mvDao.selectPdaMv(map); //return : biz, dc, client, mvno, mvsn, ordrno, ordrsn, eaid, mvno, mvsn, asgnno....

		Map<String, Object> frMap = new HashMap<String, Object>();
		frMap.put("lot", map.get("frlot"));
		frMap.put("pltid", map.get("frpltid"));
		frMap.put("caseid", map.get("frcaseid"));
		frMap.put("eaid", map.get("freaid"));
		frMap.put("sku", map.get("sku"));
		frMap.put("packunit", map.get("packunit"));
		frMap.put("loc", map.get("frloc"));
		frMap.put("grad", map.get("grad"));
		frMap.put("client", map.get("client"));
		frMap.put("dc", map.get("dc"));
		frMap.put("biz", map.get("biz"));
		
		Map<String, Object> toMap = new HashMap<String, Object>();
		toMap.put("lot", map.get("tolot"));
		toMap.put("pltid", map.get("topltid"));
		toMap.put("caseid", map.get("tocaseid"));
		toMap.put("eaid", map.get("toeaid"));
		toMap.put("sku", map.get("sku"));
		toMap.put("packunit", map.get("packunit"));
		toMap.put("loc", map.get("toloc"));
		toMap.put("grad", map.get("grad"));
		toMap.put("client", map.get("client"));
		toMap.put("dc", map.get("dc"));
		toMap.put("biz", map.get("biz"));
			
		//2.재고변경
		frMap.put("stokallcqtysgn", -1); //할당량(-)
		frMap.put("stokstokqtysgn", -1); //재고량(-)
		frMap.put("qty", 1);
		stokService.saveMvStok(frMap);
		
		//2.재고변경
		toMap.put("stokstokqtysgn", 1); //재고량(+)
		toMap.put("qty", 1);
		stokService.saveMvStok(toMap);
		
		Map<String, Object> rcmcMap = new HashMap<String, Object>();
		rcmcMap.put("lot", map.get("tolot"));
		rcmcMap.put("pltid", map.get("topltid"));
		rcmcMap.put("caseid", map.get("tocaseid"));
		rcmcMap.put("eaid", map.get("toeaid"));
		rcmcMap.put("sku", map.get("sku"));
		rcmcMap.put("packunit", map.get("packunit"));
		rcmcMap.put("loc", map.get("rcmdloc"));
		rcmcMap.put("grad", map.get("grad"));
		rcmcMap.put("client", map.get("client"));
		rcmcMap.put("dc", map.get("dc"));
		rcmcMap.put("biz", map.get("biz"));
	   
		//2.재고변경
		rcmcMap.put("stokplanqtysgn", -1); //예정량(-)
		rcmcMap.put("qty", 1);
		stokService.saveMvStok(rcmcMap);
		

		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	/************************************************************************************
	 * 깨끗한나라 - PDA 재고이동
	 * 
	 * @param map
	 * 필수키 
	 * biz, dc, client, eaid, toloc
	 */
	@SuppressWarnings("unchecked")
	public String savePdaProcMv(Map<String, Object> map) {
		
		//1-1. 필수값 체크
		if(map == null || map.get("eaid") == null || map.get("toloc") == null ) {
			throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		}

		//변수(BCR, PDA의 이동대상)
		String toloc = (String)map.get("toloc");
		map.put("loc", toloc);
		List<EgovMap> areaList = locDao.selectAreaZoneForLoc(map);
		String toarea = (areaList.size() > 0 ? (String)(areaList.get(0).get("area")) : "" );
		String tolocextcol01 = (areaList.size() > 0 ? (String)(areaList.get(0).get("extcol01")) : "" ); // 로케이션 자동처리여부
		if(toarea.equals("")) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		//1-2. 처리대상 확인
		List<EgovMap> resultMapList = stokDao.selectPdaMillrollScanForMv(map); //재고이동대상 조회
		if(!ObjectUtil.isNotNull(resultMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		//변수 재정의
		map.clear();
		map = (Map<String, Object>)resultMapList.get(0);
		
		//변수(로직처리할 비교변수)
		String frarea = (String)map.get("frarea");
		String frloc = (String)map.get("frloc");
		String rcmdarea = (String)map.get("rcmdarea"); //기존 지시의 TOLOC 은 RCMDLOC 로 변경하여 사용. 입력받은 TOLOC 와 구분하기 위함.
		String rcmdloc = (String)map.get("rcmdloc");
		String rcmdlocextcol01 = (String)map.get("rcmdlocextcol01"); //권장위치 로케이션 자동처리여부
		
		map.put("toarea", toarea);
		map.put("toloc", toloc);
		map.put("mlbrcd", map.get("eaid"));
		//workstat : N: 정상(밀롤창고 입고 처리), P: 밀기(커터대기장 B30으로 Push 처리), I/F정보가 없는 경우 4구간으로 진행
		if(tolocextcol01.equals("Y")) {
			map.put("workstat", "P");
		}else{
			map.put("workstat", "N");
		}
		
		//1-3. 동일한 로케이션으로 이동금지
		if(frloc.equals(toloc)) throw new BizException("MSG006"); //동일한 로케이션으로 재고이동할 수 없습니다.
		
		//S15-02 : PDA재고이동 
		//신규 재고이동 등록 
		if(map.get("mvty") == null) {
			if("B".equals(toarea) && tolocextcol01.equals("Y")) { //? -> 커, 자동적치
				System.out.println("[재고이동] ? -> B Y");
				/* S15-01. 신규 재고이동  밀롤창고 --> 커터대기창고 이동 */
				//1. SET MVTP, MVTY. FrSys, ToSys, TrStat
				map.put("mvtp", "M61");
				map.put("mvty", "I11");
				setMvHdSysTrStat(map);		
				
				//2. 재고이동 생성
				procMvOrdr(map);
				
				//3. 이동지시 호출
				mvService.excMvOrdr(map); //S15-11 : 재고이동 지시(수량)
				
				// M61 && i10입고예정 o10출고예정 O11, M21, M23 이동예정
				// 4. 이동지시 이후 호출서비스
				map.put("mlbrcd", map.get("eaid"));
				ecsService.excRcptPlanInfoTr(map); //S02-11 : 입고예정정보 송신
			}else if("M".equals(frarea) && "M".equals(toarea)) { //임의이동 들
				System.out.println("[재고이동] M -> M");
				map.put("mvty", "M80");
					
				///////////////////////////////////////////////////////////////////////////
				//[TODO] ERROR 남. MVTP 정의 되지 않음.
				///////////////////////////////////////////////////////////////////////////
				//1-1. 이동지시CRUD(신규)
				procMvOrdr(map); //S15-11 : 재고이동 지시(전표)
				
				//1-2. 이동결과CRUD
				saveMvRslt(map); //S15-052 : PDA 재고이동(이동결과)
				
				//1-3. 이동완료, 재고
				mvService.excMvCompt(map); //S15-13 : CASE#1 이동완료
				
			}else if("B".equals(frarea) && "A".equals(toarea)
			      || "M".equals(frarea) && "A".equals(toarea)
					) { //커->밀, 레일->밀
				System.out.println("[재고이동] B -> A");
				String mvty = "I10";
				map.put("mvtp", "M61");
				map.put("mvty", mvty);
				
				//1-1. 이동지시CRUD(신규)
				procMvOrdr(map); //S15-11 : 재고이동 지시(전표)
				
				//1-2. 이동지시, 재고
				mvService.excMvOrdr(map); //S15-11 : 재고이동 지시(수량)
				
				//1-3. 호출 서비스


				ecsService.excRcptPlanInfoTr(map); //S02-11 : 입고예정정보 송신
				
			}else if("B".equals(frarea) && "B".equals(toarea)
				  || "M".equals(frarea) && "B".equals(toarea)) { //커->커, 레일->커
				System.out.println("[재고이동] B,M -> B");
				String mvty = "M10";
				map.put("mvtp", "M41");
				map.put("mvty", mvty);
				
				//1-1. 이동지시CRUD(신규)
				procMvOrdrCompt(map);
				
				excMvCompt(map); //S15-13 : CASE#4 이동완료
				
				//1-5. 호출 서비스
				if(mvty.equals("I10")) {
					map.put("rcptno", map.get("hdrefval1"));
					map.put("rcptsn", map.get("dtrefval1"));
					map.put("asgnno", map.get("ordrrefval1"));
					putwService.updateRcptAsgnForPutwCompt(map); //S12-12 : 적치완료 
				}else if(mvty.equals("O10")) {
				}else {
				}
				
			}else if("A".equals(frarea) && "B".equals(toarea)
					) { //밀->커
				System.out.println("[재고이동] A -> B");
				/* S15-01. 신규 재고이동  밀롤창고 --> 커터대기창고 이동 */
				//1. SET MVTP, MVTY. FrSys, ToSys, TrStat
				map.put("mvtp", "M61");
				map.put("mvty", "O10");
				setMvHdSysTrStat(map);		
				
				//2. 재고이동 생성
				procMvOrdr(map);
				
				//3. 이동지시 호출
				mvService.excMvOrdr(map); //S15-11 : 재고이동 지시(수량)
				
				// M61 && i10입고예정 o10출고예정 O11, M21, M23 이동예정
				// 4. 이동지시 이후 호출서비스
				map.put("mlbrcd", map.get("eaid"));
				ecsService.excOderPlanInfoTr(map);  //TODO S02-14 : 출고예정정보 송신
				
				
			}else if("A".equals(frarea) && "A".equals(toarea)
				  ) { //밀->밀
				System.out.println("[재고이동] A,M -> A");
				/* S15-01. 신규 재고이동  밀롤창고 --> 밀롤창고 이동 */
				map.put("mvtp", "M61");
				map.put("mvty", "M21");
				setMvHdSysTrStat(map);		
				
				//2. 재고이동 생성
				procMvOrdr(map); 

				//3. 이동지시 호출
				mvService.excMvOrdr(map); //S15-11 : 재고이동 지시(수량)
				
				// 4. 이동지시 이후 호출서비스
				map.put("mvde", map.get("plande"));
				map.put("mlbrcd", map.get("freaid"));
				ecsService.excMvPlanInfoTr(map); //TODO S02-16 : 이동예정정보 송신
				
			}else {
				throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
			}
			
			//S15-02 : PDA재고이동 //지시중 재고이동 등록 //전표있음
		}else {
			if("A".equals(frarea) && "B".equals(toarea) && tolocextcol01.equals("Y")) { //?->커, 자동적치
				System.out.println("[재고이동 전표O] ? -> B Y");
				String mvty = (String)map.get("mvty");
				map.put("mvtp", "M61");
				
				//1-1. 이동지시, 재고
				map.put("toloc", rcmdloc);
				excMvOrdrCncl(map); //S15-12 : 재고이동 지시취소(수량)
				map.put("toloc", toloc);
				
				//1-2. 이동지시CRUD(수정)
				map.put("stat", "99");
				mvDao.updateMvOrdrStat(map); //S15-12 : 재고이동 지시취소(전표)
				
				//1-3. 호출 서비스
				if(mvty.indexOf("I") > -1) {
					map.put("stat", "D");
					ecsService.excRcptPlanInfoTr(map); //S02-11 : 입고예정정보 송신
				}else if(mvty.indexOf("O") > -1) {
					ecsService.excOderPlanInfoTr(map); //S02-14 : 출고예정정보 송신
				}else {
					ecsService.excMvPlanInfoTr(map); //S02-16 : 이동예정정보 송신
				}
				
				//1-4. 호출 서비스
				map.put("rcptno", map.get("hdrefval1"));
				map.put("rcptsn", map.get("dtrefval1"));
				map.put("asgnno", map.get("ordrrefval1"));
				putwService.updateRcptAsgnForPutwOrdrCncl(map); //S12-11 : 적치지시 취소
				
				//1-5. 이동지시CRUD(신규)
				map.put("mvtp", "M61");
				procMvOrdr(map); //S15-11 : 재고이동 지시(전표)
				
				//1-7. 호출 서비스
				ecsService.excRcptPlanInfoTr(map); //S02-11 : 입고예정정보 송신
				
				
			}else if(rcmdloc.equals(toloc)) { //권장위치로의 이동
				System.out.println("[재고이동 전표O] TO RCMD");
				String mvty = (String)map.get("mvty");
				
				//1-1. 이동완료, 재고
				excMvCompt(map); //S15-13 : CASE#3 이동완료 
				
				//1-2. 호출 서비스
				if(mvty.indexOf("I1") > -1) {
					map.put("rcptno", map.get("hdrefval1"));
					map.put("rcptsn", map.get("dtrefval1"));
					map.put("asgnno", map.get("ordrrefval1"));
					putwService.updateRcptAsgnForPutwCompt(map); //S12-12 : 적치완료 
				}else if(mvty.equals("O10")) {
					pickService.excPickCompt(map); //S13-13 : 피킹완료 
				}else {
//						ecsService.excMvPlanInfoTr(map); //S16-11: 재입고
}

				//1-3. 이동지시CRUD
				map.put("stat", 50);
				mvDao.updateMvOrdrStat(map); //S15-02 : PDA 재고이동(이동지시)
				
				//1-4. 이동결과CRUD
				saveMvRslt(map); //S15-02 : PDA 재고이동(이동결과)
				
			}else if("M".equals(frarea) && "M".equals(toarea)) { //임의이동 들
				System.out.println("[재고이동 전표O] M -> M");
				map.put("mvty", "M80");

				//1-1. 이동결과CRUD
				saveMvRslt(map); //S15-052 : PDA 재고이동(이동결과)
				
				//1-2. 이동완료, 재고
				excMvCompt(map); //S15-13 : CASE#1 이동완료 
				
				//1-3. 이동지시 From 수정
				map.put("frloc", map.get("toloc"));
				map.put("toloc", null);
				updateMvOrdrLoc(map);
				
			}else if("B".equals(rcmdarea) && "A".equals(toarea)) { //커->밀
				System.out.println("[재고이동 전표O] B -> A");
				String mvty = (String)map.get("mvty");
				map.put("mvtp", "M61");
				
				//1-1. 이동지시, 재고
				map.put("toloc", rcmdloc);
				excMvOrdrCncl(map); //S15-12 : 재고이동 지시취소(수량)
				map.put("toloc", toloc);
				
				//1-2. 이동지시CRUD(수정)
				map.put("stat", "99");
				mvDao.updateMvOrdrStat(map); //S15-12 : 재고이동 지시취소(전표)
				
				//1-3. 호출 서비스
				map.put("rcptno", map.get("hdrefval1"));
				map.put("rcptsn", map.get("dtrefval1"));
				map.put("asgnno", map.get("ordrrefval1"));
				putwService.updateRcptAsgnForPutwOrdrCncl(map); //S12-11 : 적치지시 취소
				
				//1-4. 이동지시CRUD(신규)
				map.put("mvtp", "M61");
				procMvOrdr(map); //S15-11 : 재고이동 지시(전표)
				
				//1-5. 이동지시, 재고
				mvService.excMvOrdr(map); //S15-11 : 재고이동 지시(수량)

				//1-6. 호출 서비스
				if(mvty.equals("I10")) {
					ecsService.excRcptPlanInfoTr(map); //S02-11 : 입고예정정보 송신
				}else if(mvty.equals("O10")) {
					ecsService.excOderPlanInfoTr(map); //S02-14 : 출고예정정보 송신
				}else {
					ecsService.excMvPlanInfoTr(map); //S02-16 : 이동예정정보 송신
				}
				
			}else if("A".equals(rcmdarea) && "B".equals(toarea)) { //밀->커 + 자동적치(B30)(X)
				System.out.println("[재고이동 전표O] A -> B");
				String mvty = (String)map.get("mvty");
				map.put("mvtp", "M61");
				
				//1-1. 이동지시, 재고
				map.put("toloc", rcmdloc);
				excMvOrdrCncl(map); //S15-12 : 재고이동 지시취소(수량)
				map.put("toloc", toloc);
				
				//1-2. 이동지시CRUD(수정)
				map.put("stat", "99");
				mvDao.updateMvOrdrStat(map); //S15-12 : 재고이동 지시취소(전표)
				
				//1-3. 호출 서비스
				if(mvty.equals("I10")) {
					map.put("stat", "D");
					ecsService.excRcptPlanInfoTr(map); //S02-11 : 입고예정정보 송신
				}else if(mvty.equals("O10")) {
					ecsService.excOderPlanInfoTr(map); //S02-14 : 출고예정정보 송신
				}else {
					ecsService.excMvPlanInfoTr(map); //S02-16 : 이동예정정보 송신
				}
				
				//1-4. 호출 서비스
				map.put("rcptno", map.get("hdrefval1"));
				map.put("rcptsn", map.get("dtrefval1"));
				map.put("asgnno", map.get("ordrrefval1"));
				putwService.updateRcptAsgnForPutwOrdrCncl(map); //S12-11 : 적치지시 취소
				
				//1-5. 이동지시CRUD(신규)
				map.put("mvtp", "M41");
				procMvOrdrCompt(map); //S15-11 : 재고이동 지시(전표)
				
				//1-6. 이동완료, 재고
				excMvCompt(map); //S15-13 : CASE#4 이동완료 
				
				//1-7. 호출 서비스
				if(mvty.equals("I10")) {
					map.put("rcptno", map.get("hdrefval1"));
					map.put("rcptsn", map.get("dtrefval1"));
					map.put("asgnno", map.get("ordrrefval1"));
					putwService.updateRcptAsgnForPutwCompt(map); //S12-12 : 적치완료 
				}else if(mvty.equals("O10")) {
					pickService.excPickCompt(map); //S13-13 : 피킹완료 
				}else {
//							ecsService.excMvPlanInfoTr(map); //S16-11: 재입고
}

//				
}else if("B".equals(rcmdarea) && "B".equals(toarea)) { //커->커
System.out.println("[재고이동 전표O] B -> B");
String mvty = (String)map.get("mvty");
map.put("mvtp", "M41");

				//1-1. 이동지시, 재고
				map.put("toloc", rcmdloc);
				excMvOrdrCncl(map); //S15-12 : 재고이동 지시취소(수량)
				map.put("toloc", toloc);
				
				//1-2. 이동지시CRUD(수정)
				map.put("stat", "99");
				mvDao.updateMvOrdrStat(map); //S15-12 : 재고이동 지시취소(전표)
				
				//1-3. 호출 서비스
				putwService.updateRcptAsgnForPutwOrdrCncl(map); //S12-11 : 적치지시 취소
				
				//1-4. 이동지시CRUD(신규)
				procMvOrdrCompt(map);
				
				//1-5. 이동완료, 재고
				excMvCompt(map); //S15-13 : CASE#4 이동완료 
				
				//1-6. 호출 서비스
				if(mvty.equals("I10")) {
					map.put("rcptno", map.get("hdrefval1"));
					map.put("rcptsn", map.get("dtrefval1"));
					map.put("asgnno", map.get("ordrrefval1"));
					putwService.updateRcptAsgnForPutwCompt(map); //S12-12 : 적치완료 
				}else if(mvty.equals("O10")) {
					pickService.excPickCompt(map); //S13-13 : 피킹완료 
				}else {
//							ecsService.excMvPlanInfoTr(map); //S16-11: 재입고
}

			}else if("A".equals(rcmdarea) && "A".equals(toarea)) { //밀->밀
				System.out.println("[재고이동 전표O] A -> A");
				throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
				
				
			}else if("A".equals(rcmdarea) && "M".equals(toarea)) { //밀->레일
				System.out.println("[재고이동 전표O] A -> M");
				/*
				 * 밀롤창고 입고오류로 인한 3구간으로 출고처리
				 * - 이동결과.To = 3구간(M03) (Parameter처리)
				 * - 재고처리 : 이동결과.From Loc = 할당량(-), 재고량(-), 이동결과.To Loc = 재고량(+), 이동지시.To Loc = 예정량(-) (1-1)
				 * 입고정보 갱신 : 'S12_입고적치.S12-11_적치지시 취소' 참조 (1-2)
				 * */
//				String mvty = (String)map.get("mvty");
//				map.put("mvtp", "M61");

				//1-1. 이동지시, 재고
				map.put("toloc", rcmdloc);
				excMvOrdrCncl(map); //S15-12 : 재고이동 지시취소(수량)
				map.put("toloc", toloc);
				
				//1-2. 이동지시CRUD(수정)
				map.put("stat", "99");
				mvDao.updateMvOrdrStat(map); //S15-12 : 재고이동 지시취소(전표)
				
				//1-3. 호출 서비스
//				if(mvty.equals("I10")) {
//					ecsService.excRcptPlanInfoTr(map); //S02-11 : 입고예정정보 송신
//				}else if(mvty.equals("O10")) {
//					ecsService.excOderPlanInfoTr(map); //S02-14 : 출고예정정보 송신
//				}else {
//					ecsService.excMvPlanInfoTr(map); //S02-16 : 이동예정정보 송신
//				}

				//1-2. 호출 서비스
				putwService.updateRcptAsgnForPutwOrdrCncl(map); //S12-11 : 적치지시 취소

//				//1-5. 이동지시CRUD(신규)
//				map.put("mvtp", "M41");
//				procMvOrdr(map); //S15-11 : 재고이동 지시(전표)
//				
//				//1-6. 이동완료, 재고
//				excMvCompt(map); //S15-13 : CASE#4 이동완료
//				
//				//1-7. 호출 서비스
//				if(mvty.equals("I10")) {
//					putwService.updateRcptAsgnForPutwCompt(map); //S12-12 : 적치완료
//				}else if(mvty.equals("O10")) {
//					pickService.excPickCompt(map); //S13-13 : 피킹완료
//				}else {
////							ecsService.excMvPlanInfoTr(map); //S16-11: 재입고
//				}
//				
//				//1-8. 이동지시CRUD
//				map.put("stat", 50);
//				mvDao.updateMvOrdrStat(map); //S15-02 : PDA 재고이동(이동지시)

				//1-9. 이동결과CRUD
				saveMvRslt(map); //S15-02 : PDA 재고이동(이동결과)
			}else {
				throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
			}
		}
		
		
		System.out.println("@@@ MvService - excMvCompt - 이동완료 @@@@@@@@@@@@@@@@@" + (map != null ? map.toString() : ""));
		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 이동등록
	 * 
	 * @param map
	 */
	public String saveProcMv(List<Map<String, Object>> mapList) {
		
		for(int i=0 ; i<mapList.size() ; i++){
			
			savePdaProcMv(mapList.get(i));
			
		}

		return "MSG001";	// 정상적으로 처리되었습니다.
	}
	
	
	/************************************************************************************
	 * 깨끗한나라 - 이동결과 송수산상태 설정 규칙 
	 * 
	 * @param map ( frloc, toloc ) 
	 */
	public void setMvRsltTrStat(Map<String, Object> map) {
		
		/* file : 참고_재고이동규칙.xlsx
		 * 이동결과.송수신상태 설정 규칙(From/To위치로 구분)		
		 *		- 이동지역(M) --> 밀롤창고지역(A) 이동인 경우 : '0'		
		 *		- 이동지역(M) --> 커터대기창고지역(B) 이동인 경우 : '0'		
		 *		- 밀롤창고지역(A) --> 커터대기창고지역(B) 이동인 경우 : '0'		
		 *		- 커터대기창고지역(B) --> 커터대기창고지역(B) 이동인 경우 : '0'		
		 *		- 그 외는 모두 'X'		
		 * */
		
		String frLoc = (String) map.get("frloc");
		String toLoc = (String) map.get("toloc");
		
		if(frLoc.indexOf("M") > -1 || toLoc.indexOf("B") > -1) {
			map.put("trstat", "0");
		}else {
			map.put("trstat", "X");
		}
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 이동_이동구분 From시스템, To시스템, 송수신상태 설정 규칙
	 * 
	 * @param map ( mvtp, mvty ) 
	 */
	public void setMvHdSysTrStat(Map<String, Object> map) {
		
		/* file : 참고_재고이동규칙.xlsx
		 * 재고이동.From/To시스템, 송수신상태, 재고이동지시.송수신상태 설정 규칙
		 *		1. 이동유형(MVTY) 조건 적용
		 *			- M40 (강제이동,	수동(강제) 재고이동 처리) => FrSys : WCS / ToSys : WCS / TrStat : X
		 *			- M80 (경유이동	, From ~ To 이동 중 경유지점의 통과 임시이동) => FrSys : ECS / ToSys : WCS / TrStat : 1
		 *			- I10	(입고적치) , O10 (출고피킹), O11 (사전피킹), M10 (일반이동), M21 (설비내이동),  M23 (사전피킹취소) => 이동구분 조건 적용
		 *		2. 이동유형 조건이 없는 경우 이동구분 조건 적용
		 *   		- M41 (재고이동(임의), 커터대기창고 내 임의이동)  => FrSys : WCS / ToSys : WCS / TrStat : X
		 *			- M61 (재고이동(임의-설비), 밀롤창고 관련 모든 이동) => FrSys : WCS / ToSys : ECS / TrStat : 1
		 * */
		
		String mvTp = (String) map.get("mvtp");
		String mvTy = (String) map.get("mvty");
		
		if(mvTy.equals("M40")) {
			map.put("frsys", "WCS");
			map.put("tosys", "WCS");
			map.put("trstat", "X");
		}else if( mvTy.equals("M80")) {
			map.put("frsys", "ECS");
			map.put("tosys", "WCS");
			map.put("trstat", "1");
		}else {
			if(mvTp.equals("M41")) {
				map.put("frsys", "WCS");
				map.put("tosys", "WCS");
				map.put("trstat", "X");
			}else if(mvTp.equals("M61")) {
				map.put("frsys", "WCS");
				map.put("tosys", "ECS");
				map.put("trstat", "1");
			}
		}
	}
}