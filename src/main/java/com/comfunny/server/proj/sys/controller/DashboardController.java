package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.repository.DashboardDao;
import com.comfunny.server.proj.sys.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
public class DashboardController {

    @Resource
    private DashboardDao dashboardDao;

    @Autowired
    private DashboardService dashboardService;

    /**
     * @Program : 대쉬보드 화면이동
     * @Desc :
     * */
    @GetMapping("/api/dashboard/dashboard")
    public String selectLeftMenu(){
        return "/dashboard/dashboard";
    }







    /*******************************************************************************************************************
     * PDA
     ****************************************************************************************************************** */
    /**
     * @Program : 대쉬보드 즐겨찾기 메뉴
     * @Desc :
     * */
    @GetMapping("/api/pda/dashboard/getPdaDashboardFavoriteMenu")
    public @ResponseBody List<Map> getPdaDashboardFavoriteMenu(HttpSession session) {
        //TODO 사용자데이터 불러오는것으로 변경해야함.
        String langCd = session.getAttribute("slangCd") == null ? "ko" : (String)session.getAttribute("slangCd");
        String bizCd = session.getAttribute("sBizCd") == null ? "COMFUNNY_DEVELOPERS" : (String)session.getAttribute("sBizCd");
        Map map = new HashMap<>();
        map.put("bizCd", bizCd);
        map.put("langCd", langCd);

        return dashboardDao.getPdaDashboardFavoriteMenu(map);
    }
}
