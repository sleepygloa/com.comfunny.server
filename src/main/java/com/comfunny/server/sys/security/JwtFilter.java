package com.comfunny.server.sys.security;

import com.comfunny.server.proj.sys.repository.UserRepository;
import com.comfunny.server.sys.security.controller.dto.UserAuthentication;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JwtFilter extends GenericFilterBean {
    public static final String ACCESS_TOKEN_HEADER = "access_token";
    public static final String REFRESH_TOKEN_HEADER = "refresh_token";

    private JwtTokenProvider jwtTokenProvider;
    private UserRepository userRepository;

    public JwtFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        log.debug("[DEVLOG] ##### doFilter start #####");
        try{
            HttpServletRequest httpServletRequest = (HttpServletRequest) request;

            //request에서 토큰 값을 가져온다.
            String jwt = (resolveToken(httpServletRequest) == null? null : resolveToken(httpServletRequest).get("accessToken"));
            String requestURI = httpServletRequest.getRequestURI();

            if (StringUtils.hasText(jwt) && jwtTokenProvider.isAccessTokenValid(jwt)) {
                String userId = jwtTokenProvider.getAuthentication(jwt); //jwt에서 사용자 id를 꺼낸다.
                log.debug("[DEVLOG] ##### doFilter String userId = jwtTokenProvider.getAuthentication(jwt) {} #####", userId);

                UserAuthentication authentication = new UserAuthentication(userId, null, null); //id를 인증한다.
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest)); //기본적으로 제공한 details 세팅

                //세션에서 계속 사용하기 위해 securityContext에 Authentication 등록
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("[DEVLOG] Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);

                request.setAttribute("s_userId", userId);
            }
        }catch(Exception ex){
            log.error("[DEVLOG] Could not set user authentication in security context", ex);
        }

        log.debug("[DEVLOG] ##### doFilter end #####");
        chain.doFilter(request, response);
    }

    public static Map<String, String> resolveToken(HttpServletRequest request) {
        Map<String, String> map = new HashMap<String, String>();
        if(request.getCookies() != null){
            for(Cookie cookie : request.getCookies()){
                if(cookie.getName().equals(ACCESS_TOKEN_HEADER)){
                    log.debug("[DEVLOG] ##### doFilter resolveToken bearerToken {} #####", cookie.getValue());
                    String bearerToken = cookie.getValue();
                    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
                        map.put("accessToken", bearerToken.substring(7));
                        return map;
                    }
                    if (StringUtils.hasText(cookie.getValue())) {
                        map.put("accessToken", cookie.getValue());
                        return map;
                    }
                }
            }
        }
        return null;
    }
}