package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.repository.SchedulerDao;
import com.comfunny.server.proj.sys.service.SchedulerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;


@Controller
@Slf4j
@RequestMapping("/wms/sys/scheduler")
public class SchedulerController {

    @Autowired
    private SchedulerService schedulerService;

    @Resource
    private SchedulerDao schedulerDao;

    /**
     * @Program : 스케쥴러관리 조회
     * @Desc : 스케쥴러데이터조회
     * */
    @RequestMapping("/selectSchedulerList")
    public ResponseEntity selectSchedulerList(@RequestBody Map map){
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(schedulerDao.selectSchedulerList(map));
        return ResponseEntity.ok().body(list);
    }

    /**
     * @Program : 스케쥴러 관리
     * @Desc : 스케쥴러 저장
     * */
    @RequestMapping("/saveScheduler")
    public ResponseEntity saveScheduler(@RequestBody Map map) throws Exception{
        schedulerService.saveScheduler(map);
        return ResponseEntity.ok().build();
    }

    /**
     * @Program : 스케쥴러 관리
     * @Desc : 스케쥴러 삭제
     * */
    @RequestMapping("/deleteScheduler")
    public ResponseEntity deleteScheduler(@RequestBody Map map) throws Exception{
        schedulerService.deleteScheduler(map);
        return ResponseEntity.ok().build();
    }







    /**
     * @Program : 스케쥴러 관리
     * @Desc : 스케쥴러 시작
     * */
    @RequestMapping("/startScheduler")
    public ResponseEntity startScheduler(@RequestBody Map map) {
//        LOG.debug("startScheduler : "+inParams);
//        Params outParams = schedulerService.getSchedulerInfo(inParams);
//
//        ScheduleJob job =  new ScheduleJob(outParams);
//        jobScheduler.addJob(job);
//
//        int cnt = schedulerService.updateSchedulerUseYn(inParams);
//        if(cnt > 0){
//            outParams.setStsCd(100);
//            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_SUC_001",new Object[]{job.getJobName()});
//        }else{
//            outParams.setStsCd(500);
//            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_ERR_001");
//        }

        return ResponseEntity.ok().build();
    }

    /**
     * @Program : 스케쥴러 관리
     * @Desc : 스케쥴러 중지
     * */
    @RequestMapping("/stopScheduler")
    public ResponseEntity stopScheduler(@RequestBody Map map) {
//        Params outParams = schedulerService.getSchedulerInfo(inParams);
//
//        ScheduleJob job =  new ScheduleJob(outParams);
//        jobScheduler.stopJob(job);
//
//        int cnt = schedulerService.updateSchedulerUseYn(inParams);
//        if(cnt > 0){
//            outParams.setStsCd(100);
//            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_SUC_002",new Object[]{job.getJobName()});
//        }else{
//            outParams.setStsCd(500);
//            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_ERR_001");
//        }

        return ResponseEntity.ok().build();
    }
}
