
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.ZoneDao;
import com.comfunny.server.proj.sd.repository.ZoneRepository;
import com.comfunny.server.proj.sd.service.ZoneService;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api/wms/sd/zone")
public class ZoneController {

	@Resource
	private ZoneRepository zoneRepository;

	@Resource
	private ZoneDao zoneDao;

	@Autowired
	private ZoneService zoneService;

	/**
	 * 존 페이지이동
	 * */
	@GetMapping
	public String zonePgMove() {
		return "wms/sd/sdZone";
	}

	/**
	 * 창고 그리드 조회
	 * */
	@RequestMapping("/selectLevelDcList")
	public Params selectLevelDcList(Params params) {
		params.put("dt_grid", zoneDao.selectLevelDcList(params));
		return params;
	}
	/**
	 * 구역 그리드 조회
	 * */
	@RequestMapping("/selectLevelAreaList")
	public Params selectLevelAreaList(Params params) {
		params.put("dt_grid", zoneDao.selectLevelAreaList(params));
		return params;
	}
	/**
	 * 존 그리드 조회
	 * */
	@RequestMapping("/selectLevelZoneList")
	public Params selectLevelZoneList(Params params) {
		params.put("dt_grid", zoneDao.selectLevelZoneList(params));
		return params;
	}
	/**
	 * 존 그리드 조회
	 * */
	@RequestMapping("/selectZoneList")
	public Params selectZoneList(Params params) {
		params.put("dt_grid", zoneDao.selectZoneList(params));
		return params;
	}

	/**
	 * 존 저장
	 * */
	@RequestMapping("/saveZone")
	public Params saveZone(Params params)  throws Exception {
		zoneService.saveZone(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}

	/**
	 * 존 삭제
	 * */
	@PostMapping("/deleteZone")
	public Params deleteZone(Params params)  throws Exception {
		zoneService.deleteZone(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}
}
