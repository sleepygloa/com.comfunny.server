package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.repository.UserDao;
import com.comfunny.server.proj.sys.repository.UserRepository;
import com.comfunny.server.proj.sys.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/api/sys/user")
public class UserController {

    @Resource
    private UserService userService;
    @Resource
    UserRepository userRepository;

    @Resource
    UserDao userDao;


    /**
     * @Program : 사용자관리 화면이동
     * @Desc :
     * */
    @RequestMapping
    public String sysUser(){
        return "/sys/sysUser";
    }

//
//    /**
//     * @Program : 사용자관리 화면
//     * @Desc : 조회
//     * */
//    @RequestMapping("/selectUserList")
//    public Params selectUserList (Params params){
//        List<User> list = userDao.selectUserList(params);
//
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        outParams.setParam("dt_grid", list);
//        return outParams;
//    }
//
//    /**
//     * @Program : 사용자관리 화면
//     * @Desc : 저장
//     * */
//    @RequestMapping("/saveUser")
//    public Params saveUser (Params params){
//        userService.saveUser(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//    /**
//     * @Program : 사용자관리 화면
//     * @Desc : 삭제
//     * */
//    @RequestMapping("/deleteUser")
//    public Params deleteUser (Params params){
//        userService.deleteUser(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//    @GetMapping("/getUserInfo")
//    public List<UserInfoResDto> getUserInfo(@RequestBody UserInfoReqDto dto){
//        return userService.selectMain(dto);
//    }
//
//    @PostMapping("/saveUserInfo")
//    public void saveUserInfo(@RequestBody UserInfoSaveDto dto){
//        userService.saveMain(dto);
//    }
//
//    @PostMapping("/delUserInfo")
//    public void delUserInfo(@RequestBody UserInfoSaveDto dto){
//        userService.delMain(dto);
//    }

}
