package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.service.AuthMenuService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthMenuController {

    @Autowired
    private AuthMenuService authMenuService;

    /**
     * @Program : 권한메뉴관리
     * @Desc : 권한메뉴관리 조회
     * */
//    @PostMapping("/api/sys/authMenu/selectAuthMenuList")
//    public @ResponseBody Page<AuthResDto> selectAuthMenuList(@RequestBody AuthReqDto authMenuReqDto){
//        return authMenuService.selectAuthMenuList(authMenuReqDto);
//    }
    /**
     * @Program : 권한메뉴관리
     * @Desc : 권한메뉴관리 조회
     * */
//    @PostMapping("/api/sys/authMenu/selectNoRegMenuList")
//    public @ResponseBody Page<MenuResDto> selectNoRegMenuList(@RequestBody MenuReqDto menuReqDto){
//        return authMenuService.selectNoRegMenuList(menuReqDto);
//    }
//    /**
//     * @Program : 권한메뉴관리
//     * @Desc : 권한메뉴관리 조회
//     * */
//    @PostMapping("/api/sys/authMenu/selectRegMenuList")
//    public @ResponseBody Page<MenuResDto> selectRegMenuList(@RequestBody MenuReqDto menuReqDto){
//        return authMenuService.selectRegMenuList(menuReqDto);
//    }

//    /**
//     * @Program : 권한메뉴관리
//     * @Desc : 권한메뉴관리 저장
//     * */
//    @PostMapping("/api/sys/authMenu/saveAuthMenu")
//    public void saveAuthMenu(@RequestBody AuthMenuReqDto authMenuReqDto){
//        authMenuService.saveAuthMenu(authMenuReqDto);
//    }
//
//    /**
//     * @Program : 권한메뉴관리
//     * @Desc : 권한메뉴관리 삭제
//     * */
//    @PostMapping("/api/sys/authMenu/deleteAuthMenu")
//    public void deleteAuthMenu(@RequestBody AuthMenuReqDto authMenuReqDto){
//        authMenuService.deleteAuthMenu(authMenuReqDto);
//    }

}
