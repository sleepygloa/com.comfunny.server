
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.ItemClassDao;
import com.comfunny.server.proj.sd.repository.ItemDao;
import com.comfunny.server.proj.sd.service.ItemClassService;
import com.comfunny.server.proj.sd.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

@Controller
@RequestMapping("/wms/sd/itemClass")
public class ItemClassController {

	@Resource
	private ItemClassDao itemClassDao;

	@Autowired
	private ItemClassService itemClassService;

	/**
	 * 상품분류 그리드 조회
	 * */
	@RequestMapping("/selectItemClassList")
	public ResponseEntity selectItemClassList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(itemClassDao.selectItemClassList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 상품분류 저장
	 * */
	@RequestMapping("/saveItemClass")
	public ResponseEntity saveItemClass(@RequestBody Map map)  throws Exception {
		itemClassService.saveItemClass(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 상품분류 삭제
	 * */
	@PostMapping("/deleteItemClass")
	public ResponseEntity deleteItemClass(@RequestBody Map map)  throws Exception {
		itemClassService.deleteItemClass(map);
		return ResponseEntity.ok().build();
	}
}
