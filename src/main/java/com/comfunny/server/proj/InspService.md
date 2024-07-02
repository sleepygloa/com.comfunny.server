package com.comfunny.server.proj.ib.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.com.sd.service.SkuDao;
import nlms.com.sy.service.EtcService;
import nlms.framework.exception.BizException;
import nlms.framework.util.ObjectUtil;
import nlms.wms.ecs.service.EcsDao;
import nlms.wms.ecs.service.EcsService;
import nlms.wms.od.service.OderService;
import nlms.wms.st.service.IbService;
import nlms.wms.st.service.MvDao;
import nlms.wms.st.service.MvService;
import nlms.wms.st.service.StokDao;
import nlms.wms.st.service.StokService;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("inspService")
public class InspService {

	@Resource(name = "inspDao")
	private InspDao inspDao;

	@Resource(name = "rcptDao")
	private RcptDao rcptDao;
	
	@Resource(name = "stokService")
	private StokService stokService;
	
	@Resource(name = "stokDao")
	private StokDao stokDao;

	@Resource(name = "etcService")
	private EtcService etcService;

	@Resource(name = "ibService")
	private IbService ibService;
	
	@Resource(name="ecsService")
	private EcsService ecsService;
	
	@Resource(name="ecsDao")
	private EcsDao ecsDao;
	
	@Resource(name = "oderService")
	private OderService oderService;
	
	@Resource(name="mvDao")
	private MvDao mvDao;
	
	@Resource(name = "putwService")
	private PutwService putwService;
	
	@Resource(name = "mvService")
	private MvService mvService;
	
	@Resource(name="skuDao")
	private SkuDao skuDao;
	
