package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.*;
import com.comfunny.server.proj.sys.repository.DomainRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class DomainService extends CommonService {

    @Resource
    DomainRepository domainRepository;
    //코드그룹 저장
    public void saveDomain(Params params) throws Exception{
        for(DataRow dr : params.getDataTable("dt_data")) {
            DomainPk domainPk = new DomainPk();
            domainPk.setBizCd(params.getString("s_bizCd"));
            domainPk.setDomainId(dr.getString("domainId"));

            String koNm = dr.getString("koNm");
            String enNm = dr.getString("enNm");
            String viNm = dr.getString("viNm");

            Domain domain = new Domain();
            domain.setUseYn("Y");
            domain.setDelYn("N");
            domain.setDomainDesc(dr.getString("domainDesc"));
            domain.setDomainSimpNm("");

            //KO
            domainPk.setLangCd("ko");
            domain.setDomainNm(koNm);
            domain.setDomainPk(domainPk);
            domainRepository.save(domain);

            //EN
            domainPk.setLangCd("en");
            domain.setDomainNm(enNm);
            domain.setDomainPk(domainPk);
            domainRepository.save(domain);

            //VI
            domainPk.setLangCd("vi");
            domain.setDomainNm(viNm);
            domain.setDomainPk(domainPk);
            domainRepository.save(domain);
        }
    }
}
