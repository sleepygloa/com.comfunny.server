package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.domain.UserCnnLog;
import com.comfunny.server.proj.sys.domain.UserToken;
import com.comfunny.server.proj.sys.domain.UserTokenPk;
import com.comfunny.server.proj.sys.dto.*;
import com.comfunny.server.proj.sys.repository.*;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.security.JwtFilter;
import com.comfunny.server.sys.security.JwtTokenProvider;
import com.comfunny.server.sys.security.TokenBlacklist;
import com.comfunny.server.sys.security.controller.dto.Role;
import com.comfunny.server.sys.security.controller.dto.TokenDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.comfunny.server.sys.security.JwtFilter.resolveToken;


@Service("userService")
@Slf4j
public class UserService {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  UserTokenRepository userTokenRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserCnnLogRepository userCnnLogRepository;
    @Autowired
    private UserCnnLogService userCnnLogService;

    @Autowired
    private TokenBlacklist tokenBlacklist;

    @Value("${url.client}")
    private String urlClient;



    /**
     * 로그인화면
     * 로그인
     * */
    public Map login (Map map, HttpServletRequest req) throws Exception {


        //요청 값 세팅
        LoginDto userDto = new LoginDto();
        userDto.setUserId((String)map.get("userId"));
        userDto.setPassword((String)map.get("password"));

        Authority authority = Authority.builder()
                .authorityName(Contraints.ROLE_ADMIN)
                .build();

        //1. 사용자정보 객체화
        User user = User.builder()
                .userId(userDto.getUserId())
                .name(userDto.getNickname())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();
//
        //2. 사용자정보확인
        Optional<User> optUser = userRepository.findByUserId(userDto.getUserId());
        if(optUser.isEmpty()){
            String msg = "아이디가 존재하지 않습니다.";
            log.debug("[DEVLOG] ##### listUserId is null ##### {}",msg);
            throw new Exception(msg);
        }
        User selDto = optUser.get();
        if(!passwordEncoder.matches(userDto.getPassword(), selDto.getPassword())){
            String msg = "비밀번호가 틀립니다.";
            log.debug("##### password is not matched ##### {}",msg);
            throw new Exception(msg);
        }

        //3. 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDto.getUserId(), userDto.getPassword());
        Map mapAccessToken = jwtTokenProvider.createAccessToken(authenticationToken);
        Map mapRefreshToken = jwtTokenProvider.createRefreshToken(authenticationToken);
        log.debug("[DEVLOG] ##### accessToken : {}",mapAccessToken.get(Contraints.ACCESS_TOKEN));
        log.debug("[DEVLOG] ##### refreshToken : {}",mapRefreshToken.get(Contraints.REFRESH_TOKEN));
        String accessToken = (String)mapAccessToken.get(Contraints.ACCESS_TOKEN);
        String refreshToken = (String)mapRefreshToken.get(Contraints.REFRESH_TOKEN);
        long accessTokenDt = ((long)mapAccessToken.get(Contraints.ACCESS_TOKEN+"_dt"));
        long refreshTokenDt = ((long)mapRefreshToken.get(Contraints.REFRESH_TOKEN+"_dt"));

        //4. 토큰저장
        map.put("accessToken",accessToken);
        map.put("accessTokenDt",accessTokenDt);
        map.put("refreshToken",refreshToken);
        map.put("refreshTokenDt",refreshTokenDt);
        saveUserToken(map);

        //5. 로그저장
        userCnnLogService.insertUserCnnLog(req, userDto.getUserId(), "LOGIN", "");

        //6. header 토큰 저장 및 메인화면으로

        //7. 세션사용
        req.setAttribute("s_userId", userDto.getUserId());

        return map;
    }

    /**
     * 로그인화면
     * 회원가입
     */
    @Transactional
    public ResponseEntity saveUserReg(LoginDto loginDto) throws IOException{

        //1. 사용자정보 객체화
        Authority authority = Authority.builder()
                .authorityName(Contraints.ROLE_USER)
                .build();

        //2. 사용자정보확인
        User user = User.builder()
                .userId(loginDto.getUserId())
                .username(loginDto.getNickname())
                .email(loginDto.getUserId())
                .password(passwordEncoder.encode(loginDto.getPassword()))
                .nickname(loginDto.getNickname())
                .authorities(Collections.singleton(authority))
                .provider(Contraints.SIGNUP_DEFAULT)
                .activated(true)
                .build();

        //아이디 확인
        Optional<User> optUser = userRepository.findByUserId(user.getUserId());
        if(optUser.isPresent()) {
            log.debug("아이디가 존재합니다.");
            throw new BadCredentialsException("아이디가 존재합니다.");
        }

        userRepository.save(user);
//        userAuthorityRepository.save(new UserAuthority(user.getId(), loginDto.getUserId(), Contraints.ROLE_USER));

        return new ResponseEntity<>(user, null, HttpStatus.OK);
    }

