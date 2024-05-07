package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Client;
import com.comfunny.server.proj.sd.domain.ClientPk;
import com.comfunny.server.proj.sd.repository.ClientRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class ClientService {

    @Resource
    ClientRepository clientRepository;

    /**
     * 고객사 저장
     * */
    public void saveClient(Map map) throws Exception{
        if(ObjectUtils.isEmpty(map.get("bizCd"))){
            throw new IllegalArgumentException("사업자코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("clientCd"))){
            throw new IllegalArgumentException("고객사코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("clientNm"))){
            throw new IllegalArgumentException("고객사명 는 필수 입력입니다.");
        }

        ClientPk clientPk = new ClientPk();
        clientPk.setBizCd((String)map.get("bizCd"));
        clientPk.setClientCd((String)map.get("clientCd"));

        Client client = new Client();
        client.setClientPk(clientPk);
        client.setClientNm((String)map.get("clientNm"));
        client.setBizNo((String)map.get("bizNo"));
        client.setBizNm((String)map.get("bizNm"));
        client.setCeoNm((String)map.get("ceoNm"));
        client.setPostNo((String)map.get("postNo"));
        client.setBasicAddr((String)map.get("basicAddr"));
        client.setDetailAddr((String)map.get("detailAddr"));
        client.setBizTp((String)map.get("bizTp"));
        client.setBizKnd((String)map.get("bizKnd"));
        client.setTelNo((String)map.get("telNo"));
        client.setFaxNo((String)map.get("faxNo"));
        client.setCountryCd((String)map.get("countryCd"));
        client.setCityCd((String)map.get("cityCd"));
        client.setContactNm((String)map.get("contactNm"));
        client.setContactTelNo((String)map.get("contactTelNo"));
        client.setContactEmail((String)map.get("contactEmail"));
        client.setUserCol1((String)map.get("userCol1"));
        client.setUserCol2((String)map.get("userCol2"));
        client.setUserCol3((String)map.get("userCol3"));
        client.setUserCol4((String)map.get("userCol4"));
        client.setUserCol5((String)map.get("userCol5"));
        client.setRemark((String)map.get("remark"));
        client.setUseYn((String)map.get("useYn"));
        client.setInUserId((String)map.get("s_userId"));
        client.setUpUserId((String)map.get("s_userId"));

//            if("INSERT".equals((String)map.get("modFlag"))){
//                clientRepository.findById(clientPk).ifPresent( a -> { throw new IllegalArgumentException("이미 등록되어있습니다. "); });
//
//                clientRepository.save(client);
//            }else if("UPDATE".equals((String)map.get("modFlag"))){
//                clientRepository.save(client);
//            }
        clientRepository.save(client);
    }
    /**
     * 고객사 삭제
     * */
    public void deleteClient(Map map) throws Exception{

            ClientPk clientPk = new ClientPk();
            clientPk.setBizCd((String)map.get("bizCd"));
            clientPk.setClientCd((String)map.get("clientCd"));

            Client client = clientRepository.findById(clientPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+clientPk.getClientCd()));
            clientRepository.delete(client);
    }
}
