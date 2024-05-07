
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.LocDao;
import com.comfunny.server.proj.sd.service.LocService;
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
@RequestMapping("/wms/sd/loc")
public class LocController {

	@Resource
	private LocDao locDao;

	@Autowired
	private LocService locService;

	/**
	 * 창고 그리드 조회
	 * */
	@RequestMapping("/selectLevelDcList")
	public ResponseEntity selectLevelDcList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(locDao.selectLevelDcList(map));
		return ResponseEntity.ok().body(list);
	}
	/**
	 * 존 그리드 조회
	 * */
	@RequestMapping("/selectLevelDcZoneList")
	public ResponseEntity selectLevelDcZoneList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(locDao.selectLevelDcZoneList(map));
		return ResponseEntity.ok().body(list);
	}
	/**
	 * 로케이션 그리드 조회
	 * */
	@RequestMapping("/selectLevelDcZoneLocList")
	public ResponseEntity selectLevelDcZoneLocList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(locDao.selectLevelDcZoneLocList(map));
		return ResponseEntity.ok().body(list);
	}
	/**
	 * 로케이션 그리드 조회
	 * */
	@RequestMapping("/selectLocList")
	public ResponseEntity selectLocList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(locDao.selectLocList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 로케이션 저장
	 * */
	@RequestMapping("/saveLoc")
	public ResponseEntity saveLoc(@RequestBody Map map)  throws Exception {
		locService.saveLoc(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 로케이션 삭제
	 * */
	@PostMapping("/deleteLoc")
	public ResponseEntity deleteLoc(@RequestBody Map map)  throws Exception {
		locService.deleteLoc(map);
		return ResponseEntity.ok().build();
	}
}
