package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.UserClient;
import com.comfunny.server.proj.sys.domain.UserClientPk;
import com.comfunny.server.proj.sys.repository.UserClientRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class UserClientService extends CommonService {

    @Resource
    UserClientRepository userClientRepository;

    //사용자고객사 저장
    public void saveUserClient(Params params){
        for(DataRow dr : params.getDataTable("dt_data")) {
            UserClientPk userClientPk = new UserClientPk();
            userClientPk.setBizCd(params.getString("s_bizCd"));
            userClientPk.setClientCd(dr.getString("clientCd"));
            userClientPk.setUserId(dr.getString("userId"));

            UserClient userClient = new UserClient();
            userClient.setUserClientPk(userClientPk);
            userClient.setOrdr(dr.getInteger("ordr"));
            userClient.setUseYn(dr.getString("useYn"));
            userClient.setRmrk(dr.getString("rmrk"));

            if("INSERT".equals(dr.getString("modFlag"))){
                if(userClientRepository.findById(userClientPk).isPresent()){
                    throw new IllegalArgumentException("이미 등록되었습니다. userId={"+dr.getString("userId")+"}, dcCd={"+dr.getString("dcCd")+"}");
                }else{
                    userClientRepository.save(userClient);
                }
            }else if("UPDATE".equals(dr.getString("modFlag"))){
                userClientRepository.save(userClient);
            }
        }
    }


    //사용자고객사 삭제
    public void deleteUserClient(Params params){
        for(DataRow dr : params.getDataTable("dt_data")) {
            UserClientPk userClientPk = new UserClientPk();
            userClientPk.setBizCd(params.getString("s_bizCd"));
            userClientPk.setClientCd(dr.getString("dcCd"));
            userClientPk.setUserId(dr.getString("userId"));

            UserClient userClient = userClientRepository.findById(userClientPk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. codeCd={"+dr.getString("bizCd")+"}, userId={"+dr.getString("userId")+"}"));
            userClientRepository.delete(userClient);
        }
    }
}
