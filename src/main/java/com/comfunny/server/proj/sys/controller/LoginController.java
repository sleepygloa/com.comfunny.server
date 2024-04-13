package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.dto.LoginDto;
import com.comfunny.server.proj.sys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    @RequestMapping("/auth/socialAuthCheck")
    public void socialAuthCheck(@RequestBody Map map) throws IOException {
        userService.socialAuthCheck(map);
    }
    /**
     * 로그인
     * */
    @RequestMapping("/login")
    public Map login(@RequestBody Map map, HttpServletRequest req) throws Exception {
        return userService.login(map, req);
    }
    /**
     * 로그아웃
     * */
    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest req) {
        return userService.logout(req);
    }

    @RequestMapping("/saveUser")
    public ResponseEntity saveUser(@RequestBody LoginDto loginDto) throws IOException {
        return userService.saveUserReg(loginDto);
    }

    /**
     * 사용자정보 불러오기
     * */
    @GetMapping("/getUserInfo")
    public ResponseEntity getUserInfo(HttpServletRequest request)  {
        return userService.getUserInfo(request);
    }
}
