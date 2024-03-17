
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.LocDao;
import com.comfunny.server.proj.sd.service.LocService;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api/wms/sd/loc")
public class LocController {

	@Resource
	private LocDao locDao;

	@Autowired
	private LocService locService;

	/**
	 * 존 페이지이동
	 * */
	@GetMapping
	public String sdLoc() {
		return "wms/sd/sdLoc";
	}

	/**
	 * 창고 그리드 조회
	 * */
	@RequestMapping("/selectLevelDcList")
	public Params selectLevelDcList(Params params) {
		params.put("dt_grid", locDao.selectLevelDcList(params));
		return params;
	}
	/**
	 * 존 그리드 조회
	 * */
	@RequestMapping("/selectLevelDcZoneList")
	public Params selectLevelDcZoneList(Params params) {
		params.put("dt_grid", locDao.selectLevelDcZoneList(params));
		return params;
	}
	/**
	 * 로케이션 그리드 조회
	 * */
	@RequestMapping("/selectLevelDcZoneLocList")
	public Params selectLevelDcZoneLocList(Params params) {
		params.put("dt_grid", locDao.selectLevelDcZoneLocList(params));
		return params;
	}
	/**
	 * 로케이션 그리드 조회
	 * */
	@RequestMapping("/selectLocList")
	public Params selectLocList(Params params) {
		params.put("dt_grid", locDao.selectLocList(params));
		return params;
	}

	/**
	 * 로케이션 저장
	 * */
	@RequestMapping("/saveLoc")
	public Params saveLoc(Params params)  throws Exception {
		locService.saveLoc(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}

	/**
	 * 로케이션 삭제
	 * */
	@PostMapping("/deleteLoc")
	public Params deleteLoc(Params params)  throws Exception {
		locService.deleteLoc(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}
}
