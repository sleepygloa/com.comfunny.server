package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sd.repository.AreaDao;
import com.comfunny.server.proj.sys.repository.CodeDao;
import com.comfunny.server.proj.sys.repository.CommonDao;
import com.comfunny.server.proj.sys.repository.UserCnnLogRepository;
import com.comfunny.server.proj.sys.service.CodeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

@Controller
@RequestMapping("/wms/sys/common")
public class CommonController {

    @Autowired
    private CodeService codeService;

    @Resource
    private CodeDao codeDao;

    @Resource
    private UserCnnLogRepository userCnnLogRepository;

    @Resource
    private CommonDao commonDao;


    /**
     * [공통] 전역변수 공통코드 조회
     * */
    @RequestMapping("/selectCodeByGroupCodeAllList")
    public ResponseEntity selectCodeByGroupCodeAllList() {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(commonDao.selectCodeByGroupCodeAllList());
        return ResponseEntity.ok().body(list);
    }
//
//    /**
//     * [기능 설명] 공통컨트롤러 세션데이터 조회
//     * @Author Kim Seon Ho
//     * @Date 2022. 12. 11.
//     * @Desc : 세션데이터 조회
//     */
//    @RequestMapping("/api/sys/comm/getSession")
//    public Params getSession(Params params) throws Exception {
//        return params;
//    }
//
//
//
//    /**
//     * [기능 설명] 공통컨트롤러 서버에로그저장
//     * @Author Kim Seon Ho
//     * @Date 2022. 12. 11.
//     * @Desc : 서버에로그저장
//     */
//    @PostMapping("/api/sys/comm/log")
//    public Map log(@RequestParam Map map)throws Exception {
//        log.debug("Mobile log : "+map);
//        return map;
//    }
//    /**
//     * [기능 설명] 공통컨트롤러 공통알림창 세팅
//     * @Author Kim Seon Ho
//     * @Date 2022. 12. 11.
//     * @Desc : 공통알림창 세팅
//     */
////    @RequestMapping("/alert")
////    public Params alert(Params inParams)throws Exception {
////
////        Params outParams = ParamsFactory.createOutParams(inParams);
////
////        String addMsg = null;
////        addMsg = inParams.getString("addMsg");
////        String codeGroupCd = null;
////        codeGroupCd = inParams.getString("codeGroupCd");
////        /*변수 2개 일때 예) FR ~ TO */
//////	    String addMsg2 = null;
//////	    addMsg2 = inParams.getString("addMsg2");
//////
//////        if(addMsg2 != null){
//////            try{
//////                outParams.setMsgLangCd(inParams.getString("s_language"), inParams.getMsgCd(), new Object[]{addMsg}, new Object[]{addMsg2});
//////            }catch (Exception e){
//////                outParams.setStsCd(200);
//////            }
//////        }else
////        if(codeGroupCd != null){
////            try{
////                Params param = codeService.getCommCodeName(inParams);
////                DataRow row = (DataRow)param.getDataTable("dt_grid").get(0);
////                String commCodeName = (String)row.get("NAME");
////                outParams.setMsgLangCd(inParams.getString("s_language"), inParams.getMsgCd(), new String[]{commCodeName});
////            }catch (Exception e){
////                outParams.setStsCd(200);
////            }
////        }else if(addMsg != null){
////            try{
////                outParams.setMsgLangCd(inParams.getString("s_language"), inParams.getMsgCd(), new String[]{addMsg});
////            }catch (Exception e){
////                outParams.setStsCd(200);
////            }
////        }else{
////            try {
////                outParams.setMsgLangCd(inParams.getString("s_language"), inParams.getMsgCd());
////            } catch (Exception e) {
////                outParams.setStsCd(200);
////            }
////        }
////        return outParams;
////    }
}
