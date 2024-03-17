package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.dto.LoginDto;
import com.comfunny.server.proj.sys.service.UserService;
import com.comfunny.server.proj.sd.repository.BizDao;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.security.controller.dto.TokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Resource
    BizDao bizDao;
    @Autowired
    private UserService userService;


    @GetMapping("/test")
    public String test(){
        return "<h2>Hello world</h2>";
    }

    @GetMapping("/selectBizCmb")
    public List<Map<String, String>> selectLoginBiz() throws Exception{
        return bizDao.selectBizCmb();
    }

    @RequestMapping("/login")
    public Params authenticate(Params params, HttpServletResponse response) throws IOException {
        Params outParams = userService.login(response, params);
        return outParams;
    }

    @RequestMapping("/saveUser")
    public ResponseEntity<TokenDto> saveUser(@Valid @RequestBody LoginDto loginDto) {
        return userService.saveUserReg(loginDto);
    }
}
