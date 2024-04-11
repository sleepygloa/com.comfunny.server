package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.domain.UserCnnLog;
import com.comfunny.server.proj.sys.domain.UserToken;
import com.comfunny.server.proj.sys.dto.*;
import com.comfunny.server.proj.sys.repository.*;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.security.JwtFilter;
import com.comfunny.server.sys.security.JwtTokenProvider;
import com.comfunny.server.sys.security.controller.dto.TokenDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service("userService")
@Slf4j
public class UserService {
    private UserDao userDao;
    private UserRepository userRepository;
    private UserAuthorityRepository userAuthorityRepository;
    private UserTokenRepository userTokenRepository;
    private JwtTokenProvider jwtTokenProvider;
    private PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private UserCnnLogRepository userCnnLogRepository;

    private UserDcRepository userDcRepository;
    private UserClientRepository userClientRepository;




    public UserService(
            UserRepository userRepository
            , UserAuthorityRepository userAuthorityRepository
            , UserTokenRepository userTokenRepository
            , UserCnnLogRepository userCnnLogRepository
            , UserDao userDao
            , PasswordEncoder passwordEncoder
            , JwtTokenProvider jwtTokenProvider
            , AuthenticationManagerBuilder authenticationManagerBuilder
            , UserDcRepository userDcRepository
            , UserClientRepository userClientRepository
    ) {
        this.userRepository = userRepository;
        this.userAuthorityRepository = userAuthorityRepository;
        this.userTokenRepository = userTokenRepository;
        this.userCnnLogRepository = userCnnLogRepository;
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userDcRepository = userDcRepository;
        this.userClientRepository = userClientRepository;
    }
//
//    @Transactional(readOnly = true)
//    public UserDto signup(UserDto userDto) {
//        if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
//            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
//        }
//
//        Authority authority = Authority.builder()
//                .authorityName("ROLE_USER")
//                .build();
//
//        User user = User.builder()
//                .username(userDto.getUsername())
//                .password(passwordEncoder.encode(userDto.getPassword()))
//                .nickname(userDto.getNickname())
//                .authorities(Collections.singleton(authority))
//                .activated(true)
//                .pwdFailCnt(0)
//                .build();
//
//        return UserDto.from(userRepository.save(user));
//    }
//
//    @Transactional(readOnly = true)
//    public UserDto getUserWithAuthorities(String username) {
//        return UserDto.from(userRepository.findOneWithAuthoritiesByUsername(username).orElse(null));
//    }
//
//    @Transactional(readOnly = true)
//    public UserDto getMyUserWithAuthorities() {
//        return UserDto.from(SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUsername).orElse(null));
//    }

//
//    public List<UserInfoResDto> selectMain (UserInfoReqDto dto){
//        User ui = new User();
//        setModelMapper(ui, dto);
//        return userDao.selectMainBy(new UserInfoReqDto());
//    }

