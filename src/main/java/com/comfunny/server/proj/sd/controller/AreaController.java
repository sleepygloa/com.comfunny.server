
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.AreaDao;
import com.comfunny.server.proj.sd.repository.AreaRepository;
import com.comfunny.server.proj.sd.service.AreaService;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api/wms/sd/area")
public class AreaController {

	@Resource
	private AreaRepository areaRepository;

	@Resource
	private AreaDao areaDao;

	@Autowired
	private AreaService areaService;

	/**
	 * 구역 페이지이동
	 * */
	@GetMapping
	public String areaPgMove() {
		return "wms/sd/sdArea";
	}

	/**
	 * 구역 그리드 조회
	 * */
	@RequestMapping("/selectAreaList")
	public Params selectAreaList(Params params) {
		params.put("dt_grid", areaDao.selectAreaList(params));
		return params;
	}

	/**
	 * 구역 저장
	 * */
	@RequestMapping("/saveArea")
	public Params saveArea(Params params)  throws Exception {
		areaService.saveArea(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}

	/**
	 * 구역 삭제
	 * */
	@PostMapping("/deleteArea")
	public Params deleteArea(Params params)  throws Exception {
		areaService.deleteArea(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}
}
