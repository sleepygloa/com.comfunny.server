
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.ItemUomDao;
import com.comfunny.server.proj.sd.service.ItemUomService;
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
@RequestMapping("/wms/sd/itemUom")
public class ItemUomController {

	@Resource
	private ItemUomDao itemUomDao;

	@Autowired
	private ItemUomService itemUomService;

	/**
	 * 상품분류 그리드 조회
	 * */
	@RequestMapping("/selectItemUomList")
	public ResponseEntity selectItemUomList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(itemUomDao.selectItemUomList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 상품분류 저장
	 * */
	@RequestMapping("/saveItemUom")
	public ResponseEntity saveItemUom(@RequestBody Map map)  throws Exception {
		itemUomService.saveItemUom(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 상품분류 삭제
	 * */
	@PostMapping("/deleteItemUom")
	public ResponseEntity deleteItemUom(@RequestBody Map map)  throws Exception {
		itemUomService.deleteItemUom(map);
		return ResponseEntity.ok().build();
	}
}
