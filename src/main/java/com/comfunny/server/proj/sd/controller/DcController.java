
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.repository.DcDao;
import com.comfunny.server.proj.sd.repository.DcRepository;
import com.comfunny.server.proj.sd.service.DcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

@Controller
@RequestMapping("/wms/sd/dc")
public class DcController {

	@Resource
	private DcRepository dcRepository;

	@Resource
	private DcDao dcDao;

	@Autowired
	private DcService dcService;

	/**
	 * 물류센터 그리드 조회
	 * */
	@RequestMapping("/selectList")
	public ResponseEntity selectList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(dcDao.selectList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 물류센터 저장
	 * */
	@RequestMapping("/save")
	public ResponseEntity save(@RequestBody Map map)  throws Exception {
		dcService.save(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 물류센터 삭제
	 * */
	@PostMapping("/delete")
	public ResponseEntity delete(@RequestBody Map map)  throws Exception {
		dcService.delete(map);
		return ResponseEntity.ok().build();
	}
}
