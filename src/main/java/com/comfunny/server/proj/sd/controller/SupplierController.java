
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.domain.Supplier;
import com.comfunny.server.proj.sd.repository.SupplierDao;
import com.comfunny.server.proj.sd.repository.SupplierRepository;
import com.comfunny.server.proj.sd.service.SupplierService;
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
@RequestMapping("/api/wms/sd/supplier")
public class SupplierController {

	@Resource
	private SupplierRepository supplierRepository;

	@Resource
	private SupplierDao supplierDao;

	@Autowired
	private SupplierService supplierService;

	/**
	 * 공급처 페이지이동
	 * */
	@GetMapping
	public String supplierPgMove() {
		return "wms/sd/sdSupplier";
	}

	/**
	 * 공급처 그리드 조회
	 * */
	@RequestMapping("/selectSupplierList")
	public Params selectSupplierList(Params params) {
		List<Supplier> list = supplierDao.selectSupplierList(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		params.put("dt_grid", list);
		return params;
	}

	/**
	 * 공급처 저장
	 * */
	@RequestMapping("/saveSupplier")
	public Params save(Params params)  throws Exception {
		supplierService.saveSupplier(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}

	/**
	 * 공급처 삭제처
	 * */
	@PostMapping("/deleteSupplier")
	public Params delete(Params params)  throws Exception {
		supplierService.deleteSupplier(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return outParams;
	}
}
