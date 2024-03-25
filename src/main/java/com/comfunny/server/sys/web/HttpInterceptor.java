package com.comfunny.server.sys.web;

import com.comfunny.server.proj.sys.repository.UserTokenRepository;
import com.comfunny.server.sys.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Slf4j
public class HttpInterceptor implements HandlerInterceptor {


    @Autowired
    private UserTokenRepository userTokenRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        log.debug("================================ [preHandle] ================================");
        return true;
//        final String header = request.getHeader(Contraints.AUTH_HEADER);
//
//        //헤더가 비어있으면.
//        if (header == null) {
//            return false;
//        }
//
//        //헤더에서 토큰 빼내기
//        String reqAccessToken = request.getHeader("access_token");
//        String reqRefreshToken = request.getHeader("refresh_token");
//
//        final String accessToken = JwtTokenProvider.getTokenFromHeader(reqAccessToken);
//        final String refreshToken = JwtTokenProvider.getTokenFromHeader(reqRefreshToken);
//
//
//
//        //Refresh Token 유효한지 확인
//        if(JwtTokenProvider.isRefreshTokenValid(refreshToken)) {
//            log.debug("##### !JwtTokenProvider.isRefreshTokenValid(refreshToken) #####");
//            //Access Token 유효한지 확인
//            if (JwtTokenProvider.isAccessTokenValid(accessToken)) {
//                log.debug("##### !JwtTokenProvider.isAccessTokenValid(accessToken) #####");
//                return true;
//            }
//            //DB 에 저장된 refreshToken 과 비교
//            String bizCd = StringUtils.isNullToString(request.getAttribute("bizCd"));
//            String userId = StringUtils.isNullToString(request.getAttribute("userId"));
//            Optional<UserToken> userTokenObj =  userTokenRepository.findByUserPk(new UserPk(bizCd, userId));
//            UserToken userToken = userTokenObj.get();
//            //refresh Token 이 유효하다면, accessToken 재발행.
//            if((userToken.getRefreshToken()).matches(refreshToken)){
//                return true;
//            }
//        }
//        log.debug("====[preHandle] [TokenProvider.validateToken(token)] false");
//        response.sendRedirect(Contraints.CLIENT_URL + "/");
//        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.debug("================================ [postHandle] ================================");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception ex) throws Exception {
        log.debug("================================ [afterCompletion] ================================");
    }
}