	/************************************************************************************
	 * 깨끗한나라 - 검수완료
	 * 
	 * @param map (rcptde, rcptno, rcptsn, asgnno, biz, dc, stat, client)
	 */
	@SuppressWarnings("unchecked")
	public String procInspCompt(Map<String, Object> map) {

		//검수완료 대상 조회 (RCPTHD)
		EgovMap rcptHdMap = inspDao.selectRcptHdForInspCompt(map);
		if(!ObjectUtil.isNotNull(rcptHdMap))  {
			throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		}
		
		//검수완료 대상 조회 (RCPTDT)
		EgovMap rcptDtMap = inspDao.selectRcptDtForInspCompt(map);
		if(!ObjectUtil.isNotNull(rcptDtMap))  {
			throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		}
			
		//검수완료 대상 조회(RCPTASGN)
		EgovMap rcptAsgnMap = inspDao.selectRcptAsgnForInspCompt(map);
		if(!ObjectUtil.isNotNull(rcptAsgnMap))  {
			throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		}
			
		map.put("toloc", 	rcptAsgnMap.get("rcmdloc"));		//set MVORDR TOLOC
		map.put("rcmdloc", 	rcptAsgnMap.get("rcmdloc"));		//set MVORDR TOLOC
		map.put("tolocextcol1", "N");							//set MVORDR TOLOC EXTCOL1
		map.put("toarea", 	rcptAsgnMap.get("rcmdarea"));		//set TOAREA
		map.put("rcmdarea", rcptAsgnMap.get("rcmdarea"));		//set TOAREA
		map.put("mvty",		"I10");								//set MVHD MVTY
		map.put("locextcol01",		rcptAsgnMap.get("locextcol01"));	
		
		
		
		//변수 초기화
		if(map.get("toarea") != null && ((String)map.get("toarea")).indexOf("A") > -1
		 || ((String)map.get("locextcol01")).equals("Y")
				) {	//밀롤창고
			map.put("mvtp", "M61");
		}
		else{		//커터대기창고
			map.put("mvtp", "M41");
		}
		
		
		
		
		//LOT 생성
		rcptDtMap.put("lot", rcptDtMap.get("mfrno"));
		stokService.saveLot(rcptDtMap);

		//***************************************************************
		// 권장로케이션 조회
		// 원지 : SKU=H*, RCMDLOC='M02'
		// 판지 : SKU=F*, RCMDLOC='A0000' : 밀롤
		// 판지 : SKU=F*, RCMDLOC='*'     : 커터
		// 원지의 경우 H: M02(SAP에서 입력)(아래로직패스)
		// 판지의 경우 F: 밀롤 = 'A0000'(아래로직패스), 쿼터 =  권장조회를 진행하여 값입력.
		//***************************************************************
		//변수선언
		if(((String)rcptAsgnMap.get("sku")).indexOf("F") > -1 
		&& ((String)rcptAsgnMap.get("rcmdloc")).equals("*")
		&& ((String)rcptAsgnMap.get("rcmdloc")).indexOf("A0000") < 0 
		) {
			//필수변수(biz, dc, client, rcptno, rcptsn, asngno, rcmdloc, lotatrb01, atrlob02, rcptqty, extcol09, extcol10, mvty
			map.put("mvty", rcptHdMap.get("rcptty"));
			
			map.put("rcmdarea", rcptAsgnMap.get("rcmdarea"));
			map.put("rcmdloc", rcptAsgnMap.get("rcmdloc"));
			map.put("lotatrb01", rcptDtMap.get("lotatrb01"));
			map.put("lotatrb02", rcptDtMap.get("lotatrb02"));
			map.put("extcol06", ((BigDecimal)rcptAsgnMap.get("rcptqty")).intValue());
			map.put("extcol09", ((BigDecimal)rcptAsgnMap.get("extcol09")).intValue());
			map.put("extcol10", rcptAsgnMap.get("extcol10"));
			map.put("rcptde", rcptAsgnMap.get("extcol10"));
				
			selectRcmdLoc(map);
		}
		
		//EA 생성
		rcptDtMap.put("etctp01", rcptDtMap.get("lotatrb01"));
		rcptDtMap.put("etctp02", rcptDtMap.get("lotatrb02"));
		EgovMap skuctrgThickMap = skuDao.selectSkuctgrThick(rcptDtMap); //EA.EXTCOL11(지름) 계산을 위한 THICK 조회
		
		String thick = (String) skuctrgThickMap.get("etctp03");
		rcptAsgnMap.put("thick", thick);
		stokService.saveEa(rcptAsgnMap);
		
		//STOK 생성
		String sku = (String) rcptAsgnMap.get("sku");
		//품목이 H(원지)인 경우 stok 미 생성
		if(sku.substring(0,1).equals("F")) {
			rcptAsgnMap.put("loc", rcptAsgnMap.get("insploc"));
			stokService.saveStok(rcptAsgnMap);
		}

		//밀롤라벨정보 송신(IF_LBL_INFO_ECS)
		rcptAsgnMap.put("mlbrcd", rcptAsgnMap.get("eaid"));
		EgovMap saveLblInfoEcsMap = inspDao.selectLblInfoForEcs(map);
		ecsService.saveLblInfoEcs(saveLblInfoEcsMap);
		
		//수불생성
		Map<String, Object> saveIbDeMap = new HashMap<String, Object>();
		saveIbDeMap.put("ibde", 	rcptDtMap.get("rcptde"));
		saveIbDeMap.put("sku", 		rcptDtMap.get("sku"));
		saveIbDeMap.put("client", 	rcptDtMap.get("client"));
		saveIbDeMap.put("dc", 		rcptDtMap.get("dc"));
		saveIbDeMap.put("biz", 		rcptDtMap.get("biz"));
		saveIbDeMap.put("dutyty", 	"RCPT");
		saveIbDeMap.put("dutycd", 	rcptHdMap.get("rcpttp"));
		saveIbDeMap.put("cust", 	rcptDtMap.get("spcust"));
		saveIbDeMap.put("custtp", 	rcptDtMap.get("spcusttp"));			
		saveIbDeMap.put("rcptqty",	rcptDtMap.get("rcptqty"));
		saveIbDeMap.put("rcptwt", 	rcptDtMap.get("wt"));
		saveIbDeMap.put("reftp", 	"RC_RCPTDT");
		saveIbDeMap.put("refval1", 	rcptDtMap.get("rcptno"));
		saveIbDeMap.put("refval2", 	rcptDtMap.get("rcptsn"));
		
		ibService.saveIbDe(saveIbDeMap);
						
		if(sku.indexOf("H") > -1) { //원지, 출고완료, 출고수불
			map.putAll(rcptAsgnMap);
			map.put("rcptde", rcptAsgnMap.get("extcol10"));		//set MVHD MVNO
			map.put("pocust", rcptHdMap.get("spcust"));
			map.put("socust", rcptHdMap.get("spcust"));
			oderService.procOderCompt(map);
		}else if(sku.indexOf("F") > -1) { //판지, 입고적치, 재고이동
			
			// SET  excPutwOrdr Parameter
			String updusr = (String)map.get("updusr");
			map.putAll(rcptAsgnMap);
			map.put("plande", rcptAsgnMap.get("extcol10"));		//set MVHD_MVNO	
			map.put("hdreftp", "RC_RCPTHD");							//set HD_REFTP
			map.put("hdrefval1", map.get("rcptno")); 					//set HD_REFVAL1

//			map.put("uom", 		rcptDtMap.get("uom"));				//set MVDT UOM
map.put("planqty", map.get("inspqty"));					//set MVDT_ORDRQTY
map.put("dtrefval1", map.get("rcptsn"));					//set MVDT_REFVAL1

			map.put("ordrrefval1", map.get("asgnno"));				//set MVORDR_REFVAL1
			map.put("ordrrefval2", "*");										//set MVORDR_REFVAL2
			map.put("frloc", 		rcptAsgnMap.get("insploc"));		//set MVORDR FRLOC
			map.put("updusr", updusr);
			
			mvService.procMvOrdr(map);
			

			// SET excMvOrdr Parameter
			//frlot frpltid frcaseid freai sku packunit frloc grad client dc biz
			//tolot topltid tocaseid toeaid sku packunit toloc grad client dc biz
			map.put("frlot",		map.get("lot"));
			map.put("frpltid",		map.get("pltid"));
			map.put("frcaseid",		map.get("caseid"));
			map.put("freaid",		map.get("eaid"));
			map.put("tolot",		map.get("lot"));
			map.put("topltid",		map.get("pltid"));
			map.put("tocaseid",		map.get("caseid"));
			map.put("toeaid",		map.get("eaid"));
//			map.put("mvtp",			map.get("mvtp"));

			//S15-11 : 재고이동 지시
			mvService.excMvOrdr(map); 
			
			String mvTp = (String) map.get("mvtp");
			if(mvTp.equals("M41")) {
				//S12-13 : 입고배정 적치지시 호출 ( 권장위치, 적치상태 수정 )
				putwService.updateRcptAsgnForPutwOrdr(map);
			}else if(mvTp.equals("M61") || ((String)map.get("locextcol01")).equals("Y")){
				
				//S02-11 : 입고예정정보 송신
				map.put("mvde", map.get("rcptde"));
				//workstat : N: 정상(밀롤창고 입고 처리), P: 밀기(커터대기장 B30으로 Push 처리), I/F정보가 없는 경우 4구간으로 진행
				if(((String)map.get("locextcol01")).equals("Y")) {
					map.put("workstat", "P");
				}else{
					map.put("workstat", "N");
				}
				ecsService.excRcptPlanInfoTr(map);
			}
			
		}else {
			throw new BizException("XXXXX"); //취급대상이 아닌 품목데이터확인됨.
		}
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	

	/************************************************************************************
	 * 깨끗한나라 - 권장 로케이션 찾기
	 * 
	 * @param map (rcptde, rcptno, rcptsn, asgnno, biz, dc, stat, client)
	 */
	@SuppressWarnings("unchecked")
	private Map<String, Object> selectRcmdLoc(Map<String, Object> map) {

		
		//필수값 체크
		if(!ObjectUtil.isNotNull(map.get("rcmdarea"))
		|| !ObjectUtil.isNotNull(map.get("rcmdloc"))
		|| !ObjectUtil.isNotNull(map.get("biz"))
		|| !ObjectUtil.isNotNull(map.get("dc"))
		|| !ObjectUtil.isNotNull(map.get("client"))
		
		|| !ObjectUtil.isNotNull(map.get("lotatrb01"))
		|| !ObjectUtil.isNotNull(map.get("lotatrb02"))
		|| !ObjectUtil.isNotNull(map.get("extcol06"))
		|| !ObjectUtil.isNotNull(map.get("extcol09"))
		|| !ObjectUtil.isNotNull(map.get("extcol10"))
		
		|| !ObjectUtil.isNotNull(map.get("mvty"))
		
			) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		
		//***************************************************************
		// 권장로케이션 조회
		// 원지 : SKU=H*, RCMDLOC='M02'
		// 판지 : SKU=F*, RCMDLOC='A0000' : 밀롤
		// 판지 : SKU=F*, RCMDLOC='*'     : 커터
		// 원지의 경우 H: M02(SAP에서 입력)(아래로직패스)
		// 판지의 경우 F: 밀롤 = 'A0000'(아래로직패스), 쿼터 =  권장조회를 진행하여 값입력.
		//***************************************************************
		//SAP TO WCS 시 ZONE DATA 받음.
		if(map.get("zone") == null && map.get("extcol09") != null) { //임시하드코딩
			map.put("zone", "B5"); //1. 임시 하드코딩  //BO5이 넘칠수있음.
			int extcol09 = (int)map.get("extcol09");
			if(extcol09 <= 1200) {
				map.put("zone", "B5");
			}else if(extcol09 <= 1800) {
				map.put("zone", "B1");
			}else {
				map.put("zone", "B9");
			}
		}
		
		List<EgovMap> updateAsgnList = rcptDao.selectRecommendLocCutterList(map);
		
		//권장위치값에 대한 관련 변수들로 재 선언
		if(updateAsgnList.size() > 0) {
			Map<String, Object> updateAsgnMap = updateAsgnList.get(0); //권장로케이션중 1순위인 데이터 추출 및 저장
			map.put("rcmdloc", 		updateAsgnMap.get("loc"));
			map.put("toloc", 		updateAsgnMap.get("loc"));
			map.put("rcmdarea", 	updateAsgnMap.get("area"));
			map.put("toarea", 		updateAsgnMap.get("area"));
			map.put("rcmdlocextcol1", 		updateAsgnMap.get("extcol1"));
			map.put("tolocextcol1", 		updateAsgnMap.get("extcol1"));
			if(updateAsgnMap.get("extcol01").equals("Y")) map.put("mvty", "I11"); //2021.05.12 추가 //[커터창고 자동적치]
			
			//권장로케이션 수정.
			rcptDao.updateRcptAsgnRcmdLoc(map);
			
		}

		return map;
	}
}

