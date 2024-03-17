package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.service.AuthUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthUserController {

    @Autowired
    private AuthUserService authUserService;

    /**
     * @Program : 권한사용자관리
     * @Desc : 권한사용자관리 조회
     * */
//    @PostMapping("/api/sys/authUser/selectAuthUserList")
//    public @ResponseBody Page<AuthUserResDto> selectAuthUserList(@RequestBody AuthUserReqDto authUserReqDto){
//        return authUserService.selectAuthUserList(authUserReqDto);
//    }


    /**
     * @Program : 권한사용자관리
     * @Desc : 권한사용자관리 저장
     * */
//    @PostMapping("/api/sys/authUser/saveAuthUser")
//    public void saveAuthUser(@RequestBody AuthUserReqDto authUserReqDto){
//        authUserService.saveAuthUser(authUserReqDto);
//    }
//
//    /**
//     * @Program : 권한사용자관리
//     * @Desc : 권한사용자관리 삭제
//     * */
//    @PostMapping("/api/sys/authUser/deleteAuthUser")
//    public void deleteAuthUser(@RequestBody AuthUserReqDto authUserReqDto){
//        authUserService.deleteAuthUser(authUserReqDto);
//    }

}
