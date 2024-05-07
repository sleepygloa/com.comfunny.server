
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.SdCommonDao;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

@Controller
@RequestMapping("/api/wms/sd/common")
public class SdCommonController {

	@Resource
	private SdCommonDao sdCommonDao;

	/**
	 * 고객사 드랍박스 조회
	 * */
	@RequestMapping("/selectClientCmbList")
	public ResponseEntity selectClientCmbList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(sdCommonDao.selectClientCmbList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 물류창고 드랍박스 조회
	 * */
	@RequestMapping("/selectDcCmbList")
	public ResponseEntity selectDcCmbList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(sdCommonDao.selectDcCmbList(map));
		return ResponseEntity.ok().body(list);
	}
	/**
	 * 구역 드랍박스 조회
	 * */
	@RequestMapping("/selectAreaCmbList")
	public ResponseEntity selectAreaCmbList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(sdCommonDao.selectAreaCmbList(map));
		return ResponseEntity.ok().body(list);
	}
}
