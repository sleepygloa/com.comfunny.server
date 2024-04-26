package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.Scheduler;
import com.comfunny.server.proj.sys.domain.SchedulerPk;
import com.comfunny.server.proj.sys.repository.SchedulerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class SchedulerService extends CommonService {

    //스케쥴러 레파지토리
    @Resource
    SchedulerRepository schedulerRepository;

    //스케쥴러 저장
    public void saveScheduler(Map map) throws Exception{
        SchedulerPk schedulerPk = new SchedulerPk();
        schedulerPk.setBizCd((String)map.get("bizCd"));
        schedulerPk.setScheSeq((String)map.get("scheSeq"));

        Scheduler scheduler = new Scheduler();
        scheduler.setScheNm((String)map.get("scheNm"));
        scheduler.setScheDesc((String)map.get("scheDesc"));
        scheduler.setScheClassPath((String)map.get("scheCalssPath"));
        scheduler.setScheSec((String)map.get("scheSec"));
        scheduler.setScheMin((String)map.get("scheMin"));
        scheduler.setScheHour((String)map.get("scheHour"));
        scheduler.setScheDay((String)map.get("scheDay"));
        scheduler.setScheMonth((String)map.get("scheMonth"));
        scheduler.setScheYear((String)map.get("scheYear"));
        scheduler.setUseYn((String)map.get("useYn"));

        schedulerRepository.save(scheduler);
    }


    //스케쥴러 삭제
    public void deleteScheduler(Map map) throws Exception{
        SchedulerPk schedulerPk = new SchedulerPk();
        schedulerPk.setBizCd((String)map.get("bizCd"));
        schedulerPk.setScheSeq((String)map.get("scheSeq"));

        Scheduler scheduler = schedulerRepository.findById(schedulerPk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. codeCd={"+(String)map.get("bizCd")+"}, schedulerNm={"+(String)map.get("scheNm")+"}"));
        schedulerRepository.delete(scheduler);
    }
}
