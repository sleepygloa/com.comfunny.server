
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.domain.Supplier;
import com.comfunny.server.proj.sd.repository.SupplierDao;
import com.comfunny.server.proj.sd.repository.SupplierRepository;
import com.comfunny.server.proj.sd.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

@Controller
@RequestMapping("/wms/sd/supplier")
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
	public ResponseEntity selectSupplierList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(supplierDao.selectSupplierList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 공급처 저장
	 * */
	@RequestMapping("/saveSupplier")
	public ResponseEntity saveSupplier(@RequestBody Map map)  throws Exception {
		supplierService.saveSupplier(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 공급처 삭제
	 * */
	@PostMapping("/deleteSupplier")
	public ResponseEntity deleteSupplier(@RequestBody Map map) throws Exception {
		supplierService.deleteSupplier(map);
		return ResponseEntity.ok().build();
	}


	/**
	 * 공급처리스트 처리
	 * */
	@RequestMapping("/saveSupplierList")
	public ResponseEntity saveSupplierList(@RequestBody List<Map> list)  throws Exception {
		supplierService.saveSupplierList(list);
		return ResponseEntity.ok().build();
	}

}
