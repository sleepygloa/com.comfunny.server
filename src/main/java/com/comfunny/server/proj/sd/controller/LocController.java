
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
	 * 물류챵고 조회
	 * */
	@RequestMapping("/selectDcList")
	public ResponseEntity selectDcList() {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(locDao.selectDcList());
		return ResponseEntity.ok().body(list);
	}
	/**
	 * 구역 그리드 조회
	 * */
	@RequestMapping("/selectDcAreaList")
	public ResponseEntity selectDcAreaList() {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(locDao.selectDcAreaList());
		return ResponseEntity.ok().body(list);
	}
	/**
	 * 구역 그리드 조회
	 * */
	@RequestMapping("/selectDcAreaZoneList")
	public ResponseEntity selectDcAreaZoneList() {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(locDao.selectDcAreaZoneList());
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
