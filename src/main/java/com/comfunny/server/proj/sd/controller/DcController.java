
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.DcDao;
import com.comfunny.server.proj.sd.repository.DcRepository;
import com.comfunny.server.proj.sd.service.DcService;
import com.comfunny.server.sys.paramaters.Params;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api/wms/sd/dc")
public class DcController {

	@Resource
	private DcRepository dcRepository;

	@Resource
	private DcDao dcDao;

	@Autowired
	private DcService dcService;

	/**
	 * 물류센터 페이지이동
	 * */
	@GetMapping
	public String dcPgMove() {
		return "wms/sd/sdDc";
	}

	/**
	 * 물류센터 그리드 조회
	 * */
	@RequestMapping("/selectDcList")
	public Params selectDcList(Params params) {
		params.put("dt_grid", dcDao.selectDcList(params));
		return params;
	}

	/**
	 * 물류센터 저장
	 * */
	@RequestMapping("/save")
	public Params save(Params params)  throws Exception {
		dcService.save(params);

		params.setStsCd(200);
		return params;
	}

	/**
	 * 물류센터 삭제
	 * */
	@PostMapping("/delete")
	public Params delete(Params params)  throws Exception {
		dcService.delete(params);

		params.setStsCd(200);
		return params;
	}
}
