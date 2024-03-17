package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.UserDc;
import com.comfunny.server.proj.sys.domain.UserDcPk;
import com.comfunny.server.proj.sys.repository.UserDcRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class UserDcService extends CommonService {

    @Resource
    UserDcRepository userDcRepository;

    //사용자물류센터 저장
    public void saveUserDc(Params params){
        for(DataRow dr : params.getDataTable("dt_data")) {
            UserDcPk userDcPk = new UserDcPk();
            userDcPk.setBizCd(params.getString("s_bizCd"));
            userDcPk.setDcCd(dr.getString("dcCd"));
            userDcPk.setUserId(dr.getString("userId"));

            UserDc userDc = new UserDc();
            userDc.setUserDcPk(userDcPk);
            userDc.setOrdr(dr.getInteger("ordr"));
            userDc.setUseYn(dr.getString("useYn"));
            userDc.setRmrk(dr.getString("rmrk"));

            if("INSERT".equals(dr.getString("modFlag"))){
                if(userDcRepository.findById(userDcPk).isPresent()){
                    throw new IllegalArgumentException("이미 등록되었습니다. userId={"+dr.getString("userId")+"}, dcCd={"+dr.getString("dcCd")+"}");
                }else{
                    userDcRepository.save(userDc);
                }
            }else if("UPDATE".equals(dr.getString("modFlag"))){
                userDcRepository.save(userDc);
            }
        }
    }


    //사용자물류센터 삭제
    public void deleteUserDc(Params params){
        for(DataRow dr : params.getDataTable("dt_data")) {
            UserDcPk userDcPk = new UserDcPk();
            userDcPk.setBizCd(params.getString("s_bizCd"));
            userDcPk.setDcCd(dr.getString("dcCd"));
            userDcPk.setUserId(dr.getString("userId"));

            UserDc userDc = userDcRepository.findById(userDcPk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. codeCd={"+dr.getString("bizCd")+"}, userId={"+dr.getString("userId")+"}"));
            userDcRepository.delete(userDc);
        }
    }
}
