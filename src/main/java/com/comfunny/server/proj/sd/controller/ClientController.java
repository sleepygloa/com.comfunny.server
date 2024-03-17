
package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.domain.Client;
import com.comfunny.server.proj.sd.repository.ClientDao;
import com.comfunny.server.proj.sd.repository.ClientRepository;
import com.comfunny.server.proj.sd.service.ClientService;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/api/wms/sd/client")
public class ClientController {

	@Resource
	private ClientRepository clientRepository;

	@Resource
	private ClientDao clientDao;

	@Autowired
	private ClientService clientService;

	/**
	 * 고객사 페이지이동
	 * */
	@GetMapping
	public String clientPgMove() {
		return "wms/sd/sdClient";
	}


	/**
	 * 고객사 드랍박스 조회
	 * */
	@RequestMapping("/selectClientCmbList")
	public Params selectClientCmbList(Params params) {
		Params outParams = new CommParams();
		outParams.setStsCd(200);
		outParams.put("dt_list", clientDao.selectClientCmbList(params));
		return outParams;
	}

	/**
	 * 고객사 그리드 조회
	 * */
	@RequestMapping("/selectClientList")
	public Params selectClientList(Params params) {
		List<Client> list = clientDao.selectClientList(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		outParams.put("dt_grid", list);
		return params;
	}

	/**
	 * 고객사 저장
	 * */
	@RequestMapping("/saveClient")
	public Params save(Params params)  throws Exception {
		clientService.saveClient(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return params;
	}

	/**
	 * 고객사 삭제
	 * */
	@PostMapping("/deleteClient")
	public Params delete(Params params)  throws Exception {
		clientService.deleteClient(params);

		Params outParams = new CommParams();
		outParams.setStsCd(200);
		return params;
	}
}
