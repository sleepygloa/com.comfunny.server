package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.Scheduler;
import com.comfunny.server.proj.sys.domain.SchedulerPk;
import com.comfunny.server.proj.sys.repository.SchedulerRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class SchedulerService extends CommonService {

    @Resource
    SchedulerRepository schedulerRepository;

    //스케쥴러 저장
    public void saveScheduler(Params params) throws Exception{
        for(DataRow dr : params.getDataTable("dt_data")) {
            SchedulerPk schedulerPk = new SchedulerPk();
            schedulerPk.setBizCd(params.getString("s_bizCd"));
            schedulerPk.setScheSeq(dr.getString("scheSeq"));

            Scheduler scheduler = new Scheduler();
            scheduler.setScheNm(dr.getString("scheNm"));
            scheduler.setScheDesc(dr.getString("scheDesc"));
            scheduler.setScheClassPath(dr.getString("scheCalssPath"));
            scheduler.setScheSec(dr.getString("scheSec"));
            scheduler.setScheMin(dr.getString("scheMin"));
            scheduler.setScheHour(dr.getString("scheHour"));
            scheduler.setScheDay(dr.getString("scheDay"));
            scheduler.setScheMonth(dr.getString("scheMonth"));
            scheduler.setScheYear(dr.getString("scheYear"));
            scheduler.setUseYn(dr.getString("useYn"));

            schedulerRepository.save(scheduler);
        }
    }


    //스케쥴러 삭제
    public void deleteScheduler(Params params) throws Exception{
        for(DataRow dr : params.getDataTable("dt_data")) {
            SchedulerPk schedulerPk = new SchedulerPk();
            schedulerPk.setBizCd(params.getString("s_bizCd"));
            schedulerPk.setScheSeq(dr.getString("scheSeq"));

            Scheduler scheduler = schedulerRepository.findById(schedulerPk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. codeCd={"+dr.getString("bizCd")+"}, schedulerNm={"+dr.getString("scheNm")+"}"));
            schedulerRepository.delete(scheduler);
        }
    }
}
