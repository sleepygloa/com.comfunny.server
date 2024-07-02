package com.comfunny.server.proj.ib.service;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.wms.ecs.service.EcsService;
import nlms.wms.st.service.MvDao;
import nlms.wms.st.service.MvService;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("putwService")
public class PutwService {

	@Resource(name = "mvService")
	private MvService mvService;
	
	@Resource(name = "mvDao")
	private MvDao mvDao;

	@Resource(name = "rcptDao")
	private RcptDao rcptDao;
	
	@Resource(name = "putwDao")
	private PutwDao putwDao;
	
	@Resource(name = "ecsService")
	private EcsService ecsService;

	
	/************************************************************************************
	 * 깨끗한나라 - 입고적치 - 적치위치 수정
	 * 
	 * @param map (rcptno rcptsn asgnno rcmdloc putwloc dc biz client usr rcptde putwArea)
	 */
	@SuppressWarnings("unchecked")
	public void updatePutwLoc(Map<String, Object> map) {

		//커터대기창고 AREA = B , 밀롤창고 AREA = A
		String rcmdLoc = (String) map.get("rcmdloc");
		String rcmdArea = (String) map.get("rcmdarea");
		String putwLoc = (String) map.get("putwloc");
		String putwArea = (String) map.get("putwarea");
		
		//적치위치 저장
		rcptDao.updateRcptAsgnPutwLoc(map);
		
		//CASE 1 : 권장위치 = 적치위치 ( 커터대기창고 내 이동 )
		if(rcmdLoc.equals(putwLoc) && putwArea.equals("B")) {
			
			//1-1. 이동완료 대상 재고이동지시 조회
			EgovMap mvOrdrMap = mvDao.selectMvOrdrForPutw(map);

			//1-2.재고이동지시 update : stat = 50
			mvOrdrMap.put("stat", "50");		//작업지시
			mvOrdrMap.put("updusr", map.get("updusr"));				
			mvDao.updateMvOrdrStat(mvOrdrMap);
			
			//1-3.재고이동결과 insert
			mvOrdrMap.put("lot", mvOrdrMap.get("frlot"));
			mvOrdrMap.put("caseid", mvOrdrMap.get("frcaseid"));
			mvOrdrMap.put("eaid", mvOrdrMap.get("freaid"));
			mvOrdrMap.put("planqty", mvOrdrMap.get("ordrqty"));		//saveMvRslt : rsltqty put (planqty)
			mvOrdrMap.put("workport", mvOrdrMap.get("ordrport"));
			mvService.setMvRsltTrStat(mvOrdrMap);		//frloc : M (RC_RCPTASGN.insploc -> ST_MVORDR.frloc) , toloc : B (putwArea)
			mvService.saveMvRslt(mvOrdrMap);
			
			//1-4. 이동완료(Case #3)
			mvOrdrMap.put("rcmdloc", rcmdLoc);
			mvOrdrMap.put("frarea", mvOrdrMap.get("frarea"));
			mvOrdrMap.put("toarea", putwArea);
			// excMvCompt param : [mvOrdrMap : eaid, client, dc, biz, frloc, toloc, mvtp, mvty, frarea]  , [map:  rcmdloc,, toarea(putwArea)]
			mvService.excMvCompt(mvOrdrMap); 
			
			//1-4-1 이동완료(Case #3) 이후 적치완료 호출 (ST_MVHD.REFTP = 'RC_RCPTHD')
			updateRcptAsgnForPutwCompt(mvOrdrMap); //S12-12 : 적치완료 
			
		}
		//CASE 2 : 권장위치 != 적치위치 ( 커터대기창고 내 이동 , 밀롤창고 -> 커터대기창고 )
		//CASE 3 : 권장위치 != 적치위치 ( 커터대기창고 -> 밀롤창고 )
		else {
			//2-1. 이동취소 대상 재고이동지시 조회
			//3-1. 이동취소 대상 재고이동지시 조회
			EgovMap mvOrdrMap = mvDao.selectMvOrdrForPutw(map);
			
			//2-2. 재고이동지시 상태 갱신 (취소) update : stat = 99				
			//3-2. 재고이동지시 상태 갱신 (취소) update : stat = 99
			mvOrdrMap.put("stat", "99");		//취소
			mvOrdrMap.put("updusr", map.get("updusr"));
			mvDao.updateMvOrdrStat(mvOrdrMap);

			//2-3. 이동지시 취소
			//3-3. 이동지시 취소
			mvService.excMvOrdrCncl(mvOrdrMap);
			
			//3-3-1. TODO : 이동지시 취소 이후
			if(((String)mvOrdrMap.get("toloc")).indexOf("A") > -1) {
				//밀롤창고에 대한 재고이동 작업지시의 취소(삭제)
				mvOrdrMap.put("eaid", mvOrdrMap.get("freaid"));
				mvOrdrMap.put("mlbrcd", mvOrdrMap.get("freaid"));
				mvOrdrMap.put("stat", "D");
				//workstat : N: 정상(밀롤창고 입고 처리), P: 밀기(커터대기장 B30으로 Push 처리), I/F정보가 없는 경우 4구간으로 진행
				if(((String)mvOrdrMap.get("locextcol01")).equals("Y")) {
					mvOrdrMap.put("workstat", "P");
				}else{
					mvOrdrMap.put("workstat", "N");
				}	
				ecsService.excRcptPlanInfoTr(mvOrdrMap); //S02-11 : 입고예정정보 송신
			}
			
			//3-3-2. 작업지시의 취소
			//권장위치 수정
			mvOrdrMap.put("rcmdloc", (putwLoc.equals("*") && putwArea.indexOf("A") > -1 ? "A0000" : putwLoc));
			rcptDao.updateRcptAsgnRcmdLoc(mvOrdrMap);
//			updateRcptAsgnForPutwOrdrCncl(mvOrdrMap);

			//2-4-1. 재고이동 생성
			//3-4-1. 재고이동 생성 (M61)
			EgovMap mvHdMap = mvDao.selectMvHd(mvOrdrMap);
//			mvHdMap.put("rcptde", map.get("rcptde"));
mvHdMap.put("updusr", map.get("updusr"));

			//2-4-1-1. 적치위치 커터대기창고인 경우 이동구분 변경 M41
			//3-4-1-1. 적치위치 밀롤창고인 경우 이동구분 변경 M61
			if(putwArea.equals("B")) {
				mvHdMap.put("mvtp", "M41");
			}else if(putwArea.equals("A")) {
				mvHdMap.put("mvtp", "M61");
			}
			mvService.setMvHdSysTrStat(mvHdMap);
			mvService.saveMvHd(mvHdMap);
			String mvNo = (String) mvHdMap.get("mvno");

			//2-4-2. 재고이동품목 생성
			//3-4-2. 재고이동품목 생성
			EgovMap mvDtMap = mvDao.selectMvDt(mvOrdrMap);
			mvDtMap.put("mvno", mvNo);
			mvDtMap.put("updusr", map.get("updusr"));
			mvService.saveMvDt(mvDtMap);
			int mvSn = (int) mvDtMap.get("mvsn");

			//2-4-3. 재고이동지시 생성
			//3-4-3. 재고이동지시 생성
			mvOrdrMap.put("rcptde", mvHdMap.get("plande"));
			mvOrdrMap.put("mvno", mvNo);
			mvOrdrMap.put("mvsn", mvSn);
			mvOrdrMap.put("updusr", map.get("updusr"));
			mvOrdrMap.put("refval1", map.get("asgnno"));
			mvOrdrMap.put("toloc", putwLoc);

			//2-4-3-1. 커터대기창고 내 이동 , 밀롤창고 -> 커터대기창고
			if(putwArea.equals("B")) {
				mvOrdrMap.put("stat", "50");					
			}
			//3-4-3-1. 커터대기창고 -> 밀롤	창고
			else if(putwArea.equals("A")) {
				mvOrdrMap.put("stat", "51");
				mvOrdrMap.put("toloc", "A0000");
			}
			mvService.saveMvOrdr(mvOrdrMap);
		
			if(putwArea.equals("B")) {
				
				//2-5. 재고이동결과 생성
//				mvOrdrMap.put("toloc", putwLoc);
mvOrdrMap.put("lot", mvOrdrMap.get("frlot"));
mvOrdrMap.put("caseid", mvOrdrMap.get("frcaseid"));
mvOrdrMap.put("eaid", mvOrdrMap.get("freaid"));
//				mvOrdrMap.put("rsltqty", mvOrdrMap.get("ordrqty"));
mvOrdrMap.put("planqty", mvOrdrMap.get("ordrqty"));		//saveMvRslt : rsltqty put (planqty)
mvOrdrMap.put("workport", mvOrdrMap.get("ordrport"));
mvService.saveMvRslt(mvOrdrMap);

				//2-6. 이동완료 (finish)
				mvOrdrMap.put("rcmdloc", rcmdLoc);
				mvOrdrMap.put("rcmdarea", rcmdArea);
				mvOrdrMap.put("frarea", mvOrdrMap.get("frarea"));
				mvOrdrMap.put("toarea", putwArea);
				mvService.excMvCompt(mvOrdrMap); 
				
				//2-6-1 이동완료(Case #4) 이후 적치완료 호출 (ST_MVHD.REFTP = 'RC_RCPTHD')
				updateRcptAsgnForPutwCompt(mvOrdrMap); //S12-12 : 적치완료 
			}
			
			else if(putwArea.equals("A")) {
				
				//3-5. 이동지시 (finish)
				mvService.excMvOrdr(mvOrdrMap);
				
				//3-5-1. 이동지시 이후 서비스 호출
				String mvTp = (String) mvHdMap.get("mvtp");
				if(mvTp.equals("M41")) {
					//S12-13 : 입고배정 적치지시 호출 ( 권장위치, 적치상태 수정 )
					updateRcptAsgnForPutwOrdr(mvOrdrMap);
				}else if(mvTp.equals("M61")) {
					//S02-11 : 이동지시 이후 입고예정정보 송신
					mvOrdrMap.put("mlbrcd", mvOrdrMap.get("freaid"));
					mvOrdrMap.put("eaid", mvOrdrMap.get("freaid"));
					//workstat : N: 정상(밀롤창고 입고 처리), P: 밀기(커터대기장 B30으로 Push 처리), I/F정보가 없는 경우 4구간으로 진행
					if(((String)mvOrdrMap.get("locextcol01")).equals("Y")) {
						mvOrdrMap.put("workstat", "P");
					}else{
						mvOrdrMap.put("workstat", "N");
					}					
					ecsService.excRcptPlanInfoTr(mvOrdrMap);
				}
			}
		}
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 입고배정 적치지시 취소 ( 권장위치, 적치상태 수정 )
	 * 
	 * @param map 
	 */
	public void updateRcptAsgnForPutwOrdrCncl(Map<String, Object> map) {
		
		//입고배정 수정
		Map<String, Object> updateMap = new HashMap<String, Object>();
		updateMap.putAll(map);
		updateMap.put("rcmdloc", "*");
		updateMap.put("putwstat", "99"); //작업예정

		//권장위치 수정
		rcptDao.updateRcptAsgnRcmdLoc(updateMap);
		//적치상태 수정
		rcptDao.updateRcptAsgnPutwStat(updateMap);		
	}
	
	/************************************************************************************
	 * 깨끗한나라 - 입고배정 적치지시 완료 ( 적치위치, 적치상태 수정 )
	 * 
	 * @param map 
	 */
	public void updateRcptAsgnForPutwCompt(Map<String, Object> map) {

		//입고배정 수정
		Map<String, Object> updateMap = new HashMap<String, Object>();
		updateMap.putAll(map);
		updateMap.put("putwloc", map.get("toloc"));
		updateMap.put("putwstat", "50");	//작업완료

		//적치위치 수정
		rcptDao.updateRcptAsgnPutwLoc(updateMap);
		//적치상태 수정
		rcptDao.updateRcptAsgnPutwStat(updateMap);		
	}


	/************************************************************************************
	 * 깨끗한나라 - 입고배정 적치지시 ( 권장위치, 적치상태 수정 )
	 * 
	 * @param map 
	 */
	public void updateRcptAsgnForPutwOrdr(Map<String, Object> map) {
		
		//입고배정 수정
		Map<String, Object> updateMap = new HashMap<String, Object>();
		updateMap.putAll(map);
		updateMap.put("rcmdloc", map.get("toloc"));
		updateMap.put("putwstat", "51"); //작업예정
	
		//권장위치 수정
		rcptDao.updateRcptAsgnRcmdLoc(updateMap);
		//적치상태 수정
		rcptDao.updateRcptAsgnPutwStat(updateMap);		
	}
}