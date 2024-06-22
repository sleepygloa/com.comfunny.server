
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.ItemDao;
import com.comfunny.server.proj.sd.repository.ZoneDao;
import com.comfunny.server.proj.sd.repository.ZoneRepository;
import com.comfunny.server.proj.sd.service.ItemService;
import com.comfunny.server.proj.sd.service.ZoneService;
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
@RequestMapping("/wms/sd/item")
public class ItemController {

//	@Resource
//	private ItemRepository itemRepository;

	@Resource
	private ItemDao itemDao;

	@Autowired
	private ItemService itemService;

	/**
	 * 상품 그리드 조회
	 * */
	@RequestMapping("/selectItemList")
	public ResponseEntity selectItemList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(itemDao.selectItemList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 상품 저장
	 * */
	@RequestMapping("/saveItem")
	public ResponseEntity saveItem(@RequestBody Map map)  throws Exception {
		itemService.saveItem(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 상품 삭제
	 * */
	@PostMapping("/deleteItem")
	public ResponseEntity deleteItem(@RequestBody Map map)  throws Exception {
		itemService.deleteItem(map);
		return ResponseEntity.ok().build();
	}
}
