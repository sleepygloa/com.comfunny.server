package com.nambi.book.web;

import com.nambi.book.config.auth.LoginUser;
import com.nambi.book.config.auth.dto.SessionUser;
import com.nambi.book.service.system.MenuService;
import com.nambi.book.web.dto.system.MenuListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final HttpSession httpSession;

    @GetMapping("/")
    public String index(Model model, @LoginUser SessionUser user){
        if(user != null){
            model.addAttribute("userName", user.getName());
        }
        return "index";
    }

    /************************************************************
     * 로그인 페이지로 이동
     *************************************************************/
    @GetMapping("/loginUser")
    public String login(){
        return "loginUser";
    }


    /************************************************************
     * 메뉴 페이지로 이동
     *************************************************************/
    @GetMapping("/menu")
    public String menu(Model model, @LoginUser SessionUser user){
//        model.addAttribute("menu", menuService.findAlldesc());

        if(user != null){
            model.addAttribute("userName", user.getName());
        }
        return "menu";
    }
    @GetMapping("/menu/list")
    public @ResponseBody List<MenuListResponseDto> menuList(Model model, @LoginUser SessionUser user){
        return menuService.findAlldesc();
    }

    private final MenuService menuService;
}
