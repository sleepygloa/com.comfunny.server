package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.Menu;
import com.comfunny.server.proj.sys.domain.MenuPk;
import com.comfunny.server.proj.sys.repository.MenuDao;
import com.comfunny.server.proj.sys.repository.MenuRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
@Slf4j
public class MenuService extends CommonService {

    @Resource
    MenuRepository menuRepository;
    @Resource
    MenuDao menuDao;


    private String MENU_ICON_PREFIC = "/app/icon/";


    //저장
    public void save(Params params){
        for(DataRow dr : params.getDataTable("dt_data")){
            String modFlag = dr.getString("modFlag");

            MenuPk menuPk = new MenuPk();
            menuPk.setBizCd(params.getString("s_bizCd"));

            if("INSERT".equals(modFlag)){
                int menuSeq = menuRepository.findOneMaxMenuSeq() + 1;
                menuPk.setMenuSeq(menuSeq);
            }
            if("UPDATE".equals(modFlag)){
                menuPk.setMenuSeq(dr.getInteger("menuSeq"));
            }
            Menu menu = new Menu();
            menu.setMenuPk(menuPk);
            menu.setMenuNm(dr.getString("menuNm"));
            menu.setMenuEnNm(dr.getString("menuEnNm"));
            menu.setMenuIco(dr.getString("menuIco"));
            menu.setMenuOrder(dr.getString("menuOrder"));
            menu.setMenuParentSeq(dr.getInteger("menuParentSeq"));
            menu.setMenuSimpNm(dr.getString("menuSimpNm"));
            menu.setCallUrl(dr.getString("callUrl"));
            menu.setDomainId(dr.getString("domainId"));
            menu.setFavorYn(dr.getString("favorYn"));
            menu.setPdaUseYn(dr.getString("pdaUseYn"));
            menu.setUseYn(dr.getString("useYn"));

            menuRepository.save(menu);
        }
    }

    //삭제
    public void delete(Params params){

        for(DataRow dr : params.getDataTable("dt_data")){
            String modFlag = dr.getString("modFlag");
            if("DELETE".equals(modFlag)){
                MenuPk menuPk = new MenuPk();
                menuPk.setBizCd(params.getString("s_bizCd"));
                menuPk.setMenuSeq(dr.getInteger("menuSeq"));

                Menu menu = new Menu();
                menu.setMenuPk(menuPk);
                menu.setMenuParentSeq(dr.getInteger("menuSeq"));

                //하위메뉴 존재확인
                List<Menu> list = menuRepository.findAllBizCdAndMenuParentSeq(params.getString("s_bizCd"), dr.getInteger("menuSeq"));
                if(list.size() > 0) new IllegalArgumentException("하위메뉴가 존재하여 삭제할수 없습니다. id="+dr.getString("menuNm"));

                menuRepository.delete(menu);
            }
        }
//        Menu selDto = menuRepository.findById(dto.getMenuCd()).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+dto.getMenuCd()));
//
//        //하위메뉴 존재확인
//        int childCnt = menuRepository.findAllByUpMenuCd(dto.getMenuCd()).size();
//        if(childCnt > 0) new IllegalArgumentException("하위메뉴가 존재하여 삭제할수 없습니다. id="+dto.getMenuCd());
//
//        menuRepository.delete(selDto);
    }

}
