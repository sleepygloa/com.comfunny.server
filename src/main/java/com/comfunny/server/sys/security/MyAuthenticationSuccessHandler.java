package com.comfunny.server.sys.security;

import com.comfunny.server.sys.config.Contraints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    public MyAuthenticationSuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        AuthenticationSuccessHandler.super.onAuthenticationSuccess(request, response, chain, authentication);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        System.out.println("oAuth2User = " + oAuth2User);
        System.out.println("oAuth2User = " + oAuth2User.getName());
        System.out.println("oAuth2User = " + oAuth2User.getAttribute("email"));


        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(oAuth2User.getAttribute("name") , oAuth2User.getAttribute("sub"));
        Map mapAccessToken = jwtTokenProvider.createAccessToken(authenticationToken);
        Map mapRefreshToken = jwtTokenProvider.createRefreshToken(authenticationToken);
        httpServletResponse.addCookie(new Cookie("accessToken", (String)mapAccessToken.get(Contraints.ACCESS_TOKEN)));
        httpServletResponse.addCookie(new Cookie("refreshToken", (String)mapRefreshToken.get(Contraints.REFRESH_TOKEN)));
//        httpServletResponse.sendRedirect(UriComponentsBuilder.fromUriString("http://localhost:3000")
//                .build()
//                .encode(StandardCharsets.UTF_8).toUriString());
        httpServletResponse.sendRedirect(UriComponentsBuilder.fromUriString("http://sleepygloa.github.io")
                .build()
                .encode(StandardCharsets.UTF_8).toUriString());
    }
}
