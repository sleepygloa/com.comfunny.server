
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
	@RequestMapping("/selectList")
	public ResponseEntity selectList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(supplierDao.selectList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 공급처 저장
	 * */
	@RequestMapping("/save")
	public ResponseEntity save(@RequestBody Map map)  throws Exception {
		supplierService.save(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 공급처 삭제처
	 * */
	@PostMapping("/delete")
	public ResponseEntity delete(@RequestBody Map map) throws Exception {
		supplierService.delete(map);
		return ResponseEntity.ok().build();
	}
}
