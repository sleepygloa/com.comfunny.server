package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.dto.LoginDto;
import com.comfunny.server.proj.sys.service.UserService;
import com.comfunny.server.sys.security.controller.dto.TokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;


    @GetMapping("/test")
    public String test(){
        return "<h2>Hello world</h2>";
    }
//
//    @GetMapping("/selectBizCmb")
//    public List<Map<String, String>> selectLoginBiz() throws Exception{
//        return bizDao.selectBizCmb();
//    }
//
    @RequestMapping("/auth/socialAuthCheck")
    public void socialAuthCheck(@RequestBody Map map) throws IOException {
        userService.socialAuthCheck(map);
    }
    @RequestMapping("/login")
    public Map authenticate(Map map, HttpServletResponse response) throws IOException {
        return userService.login(response, map);
    }
//
//    @RequestMapping("/saveUser")
//    public ResponseEntity<TokenDto> saveUser(@Valid @RequestBody LoginDto loginDto) {
//        return userService.saveUserReg(loginDto);
//    }
}
