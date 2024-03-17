package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.*;
import com.comfunny.server.proj.sys.repository.*;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service
@Slf4j
public class CodeService extends CommonService {

    @Resource
    CodeRepository codeRepository;
    @Resource
    CodeGrpRepository codeGrpRepository;
    @Resource
    CodeDao codeDao;

    public List<Map> getCodeListForSelectBox(Params params) {
        return codeDao.getCodeListForSelectBox(params);
    }

    public List<Map> getCodeDescListForSelectBox(Params params) {
        return codeDao.getCodeDescListForSelectBox(params);
    }


    //코드그룹 저장
    public void saveCodeGrp(Params params) throws Exception{
        for(DataRow dr : params.getDataTable("dt_data")) {
            CodeGrpPk codeGrpPk = new CodeGrpPk();
            codeGrpPk.setBizCd(params.getString("s_bizCd"));
            codeGrpPk.setCodeGrpCd(dr.getString("codeGrpCd"));

            CodeGrp codeGrp = new CodeGrp();
            codeGrp.setCodeGrpPk(codeGrpPk);
            codeGrp.setCodeGrpNm(dr.getString("codeGrpNm"));
            codeGrp.setCodeGrpDesc(dr.getString("codeGrpDesc"));
            codeGrp.setCodeGrpTp(dr.getString("codeGrpTp"));
            codeGrp.setUseYn(dr.getString("useYn"));
//            codeGrp.setDelYn(dr.getString("delYn"));

            codeGrpRepository.save(codeGrp);
        }
    }

    //코드그룹 삭제
    public void deleteCodeGrp(Params params) throws Exception{
        for(DataRow dr : params.getDataTable("dt_data")){
            CodeGrpPk codeGrpPk = new CodeGrpPk(params.getString("s_bizCd"), dr.getString("codeGrpCd"));
            CodeGrp selDto = codeGrpRepository.findById(codeGrpPk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. codeGrpCd={"+params.getString("codeGrpCd")+"}"));

            Optional<Code> codeList = codeRepository.findAllByCodePkBizCdAndCodePkCodeGrpCd(params.getString("s_bizCd"), dr.getString("codeGrpCd"));
            if(codeList.isPresent()){
                new IllegalArgumentException("코드 데이터가 존재하여 삭제 할 수 없습니다.");
            }

            codeGrpRepository.delete(selDto);
        }
    }

    //코드그룹 저장
    public void saveCode(Params params) throws Exception{
        for(DataRow dr : params.getDataTable("dt_data")) {
            CodePk codePk = new CodePk();
            codePk.setBizCd(dr.getString("s_bizCd"));
            codePk.setCodeGrpCd(dr.getString("codeGrpCd"));
            codePk.setCodeCd(dr.getString("codeCd"));

            Code code = new Code();
            code.setCodePk(codePk);
            code.setCodeNm(dr.getString("codeNm"));
            code.setCodeDesc(dr.getString("codeDesc"));
            code.setCodeOrder(dr.getString("codeOrder"));
            code.setCodeOther1(dr.getString("codeOther1"));
            code.setCodeOther2(dr.getString("codeOther2"));
            code.setCodeOther3(dr.getString("codeOther3"));
            code.setCodeOther4(dr.getString("codeOther4"));
            code.setCodeOther5(dr.getString("codeOther5"));
            code.setUseYn(dr.getString("useYn"));
//            code.setDelYn(dr.getString("delYn"));

            codeRepository.save(code);
        }

    }

    //코드그룹 삭제
    public void deleteCode(Params params) throws Exception{
        for(DataRow dr : params.getDataTable("dt_data")){
            CodePk codePk = new CodePk(params.getString("s_bizCd"), dr.getString("codeGrpCd"), dr.getString("codeCd"));
            Code selDto = codeRepository.findById(codePk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. codeCd={"+dr.getString("codeCd")+"}, codeNm={"+dr.getString("codeNm")+"}"));
            codeRepository.delete(selDto);
        }
    }
}
