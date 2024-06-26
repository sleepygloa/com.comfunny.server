package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.repository.CommonDao;
import com.comfunny.server.proj.sys.repository.UserCnnLogRepository;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.util.Map;
import java.util.Optional;

@Slf4j
public class CommonService {
    @Resource
    protected UserCnnLogRepository userCnnLogRepository;

    @Resource
    private CommonDao commonDao;

    //각 코드들 채번
    public String getMaxSeq(String flag, Map map) {
        if(Contraints.ITEM_CD.equals(flag)){
            //상품코드 채번
            String optMaxCd = commonDao.findMaxItemCd(Contraints.BIZ_CD, (String) map.get("clientCd"));
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
            }

            //상품코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = StringUtils.leftPad(String.valueOf(iCd), 10, "0");
            return cd;
        }

        if(Contraints.SUPPLIER_CD.equals(flag)){
            //코드 채번
            String optMaxCd = commonDao.findMaxSupplierCd(Contraints.BIZ_CD, (String) map.get("clientCd"));
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
                //코드 앞글자 2자리 자른 나머지 구하기
                maxCd = maxCd.substring(2);
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = "SP"+StringUtils.leftPad(String.valueOf(iCd), 5, "0");
            return cd;
        }
        if(Contraints.STORE_CD.equals(flag)){
            //코드 채번
            String optMaxCd = commonDao.findMaxStoreCd(Contraints.BIZ_CD, (String) map.get("clientCd"));
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
                //코드 앞글자 2자리 자른 나머지 구하기
                maxCd = maxCd.substring(2);
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = "ST"+StringUtils.leftPad(String.valueOf(iCd), 5, "0");
            return cd;
        }
        if(Contraints.DC_CD.equals(flag)){
            //코드 채번
            String optMaxCd = commonDao.findMaxDcCd(Contraints.BIZ_CD);
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
                //코드 앞글자 2자리 자른 나머지 구하기
                maxCd = maxCd.substring(2);
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = "DC"+StringUtils.leftPad(String.valueOf(iCd), 3, "0");
            return cd;
        }
        if(Contraints.CLIENT_CD.equals(flag)){
            //코드 채번
            String optMaxCd = commonDao.findMaxClientCd(Contraints.BIZ_CD);
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
                //코드 앞글자 2자리 자른 나머지 구하기
                maxCd = maxCd.substring(2);
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = "CL"+StringUtils.leftPad(String.valueOf(iCd), 3, "0");
            return cd;
        }
        return "";
    }



}
