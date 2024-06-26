
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.domain.Store;
import com.comfunny.server.proj.sd.repository.StoreDao;
import com.comfunny.server.proj.sd.repository.StoreRepository;
import com.comfunny.server.proj.sd.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

@Controller
@RequestMapping("/wms/sd/store")
public class StoreController {

	@Resource
	private StoreRepository storeRepository;

	@Resource
	private StoreDao storeDao;

	@Autowired
	private StoreService storeService;

	/**
	 * 배송처 그리드 조회
	 * */
	@RequestMapping("/selectStoreList")
	public ResponseEntity selectStoreList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(storeDao.selectStoreList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 배송처 저장
	 * */
	@RequestMapping("/saveStore")
	public ResponseEntity saveStore(@RequestBody Map map)  throws Exception {
		storeService.saveStore(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 배송처 삭제처
	 * */
	@PostMapping("/deleteStore")
	public ResponseEntity deleteStore(@RequestBody Map map)  throws Exception {
		storeService.deleteStore(map);
		return ResponseEntity.ok().build();
	}
}
