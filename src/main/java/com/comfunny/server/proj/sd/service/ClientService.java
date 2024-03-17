package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Client;
import com.comfunny.server.proj.sd.domain.ClientPk;
import com.comfunny.server.proj.sd.repository.ClientRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class ClientService {

    @Resource
    ClientRepository clientRepository;



    /**
     * 고객사 저장
     * */
    public void saveClient(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            ClientPk clientPk = new ClientPk();
            clientPk.setBizCd(params.getString("s_bizCd"));
            clientPk.setClientCd(dr.getString("clientCd"));

            Client client = new Client();
            client.setClientPk(clientPk);
            client.setClientNm(dr.getString("clientNm"));
            client.setBizNo(dr.getString("bizNo"));
            client.setBizNm(dr.getString("bizNm"));
            client.setCeoNm(dr.getString("ceoNm"));
            client.setPostNo(dr.getString("postNo"));
            client.setBasicAddr(dr.getString("basicAddr"));
            client.setDetailAddr(dr.getString("detailAddr"));
            client.setBizTp(dr.getString("bizTp"));
            client.setBizKnd(dr.getString("bizKnd"));
            client.setTelNo(dr.getString("telNo"));
            client.setFaxNo(dr.getString("faxNo"));
            client.setCountryCd(dr.getString("countryCd"));
            client.setCityCd(dr.getString("cityCd"));
            client.setContactNm(dr.getString("contactNm"));
            client.setContactTelNo(dr.getString("contactTelNo"));
            client.setContactEmail(dr.getString("contactEmail"));
            client.setUserCol1(dr.getString("userCol1"));
            client.setUserCol2(dr.getString("userCol2"));
            client.setUserCol3(dr.getString("userCol3"));
            client.setUserCol4(dr.getString("userCol4"));
            client.setUserCol5(dr.getString("userCol5"));
            client.setRemark(dr.getString("remark"));
            client.setUseYn(dr.getString("useYn"));
            client.setInUserId(dr.getString("s_userId"));
            client.setUpUserId(dr.getString("s_userId"));

            if("INSERT".equals(dr.getString("modFlag"))){
                clientRepository.findById(clientPk).ifPresent( a -> { throw new IllegalArgumentException("이미 등록되어있습니다. "); });

                clientRepository.save(client);
            }else if("UPDATE".equals(dr.getString("modFlag"))){
                clientRepository.save(client);
            }
        }
    }
    /**
     * 고객사 삭제
     * */
    public void deleteClient(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            ClientPk clientPk = new ClientPk();
            clientPk.setBizCd(dr.getString("bizCd"));
            clientPk.setClientCd(dr.getString("clientCd"));

            Client client = clientRepository.findById(clientPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+clientPk.getClientCd()));
            clientRepository.delete(client);
        }
    }
}
