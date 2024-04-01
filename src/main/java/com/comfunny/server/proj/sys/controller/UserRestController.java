package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.repository.UserRepository;
import com.comfunny.server.proj.sys.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserRestController {

    @Resource(name = "userService")
    private UserService userService;
    @Resource
    UserRepository userRepository;

//    /**
//     * @Program : 로그인화면
//     * @Desc : 회원가입
//     * */
//    @PostMapping("/signup")
//    public ResponseEntity<UserDto> signup(@Valid @RequestBody UserDto userDto) {
//        return ResponseEntity.ok(userService.signup(userDto));
//    }
//
//
//    @GetMapping("/user")
//    @PreAuthorize("hasAnyRole('USER','ADMIN')")
//    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
//        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
//    }
//
//    @GetMapping("/{username}")
//    @PreAuthorize("hasAnyRole('ADMIN')")
//    public ResponseEntity<UserDto> getUserInfo(@PathVariable String username) {
//        return ResponseEntity.ok(userService.getUserWithAuthorities(username));
//    }


}
