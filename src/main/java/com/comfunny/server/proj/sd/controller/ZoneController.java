
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.ZoneDao;
import com.comfunny.server.proj.sd.repository.ZoneRepository;
import com.comfunny.server.proj.sd.service.ZoneService;
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
@RequestMapping("/wms/sd/zone")
public class ZoneController {

	@Resource
	private ZoneRepository zoneRepository;

	@Resource
	private ZoneDao zoneDao;

	@Autowired
	private ZoneService zoneService;

	/**
	 * 물류챵고 조회
	 * */
	@RequestMapping("/selectDcList")
	public ResponseEntity selectDcList() {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(zoneDao.selectDcList());
		return ResponseEntity.ok().body(list);
	}
	/**
	 * 구역 그리드 조회
	 * */
	@RequestMapping("/selectDcAreaList")
	public ResponseEntity selectDcAreaList() {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(zoneDao.selectDcAreaList());
		return ResponseEntity.ok().body(list);
	}
	/**
	 * 존 그리드 조회
	 * */
	@RequestMapping("/selectZoneList")
	public ResponseEntity selectZoneList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(zoneDao.selectZoneList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 존 저장
	 * */
	@RequestMapping("/saveZone")
	public ResponseEntity saveZone(@RequestBody Map map)  throws Exception {
		zoneService.saveZone(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 존 삭제
	 * */
	@PostMapping("/deleteZone")
	public ResponseEntity deleteZone(@RequestBody Map map)  throws Exception {
		zoneService.deleteZone(map);
		return ResponseEntity.ok().build();
	}
}
