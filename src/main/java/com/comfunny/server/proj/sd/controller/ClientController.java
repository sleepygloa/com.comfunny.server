
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.domain.Client;
import com.comfunny.server.proj.sd.repository.ClientDao;
import com.comfunny.server.proj.sd.repository.ClientRepository;
import com.comfunny.server.proj.sd.service.ClientService;
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
@RequestMapping("/wms/sd/client")
public class ClientController {

	@Resource
	private ClientRepository clientRepository;

	@Resource
	private ClientDao clientDao;

	@Autowired
	private ClientService clientService;

	/**
	 * 고객사 드랍박스 조회
	 * */
	@RequestMapping("/selectClientCmbList")
	public ResponseEntity selectClientCmbList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(clientDao.selectClientCmbList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 고객사 그리드 조회
	 * */
	@RequestMapping("/selectClientList")
	public ResponseEntity selectClientList(@RequestBody Map map) {
		List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(clientDao.selectClientList(map));
		return ResponseEntity.ok().body(list);
	}

	/**
	 * 고객사 저장
	 * */
	@RequestMapping("/saveClient")
	public ResponseEntity saveClient(@RequestBody Map map)  throws Exception {
		clientService.saveClient(map);
		return ResponseEntity.ok().build();
	}

	/**
	 * 고객사 삭제
	 * */
	@PostMapping("/deleteClient")
	public ResponseEntity deleteClient(@RequestBody Map map)  throws Exception {
		clientService.deleteClient(map);
		return ResponseEntity.ok().build();
	}
}
