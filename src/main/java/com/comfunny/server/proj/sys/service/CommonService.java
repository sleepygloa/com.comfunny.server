package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.repository.CommonDao;
import com.comfunny.server.proj.sys.repository.UserCnnLogRepository;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;

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
        if(Contraints.IB_NO.equals(flag)){
            if(ObjectUtils.isEmpty(map.get("ibPlanYmd"))){
                throw new IllegalArgumentException("입고예정일자는 필수 입력입니다.");
            }
            String ibPlanYmd = (String) map.get("ibPlanYmd");


            //코드 채번
            String optMaxCd = commonDao.findMaxIbNo(Contraints.BIZ_CD, ibPlanYmd);
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
                //코드 앞글자 2자리 자른 나머지 구하기
                maxCd = maxCd.substring(2);
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = "IB" + ibPlanYmd + StringUtils.leftPad(String.valueOf(iCd), 4, "0");
            return cd;
        }
        if(Contraints.IB_DETAIL_SEQ.equals(flag)){
            if(ObjectUtils.isEmpty(map.get("ibNo"))){
                throw new IllegalArgumentException("입고번호 는 필수 입력입니다.");
            }
            String ibNo = (String) map.get("ibNo");

            //코드 채번
            String optMaxCd = commonDao.findMaxIbDetailSeq(Contraints.BIZ_CD, ibNo);
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = String.valueOf(iCd);
            return cd;
        }

        if(Contraints.STOCK_NO.equals(flag)){
            if(ObjectUtils.isEmpty(map.get("ibPlanYmd"))){
                throw new IllegalArgumentException("입고예정일자는 필수 입력입니다.");
            }
            String ibPlanYmd = (String) map.get("ibPlanYmd");


            //코드 채번
            String optMaxCd = commonDao.findMaxStockNo(Contraints.BIZ_CD, ibPlanYmd);
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
                //코드 앞글자 2자리 자른 나머지 구하기
                maxCd = maxCd.substring(2);
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = "SC" + ibPlanYmd + StringUtils.leftPad(String.valueOf(iCd), 4, "0");
            return cd;
        }
        if(Contraints.LOT_ID.equals(flag)){
            if(ObjectUtils.isEmpty(map.get("itemCd"))){
                throw new IllegalArgumentException("상품코드는 필수 입력입니다.");
            }
            if(ObjectUtils.isEmpty(map.get("ibNo"))){
                throw new IllegalArgumentException("입고번호는 필수 입력입니다.");
            }
            if(ObjectUtils.isEmpty(map.get("ibPlanYmd"))){
                throw new IllegalArgumentException("입고예정일자는 필수 입력입니다.");
            }
            String dcCd = (String) map.get("dcCd");
            String clientCd = (String) map.get("clientCd");
            String itemCd = (String) map.get("itemCd");
            String ibNo = (String) map.get("ibNo");
            String ibPlanYmd = (String) map.get("ibPlanYmd");


            //코드 채번
            String optMaxCd = commonDao.findMaxLotId(Contraints.BIZ_CD, dcCd, clientCd, itemCd, ibNo, ibPlanYmd);
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
                //코드 앞글자 2자리 자른 나머지 구하기
                maxCd = maxCd.substring(2);
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = "LO" + ibPlanYmd + StringUtils.leftPad(String.valueOf(iCd), 4, "0");
            return cd;
        }
        if(Contraints.INOUT_HIST_NO.equals(flag)){
            if(ObjectUtils.isEmpty(map.get("ibPlanYmd"))){
                throw new IllegalArgumentException("입고예정일자는 필수 입력입니다.");
            }
            String ibPlanYmd = (String) map.get("ibPlanYmd");


            //코드 채번
            String optMaxCd = commonDao.findMaxInoutHistNo(Contraints.BIZ_CD, ibPlanYmd);
            String maxCd = "0";
            if(optMaxCd != null && !"".equals(optMaxCd)){
                maxCd = optMaxCd;
                //코드 앞글자 2자리 자른 나머지 구하기
                maxCd = maxCd.substring(2);
            }

            //코드는 10자리
            int iCd = StringUtils.safeToInt(maxCd, 0) + 1;
            String cd = "IO" + ibPlanYmd + StringUtils.leftPad(String.valueOf(iCd), 4, "0");
            return cd;
        }
        return "";
    }



}
