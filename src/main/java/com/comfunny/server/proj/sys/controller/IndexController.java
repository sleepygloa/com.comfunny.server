package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.domain.UserPk;
import com.comfunny.server.proj.sys.repository.UserRepository;
import com.comfunny.server.proj.sys.domain.UserToken;
import com.comfunny.server.proj.sys.repository.UserTokenRepository;
import com.comfunny.server.sys.config.Contraints;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@Slf4j
@RequestMapping
public class IndexController {

    @Resource
    private UserTokenRepository userTokenRepository;

    @Resource
    private UserRepository userRepository;

    /**
     * [기능 설명] 인덱스페이지
     * @Author Kim Seon Ho
     * @Date 2022. 12. 11.
     */
//    @GetMapping("/")
//    public String index (
//                         HttpServletRequest request,
//                         HttpServletResponse response
//                         ) throws IOException {
//
//        //헤더에서 토큰 빼내기
//        Cookie[] cookies = request.getCookies();
//        if(cookies == null){
//            return "login/login";
//        }
//        String reqAccessToken = "";
//        String reqRefreshToken = "";
//        for(Cookie cookie : cookies){
//            if(cookie.getName().equals(Contraints.ACCESS_TOKEN)){
//                reqAccessToken = cookie.getValue();
//            }
//            if(cookie.getName().equals(Contraints.REFRESH_TOKEN)){
//                reqRefreshToken = cookie.getValue();
//            }
//        }
//
//        //1. access_token & refresh_token 둘다 없을때.
//        if(reqRefreshToken == null || reqRefreshToken.equals("") || reqAccessToken == null || reqAccessToken.equals("")){
//            response.setHeader(Contraints.ACCESS_TOKEN, "");
//            response.setHeader(Contraints.REFRESH_TOKEN, "");
//            return "login/login";
//        }
//
//        //세션이 없다면 다시 세팅
//        return "main/main";
//    }

    /**
     * [기능 설명] 메인컨텐츠 페이지 이동
     * @Author Kim Seon Ho
     * @Date 2022. 12. 11.
     */
    @GetMapping("/api/sys/index/toMainContents")
    public String toMainContents() {
        log.debug("toMainContents ");
        return "main/mainContent";
    }
    @RequestMapping("/api/sys/index/selectSysData")
    public @ResponseBody Map selectSysData(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        Map map = new HashMap<>();


        String refreshTokens = request.getHeader("refresh_token");
        if(refreshTokens.equals("")) throw new Exception("데이터가 정상적으로 호출되지 않았습니다.");

        String refreshtoken = refreshTokens.split(Contraints.TOKEN_TYPE)[1];

        log.debug("[DEVLOG] ##### selectSysData refreshToken check ##### {}",refreshtoken);
        Optional<UserToken> optUserToken = userTokenRepository.findByRefreshToken(refreshtoken);
        if(!optUserToken.isPresent()) throw new Exception("데이터가 정상적으로 호출되지 않았습니다.");
        UserToken userToken = optUserToken.get();
        String userId = userToken.getUserPk().getUserId();

        Optional<User> optUser = userRepository.findByUserPk(new UserPk(userId));
        if(!optUser.isPresent()) throw new Exception("데이터가 정상적으로 호출되지 않았습니다.");
        User user = optUser.get();
        String bizCd = user.getBizCd();

        //세션
        session.setAttribute("sBizCd", bizCd);
        session.setAttribute("sUserId", userId);

        //리턴 데이터
        map.put("sBizCd", bizCd);
        map.put("sUserId", userId);
        return map;
    }

}
