
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.AreaDao;
import com.comfunny.server.proj.sd.repository.AreaRepository;
import com.comfunny.server.proj.sd.service.AreaService;
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
@RequestMapping("/wms/sd/area")
public class AreaController {

	@Resource
	private AreaRepository areaRepository;

	@Resource
	private AreaDao areaDao;

	@Autowired
	private AreaService areaService;
	/**
	 * 물류창고 조회
	 * */
	@RequestMapping("/selectDcList")
	public ResponseEntity selectDcList() {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(areaDao.selectDcList());
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 구역 그리드 조회
	 * */
	@RequestMapping("/selectAreaList")
	public ResponseEntity selectAreaList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(areaDao.selectAreaList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 구역 저장
	 * */
	@RequestMapping("/saveArea")
	public ResponseEntity saveArea(@RequestBody Map map)  throws Exception {
		areaService.saveArea(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 구역 삭제
	 * */
	@PostMapping("/deleteArea")
	public ResponseEntity deleteArea(@RequestBody Map map)  throws Exception {
		areaService.deleteArea(map);
		return ResponseEntity.ok().build();
	}
}