    /**
     * 사용자정보 조회
     */
    @Transactional
    public ResponseEntity getUserInfo(HttpServletRequest request) {
        //1. AccessToken 추출
        String jwt = (resolveToken(request) == null? null : resolveToken(request).get("accessToken"));
        if(jwt == null){
            return ResponseEntity.ok().build();
        }

        //2. 사용자정보(userId) 추출
        String userId = jwtTokenProvider.getAuthenticationUserId(jwt); //jwt에서 사용자 id를 꺼낸다.
        LoginDto loginDto = new LoginDto();
        loginDto.setUserId(userId);
        Optional<User> user = userRepository.findByUserId(loginDto.getUserId());
        if(user.isEmpty()){
            log.debug("사용자정보가 없습니다.");
            throw new BadCredentialsException("사용자정보가 없습니다.");
        }

        //3. 사용자정보(nickname) 세팅
        //(Client 화면에서 보여주는 내용)
        loginDto.setNickname(user.get().getNickname());
        return ResponseEntity.ok()
                .body(loginDto);
    }

    /**
     * Oauth2 로그인 성공시 리다이렉트 되는 메소드
     */
    @Transactional
    public void redirectAuthCode(HttpServletRequest request, HttpServletResponse response, String userId, String  password, String username) throws IOException {
        //1. 사용자정보확인
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userId, password);
        Map mapAccessToken = jwtTokenProvider.createAccessToken(authenticationToken);
        Map mapRefreshToken = jwtTokenProvider.createRefreshToken(authenticationToken);

        //2. 토큰 생성
        Map map = new HashMap();
        String accessToken = (String)mapAccessToken.get(Contraints.ACCESS_TOKEN);
        String refreshToken = (String)mapRefreshToken.get(Contraints.REFRESH_TOKEN);
        long accessTokenDt = ((long)mapAccessToken.get(Contraints.ACCESS_TOKEN+"_dt"));
        long refreshTokenDt = ((long)mapRefreshToken.get(Contraints.REFRESH_TOKEN+"_dt"));

        //3. 토큰저장
        map.put("userId",userId);
        map.put("accessToken",accessToken);
        map.put("accessTokenDt",accessTokenDt);
        map.put("refreshToken",refreshToken);
        map.put("refreshTokenDt",refreshTokenDt);
        saveUserToken(map);

        //4. 사용자정보 저장
        User user = new User();
        user.setUserId(userId);
        user.setNickname(username);
        user.setEmail(userId);
        user.setActivated(true);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        //5. 로그저장
        userCnnLogService.insertUserCnnLog(request, userId, "OAUTH_LOGIN", "GOOGLE");

