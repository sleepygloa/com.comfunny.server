package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.repository.MenuDao;
import com.comfunny.server.proj.sys.repository.MenuRepository;
import com.comfunny.server.proj.sys.service.MenuService;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.LinkedParams;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.ParamsFactory;
import com.comfunny.server.sys.paramaters.datatable.CommDataTable;
import com.comfunny.server.sys.paramaters.datatable.DataTable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequestMapping("/api/sys/menu")
public class MenuController {

    private final MenuService menuService;
    private final MenuDao menuDao;

    private final MenuRepository menuRepository;


    public MenuController(
            MenuService menuService,
            MenuDao menuDao,
            MenuRepository menuRepository
    ){
        this.menuService = menuService;
        this.menuDao = menuDao;
        this.menuRepository = menuRepository;
    }

    /**
     * @Program : 메인화면 사이드 메뉴조회
     * @Desc :
     * */
    @PostMapping("/selectLeftMenu")
    public Params selectLeftMenu(Params params){
        params.put("dt_leftMenu", menuDao.selectLeftMenu(params));
        return params;
    }

    /**
     * @Program : 메뉴관리 페이지이동
     * */
    @GetMapping
    public String menuPgMove() {
        return "sys/sysMenu";
    }

    /**
     * @Program : 메뉴관리 그리드 조회
     * @Desc :
     * */
    @RequestMapping("/listMenu")
    public Params listMenu(Params params) {

        DataTable dt = new CommDataTable(menuDao.selectLeftMenu(params));
        Params outParams = ParamsFactory.createOutParams((Params)new CommParams());
        outParams.setDataTable(Contraints.DATA_TABLE, dt);
        LinkedParams lkp = new LinkedParams(outParams,"MENU_PARENT_SEQ","MENU_SEQ","MENU_ORDER");
        return lkp;
    }


    /**
     * @Program : 메뉴관리 신규 팝업
     * */
    @GetMapping("/newPop")
    public String menuNewPopPgMove() {
        return "sys/sysMenuNewPop";
    }


    /**
     * @Program : 메뉴관리
     * @Desc : 메뉴상세 조회
     * */
//    @GetMapping("/api/sys/menu/{id}")
//    public @ResponseBody MenuResDto select(@PathVariable String id){
//        Menu entity = menuDao.select(id);
//        return new MenuResDto(entity);
//    }

    /**
     * @Program : 메뉴관리
     * @Desc : 메뉴 저장
     * */
    //메뉴 저장
    @RequestMapping("/saveMenu")
    public Params save(Params params){
        menuService.save(params);

        Params outParams = new CommParams();
        outParams.setStsCd(200);
        return outParams;
    }

    /**
     * @Program : 메뉴관리
     * @Desc : 메뉴 삭제
     * */
    @RequestMapping("/deleteMenu")
    public Params delete(Params params){
        menuService.delete(params);

        Params outParams = new CommParams();
        outParams.setStsCd(200);
        return outParams;
    }


}
