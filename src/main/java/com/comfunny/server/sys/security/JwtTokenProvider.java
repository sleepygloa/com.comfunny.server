package com.comfunny.server.sys.security;


import com.comfunny.server.proj.sys.dto.UserAuthority;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider implements InitializingBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    private static final String ACESSS_TOKEN_KEY = "auth";
    private static final String REFRESH_TOKEN_KEY = "auth";

    private final String acessSecretKey;
    private final String refreshSecretKey;
    private final float accessTokenValidTimeMs;
    private final float refreshTokenValidTimeMs;

    private static Key accessTokenKey;
    private static Key refreshTokenKey;

    public JwtTokenProvider(
            @Value("${jwt.acessSecretKey}") String acessSecretKey,
            @Value("${jwt.refreshSecretKey}") String refreshSecretKey,
            @Value("${jwt.access-token-validity-in-seconds}") float accessTokenValidInSec,
            @Value("${jwt.refresh-token-validity-in-seconds}") float refreshTokenValidInSec
    ) {
        this.acessSecretKey = acessSecretKey; //BASE64암호화 되어있음.
        this.refreshSecretKey = refreshSecretKey; //BASE64암호화 되어있음.
        this.accessTokenValidTimeMs = accessTokenValidInSec * 1000;
        this.refreshTokenValidTimeMs = refreshTokenValidInSec * 1000;
    }

    @Override
    public void afterPropertiesSet() {
        //accessToken
        accessTokenKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(acessSecretKey));

        //refreshToken
        refreshTokenKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(refreshSecretKey));
    }

    //토큰을 생성한다.
    public Map<String, Object> createAccessToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (long)((new Date()).getTime() + this.accessTokenValidTimeMs); //한달뒤
        //토큰 유효일자
        Date expiryDate = new Date(now);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("access_token", Jwts.builder()
                .setSubject(authentication.getPrincipal().toString()) //사용자
                .setIssuedAt(new Date()) //현재시간 기반으로 생성
                .setExpiration(expiryDate) //만료시간 세팅
                .claim(ACESSS_TOKEN_KEY, authorities)
                .signWith(accessTokenKey, SignatureAlgorithm.HS512) //사용할 암호화 알고리즘
                .compact());
        map.put("access_token_dt", ((new Date()).getTime() + this.accessTokenValidTimeMs));
        return map;

    }
    public Map<String, Object> createRefreshToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (long)((new Date()).getTime() + this.refreshTokenValidTimeMs); //한달뒤
        //토큰 유효일자
        Date expiryDate = new Date(now);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("refresh_token", Jwts.builder()
                .setSubject(authentication.getPrincipal().toString()) //사용자
                .setIssuedAt(new Date()) //현재시간 기반으로 생성
                .setExpiration(expiryDate) //만료시간 세팅
                .claim(REFRESH_TOKEN_KEY, authorities)
                .signWith(refreshTokenKey, SignatureAlgorithm.HS512) //사용할 암호화 알고리즘
                .compact());
        map.put("refresh_token_dt", ((new Date()).getTime() + this.accessTokenValidTimeMs));
        return map;
    }

    //토큰에서 아이디 추출
    //token을 매개변수로 받아서, 토큰에 담긴 정보를 이용해 Authenticaion 객체를 리턴
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(accessTokenKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(ACESSS_TOKEN_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
    }
    public String getAuthenticationUserId(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(accessTokenKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    //token을 매개변수로 받아서, 토큰의 유효성 검증을 수행하는 validateToken 메소드
    public static boolean isAccessTokenValid(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(accessTokenKey).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException e) {
            logger.error("유효하지않은 Access JWT 서명입니다.");
        } catch (MalformedJwtException e){
            logger.error("유효하지않은 Access JWT 토큰입니다.");
        } catch (ExpiredJwtException e) {
            logger.error("만료된 Access JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.error("지원되지 않는 Access JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.error("Access JWT 토큰값이 없습니다.");
        }
        return false;
    }
    public static boolean isRefreshTokenValid(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(refreshTokenKey).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException e) {
            logger.error("유효하지않은 Refresh JWT 서명입니다.");
        } catch (MalformedJwtException e){
            logger.error("유효하지않은 Refresh JWT 토큰입니다.");
        } catch (ExpiredJwtException e) {
            logger.error("만료된 Refresh JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.error("지원되지 않는 Refresh JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.error("Refresh JWT 토큰값이 없습니다.");
        }
        return false;
    }

    public static String getTokenFromHeader(String header) {
        return (header.split(" ").length > 1 ? header.split(" ")[1] : header);
    }

    //토큰 만료
    public boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parser().setSigningKey(acessSecretKey).parseClaimsJws(token).getBody().getExpiration();
        return expirationDate.before(new Date());
    }
}