package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.Code;
import com.comfunny.server.proj.sys.domain.CodeGrp;
import com.comfunny.server.proj.sys.domain.CodeGrpPk;
import com.comfunny.server.proj.sys.domain.CodePk;
import com.comfunny.server.proj.sys.repository.CodeDao;
import com.comfunny.server.proj.sys.repository.CodeGrpRepository;
import com.comfunny.server.proj.sys.repository.CodeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class CodeService extends CommonService {

    @Resource
    CodeRepository codeRepository;
    @Resource
    CodeGrpRepository codeGrpRepository;
    @Resource
    CodeDao codeDao;

    public List<Map> getCodeListForSelectBox(Map map) {
        return codeDao.getCodeListForSelectBox(map);
    }

    public List<Map> getCodeDescListForSelectBox(Map map) {
        return codeDao.getCodeDescListForSelectBox(map);
    }


    //코드그룹 저장
    public void saveCodeGrp(Map map) {

        CodeGrpPk codeGrpPk = new CodeGrpPk();
        codeGrpPk.setBizCd((String)map.get("bizCd"));
        codeGrpPk.setCodeGrpCd((String)map.get("codeGrpCd"));

        CodeGrp codeGrp = new CodeGrp();
        codeGrp.setCodeGrpPk(codeGrpPk);
        codeGrp.setCodeGrpNm((String)map.get("codeGrpNm"));
        codeGrp.setCodeGrpDesc((String)map.get("codeGrpDesc"));
        codeGrp.setCodeGrpTp((String)map.get("codeGrpTp"));
        codeGrp.setUseYn((String)map.get("useYn"));

        codeGrpRepository.save(codeGrp);
    }

    //코드그룹 삭제
    public void deleteCodeGrp(Map map) {
        String bizCd = (String)map.get("bizCd");
        String codeGrpCd = (String)map.get("codeGrpCd");
        CodeGrpPk codeGrpPk = new CodeGrpPk(bizCd, codeGrpCd);
        CodeGrp selDto = codeGrpRepository.findById(codeGrpPk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. codeGrpCd={"+codeGrpCd+"}"));

        //해당 코드그룹에 코드 데이터가 존재하는지 확인
        Optional<Code> codeList = codeRepository.findAllByCodePkBizCdAndCodePkCodeGrpCd(bizCd, codeGrpCd);
        if(codeList.isPresent()){
            new IllegalArgumentException("코드 데이터가 존재하여 삭제 할 수 없습니다.");
        }

        codeGrpRepository.delete(selDto);
    }

    //코드그룹 저장
    public void saveCode(Map map) {
        CodePk codePk = new CodePk();
        codePk.setBizCd((String)map.get("bizCd"));
        codePk.setCodeGrpCd((String)map.get("codeGrpCd"));
        codePk.setCodeCd((String)map.get("codeCd"));

        Code code = new Code();
        code.setCodePk(codePk);
        code.setCodeNm((String)map.get("codeNm"));
        code.setCodeDesc((String)map.get("codeDesc"));
        code.setCodeOrder((String)map.get("codeOrder"));
        code.setCodeOther1((String)map.get("codeOther1"));
        code.setCodeOther2((String)map.get("codeOther2"));
        code.setCodeOther3((String)map.get("codeOther3"));
        code.setCodeOther4((String)map.get("codeOther4"));
        code.setCodeOther5((String)map.get("codeOther5"));
        code.setUseYn((String)map.get("useYn"));

        codeRepository.save(code);
    }

    //코드그룹 삭제
    public void deleteCode(Map map) {
        CodePk codePk = new CodePk((String)map.get("bizCd"), (String)map.get("codeGrpCd"), (String)map.get("codeCd"));
        Code selDto = codeRepository.findById(codePk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. codeCd={"+(String)map.get("codeCd")+"}, codeNm={"+(String)map.get("codeNm")+"}"));
        codeRepository.delete(selDto);
    }
}
