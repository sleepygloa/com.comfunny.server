
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.SdCommonDao;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api/wms/sd/common")
public class SdCommonController {

	@Resource
	private SdCommonDao sdCommonDao;

	/**
	 * 고객사 드랍박스 조회
	 * */
	@RequestMapping("/selectClientCmbList")
	public Params selectClientCmbList(Params params) {
		Params outParams = new CommParams();
		outParams.setStsCd(200);
		outParams.put("dt_list", sdCommonDao.selectClientCmbList(params));
		return outParams;
	}

	/**
	 * 물류창고 드랍박스 조회
	 * */
	@RequestMapping("/selectDcCmbList")
	public Params selectDcCmbList(Params params) {
		Params outParams = new CommParams();
		outParams.setStsCd(200);
		outParams.put("dt_list", sdCommonDao.selectDcCmbList(params));
		return outParams;
	}
	/**
	 * 구역 드랍박스 조회
	 * */
	@RequestMapping("/selectAreaCmbList")
	public Params selectAreaCmbList(Params params) {
		Params outParams = new CommParams();
		outParams.setStsCd(200);
		outParams.put("dt_list", sdCommonDao.selectAreaCmbList(params));
		return outParams;
	}
}