    /**
     * 로그인화면
     * 로그인
     * */
    public Map login (HttpServletResponse response, Map map) throws IOException {

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
                .pwdFailCnt(0)
                .build();
//
        //2. 사용자정보확인
        Optional<User> optUser = userRepository.findByUserId(userDto.getUserId());
        if(optUser.isEmpty()){
            String msg = "아이디가 존재하지 않습니다.";
            log.debug("[DEVLOG] ##### listUserId is null ##### {}",msg);
            throw new BadCredentialsException(msg);
        }
        User selDto = optUser.get();
        if(!passwordEncoder.matches(userDto.getPassword(), selDto.getPassword())){
            String msg = "비밀번호가 틀립니다.";
            log.debug("##### password is not matched ##### {}",msg);
            throw new BadCredentialsException(msg);
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
        float accessTokenDt = ((float)mapAccessToken.get(Contraints.ACCESS_TOKEN+"_dt"));
        float refreshTokenDt = ((float)mapRefreshToken.get(Contraints.REFRESH_TOKEN+"_dt"));

        //4. 토큰저장
        UserToken newUserToken = new UserToken();
        newUserToken.setUserId(userDto.getUserId());
        newUserToken.setAccessToken(accessToken);
        newUserToken.setRefreshToken(refreshToken);
        userTokenRepository.save(newUserToken);

        //5. 세션처리
//        userDto.setSessions(session);
        UserCnnLog userCnnLog = new UserCnnLog();
        userCnnLog.setUserId(userDto.getUserId());
        userCnnLog.setInUserId(userDto.getUserId());
        userCnnLog.setUpUserId(userDto.getUserId());
//        userCnnLog.setLoginOs(userDto.getLoginOs());
        userCnnLog.setBizCd((userDto.getBizCd() != null ? userDto.getBizCd()  : Contraints.COMPANY_CD));
        userCnnLog.setLangCd((userDto.getLangCd() != null ? userDto.getLangCd()  : Contraints.INIT_SESSION_VALUE_LANG_CD));
        userCnnLog.setCountryCd((userDto.getCountryCd() != null ? userDto.getCountryCd()  : Contraints.INIT_SESSION_VALUE_COUNTRY_CD));
//        userCnnLog.setDcCd(userDto.getLoginOs());
//        userCnnLog.setClientCd(userDto.getLoginOs());
        userCnnLogRepository.save(userCnnLog);

        //6. header 토큰 저장 및 메인화면으로
        map.put("accessToken",accessToken);
        map.put("accessTokenDt",accessTokenDt);
        map.put("refreshToken",refreshToken);
        map.put("refreshTokenDt",refreshTokenDt);

        Cookie cookie = new Cookie(Contraints.ACCESS_TOKEN, accessToken);
        cookie.setDomain("localhost");
        cookie.setPath("/");
        cookie.setMaxAge((int)accessTokenDt);
        cookie.setSecure(true);
        Cookie cookie2 = new Cookie(Contraints.REFRESH_TOKEN, refreshToken);
        cookie2.setDomain("localhost");
        cookie2.setPath("/");
        cookie2.setMaxAge((int)refreshTokenDt);
        cookie2.setSecure(true);
        response.addCookie(cookie);
        response.addCookie(cookie2);

        return map;
    }

    /**
     * 로그인화면
     * 회원가입
     */
    @Transactional
    public ResponseEntity saveUserReg(LoginDto loginDto) throws IOException{

        Authority authority = Authority.builder()
                .authorityName(Contraints.ROLE_USER)
                .build();

        User user = User.builder()
                .userId(loginDto.getUserId())
                .username(loginDto.getNickname())
                .password(passwordEncoder.encode(loginDto.getPassword()))
                .nickname(loginDto.getNickname())
                .authorities(Collections.singleton(authority))
                .roles(Contraints.ROLE_USER)
                .provider(Contraints.SIGNUP_DEFAULT)
                .activated(true)
                .pwdFailCnt(0)
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
        String userId = (request.getAttribute("s_userId") != null ? (String)request.getAttribute("s_userId") : null );
        LoginDto loginDto = new LoginDto();
        loginDto.setUserId(userId);
        Optional<User> user = userRepository.findByUserId(loginDto.getUserId());
        if(user.isEmpty()){
            log.debug("사용자정보가 없습니다.");
            throw new BadCredentialsException("사용자정보가 없습니다.");
        }


        return ResponseEntity.ok()
                .body(user);
    }

    /**
     * JWT 토큰 발급 및 반환 로직
     * */
    public ResponseEntity getJwtHeader(LoginDto user) throws IOException{
        log.debug("##### getJwtHeader start #####");
        //토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(user.getUserId(), user.getPassword());
        //토큰 주입
        AuthenticationManager o = authenticationManagerBuilder.getObject();
        Authentication authentication = o.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Map mapAccessToken = jwtTokenProvider.createAccessToken(authentication);
        Map mapRefreshToken = jwtTokenProvider.createRefreshToken(authentication);
        String accessToken = (String)mapAccessToken.get(Contraints.ACCESS_TOKEN);
        String refreshToken = (String)mapRefreshToken.get(Contraints.REFRESH_TOKEN);
        float accessTokenDt = ((float)mapAccessToken.get(Contraints.ACCESS_TOKEN+"_dt"));
        float refreshTokenDt = ((float)mapRefreshToken.get(Contraints.REFRESH_TOKEN+"_dt"));

        //헤더에 토큰 추가
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.ACCESS_TOKEN_HEADER, "Bearer " + accessToken);
        httpHeaders.add(JwtFilter.REFRESH_TOKEN_HEADER, "Bearer " + refreshToken);
        log.debug("##### getJwtHeader jwt ##### bearer " +accessToken);
        log.debug("##### getJwtHeader end #####");
        return new ResponseEntity<>(new TokenDto(accessToken, accessTokenDt, refreshToken, refreshTokenDt), httpHeaders, HttpStatus.OK);
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
}