        //6. 토큰 저장
        String ckAccessTokenStr = "accessToken="+(String)mapAccessToken.get(Contraints.ACCESS_TOKEN)+"; Path=/; Max-Age=115000; HttpOnly; Secure; SameSite=None";
        String ckRefreshTokenStr = "refreshToken="+(String)mapRefreshToken.get(Contraints.REFRESH_TOKEN)+"; Path=/; Max-Age=115000; HttpOnly; Secure; SameSite=None";
        response.addHeader("Set-Cookie", ckAccessTokenStr);
        response.addHeader("Set-Cookie", ckRefreshTokenStr);
        response.sendRedirect(urlClient);
    }

    /**
     * 로그아웃
     * 토큰삭제 및 세션 삭제
     */
    @Transactional
    public ResponseEntity logout(HttpServletRequest request) {

        //1.오늘날짜 구하기
        Date now = new Date(System.currentTimeMillis());    //현재시간
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String today = sdf.format(now); //오늘날짜

        //2.사용자정보확인
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals(JwtFilter.ACCESS_TOKEN_HEADER)){
                    String accessToken = cookie.getValue();
                    Optional<UserToken> optUserToken = userTokenRepository.findByAccessToken(accessToken);
                    if(optUserToken.isPresent()){
                        UserToken userToken = optUserToken.get();
                        userToken.setEndDt(now);
                        //1) 토큰저장
                        userTokenRepository.save(userToken);
                        //2) 로그저장
                        userCnnLogService.insertUserCnnLog(request, userToken.getUserTokenPk().getUserId(), "OAUTH_LOGIN", "GOOGLE");
                    }

                    //3) 블랙리스트추가
                    tokenBlacklist.addToBlacklist(accessToken);
                }
            }
        }
        //3.세션삭제
        request.getSession().invalidate();


        return ResponseEntity.ok().build();
    }

    //사용자관리 저장
    public void saveUser(Map Map){
//        for(DataRow dr : params.getDataTable("dt_data")){
//
//            UserAuthority userAuthority = new UserAuthority();
//            UserAuthorityPk userAuthorityPk = new UserAuthorityPk(params.getString("s_bizCd"), dr.getString("userId"), Contraints.ROLE_USER);
//            userAuthority.setUserAuthorityPk(userAuthorityPk);
//
//            UserPk userPk = new UserPk();
//            userPk.setUserId(dr.getString("userId"));
//
//            User user = new User();
//            user.setUserPk(userPk);
//            user.setBizCd(params.getString("s_bizCd"));
//            user.setActivated(true);
//            user.setNickname(dr.getString("nickname"));
//            user.setUsername(dr.getString("username"));
//            user.setUserNo(dr.getString("userNo"));
//            user.setUserPhone(dr.getString("userPhone"));
//            user.setUserEmail(dr.getString("userEmail"));
//            user.setUserPosition(dr.getString("userPosition"));
//            user.setPushId(dr.getString("pushId"));
//            user.setUserLangCd(dr.getString("userLangCd"));
//            user.setUserCountryCd(dr.getString("userCountryCd"));
//            user.setPrinterIp(dr.getString("printerIp"));
//            user.setUseYn(dr.getString("useYn"));
//            user.setDelYn("N");
//
//            user.setPassword(passwordEncoder.encode(""));
//
//            userRepository.save(user);
//            userAuthorityRepository.save(userAuthority);
//        }
    }

    //사용자관리 삭제
    public void deleteUser(Map map){
//        for(DataRow dr : params.getDataTable("dt_data")){
//            UserPk userPk = new UserPk();
//            userPk.setUserId(dr.getString("userId"));
//
//            User selDto = userRepository.findById(userPk).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. userId={"+dr.getString("userId")+"}, userNm={"+dr.getString("userNm")+"}"));
//            selDto.setDelYn("Y");
//            userRepository.save(selDto);
//        }
    }


    /**
     * Social Login Check
     * 1. Google Login Access_token Check
     * */
    public void socialAuthCheck(Map map) {
        log.debug("##### socialAuthCheck start #####");

        log.debug("##### socialAuthCheck end #####");
    }


    /**
     * Save UserToken Table
     * */
    private void saveUserToken(Map map){

        //오늘날짜 구하기
        Date now = new Date(System.currentTimeMillis());    //현재시간
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String today = sdf.format(now); //오늘날짜

        //4. 토큰저장
        UserTokenPk userTokenPk = new UserTokenPk();
        userTokenPk.setBgnDt(now);
        userTokenPk.setUserId(map.get("userId").toString());


        UserToken newUserToken = new UserToken();
        newUserToken.setUserTokenPk(userTokenPk);
        newUserToken.setAccessToken(map.get("accessToken").toString());
        newUserToken.setRefreshToken(map.get("refreshToken").toString());
        newUserToken.setAccessTokenDt(new Date((long)map.get("accessTokenDt")));
        newUserToken.setRefreshTokenDt(new Date((long)map.get("refreshTokenDt")));
        //EndDt null을 찾아서 현재시각으로 세팅
        Optional<UserToken> optTokenEndDtNull = userTokenRepository.findByUserTokenPkUserIdAndEndDt(map.get("userId").toString(), null);
        if(optTokenEndDtNull.isPresent()){
            UserToken selToken = optTokenEndDtNull.get();
            selToken.setEndDt(now);
            userTokenRepository.save(selToken);
        }
        userTokenRepository.save(newUserToken);
    }
}
