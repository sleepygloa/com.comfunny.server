
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.domain.Store;
import com.comfunny.server.proj.sd.repository.StoreDao;
import com.comfunny.server.proj.sd.repository.StoreRepository;
import com.comfunny.server.proj.sd.service.StoreService;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/api/wms/sd/store")
public class StoreController {

	@Resource
	private StoreRepository storeRepository;

	@Resource
	private StoreDao storeDao;

	@Autowired
	private StoreService storeService;

	/**
	 * 배송처 페이지이동
	 * */
	@GetMapping
	public String storePgMove() {
		return "wms/sd/sdStore";
	}

	/**
	 * 배송처 그리드 조회
	 * */
	@RequestMapping("/selectStoreList")
	public Params selectStoreList(Params params) {
		List<Store> list = storeDao.selectStoreList(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		params.put("dt_grid", list);
		return params;
	}

	/**
	 * 배송처 저장
	 * */
	@RequestMapping("/saveStore")
	public Params save(Params params)  throws Exception {
		storeService.saveStore(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}

	/**
	 * 배송처 삭제처
	 * */
	@PostMapping("/deleteStore")
	public Params delete(Params params)  throws Exception {
		storeService.deleteStore(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}
}
