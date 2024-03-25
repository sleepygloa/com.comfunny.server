package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.Scheduler;
import com.comfunny.server.proj.sys.repository.SchedulerDao;
import com.comfunny.server.proj.sys.service.SchedulerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
@Slf4j
@RequestMapping("/api/sys/scheduler")
public class SchedulerController {

    @Autowired
    private SchedulerService schedulerService;

    @Resource
    private SchedulerDao schedulerDao;

    /**
     * @Program : 스케쥴러 화면이동
     * @Desc :
     * */
    @RequestMapping
    public String sysScheduler(){
        return "/sys/sysScheduler";
    }

//
//
//    /**
//     * @Program : 스케쥴러관리 조회
//     * @Desc : 스케쥴러데이터조회
//     * */
//    @RequestMapping("/selectSchedulerList")
//    public Params selectSchedulerList(Params params){
//        List<Scheduler> list = schedulerDao.selectSchedulerList(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        outParams.setParam("dt_grid", list);
//        return outParams;
//    }
//
//    /**
//     * @Program : 스케쥴러 관리
//     * @Desc : 스케쥴러 저장
//     * */
//    @RequestMapping("/saveScheduler")
//    public Params saveScheduler(Params params) throws Exception{
//        schedulerService.saveScheduler(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//
//    /**
//     * @Program : 스케쥴러 관리
//     * @Desc : 스케쥴러 삭제
//     * */
//    @RequestMapping("/deleteScheduler")
//    public Params deleteScheduler(Params params) throws Exception{
//        schedulerService.deleteScheduler(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//
//
//
//
//
//
//
//    @RequestMapping("/startScheduler")
//    public Params startScheduler(Params inParams) {
////        LOG.debug("startScheduler : "+inParams);
////        Params outParams = schedulerService.getSchedulerInfo(inParams);
////
////        ScheduleJob job =  new ScheduleJob(outParams);
////        jobScheduler.addJob(job);
////
////        int cnt = schedulerService.updateSchedulerUseYn(inParams);
////        if(cnt > 0){
////            outParams.setStsCd(100);
////            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_SUC_001",new Object[]{job.getJobName()});
////        }else{
////            outParams.setStsCd(500);
////            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_ERR_001");
////        }
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//
//    @RequestMapping("/stopScheduler")
//    public Params stopScheduler(Params inParams) {
////        Params outParams = schedulerService.getSchedulerInfo(inParams);
////
////        ScheduleJob job =  new ScheduleJob(outParams);
////        jobScheduler.stopJob(job);
////
////        int cnt = schedulerService.updateSchedulerUseYn(inParams);
////        if(cnt > 0){
////            outParams.setStsCd(100);
////            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_SUC_002",new Object[]{job.getJobName()});
////        }else{
////            outParams.setStsCd(500);
////            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_ERR_001");
////        }
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
}
