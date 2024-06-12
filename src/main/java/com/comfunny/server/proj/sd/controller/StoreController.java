
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
	@RequestMapping("/selectList")
	public ResponseEntity selectList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(storeDao.selectList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 배송처 저장
	 * */
	@RequestMapping("/save")
	public ResponseEntity save(@RequestBody Map map)  throws Exception {
		storeService.save(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 배송처 삭제처
	 * */
	@PostMapping("/delete")
	public ResponseEntity delete(@RequestBody Map map)  throws Exception {
		storeService.delete(map);
		return ResponseEntity.ok().build();
	}
}
